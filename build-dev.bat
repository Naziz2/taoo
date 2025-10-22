@echo off
cd /d "%~dp0"
echo Current directory: %CD%
npx expo run:android
pause
