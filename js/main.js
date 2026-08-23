document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loading-screen');
    if (loader) {
        loader.style.opacity = '0';
        loader.style.pointerEvents = 'none';
        setTimeout(() => {
            loader.remove();
        }, 250);
    }

    const navbar = document.querySelector('.navbar');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (navbar && mobileBtn && navLinks) {
        const closeMenu = () => {
            navbar.classList.remove('nav-open');
            mobileBtn.setAttribute('aria-expanded', 'false');
        };

        mobileBtn.addEventListener('click', () => {
            const isOpen = navbar.classList.toggle('nav-open');
            mobileBtn.setAttribute('aria-expanded', String(isOpen));
        });

        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeMenu();
            }
        });
    }

    if (navbar) {
        const setNavbarState = () => {
            if (window.scrollY > 16) {
                navbar.classList.add('is-scrolled');
            } else {
                navbar.classList.remove('is-scrolled');
            }
        };

        setNavbarState();
        window.addEventListener('scroll', setNavbarState, { passive: true });
    }

    document.querySelectorAll('[data-go-back]').forEach((button) => {
        button.addEventListener('click', () => {
            if (window.history.length > 1) {
                window.history.back();
                return;
            }

            window.location.href = '../index.html';
        });
    });

    if ('IntersectionObserver' in window) {
        const targets = document.querySelectorAll('.hero-copy, .benefits article, .game-card, .cta-box, .product-card, .game-link');
        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add('revealed');
                currentObserver.unobserve(entry.target);
            });
        }, { threshold: 0.1 });

        targets.forEach((target) => {
            target.classList.add('reveal-item');
            observer.observe(target);
        });
    }
});
