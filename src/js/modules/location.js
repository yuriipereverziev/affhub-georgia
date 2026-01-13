export default () => {
// Загружаем YouTube API
  if (!window.YT) {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(tag)
  }

  const videoWrappers = document.querySelectorAll('.location__video')

  function initYouTubePlayers() {
    videoWrappers.forEach(wrapper => {
      const iframe = wrapper.querySelector('iframe')
      const btn = wrapper.querySelector('[data-video-play]')
      const preload = wrapper.querySelector('.location__video-preload')

      // Создаем player
      const player = new YT.Player(iframe, {
        events: {
          onReady: () => {
            // Кнопка включения
            btn.addEventListener('click', () => {
              player.playVideo()
              preload.style.opacity = 0
              btn.style.display = 'none'
              wrapper.classList.add('is-playing')
            })
          },
          onStateChange: (event) => {
            if (event.data === YT.PlayerState.ENDED) {
              wrapper.classList.remove('is-playing')
              preload.style.opacity = 1
              btn.style.display = 'block'
            }
          }
        }
      })
    })
  }

// Ждем, когда API подгрузится
  window.onYouTubeIframeAPIReady = initYouTubePlayers




  const openPopupBtn = document.querySelector(".location__btn");
  const closePopupBtn = document.querySelector(".location__popup-close");
  const popup = document.querySelector(".location__popup");
  const overlay = document.querySelector(".location__popup-overlay");

  openPopupBtn.addEventListener("click", () => {
    popup.classList.add("active");
    overlay.classList.add("active");
  });

  closePopupBtn.addEventListener("click", () => {
    popup.classList.remove("active");
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", () => {
    popup.classList.remove("active");
    overlay.classList.remove("active");
  });

// Аккордеон
  const accordionButtons = document.querySelectorAll(".accordion-button");

  accordionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const hotelId = button.getAttribute("data-hotel");
      const content = document.getElementById(`${hotelId}-info`);

      // Закрываем все остальные
      document.querySelectorAll(".accordion-content").forEach((item) => {
        if (item !== content) {
          item.classList.remove("active");
        }
      });

      document.querySelectorAll(".accordion-button").forEach((btn) => {
        if (btn !== button) {
          btn.classList.remove("active");
        }
      });

      // Переключаем текущий блок
      content.classList.toggle("active");
      button.classList.toggle("active");
    });
  });

  document.querySelectorAll(".copy-code").forEach((element) => {
    element.addEventListener("click", () => {
      const promoCode = element.getAttribute("data-code");
      navigator.clipboard.writeText(promoCode).then(() => {
        const originalText = element.textContent;
        element.textContent = "Скопійовано!";
        element.classList.add("copied");

        setTimeout(() => {
          element.textContent = originalText;
          element.classList.remove("copied");
        }, 1500);
      });
    });
  });
}
