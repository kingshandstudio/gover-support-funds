# 🚀 GitHub Desktop을 통한 Git 사용 가이드

## 📍 **Git 설치 위치**
```
C:\Users\KK\AppData\Local\GitHubDesktop\app-3.5.1\resources\app\git\cmd\git.exe
```

## 🔧 **터미널에서 Git 사용하기**

### 1. Git 명령어 실행 방법
```powershell
# Git 버전 확인
& "C:\Users\KK\AppData\Local\GitHubDesktop\app-3.5.1\resources\app\git\cmd\git.exe" --version

# Git 상태 확인
& "C:\Users\KK\AppData\Local\GitHubDesktop\app-3.5.1\resources\app\git\cmd\git.exe" status

# 파일 스테이징
& "C:\Users\KK\AppData\Local\GitHubDesktop\app-3.5.1\resources\app\git\cmd\git.exe" add .

# 커밋
& "C:\Users\KK\AppData\Local\GitHubDesktop\app-3.5.1\resources\app\git\cmd\git.exe" commit -m "커밋 메시지"

# 푸시
& "C:\Users\KK\AppData\Local\GitHubDesktop\app-3.5.1\resources\app\git\cmd\git.exe" push origin main
```

### 2. 간단한 별칭 설정 (선택사항)
```powershell
# PowerShell 프로필에 별칭 추가
Set-Alias -Name git -Value "C:\Users\KK\AppData\Local\GitHubDesktop\app-3.5.1\resources\app\git\cmd\git.exe"
```

## 🖥️ **GitHub Desktop GUI 사용하기**

### 1. GitHub Desktop 실행
```powershell
# GitHub Desktop 실행
Start-Process "C:\Users\KK\AppData\Local\GitHubDesktop\GitHubDesktop.exe"
```

### 2. 저장소 열기
- GitHub Desktop에서 "File" → "Open Local Repository"
- 경로: `C:\Users\KK\Desktop\gover` 선택

### 3. 변경사항 확인 및 커밋
1. 왼쪽 패널에서 수정된 파일들 확인
2. Summary에 커밋 메시지 입력
3. Description에 상세 설명 입력 (선택사항)
4. "Commit to main" 클릭

### 4. 푸시
- "Push origin" 버튼 클릭

## 📋 **자주 사용하는 Git 명령어**

### 기본 명령어
```bash
# 상태 확인
git status

# 변경사항 스테이징
git add .

# 커밋
git commit -m "커밋 메시지"

# 푸시
git push origin main

# 풀
git pull origin main

# 브랜치 확인
git branch

# 로그 확인
git log --oneline
```

### 고급 명령어
```bash
# 특정 파일만 스테이징
git add filename.html

# 변경사항 되돌리기
git restore filename.html

# 커밋 히스토리 확인
git log --graph --oneline --all

# 원격 저장소 확인
git remote -v
```

## 🎯 **프로젝트별 커밋 메시지 템플릿**

### 기능 추가
```
기능명 구현 완료

- 주요 변경사항 1
- 주요 변경사항 2
- 주요 변경사항 3
```

### 버그 수정
```
버그명 수정

- 수정 내용 1
- 수정 내용 2
```

### UI/UX 개선
```
UI/UX 개선

- 개선 사항 1
- 개선 사항 2
- 반응형 디자인 최적화
```

## 📝 **최근 커밋 예시**

### 햄버거 메뉴 기능 구현 (2025-01-21)
```
햄버거 메뉴 기능 구현 및 페이지 연결 완료

- 모든 페이지에서 햄버거 메뉴 작동하도록 구현
- 메인카피/서브카피 구별 스타일링 추가
- 보안 기능 통합 (스팸 클릭 방지, 개발자 도구 방지)
- 반응형 디자인 최적화
```

## ⚠️ **주의사항**

1. **PowerShell 오류 방지**
   - 긴 명령어는 따옴표로 감싸기
   - 한글 메시지는 인코딩 주의

2. **커밋 전 확인사항**
   - `git status`로 변경사항 확인
   - 불필요한 파일 제외하기

3. **푸시 전 확인사항**
   - 원격 저장소와 동기화 상태 확인
   - 충돌 해결 필요시 먼저 해결

## 🔗 **유용한 링크**

- **GitHub Desktop**: `C:\Users\KK\AppData\Local\GitHubDesktop\GitHubDesktop.exe`
- **Git 실행파일**: `C:\Users\KK\AppData\Local\GitHubDesktop\app-3.5.1\resources\app\git\cmd\git.exe`
- **프로젝트 경로**: `C:\Users\KK\Desktop\gover`
- **원격 저장소**: `https://github.com/kingshandstudio/gover-support-funds.git`

## 📞 **문제 해결**

### Git 명령어가 인식되지 않을 때
```powershell
# Git 경로 확인
Get-ChildItem "C:\Users\KK\AppData\Local\GitHubDesktop" -Recurse -Name "git.exe"
```

### GitHub Desktop이 실행되지 않을 때
```powershell
# 프로세스 확인
Get-Process | Where-Object {$_.ProcessName -like "*GitHub*"}

# 강제 실행
Start-Process "C:\Users\KK\AppData\Local\GitHubDesktop\GitHubDesktop.exe" -Force
```

---

**마지막 업데이트**: 2025-01-21  
**작성자**: AI Assistant  
**프로젝트**: 숨은지원금24 (gover-support-funds) 