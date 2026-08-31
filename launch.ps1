<#
.SYNOPSIS
  One-click PowerShell launcher for Jobanpreet Portfolio.
#>
Set-Location -Path $PSScriptRoot

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "  Jobanpreet Singh Gill — Portfolio Launcher" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

if (-not (Test-Path -Path "node_modules")) {
    Write-Host "[INFO] node_modules not found. Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Failed to install dependencies." -ForegroundColor Red
        Read-Host "Press Enter to exit..."
        exit $LASTEXITCODE
    }
}

Write-Host "[INFO] Starting local development server and opening browser..." -ForegroundColor Green
Start-Process "http://localhost:5173"
npm run dev
