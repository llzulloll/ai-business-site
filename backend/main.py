"""
Kronos Stock Predictor — FastAPI backend
Run: python main.py
"""

import logging
import threading

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import predictor

logging.basicConfig(level=logging.INFO, format="%(asctime)s  %(levelname)s  %(message)s")

app = FastAPI(title="Kronos Stock Predictor")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

SUPPORTED_TICKERS = {"SPY", "AAPL", "TSLA", "MSFT", "NVDA", "QQQ", "AMZN", "META"}


@app.get("/health")
def health():
    return {"ok": True}


@app.get("/status")
def status():
    return predictor.get_load_status()


@app.post("/warmup")
def warmup():
    """Load model in background so the first /predict call is faster."""
    def _load():
        try:
            predictor.load_model()
        except Exception as e:
            logging.error(f"Warmup failed: {e}")

    t = threading.Thread(target=_load, daemon=True)
    t.start()
    return {"message": "Model loading started in background"}


@app.get("/predict/{ticker}")
def predict(ticker: str, hours: int = 24):
    ticker = ticker.upper()
    if ticker not in SUPPORTED_TICKERS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported ticker. Choose from: {', '.join(sorted(SUPPORTED_TICKERS))}",
        )
    if not (6 <= hours <= 72):
        raise HTTPException(status_code=400, detail="hours must be between 6 and 72")

    try:
        result = predictor.predict(ticker=ticker, pred_len=hours)
        return result
    except RuntimeError as e:
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        logging.exception("Prediction error")
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import os, uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
