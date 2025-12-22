const langSwitcher = () => {
    const locale = document.documentElement.lang
    const langSwitcher = document.querySelector('.lang-switcher');
    const langSwitcherButton = langSwitcher.querySelector('.lang-switcher__btn');
    const langDropdown = document.querySelector('.lang-switcher__dropdown');

    function setPosition() {
        const switcherHeight = langSwitcher.offsetHeight;
        langDropdown.style.top = switcherHeight + 'px';
    }

    function initSwitcher() {
        const switcherLang = langSwitcher.querySelector('.lang-switcher__current');
        const currentLangDropdownItem = langDropdown.querySelector('li[data-lang="' + locale + '"] a');

        switcherLang.textContent = currentLangDropdownItem.textContent;
        currentLangDropdownItem.classList.add('lang-switcher__item--active');
    }

    function toggleDropdown({ target }) {
        const langButton = target.closest('.lang-switcher__btn')
        langButton
            ? langSwitcher.classList.toggle('lang-switcher--open')
            : langSwitcher.classList.remove('lang-switcher--open');
    }

    initSwitcher()
    setPosition()

    document.addEventListener('click', toggleDropdown);
}

export default langSwitcher;