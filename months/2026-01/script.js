const slides = Array.from(document.querySelectorAll(".slide"));
const prevButton = document.querySelector("[data-action='prev']");
const nextButton = document.querySelector("[data-action='next']");
const progressBar = document.querySelector(".deck__progress span");
const liveRegion = document.querySelector(".deck__live");

let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

const updateUI = () => {
  slides.forEach((slide, index) => {
    slide.classList.toggle("is-active", index === currentIndex);
  });

  const progress = ((currentIndex + 1) / slides.length) * 100;
  progressBar.style.width = `${progress}%`;

  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === slides.length - 1;

  // Update URL hash
  window.history.replaceState(null, "", `#${currentIndex + 1}`);

  // Announce slide change to screen readers
  if (liveRegion) {
    const slideTitle =
      slides[currentIndex]?.querySelector(".slide__title")?.textContent;
    liveRegion.textContent = `Slide ${currentIndex + 1} of ${slides.length}: ${slideTitle}`;
  }
};

const goToSlide = (index) => {
  const nextIndex = Math.max(0, Math.min(slides.length - 1, index));
  if (nextIndex === currentIndex) return;
  currentIndex = nextIndex;
  updateUI();
};

// Initialize from URL hash
const initFromHash = () => {
  const hash = window.location.hash.slice(1);
  const slideNum = parseInt(hash, 10);
  if (slideNum >= 1 && slideNum <= slides.length) {
    currentIndex = slideNum - 1;
  }
};

// Button navigation
prevButton?.addEventListener("click", () => goToSlide(currentIndex - 1));
nextButton?.addEventListener("click", () => goToSlide(currentIndex + 1));

// Keyboard navigation
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "PageDown") {
    goToSlide(currentIndex + 1);
  }
  if (event.key === "ArrowLeft" || event.key === "PageUp") {
    goToSlide(currentIndex - 1);
  }
  if (event.key === "Home") {
    goToSlide(0);
  }
  if (event.key === "End") {
    goToSlide(slides.length - 1);
  }
});

// Touch/swipe navigation
const slidesContainer = document.querySelector(".slides");
if (slidesContainer) {
  slidesContainer.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
  });

  slidesContainer.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
  });
}

const handleSwipe = () => {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      goToSlide(currentIndex + 1);
    } else {
      goToSlide(currentIndex - 1);
    }
  }
};

initFromHash();
updateUI();
