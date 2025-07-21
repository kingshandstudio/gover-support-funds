// Google AdSense 스크립트 자동 추가
function addAdSenseScript() {
    // 이미 추가되었는지 확인
    if (document.querySelector('script[src*="googlesyndication"]')) {
        return;
    }
    
    const adSenseScript = document.createElement('script');
    adSenseScript.async = true;
    adSenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9853437874631712';
    adSenseScript.crossOrigin = 'anonymous';
    
    // head 태그에 추가
    document.head.appendChild(adSenseScript);
}

// 페이지 로드 시 자동으로 AdSense 스크립트 추가
document.addEventListener('DOMContentLoaded', function() {
    addAdSenseScript();
});

// 즉시 실행 (DOMContentLoaded 이전에도 실행되도록)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addAdSenseScript);
} else {
    addAdSenseScript();
}

// DOM 요소들
const menuBtn = document.getElementById('menuBtn');
const searchBtn = document.getElementById('searchBtn');
const sideMenu = document.getElementById('sideMenu');
const menuOverlay = document.getElementById('menuOverlay');
const closeBtn = document.getElementById('closeBtn');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const categoryTabs = document.querySelectorAll('.category-tab');
const navItems = document.querySelectorAll('.nav-item');
const loadMoreBtn = document.querySelector('.load-more-btn');

// 사이드 메뉴 제어
function openSideMenu() {
    sideMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSideMenu() {
    sideMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// 이벤트 리스너 등록
menuBtn.addEventListener('click', openSideMenu);
closeBtn.addEventListener('click', closeSideMenu);
menuOverlay.addEventListener('click', closeSideMenu);

// ESC 키로 메뉴 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sideMenu.classList.contains('active')) {
        closeSideMenu();
    }
});

// 탭 전환 기능
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        // 모든 탭 버튼에서 active 클래스 제거
        tabBtns.forEach(tab => tab.classList.remove('active'));
        // 클릭된 탭 버튼에 active 클래스 추가
        btn.classList.add('active');
        
        // 모든 탭 패널 숨기기
        tabPanels.forEach(panel => panel.classList.remove('active'));
        // 해당 탭 패널 보이기
        const targetPanel = document.getElementById(targetTab);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
        
        // 탭 전환 애니메이션
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 150);
    });
});

// 카테고리 탭 전환
categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // 모든 카테고리 탭에서 active 클래스 제거
        categoryTabs.forEach(t => t.classList.remove('active'));
        // 클릭된 탭에 active 클래스 추가
        tab.classList.add('active');
        
        // 클릭 피드백 애니메이션
        tab.style.transform = 'scale(0.95)';
        setTimeout(() => {
            tab.style.transform = 'scale(1)';
        }, 150);
        
        // 여기에 카테고리별 콘텐츠 로딩 로직 추가 가능
        console.log('Selected category:', tab.textContent);
    });
});

// 하단 네비게이션 제어
navItems.forEach(item => {
    item.addEventListener('click', () => {
        // 모든 네비게이션 아이템에서 active 클래스 제거
        navItems.forEach(nav => nav.classList.remove('active'));
        // 클릭된 아이템에 active 클래스 추가
        item.classList.add('active');
        
        // 클릭 피드백 애니메이션
        item.style.transform = 'scale(0.9)';
        setTimeout(() => {
            item.style.transform = 'scale(1)';
        }, 150);
        
        const navText = item.querySelector('span').textContent;
        console.log('Navigated to:', navText);
    });
});

// 버튼 클릭 애니메이션
function addClickAnimation(element) {
    element.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
}

// 모든 버튼에 클릭 애니메이션 적용
document.querySelectorAll('button').forEach(btn => {
    addClickAnimation(btn);
});

// 신청하기 버튼들은 이제 상세 페이지로 직접 연결됩니다
// 클릭 애니메이션만 적용
document.querySelectorAll('.apply-btn, .item-apply-btn').forEach(btn => {
    addClickAnimation(btn);
});

// 더보기 버튼 기능
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        // 로딩 상태 표시
        loadMoreBtn.textContent = '로딩중...';
        loadMoreBtn.disabled = true;
        
        // 시뮬레이션: 새로운 뉴스 카드 추가
        setTimeout(() => {
            addMoreNewsCards();
            loadMoreBtn.textContent = '더보기';
            loadMoreBtn.disabled = false;
        }, 1500);
    });
}

// 새로운 뉴스 카드 추가 함수
function addMoreNewsCards() {
    const newsGrid = document.querySelector('.news-grid');
    const newCards = [
        {
            title: '2025년 신규 지원금 프로그램 안내',
            category: '지원/정책',
            image: 'https://via.placeholder.com/300x200/6C5CE7/FFFFFF?text=신규지원금'
        },
        {
            title: '청년 창업 지원사업 모집 공고',
            category: '지원/정책',
            image: 'https://via.placeholder.com/300x200/00B894/FFFFFF?text=창업지원'
        }
    ];
    
    newCards.forEach(card => {
        const cardElement = createNewsCard(card);
        newsGrid.appendChild(cardElement);
        
        // 애니메이션 효과
        cardElement.style.opacity = '0';
        cardElement.style.transform = 'translateY(20px)';
        setTimeout(() => {
            cardElement.style.transition = 'all 0.5s ease';
            cardElement.style.opacity = '1';
            cardElement.style.transform = 'translateY(0)';
        }, 100);
    });
}

// 뉴스 카드 생성 함수
function createNewsCard(cardData) {
    const article = document.createElement('article');
    article.className = 'news-card';
    article.innerHTML = `
        <div class="card-image">
            <img src="${cardData.image}" alt="${cardData.title}">
        </div>
        <div class="card-content">
            <div class="card-categories">
                <span>머니 피드</span>, <span>${cardData.category}</span>
            </div>
            <h3>${cardData.title}</h3>
        </div>
    `;
    
    // 카드 클릭 이벤트
    article.addEventListener('click', () => {
        showToast('뉴스 상세 페이지로 이동합니다.');
    });
    
    return article;
}

// 토스트 메시지 표시 함수
function showToast(message) {
    // 기존 토스트 제거
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    // 토스트 스타일
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#333',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '20px',
        fontSize: '14px',
        zIndex: '9999',
        opacity: '0',
        transition: 'all 0.3s ease'
    });
    
    document.body.appendChild(toast);
    
    // 애니메이션
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(10px)';
    }, 100);
    
    // 3초 후 제거
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(-10px)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// 스크롤 기반 애니메이션
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 애니메이션 대상 요소들
    const animateElements = document.querySelectorAll('.support-card, .ranking-card, .news-card, .support-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// 터치 제스처 지원
function setupTouchGestures() {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    // 카테고리 탭 스와이프 기능
    const categoryTabsContainer = document.querySelector('.category-tabs');
    
    categoryTabsContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    categoryTabsContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const diffX = startX - currentX;
        
        // 스크롤 제한
        if (Math.abs(diffX) > 10) {
            e.preventDefault();
        }
    });
    
    categoryTabsContainer.addEventListener('touchend', () => {
        isDragging = false;
    });
}

// 검색 기능 (시뮬레이션)
searchBtn.addEventListener('click', () => {
    showToast('검색 기능을 준비중입니다.');
});

// 알림 받기 버튼
document.querySelector('.alarm-btn').addEventListener('click', (e) => {
    e.preventDefault();
    showToast('카카오톡 알림을 설정했습니다!');
});

// 성능 최적화: 이미지 레이지 로딩
function setupLazyLoading() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
}

// 페이지 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 모든 초기화 함수를 여기서 호출
    initializeSideMenu();
    initializeTabs();
    initializeNavItems();
    initializeButtons();
    initializeLoadMore();
    initializeModals(); // supportModal 및 moreMenuModal 포함
    
    // 기타 초기화 로직
    setupScrollAnimations();
    setupTouchGestures();
    setupLazyLoading();

    // 시작 메시지
    setTimeout(() => {
        showToast('숨은지원금24에 오신 것을 환영합니다!');
    }, 1000);
});


// ===================================
// 초기화 함수들
// ===================================

function initializeSideMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const sideMenu = document.getElementById('sideMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeBtn = document.getElementById('closeBtn');

    if (menuBtn && sideMenu && menuOverlay && closeBtn) {
        menuBtn.addEventListener('click', openSideMenu);
        closeBtn.addEventListener('click', closeSideMenu);
        menuOverlay.addEventListener('click', closeSideMenu);
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sideMenu && sideMenu.classList.contains('active')) {
            closeSideMenu();
        }
    });
}

function initializeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const categoryTabs = document.querySelectorAll('.category-tab');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            tabBtns.forEach(tab => tab.classList.remove('active'));
            btn.classList.add('active');
            tabPanels.forEach(panel => panel.classList.remove('active'));
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
}

function initializeNavItems() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const isMoreButton = item.querySelector('span')?.textContent === '더보기';
        if (!isMoreButton) {
            item.addEventListener('click', () => {
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            });
        }
    });
}

function initializeButtons() {
    document.querySelectorAll('button, .apply-btn, .item-apply-btn').forEach(btn => {
        addClickAnimation(btn);
    });
    
    const searchBtn = document.getElementById('searchBtn');
    if(searchBtn) {
        searchBtn.addEventListener('click', () => showToast('검색 기능을 준비중입니다.'));
    }

    const alarmBtn = document.querySelector('.alarm-btn');
    if(alarmBtn) {
        alarmBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('카카오톡 알림을 설정했습니다!');
        });
    }
}

function initializeLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            loadMoreBtn.textContent = '로딩중...';
            loadMoreBtn.disabled = true;
            setTimeout(() => {
                addMoreNewsCards();
                loadMoreBtn.textContent = '더보기';
                loadMoreBtn.disabled = false;
            }, 1500);
        });
    }
}

function initializeModals() {
    // Support Modal 초기화
    const supportModal = document.getElementById('supportModal');
    if (supportModal) {
        supportModal.classList.remove('active');
        const topBanner = document.querySelector('.top-banner');
        const closeSupportBtn = document.querySelector('.modal-close');

        if(topBanner) topBanner.onclick = openSupportModal;
        if(closeSupportBtn) closeSupportBtn.onclick = closeSupportModal;
        
        supportModal.addEventListener('click', (e) => {
            if (e.target === supportModal) closeSupportModal();
        });
    }

    // More Menu Modal 초기화
    const moreMenuOverlay = document.getElementById('moreMenuOverlay');
    const moreMenuModal = document.getElementById('moreMenuModal');
    const moreMenuNavButton = document.querySelector('.nav-item span:last-of-type')?.parentElement;
    
    if (moreMenuOverlay && moreMenuModal) {
        moreMenuOverlay.classList.remove('active');
        moreMenuModal.classList.remove('active');
        
        if(moreMenuNavButton && moreMenuNavButton.textContent.includes('더보기')) {
            moreMenuNavButton.onclick = openMoreMenu;
        }
        
        const closeMoreMenuBtn = moreMenuModal.querySelector('.close-btn');
        if(closeMoreMenuBtn) closeMoreMenuBtn.onclick = closeMoreMenu;

        moreMenuOverlay.onclick = closeMoreMenu;
    }

    // 공통 ESC 키 이벤트
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (supportModal && supportModal.classList.contains('active')) {
                closeSupportModal();
            }
            if (moreMenuModal && moreMenuModal.classList.contains('active')) {
                closeMoreMenu();
            }
        }
    });
}


// ===================================
// 핵심 기능 함수들
// ===================================

// 사이드 메뉴 제어
function openSideMenu() {
    const sideMenu = document.getElementById('sideMenu');
    if (sideMenu) {
        sideMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSideMenu() {
    const sideMenu = document.getElementById('sideMenu');
    if (sideMenu) {
        sideMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 더보기 메뉴 관련 함수들
function openMoreMenu() {
    const overlay = document.getElementById('moreMenuOverlay');
    const modal = document.getElementById('moreMenuModal');
    if (overlay && modal) {
        overlay.classList.add('active');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeMoreMenu() {
    const overlay = document.getElementById('moreMenuOverlay');
    const modal = document.getElementById('moreMenuModal');
    if (overlay && modal) {
        overlay.classList.remove('active');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 지원금 모달 관련 함수들
function openSupportModal() {
    const modal = document.getElementById('supportModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSupportModal() {
    const modal = document.getElementById('supportModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}


// ===================================
// 보조 및 유틸리티 함수들
// ===================================

// 버튼 클릭 애니메이션
function addClickAnimation(element) {
    element.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
}

// 새로운 뉴스 카드 추가 함수
function addMoreNewsCards() {
    const newsGrid = document.querySelector('.news-grid');
    const newCards = [
        {
            title: '2025년 신규 지원금 프로그램 안내',
            category: '지원/정책',
            image: 'https://via.placeholder.com/300x200/6C5CE7/FFFFFF?text=신규지원금'
        },
        {
            title: '청년 창업 지원사업 모집 공고',
            category: '지원/정책',
            image: 'https://via.placeholder.com/300x200/00B894/FFFFFF?text=창업지원'
        }
    ];
    
    newCards.forEach(card => {
        const cardElement = createNewsCard(card);
        newsGrid.appendChild(cardElement);
        
        // 애니메이션 효과
        cardElement.style.opacity = '0';
        cardElement.style.transform = 'translateY(20px)';
        setTimeout(() => {
            cardElement.style.transition = 'all 0.5s ease';
            cardElement.style.opacity = '1';
            cardElement.style.transform = 'translateY(0)';
        }, 100);
    });
}

// 뉴스 카드 생성 함수
function createNewsCard(cardData) {
    const article = document.createElement('article');
    article.className = 'news-card';
    article.innerHTML = `
        <div class="card-image">
            <img src="${cardData.image}" alt="${cardData.title}">
        </div>
        <div class="card-content">
            <div class="card-categories">
                <span>머니 피드</span>, <span>${cardData.category}</span>
            </div>
            <h3>${cardData.title}</h3>
        </div>
    `;
    
    // 카드 클릭 이벤트
    article.addEventListener('click', () => {
        showToast('뉴스 상세 페이지로 이동합니다.');
    });
    
    return article;
}

// 토스트 메시지 표시 함수
function showToast(message) {
    // 기존 토스트 제거
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    // 토스트 스타일
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#333',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '20px',
        fontSize: '14px',
        zIndex: '9999',
        opacity: '0',
        transition: 'all 0.3s ease'
    });
    
    document.body.appendChild(toast);
    
    // 애니메이션
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(10px)';
    }, 100);
    
    // 3초 후 제거
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(-10px)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// 스크롤 기반 애니메이션
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 애니메이션 대상 요소들
    const animateElements = document.querySelectorAll('.support-card, .ranking-card, .news-card, .support-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// 터치 제스처 지원
function setupTouchGestures() {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    // 카테고리 탭 스와이프 기능
    const categoryTabsContainer = document.querySelector('.category-tabs');
    
    categoryTabsContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    categoryTabsContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const diffX = startX - currentX;
        
        // 스크롤 제한
        if (Math.abs(diffX) > 10) {
            e.preventDefault();
        }
    });
    
    categoryTabsContainer.addEventListener('touchend', () => {
        isDragging = false;
    });
}

// 검색 기능 (시뮬레이션)
searchBtn.addEventListener('click', () => {
    showToast('검색 기능을 준비중입니다.');
});

// 알림 받기 버튼
document.querySelector('.alarm-btn').addEventListener('click', (e) => {
    e.preventDefault();
    showToast('카카오톡 알림을 설정했습니다!');
});

// 성능 최적화: 이미지 레이지 로딩
function setupLazyLoading() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
}

// 페이지 가시성 변경 처리
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // 페이지가 숨겨질 때
        console.log('Page hidden');
    } else {
        // 페이지가 다시 보일 때
        console.log('Page visible');
    }
});

// 온라인/오프라인 상태 감지
window.addEventListener('online', () => {
    showToast('인터넷 연결이 복구되었습니다.');
});

window.addEventListener('offline', () => {
    showToast('인터넷 연결을 확인해주세요.');
});

// PWA 설치 지원
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // 설치 버튼 표시 (필요시)
    console.log('PWA install prompt available');
});

// 유틸리티 함수들
const utils = {
    // 디바운스 함수
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // 스로틀 함수
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // 로컬 스토리지 헬퍼
    storage: {
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                console.warn('Storage not available:', e);
            }
        },
        
        get(key) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            } catch (e) {
                console.warn('Storage read error:', e);
                return null;
            }
        }
    }
};

// 전역으로 유틸리티 노출
window.supportUtils = utils; 