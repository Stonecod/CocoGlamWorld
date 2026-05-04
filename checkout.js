// ========================================
// UNIFIED CHECKOUT LOGIC (PRODUCTS + SERVICES)
// ========================================

document.addEventListener('DOMContentLoaded', function () {

    const params = new URLSearchParams(window.location.search);
    const paramType = (params.get('type') || '').toLowerCase();
    const paramName = params.get('name') || '';

    const itemTypeEl = document.getElementById('selectedItemType');
    const itemNameEl = document.getElementById('selectedItemName');
    const itemPriceEl = document.getElementById('selectedItemPrice');
    const itemNameInput = document.getElementById('itemName');
    const itemPriceInput = document.getElementById('itemPrice');
    const itemQuantityInput = document.getElementById('itemQuantity');
    const quantityGroup = document.getElementById('quantityGroup');
    const quantityInput = document.getElementById('quantity');
    const orderTypeInput = document.getElementById('orderType');
    const errorEl = document.getElementById('checkoutError');
    const form = document.getElementById('checkoutForm');

    const itemTypeProductBtn = document.getElementById('itemTypeProduct');
    const itemTypeServiceBtn = document.getElementById('itemTypeService');
    const itemChoice = document.getElementById('itemChoice');
    const itemChoiceLabel = document.getElementById('itemChoiceLabel');
    const itemChoiceInfo = document.getElementById('itemChoiceInfo');

    const locationOption = document.getElementById('locationOption');
    const addressGroup = document.getElementById('addressGroup');
    const addressField = document.getElementById('address');
    const addressLabel = document.getElementById('addressLabel');

    const availableProducts = Array.isArray(window.productsData)
        ? window.productsData.filter(p => !p.comingSoon && p.price > 0)
        : [];
    const availableServices = Array.isArray(window.servicesData) ? window.servicesData : [];

    let selectedType = paramType === 'service' ? 'service' : 'product';
    let selectedItem = null;
    let selectedPrice = 0;

    function showError(msg) {
        if (!errorEl) return;
        errorEl.textContent = msg;
        errorEl.style.display = msg ? 'block' : 'none';
    }

    function showSuccess(msg) {
        if (!form) return;
        let successEl = form.querySelector('.form-success');
        if (!successEl) {
            successEl = document.createElement('div');
            successEl.className = 'form-success';
            successEl.style.cssText = 'color:#2e7d32; margin-top:16px; font-weight:600; text-align:center;';
            form.appendChild(successEl);
        }
        successEl.textContent = msg;
        setTimeout(() => { successEl.textContent = ''; }, 5000);
    }

    function clearVisibleFormFields() {
        const fieldsToClear = ['fullName', 'email', 'phone', 'notes'];
        fieldsToClear.forEach((id) => {
            const field = document.getElementById(id);
            if (field) field.value = '';
        });

        if (locationOption) {
            locationOption.value = '';
        }

        if (quantityInput) {
            quantityInput.value = '1';
        }

        if (addressField) {
            addressField.value = '';
            addressField.required = false;
        }

        if (addressGroup) {
            addressGroup.style.display = 'none';
        }
    }

    function formatCurrency(value) {
        return `₦${Number(value).toFixed(2)}`;
    }

    function updatePriceDisplay(quantity = 1) {
        const qty = Math.max(1, Number(quantity) || 1);
        const totalPrice = selectedPrice * qty;

        if (itemPriceEl) {
            itemPriceEl.textContent = formatCurrency(totalPrice);
        }

        if (itemPriceInput) {
            itemPriceInput.value = totalPrice.toFixed(2);
        }

        if (itemQuantityInput) {
            itemQuantityInput.value = qty;
        }
    }

    function refreshLocationOptions() {
        if (!locationOption) return;
        if (selectedType === 'product') {
            locationOption.innerHTML = `
                <option value="">Choose delivery method</option>
                <option value="Pickup">Pick up at shop</option>
                <option value="Home Delivery">Home Delivery</option>
            `;
        } else {
            locationOption.innerHTML = `
                <option value="">Choose service location</option>
                <option value="Spa">At the Spa</option>
                <option value="Home Service">Home Service</option>
            `;
        }
        if (addressGroup) {
            addressGroup.style.display = 'none';
            if (addressField) addressField.required = false;
            if (addressField) addressField.value = '';
        }
    }

    function setSelectedItem(item) {
        if (!item) return;
        selectedItem = item;
        selectedPrice = item.price || 0;

        if (itemTypeEl) itemTypeEl.textContent = selectedType === 'service' ? 'Service' : 'Product';
        if (itemNameEl) itemNameEl.textContent = item.name;
        if (itemPriceEl) itemPriceEl.textContent = formatCurrency(selectedPrice);
        if (itemNameInput) itemNameInput.value = item.name;
        if (itemPriceInput) itemPriceInput.value = selectedPrice.toFixed(2);
        if (orderTypeInput) orderTypeInput.value = selectedType;

        if (selectedType === 'product') {
            if (quantityGroup) quantityGroup.style.display = 'block';
            updatePriceDisplay(Number(quantityInput?.value || 1));
        } else {
            if (quantityGroup) quantityGroup.style.display = 'none';
            if (itemQuantityInput) itemQuantityInput.value = '1';
            updatePriceDisplay(1);
        }

        if (itemChoiceInfo) {
            const description = item.description ? item.description : '';
            const duration = selectedType === 'service' && item.duration ? `<strong>Duration:</strong> ${item.duration}` : '';
            itemChoiceInfo.innerHTML = `${description}${duration ? `<br>${duration}` : ''}`;
            itemChoiceInfo.style.display = description || duration ? 'block' : 'none';
        }
    }

    function populateItemChoice(type) {
        if (!itemChoice || !itemChoiceLabel) return;
        const list = type === 'service' ? availableServices : availableProducts;
        itemChoiceLabel.textContent = type === 'service' ? 'Choose a service' : 'Choose a product';
        itemChoice.innerHTML = `<option value="">Select a ${type}</option>`;
        list.forEach((item, index) => {
            const option = document.createElement('option');
            option.value = `${type}:${index}`;
            option.textContent = `${item.name} ${item.price ? `- ₦${item.price.toLocaleString()}` : ''}`;
            itemChoice.appendChild(option);
        });
    }

    function setSelectedType(type) {
        selectedType = type;
        if (itemTypeProductBtn) {
            itemTypeProductBtn.classList.toggle('active', type === 'product');
        }
        if (itemTypeServiceBtn) {
            itemTypeServiceBtn.classList.toggle('active', type === 'service');
        }
        populateItemChoice(type);
        refreshLocationOptions();
        if (selectedType === 'service') {
            if (itemChoiceLabel) itemChoiceLabel.textContent = 'Choose a service';
        } else {
            if (itemChoiceLabel) itemChoiceLabel.textContent = 'Choose a product';
        }
        const list = selectedType === 'service' ? availableServices : availableProducts;
        if (list.length > 0) {
            setSelectedItem(list[0]);
            itemChoice.value = `${selectedType}:0`;
        } else {
            selectedItem = null;
            selectedPrice = 0;
            if (itemNameEl) itemNameEl.textContent = '-';
            if (itemPriceEl) itemPriceEl.textContent = '₦0';
            if (itemNameInput) itemNameInput.value = '';
            if (itemPriceInput) itemPriceInput.value = '0';
            if (orderTypeInput) orderTypeInput.value = selectedType;
            if (itemChoiceInfo) itemChoiceInfo.style.display = 'none';
        }
    }

    function findItemByName(list, nameValue) {
        return list.find(item => item.name.toLowerCase() === nameValue.toLowerCase());
    }

    if (itemTypeProductBtn) {
        itemTypeProductBtn.addEventListener('click', () => setSelectedType('product'));
    }
    if (itemTypeServiceBtn) {
        itemTypeServiceBtn.addEventListener('click', () => setSelectedType('service'));
    }

    if (itemChoice) {
        itemChoice.addEventListener('change', function () {
            const selected = this.value.split(':');
            const type = selected[0];
            const index = Number(selected[1]);
            const sourceList = type === 'service' ? availableServices : availableProducts;
            const item = sourceList[index];
            if (item) {
                if (selectedType !== type) {
                    selectedType = type;
                    populateItemChoice(type);
                    refreshLocationOptions();
                }
                if (itemChoice) itemChoice.value = `${type}:${index}`;
                setSelectedItem(item);
            }
        });
    }

    if (quantityInput) {
<<<<<<< HEAD
        quantityInput.addEventListener('pointerdown', function (event) {
            if (document.activeElement !== this) {
                event.preventDefault();
                this.focus();
                this.select();
            }
        });
        quantityInput.addEventListener('focus', function () {
            this.select();
        });
        quantityInput.addEventListener('click', function () {
            this.select();
        });
        quantityInput.addEventListener('input', function () {
            const rawValue = this.value.trim();
            if (rawValue === '') {
                if (itemPriceEl) {
                    itemPriceEl.textContent = formatCurrency(selectedPrice);
                }
                if (itemPriceInput) {
                    itemPriceInput.value = selectedPrice.toFixed(2);
                }
                return;
            }

            const value = parseInt(rawValue, 10);
            if (!Number.isInteger(value) || value < 1) {
                return;
            }

            this.value = value;
            updatePriceDisplay(value);
        });
        quantityInput.addEventListener('blur', function () {
            let value = parseInt(this.value, 10);
            if (isNaN(value) || value < 1) {
                value = 1;
                this.value = value;
            }
=======
        quantityInput.addEventListener('focus', function () {
            this.select();
        });
        quantityInput.addEventListener('input', function () {
            let value = parseInt(this.value, 10);
            if (isNaN(value) || value < 1) {
                value = 1;
            }
            this.value = value;
>>>>>>> 1bd78f832fbe35008ef19e1069a4e2e4671d8134
            updatePriceDisplay(value);
        });
    }

    if (locationOption) {
        locationOption.addEventListener('change', function () {
            if ((this.value === 'Home Delivery' || this.value === 'Home Service') && addressGroup && addressField) {
                addressGroup.style.display = 'block';
                addressField.required = true;
                addressLabel.textContent = selectedType === 'product' ? 'Delivery Address *' : 'Home Address *';
            } else if (addressGroup && addressField) {
                addressGroup.style.display = 'none';
                addressField.required = false;
                addressField.value = '';
            }
        });
    }

    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            showError('');

            const fullName = (document.getElementById('fullName') || {}).value?.trim() || '';
            const email = (document.getElementById('email') || {}).value?.trim() || '';
            const phone = (document.getElementById('phone') || {}).value?.trim() || '';
            const locationValue = locationOption ? locationOption.value : '';
            const addressValue = addressField ? addressField.value.trim() : '';
            const notes = (document.getElementById('notes') || {}).value?.trim() || '';
            const selectedItemName = (itemNameInput || {}).value?.trim() || '';
            const quantityValue = parseInt(quantityInput?.value, 10) || 1;

            if (!selectedItemName) {
                showError('Please select a product or service.');
                return;
            }
            if (!fullName) {
                showError('Please enter your full name.');
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
            if ((locationValue === 'Home Delivery' || locationValue === 'Home Service') && !addressValue) {
                showError('Please enter your address.');
                return;
            }

            if (itemQuantityInput) {
                itemQuantityInput.value = selectedType === 'product' ? quantityValue : 1;
            }

            if (selectedType === 'product') {
                updatePriceDisplay(quantityValue);
            }

            const payload = {
                type: selectedType,
                item: selectedItemName,
                quantity: selectedType === 'product' ? quantityValue : 1,
                amount: itemPriceInput ? itemPriceInput.value : '0',
                location: locationValue,
                address: addressValue,
                fullName: fullName,
                email: email,
                phone: phone,
                notes: notes
            };

            try {
                sessionStorage.setItem('orderData', JSON.stringify(payload));
            } catch (err) {
                console.warn('Unable to save order data', err);
            }

            try {
                await fetch(this.action, {
                    method: 'POST',
                    body: new FormData(this),
                    mode: 'no-cors'
                });
            } catch (err) {
                console.warn('Checkout form request failed', err);
            }

            clearVisibleFormFields();
            showSuccess('Appointment request sent successfully. We will contact you shortly.');
        });
    }

    setSelectedType(paramType === 'service' ? 'service' : 'product');
    const queryList = selectedType === 'service' ? availableServices : availableProducts;
    const queryItem = paramName ? findItemByName(queryList, paramName) : null;
    if (queryItem) {
        const index = queryList.indexOf(queryItem);
        if (itemChoice) itemChoice.value = `${selectedType}:${index}`;
        setSelectedItem(queryItem);
    }
});