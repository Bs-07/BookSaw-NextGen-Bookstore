function setGreeting() {
  const now = new Date();
  const hour = now.getHours();
  const greetText = document.getElementById('greet');
  const greetGif = document.getElementById('greetGif');

  let text = '';
  let gif = '';

  if (hour >= 5 && hour < 12) {
    text = 'Good Morning';
    gif = `<div class="tenor-gif-embed" data-postid="781536592451831180" data-share-method="host" data-aspect-ratio="1" data-width="100%"></div>`;
  } else if (hour >= 12 && hour < 17) {
    text = 'Good Afternoon';
    gif = `<div class="tenor-gif-embed" data-postid="5829795132640549031" data-share-method="host" data-aspect-ratio="1" data-width="100%"></div>`;
  } else if (hour >= 17 && hour < 21) {
    text = 'Good Evening';
    gif = `<div class="tenor-gif-embed" data-postid="1223654878584789679" data-share-method="host" data-aspect-ratio="1" data-width="100%"></div>`;
  } else {
    text = 'Good Night';
    gif = `<div class="tenor-gif-embed" data-postid="16507200988394897028" data-share-method="host" data-aspect-ratio="1" data-width="100%"></div>`;
  }

  greetText.textContent = text;
  greetGif.innerHTML = gif;

  // Reinitialize Tenor embeds
  if (window.tenor) {
    window.tenor.init();
  }
}

// Run when page loads
window.addEventListener('DOMContentLoaded', setGreeting);
