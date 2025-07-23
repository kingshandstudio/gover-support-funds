// DOM 요소들 (DOMContentLoaded에서 초기화)
let menuBtn, searchBtn, sideMenu, menuOverlay, closeBtn;
let tabBtns, tabPanels, categoryTabs, navItems, loadMoreBtn;

// ===================================
// 보안 및 방지 기능
// ===================================

// 무한새로고침 방지
let refreshCount = 0;
const maxRefreshCount = 5;
const refreshTimeout = 10000; // 10초

function preventInfiniteRefresh() {
    const currentTime = Date.now();
    const lastRefreshTime = sessionStorage.getItem('lastRefreshTime');
    
    if (lastRefreshTime && (currentTime - parseInt(lastRefreshTime)) < refreshTimeout) {
        refreshCount++;
        sessionStorage.setItem('refreshCount', refreshCount.toString());
        
        if (refreshCount >= maxRefreshCount) {
            alert('너무 자주 새로고침하고 있습니다. 잠시 후 다시 시도해주세요.');
            return false;
        }
    } else {
        refreshCount = 1;
        sessionStorage.setItem('refreshCount', refreshCount.toString());
    }
    
    sessionStorage.setItem('lastRefreshTime', currentTime.toString());
    return true;
}

// 광고클릭 방지
function preventAdClick() {
    // 광고 관련 요소들에 대한 클릭 방지
    const adSelectors = [
        '[data-ad]',
        '[class*="ad"]',
        '[class*="ads"]',
        '[id*="ad"]',
        '[id*="ads"]',
        '[href*="ad"]',
        '[href*="ads"]',
        '[href*="click"]',
        '[href*="track"]'
    ];
    
    adSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showToast('유효하지 않은 링크입니다.');
                return false;
            });
        });
    });
}

// 스팸 클릭 방지
let clickCount = 0;
const maxClickCount = 10;
const clickTimeout = 5000; // 5초

function preventSpamClick(element) {
    const currentTime = Date.now();
    const lastClickTime = sessionStorage.getItem('lastClickTime');
    
    if (lastClickTime && (currentTime - parseInt(lastClickTime)) < clickTimeout) {
        clickCount++;
        sessionStorage.setItem('clickCount', clickCount.toString());
        
        if (clickCount >= maxClickCount) {
            showToast('너무 자주 클릭하고 있습니다. 잠시 후 다시 시도해주세요.');
            return false;
        }
    } else {
        clickCount = 1;
        sessionStorage.setItem('clickCount', clickCount.toString());
    }
    
    sessionStorage.setItem('lastClickTime', currentTime.toString());
    return true;
}

// 개발자 도구 방지
function preventDevTools() {
    // F12 키 방지
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
            e.preventDefault();
            showToast('개발자 도구 사용이 제한됩니다.');
            return false;
        }
    });
    
    // 우클릭 방지 (선택적)
    document.addEventListener('contextmenu', function(e) {
        // 특정 요소에서는 우클릭 허용
        if (e.target.closest('.allow-right-click')) {
            return true;
        }
        e.preventDefault();
        showToast('우클릭이 제한됩니다.');
        return false;
    });
}

// 무한 루프 방지
let loopCount = 0;
const maxLoopCount = 100;

function preventInfiniteLoop() {
    loopCount++;
    if (loopCount > maxLoopCount) {
        console.error('무한 루프 감지됨');
        return false;
    }
    return true;
}

// 페이지 보안 초기화
function initializeSecurity() {
    // 새로고침 방지
    window.addEventListener('beforeunload', function(e) {
        if (!preventInfiniteRefresh()) {
            e.preventDefault();
            e.returnValue = '';
        }
    });
    
    // 광고클릭 방지
    preventAdClick();
    
    // 개발자 도구 방지
    preventDevTools();
    
    // 스크립트 주입 방지
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => {
        if (script.src && !script.src.includes(window.location.origin)) {
            script.remove();
        }
    });
    
    // 외부 링크 보안
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.href;
            if (!href.includes(window.location.hostname)) {
                e.preventDefault();
                showToast('외부 링크는 보안상 제한됩니다.');
                return false;
            }
        });
    });
}

// ===================================
// 기존 코드 (수정됨)
// ===================================

// 사이드 메뉴 제어
function openSideMenu() {
    if (!preventSpamClick()) return;
    
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

// 이벤트 리스너 등록
if (menuBtn) menuBtn.addEventListener('click', openSideMenu);
if (closeBtn) closeBtn.addEventListener('click', closeSideMenu);
if (menuOverlay) menuOverlay.addEventListener('click', closeSideMenu);

// ESC 키로 메뉴 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sideMenu && sideMenu.classList.contains('active')) {
        closeSideMenu();
    }
});

// 머니피드 탭 전환 기능
function switchFeedTab(tabType, clickedElement) {
    if (!preventSpamClick()) return;
    
    // 모든 탭에서 active 클래스 제거
    const tabs = document.querySelectorAll('.category-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // 클릭된 탭에 active 클래스 추가
    if (clickedElement) {
        clickedElement.classList.add('active');
    }
    
    // 모든 피드 숨기기
    const feeds = document.querySelectorAll('.news-grid');
    feeds.forEach(feed => feed.style.display = 'none');
    
    // 해당 피드 보이기
    const targetFeed = document.getElementById(tabType + '-feed');
    if (targetFeed) {
        targetFeed.style.display = 'grid';
    }
    
    // 버튼 클릭 효과
    if (clickedElement) {
        clickedElement.style.transform = 'scale(0.95)';
        setTimeout(() => {
            clickedElement.style.transform = 'scale(1)';
        }, 150);
    }
    
    // 토스트 메시지
    const tabNames = {
        'support': '지원/정책',
        'small-business': '소상공인',
        'mortgage': '담보대출',
        'insurance': '보험',
        'credit': '신용대출',
        'credit-card': '신용카드',
        'savings': '예적금',
        'asset': '자산관리',
        'jeonse': '전세대출'
    };
    
    showToast(`${tabNames[tabType]} 피드를 확인하세요!`);
}

// 탭 스크롤 기능
function scrollTabs(direction) {
    const tabsContainer = document.querySelector('.category-tabs');
    if (!tabsContainer) {
        console.log('category-tabs를 찾을 수 없습니다.');
        return;
    }
    
    const scrollAmount = 200; // 한 번에 스크롤할 픽셀 수
    const currentScroll = tabsContainer.scrollLeft;
    
    if (direction === 'right') {
        tabsContainer.scrollLeft = currentScroll + scrollAmount;
        console.log('오른쪽으로 스크롤:', currentScroll + scrollAmount);
    } else if (direction === 'left') {
        tabsContainer.scrollLeft = currentScroll - scrollAmount;
        console.log('왼쪽으로 스크롤:', currentScroll - scrollAmount);
    }
}

// 탭 전환 기능
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (!preventSpamClick(btn)) return;
        
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
        if (!preventSpamClick(tab)) return;
        
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
        if (!preventSpamClick(item)) return;
        
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
    element.addEventListener('click', function(e) {
        if (!preventSpamClick(this)) {
            e.preventDefault();
            return;
        }
        
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
        if (!preventSpamClick(loadMoreBtn)) return;
        
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
    if (!preventInfiniteLoop()) return;
    
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
        if (!preventSpamClick(article)) return;
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
    
    if (categoryTabsContainer) {
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
}

// 검색 기능 (시뮬레이션)
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        if (!preventSpamClick(searchBtn)) return;
        showToast('검색 기능을 준비중입니다.');
    });
}

// 알림 받기 버튼
const alarmBtn = document.querySelector('.alarm-btn');
if (alarmBtn) {
    alarmBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!preventSpamClick(alarmBtn)) return;
        showToast('카카오톡 알림을 설정했습니다!');
    });
}

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
    // 보안 초기화
    initializeSecurity();
    
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
    
    // 상단 배너 클릭 이벤트 추가 확인
    const topBanner = document.querySelector('.top-banner');
    if (topBanner) {
        topBanner.addEventListener('click', function(e) {
            console.log('상단 배너가 클릭되었습니다.');
            openSupportModal();
        });
    }
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
            if (!preventSpamClick(btn)) return;
            
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
            if (!preventSpamClick(tab)) return;
            
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
                if (!preventSpamClick(item)) return;
                
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
        searchBtn.addEventListener('click', () => {
            if (!preventSpamClick(searchBtn)) return;
            showToast('검색 기능을 준비중입니다.');
        });
    }

    const alarmBtn = document.querySelector('.alarm-btn');
    if(alarmBtn) {
        alarmBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!preventSpamClick(alarmBtn)) return;
            showToast('카카오톡 알림을 설정했습니다!');
        });
    }
}

function initializeLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            if (!preventSpamClick(loadMoreBtn)) return;
            
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

        if(topBanner) {
            topBanner.onclick = openSupportModal;
            console.log('상단 배너 클릭 이벤트가 설정되었습니다.');
        }
        if(closeSupportBtn) {
            closeSupportBtn.onclick = closeSupportModal;
            console.log('모달 닫기 버튼 클릭 이벤트가 설정되었습니다.');
        }
        
        supportModal.addEventListener('click', (e) => {
            if (e.target === supportModal) closeSupportModal();
        });
        
        console.log('민생회복지원금 모달이 초기화되었습니다.');
    } else {
        console.error('supportModal을 찾을 수 없습니다.');
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

// 더보기 메뉴 관련 함수들
function openMoreMenu() {
    if (!preventSpamClick()) return;
    
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
    // 스팸 클릭 방지를 제거하여 모달이 정상적으로 열리도록 함
    const modal = document.getElementById('supportModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('민생회복지원금 모달이 열렸습니다.');
    } else {
        console.error('supportModal을 찾을 수 없습니다.');
    }
}

function closeSupportModal() {
    const modal = document.getElementById('supportModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        console.log('민생회복지원금 모달이 닫혔습니다.');
    } else {
        console.error('supportModal을 찾을 수 없습니다.');
    }
}

// ===================================
// 보조 및 유틸리티 함수들
// ===================================

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

// DOM이 로드된 후 초기화
document.addEventListener('DOMContentLoaded', function() {
    // DOM 요소들 초기화
    menuBtn = document.getElementById('menuBtn');
    searchBtn = document.getElementById('searchBtn');
    sideMenu = document.getElementById('sideMenu');
    menuOverlay = document.getElementById('menuOverlay');
    closeBtn = document.getElementById('closeBtn');
    tabBtns = document.querySelectorAll('.tab-btn');
    tabPanels = document.querySelectorAll('.tab-panel');
    categoryTabs = document.querySelectorAll('.category-tab');
    navItems = document.querySelectorAll('.nav-item');
    loadMoreBtn = document.querySelector('.load-more-btn');
    
    console.log('DOM 요소들 초기화 완료:', {
        tabBtns: tabBtns.length,
        tabPanels: tabPanels.length
    });
    
    // 탭 전환 기능 초기화
    if (tabBtns && tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // preventSpamClick 체크 제거 (탭 전환은 스팸이 아님)
                
                const targetTab = btn.getAttribute('data-tab');
                console.log('탭 클릭됨:', targetTab);
                
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
                    console.log('패널 활성화:', targetTab);
                } else {
                    console.log('패널을 찾을 수 없음:', targetTab);
                }
                
                // 탭 전환 애니메이션
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = 'scale(1)';
                }, 150);
                
                // 토스트 메시지
                const tabNames = {
                    'support': '지원금',
                    'refund': '환급금',
                    'loan': '대출 정보'
                };
                
                if (tabNames[targetTab]) {
                    showToast(`${tabNames[targetTab]} 탭을 확인하세요!`);
                }
            });
        });
        
        console.log('탭 전환 기능이 초기화되었습니다.');
    } else {
        console.log('탭 버튼을 찾을 수 없습니다.');
    }
}); 