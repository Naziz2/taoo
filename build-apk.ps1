# BUILD APK - Quick Start Script
# Run this in PowerShell

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Cashlik Mobile - APK Build Script   " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to project directory
Set-Location "C:\Users\aziz\Desktop\Do-shopping\mobile"

Write-Host "Current directory: $(Get-Location)" -ForegroundColor Yellow
Write-Host ""

# Check if EAS CLI is installed
Write-Host "[1/5] Checking EAS CLI installation..." -ForegroundColor Green
$easInstalled = Get-Command eas -ErrorAction SilentlyContinue
if ($easInstalled) {
    Write-Host "   ✓ EAS CLI is installed" -ForegroundColor Green
} else {
    Write-Host "   ✗ EAS CLI not found. Installing..." -ForegroundColor Red
    npm install -g eas-cli
}
Write-Host ""

# Check if logged in
Write-Host "[2/5] Checking Expo login status..." -ForegroundColor Green
Write-Host "   Please login to Expo:" -ForegroundColor Yellow
eas whoami
Write-Host ""

# Ask if user wants to continue
Write-Host "[3/5] Ready to build APK" -ForegroundColor Green
$continue = Read-Host "   Do you want to continue? (y/n)"
if ($continue -ne 'y') {
    Write-Host "   Build cancelled." -ForegroundColor Red
    exit
}
Write-Host ""

# Start build
Write-Host "[4/5] Starting APK build..." -ForegroundColor Green
Write-Host "   This will take 10-15 minutes..." -ForegroundColor Yellow
Write-Host "   Build profile: preview (APK)" -ForegroundColor Yellow
Write-Host ""

eas build --platform android --profile preview

Write-Host ""
Write-Host "[5/5] Build process completed!" -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Check the build URL provided above" -ForegroundColor White
Write-Host "2. Download the APK file" -ForegroundColor White
Write-Host "3. Install on your Android device" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Cyan
