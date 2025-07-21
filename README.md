# 🏛️ 지원금24 - 한국 정부 지원금 정보 플랫폼

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://gover-support-funds.vercel.app)
[![GitHub](https://img.shields.io/badge/Source-GitHub-blue?style=flat&logo=github)](https://github.com/kingshandstudio/gover-support-funds)

## 🌟 **프로젝트 소개**

**지원금24**는 한국 정부의 다양한 지원금 정보를 쉽고 빠르게 제공하는 웹 플랫폼입니다. 
민생회복지원금, 근로장려금, 에너지캐시백 등 다양한 정부 지원정책을 한눈에 확인하고 신청할 수 있습니다.

## 🚀 **배포된 사이트**

**🌐 Live Demo**: [https://gover-support-funds.vercel.app](https://gover-support-funds.vercel.app)

## 💡 **주요 기능**

### 📱 **메인 페이지**
- **지원금 카드**: 주요 정부 지원금 정보 카드
- **머니 피드**: 최신 지원금 뉴스 및 정보
- **인기 랭킹**: 인기 있는 지원금 순위
- **카테고리별 탭**: 체계적인 정보 분류

### 📋 **상세 페이지들**
- **민생회복지원금** (`/detail.html`)
  - 행정안전부 공식 이미지 갤러리 (확대 기능)
  - 10개 카드사 직접 신청 링크
  - 행정안전부 공식 페이지 연동
- **근로장려금** (`/detail-geunro.html`)
- **주택용 에너지캐시백** (`/detail-energy.html`)
- **일반전세자금보증** (`/detail-jeonse.html`)

### 📰 **뉴스 아티클**
- **민생회복 소비쿠폰 가이드** (`/article-coupon.html`)
- **부가가치세 신고 가이드** (`/article-tax.html`)
- **실업급여 신청 가이드** (`/article-unemployment.html`)
- **민생회복 소비쿠폰 2025** (`/article-coupon2025.html`)

### 🎯 **추가 페이지**
- **맞춤 정책** (`/policy.html`) - 개인별 맞춤 정책 추천
- **머니 피드** (`/feed.html`) - 종합 뉴스 페이지

## 🛠️ **기술 스택**

### **Frontend**
- **HTML5** - 시맨틱 마크업
- **CSS3** - Flexbox, Grid, 애니메이션
- **JavaScript (ES6+)** - DOM 조작, 이벤트 처리

### **디자인**
- **반응형 디자인** - 모바일 퍼스트
- **Font Awesome** - 아이콘
- **Google Fonts** - Noto Sans KR

### **배포**
- **GitHub** - 소스 코드 관리
- **Vercel** - 자동 배포 및 호스팅

## 🎨 **UI/UX 특징**

### **📱 모바일 최적화**
- 터치 친화적 인터페이스
- 하단 고정 네비게이션
- 스와이프 제스처 지원

### **🖼️ 인터랙티브 요소**
- 호버 효과 및 클릭 애니메이션
- 이미지 갤러리 (확대/축소)
- 모달 팝업
- 탭 전환 효과

### **🎯 사용자 경험**
- 직관적인 네비게이션
- 빠른 로딩 속도
- 일관된 디자인 시스템
- 접근성 고려

## 📊 **프로젝트 구조**

```
gover-support-funds/
├── 📄 index.html              # 메인 페이지
├── 🎨 styles.css              # 통합 스타일시트
├── ⚡ script.js               # JavaScript 로직
├── 📋 상세 페이지들
│   ├── detail.html            # 민생회복지원금
│   ├── detail-geunro.html     # 근로장려금
│   ├── detail-energy.html     # 에너지캐시백
│   └── detail-jeonse.html     # 전세자금보증
├── 📰 뉴스 아티클들
│   ├── article-coupon.html
│   ├── article-tax.html
│   ├── article-coupon2025.html
│   └── article-unemployment.html
├── 🎯 기타 페이지들
│   ├── policy.html            # 맞춤 정책
│   └── feed.html              # 머니 피드
├── 🖼️ public/                 # 이미지 자산
│   ├── gov.png               # 정부 로고
│   ├── nts.png               # 국세청 로고
│   ├── hood1.jpg, hood2.jpg, hood3.jpg  # 공식 안내 이미지
│   └── 1.png, 2.png, 3.png, 4.png      # 뉴스 이미지
├── ⚙️ package.json            # 프로젝트 설정
├── 🚀 vercel.json             # 배포 설정
└── 📝 README.md               # 프로젝트 문서
```

## 🔗 **외부 연동**

### **정부 기관 연동**
- **행정안전부**: 민생회복지원금 공식 페이지
- **국세청**: 근로장려금 신청 페이지
- **한국에너지공단**: 에너지캐시백 정보

### **카드사 연동** (10개사)
- KB국민카드, 신한카드, 삼성카드, 현대카드, 롯데카드
- BC카드, 씨티카드, 우리카드, 하나카드, 수협카드

## 📱 **반응형 브레이크포인트**

- **Mobile**: ~ 768px
- **Tablet**: 769px ~ 1024px  
- **Desktop**: 1025px ~

## 🛡️ **보안 및 성능**

### **보안 헤더**
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

### **성능 최적화**
- 이미지 지연 로딩 (`loading="lazy"`)
- CDN 캐싱 (31536000초)
- CSS/JS 압축
- 웹폰트 최적화

## 🌐 **SEO 최적화**

- 시맨틱 HTML5 마크업
- 메타 태그 최적화
- Open Graph 태그
- 구조화된 데이터 (JSON-LD)
- 모바일 친화적 설계



## 📄 **라이센스**

MIT License - 자유롭게 사용 및 수정 가능

## 🤝 **기여하기**

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**⭐ 이 프로젝트가 유용하다면 Star를 눌러주세요!**

**🚀 배포된 사이트**: [gover-support-funds.vercel.app](https://gover-support-funds.vercel.app) 