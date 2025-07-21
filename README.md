# 지원금24 클론 사이트

gg24.kr의 모바일 최적화된 클론 사이트입니다. 정부 지원금, 환급금, 대출 정보를 제공하는 플랫폼을 재현했습니다.

## 🚀 주요 특징

- **모바일 퍼스트 디자인**: 모바일 환경에 완전히 최적화된 반응형 웹
- **매끄러운 애니메이션**: 부드러운 전환 효과와 인터랙션
- **직관적인 UI/UX**: 사용자 친화적인 인터페이스
- **완벽한 기능 구현**: 탭 전환, 사이드 메뉴, 무한 스크롤 등

## 📱 화면 구성

### 메인 페이지 (index.html)
- 상단 알림 배너
- 로고와 헤더 네비게이션
- 메인 프로모션 배너
- 지원금24 랭킹 섹션
- 탭 메뉴 (지원금/환급금/대출 정보)
- 머니 피드 뉴스 섹션
- 하단 고정 네비게이션

### 상세 페이지 (detail.html)
- 뒤로가기 버튼이 있는 헤더
- 지원금 상세 정보
- 혜택 요약 섹션
- 탭 기반 상세 정보 (사업내용/지원대상/지원내용/절차방법)
- 신청 단계별 가이드
- 하단 고정 액션 버튼

## 🛠️ 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: 
  - Flexbox & Grid 레이아웃
  - CSS 애니메이션 & 트랜지션
  - 미디어 쿼리를 통한 반응형 디자인
- **JavaScript (ES6+)**:
  - DOM 조작
  - 이벤트 처리
  - 인터섹션 옵저버 API
  - 터치 제스처 지원
- **Font Awesome**: 아이콘
- **Google Fonts**: Noto Sans KR 폰트

## 📂 프로젝트 구조

```
gover/
├── index.html          # 메인 페이지
├── detail.html         # 지원금 상세 페이지
├── styles.css          # 메인 스타일시트
├── script.js           # JavaScript 기능
└── README.md           # 프로젝트 설명서
```

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary Blue**: `#2196F3` - 메인 브랜드 컬러
- **Dark Blue**: `#1976D2` - 강조 색상
- **Orange**: `#FFA726` - 액센트 컬러
- **Gray**: `#666` - 텍스트 컬러
- **Light Gray**: `#f8f9fa` - 배경 컬러

### 타이포그래피
- **Font Family**: Noto Sans KR
- **Font Weights**: 300, 400, 500, 700
- **Responsive Font Sizes**: 12px ~ 32px

### 간격 시스템
- **Base Unit**: 4px
- **Common Spacings**: 8px, 12px, 16px, 20px, 24px

## 🚀 실행 방법

1. 프로젝트 폴더에서 HTML 파일을 웹 브라우저로 열기
```bash
# 메인 페이지
open index.html

# 또는 라이브 서버 사용 (권장)
npx live-server
```

2. 모바일 디바이스에서 테스트하려면 Chrome DevTools의 모바일 모드 사용

## 📱 모바일 최적화 기능

### 터치 최적화
- 터치 친화적인 버튼 크기 (최소 44px)
- 터치 피드백 애니메이션
- 스와이프 제스처 지원

### 성능 최적화
- 이미지 레이지 로딩
- CSS 애니메이션 하드웨어 가속
- 디바운스/스로틀 적용

### 사용성 개선
- 무한 스크롤 (더보기 버튼)
- 토스트 메시지
- 로딩 상태 표시
- 오프라인 감지

## 🎯 주요 기능

### 네비게이션
- **사이드 메뉴**: 햄버거 메뉴를 통한 슬라이딩 네비게이션
- **하단 탭바**: 고정된 하단 네비게이션
- **브레드크럼**: 페이지 경로 표시

### 인터랙션
- **탭 전환**: 부드러운 탭 네비게이션
- **아코디언**: 확장/축소 가능한 컨텐츠
- **모달**: 오버레이 팝업

### 데이터 표시
- **카드 레이아웃**: 정보를 카드 형태로 구성
- **그리드 시스템**: 반응형 그리드 레이아웃
- **리스트 뷰**: 구조화된 정보 표시

## 🔧 커스터마이징

### 색상 변경
`styles.css`에서 CSS 변수를 수정하여 브랜드 색상 변경 가능:

```css
:root {
  --primary-color: #2196F3;
  --secondary-color: #FFA726;
  --text-color: #333;
  --background-color: #f8f9fa;
}
```

### 콘텐츠 수정
`script.js`의 데이터 배열을 수정하여 뉴스 카드나 지원금 정보 변경 가능

### 새로운 섹션 추가
HTML 구조를 유지하면서 새로운 섹션을 추가할 수 있습니다.

## 📱 호환성

### 브라우저 지원
- Chrome 60+
- Safari 12+
- Firefox 55+
- Edge 79+

### 디바이스 지원
- iPhone (iOS 12+)
- Android (API 21+)
- 태블릿 (iPadOS, Android)

## 🐛 알려진 이슈

1. Internet Explorer는 지원하지 않습니다
2. 일부 오래된 Android 브라우저에서 CSS Grid 지원 제한
3. iOS Safari에서 100vh 이슈 (해결됨)

## 🤝 기여하기

1. 포크 (Fork) 프로젝트
2. 피처 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경사항 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 푸시 (`git push origin feature/AmazingFeature`)
5. Pull Request 열기

## 📄 라이선스

이 프로젝트는 교육 목적으로 제작된 클론 사이트입니다. 
원본 사이트 gg24.kr의 디자인과 콘텐츠를 참조했습니다.

## 🙏 크레딧

- **원본 사이트**: [gg24.kr](https://gg24.kr)
- **아이콘**: [Font Awesome](https://fontawesome.com)
- **폰트**: [Google Fonts - Noto Sans KR](https://fonts.google.com/specimen/Noto+Sans+KR)

## 📞 문의

프로젝트에 대한 질문이나 피드백이 있으시면 이슈를 등록해 주세요.

---

**Note**: 이 프로젝트는 학습 목적으로 제작되었으며, 실제 서비스와는 관련이 없습니다. 