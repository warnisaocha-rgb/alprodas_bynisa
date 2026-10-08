@echo off
title ALPRO-LAB - Media Pembelajaran Alpro C++ Modul 1-3
color 0B
echo ================================================================
echo    ALPRO-LAB: PLATFORM BELAJAR C++ ALGORITMA ^& PEMROGRAMAN
echo                 Spesial Modul Praktikum 1 - 3
echo ================================================================
echo Membuka platform pembelajaran di browser...
echo.
python "%~dp0server.py"
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Gagal menjalankan Python. Membuka index.html langsung di browser...
    start "" "%~dp0index.html"
)
pause
