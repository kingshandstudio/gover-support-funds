// 공통 헤더 요소들을 관리하는 파일
function loadCommonHead() {
    // AdSense 스크립트를 head 태그의 맨 앞에 추가 (크롤러가 쉽게 찾을 수 있도록)
    if (!document.querySelector('script[src*="googlesyndication"]')) {
        const adSenseScript = document.createElement('script');
        adSenseScript.async = true;
        adSenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9853437874631712';
        adSenseScript.crossOrigin = 'anonymous';
        // head 태그의 맨 앞에 삽입하여 크롤러가 쉽게 찾을 수 있도록 함
        document.head.insertBefore(adSenseScript, document.head.firstChild);
    }
    
    // Google Search Console 검증
    if (!document.querySelector('meta[name="google-site-verification"]')) {
        const googleVerification = document.createElement('meta');
        googleVerification.name = 'google-site-verification';
        googleVerification.content = 'your-google-verification-code'; // 실제 코드로 교체 필요
        document.head.appendChild(googleVerification);
    }
    
    // 네이버 웹마스터 도구 검증
    if (!document.querySelector('meta[name="naver-site-verification"]')) {
        const naverVerification = document.createElement('meta');
        naverVerification.name = 'naver-site-verification';
        naverVerification.content = 'your-naver-verification-code'; // 실제 코드로 교체 필요
        document.head.appendChild(naverVerification);
    }
    
    // Daum 검증
    if (!document.querySelector('meta[name="daum-site-verification"]')) {
        const daumVerification = document.createElement('meta');
        daumVerification.name = 'daum-site-verification';
        daumVerification.content = 'your-daum-verification-code'; // 실제 코드로 교체 필요
        document.head.appendChild(daumVerification);
    }
    
    // 공통 SEO 메타 태그들 추가
    const commonMetaTags = [
        // 기본 SEO
        '<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">',
        '<meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">',
        '<meta name="google" content="notranslate">',
        
        // Open Graph (Facebook, 네이버 등)
        '<meta property="og:type" content="website">',
        '<meta property="og:site_name" content="숨은지원금24">',
        '<meta property="og:locale" content="ko_KR">',
        
        // Twitter Card
        '<meta name="twitter:card" content="summary_large_image">',
        '<meta name="twitter:site" content="@숨은지원금24">',
        
        // 네이버 특화
        '<meta name="naver-site-verification" content="your-naver-verification-code">',
        '<meta name="naver" content="noindex">', // 필요시 제거
        
        // Daum 특화
        '<meta name="daum-site-verification" content="your-daum-verification-code">',
        
        // 추가 SEO
        '<meta name="author" content="숨은지원금24">',
        '<meta name="copyright" content="숨은지원금24">',
        '<meta name="coverage" content="Worldwide">',
        '<meta name="distribution" content="Global">',
        '<meta name="rating" content="General">',
        '<meta name="revisit-after" content="7 days">',
        
        // 모바일 최적화
        '<meta name="format-detection" content="telephone=no">',
        '<meta name="mobile-web-app-capable" content="yes">',
        '<meta name="apple-mobile-web-app-capable" content="yes">',
        '<meta name="apple-mobile-web-app-status-bar-style" content="default">',
        
        // 보안
        '<meta http-equiv="X-UA-Compatible" content="IE=edge">',
        '<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">'
    ];
    
    commonMetaTags.forEach(tag => {
        const tagName = tag.match(/name="([^"]+)"/)?.[1] || tag.match(/property="([^"]+)"/)?.[1];
        if (tagName && !document.querySelector(`meta[name="${tagName}"], meta[property="${tagName}"]`)) {
            document.head.insertAdjacentHTML('afterbegin', tag);
        }
    });
    
    // 동적 Open Graph 태그 설정
    function setDynamicOGTags() {
        const title = document.title || '숨은지원금24 - 정부 지원금 정보';
        const description = document.querySelector('meta[name="description"]')?.content || 
                          '정부지원금, 정책자금, 정부대출 관련 정보를 쉽고 빠르게 전달하는 서비스입니다.';
        const url = window.location.href;
        const image = 'https://gover-support-funds.vercel.app/public/gov.png'; // 실제 이미지 URL로 교체
        
        const ogTags = [
            `<meta property="og:title" content="${title}">`,
            `<meta property="og:description" content="${description}">`,
            `<meta property="og:url" content="${url}">`,
            `<meta property="og:image" content="${image}">`,
            `<meta property="og:image:width" content="1200">`,
            `<meta property="og:image:height" content="630">`,
            `<meta name="twitter:title" content="${title}">`,
            `<meta name="twitter:description" content="${description}">`,
            `<meta name="twitter:image" content="${image}">`
        ];
        
        ogTags.forEach(tag => {
            const property = tag.match(/property="([^"]+)"/)?.[1] || tag.match(/name="([^"]+)"/)?.[1];
            if (property && !document.querySelector(`meta[property="${property}"], meta[name="${property}"]`)) {
                document.head.insertAdjacentHTML('afterbegin', tag);
            }
        });
    }
    
    // 페이지 로드 완료 후 동적 태그 설정
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setDynamicOGTags);
    } else {
        setDynamicOGTags();
    }
}

// 페이지 로드 시 즉시 실행 (크롤러가 스크립트를 찾을 수 있도록)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadCommonHead);
} else {
    loadCommonHead();
}

// 즉시 실행 (DOMContentLoaded 이전에도 실행되도록)
loadCommonHead(); 