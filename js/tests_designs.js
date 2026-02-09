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
