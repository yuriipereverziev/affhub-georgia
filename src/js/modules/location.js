export default () => {
  document.querySelectorAll('[data-video-play]').forEach(btn => {
    btn.addEventListener('click', () => {
      const wrapper = btn.closest('.location__video')
      const iframe = wrapper.querySelector('iframe')

      iframe.src += '&autoplay=1'
      wrapper.classList.add('is-playing')
    })
  })

}
