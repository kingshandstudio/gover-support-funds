# Git 별칭 설정 스크립트
# 이 스크립트를 실행하면 PowerShell에서 'git' 명령어를 직접 사용할 수 있습니다.

Write-Host "🚀 Git 별칭 설정 중..." -ForegroundColor Green

# Git 경로 설정
$gitPath = "C:\Users\KK\AppData\Local\GitHubDesktop\app-3.5.1\resources\app\git\cmd\git.exe"

# Git 경로 확인
if (Test-Path $gitPath) {
    Write-Host "✅ Git 경로 확인됨: $gitPath" -ForegroundColor Green
    
    # PowerShell 프로필 경로 확인
    $profilePath = $PROFILE
    $profileDir = Split-Path $profilePath -Parent
    
    # 프로필 디렉토리가 없으면 생성
    if (!(Test-Path $profileDir)) {
        New-Item -ItemType Directory -Path $profileDir -Force
        Write-Host "📁 PowerShell 프로필 디렉토리 생성됨: $profileDir" -ForegroundColor Yellow
    }
    
    # Git 별칭 추가
    $aliasContent = @"
# Git 별칭 설정
Set-Alias -Name git -Value "$gitPath"

# Git 상태 확인 함수
function git-status {
    & "$gitPath" status
}

# Git 추가 함수
function git-add {
    & "$gitPath" add .
}

# Git 커밋 함수
function git-commit {
    param([string]`$message)
    & "$gitPath" commit -m `$message
}

# Git 푸시 함수
function git-push {
    & "$gitPath" push origin main
}

# Git 풀 함수
function git-pull {
    & "$gitPath" pull origin main
}

# Git 로그 함수
function git-log {
    & "$gitPath" log --oneline -10
}

Write-Host "🎯 Git 별칭이 설정되었습니다!" -ForegroundColor Green
Write-Host "사용 가능한 명령어:" -ForegroundColor Cyan
Write-Host "  git status    - 상태 확인" -ForegroundColor White
Write-Host "  git add       - 파일 스테이징" -ForegroundColor White
Write-Host "  git commit    - 커밋" -ForegroundColor White
Write-Host "  git push      - 푸시" -ForegroundColor White
Write-Host "  git pull      - 풀" -ForegroundColor White
Write-Host "  git log       - 로그 확인" -ForegroundColor White
"@
    
    # 프로필에 별칭 추가
    Add-Content -Path $profilePath -Value $aliasContent -Force
    
    Write-Host "✅ Git 별칭이 PowerShell 프로필에 추가되었습니다!" -ForegroundColor Green
    Write-Host "📍 프로필 경로: $profilePath" -ForegroundColor Cyan
    
    # 현재 세션에서도 별칭 설정
    Set-Alias -Name git -Value $gitPath
    
    Write-Host "🎉 설정 완료! 이제 'git' 명령어를 직접 사용할 수 있습니다." -ForegroundColor Green
    Write-Host "예시: git status, git add ., git commit -m '메시지'" -ForegroundColor Yellow
    
} else {
    Write-Host "❌ Git 경로를 찾을 수 없습니다: $gitPath" -ForegroundColor Red
    Write-Host "GitHub Desktop이 설치되어 있는지 확인해주세요." -ForegroundColor Red
}

Write-Host "`n📝 참고: 새로운 PowerShell 창을 열면 별칭이 자동으로 적용됩니다." -ForegroundColor Cyan 