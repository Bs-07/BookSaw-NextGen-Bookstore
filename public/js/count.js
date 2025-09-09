'use strict';

// Select elements
const plusButtons = document.querySelectorAll('.plus');
const minusButtons = document.querySelectorAll('.minus');
const countElements = document.querySelectorAll('.count');
const priceElements = document.querySelectorAll('.price');
const totalDisplays = document.querySelectorAll('.totalSum');
const quantityInputs = document.querySelectorAll('.quantity_input'); // hidden inputs for backend
const totalSumInput = document.getElementById('totalSumInput'); // hidden input for subtotal in checkout form

// Store unit price in data attr (only once, safe parse)
priceElements.forEach((element) => {
  const unitPrice = parseFloat(element.textContent) || 0;
  element.dataset.unitPrice = unitPrice; // shorthand for setAttribute
});

// Init on DOM load
window.addEventListener('DOMContentLoaded', updateTotalSum);

// Handle + button
plusButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    updateQuantity(index, 1);
  });
});

// Handle - button
minusButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    updateQuantity(index, -1);
  });
});

/**
 * Update quantity, price, and subtotal
 * @param {number} index - item index
 * @param {number} change - +1 or -1
 */
function updateQuantity(index, change) {
  let quantity = parseInt(countElements[index].textContent) || 0;

  quantity += change;
  if (quantity < 1) return; // prevent 0 or negative qty

  // Update UI
  countElements[index].textContent = quantity;

  // Update hidden input (backend form)
  if (quantityInputs[index]) {
    quantityInputs[index].value = quantity;
  }

  updatePrice(index, quantity);
  updateTotalSum();
}

/**
 * Update per-item price
 */
function updatePrice(index, quantity) {
  const priceElement = priceElements[index];
  const unitPrice = parseFloat(priceElement.dataset.unitPrice) || 0;
  const newPrice = (unitPrice * quantity).toFixed(2);

  priceElement.textContent = newPrice;
}

/**
 * Update subtotal across all items
 */
function updateTotalSum() {
  let sum = 0;

  priceElements.forEach((priceElement) => {
    sum += parseFloat(priceElement.textContent) || 0;
  });

  const formattedSum = sum.toFixed(2);

  // Update visible subtotal(s)
  totalDisplays.forEach((display) => {
    display.textContent = formattedSum;
  });

  // Update hidden input (form subtotal)
  if (totalSumInput) {
    totalSumInput.value = formattedSum;
  }

  console.log('Subtotal:', formattedSum);
}
