export default () => {
  let carousel = null;

  const initSlider = () => {
    const width = window.innerWidth;

    carousel = new Swiper(".speakers__inner", {
      slidesPerView: 1,        // базово для 320px
      centeredSlides: true,
      spaceBetween: 15,
      loop: false,              // loop только на десктопе
      speed: 400,
      freeMode: true,
      freeModeMomentum: false,
      roundLengths: true,
      preloadImages: false,
      lazy: { loadOnTransitionStart: true, checkInView: true },
      navigation: {
        nextEl: ".speakers__arrow--next",
        prevEl: ".speakers__arrow--prev"
      },
      breakpoints: {
        480: { slidesPerView: 2, centeredSlides: false, loop: false, spaceBetween: 15 },
        768: { slidesPerView: 3, centeredSlides: false, loop: false, spaceBetween: 15 },
        1024:{ slidesPerView: 'auto', centeredSlides: false, loop: true, spaceBetween: 23 }
      }
    });
  };

  const destroySlider = () => {
    if (carousel) {
      carousel.destroy(true, true);
      carousel = null;
    }
  };

  const handleResize = () => {
    destroySlider();
    initSlider();
  };

  window.addEventListener("resize", handleResize);
  initSlider();
};