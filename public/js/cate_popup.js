function openReceipt(orderId) {
  document
    .getElementById(`printableArea-${orderId}`)
    .classList.remove('hidden');
  document.querySelector('.shadow_bg').classList.remove('hidden');
}

function closeReceipt(orderId) {
  document.getElementById(`printableArea-${orderId}`).classList.add('hidden');
  document.querySelector('.shadow_bg').classList.add('hidden');
}

//* for receipt popup----------------------
const receipt = document.querySelector('.receipt_icon');
const close_receipt = document.querySelector('.icon_close');
const receipt_box = document.querySelector('.receipt');
const shadow = document.querySelector('.shadow_bg');
const printFun = document.querySelector('.print');

shadow.addEventListener('click', () => {
  receipt_box.classList.add('hidden');
  shadow.classList.add('hidden');
});

document.addEventListener('keydown', (e) => {
  console.log(e.key);
  if (e.key === 'Escape' && !receipt_box.classList.contains('hidden')) {
    receipt_box.classList.add('hidden');
    shadow.classList.add('hidden');
  }
});

function printDiv(divId) {
  var printContents = document.getElementById(divId).innerHTML;
  var originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;

  window.print();

  document.body.innerHTML = originalContents;
}
