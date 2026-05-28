#!/bin/bash
# Start the Kronos prediction backend.
# Run this from the backend/ directory: bash start.sh
# In another terminal run: npm run dev (from project root)

cd "$(dirname "$0")"

if [ ! -d "Kronos" ]; then
    echo "ERROR: Kronos not found. Run setup.sh first:"
    echo "  bash setup.sh"
    exit 1
fi

echo "Starting Kronos backend on http://localhost:8000"
echo "API docs: http://localhost:8000/docs"
python main.py
