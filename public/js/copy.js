// Copy coupon code
function copyCode(button) {
  const code = button.querySelector('span').innerText.trim(); // "WELCOME50"
  const tooltip = button.querySelector('.tooltiptext');

  navigator.clipboard.writeText(code).then(() => {
    tooltip.innerText = 'Copied!';
    tooltip.style.visibility = 'visible';
    tooltip.style.opacity = '1';
    setTimeout(() => {
      tooltip.innerText = 'Copy to clipboard';
    }, 2000);
  });
}

// Close notification and save state
document.addEventListener('DOMContentLoaded', () => {
  const notification = document.getElementById('promoNotification');
  const closeBtn = notification.querySelector('.close-notification');

  // Check if already closed
  if (localStorage.getItem('promoClosed') === 'true') {
    notification.style.display = 'none';
  }

  // On click close
  closeBtn.addEventListener('click', () => {
    notification.style.display = 'none';
    localStorage.setItem('promoClosed', 'true');
  });
});

// Get modal, button, and close
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('profileModal');
  const manageAccountBtn = document.querySelector(
    ".profile_menu li a[href='#']"
  );

  document.querySelector('.btnProfile.cancel').addEventListener('click', () => {
    modal.style.display = 'none';
  });

  const closeBtn = document.querySelector('.modal .close');

  // Open modal when "Manage account" clicked
  manageAccountBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'block';
  });

  // Close modal when X clicked
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Close modal if clicked outside content
  window.addEventListener('click', (e) => {
    if (e.target == modal) {
      modal.style.display = 'none';
    }
  });

  // fetch data for manage profile
  const btn = document.getElementById('manageAccountBtn');
  if (btn) {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();

      const res = await fetch('/profileData');
      const data = await res.json();

      document.getElementById('profileName').value = data.name || '';
      document.getElementById('profileEmail').value = data.email || '';
      document.getElementById('profileMobile').value = data.u_mobileNo || '';
      document.getElementById('profileAddress').value = data.address || '';
      document.getElementById('profileCity').value = data.city || '';
      document.getElementById('profilePin').value = data.pin || '';
      document.getElementById('profileState').value = data.state || '';
      document.getElementById('profileCountry').value = data.country || 'India';

      document.getElementById('profileModal').classList.remove('hidden');
    });
  }
});
