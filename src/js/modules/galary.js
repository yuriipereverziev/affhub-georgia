export default () => {
  const allImages = [...document.querySelectorAll('.zoom-img')];
  if (!allImages.length) return; // 🔥 Защита: если нет изображений, модуль не выполняется

  const galarySliderWrapper = document.querySelector('.galary__slider .swiper-wrapper');
  if (!galarySliderWrapper) return; // 🔥 Защита: если нет контейнера слайдера

  // показать только первые 32 изображения в слайдер
  galarySliderWrapper.innerHTML = '';
  allImages.slice(0, 32).forEach((img) => {
    const slide = img.closest('.galary__slide');
    if (slide) galarySliderWrapper.appendChild(slide);
  });

  let galarySlider = null;
  let modalSwiper = null;

  const initSlider = () => {
    galarySlider = new Swiper(".galary__slider", {
      slidesPerView: "auto",
      centeredSlides: true,
      spaceBetween: 24,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
      },
      navigation: {
        nextEl: ".galary__arrow.wait-slider__nav--next",
        prevEl: ".galary__arrow.wait-slider__nav--prev"
      },
      breakpoints: {
        1024: { slidesPerGroup: 2 },
        1230: { slidesPerGroup: 3 },
      }
    });
  };

  const destroySlider = () => {
    if (galarySlider) {
      galarySlider.destroy(true, true);
      galarySlider = null;
    }
  };

  const handleResize = () => {
    if (window.innerWidth < 1024) {
      if (!galarySlider) initSlider();
    } else {
      destroySlider();
    }
  };

  window.addEventListener("resize", handleResize);
  handleResize();

  // Модалка
  function openModal(index = 0) {
    const modal = document.getElementById('galleryModal');
    if (!modal) return; // 🔥 Защита

    const wrapper = modal.querySelector('.modal-slider .swiper-wrapper');
    if (!wrapper) return; // 🔥 Защита

    document.documentElement.style.overflow = 'hidden';
    wrapper.innerHTML = '';

    const slides = allImages.map((img) => {
      const src = img.getAttribute('src');
      const alt = img.getAttribute('alt') || '';
      const picture = img.closest('picture');
      const webpSrc = picture?.querySelector('source[type="image/webp"]')?.getAttribute('srcset') || '';

      return `
                <div class="swiper-slide">
                    <picture>
                        ${webpSrc ? `<source srcset="${webpSrc}" type="image/webp">` : ''}
                        <img class="galary__img zoom-img" src="${src}" alt="${alt}">
                    </picture>
                </div>
            `;
    });

    if (modalSwiper) modalSwiper.destroy(true, true);

    modalSwiper = new Swiper('.modal-slider', {
      virtual: { slides: slides },
      navigation: {
        nextEl: '.modal .wait-slider__nav--next',
        prevEl: '.modal .wait-slider__nav--prev',
      },
      pagination: {
        el: ".modal__content .swiper-pagination",
        type: "fraction",
      },
      loop: false,
      spaceBetween: 15,
      simulateTouch: true,
      touchEventsTarget: 'container',
      grabCursor: true,
      cssMode: false,
    });

    modal.classList.add('open');
    modalSwiper.slideTo(index, 0, false);
    document.addEventListener('keydown', handleKeyDown);
  }

  function closeModal() {
    const modal = document.getElementById('galleryModal');
    if (!modal) return;

    modal.classList.remove('open');
    document.removeEventListener('keydown', handleKeyDown);
    document.documentElement.style.overflow = '';
  }

  function handleKeyDown(e) {
    if (!modalSwiper) return;
    const modal = document.getElementById('galleryModal');
    if (!modal?.classList.contains('open')) return;

    if (e.key === 'ArrowRight') modalSwiper.slideNext();
    else if (e.key === 'ArrowLeft') modalSwiper.slidePrev();
    else if (e.key === 'Escape') closeModal();
  }

  allImages.forEach((img, index) => {
    img.addEventListener('click', () => {
      openModal(index);
    });
  });

  const modalCloseBtn = document.querySelector('.modal__close');
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
};
