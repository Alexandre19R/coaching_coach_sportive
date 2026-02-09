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


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const preference = document.getElementById('preference');
  const emailGroup = document.getElementById('emailGroup');
  const telGroup = document.getElementById('telGroup');
  const emailInput = document.getElementById('email');
  const telInput = document.getElementById('telephone');
  const status = document.getElementById('formStatus');

  function setInvalid(el, invalid) {
    if (!el) return;
    el.classList.toggle('is-invalid', invalid);
  }

  function updatePreferredFields() {
    const value = preference.value;

    // reset
    emailGroup.style.display = 'none';
    telGroup.style.display = 'none';
    emailInput.required = false;
    telInput.required = false;
    setInvalid(emailInput, false);
    setInvalid(telInput, false);

    if (value === 'email') {
      emailGroup.style.display = 'block';
      emailInput.required = true;
    } else if (value === 'telephone') {
      telGroup.style.display = 'block';
      telInput.required = true;
    }
  }

  preference.addEventListener('change', updatePreferredFields);
  updatePreferredFields();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = "";

    // Validation HTML5 + notre contrôle
    const requiredOk = form.checkValidity();

    // Marque visuellement les champs invalides
    const fields = form.querySelectorAll('input, select, textarea');
    fields.forEach(f => setInvalid(f, !f.checkValidity()));

    if (!requiredOk) {
      status.textContent = "Veuillez remplir tous les champs obligatoires.";
      return;
    }

    // Construire le mail
    const prenom = document.getElementById('prenom').value.trim();
    const nom = document.getElementById('nom').value.trim();
    const age = document.getElementById('age').value.trim();
    const pref = preference.value;
    const typeCoaching = document.getElementById('typeCoaching').value;
    const message = document.getElementById('message').value.trim();

    const contact = (pref === 'email')
      ? `Email : ${emailInput.value.trim()}`
      : `Téléphone : ${telInput.value.trim()}`;

    const subject = encodeURIComponent(`Demande de contact - ${prenom} ${nom}`);
    const body = encodeURIComponent(
`Bonjour Charlène,

Je souhaite être recontacté(e) pour du coaching.

Prénom : ${prenom}
Nom : ${nom}
Âge : ${age}
Contact préféré : ${pref}
${contact}
Type de coaching : ${typeCoaching}

Message :
${message ? message : "(aucun)"}

Merci !`
    );

    // ⚠️ Remplace par l'email final de la coach
    const to = "charlenecoachingcsport@gmail.com";
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

    status.textContent = "Ouverture de votre client mail…";
    form.reset();
    updatePreferredFields();
  });
});
