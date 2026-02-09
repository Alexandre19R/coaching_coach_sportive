const sliderInner = document.querySelector('.slider-inner');
const slides = document.querySelectorAll('.service-card');
const leftBtn = document.querySelector('.slider-btn.left');
const rightBtn = document.querySelector('.slider-btn.right');

let currentIndex = 0;
const totalSlides = slides.length;

function showSlide(index) {
  const slideWidth = slides[0].getBoundingClientRect().width; // largeur exacte d'une carte
  anime({
    targets: sliderInner,
    translateX: -index * slideWidth,
    duration: 600,
    easing: 'easeInOutQuad'
  });
}

// Boutons
leftBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  showSlide(currentIndex);
});

rightBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalSlides;
  showSlide(currentIndex);
});

// Clavier
window.addEventListener('keydown', e => {
  if(e.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
  }
  if(e.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  }
});

// Swipe mobile
let startX = 0;
sliderInner.addEventListener('touchstart', e => startX = e.touches[0].clientX);
sliderInner.addEventListener('touchend', e => {
  const diff = e.changedTouches[0].clientX - startX;
  if(diff > 50) currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  if(diff < -50) currentIndex = (currentIndex + 1) % totalSlides;
  showSlide(currentIndex);
});

document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('sapBanner');
  const popover = document.getElementById('sapPopover');
  const closeBtn = document.getElementById('sapClose');

  if (!banner || !popover) return;

  function open() {
    banner.classList.add('is-open');
    banner.setAttribute('aria-expanded', 'true');
    popover.setAttribute('aria-hidden', 'false');
  }

  function close() {
    banner.classList.remove('is-open');
    banner.setAttribute('aria-expanded', 'false');
    popover.setAttribute('aria-hidden', 'true');
  }

  function toggle() {
    banner.classList.contains('is-open') ? close() : open();
  }

  banner.addEventListener('click', (e) => {
    e.stopPropagation();
    toggle();
  });

  // Empêche de refermer quand on clique dans la popover
  popover.addEventListener('click', (e) => e.stopPropagation());

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      close();
    });
  }

  // Clavier (accessibilité)
  banner.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
    if (e.key === 'Escape') close();
  });

  // Clic extérieur
  document.addEventListener('click', close);
});
