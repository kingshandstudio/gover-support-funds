@echo off
set GIT_PATH=C:\Users\KK\AppData\Local\GitHubDesktop\app-3.5.1\resources\app\git\cmd\git.exe

if "%1"=="status" (
    "%GIT_PATH%" status
    goto :eof
)

if "%1"=="add" (
    "%GIT_PATH%" add .
    goto :eof
)

if "%1"=="commit" (
    "%GIT_PATH%" commit -m "%2"
    goto :eof
)

if "%1"=="push" (
    "%GIT_PATH%" push origin main
    goto :eof
)

if "%1"=="pull" (
    "%GIT_PATH%" pull origin main
    goto :eof
)

if "%1"=="log" (
    "%GIT_PATH%" log --oneline -10
    goto :eof
)

echo Git 명령어 도움말:
echo   git-simple.bat status
echo   git-simple.bat add
echo   git-simple.bat commit "메시지"
echo   git-simple.bat push
echo   git-simple.bat pull
echo   git-simple.bat log 