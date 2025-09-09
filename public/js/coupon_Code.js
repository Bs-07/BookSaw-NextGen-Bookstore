document.querySelector('.btn_promo').addEventListener('click', async (e) => {
  e.preventDefault();

  const couponAlertMsg = document.getElementById('couponAlert');
  const promo = document.querySelector('.promo_code').value.trim();
  const subtotal = parseFloat(
    document.querySelector('.subTotal_box .totalSum').innerText
  );

  if (!promo) return;

  const res = await fetch('/applyCoupon', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ promo, subtotal }),
  });

  const data = await res.json();

  if (!data.success) {
    return couponFailed(couponAlertMsg);
  } else {
    couponSuccessful(couponAlertMsg);
  }

  function couponFailed(couponAlertMsg) {
    couponAlertMsg.textContent = data.message;
    couponAlertMsg.style.color = '#fd5d60';
  }

  function couponSuccessful(couponAlertMsg) {
    couponAlertMsg.textContent = data.message;
    couponAlertMsg.style.color = '#26ad4cff';
  }

  // update discount row
  document.querySelector(
    '.discountAmount'
  ).innerText = `-₹${data.discount.toFixed(2)}`;

  // update total row
  document.querySelector('.total_box .totalSum').innerText =
    data.total.toFixed(2);

  // update hidden inputs for checkout
  document.querySelector('#hiddenCoupon').value = promo;
  document.querySelector('#hiddenDiscount').value = data.discount.toFixed(2);
  document.querySelector('#hiddenTotal').value = data.total.toFixed(2);
});

// 🔑 Ensure hiddenTotal is always set on page load
document.addEventListener('DOMContentLoaded', () => {
  const subtotal = parseFloat(
    document.querySelector('.subTotal_box .totalSum').innerText
  );
  document.querySelector('#hiddenTotal').value = subtotal.toFixed(2);
});
