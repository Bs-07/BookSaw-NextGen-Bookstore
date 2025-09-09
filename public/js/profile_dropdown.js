'use strict';

const profileTrigger = document.querySelector('.profile');
const profileBox = document.querySelector('.profile_box');

profileTrigger.addEventListener('click', (e) => {
  e.preventDefault();
  profileBox.classList.toggle('hidden');
});

// Optional: close when clicking outside
document.addEventListener('click', (e) => {
  if (!profileBox.contains(e.target) && !profileTrigger.contains(e.target)) {
    profileBox.classList.add('hidden');
  }
});
