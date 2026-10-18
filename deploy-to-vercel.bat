@echo off
title The WebCraft - Vercel 1-Click Deployment
color 0b
echo ================================================================
echo          THE WEBCRAFT - VERCEL CLOUD DEPLOYMENT
echo ================================================================
echo.
echo [*] Step 1: Building production bundle...
cd /d "%~dp0"
call npm run build
echo.
echo [*] Step 2: Uploading and deploying to Vercel...
echo.
echo [!] NOTE:
echo     - If asked to login, press Enter and your browser will open.
echo     - Click 'Authorize' in your browser.
echo     - Terminal will automatically finish deployment and give you
echo       your permanent 24/7 live link (e.g., https://the-webcraft.vercel.app).
echo.
echo ================================================================
call npx -y vercel --prod
echo ================================================================
echo.
echo [SUCCESS] Deployment process completed!
pause
