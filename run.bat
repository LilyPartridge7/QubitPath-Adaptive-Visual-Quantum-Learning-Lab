@echo off
echo ====================================================================
echo QubitPath -- An Adaptive Visual Quantum Learning Lab
echo ====================================================================
echo.
echo Note: QubitPath is a pure client-side application. The quantum simulator
echo engine, visual components, and adaptive diagnostic system run together
echo in the frontend without requiring a separate backend server.
echo.
echo Starting QubitPath local development server...
echo.

cd /d "%~dp0"
npm run dev

pause
