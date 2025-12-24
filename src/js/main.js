import scrollSmooth from './helpers/smooth-scroll.js';
import header from './modules/header.js';
// import strips from './modules/strips.js';
import speakersSlider from './modules/speakers.js';
import tickets from './modules/tickets.js';
import expozone from './modules/expozone.js';
import location from './modules/location';
import mediaPartners from './modules/media-partners';
// import charity from './modules/charity.js';
import galary from './modules/galary.js';
import footer from './modules/footer.js';
// import langSwitcher from "./modules/lang-switcher";
import wait from './modules/wait.js';
import promo from './modules/promo.js';
import dress from './modules/dress.js';

scrollSmooth();
header()
promo()
expozone()
location()

// menu()
// strips()

function main() {
  speakersSlider()
  dress()
  // speakersSlider()
  if (document.querySelector('.tickets')) {
    tickets();
  }
  mediaPartners()
  // langSwitcher()
  // charity()
  wait()
  footer()
  galary()
}

// const loader = document.querySelector(".loader");

// setTimeout(() => {
//   loader.classList.add("hidden");
//   setTimeout(() => {
//     loader.style.display = "none";
//   }, 500);
// }, 2000);



if (document.documentElement.clientWidth < 480) {
  window.addEventListener('scroll',
    function () {
      return setTimeout(main, 1000);
    }, {
      once: true
    }
  );
} else {
  main();
}

// function addRteScript() {
//   const script = document.createElement('script');
//   script.src = 'https://a.rte.im/api/v1/events/4709/form/script';
//   document.head.prepend(script);
// }

// window.addEventListener('scroll',
//   function () {
//     return setTimeout(addRteScript, 1000);
//   }, {
//     once: true
//   }
// );
