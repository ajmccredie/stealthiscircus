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
      modal.style.display = 'block';
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
    'images/hero4.jpg',
    'images/hero5.jpg',
    'images/hero6.jpg',
    'images/hero7.jpg'
  ];

  let currentIndex = 1; // start sequence at second image
  const displayDuration = 4000; // visible
  const transitionDuration = 1000; // fade + shrink time

  function showNextImage() {
    // Fade/scale out current
    heroImage.style.transition = `opacity ${transitionDuration}ms ease, transform ${transitionDuration}ms ease`;
    heroImage.style.opacity = 0;
    heroImage.style.transform = 'translate(-50%, -50%) scale(0.1)';

    setTimeout(() => {
      const nextImage = new Image();
      nextImage.src = heroImages[currentIndex];

      nextImage.onload = () => {
        heroImage.src = nextImage.src;

        // Force reflow to reset animation
        void heroImage.offsetWidth;

        heroImage.style.transition = `opacity ${transitionDuration}ms ease, transform ${transitionDuration}ms ease`;
        heroImage.style.opacity = 1;
        heroImage.style.transform = 'translate(-50%, -50%) scale(1)';

        // Move to next, looping back to start when needed
        currentIndex = (currentIndex + 1) % heroImages.length;

        // Schedule next change
        setTimeout(showNextImage, displayDuration);
      };
    }, transitionDuration);
  }

  // Preload first image and show it once at start
  const firstImage = new Image();
  firstImage.src = heroImages[0];
  firstImage.onload = () => {
    heroImage.src = firstImage.src;
    heroImage.style.opacity = 1;
    heroImage.style.transform = 'translate(-50%, -50%) scale(1)';
    // Start the slideshow after the first display period
    setTimeout(showNextImage, displayDuration);
  };
}
