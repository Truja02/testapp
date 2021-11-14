let slidePosition = 0;
const slides = document.getElementsByClassName('carousel__item');
const totalSlides = slides.length;


/* Clicking makes the movement to the right */
document.
  getElementById('buttonNext')
  .addEventListener("click", function() {
    moveToNextSlide();
  });
  /* Clicking makes the movement to the left */
document.
  getElementById('buttonPrev')
  .addEventListener("click", function() {
    moveToPrevSlide();
  });

/* making items visible depending of the position */
function updateSlidePosition() {
  for (let slide of slides) {
    slide.classList.remove('carousel__item--visible');
    slide.classList.add('carousel__item--hidden');
  }

  slides[slidePosition].classList.add('carousel__item--visible');
}
/* making the movement to the left */
function moveToNextSlide() {
  if (slidePosition === totalSlides - 1) {
    slidePosition = 0;
  } else {
    slidePosition++;
  }

  updateSlidePosition();
}
/* making the movement to the right */
function moveToPrevSlide() {
  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition--;
  }

  updateSlidePosition();
}