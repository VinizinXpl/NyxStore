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

            if(productName === 'Addict') {
                updateSelectedProductDurations(['1 dia', '3 dias', '7 dias', '30 dias']);
            } else {
                updateSelectedProductDurations(['2 dias', '7 dias', '30 dias']);
            }
            
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

            function updateSelectedProductDurations(durations) {
                const durationElements = document.querySelectorAll('#selectedProduct .duration');
                durationElements.forEach((element, index) => {
                    element.textContent = durations[index] || '';
                });
            }
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
    // Clear product selection on every page load
    sessionStorage.removeItem('selectedProduct');
    sessionStorage.removeItem('selectedProductType');
    sessionStorage.removeItem('priceOptions');
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
// LANGUAGE TRANSLATION SYSTEM
// ========================================
const translations = {
    pt: {
        currency: 'R$',
        nav: {
            home: 'Início',
            products: 'Produtos',
            howToBuy: 'Como Comprar',
            faq: 'FAQ'
        },
        hero: {
            title: 'Bem Vindo(a) à Nyx Store',
            subtitle: 'Encontre assinaturas e produtos permanentes para seus jogos favoritos. Qualidade garantida e suporte dedicado.',
            cta: 'Ver Produtos'
        },
        products: {
            title: 'Nossos Produtos',
            subscription: 'Assinatura',
            permanent: 'Permanente',
            buyButton: 'Comprar',
            day1: '1 dia',
            days3: '3 dias',
            days7: '7 dias',
            days30: '30 dias',
            permanentLabel: 'Permanente',
            unicoreDesc: 'Hack Para Genshin Impact',
            uniwavesDesc: 'Hack Para Wuthering Waves',
            shikaBetaDesc: 'Hack Genshin Impact - Necessário uso do Slash Bypass (Caso contrário o risco de banimento é quase certo)',
            shikaAlphaDesc: 'Hack Genshin Impact - Necessário uso do Slash Bypass (Caso contrário o risco de banimento é quase certo)',
            slashBypassDesc: 'Bypass para Shika Free/Beta/Alpha',
            kittenwavesDesc: 'Hack para Wuthering Waves',
            unizoneDesc: 'Hack para Zenless Zone Zero',
            antiAddictDesc: 'Hack para Genshin Impact'
        },
        howToBuy: {
            title: 'Como Comprar',
            selectedProduct: 'Produto Selecionado',
            product: 'Produto',
            duration: 'Duração',
            type: 'Tipo',
            permanentNote: 'Produto Permanente (sem expiração)',
            seller: 'Vendedor',
            sellerRole: 'Proprietário da NyxStore',
            finalizing: 'Finalizando a Compra',
            instructions: 'Para finalizar sua compra, entre em contato comigo no Discord:',
            discord: 'Discord',
            required: 'Ao entrar em contato, forneça:',
            reqItem1: 'O produto que deseja comprar',
            reqItem2: 'A duração selecionada (se aplicável)',
            reqItem3: 'Seu método de pagamento preferido',
            enterServer: 'Entrar no Servidor',
            viewFaq: 'Ver FAQ',
            backToProducts: '← Voltar aos Produtos'
        },
        faq: {
            title: 'Perguntas Frequentes',
            q1: 'Onde posso comprar os produtos?',
            a1: 'Todos os produtos são adquiridos através de contato direto no Discord. Visite a página "Como Comprar" para instruções detalhadas.',
            q2: 'Existem riscos ao usar esses produtos?',
            a2: 'O uso de hacks e bypasses sempre envolve riscos, incluindo possível banimento. Use por sua conta e risco.',
            q3: 'Existe algum tutorial disponível?',
            a3: 'Sim, após a compra você receberá instruções completas de instalação e uso. Suporte adicional está disponível no servidor Discord.',
            q4: 'Qual é a diferença entre produtos de subscrição e permanentes?',
            a4: 'Produtos de subscrição têm prazo definido (3, 7 ou 30 dias), enquanto produtos permanentes não expiram e são seus para sempre após a compra.',
            q5: 'Quais métodos de pagamento são aceitos?',
            a5: 'Os métodos de pagamento aceitos serão discutidos diretamente com o vendedor no Discord. Entre em contato para mais informações.',
            q6: 'Posso receber reembolso?',
            a6: 'A política de reembolso varia. Discuta sua situação específica com o vendedor antes de finalizar a compra.',
            stillQuestions: 'Ainda tem dúvidas?',
            contactUs: 'Entre em contato conosco no Discord para obter mais informações.',
            howToBuyButton: 'Como Comprar'
        },
        footer: {
            rights: '© 2025 NyxStore. Todos os direitos reservados.'
        },
        modal: {
            features: 'Funcionalidades:'
        }
    },
    en: {
        currency: 'USD',
        nav: {
            home: 'Home',
            products: 'Products',
            howToBuy: 'How to Buy',
            faq: 'FAQ'
        },
        hero: {
            title: 'Welcome to Nyx Store',
            subtitle: 'Find subscriptions and permanent products for your favorite games. Guaranteed quality and dedicated support.',
            cta: 'View Products'
        },
        products: {
            title: 'Our Products',
            subscription: 'Subscription',
            permanent: 'Permanent',
            buyButton: 'Buy',
            day1: '1 day',
            days3: '3 days',
            days7: '7 days',
            days30: '30 days',
            permanentLabel: 'Permanent',
            unicoreDesc: 'Hack For Genshin Impact',
            uniwavesDesc: 'Hack For Wuthering Waves',
            shikaBetaDesc: 'Genshin Impact Hack - Slash Bypass required (Otherwise ban risk is almost certain)',
            shikaAlphaDesc: 'Genshin Impact Hack - Slash Bypass required (Otherwise ban risk is almost certain)',
            slashBypassDesc: 'Bypass for Shika Free/Beta/Alpha',
            kittenwavesDesc: 'Hack for Wuthering Waves',
            unizoneDesc: 'Hack for Zenless Zone Zero',
            antiAddictDesc: 'Hack for Genshin Impact'
        },
        howToBuy: {
            title: 'How to Buy',
            selectedProduct: 'Selected Product',
            product: 'Product',
            duration: 'Duration',
            type: 'Type',
            permanentNote: 'Permanent Product (no expiration)',
            seller: 'Seller',
            sellerRole: 'NyxStore Owner',
            finalizing: 'Completing Your Purchase',
            instructions: 'To complete your purchase, contact me on Discord:',
            discord: 'Discord',
            required: 'When contacting, please provide:',
            reqItem1: 'The product you want to buy',
            reqItem2: 'The selected duration (if applicable)',
            reqItem3: 'Your preferred payment method',
            enterServer: 'Join Server',
            viewFaq: 'View FAQ',
            backToProducts: '← Back to Products'
        },
        faq: {
            title: 'Frequently Asked Questions',
            q1: 'Where can I buy the products?',
            a1: 'All products are purchased through direct Discord contact. Visit the "How to Buy" page for detailed instructions.',
            q2: 'Are there any risks in using these products?',
            a2: 'Using hacks and bypasses always involves risks, including possible bans. Use at your own risk.',
            q3: 'Is there a tutorial available?',
            a3: 'Yes, after purchase you will receive complete installation and usage instructions. Additional support is available on the Discord server.',
            q4: 'What is the difference between subscription and permanent products?',
            a4: 'Subscription products have a defined period (3, 7 or 30 days), while permanent products do not expire and are yours forever after purchase.',
            q5: 'What payment methods are accepted?',
            a5: 'Accepted payment methods will be discussed directly with the seller on Discord. Contact for more information.',
            q6: 'Can I get a refund?',
            a6: 'Refund policy varies. Discuss your specific situation with the seller before completing the purchase.',
            stillQuestions: 'Still have questions?',
            contactUs: 'Contact us on Discord for more information.',
            howToBuyButton: 'How to Buy'
        },
        footer: {
            rights: '© 2025 NyxStore. All rights reserved.'
        },
        modal: {
            features: 'Features:'
        }
    }
};

// Get current language from localStorage or default to Portuguese
let currentLanguage = localStorage.getItem('nyxstore-language') || 'pt';

// Function to change language
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('nyxstore-language', lang);
    
    // Update flag only (no text)
    const flagIcon = document.querySelector('.flag-icon');
    const langText = document.querySelector('.lang-text');
    
    if (flagIcon) {
        flagIcon.textContent = lang === 'pt' ? '🇧🇷' : '🇺🇸';
    }
    
    // Hide the lang text element
    if (langText) {
        langText.style.display = 'none';
    }
    
    // Translate all elements with data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const keys = key.split('.');
        let translation = translations[lang];
        
        keys.forEach(k => {
            translation = translation[k];
        });
        
        if (translation) {
            element.textContent = translation;
        }
    });

    // Dispatch event to notify other components (like product modal) of language change
    window.dispatchEvent(new Event('languageChanged'));
    
    // Update currency and convert prices
    // Exchange rate: Current rate 1 USD = 5.41 BRL
    const BRL_TO_USD = 1 / 5.41; // 1 BRL = 0.1845 USD (approximately)
    const USD_TO_BRL = 5.41; // 1 USD = 5.41 BRL
    
    document.querySelectorAll('.price').forEach(priceElement => {
        const text = priceElement.textContent.trim();
        
        if (lang === 'en') {
            // Convert R$ to USD
            if (text.startsWith('R$')) {
                // Extract the numeric value
                const brlValue = text.replace('R$', '').replace(',', '.').trim();
                const numValue = parseFloat(brlValue);
                
                if (!isNaN(numValue)) {
                    const usdValue = (numValue * BRL_TO_USD).toFixed(2);
                    priceElement.textContent = `USD ${usdValue}`;
                    // Store original BRL value as data attribute
                    priceElement.setAttribute('data-brl', text);
                }
            }
        } else {
            // Convert back to R$ or restore original
            if (text.startsWith('USD')) {
                // Check if we have the original BRL value stored
                const originalBRL = priceElement.getAttribute('data-brl');
                
                if (originalBRL) {
                    priceElement.textContent = originalBRL;
                } else {
                    // Convert USD to BRL
                    const usdValue = text.replace('USD', '').trim();
                    const numValue = parseFloat(usdValue);
                    
                    if (!isNaN(numValue)) {
                        const brlValue = (numValue * USD_TO_BRL).toFixed(2).replace('.', ',');
                        priceElement.textContent = `R$ ${brlValue}`;
                    }
                }
            }
        }
    });
    
    // Update product types
    document.querySelectorAll('.product-type').forEach(typeElement => {
        const currentText = typeElement.textContent.trim();
        if (lang === 'en') {
            if (currentText === 'Assinatura') typeElement.textContent = 'Subscription';
            if (currentText === 'Permanente') typeElement.textContent = 'Permanent';
        } else {
            if (currentText === 'Subscription') typeElement.textContent = 'Assinatura';
            if (currentText === 'Permanent') typeElement.textContent = 'Permanente';
        }
    });
    
    // Update navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
        if (index === 0) link.textContent = translations[lang].nav.home;
        if (index === 1) link.textContent = translations[lang].nav.products;
        if (index === 2) link.textContent = translations[lang].nav.howToBuy;
        if (index === 3) link.textContent = translations[lang].nav.faq;
    });
}

// Language toggle button event listener
document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('languageToggle');
    
    if (languageToggle) {
        // Set initial language
        changeLanguage(currentLanguage);
        
        languageToggle.addEventListener('click', function() {
            const newLang = currentLanguage === 'pt' ? 'en' : 'pt';
            changeLanguage(newLang);
        });
    }
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
