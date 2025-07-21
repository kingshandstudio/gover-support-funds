// 공통 헤더 요소들을 관리하는 파일
function loadCommonHead() {
    // AdSense 스크립트 추가
    if (!document.querySelector('script[src*="googlesyndication"]')) {
        const adSenseScript = document.createElement('script');
        adSenseScript.async = true;
        adSenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9853437874631712';
        adSenseScript.crossOrigin = 'anonymous';
        document.head.appendChild(adSenseScript);
    }
    
    // 공통 메타 태그들 추가
    const commonMetaTags = [
        '<meta name="robots" content="index, follow">',
        '<meta name="googlebot" content="index, follow">',
        '<meta name="google" content="notranslate">'
    ];
    
    commonMetaTags.forEach(tag => {
        if (!document.querySelector(tag.replace('<', '').replace('>', ''))) {
            document.head.insertAdjacentHTML('afterbegin', tag);
        }
    });
}

// 페이지 로드 시 즉시 실행
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadCommonHead);
} else {
    loadCommonHead();
} 