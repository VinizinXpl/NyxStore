// NyxStore - Modern Edition
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Loading Screen Logic
    const loader = document.getElementById('loading-screen');
    const hasLoadedBefore = sessionStorage.getItem('nyx_loaded');

    if (loader) {
        if (!hasLoadedBefore) {
            // First visit: Show loader then fade out
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    sessionStorage.setItem('nyx_loaded', 'true');
                }, 500);
            }, 1500); // 1.5s loading time
        } else {
            // Subsequent visits: Hide immediately
            loader.style.display = 'none';
        }
    }

    // 2. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navActions.style.display = navActions.style.display === 'flex' ? 'none' : 'flex';
            
            // Simple mobile style injection for the toggle state
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'var(--nav-bg)';
                navLinks.style.padding = '20px';
                navLinks.style.borderBottom = '1px solid var(--glass-border)';
                
                navActions.style.position = 'absolute';
                navActions.style.top = '250px'; // Approximate position
                navActions.style.left = '0';
                navActions.style.width = '100%';
                navActions.style.justifyContent = 'center';
                navActions.style.padding = '20px';
            }
        });
    }

    // 3. Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply initial styles and observe
    const animatedElements = document.querySelectorAll('.game-card, .feature-item, .section-header');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // 4. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'var(--nav-bg)';
            navbar.style.boxShadow = 'none';
        }
    });
});
