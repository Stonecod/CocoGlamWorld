// ========================================
// COCOGLAMWORLD - MAIN SCRIPT
// ========================================

// global state for order type
let currentOrderType = 'product';

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('open');
        if (navToggle.classList.contains('open')) {
            navToggle.setAttribute('aria-label', 'Close menu');
        } else {
            navToggle.setAttribute('aria-label', 'Open menu');
        }
    });
}

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('open');
    });
});

// Helper to create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-item';
    card.setAttribute('data-category', product.category);

    let inner = '';
    if (product.imageUrl && product.imageUrl.trim() !== '') {
        inner += `<img src="${product.imageUrl}" alt="${product.name}" class="product-img">`;
    } else {
        inner += `<div class="product-img">${product.icon}</div>`;
    }

    inner += `<h3>${product.name}</h3>`;
    if (!product.comingSoon && product.price !== undefined) {
        inner += `<p class="product-price">₦${product.price.toFixed(2)}</p>`;
    }
    
    // Add beauty badges
    if (product.badges && product.badges.length > 0) {
        inner += `<div class="product-badges">`;
        product.badges.forEach(badge => {
            const badgeClass = badge.toLowerCase().replace(/\s+/g, '-');
            inner += `<span class="badge ${badgeClass}">${badge}</span>`;
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
            inner += `<p class="product-benefits">` + product.benefits.map(b => `✓ ${b}`).join(' ') + `</p>`;
        }
        inner += `<button class="btn btn-primary buy-now-btn" data-product-id="${product.id}" data-product-name="${product.name}" data-product-price="${product.price || 0}">Buy Now</button>`;
    }

    card.innerHTML = inner;
    return card;
}

// ========================================
// SERVICE PAGE RENDERING & BOOKING
// ========================================

// create a service card for the services page
function createServiceCard(service) {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.setAttribute('data-service-name', service.name);
    card.setAttribute('data-service-price', service.price);

    let inner = '';
    // choose user‑provided image if available, otherwise fall back to placeholder
    const imgSrc = service.imageUrl ? service.imageUrl :
        `https://via.placeholder.com/400x200?text=${encodeURIComponent(service.name)}`;
    inner += `<img src="${imgSrc}" alt="${service.name} - professional spa treatment">`;

    if (service.popular) {
        inner += `<div class="service-badge">Most Popular</div>`;
    }
    inner += `<div class="service-info">`;
    inner += `<h3>${service.name}</h3>`;
    inner += `<p>${service.description}</p>`;
    inner += `<div class="service-meta">Duration: ${service.duration}</div>`;
    inner += `<div class="service-meta">Price: ₦${service.price.toLocaleString()}</div>`;
    inner += `<button class="book-btn" data-service-name="${service.name}" data-service-price="${service.price}">Book Appointment</button>`;
    inner += `</div>`;

    card.innerHTML = inner;
    return card;
}

// render services grouped by category
function renderServices() {
    const container = document.getElementById('servicesContainer');
    if (!container || !Array.isArray(servicesData)) return;
    container.innerHTML = '';

    const categories = [...new Set(servicesData.map(s => s.category))];
    categories.forEach(cat => {
        const section = document.createElement('div');
        section.className = 'services-category';
        const heading = document.createElement('h2');
        heading.textContent = cat;
        section.appendChild(heading);

        const grid = document.createElement('div');
        grid.className = 'services-grid';

        servicesData.filter(s => s.category === cat).forEach(svc => {
            const card = createServiceCard(svc);
            grid.appendChild(card);
        });

        section.appendChild(grid);
        container.appendChild(section);
    });

    // delegate booking click
    container.addEventListener('click', function(e) {
        if (e.target.classList.contains('book-btn')) {
            const name = e.target.dataset.serviceName;
            const price = e.target.dataset.servicePrice;
            window.location.href = `products.html?type=service&name=${encodeURIComponent(name)}&price=${price}#orderForm`;
        }
    });
}

// check URL parameters when order page loads
function handleQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    const name = params.get('name');
    const price = parseFloat(params.get('price')) || 0;
    if (type === 'service' && name) {
        currentOrderType = 'service';
        // populate select with single option
        populateOrderSelect([{name: name, price: price}]);
        const productSelect = document.getElementById('orderProduct');
        if (productSelect) {
            productSelect.value = name;
        }
        // disable quantity
        const qty = document.getElementById('orderQuantity');
        if (qty) {
            qty.value = 1;
            qty.disabled = true;
        }
        // show service-specific UI
        showServiceFields();
        updateOrderPrice();
    }
}

function showServiceFields() {
    const paymentOpts = document.getElementById('paymentOptions');
    const appointment = document.getElementById('appointmentFields');
    const addressGroup = document.getElementById('addressGroup');
    if (paymentOpts) paymentOpts.style.display = 'block';
    if (appointment) {
        appointment.style.display = 'block';
        // require date and time when booking a service
        const dateEl = document.getElementById('appointmentDate');
        const timeEl = document.getElementById('appointmentTime');
        if (dateEl) dateEl.setAttribute('required', '');
        if (timeEl) timeEl.setAttribute('required', '');
    }
    if (addressGroup) {
        addressGroup.style.display = 'none';
        // make address not required when booking a service
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

// modify populateOrderSelect to accept custom items
function populateOrderSelect(items) {
    const select = document.getElementById('orderProduct');
    if (!select) return;
    select.innerHTML = ''; // clear existing
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = '-- select an item or service --';
    select.appendChild(placeholder);

    const list = items || productsData;
    if (!Array.isArray(list)) return;
    list.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.name;
        opt.textContent = `${p.name}`;
        opt.dataset.price = p.price || 0;
        select.appendChild(opt);
    });
}

// update price calculation to account for service deposit/full
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
        const payType = document.querySelector('input[name="paymentType"]:checked');
        if (payType) {
            if (payType.value === 'deposit30') {
                total = total * 0.3; // 30% deposit
                displayLabel = '30% Deposit';
            } else if (payType.value === 'deposit50') {
                total = total * 0.5; // 50% deposit
                displayLabel = '50% Deposit';
            } else {
                displayLabel = 'Total';
            }
        }
    }

    priceDisplay.textContent = `${displayLabel}: ₦${total.toFixed(2)}`;
    totalInput.value = total.toFixed(2);
}

// listen for payment type changes
function setupPaymentOptions() {
    const radios = document.querySelectorAll('input[name="paymentType"]');
    radios.forEach(r => {
        r.addEventListener('change', updateOrderPrice);
    });
}


// Handle Buy Now button clicks
function handleBuyNowClick(e) {
    if (e.target.classList.contains('buy-now-btn')) {
        currentOrderType = 'product';
        showProductFields();
        const productName = e.target.getAttribute('data-product-name');
        const productSelect = document.getElementById('orderProduct');
        if (productSelect) {
            // if select does not contain this option (e.g. page loaded with service URL)
            let opt = Array.from(productSelect.options).find(o => o.value === productName);
            if (!opt) {
                opt = document.createElement('option');
                opt.value = productName;
                opt.textContent = productName;
                opt.dataset.price = e.target.getAttribute('data-product-price') || '0';
                productSelect.appendChild(opt);
            }
            productSelect.value = productName;
            updateOrderPrice();
            setTimeout(() => {
                document.getElementById('orderForm').scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
}

// Attach Buy Now handler when rendering products
function renderProducts(filter = 'all') {
    const container = document.getElementById('allProductsContainer');
    if (!container || !Array.isArray(productsData)) return;
    container.innerHTML = '';
    const items = productsData.filter(p => filter === 'all' || p.category === filter);
    items.forEach(p => {
        const card = createProductCard(p);
        container.appendChild(card);
        observeProductItem(card);
    });
    // Attach Buy Now listeners
    container.addEventListener('click', handleBuyNowClick);
}

// Original renderProducts code (keep this pattern, just wrapped above)

// Render featured products on homepage
function renderFeatured() {
    const container = document.getElementById('featuredContainer');
    if (!container || !Array.isArray(featuredProducts)) return;
    container.innerHTML = '';
    featuredProducts.forEach(p => {
        const card = createProductCard(p);
        container.appendChild(card);
        observeProductItem(card);
    });
}

// Filter button logic (after dynamic content is rendered)
function setupFilterButtons() {
    const filterButtonsLocal = document.querySelectorAll('.filter-btn');
    filterButtonsLocal.forEach(button => {
        button.addEventListener('click', () => {
            filterButtonsLocal.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filterValue = button.getAttribute('data-filter');
            renderProducts(filterValue);
        });
    });
}



// call initial render when DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        renderProducts();
        renderFeatured();
        setupFilterButtons();
        populateOrderSelect();
        setupPaymentOptions();
        const orderProduct = document.getElementById('orderProduct');
        const orderQuantity = document.getElementById('orderQuantity');
        if (orderProduct) orderProduct.addEventListener('change', () => {
            // determine type based on URL parameter
            currentOrderType = (window.location.search.indexOf('type=service') !== -1) ? 'service' : 'product';
            if (currentOrderType === 'service') showServiceFields(); else showProductFields();
            updateOrderPrice();
        });
        if (orderQuantity) orderQuantity.addEventListener('input', updateOrderPrice);
        updateOrderPrice();
        handleQueryParams();
        new TestimonialSlider();
        // if on services page, render list
        if (document.getElementById('servicesContainer')) renderServices();
    });
} else {
    renderProducts();
    renderFeatured();
    setupFilterButtons();
    populateOrderSelect();
    setupPaymentOptions();
    const orderProduct = document.getElementById('orderProduct');
    const orderQuantity = document.getElementById('orderQuantity');
    if (orderProduct) orderProduct.addEventListener('change', () => {
        currentOrderType = (window.location.search.indexOf('type=service') !== -1) ? 'service' : 'product';
        if (currentOrderType === 'service') showServiceFields(); else showProductFields();
        updateOrderPrice();
    });
    if (orderQuantity) orderQuantity.addEventListener('input', updateOrderPrice);
    updateOrderPrice();
    handleQueryParams();
    new TestimonialSlider();
    if (document.getElementById('servicesContainer')) renderServices();
}
// Smooth scrolling for anchor links
function enableSmoothScroll() {
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
}
// initialize it once
enableSmoothScroll();

// Newsletter Form Handling
// The form action is configured to use Formspree, so no
// a custom message before redirecting, you can add a listener
// here, but avoid calling `preventDefault()`.

// Lazy loading animation – setup observer once for dynamic cards
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
    }, { threshold: 0.1 });
}

function observeProductItem(item) {
    if (!productsObserver) return;
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    productsObserver.observe(item);
}

// ========================================
// PAYSTACK PAYMENT INTEGRATION
// ========================================

function payWithPaystack() {
    // Get form values
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const addressField = document.getElementById('address');
    const address = addressField ? addressField.value.trim() : '';
    const totalAmountField = document.getElementById('totalAmount');
    const productSelect = document.getElementById('orderProduct');
    const quantityField = document.getElementById('orderQuantity');

    // booking fields
    const appointmentDate = document.getElementById('appointmentDate') ? document.getElementById('appointmentDate').value : '';
    const appointmentTime = document.getElementById('appointmentTime') ? document.getElementById('appointmentTime').value : '';
    const notes = document.getElementById('notes') ? document.getElementById('notes').value.trim() : '';

    // Get the total amount in Naira
    let totalAmount = parseFloat(totalAmountField.value) || 0;

    // Determine if service and apply deposit/full logic
    let paymentType = 'full';
    if (currentOrderType === 'service') {
        const payTypeEl = document.querySelector('input[name="paymentType"]:checked');
        if (payTypeEl) paymentType = payTypeEl.value;
        // totalAmount should already reflect deposit or full payment from updateOrderPrice
    }
    
    // Validation
    if (!email) {
        alert('Please enter your email address');
        return;
    }
    
    if (!fullName) {
        alert('Please enter your full name');
        return;
    }
    
    if (!phone) {
        alert('Please enter your phone number');
        return;
    }
    
    if (currentOrderType !== 'service' && !address) {
        alert('Please enter your delivery address');
        return;
    }
    
    if (totalAmount <= 0) {
        alert('Please select a valid product and quantity');
        return;
    }
    
    if (!productSelect.value) {
        alert('Please select a product');
        return;
    }
    
    // Convert amount to kobo (Paystack uses kobo as smallest unit)
    const amountInKobo = Math.round(totalAmount * 100);
    
    // Generate unique reference
    const transactionRef = 'COCOGLAMWORLD_' + Math.floor((Math.random() * 1000000000) + 1);
    
    // Store order details in session storage for the success page
    sessionStorage.setItem('orderData', JSON.stringify({
        customer: fullName,
        email: email,
        phone: phone,
        address: address,
        product: productSelect.value,
        quantity: quantityField.value,
        amount: totalAmount,
        appointmentDate: appointmentDate,
        appointmentTime: appointmentTime,
        notes: notes,
        paymentType: paymentType,
        reference: transactionRef
    }));
    
    // Initialize Paystack payment
    const handler = PaystackPop.setup({
        key: 'pk_test_4786e2462c3ce32ea82d9f007b846ba2a861c602',
        email: email,
        amount: amountInKobo,
        currency: 'NGN',
        ref: transactionRef,
        onClose: function() {
            // Transaction window closed - check if payment was successful by attempting redirect
            // This handles cases where Paystack doesn't properly fire onSuccess callback
            console.log('Transaction window closed');
        },
        onSuccess: function(response) {
            // Payment was successful
            console.log('Payment successful! Reference: ' + response.reference);
            // send details to Formspree
            const formspreeEndpoint = 'https://formspree.io/f/xqednlyq';
            const formData = new FormData();
            formData.append('name', fullName);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('item', productSelect.value);
            formData.append('price', totalAmount);
            formData.append('quantity', quantityField.value);
            formData.append('paymentReference', response.reference);
            if (currentOrderType === 'service') {
                formData.append('appointmentDate', appointmentDate);
                formData.append('appointmentTime', appointmentTime);
                formData.append('notes', notes);
                formData.append('paymentType', paymentType);
            }
            // optional address
            if (address) formData.append('address', address);

            fetch(formspreeEndpoint, {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            }).finally(() => {
                // Redirect whether or not the submission succeeded
                window.location.replace('order-success.html');
            });
        }
    });
    
    handler.openIframe();
}

// modify render functions earlier to call observeProductItem after creating cards
// (renderProducts and renderFeatured are defined above that will call it)

// ========================================
// TESTIMONIAL SLIDER FUNCTIONALITY
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

        this.init();
    }

    init() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }

        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Auto-play functionality
        this.startAutoPlay();

        // Pause on hover
        this.slider.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.slider.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    showSlide(index) {
        // Hide all slides
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));

        // Show current slide
        this.slides[index].classList.add('active');
        this.dots[index].classList.add('active');

        this.currentSlide = index;
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex);
    }

    goToSlide(index) {
        this.showSlide(index);
    }

    startAutoPlay() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }

    stopAutoPlay() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
}
