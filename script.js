class UbuntuAllianceDemo {
    constructor() {
        this.initializeDemo();
    }

    initializeDemo() {
        this.handlePageTransition();
        this.handleScrollEffects();
        this.handleNavigation();
        this.handleAnimations();
        this.handleModals();
        this.handleForms();
        this.handleCounters();
        this.handleParticles();
        this.handleParallax();
        this.handleGallery();
        this.handleAccordion();
        this.handleTimeline();
        this.handleSearch();
        this.handleProgressBars();
        this.handleMobileMenu();
        this.handleBackToTop();
        this.handleLazyLoading();
        this.handleSmoothScrolling();
        this.handleRippleEffect();
        this.initializeDemoFeatures();
    }

    handlePageTransition() {
        const transition = document.querySelector('.page-transition');
        if (transition) {
            setTimeout(() => {
                transition.style.animation = 'pageEnter 800ms ease reverse forwards';
                setTimeout(() => {
                    transition.style.display = 'none';
                }, 800);
            }, 800);
        }
    }

    handleScrollEffects() {
        const header = document.querySelector('.main-header');
        const backToTop = document.getElementById('backToTop');
        
        const scrollHandler = () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
                backToTop?.classList.add('visible');
            } else {
                header.classList.remove('scrolled');
                backToTop?.classList.remove('visible');
            }
            
            this.handleScrollAnimations();
        };
        
        window.addEventListener('scroll', scrollHandler);
    }

    handleScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
        const windowHeight = window.innerHeight;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('animated');
            }
        });
    }

    handleNavigation() {
        const navItems = document.querySelectorAll('.nav-item a');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navItems.forEach(item => {
            item.parentElement.classList.remove('active');
            if (item.getAttribute('href') === currentPage) {
                item.parentElement.classList.add('active');
            }
        });
        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    handleAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    if (entry.target.classList.contains('stagger-item')) {
                        const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                        entry.target.style.animationDelay = `${index * 100}ms`;
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .stagger-item').forEach(el => {
            observer.observe(el);
        });
    }

    handleModals() {
        const modalTriggers = document.querySelectorAll('[data-modal]');
        const modalClose = document.querySelectorAll('.modal-close');
        
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const modalId = trigger.dataset.modal;
                const modal = document.getElementById(modalId);
                if (modal) modal.classList.add('active');
            });
        });
        
        modalClose.forEach(close => {
            close.addEventListener('click', () => {
                const modal = close.closest('.modal');
                if (modal) modal.classList.remove('active');
            });
        });
        
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
            }
        });
    }

    handleForms() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn?.textContent;
                
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                }
                
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
                
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> DEMO: Thank you! This demonstrates form submission functionality.';
                successMessage.style.cssText = `
                    background: var(--success);
                    color: white;
                    padding: 1rem;
                    border-radius: var(--border-radius-md);
                    margin-top: 1rem;
                    animation: fadeInUp 400ms ease;
                `;
                
                form.appendChild(successMessage);
                
                setTimeout(() => {
                    successMessage.remove();
                    if (form.classList.contains('newsletter-form')) {
                        form.reset();
                    }
                }, 5000);
            });
        });
    }

    handleCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.count);
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            if (current > target) current = target;
                            counter.textContent = Math.floor(current).toLocaleString();
                            requestAnimationFrame(updateCounter);
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }

    handleParticles() {
        const container = document.getElementById('particles');
        if (!container) return;
        
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 5 + 2}px;
                height: ${Math.random() * 5 + 2}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: float ${Math.random() * 20 + 10}s infinite linear;
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes float {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    100% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg); }
                }
            `;
            
            document.head.appendChild(style);
            container.appendChild(particle);
        }
    }

    handleParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-background');
        
        const parallaxHandler = () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(el => {
                const rate = scrolled * -0.5;
                el.style.transform = `translate3d(0, ${rate}px, 0)`;
            });
        };
        
        window.addEventListener('scroll', parallaxHandler);
    }

    handleGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        if (galleryItems.length === 0) return;
        
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="" alt="">
                <button class="lightbox-close">&times;</button>
                <button class="lightbox-prev"><i class="fas fa-chevron-left"></i></button>
                <button class="lightbox-next"><i class="fas fa-chevron-right"></i></button>
            </div>
        `;
        document.body.appendChild(lightbox);
        
        let currentIndex = 0;
        const images = Array.from(galleryItems).map(item => 
            item.style.backgroundImage.replace('url("', '').replace('")', '')
        );
        
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentIndex = index;
                this.openLightbox(images[index], lightbox);
            });
        });
        
        lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
        
        lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            this.openLightbox(images[currentIndex], lightbox);
        });
        
        lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            this.openLightbox(images[currentIndex], lightbox);
        });
    }

    openLightbox(src, lightbox) {
        lightbox.querySelector('img').src = src;
        lightbox.classList.add('active');
    }

    handleAccordion() {
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const accordionItem = header.parentElement;
                const accordionContent = header.nextElementSibling;
                
                accordionItem.classList.toggle('active');
                
                if (accordionItem.classList.contains('active')) {
                    accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                } else {
                    accordionContent.style.maxHeight = 0;
                }
            });
        });
    }

    handleTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        timelineItems.forEach(item => observer.observe(item));
    }

    handleSearch() {
        const searchBtn = document.querySelector('.search-btn');
        const searchContainer = document.querySelector('.search-container');
        
        searchBtn?.addEventListener('click', () => {
            searchContainer?.classList.toggle('active');
            if (searchContainer?.classList.contains('active')) {
                searchContainer.querySelector('input')?.focus();
            }
        });
        
        const searchModalBtn = document.querySelector('[data-modal="searchModal"]');
        if (searchModalBtn) {
            searchModalBtn.addEventListener('click', (e) => {
                e.preventDefault();
                document.getElementById('searchModal').classList.add('active');
            });
        }
    }

    handleProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target;
                    const width = progress.dataset.progress + '%';
                    progress.style.width = width;
                    observer.unobserve(progress);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => observer.observe(bar));
    }

    handleMobileMenu() {
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');
        
        mobileBtn?.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            navMenu?.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn?.classList.remove('active');
                navMenu?.classList.remove('active');
            });
        });
    }

    handleBackToTop() {
        const backToTop = document.getElementById('backToTop');
        
        backToTop?.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    handleLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src], [data-bg]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    if (img.dataset.bg) {
                        img.style.backgroundImage = `url(${img.dataset.bg})`;
                        img.removeAttribute('data-bg');
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    handleSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    handleRippleEffect() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-primary, .btn-secondary');
            if (btn) {
                const ripple = document.createElement('span');
                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                `;
                ripple.classList.add('ripple');
                
                btn.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
        });
    }

    initializeDemoFeatures() {
        this.initializeDonationForm();
        this.initializeEventCalendar();
        this.initializeVolunteerRoles();
        this.handleResponsiveImages();
    }

    initializeDonationForm() {
        const donationAmounts = document.querySelectorAll('.donation-amount');
        const customAmountInput = document.querySelector('.custom-amount');
        
        donationAmounts.forEach(amount => {
            amount.addEventListener('click', () => {
                donationAmounts.forEach(a => a.classList.remove('selected'));
                amount.classList.add('selected');
                if (customAmountInput) customAmountInput.value = '';
            });
        });
        
        customAmountInput?.addEventListener('input', () => {
            donationAmounts.forEach(a => a.classList.remove('selected'));
        });
    }

    initializeEventCalendar() {
        const calendarDays = document.querySelectorAll('.calendar-day');
        
        calendarDays.forEach(day => {
            if (day.classList.contains('has-event')) {
                day.addEventListener('click', () => {
                    const eventModal = document.getElementById('eventModal');
                    if (eventModal) {
                        eventModal.classList.add('active');
                    }
                });
            }
        });
    }

    initializeVolunteerRoles() {
        const roleCards = document.querySelectorAll('.role-card');
        
        roleCards.forEach(card => {
            card.addEventListener('click', () => {
                roleCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                
                const roleForm = document.getElementById('volunteerForm');
                if (roleForm) {
                    const roleInput = roleForm.querySelector('input[name="role"]');
                    if (roleInput) {
                        roleInput.value = card.dataset.role;
                    }
                }
            });
        });
    }

    handleResponsiveImages() {
        const images = document.querySelectorAll('img[data-srcset]');
        
        const updateImageSrc = () => {
            const width = window.innerWidth;
            
            images.forEach(img => {
                const srcset = img.dataset.srcset;
                const sources = srcset.split(',').map(src => {
                    const [url, size] = src.trim().split(' ');
                    return { url, size: parseInt(size) };
                });
                
                sources.sort((a, b) => a.size - b.size);
                
                let selectedSrc = sources[0].url;
                for (const source of sources) {
                    if (width >= source.size) {
                        selectedSrc = source.url;
                    }
                }
                
                if (img.src !== selectedSrc) {
                    img.src = selectedSrc;
                }
            });
        };
        
        window.addEventListener('resize', this.debounce(updateImageSrc, 250));
        updateImageSrc();
    }

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
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new UbuntuAllianceDemo();
});

window.addEventListener('beforeunload', () => {
    const transition = document.querySelector('.page-transition');
    if (transition) {
        transition.style.display = 'block';
        transition.style.animation = 'pageEnter 800ms ease forwards';
    }
});

const createPlaceholderPages = () => {
    const pages = ['about', 'platform', 'news', 'events', 'get-involved', 'donate', 'contact', '404'];
    
    pages.forEach(page => {
        const link = document.querySelector(`a[href="${page}.html"]`);
        if (!link) return;
        
        link.addEventListener('click', (e) => {
            if (window.location.pathname.includes(page + '.html')) return;
            
            e.preventDefault();
            
            const transition = document.querySelector('.page-transition');
            if (transition) {
                transition.style.display = 'block';
                transition.style.animation = 'pageEnter 800ms ease forwards';
                
                setTimeout(() => {
                    window.location.href = page + '.html';
                }, 400);
            }
        });
    });
};

createPlaceholderPages();