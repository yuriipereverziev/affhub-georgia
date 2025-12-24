export default () => {
  document.querySelectorAll('[data-video-play]').forEach(btn => {
    const wrapper = btn.closest('.location__video')
    const video = wrapper.querySelector('video')

    // Подстраиваем aspect-ratio под видео
    video.addEventListener('loadedmetadata', () => {
      const aspectRatio = video.videoWidth / video.videoHeight
      wrapper.style.aspectRatio = `${video.videoWidth} / ${video.videoHeight}`
    })

    const togglePlay = () => {
      if (video.paused) {
        video.muted = false
        video.play()
        wrapper.classList.add('is-playing')
      } else {
        video.pause()
        wrapper.classList.remove('is-playing')
      }
    }

    btn.addEventListener('click', togglePlay)
    video.addEventListener('click', togglePlay)

    video.addEventListener('ended', () => {
      wrapper.classList.remove('is-playing')
    })
  })
}
