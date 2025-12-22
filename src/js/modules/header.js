export default () => {
  const showMenuBtn = document.querySelector('.js-show-menu');
  const closeMenuBtn = document.querySelector('.js-close-menu');
  const menu = document.querySelector('.js-menu');
  const overlay = document.querySelector('.overlay');
  const html = document.documentElement;

  function closeMenu() {
    menu.classList.remove('menu-open');
    overlay.classList.remove('active');
    html.style.overflow = '';
    window.removeEventListener('resize', checkScreenWidth);
  }

  function openMenu() {
    menu.classList.add('menu-open');
    overlay.classList.add('active');
    html.style.overflow = 'hidden';
    window.addEventListener('resize', checkScreenWidth);
  }
  closeMenuBtn?.addEventListener('click', closeMenu);
  showMenuBtn?.addEventListener('click', openMenu);
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  function checkScreenWidth() {
    if (window.innerWidth >= 1024) {
      closeMenu();
    }
  }

  checkScreenWidth();
};
