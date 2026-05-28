# AmCham Thailand – No-Website Business Scraper

Scrapes the [AmCham Thailand member directory](https://connect.amchamthailand.com/list/)
and extracts tourist-facing businesses that have **no website** listed.

## Quick start

```bash
cd scraper/
pip install -r requirements.txt
python -m playwright install chromium
python scrape_amcham.py
```

## Output

| File | Description |
|------|-------------|
| `thailand_leads_no_website.csv` | Leads — one row per business |
| `errors.log` | Timeout / load failures and skipped pages |

### CSV columns

| Column | Notes |
|--------|-------|
| Company Name | From the `<h1>` on the profile page |
| Category | One of the 10 tourist-facing categories |
| Address | Street address extracted from the profile |
| Phone | Pipe-separated if multiple; sourced from `tel:` links first |
| Email | Captured after clicking the "Send Email" button |
| Facebook URL | Direct link if listed |
| Instagram URL | Direct link if listed |
| AMCHAM Profile URL | The full profile URL used as the source |

## Target categories

- Restaurants, Cafes & Bars
- Hotels
- Serviced Apartments
- Golf Clubs
- Travel Agents or Tour Operators
- Wellness Centers
- Sports
- Entertainment
- Event Venues
- Hospitals & Dental Clinics

## How it works

1. **Category discovery** — loads the main directory page and maps live slugs
   to each target category, with hardcoded fallbacks.
2. **Listing pages** — paginates (and clicks "Load More" if present) until all
   member profile links are collected.
3. **Profile filter** — skips any profile where *"Visit Website"* appears
   anywhere on the page.
4. **Data extraction** — for qualifying profiles it extracts name, address,
   phone, social links, and email (via clicking the "Send Email" button and
   inspecting the resulting modal + intercepted network responses).
5. **Output** — rows are written to the CSV immediately after each profile so
   a partial run is never lost.

A 0.5-second delay is inserted between every request. Images and fonts are
blocked to speed up page loads.
