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

if (thumbs.length && modal && modalImg && closeBtn) {
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      modal.style.display = 'block';
      modalImg.src = thumb.dataset.img;
      modalTitle.textContent = thumb.dataset.title;
      modalDesc.innerHTML = thumb.dataset.description;
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
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

  let currentIndex = 0;
  const displayDuration = 4000; // visible time (ms)
  const pauseDuration = 1000;   // pause between transitions (ms)

  function showNextImage() {
    // Fade and shrink out current
    heroImage.classList.remove('active');
    heroImage.style.transform = 'translate(-50%, -50%) scale(0.1)'; // reset scale

    // Wait for fade/scale-out, then swap image
    setTimeout(() => {
      const nextImage = new Image();
      nextImage.src = heroImages[currentIndex];

      nextImage.onload = () => {
        heroImage.src = nextImage.src;

        // Force reflow so CSS sees transform reset before adding class
        void heroImage.offsetWidth;

        heroImage.classList.add('active');
        heroImage.style.transform = ''; // let CSS handle scaling again

        // Schedule next transition
        setTimeout(() => {
          currentIndex = (currentIndex + 1) % heroImages.length;
          showNextImage();
        }, displayDuration);
      };
    }, pauseDuration);
  }

  // Preload first image, then start sequence
  const firstImage = new Image();
  firstImage.src = heroImages[0];
  firstImage.onload = () => showNextImage();
}
