import sys
import os
import logging
import threading

import yfinance as yf
import pandas as pd
import numpy as np
from datetime import datetime

logger = logging.getLogger(__name__)

KRONOS_PATH = os.path.join(os.path.dirname(__file__), "Kronos")

_predictor = None
_load_lock = threading.Lock()
_load_status = {"state": "idle", "message": ""}


def get_load_status():
    return _load_status.copy()


def _set_status(state, message):
    _load_status["state"] = state
    _load_status["message"] = message
    logger.info(f"[{state}] {message}")


def load_model():
    global _predictor

    with _load_lock:
        if _predictor is not None:
            return

        if not os.path.isdir(KRONOS_PATH):
            raise RuntimeError(
                "Kronos repo not found. Run: cd backend && bash setup.sh"
            )

        if KRONOS_PATH not in sys.path:
            sys.path.insert(0, KRONOS_PATH)

        from model import Kronos, KronosTokenizer, KronosPredictor

        _set_status("loading", "Downloading tokenizer from HuggingFace (first run only)…")
        tokenizer = KronosTokenizer.from_pretrained("NeoQuasar/Kronos-Tokenizer-base")

        _set_status("loading", "Downloading Kronos-mini model (first run only)…")
        model = Kronos.from_pretrained("NeoQuasar/Kronos-mini")

        _predictor = KronosPredictor(model, tokenizer, max_context=512)
        _set_status("ready", "Model ready")


def fetch_ohlcv(ticker: str, lookback: int = 400) -> pd.DataFrame:
    obj = yf.Ticker(ticker)
    raw = obj.history(period="59d", interval="1h")
    if raw.empty:
        raise ValueError(f"No data returned for {ticker}")

    df = raw[["Open", "High", "Low", "Close", "Volume"]].copy()
    df.columns = ["open", "high", "low", "close", "volume"]
    df["amount"] = df["close"] * df["volume"]
    df = df.dropna().reset_index()

    ts_col = "Datetime" if "Datetime" in df.columns else df.columns[0]
    df = df.rename(columns={ts_col: "timestamps"})
    df["timestamps"] = pd.to_datetime(df["timestamps"]).dt.tz_localize(None)

    return df.tail(lookback + 50).reset_index(drop=True)


def predict(ticker: str = "SPY", pred_len: int = 24):
    if _predictor is None:
        _set_status("loading", "Initialising model…")
        load_model()

    df = fetch_ohlcv(ticker, lookback=400)
    lookback = min(360, len(df) - pred_len)
    if lookback < 10:
        raise ValueError("Not enough historical data")

    x_df = df.loc[:lookback - 1, ["open", "high", "low", "close", "volume", "amount"]]
    x_timestamp = df.loc[:lookback - 1, "timestamps"]

    last_ts = df["timestamps"].iloc[lookback - 1]
    y_timestamps = pd.date_range(
        start=last_ts + pd.Timedelta(hours=1), periods=pred_len, freq="1h"
    )
    y_timestamp = pd.Series(y_timestamps)

    # sample_count=5 runs 5 stochastic paths and averages internally
    pred_df = _predictor.predict(
        df=x_df,
        x_timestamp=x_timestamp,
        y_timestamp=y_timestamp,
        pred_len=pred_len,
        T=1.0,
        top_p=0.9,
        sample_count=5,
        verbose=False,
    )

    predicted_closes = pred_df["close"].values
    current_price = float(df["close"].iloc[lookback - 1])
    predicted_price = float(predicted_closes[-1])
    pct_change = (predicted_price - current_price) / current_price * 100

    # Confidence band: ±1σ of recent hourly returns, scaled by sqrt(t)
    recent_returns = df["close"].tail(lookback).pct_change().dropna()
    hourly_vol = float(recent_returns.std())
    conf_band = np.array([hourly_vol * np.sqrt(i + 1) * current_price for i in range(pred_len)])

    if pct_change > 0.4:
        signal = "BUY"
    elif pct_change < -0.4:
        signal = "SELL"
    else:
        signal = "HOLD"

    # Confidence: inverse of normalised volatility
    price_range = float(df["close"].tail(lookback).max() - df["close"].tail(lookback).min())
    confidence = max(10, min(95, int(100 * (1 - hourly_vol * 20))))

    hist_slice = df.iloc[max(0, lookback - 100): lookback]
    historical = [
        {
            "time": row["timestamps"].isoformat(),
            "open": round(float(row["open"]), 2),
            "high": round(float(row["high"]), 2),
            "low": round(float(row["low"]), 2),
            "close": round(float(row["close"]), 2),
            "volume": int(row["volume"]),
        }
        for _, row in hist_slice.iterrows()
    ]

    predicted = [
        {
            "time": ts.isoformat(),
            "close": round(float(c), 2),
            "upper": round(float(c) + float(b), 2),
            "lower": round(float(c) - float(b), 2),
        }
        for ts, c, b in zip(y_timestamps, predicted_closes, conf_band)
    ]

    price_24h_ago = float(df["close"].iloc[max(0, lookback - 24)])
    day_change_pct = (current_price - price_24h_ago) / price_24h_ago * 100

    return {
        "ticker": ticker.upper(),
        "signal": signal,
        "current_price": round(current_price, 2),
        "predicted_price": round(predicted_price, 2),
        "pct_change": round(pct_change, 2),
        "confidence": confidence,
        "day_change_pct": round(day_change_pct, 2),
        "pred_hours": pred_len,
        "historical": historical,
        "predicted": predicted,
        "generated_at": datetime.utcnow().isoformat() + "Z",
    }
