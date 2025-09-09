'use strict';

const gridIcon = document.querySelector('.icon_grid');
const booksContainer = document.querySelector('.books-container');

// Define column counts you want to cycle through
const columnCounts = [6, 7, 3, 4, 5];
let currentIndex = 0;

gridIcon.addEventListener('click', () => {
  // Get the current number of columns from the array
  const currentColumns = columnCounts[currentIndex];

  // Update the CSS grid template columns
  booksContainer.style.gridTemplateColumns = `repeat(${currentColumns}, 1fr)`;

  // Move to the next index (loop back to the start if at the end)
  currentIndex = (currentIndex + 1) % columnCounts.length;
});

document.addEventListener('DOMContentLoaded', () => {
  const icons = document.querySelectorAll('.icon');

  icons.forEach((icon) => {
    icon.innerHTML = `<ion-icon  class="ion" name="heart-outline"></ion-icon>`;

    let isRed = true;
    icon.addEventListener('click', (e) => {
      //   icon.style.backgroundColor = "red";
      if (isRed) {
        icon.innerHTML = `<ion-icon style="color:red" name="heart"></ion-icon>`;
      } else {
        icon.innerHTML = `<ion-icon class="ion" name="heart-outline"></ion-icon>`;
      }

      isRed = !isRed;
    });
  });
});
