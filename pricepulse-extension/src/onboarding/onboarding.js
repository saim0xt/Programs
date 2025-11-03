// PricePulse Onboarding Script

let currentSlide = 1;
const totalSlides = 7;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setupDots();
  setupEventListeners();
  updateUI();
});

// Setup dots
function setupDots() {
  const dotsContainer = document.getElementById('dots');

  for (let i = 1; i <= totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (i === 1) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
}

// Setup event listeners
function setupEventListeners() {
  document.getElementById('skipBtn').addEventListener('click', finish);
  document.getElementById('nextBtn').addEventListener('click', nextSlide);
  document.getElementById('backBtn').addEventListener('click', prevSlide);
  document.getElementById('finishBtn').addEventListener('click', finish);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'Escape') finish();
  });
}

// Next slide
function nextSlide() {
  if (currentSlide < totalSlides) {
    goToSlide(currentSlide + 1);
  }
}

// Previous slide
function prevSlide() {
  if (currentSlide > 1) {
    goToSlide(currentSlide - 1);
  }
}

// Go to specific slide
function goToSlide(slideNumber) {
  if (slideNumber < 1 || slideNumber > totalSlides) return;

  // Mark current slide as exiting
  const currentSlideEl = document.querySelector('.slide.active');
  if (currentSlideEl) {
    currentSlideEl.classList.add('exit');
    setTimeout(() => {
      currentSlideEl.classList.remove('active', 'exit');
    }, 300);
  }

  // Activate new slide
  setTimeout(() => {
    const newSlide = document.querySelector(`.slide[data-slide="${slideNumber}"]`);
    if (newSlide) {
      newSlide.classList.add('active');
    }
  }, 300);

  currentSlide = slideNumber;
  updateUI();
}

// Update UI
function updateUI() {
  // Update progress bar
  const progressFill = document.getElementById('progressFill');
  const progress = (currentSlide / totalSlides) * 100;
  progressFill.style.width = `${progress}%`;

  // Update dots
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide - 1);
  });

  // Update navigation buttons
  const backBtn = document.getElementById('backBtn');
  const nextBtn = document.getElementById('nextBtn');
  const finishBtn = document.getElementById('finishBtn');
  const skipBtn = document.getElementById('skipBtn');

  backBtn.style.display = currentSlide > 1 ? 'block' : 'none';
  nextBtn.style.display = currentSlide < totalSlides ? 'block' : 'none';
  finishBtn.style.display = currentSlide === totalSlides ? 'block' : 'none';
  skipBtn.style.display = currentSlide < totalSlides ? 'block' : 'none';
}

// Finish onboarding
function finish() {
  // Set onboarding complete flag
  chrome.storage.local.set({ onboardingComplete: true });

  // Close onboarding tab
  window.close();
}
