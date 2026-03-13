// ========================================
// UNIFIED CHECKOUT LOGIC (PRODUCTS + SERVICES)
// ========================================

document.addEventListener('DOMContentLoaded', function () {

    const params = new URLSearchParams(window.location.search);
    const type = (params.get('type') || '').toLowerCase();
    const name = params.get('name') || '';
    const priceParam = params.get('price') || '';

    const itemTypeEl = document.getElementById('selectedItemType');
    const itemNameEl = document.getElementById('selectedItemName');
    const itemPriceEl = document.getElementById('selectedItemPrice');
    const itemNameInput = document.getElementById('itemName');
    const itemPriceInput = document.getElementById('itemPrice');
    const orderTypeInput = document.getElementById('orderType');
    const errorEl = document.getElementById('checkoutError');
    const form = document.getElementById('checkoutForm');
    const payBtn = document.getElementById('payNowBtn');

    // NEW fields
    const locationOption = document.getElementById('locationOption');
    const addressGroup = document.getElementById('addressGroup');
    const addressField = document.getElementById('address');
    const addressLabel = document.getElementById('addressLabel');

    function showError(msg) {
        if (!errorEl) return;
        errorEl.textContent = msg;
        errorEl.style.display = msg ? 'block' : 'none';
    }

    // Validate URL parameters
    const price = parseFloat(priceParam);
    const isValidType = type === 'product' || type === 'service';

    if (!isValidType || !name || !priceParam || isNaN(price) || price <= 0) {
        showError('This checkout link is invalid or incomplete. Please select an item again.');

        setTimeout(() => {
            if (type === 'service') {
                window.location.replace('services.html');
            } else {
                window.location.replace('products.html');
            }
        }, 2500);

        return;
    }

    // Populate display fields
    if (itemTypeEl) itemTypeEl.textContent = type === 'service' ? 'Service' : 'Product';
    if (itemNameEl) itemNameEl.textContent = name;
    if (itemPriceEl) itemPriceEl.textContent = `₦${price.toFixed(2)}`;

    // Populate hidden inputs
    if (itemNameInput) itemNameInput.value = name;
    if (itemPriceInput) itemPriceInput.value = price.toFixed(2);
    if (orderTypeInput) orderTypeInput.value = type;

    // ========================================
    // DELIVERY / SERVICE LOCATION LOGIC
    // ========================================

    if (locationOption) {

        if (type === 'product') {

            locationOption.innerHTML = `
                <option value="">Choose delivery method</option>
                <option value="Pickup">Pick up at shop</option>
                <option value="Home Delivery">Home Delivery</option>
            `;

        } else if (type === 'service') {

            locationOption.innerHTML = `
                <option value="">Choose service location</option>
                <option value="Spa">At the Spa</option>
                <option value="Home Service">Home Service</option>
            `;

        }

        locationOption.addEventListener('change', function () {

            if (
                this.value === 'Home Delivery' ||
                this.value === 'Home Service'
            ) {

                addressGroup.style.display = 'block';
                addressField.required = true;

                if (type === 'product') {
                    addressLabel.textContent = 'Delivery Address *';
                } else {
                    addressLabel.textContent = 'Home Address *';
                }

            } else {

                addressGroup.style.display = 'none';
                addressField.required = false;
                addressField.value = '';

            }

        });
    }

    // ========================================
    // FORM SUBMISSION TO FORMSPREE
    // ========================================

    if (form) {

        form.addEventListener('submit', function (e) {

            e.preventDefault();

            const formData = new FormData(form);

            fetch('https://formspree.io/f/xqednlyq', {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            }).finally(function () {

                window.location.replace('success.html');

            });

        });

    }

    if (!payBtn) return;

    // ========================================
    // PAYSTACK PAYMENT
    // ========================================

    payBtn.addEventListener('click', function () {

        showError('');

        const fullName = (document.getElementById('fullName') || {}).value?.trim() || '';
        const email = (document.getElementById('email') || {}).value?.trim() || '';
        const phone = (document.getElementById('phone') || {}).value?.trim() || '';
        const notes = (document.getElementById('notes') || {}).value?.trim() || '';
        const locationValue = locationOption ? locationOption.value : '';
        const addressValue = addressField ? addressField.value.trim() : '';

        if (!fullName) {
            showError('Please enter your full name.');
            return;
        }

        if (!email) {
            showError('Please enter your email address.');
            return;
        }

        if (!phone) {
            showError('Please enter your phone number.');
            return;
        }

        if (!locationValue) {
            showError('Please select a delivery or service option.');
            return;
        }

        if (
            (locationValue === 'Home Delivery' ||
             locationValue === 'Home Service') &&
            !addressValue
        ) {
            showError('Please enter your address.');
            return;
        }

        const amountInKobo = Math.round(price * 100);
        const transactionRef = 'COCOCHECKOUT_' + Math.floor((Math.random() * 1000000000) + 1);

        const handler = PaystackPop.setup({

            key: 'pk_test_4786e2462c3ce32ea82d9f007b846ba2a861c602',
            email: email,
            amount: amountInKobo,
            currency: 'NGN',
            ref: transactionRef,

            callback: function (response) {

                try {

                    const payload = {

                        customer: fullName,
                        email: email,
                        phone: phone,
                        amount: price.toFixed(2),
                        reference: response.reference,
                        type: type,
                        location: locationValue,
                        address: addressValue,
                        notes: notes

                    };

                    if (type === 'service') {
                        payload.service = name;
                    } else {
                        payload.product = name;
                    }

                    sessionStorage.setItem('orderData', JSON.stringify(payload));

                } catch (e) {
                    console.error('Error storing order data', e);
                }

                const refInput = document.getElementById('paymentReference');

                if (refInput) {
                    refInput.value = response.reference;
                }

                if (form) {
                    form.submit();
                }

            }

        });

        handler.openIframe();

    });

});