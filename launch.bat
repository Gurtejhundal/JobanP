@echo off
title Jobanpreet Portfolio Launcher
cd /d "%~dp0"

echo ===================================================
echo   Jobanpreet Singh Gill — Portfolio Launcher
echo ===================================================
echo.

if not exist "node_modules\" (
    echo [INFO] Dependencies not found. Running npm install...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] npm install failed.
        pause
        exit /b %errorlevel%
    )
)

echo [INFO] Starting local development server...
echo [INFO] Opening preview at http://localhost:5173 ...
echo [INFO] Press Ctrl+C in this terminal window to stop the server.
echo.

start "" "http://localhost:5173"
call npm run dev
pause
