'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // --- INITIAL SETUP ---
  // On page load, calculate the initial total sum
  updateCartTotal();

  const forms = document.querySelectorAll('.update-form');

  forms.forEach((form) => {
    form.addEventListener('click', async (event) => {
      const button = event.target.closest('.quantity_btn');
      if (!button) return;

      event.preventDefault();

      // --- GET ELEMENTS AND VALUES ---
      const quantityInput = form.querySelector('.quantity-input');
      const quantityDisplay = form.querySelector('.quantity-display');
      const action = button.dataset.action;
      let currentQuantity = parseInt(quantityInput.value, 10);

      // --- CALCULATE NEW QUANTITY ---
      if (action === 'increase') {
        currentQuantity++;
      } else if (action === 'decrease' && currentQuantity > 1) {
        currentQuantity--;
      } else {
        return; // Do nothing if trying to decrease quantity of 1
      }

      // --- 1. UPDATE THE UI IMMEDIATELY ---
      quantityDisplay.textContent = currentQuantity;
      quantityInput.value = currentQuantity;
      updateItemPrice(form, currentQuantity); // Update the price for this specific item
      updateCartTotal(); // Recalculate the grand total

      // --- 2. SEND THE UPDATE TO THE SERVER ---
      try {
        const formData = new FormData(form);
        const body = new URLSearchParams(formData);

        const response = await fetch('/update_quantity', {
          method: 'POST',
          body: body,
        });

        const result = await response.json();
        if (result.success) {
          console.log('Server confirmed quantity update.');
        } else {
          console.error('Server failed to update quantity.');
          // Optional: Revert UI changes if server fails
        }
      } catch (error) {
        console.error('Error sending update request:', error);
      }
    });
  });
});

/**
 * Updates the total price display for a single cart item row.
 * @param {HTMLElement} form The form element for the cart item.
 * @param {number} quantity The new quantity.
 */
function updateItemPrice(form, quantity) {
  const priceElement = form.closest('.cart_item--box').querySelector('.price');
  if (!priceElement) return;

  const unitPrice = parseFloat(priceElement.dataset.price);
  priceElement.textContent = (unitPrice * quantity).toFixed(2);
}

/**
 * Calculates the total sum of all items in the cart and updates the display.
 */
function updateCartTotal() {
  const allPriceElements = document.querySelectorAll('.price');
  const totalDisplays = document.querySelectorAll('.totalSum');
  let totalSum = 0;

  allPriceElements.forEach((priceEl) => {
    totalSum += parseFloat(priceEl.textContent);
  });

  totalDisplays.forEach((display) => {
    display.textContent = totalSum.toFixed(2);
  });

  // Optional: Update the checkout link total
  const checkoutLink = document.querySelector('.btn_checkout').closest('a');
  if (checkoutLink) {
    checkoutLink.href = `/show_checkout?totalSum=${totalSum.toFixed(2)}`;
  }
}
