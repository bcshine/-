// 웹사이트의 설정값들을 모아둔 객체예요
const CONFIG = {
    BREAKPOINT: 768,
    SCROLL_OFFSET: 70,
    ANIMATION_DELAY: 1000,
    BOOKING_URL: 'https://booking.naver.com'
};

// 웹사이트의 주요 기능들을 모아둔 객체예요
const App = {
    // 웹사이트가 처음 로드될 때 실행되는 함수예요
    init() {
        this.initNavigation();
        this.initSmoothScroll();
        this.initReservation();
        this.initBuyButtons();
        this.initChatbot();
        this.initScrollAnimation();
        this.initMobileReservation();
    },

    // 네비게이션(메뉴) 관련 기능을 초기화해요
    initNavigation() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        menuToggle?.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    },

    // 부드러운 스크롤 기능을 초기화해요
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - CONFIG.SCROLL_OFFSET,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    // 예약 기능을 초기화해요
    initReservation() {
        const reservationBtn = document.querySelector('.reservation .btn');
        reservationBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(CONFIG.BOOKING_URL, '_blank');
        });
    },

    // 구매 버튼 기능을 초기화해요
    initBuyButtons() {
        document.querySelectorAll('.buy-btn').forEach(button => {
            button.addEventListener('click', () => {
                alert('구매 기능은 준비 중입니다. 곧 서비스될 예정입니다.');
            });
        });
    },

    // 챗봇 기능을 초기화해요
    initChatbot() {
        const elements = {
            btn: document.querySelector('.chatbot-btn'),
            window: document.querySelector('.chatbot-window'),
            close: document.querySelector('.chatbot-close'),
            form: document.querySelector('.chatbot-input-area'),
            input: document.querySelector('.chatbot-input'),
            messages: document.querySelector('.chatbot-messages')
        };

        // 챗봇 버튼을 누르면 외부 챗봇 링크로 이동해요
        elements.btn?.addEventListener('click', () => {
            window.open('https://chatgpt.com/g/g-681cbbab8794819185a0f373ad6fc607-saneurogan-godeungeo-caesbos', '_blank');
        });

        // 내부 챗봇 창은 더 이상 사용하지 않아요
        // elements.close?.addEventListener('click', () => {
        //     elements.window.style.display = 'none';
        // });
        // elements.form?.addEventListener('submit', ...)
    },

    // 챗봇 메시지를 추가하는 함수예요
    addChatMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}`;
        
        const bubble = document.createElement('div');
        bubble.className = 'chatbot-bubble';
        bubble.textContent = text;
        
        messageDiv.appendChild(bubble);
        document.querySelector('.chatbot-messages').appendChild(messageDiv);
        document.querySelector('.chatbot-messages').scrollTop = document.querySelector('.chatbot-messages').scrollHeight;
    },

    // 스크롤 애니메이션을 초기화해요
    initScrollAnimation() {
        const sections = document.querySelectorAll('section');
        
        window.addEventListener('scroll', () => {
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (sectionTop < windowHeight * 0.75) {
                    section.classList.add('active');
                }
            });
        });
    },

    // 모바일 예약 버튼을 초기화해요
    initMobileReservation() {
        this.addMobileReservationStyles();
        this.updateMobileReservationButton();

        window.addEventListener('resize', () => {
            this.updateMobileReservationButton();
        });
    },

    // 모바일 예약 버튼 스타일을 추가해요
    addMobileReservationStyles() {
        if (!document.querySelector('#mobile-reservation-styles')) {
            const style = document.createElement('style');
            style.id = 'mobile-reservation-styles';
            style.textContent = `
                .mobile-reservation {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    background-color: white;
                    padding: 10px;
                    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
                    z-index: 999;
                    text-align: center;
                    display: none;
                }
                
                @media (max-width: ${CONFIG.BREAKPOINT}px) {
                    .mobile-reservation {
                        display: block;
                    }
                    
                    .chatbot {
                        bottom: 80px;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    },

    // 모바일 예약 버튼을 업데이트해요
    updateMobileReservationButton() {
        if (window.innerWidth <= CONFIG.BREAKPOINT) {
            if (!document.querySelector('.mobile-reservation')) {
                const mobileReservationBtn = document.createElement('div');
                mobileReservationBtn.className = 'mobile-reservation';
                mobileReservationBtn.innerHTML = '<a href="#" class="btn">예약하기</a>';
                document.body.appendChild(mobileReservationBtn);
                
                mobileReservationBtn.querySelector('.btn').addEventListener('click', (e) => {
                    e.preventDefault();
                    window.open(CONFIG.BOOKING_URL, '_blank');
                });
            }
        } else {
            document.querySelector('.mobile-reservation')?.remove();
        }
    }
};

// 웹사이트가 로드되면 초기화를 시작해요
document.addEventListener('DOMContentLoaded', () => App.init()); 