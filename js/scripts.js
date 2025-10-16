// ---------- PAGE LOADER ----------
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.transition = 'opacity 0.8s ease';
    loader.style.opacity = '0';
    // hide after fade completes
    setTimeout(() => {
      loader.style.display = 'none';
    }, 800);
  }
});


// ---------- NAVBAR TOGGLE ----------
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}


// ---------- GALLERY MODAL ----------
const thumbs = document.querySelectorAll('.thumb');
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-description');
const closeBtn = document.getElementById('close-modal');

if (thumbs.length) {
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      modal.style.display = 'flex';
      modalImg.src = thumb.dataset.img;
      modalTitle.textContent = thumb.dataset.title;
      modalDesc.innerHTML = thumb.dataset.description;
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  });

  window.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
}


// ---------- HERO SLIDESHOW ----------
const heroImage = document.getElementById('heroImage');

if (heroImage) {
  const heroImages = [
    'images/hero1.jpg',
    'images/hero2.jpg',
    'images/hero3.jpg',
    'images/hero1.jpg',
    'images/hero2.jpg',
    'images/hero3.jpg',
    'images/hero1.jpg'
  ];

  let currentIndex = 0;
  const displayDuration = 4000; // visible time
  const transitionDuration = 1000; // fade + scale time

  function transitionToNext() {
    heroImage.style.transition = `opacity ${transitionDuration}ms ease, transform ${transitionDuration}ms ease`;
    heroImage.style.opacity = 0;
    heroImage.style.transform = 'translate(-50%, -50%) scale(0.1)';

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % heroImages.length;
      const nextImage = new Image();
      nextImage.src = heroImages[currentIndex];

      nextImage.onload = () => {
        heroImage.src = nextImage.src;
        void heroImage.offsetWidth; // reflow
        heroImage.style.transition = `opacity ${transitionDuration}ms ease, transform ${transitionDuration}ms ease`;
        heroImage.style.opacity = 1;
        heroImage.style.transform = 'translate(-50%, -50%) scale(1)';
      };
    }, transitionDuration);
  }

 // Start the sequence (initial fade-in too)
  const preload = new Image();
  preload.src = heroImages[0];
  preload.onload = () => {
    heroImage.src = preload.src;
    heroImage.style.opacity = 0;
    heroImage.style.transform = 'translate(-50%, -50%) scale(0.1)';

    // Let browser paint initial hidden state before animating in
    requestAnimationFrame(() => {
      heroImage.style.transition = `opacity ${transitionDuration}ms ease, transform ${transitionDuration}ms ease`;
      heroImage.style.opacity = 1;
      heroImage.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // Start the regular loop after first animation completes
    setInterval(transitionToNext, displayDuration + transitionDuration);
  };
}
