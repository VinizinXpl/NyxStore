/* ========================================
   NyxStore - JavaScript
   Handles navigation, product selection, and interactions
   ======================================== */

// ========================================
// HAMBURGER MENU TOGGLE
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// ========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only prevent default if it's not just "#"
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========================================
// ACTIVE NAV LINK HIGHLIGHTING
// ========================================
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        
        // Check if link matches current page
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            linkHref === window.location.pathname) {
            link.classList.add('active');
        }
    });
}

// Call on page load
document.addEventListener('DOMContentLoaded', setActiveNavLink);

// ========================================
// PRODUCT BUY BUTTON FUNCTIONALITY
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const buyButtons = document.querySelectorAll('.buy-button');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');
            const productType = this.getAttribute('data-type');
            
            // Store product information in sessionStorage
            sessionStorage.setItem('selectedProduct', productName);
            sessionStorage.setItem('selectedProductType', productType);
            
            // Get price options for subscription products
            if (productType === 'subscription') {
                const priceOptions = [];
                const productCard = this.closest('.product-card');
                const durations = productCard.querySelectorAll('.duration');
                const prices = productCard.querySelectorAll('.price');
                
                durations.forEach((duration, index) => {
                    priceOptions.push({
                        duration: duration.textContent,
                        price: prices[index].textContent
                    });
                });
                
                sessionStorage.setItem('priceOptions', JSON.stringify(priceOptions));
            }
            
            // Navigate to how-to-buy page
            window.location.href = 'how-to-buy.html';
        });
    });
});

// ========================================
// DISPLAY SELECTED PRODUCT ON HOW-TO-BUY PAGE
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Only run on how-to-buy page
    if (window.location.pathname.includes('how-to-buy') || 
        window.location.pathname.endsWith('how-to-buy.html')) {
        
        const selectedProduct = sessionStorage.getItem('selectedProduct');
        const selectedProductType = sessionStorage.getItem('selectedProductType');
        
        if (selectedProduct) {
            const selectedProductDiv = document.getElementById('selectedProduct');
            const productNameSpan = document.getElementById('productName');
            const productDuration = document.getElementById('productDuration');
            const productPermanent = document.getElementById('productPermanent');
            
            if (selectedProductDiv && productNameSpan) {
                // Show the selected product section
                selectedProductDiv.style.display = 'block';
                productNameSpan.textContent = selectedProduct;
                
                // Handle display based on product type
                if (selectedProductType === 'permanent') {
                    // Show permanent message, hide duration
                    if (productPermanent) productPermanent.style.display = 'block';
                    if (productDuration) productDuration.style.display = 'none';
                } else {
                    // For subscription products, show duration options
                    if (productDuration) {
                        productDuration.style.display = 'block';
                        const durationValue = document.getElementById('durationValue');
                        
                        if (durationValue) {
                            const priceOptions = JSON.parse(sessionStorage.getItem('priceOptions') || '[]');
                            if (priceOptions.length > 0) {
                                // Create a formatted list of options
                                const optionsText = priceOptions
                                    .map(opt => `${opt.duration} - ${opt.price}`)
                                    .join(', ');
                                durationValue.textContent = optionsText;
                            }
                        }
                    }
                    if (productPermanent) productPermanent.style.display = 'none';
                }
            }
        }
    }
});

// ========================================
// NAVBAR SCROLL EFFECT (Optional Enhancement)
// ========================================
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.7)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    }
    
    lastScroll = currentScroll;
});

// ========================================
// FORM VALIDATION (if needed in future)
// ========================================
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// ========================================
// UTILITY: Clear Session Storage on Home Page
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Clear product selection when returning to home page
    if (window.location.pathname.endsWith('index.html') || 
        window.location.pathname === '/' ||
        window.location.pathname.endsWith('/')) {
        
        // Only clear if user navigated to home (not from product click)
        const fromNavigation = document.referrer.includes('how-to-buy');
        if (fromNavigation) {
            sessionStorage.removeItem('selectedProduct');
            sessionStorage.removeItem('selectedProductType');
            sessionStorage.removeItem('priceOptions');
        }
    }
});

// ========================================
// ACCESSIBILITY: Keyboard Navigation Enhancement
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard support for buy buttons
    const buyButtons = document.querySelectorAll('.buy-button');
    
    buyButtons.forEach(button => {
        button.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});

// ========================================
// CONSOLE LOG (for debugging - remove in production)
// ========================================
console.log('NyxStore - Website loaded successfully');
console.log('Remember to update:');
console.log('- Discord handle (### in how-to-buy.html)');
console.log('- Discord server invite link');
console.log('- Product images in assets folder');
console.log('- Product prices');
