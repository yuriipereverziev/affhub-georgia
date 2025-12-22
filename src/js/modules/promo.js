export default () => {
  setTimeout(() => {
    const videoEl = document.getElementById("video");
    if (videoEl) {
      const path = window.cdn_path || '';
      videoEl.src = path + "img/video.mp4";
    }
  }, 1000);

  const diamonds = document.querySelectorAll('.diamond');
  if (diamonds.length > 0) {
    document.addEventListener('mousemove', e => {
      if (window.innerWidth < 1024) return;
      diamonds.forEach(d => {
        let speed = 500 / d.clientWidth;
        d.style.transform = `translate3d(${-(e.clientX*speed/1000)}px,${-(e.clientY*speed/1000)}px,0)`;
      });
    });
  }

  setTimeout(() => {
    const promoEl = document.getElementById('promo');
    if (promoEl) {
      promoEl.classList.add('show-diamonds');
    }
  }, 9000);
}
