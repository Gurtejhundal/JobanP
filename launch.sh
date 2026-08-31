#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

echo "==================================================="
echo "  Jobanpreet Singh Gill — Portfolio Launcher"
echo "==================================================="
echo ""

if [ ! -d "node_modules" ]; then
    echo "[INFO] node_modules not found. Installing dependencies..."
    npm install
fi

echo "[INFO] Starting local development server..."
npm run dev -- --open
