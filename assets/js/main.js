// assets/js/main.js - Funcionalidades gerais do site

// Esperar o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    
    // ============= NAVBAR FUNCIONALIDADES =============
    
    // Highlight da página atual na navegação
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Busca funcional (simulada)
    const searchInput = document.querySelector('input[type="search"]');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.toLowerCase();
                if (query) {
                    // Redirecionar para produtos com filtro (simulado)
                    window.location.href = `products.html?search=${encodeURIComponent(query)}`;
                }
            }
        });
    }

    // Contador do carrinho (simulado)
    const cartBadge = document.querySelector('.badge.rounded-pill');
    if (cartBadge) {
        const cartCount = localStorage.getItem('cartCount') || 0;
        cartBadge.textContent = cartCount;
    }

    // ============= ANIMAÇÕES E EFEITOS =============
    
    // Smooth scroll para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animação de fade-in para cards quando entrarem na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animação aos cards
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    // ============= BOTÕES INTERATIVOS =============
    
    // Adicionar efeito ripple aos botões
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // ============= TOOLTIPS E POPOVERS =============
    
    // Inicializar tooltips do Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // ============= FORMULÁRIOS =============
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('footer .input-group');
    if (newsletterForm) {
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitBtn = newsletterForm.querySelector('button');
        
        submitBtn.addEventListener('click', function() {
            const email = emailInput.value;
            if (email && validateEmail(email)) {
                // Simular inscrição
                showNotification('Email cadastrado com sucesso!', 'success');
                emailInput.value = '';
            } else {
                showNotification('Por favor, insira um email válido.', 'error');
            }
        });
    }

    // ============= FUNCIONALIDADES ESPECÍFICAS =============
    
    // Página de produtos - filtros
    if (window.location.pathname.includes('products.html')) {
        initProductFilters();
    }

    // Página de funções - filtros
    if (window.location.pathname.includes('functions.html')) {
        initFunctionFilters();
    }

    // FAQ - busca
    if (window.location.pathname.includes('faq.html')) {
        initFAQSearch();
    }
});

// ============= FUNÇÕES AUXILIARES =============

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type = 'info') {
    // Criar toast notification
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type === 'error' ? 'danger' : 'success'} border-0`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    // Container para toasts
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    toastContainer.appendChild(toast);
    
    // Inicializar e mostrar toast
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    // Remover após ocultar
    toast.addEventListener('hidden.bs.toast', function() {
        toast.remove();
    });
}

// Filtros de produtos
function initProductFilters() {
    const filterButtons = document.querySelectorAll('.btn[data-filter]');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Atualizar botão ativo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar produtos
            productCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Filtros de funções
function initFunctionFilters() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const functionCards = document.querySelectorAll('.function-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Atualizar botão ativo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar cards
            functionCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Busca FAQ
function initFAQSearch() {
    const searchInput = document.getElementById('faq-search');
    const categoryFilter = document.getElementById('category-filter');
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    function filterFAQ() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const selectedCategory = categoryFilter ? categoryFilter.value : 'all';
        
        accordionItems.forEach(item => {
            const question = item.querySelector('.accordion-button').textContent.toLowerCase();
            const answer = item.querySelector('.accordion-body').textContent.toLowerCase();
            const category = item.dataset.category;
            
            const matchesSearch = question.includes(searchTerm) || answer.includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
            
            if (matchesSearch && matchesCategory) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', filterFAQ);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterFAQ);
    }
}

// ============= CSS CUSTOMIZAÇÕES =============

// Adicionar estilos para ripple effect
const rippleStyles = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
    
    .text-gradient {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .bg-gradient-dark {
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    }
    
    .bg-gradient-primary {
        background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    }
    
    .bg-gradient-info {
        background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
    }
    
    .hero-compact {
        padding: 4rem 0 2rem;
        margin-top: 76px;
    }
    
    .hero-product-img {
        filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
    }
`;

// Aplicar estilos
const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);
