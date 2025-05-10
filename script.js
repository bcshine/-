document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Close the menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for the navbar height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Reservation Button - Navigate to Naver Booking
    const reservationBtn = document.querySelector('.reservation .btn');
    if (reservationBtn) {
        reservationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Replace with the actual Naver booking URL
            window.open('https://booking.naver.com', '_blank');
        });
    }

    // Buy buttons functionality
    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // This will be replaced with actual e-commerce functionality
            alert('구매 기능은 준비 중입니다. 곧 서비스될 예정입니다.');
        });
    });

    // 챗봇 UI 동작
    const chatbotBtn = document.querySelector('.chatbot-btn');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const chatbotInputArea = document.querySelector('.chatbot-input-area');
    const chatbotInput = document.querySelector('.chatbot-input');

    if (chatbotBtn && chatbotWindow && chatbotClose && chatbotMessages && chatbotInputArea && chatbotInput) {
        chatbotBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('https://chatgpt.com/share/681efb83-84c8-8006-9418-ccd598bab4d7', '_blank');
        });
        chatbotClose.addEventListener('click', function() {
            chatbotWindow.style.display = 'none';
        });
        chatbotInputArea.addEventListener('submit', function(e) {
            e.preventDefault();
            const msg = chatbotInput.value.trim();
            if (!msg) return;
            addChatMessage('user', msg);
            chatbotInput.value = '';
            setTimeout(() => {
                addChatMessage('bot', '안녕하세요! 무엇을 도와드릴까요? (실제 답변은 추후 연동 예정)');
            }, 600);
        });
    }

    function addChatMessage(who, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chatbot-message ' + who;
        const bubble = document.createElement('div');
        bubble.className = 'chatbot-bubble';
        bubble.textContent = text;
        msgDiv.appendChild(bubble);
        chatbotMessages.appendChild(msgDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Animation on scroll for review items
    // This will be handled by CSS animations
});

// Add fixed reservation button for mobile
function addFixedReservationBtn() {
    if (window.innerWidth <= 768) {
        // Check if the button already exists
        if (!document.querySelector('.mobile-reservation')) {
            const mobileReservationBtn = document.createElement('div');
            mobileReservationBtn.className = 'mobile-reservation';
            mobileReservationBtn.innerHTML = '<a href="#" class="btn">예약하기</a>';
            document.body.appendChild(mobileReservationBtn);
            
            // Add click event
            mobileReservationBtn.querySelector('.btn').addEventListener('click', function(e) {
                e.preventDefault();
                // Replace with the actual Naver booking URL
                window.open('https://booking.naver.com', '_blank');
            });
        }
    } else {
        // Remove the button if it exists
        const mobileReservationBtn = document.querySelector('.mobile-reservation');
        if (mobileReservationBtn) {
            mobileReservationBtn.remove();
        }
    }
}

// Add additional styles for the mobile fixed reservation button
function addMobileReservationStyles() {
    if (!document.querySelector('#mobile-reservation-styles')) {
        const style = document.createElement('style');
        style.id = 'mobile-reservation-styles';
        style.innerHTML = `
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
            
            @media (max-width: 768px) {
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
}

// Run on load and resize
window.addEventListener('load', function() {
    addMobileReservationStyles();
    addFixedReservationBtn();
});

window.addEventListener('resize', function() {
    addFixedReservationBtn();
}); 