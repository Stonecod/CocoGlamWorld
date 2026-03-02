// ========================================
// COCOGLAMWORLD - MAIN SCRIPT
// ========================================

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
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
        inner += `<button class="btn btn-primary buy-now-btn" data-product-id="${product.id}" data-product-name="${product.name}">Buy Now</button>`;
    }

    card.innerHTML = inner;
    return card;
}

// Handle Buy Now button clicks
function handleBuyNowClick(e) {
    if (e.target.classList.contains('buy-now-btn')) {
        const productName = e.target.getAttribute('data-product-name');
        const productSelect = document.getElementById('orderProduct');
        if (productSelect) {
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

// Populate order dropdown
function populateOrderSelect() {
    const select = document.getElementById('orderProduct');
    if (!select || !Array.isArray(productsData)) return;
    productsData.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.name;
        opt.textContent = `${p.name}`;
        opt.dataset.price = p.price || 0;
        select.appendChild(opt);
    });
}

// calculate and display order total based on selected product and quantity
function updateOrderPrice() {
    const productSelect = document.getElementById('orderProduct');
    const qtyInput = document.getElementById('orderQuantity');
    const priceDisplay = document.getElementById('priceDisplay');
    const totalInput = document.getElementById('orderTotal');
    if (!productSelect || !qtyInput || !priceDisplay || !totalInput) return;

    const selected = productSelect.options[productSelect.selectedIndex];
    const unitPrice = parseFloat(selected.dataset.price) || 0;
    const qty = parseInt(qtyInput.value, 10) || 1;
    const total = unitPrice * qty;
    priceDisplay.textContent = `Price: ₦${total.toFixed(2)}`;
    totalInput.value = total.toFixed(2);
}

// call initial render when DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        renderProducts();
        renderFeatured();
        setupFilterButtons();
        populateOrderSelect();
        const orderProduct = document.getElementById('orderProduct');
        const orderQuantity = document.getElementById('orderQuantity');
        if (orderProduct) orderProduct.addEventListener('change', updateOrderPrice);
        if (orderQuantity) orderQuantity.addEventListener('input', updateOrderPrice);
        updateOrderPrice();
    });
} else {
    renderProducts();
    renderFeatured();
    setupFilterButtons();
    populateOrderSelect();
    const orderProduct = document.getElementById('orderProduct');
    const orderQuantity = document.getElementById('orderQuantity');
    if (orderProduct) orderProduct.addEventListener('change', updateOrderPrice);
    if (orderQuantity) orderQuantity.addEventListener('input', updateOrderPrice);
    updateOrderPrice();
}

// Smooth scrolling for anchor links
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

// Newsletter Form Handling
// The form action is configured to use Formspree, so no
// JavaScript interception is necessary. If you wish to show
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

// modify render functions earlier to call observeProductItem after creating cards
// (renderProducts and renderFeatured are defined above that will call it)