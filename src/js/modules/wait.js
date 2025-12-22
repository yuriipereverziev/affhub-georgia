export default () => {
  const swiper = new Swiper(".wait-slider", {
    slidesPerView: 1,
    // centeredSlides: true,
    spaceBetween: 25,
    // loop: true,

    // pagination: {
    //   el: ".swiper-pagination",
    //   type: "progressbar",
    // },
    navigation: {
      nextEl: ".wait-slider__nav--next",
      prevEl: ".wait-slider__nav--prev"
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 25,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 25,
      },
      1360: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    }
  });
};
