@echo off
REM Git 명령어 배치 파일
REM 이 파일을 사용하면 Git 명령어를 쉽게 사용할 수 있습니다.

set GIT_PATH=C:\Users\KK\AppData\Local\GitHubDesktop\app-3.5.1\resources\app\git\cmd\git.exe

if "%1"=="" (
    echo.
    echo Git 명령어 도움말
    echo ====================
    echo.
    echo 사용법: git-commands.bat [명령어]
    echo.
    echo 사용 가능한 명령어:
    echo   status    - Git 상태 확인
    echo   add       - 모든 파일 스테이징
    echo   commit    - 커밋 (메시지 필요)
    echo   push      - 푸시
    echo   pull      - 풀
    echo   log       - 로그 확인
    echo   branch    - 브랜치 확인
    echo.
    echo 예시:
    echo   git-commands.bat status
    echo   git-commands.bat commit "커밋 메시지"
    echo.
    goto :eof
)

if "%1"=="status" (
    echo Git 상태 확인 중...
    "%GIT_PATH%" status
    goto :eof
)

if "%1"=="add" (
    echo 파일 스테이징 중...
    "%GIT_PATH%" add .
    echo 스테이징 완료!
    goto :eof
)

if "%1"=="commit" (
    if "%2"=="" (
        echo 커밋 메시지가 필요합니다.
        echo 사용법: git-commands.bat commit "커밋 메시지"
        goto :eof
    )
    echo 커밋 중...
    "%GIT_PATH%" commit -m "%2"
    echo 커밋 완료!
    goto :eof
)

if "%1"=="push" (
    echo 푸시 중...
    "%GIT_PATH%" push origin main
    echo 푸시 완료!
    goto :eof
)

if "%1"=="pull" (
    echo 풀 중...
    "%GIT_PATH%" pull origin main
    echo 풀 완료!
    goto :eof
)

if "%1"=="log" (
    echo 로그 확인 중...
    "%GIT_PATH%" log --oneline -10
    goto :eof
)

if "%1"=="branch" (
    echo 브랜치 확인 중...
    "%GIT_PATH%" branch
    goto :eof
)

echo 알 수 없는 명령어: %1
echo 도움말을 보려면: git-commands.bat 