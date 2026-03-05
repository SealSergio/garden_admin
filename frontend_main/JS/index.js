document.addEventListener('DOMContentLoaded', () => {
  function slide(productButton) {
    const card = productButton.closest('.slider__container');
    const slider = card.querySelector('.slider');
    const prevButton = card.querySelector('.prev-button');
    const nextButton = card.querySelector('.next-button');
    const slides = Array.from(slider.querySelectorAll('.products__img'));
    const slideCount = slides.length;
    let slideIndex = 0;

    prevButton.addEventListener('click', showPreviousSlide);
    nextButton.addEventListener('click', showNextSlide);

    function showPreviousSlide() {
      slideIndex = (slideIndex - 1 + slideCount) % slideCount;
      updateSlider();
    }

    function showNextSlide() {
      slideIndex = (slideIndex + 1) % slideCount;
      updateSlider();
    }

    function updateSlider() {
      slides.forEach((slide, index) => {
        if (index === slideIndex) {
          slide.style.display = 'block';
        } else {
          slide.style.display = 'none';
        }
      });
    }

    updateSlider();
  }

  const productButtons = Array.from(document.querySelectorAll('.slider__button'));
  productButtons.forEach((button) => {
    slide(button);
  });
});
