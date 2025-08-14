// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initMobileMenu();
    initSlider();
    initMarquee();
    initEnhancedScrollAnimations();
    initSmoothScrolling();
    initDropdowns();
    initParallaxEffects();
    initStaggeredAnimations();
    
    // Mobile Menu Toggle
    function initMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                mobileToggle.classList.toggle('active');
                
                // Animate hamburger to X
                const spans = mobileToggle.querySelectorAll('span');
                spans.forEach((span, index) => {
                    if (mobileToggle.classList.contains('active')) {
                        if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                        if (index === 1) span.style.opacity = '0';
                        if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                    } else {
                        span.style.transform = 'none';
                        span.style.opacity = '1';
                    }
                });
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    const spans = mobileToggle.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.transform = 'none';
                        span.style.opacity = '1';
                    });
                }
            });
        }
    }
    
    // Awards Slider Functionality
    function initSlider() {
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentSlide = 0;
        
        if (slides.length === 0) return;
        
        function showSlide(index) {
            // Hide all slides
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Show current slide
            slides[index].classList.add('active');
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
        
        // Event listeners for buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        
        // Auto-slide every 5 seconds
        setInterval(nextSlide, 5000);
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });
        
        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        const slider = document.querySelector('.slider');
        if (slider) {
            slider.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            slider.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
        }
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide(); // Swipe left
                } else {
                    prevSlide(); // Swipe right
                }
            }
        }
    }
    
    // Marquee Animation
    function initMarquee() {
        const marquee = document.querySelector('.marquee h2');
        if (!marquee) return;
        
        // Clone the text for seamless loop
        const originalText = marquee.textContent;
        marquee.textContent = originalText + ' ☼ ' + originalText;
        
        // Reset animation when it completes
        marquee.addEventListener('animationend', function() {
            marquee.style.animation = 'none';
            setTimeout(() => {
                marquee.style.animation = 'marquee 25s linear infinite';
            }, 10);
        });
    }
    
    // Enhanced Scroll Animations - Fixed
    function initEnhancedScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a small delay to prevent immediate animation
                    setTimeout(() => {
                        entry.target.classList.add('et-animated');
                    }, 100);
                    
                    // Add subtle staggered animation for cards
                    if (entry.target.classList.contains('service-card') || 
                        entry.target.classList.contains('testimonial-card') ||
                        entry.target.classList.contains('card')) {
                        entry.target.style.animationDelay = `${Math.random() * 0.2}s`;
                    }
                }
            });
        }, observerOptions);
        
        // Observe all elements with et-waypoint class
        const animatedElements = document.querySelectorAll('.et-waypoint');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
        
        // Add animation to cards and service items with staggered delays
        const cards = document.querySelectorAll('.card, .service-card, .testimonial-card');
        cards.forEach((card, index) => {
            card.classList.add('et-waypoint');
            card.style.animationDelay = `${index * 0.05}s`;
            observer.observe(card);
        });
        
        // Add scroll-triggered animations for sections - more subtle
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.classList.add('fade-in-up');
            observer.observe(section);
        });
        
        // Add specific animations for different elements - more subtle
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.classList.add('slide-in-left');
            observer.observe(heroImage);
        }
        
        const heroText = document.querySelector('.hero-text');
        if (heroText) {
            heroText.classList.add('slide-in-up');
            observer.observe(heroText);
        }
        
        const heroZodiac = document.querySelector('.hero-zodiac');
        if (heroZodiac) {
            heroZodiac.classList.add('slide-in-right');
            observer.observe(heroZodiac);
        }
    }
    
    // Staggered Animations - Fixed
    function initStaggeredAnimations() {
        const staggerElements = document.querySelectorAll('.service-card, .testimonial-card, .card');
        
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animated');
                    }, index * 50); // Reduced delay
                }
            });
        }, { threshold: 0.2 });
        
        staggerElements.forEach(el => {
            el.classList.add('fade-in-up');
            staggerObserver.observe(el);
        });
    }
    
    // Parallax Effects - Fixed
    function initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero-image, .hero-zodiac');
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.2; // Reduced parallax intensity
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }
    
    // Smooth Scrolling for Anchor Links
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Dropdown Menu Enhancement
    function initDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const menu = dropdown.querySelector('.dropdown-menu');
            
            // Add touch support for mobile
            dropdown.addEventListener('touchstart', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
        });
    }
    
    // Header Scroll Effect
    function initHeaderScroll() {
        const header = document.querySelector('.header');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Lazy Loading for Images
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Form Validation (if forms exist)
    function initFormValidation() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                        
                        // Remove error class after user starts typing
                        field.addEventListener('input', function() {
                            this.classList.remove('error');
                        });
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                    alert('Please fill in all required fields.');
                }
            });
        });
    }
    
    // Initialize form validation
    initFormValidation();
    
    // Back to Top Button
    function initBackToTop() {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '<i class="fa fa-chevron-up"></i>';
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #033097, #1a4bb8);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            font-size: 18px;
            box-shadow: 0 4px 15px rgba(3, 48, 151, 0.3);
        `;
        
        document.body.appendChild(backToTopBtn);
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        backToTopBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.background = 'linear-gradient(135deg, #936d45, #b88a5a)';
        });
        
        backToTopBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = 'linear-gradient(135deg, #033097, #1a4bb8)';
        });
    }
    
    // Initialize back to top button
    initBackToTop();
    
    // Preloader (if needed)
    function initPreloader() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            window.addEventListener('load', function() {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            });
        }
    }
    
    // Initialize preloader
    initPreloader();
    
    // Counter Animation
    function initCounters() {
        const counters = document.querySelectorAll('.counter');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        });
        
        counters.forEach(counter => counterObserver.observe(counter));
    }
    
    // Initialize counters
    initCounters();
    
    // Enhanced Parallax Effect
    function initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-speed') || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
    
    // Initialize parallax
    initParallax();
    
    // Search Functionality (if search exists)
    function initSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchResults = document.querySelector('.search-results');
        
        if (searchInput && searchResults) {
            searchInput.addEventListener('input', function() {
                const query = this.value.trim();
                
                if (query.length > 2) {
                    // Simulate search results
                    const results = [
                        'Astrology Services',
                        'Numerology Consultation',
                        'Palmistry Reading',
                        'Vastu Consultation'
                    ].filter(item => item.toLowerCase().includes(query.toLowerCase()));
                    
                    displaySearchResults(results);
                } else {
                    searchResults.style.display = 'none';
                }
            });
        }
    }
    
    function displaySearchResults(results) {
        const searchResults = document.querySelector('.search-results');
        if (!searchResults) return;
        
        if (results.length > 0) {
            searchResults.innerHTML = results.map(result => 
                `<div class="search-result-item">${result}</div>`
            ).join('');
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
            searchResults.style.display = 'block';
        }
    }
    
    // Initialize search
    initSearch();
    
    // Cookie Consent (if needed)
    function initCookieConsent() {
        const cookieConsent = document.querySelector('.cookie-consent');
        if (cookieConsent && !localStorage.getItem('cookieConsent')) {
            cookieConsent.style.display = 'block';
            
            const acceptBtn = cookieConsent.querySelector('.accept-cookies');
            if (acceptBtn) {
                acceptBtn.addEventListener('click', function() {
                    localStorage.setItem('cookieConsent', 'true');
                    cookieConsent.style.display = 'none';
                });
            }
        }
    }
    
    // Initialize cookie consent
    initCookieConsent();
    
    // Performance Optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debouncing to scroll events
    const debouncedScrollHandler = debounce(function() {
        // Scroll-based animations and effects
    }, 16); // ~60fps
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Console welcome message
    console.log('🌟 Dr. Sohini Sastri - Best Astrologer in India 🌟');
    console.log('Website loaded successfully with enhanced animations!');
    
});

// Additional utility functions
function formatPhoneNumber(phone) {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    `;
    
    if (type === 'success') notification.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
    else if (type === 'error') notification.style.background = 'linear-gradient(135deg, #dc3545, #e74c3c)';
    else notification.style.background = 'linear-gradient(135deg, #17a2b8, #20c997)';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .pulse {
        animation: pulse 2s infinite;
    }
`;
document.head.appendChild(style); 