@echo off
echo ========================================
echo    Cashlik Mobile - APK Build
echo ========================================
echo.

cd /d "C:\Users\aziz\Desktop\Do-shopping\mobile"

echo Current directory: %CD%
echo.

echo [INFO] Starting EAS Build...
echo [INFO] This will take 10-15 minutes
echo [INFO] You can press Ctrl+C to exit (build continues on server)
echo.

eas build --platform android --profile preview

echo.
echo ========================================
echo Build command completed!
echo Check the URL above for build status
echo ========================================
pause
