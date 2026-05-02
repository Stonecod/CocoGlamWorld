// ========================================
// COCOGLAMWORLD - MAIN SCRIPT (UPGRADED)
// ========================================

// global state for order type
let currentOrderType = 'product';

// ========================================
// SCROLL REVEAL (IntersectionObserver)
// ========================================
function initScrollReveal() {
    if (!('IntersectionObserver' in window)) {
        // Fallback: just show everything
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
            el.classList.add('visible');
        });
        return;
    }

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        revealObserver.observe(el);
    });
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
function initNavbarScroll() {
    const navbar = document.getElementById('mainNav');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });
}

// ========================================
// TOAST & FORM ERROR HELPERS
// ========================================
function ensureToastContainer() {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    return container;
}

function showToast(message, type = 'success') {
    const container = ensureToastContainer();
    const toast = document.createElement('div');
    toast.className = 'toast toast-' + (type === 'error' ? 'error' : 'success');
    toast.textContent = message;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'opacity 0.3s, transform 0.3s';
        setTimeout(() => toast.remove(), 350);
    }, 4000);
}

function showFormError(formId, message) {
    const el = document.getElementById(formId);
    if (el) {
        el.textContent = message;
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function clearFormError(formId) {
    const el = document.getElementById(formId);
    if (el) el.textContent = '';
}

function showSuccessMessage(form, message) {
    let msg = form.querySelector('.form-success');
    if (!msg) {
        msg = document.createElement('div');
        msg.className = 'form-success';
        msg.style.cssText = 'color:#2e7d32; margin-top:12px; font-weight:500; text-align:center;';
        form.appendChild(msg);
    }
    msg.textContent = message;
    setTimeout(() => { msg.textContent = ''; }, 5000);
}

// ========================================
// MOBILE NAVIGATION
// ========================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        navToggle.classList.toggle('open', isOpen);
        navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        document.body.style.overflow = isOpen ? 'hidden' : '';
        document.documentElement.style.overflow = isOpen ? 'hidden' : '';
    });
}

// Close mobile menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('active');
        if (navToggle) navToggle.classList.remove('open');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        if (navToggle) navToggle.setAttribute('aria-label', 'Open menu');
    });
});

// ========================================
// PRODUCT CARD FACTORY
// ========================================
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-item';
    card.setAttribute('data-category', product.category);

    let inner = '';
    if (product.imageUrl && product.imageUrl.trim() !== '') {
        inner += `<img src="${product.imageUrl}" alt="${product.name}" class="product-img" loading="lazy">`;
    } else {
        inner += `<div class="product-img" style="display:flex;align-items:center;justify-content:center;background:#fde8ee;border-radius:12px;font-size:3rem;height:190px;">${product.icon || '💄'}</div>`;
    }

    inner += `<h3>${product.name}</h3>`;

    if (!product.comingSoon && product.price) {
        inner += `<p class="product-price">₦${product.price.toLocaleString()}</p>`;
    }

    if (product.badges && product.badges.length > 0) {
        inner += `<div class="product-badges">`;
        product.badges.forEach(badge => {
            const cls = badge.toLowerCase().replace(/\s+/g, '-');
            inner += `<span class="badge ${cls}">${badge}</span>`;
        });
        inner += `</div>`;
    }

    if (product.swatch) {
        inner += `<div class="swatch" style="background:${product.swatch};"></div>`;
    }

    inner += `<p class="product-description">${product.description}</p>`;

    if (product.comingSoon) {
        inner += `<div class="coming-soon-badge">Coming Soon</div>`;
    } else {
        if (product.benefits && product.benefits.length > 0) {
            inner += `<p class="product-benefits">` + product.benefits.map(b => `✓ ${b}`).join(' &nbsp;') + `</p>`;
        }
        inner += `<button class="btn btn-primary buy-now-btn request-product-btn" data-product-id="${product.id}" data-product-name="${product.name}" data-product-price="${product.price || 0}">Request Product</button>`;
    }

    card.innerHTML = inner;
    return card;
}

// ========================================
// SERVICE CARD FACTORY
// ========================================
function createServiceCard(service) {
    const card = document.createElement('div');
    card.className = 'service-card reveal';
    card.setAttribute('data-service-name', service.name);
    card.setAttribute('data-service-price', service.price);

    const imgSrc = service.imageUrl && service.imageUrl.trim()
        ? service.imageUrl
        : `https://via.placeholder.com/400x200/fde8ee/5a1a2c?text=${encodeURIComponent(service.name)}`;

    let inner = `<img src="${imgSrc}" alt="${service.name}" loading="lazy">`;

    if (service.popular) {
        inner += `<div class="service-badge">⭐ Most Popular</div>`;
    }

    inner += `<div class="service-info">`;
    inner += `<h3>${service.name}</h3>`;
    inner += `<p>${service.description}</p>`;
    inner += `<div class="service-meta">⏱ ${service.duration}</div>`;
    inner += `<div class="service-meta" style="font-weight:600;color:var(--secondary-color);">₦${service.price.toLocaleString()}</div>`;
    inner += `<button class="book-btn" data-service-name="${service.name}" data-service-price="${service.price}">Book Appointment</button>`;
    inner += `</div>`;

    card.innerHTML = inner;
    return card;
}

// ========================================
// RENDER SERVICES (services.html)
// ========================================
function renderServices() {
    const container = document.getElementById('servicesContainer');
    if (!container || !Array.isArray(window.servicesData)) return;
    container.innerHTML = '';

    const categories = [...new Set(window.servicesData.map(s => s.category))];
    categories.forEach(cat => {
        const section = document.createElement('div');
        section.className = 'services-category';

        const heading = document.createElement('h2');
        heading.textContent = cat;
        heading.className = 'reveal';
        section.appendChild(heading);

        const grid = document.createElement('div');
        grid.className = 'services-grid';

        window.servicesData.filter(s => s.category === cat).forEach(svc => {
            const card = createServiceCard(svc);
            grid.appendChild(card);
        });

        section.appendChild(grid);
        container.appendChild(section);
    });

    // Re-observe newly created reveal elements
    initScrollReveal();

    // Booking click handler
    container.addEventListener('click', function(e) {
        if (!e.target.classList.contains('book-btn')) return;
        const name = e.target.dataset.serviceName;
        const price = e.target.dataset.servicePrice;
        if (!name || !price) return;
        const params = new URLSearchParams({ type: 'service', name, price });
        window.location.href = `checkout.html?${params.toString()}`;
    });
}

// ========================================
// RENDER PRODUCTS
// ========================================
function renderProducts(filter = 'all') {
    const container = document.getElementById('allProductsContainer');
    if (!container || !Array.isArray(window.productsData)) return;

    container.innerHTML = '';

    const items = window.productsData.filter(p => filter === 'all' || p.category === filter);

    if (items.length === 0) {
        container.innerHTML = `<div class="empty-state"><p>No products found in this category yet.</p><a href="products.html" class="btn btn-secondary">View All Products</a></div>`;
        return;
    }

    items.forEach(p => {
        const card = createProductCard(p);
        container.appendChild(card);
        observeProductItem(card);
    });

    container.addEventListener('click', handleBuyNowClick);
}

function renderFeatured() {
    const container = document.getElementById('featuredContainer');
    if (!container || !Array.isArray(window.featuredProducts)) return;

    container.innerHTML = '';

    if (window.featuredProducts.length === 0) {
        container.innerHTML = `<div class="empty-state"><p>Check back soon for featured products!</p></div>`;
        return;
    }

    window.featuredProducts.forEach(p => {
        const card = createProductCard(p);
        container.appendChild(card);
        observeProductItem(card);
    });
}

// ========================================
// BUY NOW HANDLER
// ========================================
function handleBuyNowClick(e) {
    if (!e.target.classList.contains('buy-now-btn') && !e.target.classList.contains('request-product-btn')) return;
    const name = e.target.getAttribute('data-product-name');
    if (!name) return;
    const quantity = 1;
    const message = `Hello Coco Glam World, I want to request this product:\nProduct Name: ${name}\nQuantity: ${quantity}`;
    const url = `https://wa.me/2348142774187?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// ========================================
// FILTER BUTTONS
// ========================================
function setupFilterButtons() {
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts(btn.getAttribute('data-filter'));
        });
    });
}

// ========================================
// PRODUCT SCROLL OBSERVER (lazy reveal)
// ========================================
let productsObserver = null;
if ('IntersectionObserver' in window) {
    productsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                productsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });
}

function observeProductItem(item) {
    if (!productsObserver) return;
    item.style.opacity = '0';
    item.style.transform = 'translateY(22px)';
    item.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    productsObserver.observe(item);
}

// ========================================
// SMOOTH SCROLL (same-page anchors only)
// ========================================
function enableSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href.includes('.html') && !href.includes('://') && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}
enableSmoothScroll();

// ========================================
// NEWSLETTER FORM (AJAX)
// ========================================
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const btn = this.querySelector('button[type="submit"]');
        if (btn) { btn.disabled = true; btn.textContent = 'Subscribing...'; }
        try {
            await fetch(this.action, {
                method: 'POST',
                body: new FormData(this),
                headers: { 'Accept': 'application/json' }
            });
            this.reset();
            showSuccessMessage(this, '🎉 Thank you for subscribing!');
        } catch {
            showSuccessMessage(this, 'Subscribed! Thank you.');
        } finally {
            if (btn) { btn.disabled = false; btn.textContent = 'Subscribe'; }
        }
    });
}

// ========================================
// CONTACT FORM (AJAX)
// ========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const btn = this.querySelector('button[type="submit"]');
        if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
        try {
            await fetch(this.action, {
                method: 'POST',
                body: new FormData(this),
                headers: { 'Accept': 'application/json' }
            });
            this.reset();
            showSuccessMessage(this, '✅ Message sent! We\'ll reply within 24 hours.');
        } catch {
            showSuccessMessage(this, 'Message sent! We\'ll be in touch soon.');
        } finally {
            if (btn) { btn.disabled = false; btn.textContent = 'Send Message'; }
        }
    });
}

// ========================================
// TESTIMONIAL SLIDER (with touch swipe)
// ========================================
class TestimonialSlider {
    constructor() {
        this.slider = document.querySelector('.testimonial-slider');
        if (!this.slider) return;
        this.slides = this.slider.querySelectorAll('.testimonial-slide');
        this.dots = this.slider.querySelectorAll('.dot');
        this.prevBtn = this.slider.querySelector('.slider-btn.prev');
        this.nextBtn = this.slider.querySelector('.slider-btn.next');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.init();
    }

    init() {
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => { this.prevSlide(); this.resetAutoPlay(); });
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => { this.nextSlide(); this.resetAutoPlay(); });

        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => { this.goToSlide(index); this.resetAutoPlay(); });
        });

        // Touch swipe support
        this.slider.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].clientX;
        }, { passive: true });

        this.slider.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].clientX;
            const diff = this.touchStartX - this.touchEndX;
            if (Math.abs(diff) > 40) {
                if (diff > 0) this.nextSlide();
                else this.prevSlide();
                this.resetAutoPlay();
            }
        }, { passive: true });

        // Pause on hover
        this.slider.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.slider.addEventListener('mouseleave', () => this.startAutoPlay());

        this.startAutoPlay();
    }

    showSlide(index) {
        this.slides.forEach(s => s.classList.remove('active'));
        this.dots.forEach(d => d.classList.remove('active'));
        if (this.slides[index]) this.slides[index].classList.add('active');
        if (this.dots[index]) this.dots[index].classList.add('active');
        this.currentSlide = index;
    }

    nextSlide() { this.showSlide((this.currentSlide + 1) % this.slides.length); }
    prevSlide() { this.showSlide((this.currentSlide - 1 + this.slides.length) % this.slides.length); }
    goToSlide(index) { this.showSlide(index); }

    startAutoPlay() {
        if (!this.slideInterval) {
            this.slideInterval = setInterval(() => this.nextSlide(), 5000);
        }
    }

    stopAutoPlay() {
        clearInterval(this.slideInterval);
        this.slideInterval = null;
    }

    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}

// ========================================
// POPULATE ORDER / SERVICE SELECTS (legacy, keep for checkout compatibility)
// ========================================
function populateOrderSelect(items) {
    const select = document.getElementById('orderProduct');
    if (!select) return;
    select.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = '-- select an item or service --';
    select.appendChild(placeholder);
    const list = items || window.productsData || [];
    list.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.name;
        opt.textContent = p.name;
        opt.dataset.price = p.price || 0;
        select.appendChild(opt);
    });
}

function populateServiceSelect() {
    const select = document.getElementById('serviceSelect');
    if (!select || !Array.isArray(window.servicesData)) return;
    window.servicesData.forEach(service => {
        const option = document.createElement('option');
        option.value = service.name;
        option.textContent = `${service.name} - ₦${service.price.toLocaleString()}`;
        option.dataset.price = service.price;
        select.appendChild(option);
    });
}

function updateServicePrice() {
    const serviceSelect = document.getElementById('serviceSelect');
    const priceDisplay = document.getElementById('servicePriceDisplay');
    const totalInput = document.getElementById('serviceTotalAmount');
    const serviceLocation = document.getElementById('serviceLocation');
    if (!serviceSelect || !priceDisplay || !totalInput) return;
    const selected = serviceSelect.options[serviceSelect.selectedIndex];
    const unitPrice = parseFloat(selected.dataset.price) || 0;
    let total = unitPrice;
    if (serviceLocation && serviceLocation.value === 'home') total *= 2;
    const payType = document.querySelector('input[name="paymentType"]:checked');
    let displayLabel = 'Total';
    if (payType) {
        if (payType.value === 'deposit30') { total *= 0.3; displayLabel = '30% Deposit'; }
        else if (payType.value === 'deposit50') { total *= 0.5; displayLabel = '50% Deposit'; }
    }
    priceDisplay.textContent = `${displayLabel}: ₦${total.toFixed(2)}`;
    totalInput.value = total.toFixed(2);
}

function setupServiceFormListeners() {
    const serviceSelect = document.getElementById('serviceSelect');
    const serviceLocation = document.getElementById('serviceLocation');
    const paymentRadios = document.querySelectorAll('input[name="paymentType"]');
    if (serviceSelect) serviceSelect.addEventListener('change', updateServicePrice);
    if (serviceLocation) serviceLocation.addEventListener('change', updateServicePrice);
    paymentRadios.forEach(r => r.addEventListener('change', updateServicePrice));
}

function handleQueryParams() { /* intentionally blank — unified checkout handles this */ }

function showServiceFields() {
    const paymentOpts = document.getElementById('paymentOptions');
    const appointment = document.getElementById('appointmentFields');
    const addressGroup = document.getElementById('addressGroup');
    if (paymentOpts) paymentOpts.style.display = 'block';
    if (appointment) {
        appointment.style.display = 'block';
        const dateEl = document.getElementById('appointmentDate');
        const timeEl = document.getElementById('appointmentTime');
        if (dateEl) dateEl.setAttribute('required', '');
        if (timeEl) timeEl.setAttribute('required', '');
    }
    if (addressGroup) {
        addressGroup.style.display = 'none';
        const addr = document.getElementById('address');
        if (addr) addr.removeAttribute('required');
    }
}

function showProductFields() {
    const paymentOpts = document.getElementById('paymentOptions');
    const appointment = document.getElementById('appointmentFields');
    const addressGroup = document.getElementById('addressGroup');
    if (paymentOpts) paymentOpts.style.display = 'none';
    if (appointment) {
        appointment.style.display = 'none';
        const dateEl = document.getElementById('appointmentDate');
        const timeEl = document.getElementById('appointmentTime');
        if (dateEl) dateEl.removeAttribute('required');
        if (timeEl) timeEl.removeAttribute('required');
    }
    if (addressGroup) {
        addressGroup.style.display = 'block';
        const addr = document.getElementById('address');
        if (addr) addr.setAttribute('required', '');
    }
}

function selectStoredProduct() {
    const storedProduct = sessionStorage.getItem('selectedProduct');
    if (storedProduct) {
        try {
            const product = JSON.parse(storedProduct);
            const orderProduct = document.getElementById('orderProduct');
            if (orderProduct) { orderProduct.value = product.name; updateOrderPrice(); }
            sessionStorage.removeItem('selectedProduct');
        } catch (e) { console.error('Error parsing stored product:', e); }
    }
}

function updateOrderPrice() {
    const productSelect = document.getElementById('orderProduct');
    const qtyInput = document.getElementById('orderQuantity');
    const priceDisplay = document.getElementById('priceDisplay');
    const totalInput = document.getElementById('totalAmount');
    if (!productSelect || !qtyInput || !priceDisplay || !totalInput) return;
    const selected = productSelect.options[productSelect.selectedIndex];
    const unitPrice = parseFloat(selected.dataset.price) || 0;
    const qty = parseInt(qtyInput.value, 10) || 1;
    let total = unitPrice * qty;
    let displayLabel = 'Price';
    if (currentOrderType === 'service') {
        const serviceLocation = document.getElementById('serviceLocation');
        if (serviceLocation && serviceLocation.value === 'home') total *= 2;
        const payType = document.querySelector('input[name="paymentType"]:checked');
        if (payType) {
            if (payType.value === 'deposit30') { total *= 0.3; displayLabel = '30% Deposit'; }
            else if (payType.value === 'deposit50') { total *= 0.5; displayLabel = '50% Deposit'; }
            else displayLabel = 'Total';
        }
    }
    priceDisplay.textContent = `${displayLabel}: ₦${total.toFixed(2)}`;
    totalInput.value = total.toFixed(2);
}

function setupPaymentOptions() {
    document.querySelectorAll('input[name="paymentType"]').forEach(r => {
        r.addEventListener('change', updateOrderPrice);
    });
}

// ========================================
// INIT — DOM READY
// ========================================
function initAll() {
    initScrollReveal();
    initNavbarScroll();
    renderProducts();
    renderFeatured();
    setupFilterButtons();
    populateOrderSelect();
    setupPaymentOptions();

    currentOrderType = (window.location.search.indexOf('type=service') !== -1) ? 'service' : 'product';
    if (currentOrderType === 'service') showServiceFields(); else showProductFields();

    selectStoredProduct();

    const featuredContainer = document.getElementById('featuredContainer');
    if (featuredContainer) featuredContainer.addEventListener('click', handleBuyNowClick);

    const orderProduct = document.getElementById('orderProduct');
    const orderQuantity = document.getElementById('orderQuantity');
    const serviceLocation = document.getElementById('serviceLocation');
    if (orderProduct) orderProduct.addEventListener('change', () => { currentOrderType = (window.location.search.indexOf('type=service') !== -1) ? 'service' : 'product'; if (currentOrderType === 'service') showServiceFields(); else showProductFields(); updateOrderPrice(); });
    if (orderQuantity) orderQuantity.addEventListener('input', updateOrderPrice);
    if (serviceLocation) serviceLocation.addEventListener('change', updateOrderPrice);
    updateOrderPrice();
    handleQueryParams();

    new TestimonialSlider();

    if (document.getElementById('servicesContainer')) {
        renderServices();
        populateServiceSelect();
        setupServiceFormListeners();
    }

    const orderFormEl = document.getElementById('orderForm');
    if (orderFormEl) orderFormEl.addEventListener('input', () => clearFormError('orderFormError'));
    const serviceFormEl = document.getElementById('serviceOrderForm');
    if (serviceFormEl) serviceFormEl.addEventListener('input', () => clearFormError('serviceFormError'));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}