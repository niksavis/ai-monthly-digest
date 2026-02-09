const slides = Array.from(document.querySelectorAll(".slide"));
const prevButton = document.querySelector("[data-action='prev']");
const nextButton = document.querySelector("[data-action='next']");
const progressBar = document.querySelector(".deck__progress span");

let currentIndex = 0;

const updateUI = () => {
  slides.forEach((slide, index) => {
    slide.classList.toggle("is-active", index === currentIndex);
  });

  const progress = ((currentIndex + 1) / slides.length) * 100;
  progressBar.style.width = `${progress}%`;

  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === slides.length - 1;
};

const goToSlide = (index) => {
  const nextIndex = Math.max(0, Math.min(slides.length - 1, index));
  if (nextIndex === currentIndex) return;
  currentIndex = nextIndex;
  updateUI();
};

prevButton.addEventListener("click", () => goToSlide(currentIndex - 1));
nextButton.addEventListener("click", () => goToSlide(currentIndex + 1));

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "PageDown") {
    goToSlide(currentIndex + 1);
  }
  if (event.key === "ArrowLeft" || event.key === "PageUp") {
    goToSlide(currentIndex - 1);
  }
});

updateUI();
