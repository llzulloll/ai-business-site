#!/usr/bin/env python3
"""
AmCham Thailand Business Directory Scraper
==========================================
Finds tourist-facing businesses in Thailand that have NO website listed
on connect.amchamthailand.com/list/

Setup:
    pip install playwright
    python -m playwright install chromium
    python scraper/scrape_amcham.py

Output:
    thailand_leads_no_website.csv   - leads without a website
    errors.log                      - skipped / failed pages
"""

import asyncio
import csv
import logging
import re
import sys
from pathlib import Path

from playwright.async_api import (
    async_playwright,
    Browser,
    BrowserContext,
    Page,
    TimeoutError as PlaywrightTimeout,
)

# ── Configuration ──────────────────────────────────────────────────────────────

BASE_URL = "https://connect.amchamthailand.com"
LIST_URL = f"{BASE_URL}/list/"

OUTPUT_CSV = "thailand_leads_no_website.csv"
ERROR_LOG  = "errors.log"

REQUEST_DELAY  = 0.5   # seconds between page requests
CLICK_WAIT_MS  = 1500  # ms to wait after clicking "Send Email"
PAGE_TIMEOUT   = 30_000

# Target categories: (human label, expected URL slug)
# Slugs are discovered live from the site; these serve as fallbacks.
CATEGORIES: list[tuple[str, str]] = [
    ("Restaurants, Cafes & Bars",       "restaurants-cafes-bars"),
    ("Hotels",                           "hotels"),
    ("Serviced Apartments",              "serviced-apartments"),
    ("Golf Clubs",                       "golf-clubs"),
    ("Travel Agents or Tour Operators",  "travel-agents-tour-operators"),
    ("Wellness Centers",                 "wellness-centers"),
    ("Sports",                           "sports"),
    ("Entertainment",                    "entertainment"),
    ("Event Venues",                     "event-venues"),
    ("Hospitals & Dental Clinics",       "hospitals-dental-clinics"),
]

CSV_FIELDS = [
    "Company Name",
    "Category",
    "Address",
    "Phone",
    "Email",
    "Facebook URL",
    "Instagram URL",
    "AMCHAM Profile URL",
]

EMAIL_RE = re.compile(
    r"[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
)

# Email noise patterns to discard from network captures
EMAIL_NOISE = ("example.", "sentry.", "w3.org", "@2x", ".min.", "schema.org")

# ── Logging ────────────────────────────────────────────────────────────────────

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-7s  %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler(ERROR_LOG, mode="w", encoding="utf-8"),
    ],
)
log = logging.getLogger(__name__)


# ── Generic page helpers ───────────────────────────────────────────────────────

def abs_url(href: str) -> str:
    if href.startswith("http"):
        return href
    return BASE_URL + href if href.startswith("/") else href


async def safe_text(page: Page, selector: str) -> str:
    try:
        el = await page.query_selector(selector)
        if el:
            return (await el.inner_text()).strip()
    except Exception:
        pass
    return ""


async def first_text(page: Page, *selectors: str) -> str:
    for sel in selectors:
        t = await safe_text(page, sel)
        if t:
            return t
    return ""


async def safe_href(page: Page, selector: str) -> str:
    try:
        el = await page.query_selector(selector)
        if el:
            return (await el.get_attribute("href") or "").strip()
    except Exception:
        pass
    return ""


# ── Category discovery ─────────────────────────────────────────────────────────

async def discover_category_map(page: Page) -> dict[str, str]:
    """
    Load the main directory page and extract {display_name_lower: slug}
    from all /list/category/ links.
    """
    discovered: dict[str, str] = {}
    try:
        await page.goto(LIST_URL, wait_until="networkidle", timeout=PAGE_TIMEOUT)
        await asyncio.sleep(REQUEST_DELAY)
        anchors = await page.query_selector_all('a[href*="/list/category/"]')
        for a in anchors:
            href = await a.get_attribute("href") or ""
            text = (await a.inner_text()).strip().lower()
            slug = href.rstrip("/").split("/")[-1]
            if slug:
                discovered[text] = slug
        log.info(f"Discovered {len(discovered)} categories from site")
    except Exception as e:
        log.warning(f"Category discovery failed, using fallback slugs: {e}")
    return discovered


def _best_slug(name: str, discovered: dict[str, str], fallback: str) -> str:
    """Match a target category name to a discovered slug."""
    key = name.lower()
    if key in discovered:
        return discovered[key]

    # Try significant words from the target name
    sig_words = [w for w in re.split(r"\W+", key) if len(w) > 3]
    for disc_key, slug in discovered.items():
        if sum(w in disc_key for w in sig_words) >= max(1, len(sig_words) // 2):
            return slug

    return fallback


async def resolve_categories(page: Page) -> list[tuple[str, str]]:
    """Return list of (display_name, resolved_slug) pairs."""
    discovered = await discover_category_map(page)
    return [
        (name, _best_slug(name, discovered, fallback))
        for name, fallback in CATEGORIES
    ]


# ── Member link collection ─────────────────────────────────────────────────────

async def _links_on_page(page: Page) -> list[str]:
    els = await page.query_selector_all('a[href*="/list/member/"]')
    seen: dict[str, None] = {}
    for el in els:
        href = await el.get_attribute("href") or ""
        if href:
            seen[abs_url(href)] = None
    return list(seen)


async def _try_load_more(page: Page) -> bool:
    """
    Click a 'Load More' / infinite-scroll button if present.
    Returns True if more content was loaded.
    """
    for sel in (
        'button:has-text("Load More")',
        'a:has-text("Load More")',
        'button:has-text("Show More")',
        '[class*="load-more"]',
    ):
        el = await page.query_selector(sel)
        if el and await el.is_visible():
            before = await page.query_selector_all('a[href*="/list/member/"]')
            await el.click()
            await page.wait_for_timeout(1500)
            after = await page.query_selector_all('a[href*="/list/member/"]')
            if len(after) > len(before):
                return True
    return False


async def get_all_member_links(page: Page, category_url: str) -> list[str]:
    """Collect member profile URLs across all pages of a category listing."""
    all_links: dict[str, None] = {}
    url: str | None = category_url

    while url:
        log.info(f"  Listing page → {url}")
        try:
            await page.goto(url, wait_until="networkidle", timeout=PAGE_TIMEOUT)
            await asyncio.sleep(REQUEST_DELAY)
        except PlaywrightTimeout:
            log.error(f"TIMEOUT on listing page: {url}")
            break
        except Exception as e:
            log.error(f"ERROR loading listing page {url}: {e}")
            break

        # Exhaust any "Load More" buttons before collecting links
        while await _try_load_more(page):
            pass

        for link in await _links_on_page(page):
            all_links[link] = None

        # Pagination: look for a "next page" link
        next_href = ""
        for sel in (
            'a[rel="next"]',
            '.pagination a:has-text("Next")',
            '.pagination a:has-text("›")',
            '.pagination a:has-text("»")',
            'a.next-page',
            'li.next > a',
            '[class*="next"] a',
        ):
            next_href = await safe_href(page, sel)
            if next_href:
                break

        next_url = abs_url(next_href) if next_href else None
        url = next_url if next_url and next_url != url else None

    return list(all_links)


# ── Phone extraction ───────────────────────────────────────────────────────────

PHONE_RE = re.compile(r"\+?[\d][\d\s\-().]{6,19}[\d]")


async def extract_phones(page: Page) -> str:
    # Prefer tel: links (most reliable)
    tel_els = await page.query_selector_all('a[href^="tel:"]')
    phones: list[str] = []
    for el in tel_els:
        href = (await el.get_attribute("href") or "").replace("tel:", "").strip()
        if href:
            phones.append(href)
    if phones:
        return " | ".join(phones)

    # Fall back to text scan in likely containers
    for sel in (
        '[class*="phone"]',
        '[class*="tel"]',
        '[class*="mobile"]',
        '[class*="contact"]',
        ".member-details",
        ".profile-details",
        ".company-info",
        "aside",
        "footer",
    ):
        text = await safe_text(page, sel)
        found = PHONE_RE.findall(text)
        cleaned = [p.strip() for p in found if len(p.replace(" ", "")) >= 7]
        if cleaned:
            return " | ".join(cleaned[:4])
    return ""


# ── Email extraction ───────────────────────────────────────────────────────────

async def extract_email(page: Page) -> str:
    """
    Try to obtain an email address:
      1. Already-visible mailto: links
      2. Click the 'Send Email' button and inspect:
         a. newly revealed mailto: links
         b. modal / dialog text content
         c. network responses triggered by the click
    """
    # 1. Mailto link already on page
    mailto_el = await page.query_selector('a[href^="mailto:"]')
    if mailto_el:
        href = (await mailto_el.get_attribute("href") or "")
        addr = href.replace("mailto:", "").split("?")[0].strip()
        if EMAIL_RE.fullmatch(addr):
            return addr

    # 2. Click the Send Email button and capture response
    captured: list[str] = []

    async def on_response(response):
        try:
            ct = response.headers.get("content-type", "")
            if any(t in ct for t in ("json", "text", "html")):
                body = await response.text()
                for addr in EMAIL_RE.findall(body):
                    if not any(n in addr for n in EMAIL_NOISE):
                        captured.append(addr)
        except Exception:
            pass

    page.on("response", on_response)

    btn = None
    for sel in (
        'a:has-text("Send Email")',
        'button:has-text("Send Email")',
        'a:has-text("Email")',
        'button:has-text("Email")',
        '[class*="email-btn"]',
        '[class*="contact"] a',
        'a[href*="email"]',
    ):
        candidate = await page.query_selector(sel)
        if candidate and await candidate.is_visible():
            # Skip if it's a mailto: link (already handled above)
            href = (await candidate.get_attribute("href") or "").lower()
            if href.startswith("mailto:"):
                addr = href.replace("mailto:", "").split("?")[0].strip()
                if EMAIL_RE.fullmatch(addr):
                    page.remove_listener("response", on_response)
                    return addr
            btn = candidate
            break

    email = ""
    if btn:
        try:
            await btn.click()
            await page.wait_for_timeout(CLICK_WAIT_MS)

            # a. Newly revealed mailto:
            for el in await page.query_selector_all('a[href^="mailto:"]'):
                href = (await el.get_attribute("href") or "")
                addr = href.replace("mailto:", "").split("?")[0].strip()
                if EMAIL_RE.fullmatch(addr):
                    email = addr
                    break

            # b. Modal / dialog text
            if not email:
                for modal_sel in (
                    ".modal",
                    ".modal-body",
                    ".modal-content",
                    '[role="dialog"]',
                    "[class*='modal']",
                    "[class*='popup']",
                    ".lightbox",
                    "[class*='lightbox']",
                ):
                    modal = await page.query_selector(modal_sel)
                    if modal and await modal.is_visible():
                        text = await modal.inner_text()
                        found = EMAIL_RE.findall(text)
                        real = [a for a in found if not any(n in a for n in EMAIL_NOISE)]
                        if real:
                            email = real[0]
                            break

            # c. Network response
            if not email and captured:
                email = captured[0]

            # Close any open modal so it doesn't interfere with next profile
            for close_sel in (
                'button:has-text("Close")',
                'button:has-text("×")',
                '[aria-label="Close"]',
                ".modal .close",
                ".modal-close",
            ):
                close_btn = await page.query_selector(close_sel)
                if close_btn and await close_btn.is_visible():
                    await close_btn.click()
                    await page.wait_for_timeout(300)
                    break

        except Exception as e:
            log.debug(f"Email click error: {e}")

    page.remove_listener("response", on_response)
    return email


# ── Social media extraction ────────────────────────────────────────────────────

async def extract_social(page: Page, domain: str) -> str:
    try:
        els = await page.query_selector_all(f'a[href*="{domain}"]')
        for el in els:
            href = (await el.get_attribute("href") or "").strip()
            if domain in href:
                return href
    except Exception:
        pass
    return ""


# ── Profile scraper ────────────────────────────────────────────────────────────

async def scrape_profile(
    page: Page,
    url: str,
    category_name: str,
    writer: csv.DictWriter,
) -> tuple[bool, str]:
    """
    Load one member profile and decide if it's a lead (no website).

    Returns (is_lead: bool, reason: str)
    """
    try:
        await page.goto(url, wait_until="networkidle", timeout=PAGE_TIMEOUT)
        await asyncio.sleep(REQUEST_DELAY)
    except PlaywrightTimeout:
        log.error(f"TIMEOUT: {url}")
        return False, "timeout"
    except Exception as e:
        log.error(f"LOAD ERROR: {url} — {e}")
        return False, f"load_error"

    # ── Skip profiles that have a website ─────────────────────────────────────
    try:
        body_text = await page.inner_text("body")
    except Exception:
        body_text = ""

    if "Visit Website" in body_text:
        log.info(f"    ↳ SKIP  (has website)")
        return False, "has_website"

    # ── Extract fields ────────────────────────────────────────────────────────
    name = await first_text(
        page,
        "h1.member-name",
        "h1.company-name",
        ".profile-name h1",
        ".member-profile h1",
        ".company-title h1",
        "h1",
    )

    address_raw = await first_text(
        page,
        "[class*='address']",
        "[itemprop='address']",
        ".member-address",
        ".company-address",
        "address",
        "[class*='location']",
    )
    address = re.sub(r"\s+", " ", address_raw).strip()

    phone    = await extract_phones(page)
    email    = await extract_email(page)
    facebook = await extract_social(page, "facebook.com")
    instagram= await extract_social(page, "instagram.com")

    writer.writerow({
        "Company Name":      name or "(unknown)",
        "Category":          category_name,
        "Address":           address,
        "Phone":             phone,
        "Email":             email,
        "Facebook URL":      facebook,
        "Instagram URL":     instagram,
        "AMCHAM Profile URL": url,
    })

    log.info(f"    ↳ LEAD  {name or url}  email={email or '—'}  phone={phone or '—'}")
    return True, "ok"


# ── Main ───────────────────────────────────────────────────────────────────────

async def main() -> None:
    stats: dict[str, dict[str, int]] = {}

    csv_path = Path(OUTPUT_CSV)
    log.info(f"Output → {csv_path.resolve()}")
    log.info(f"Errors → {Path(ERROR_LOG).resolve()}")

    with csv_path.open("w", newline="", encoding="utf-8") as fh:
        writer = csv.DictWriter(fh, fieldnames=CSV_FIELDS)
        writer.writeheader()

        async with async_playwright() as pw:
            browser: Browser = await pw.chromium.launch(
                headless=True,
                args=[
                    "--no-sandbox",
                    "--disable-dev-shm-usage",
                    "--disable-gpu",
                    "--disable-blink-features=AutomationControlled",
                ],
            )
            ctx: BrowserContext = await browser.new_context(
                user_agent=(
                    "Mozilla/5.0 (X11; Linux x86_64) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) "
                    "Chrome/124.0.0.0 Safari/537.36"
                ),
                viewport={"width": 1280, "height": 900},
                locale="en-US",
            )
            # Suppress resource-heavy assets to speed up scraping
            await ctx.route(
                "**/*.{png,jpg,jpeg,gif,webp,svg,woff,woff2,ttf,otf}",
                lambda route, _: route.abort(),
            )

            page: Page = await ctx.new_page()

            # Discover real category slugs from the live site
            log.info("Resolving category slugs from live site …")
            categories = await resolve_categories(page)
            for name, slug in categories:
                log.info(f"  {name:42s}  →  {slug}")

            total_checked = 0
            total_leads   = 0

            for cat_name, cat_slug in categories:
                cat_url = f"{BASE_URL}/list/category/{cat_slug}/"
                log.info(f"\n{'─'*65}")
                log.info(f"CATEGORY: {cat_name}")
                log.info(f"URL:      {cat_url}")
                log.info(f"{'─'*65}")

                stats[cat_name] = {"checked": 0, "leads": 0, "skipped": 0, "errors": 0}

                member_links = await get_all_member_links(page, cat_url)
                log.info(f"Found {len(member_links)} member profiles in this category")

                for profile_url in member_links:
                    log.info(f"  → {profile_url}")
                    is_lead, reason = await scrape_profile(
                        page, profile_url, cat_name, writer
                    )
                    stats[cat_name]["checked"] += 1
                    total_checked += 1

                    if is_lead:
                        stats[cat_name]["leads"] += 1
                        total_leads += 1
                    elif reason == "has_website":
                        stats[cat_name]["skipped"] += 1
                    elif reason not in ("ok",):
                        stats[cat_name]["errors"] += 1

                    fh.flush()  # persist each row immediately

            await browser.close()

    # ── Summary ───────────────────────────────────────────────────────────────
    SEP = "=" * 75
    print(f"\n{SEP}")
    print("  SCRAPE COMPLETE — SUMMARY")
    print(SEP)
    print(f"{'Category':<44} {'Checked':>8} {'Leads':>7} {'Skipped':>9} {'Errors':>8}")
    print(f"{'─'*75}")
    for cat_name, s in stats.items():
        print(
            f"{cat_name:<44} {s['checked']:>8} {s['leads']:>7} "
            f"{s['skipped']:>9} {s['errors']:>8}"
        )
    print(f"{'─'*75}")
    print(f"{'TOTAL':<44} {total_checked:>8} {total_leads:>7}")
    print(f"\n  Leads saved to : {OUTPUT_CSV}")
    print(f"  Errors logged  : {ERROR_LOG}")
    print(SEP)


if __name__ == "__main__":
    asyncio.run(main())
