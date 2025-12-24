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

}
