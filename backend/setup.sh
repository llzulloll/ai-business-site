#!/bin/bash
set -e

echo "=== Kronos Stock Predictor Setup ==="

echo "Installing Python dependencies..."
pip install -r requirements.txt
# CPU-only torch is much smaller and sufficient for inference
pip install torch --index-url https://download.pytorch.org/whl/cpu

echo "Cloning Kronos repository..."
if [ ! -d "Kronos" ]; then
    git clone https://github.com/shiyu-coder/Kronos.git
    echo "Installing Kronos dependencies..."
    pip install -r Kronos/requirements.txt
else
    echo "Kronos already cloned, skipping."
fi

echo ""
echo "=== Setup complete! ==="
echo "Start the backend: python main.py"
echo "Then in another terminal: npm run dev (from project root)"
