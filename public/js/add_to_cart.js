'use strict';

// ===== Toast (your existing helper, unchanged) =====
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 100);

  setTimeout(() => {
    toast.classList.remove('show');
    document.body.removeChild(toast);
  }, 3000);
}

// ===== Add to cart (shared) =====
async function addToCart(bookId) {
  if (!bookId) return;

  try {
    const response = await fetch(`/store?id=${encodeURIComponent(bookId)}`, {
      method: 'GET',
    });

    if (response.ok) {
      showToast('Book added to cart!');
      // Optionally update cart count here
      return true;
    } else if (response.status === 401) {
      // Not logged in – redirect to login (server also returns JSON with redirect)
      window.location.href = '/login';
      return false;
    } else {
      // Other errors
      let msg = 'Error adding to cart.';
      try {
        const data = await response.json();
        if (data && data.message) msg = data.message;
      } catch (_) {}
      showToast(msg);
      console.error('Add to cart failed:', response.status);
      return false;
    }
  } catch (err) {
    console.error('Request failed', err);
    showToast('Network error. Please try again.');
    return false;
  }
}

// ===== Modal wiring =====
(function () {
  const modal = document.getElementById('book-modal');
  const imgEl = document.getElementById('modalImg');
  const catEl = document.getElementById('modalCategory');
  const titleEl = document.getElementById('modalTitle');
  const authorEl = document.getElementById('modalAuthor');
  const descEl = document.getElementById('modalDesc');
  const priceEl = document.getElementById('modalPrice');
  const modalAddBtn = document.getElementById('modalAddToCart');

  let lastFocused = null;

  function formatINR(val) {
    const n = Number(val);
    if (Number.isNaN(n)) return val || '';
    return (
      '₹ ' +
      n.toLocaleString('en-IN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    );
  }

  function openModal(fromBtn) {
    lastFocused = fromBtn || document.activeElement;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    (modal.querySelector('.modal__close') || modal).focus({
      preventScroll: true,
    });
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused && typeof lastFocused.focus === 'function')
      lastFocused.focus();
  }

  // Delegate all clicks we care about
  document.addEventListener('click', async function (e) {
    const trigger = e.target.closest('.book-trigger');
    const gridAddBtn = e.target.closest('.add-to-cart');
    const closer = e.target.closest('[data-close]');

    // 1) Open modal when clicking a book cover
    if (trigger) {
      const d = trigger.dataset;
      imgEl.src = d.img;
      imgEl.alt = d.name || 'Book cover';
      catEl.textContent = d.cate || '';
      titleEl.textContent = d.name || '';
      authorEl.textContent = d.author ? `by ${d.author}` : '';
      descEl.textContent = d.desc || '';
      priceEl.textContent = formatINR(d.price);
      modalAddBtn.dataset.id = d.id || '';
      openModal(trigger);
      return;
    }

    // 2) Close modal (backdrop / X)
    if (closer && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
      return;
    }

    // 3) Grid "Add to Cart" buttons
    if (gridAddBtn) {
      const bookId = gridAddBtn.getAttribute('data-id');
      gridAddBtn.disabled = true;
      const original = gridAddBtn.textContent;
      gridAddBtn.textContent = 'Adding...';
      const ok = await addToCart(bookId);
      gridAddBtn.textContent = ok ? 'Added!' : original;
      setTimeout(() => {
        gridAddBtn.disabled = false;
        if (ok) gridAddBtn.textContent = original;
      }, 900);
      return;
    }
  });

  // ESC to close
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      e.preventDefault();
      closeModal();
    }
  });

  // Modal "Add to cart"
  if (modalAddBtn) {
    modalAddBtn.addEventListener('click', async function () {
      const bookId = this.dataset.id;
      this.disabled = true;
      const original = this.textContent;
      this.textContent = 'Adding...';
      const ok = await addToCart(bookId);
      this.textContent = ok ? 'Added!' : original;
      setTimeout(() => {
        this.disabled = false;
        if (ok) {
          this.textContent = original;
        }
      }, 900);
      if (ok) {
        // optional: close modal after success
        const closeAfterMs = 400;
        setTimeout(() => {
          if (modal.getAttribute('aria-hidden') === 'false') {
            // Only close if still open
            modal.querySelector('[data-close]')?.click();
          }
        }, closeAfterMs);
      }
    });
  }
})();
