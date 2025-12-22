export default () => {
  const header = document.querySelector('.header');
  const menuHeight = header ? header.clientHeight + header.offsetTop : 0;
  const links = document.querySelectorAll('[href^="#"]');
  links.forEach(link => link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + window.scrollY - menuHeight;
    const duration = 1000;
    let startTime;

    function step(time) {
      if (!startTime) startTime = time;
      const progress = (time - startTime) / duration;
      const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
      window.scrollTo(0, start + (end - start) * ease);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }));
};
