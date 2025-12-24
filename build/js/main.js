(function () {
  'use strict';

  var scrollSmooth = (function () {
    var header = document.querySelector('.header');
    var menuHeight = header ? header.clientHeight + header.offsetTop : 0;
    var links = document.querySelectorAll('[href^="#"]');
    links.forEach(function (link) {
      return link.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        var start = window.scrollY;
        var end = target.getBoundingClientRect().top + window.scrollY - menuHeight;
        var duration = 1000;
        var startTime;

        function step(time) {
          if (!startTime) startTime = time;
          var progress = (time - startTime) / duration;
          var ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
          window.scrollTo(0, start + (end - start) * ease);
          if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
      });
    });
  });

  var header = (function () {
    var showMenuBtn = document.querySelector('.js-show-menu');
    var closeMenuBtn = document.querySelector('.js-close-menu');
    var menu = document.querySelector('.js-menu');
    var overlay = document.querySelector('.overlay');
    var html = document.documentElement;

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

    closeMenuBtn === null || closeMenuBtn === void 0 ? void 0 : closeMenuBtn.addEventListener('click', closeMenu);
    showMenuBtn === null || showMenuBtn === void 0 ? void 0 : showMenuBtn.addEventListener('click', openMenu);
    menu === null || menu === void 0 ? void 0 : menu.querySelectorAll('a').forEach(function (a) {
      return a.addEventListener('click', closeMenu);
    });

    function checkScreenWidth() {
      if (window.innerWidth >= 1024) {
        closeMenu();
      }
    }

    checkScreenWidth();
  });

  var speakersSlider = (function () {
    var carousel = null;

    var initSlider = function initSlider() {
      carousel = new Swiper(".speakers__inner", {
        slidesPerView: 1,
        // базово для 320px
        centeredSlides: true,
        spaceBetween: 15,
        loop: false,
        // loop только на десктопе
        speed: 400,
        freeMode: true,
        freeModeMomentum: false,
        roundLengths: true,
        preloadImages: false,
        lazy: {
          loadOnTransitionStart: true,
          checkInView: true
        },
        navigation: {
          nextEl: ".speakers__arrow--next",
          prevEl: ".speakers__arrow--prev"
        },
        breakpoints: {
          480: {
            slidesPerView: 2,
            centeredSlides: false,
            loop: false,
            spaceBetween: 15
          },
          768: {
            slidesPerView: 3,
            centeredSlides: false,
            loop: false,
            spaceBetween: 15
          },
          1024: {
            slidesPerView: 'auto',
            centeredSlides: false,
            loop: true,
            spaceBetween: 23
          }
        }
      });
    };

    var destroySlider = function destroySlider() {
      if (carousel) {
        carousel.destroy(true, true);
        carousel = null;
      }
    };

    var handleResize = function handleResize() {
      destroySlider();
      initSlider();
    };

    window.addEventListener("resize", handleResize);
    initSlider();
  });

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var tickets = (function () {
    var locale = document.documentElement.lang;
    var isUALang = locale === 'ua';
    var textJSDictionary = new Map([[' Ticket Purchase Policy, ', ' translate1, '], ['Privacy Policy', 'translate2'], [' Privacy Policy ', ' translate3 '], ['Position', 'translate4'], ['Marketing vertical', 'translate5'], ['Select', 'translate6'], ['Order', 'translate7'], ['You must fill in all required fields and agree to the terms of the public offer, user agreement and privacy policy.', 'translate8'], ['Promo code does not exist', 'translate9']]);
    var cardList = [{
      name: "pre-order",
      dates: {
        start: new Date().toISOString().split("T")[0],
        end: "2025-12-24"
      },
      prices: {
        silver: 100,
        gold: 180
      }
    }, {
      name: "order",
      dates: {
        start: "2025-12-25",
        end: "2025-12-31"
      },
      prices: {
        silver: 110,
        gold: 160
      }
    }, {
      name: "last",
      dates: {
        start: "2025-12-26",
        end: "2025-12-31"
      },
      prices: {
        silver: 120,
        gold: 170
      }
    }]; // Кнопки волн

    var firstWave = document.querySelector(".tickets__first-wave");
    var secondWave = document.querySelector(".tickets__second-wave");
    var lastWave = document.querySelector(".tickets__last-wave"); // Перевірка чи доступна волна

    function isWaveAvailable(phase) {
      var currentDate = new Date().toISOString().split("T")[0];
      var wave = cardList.find(function (el) {
        return el.name === phase;
      });
      if (!wave) return false;
      return currentDate >= wave.dates.start && currentDate <= wave.dates.end;
    } // Функція встановлення активної волни


    function setActiveWave(phase) {
      // Скидання класів
      [firstWave, secondWave, lastWave].forEach(function (wave) {
        return wave === null || wave === void 0 ? void 0 : wave.classList.remove("active");
      }); // Встановлення активної волни

      if (phase === "pre-order") {
        firstWave === null || firstWave === void 0 ? void 0 : firstWave.classList.add("active");
      } else if (phase === "order") {
        secondWave === null || secondWave === void 0 ? void 0 : secondWave.classList.add("active");
      } else if (phase === "last") {
        lastWave === null || lastWave === void 0 ? void 0 : lastWave.classList.add("active");
      } // Оновлення цін


      setTicketsPrices(phase); // Оновлення кнопок покупки

      document.querySelectorAll(".tickets__btn").forEach(function (btn) {
        btn.setAttribute("data-name", phase);
        btn.disabled = !isWaveAvailable(phase);
      });
    } // Встановлення поточної фази по даті


    function checkDate() {
      var currentDate = new Date().toISOString().split("T")[0];
      var currentPhase = null; // Перевірка чи поточна дата входить в якусь з хвиль

      cardList.forEach(function (el) {
        if (currentDate >= el.dates.start && currentDate <= el.dates.end) {
          currentPhase = el.name;
        }
      }); // Якщо не знайдено активної хвилі, встановлюємо першу за замовчуванням

      if (!currentPhase) {
        currentPhase = cardList[0].name;
      }

      setActiveWave(currentPhase);
    } // Оновлення цін для конкретної фази


    function setTicketsPrices(phase) {
      var silverPrice = document.querySelector(".tickets__inner--silver .price__value");
      var goldPrice = document.querySelector(".tickets__inner--gold .price__value");

      var _ref = cardList.find(function (p) {
        return p.name === phase;
      }) || {},
          prices = _ref.prices;

      if (!prices) return;
      silverPrice.textContent = prices.silver;
      goldPrice.textContent = prices.gold;
    } // Ініціалізація кліків на волни


    [firstWave, secondWave, lastWave].forEach(function (wave, index) {
      wave === null || wave === void 0 ? void 0 : wave.addEventListener("click", function () {
        var _cardList$index;

        var phase = (_cardList$index = cardList[index]) === null || _cardList$index === void 0 ? void 0 : _cardList$index.name;
        if (!phase) return;
        setActiveWave(phase);
      });
    }); // Ініціалізація при завантаженні сторінки

    checkDate(); // function setTicketsPrices(phase = 'pre-order') {
    //     const silverPrice = document.querySelector(".tickets__inner--silver .price__value");
    //     const goldPrice = document.querySelector(".tickets__inner--gold .price__value");
    //     const vipPrice = document.querySelector(".tickets__inner--vip .price__value");
    //
    //     const { prices } = cardList.find(phaseObj => phaseObj.name === phase) || {}
    //
    //     if (!prices) return
    //
    //     silverPrice.textContent = prices.silver
    //     goldPrice.textContent = prices.gold;
    //     vipPrice.textContent = prices.vip;
    // }
    // Кастомная замена ссылок
    // const interval = setInterval(() => {
    //     const agreementBlocks = document.querySelectorAll(".rte-order-agreement-element");
    //     if (agreementBlocks.length > 0) {
    //         const firstBlock = agreementBlocks[0];
    //         const secondBlock = agreementBlocks[1]
    //         const links = firstBlock.querySelectorAll("a");
    //         const secondBlockLink = secondBlock.querySelector("a");
    //         const text = {
    //             text1: " Ticket Purchase Policy, ",
    //             text2: "Privacy Policy",
    //             text3: " Privacy Policy ",
    //         }
    //         if (links.length >= 2) {
    //             links[0].href = "terms-ticket.html";
    //             links[0].target = "_blank";
    //             links[0].textContent = isUALang ? textJSDictionary.get(text.text1) : text.text1;
    //             links[1].href = "https://affhub.club/warsaw-conf/policy.html";
    //             links[1].target = "_blank";
    //             links[1].textContent = isUALang ? textJSDictionary.get(text.text2) : text.text2;
    //             clearInterval(interval);
    //         }
    //         secondBlockLink.textContent = isUALang ? textJSDictionary.get(text.text3) : text.text3;
    //     }
    // }, 100);
    // multi select

    var style = document.createElement('style');
    style.setAttribute("id", "multiselect_dropdown_styles");
    style.innerHTML = "\n      .multiselect-dropdown{\n        display: inline-block;\n        padding: 2px 5px 0px 5px;\n        border-radius: 4px;\n        border: solid 1px #ced4da;\n        background-color: white;\n        position: relative;\n        background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e\");\n        background-repeat: no-repeat;\n        background-position: right .75rem center;\n        background-size: 16px 12px;\n      }\n      .multiselect-dropdown span.optext, .multiselect-dropdown span.placeholder{\n        margin-left:0.5em;\n        padding:1px 0;\n        border-radius: 4px;\n        display:inline-block;\n      }\n      .multiselect-dropdown span.optext{\n        background-color:lightgray;\n        padding:1px 0.75em;\n      }\n      .multiselect-dropdown span.optext .optdel {\n        float: right;\n        margin: 0 -6px 1px 5px;\n        font-size: 0.7em;\n        margin-top: 2px;\n        cursor: pointer;\n        color: #666;\n      }\n      .multiselect-dropdown span.optext .optdel:hover { color: #c66;}\n      .multiselect-dropdown span.placeholder{\n        color:#ced4da;\n      }\n      .multiselect-dropdown-list-wrapper{\n        box-shadow: gray 0 3px 8px;\n        z-index: 100;\n        padding:2px;\n        border-radius: 4px;\n        border: solid 1px #ced4da;\n        display: none;\n        margin: -1px;\n        position: absolute;\n        top:0;\n        left: 0;\n        right: 0;\n        background: white;\n      }\n      .multiselect-dropdown-list-wrapper .multiselect-dropdown-search{\n        margin-bottom:5px;\n      }\n      .multiselect-dropdown-list{\n        padding:2px;\n        height: 15rem;\n        overflow-y:auto;\n        overflow-x: hidden;\n      }\n      .multiselect-dropdown-list::-webkit-scrollbar {\n        width: 6px;\n      }\n      .multiselect-dropdown-list::-webkit-scrollbar-thumb {\n        background-color: #bec4ca;\n        border-radius:3px;\n      }\n\n      .multiselect-dropdown-list div{\n        padding: 5px;\n      }\n      .multiselect-dropdown-list input{\n        height: 1.15em !important;\n        width: 1.15em !important;\n        margin-right: 0.35em !important;\n      }\n      .multiselect-dropdown-list div.checked{\n      }\n      .multiselect-dropdown-list div:hover{\n        background-color: #ced4da;\n      }\n      .multiselect-dropdown span.maxselected {width:100%;}\n      .multiselect-dropdown-all-selector {border-bottom:solid 1px #999;}\n      ";
    document.head.appendChild(style); // функцию создания селекта из радио/чекбоксов

    function createSelectFromInputs(formGroup) {
      var inputs = Array.from(formGroup.querySelectorAll('input[type="radio"], input[type="checkbox"]'));
      if (inputs.length === 0) return null;
      var isMultiple = inputs[0].type === 'checkbox';
      var select = document.createElement('select');
      select.name = inputs[0].name + '_select';
      if (isMultiple) select.multiple = true;
      inputs.forEach(function (input) {
        return input.checked = false;
      });
      var label = document.createElement('label');
      label.classList.add('rte-form-label', 'required');
      var text1 = "Position";
      var text2 = "Marketing vertical";
      var text3 = "Select";

      if (isUALang) {
        text1 = textJSDictionary.get(text1);
        text2 = textJSDictionary.get(text2);
        text3 = textJSDictionary.get(text3);
      }

      label.textContent = inputs[0].name.includes("position") ? text1 : inputs[0].name.includes("vertical") ? text2 : text3;
      inputs.forEach(function (input) {
        var labelEl = formGroup.querySelector("label[for=\"".concat(input.id, "\"]"));
        var optionEl = document.createElement('option');
        optionEl.value = input.value;
        optionEl.textContent = labelEl ? labelEl.textContent.trim() : input.value;
        select.appendChild(optionEl);
      });
      inputs.forEach(function (i) {
        return i.style.display = 'none';
      });
      formGroup.querySelectorAll('label').forEach(function (l) {
        return l.style.display = 'none';
      });
      formGroup.appendChild(label);
      formGroup.appendChild(select);
      select.addEventListener('change', function () {
        var selectedValues = Array.from(select.selectedOptions).map(function (o) {
          return o.value;
        });
        inputs.forEach(function (input) {
          input.checked = selectedValues.includes(input.value);
          input.dispatchEvent(new Event('change'));
        }); // console.log(selectedValues);
      });
      return select;
    }

    function MultiselectDropdown() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

      var config = _objectSpread2({
        style: {
          width: "100%"
        },
        search: true,
        height: '15rem',
        placeholder: '',
        txtSelected: 'selected',
        txtAll: 'All',
        txtRemove: 'Remove',
        txtSearch: 'search'
      }, options);

      function newEl(tag, attrs) {
        var e = document.createElement(tag);
        if (!attrs) return e;
        Object.entries(attrs).forEach(function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
              k = _ref3[0],
              v = _ref3[1];

          if (k === 'class') {
            if (Array.isArray(v)) v.forEach(function (c) {
              return c && e.classList.add(c);
            });else if (v) e.classList.add(v);
          } else if (k === 'style' && _typeof(v) === 'object') {
            Object.entries(v).forEach(function (_ref4) {
              var _ref5 = _slicedToArray(_ref4, 2),
                  ks = _ref5[0],
                  vs = _ref5[1];

              return e.style[ks] = vs;
            });
          } else if (k === 'text') {
            e.innerText = v === '' ? "\xA0" : v;
          } else {
            e[k] = v;
          }
        });
        return e;
      }

      container.querySelectorAll("select:not(.telephone_code)").forEach(function (el, idx) {
        var _config$style$width, _config$style, _config$style$padding, _config$style2, _config$searchInput$c, _config$searchInput, _el$attributes$multis;

        if (el.dataset.multiselectInitialized) return;
        el.dataset.multiselectInitialized = 'true';
        var isMultiple = el.multiple;
        var div = newEl('div', {
          class: 'multiselect-dropdown',
          style: {
            width: (_config$style$width = (_config$style = config.style) === null || _config$style === void 0 ? void 0 : _config$style.width) !== null && _config$style$width !== void 0 ? _config$style$width : el.clientWidth + 'px',
            padding: (_config$style$padding = (_config$style2 = config.style) === null || _config$style2 === void 0 ? void 0 : _config$style2.padding) !== null && _config$style$padding !== void 0 ? _config$style$padding : ''
          }
        });
        el.style.display = 'none';
        el.parentNode.insertBefore(div, el.nextSibling);
        var listWrap = newEl('div', {
          class: 'multiselect-dropdown-list-wrapper'
        });
        var list = newEl('div', {
          class: 'multiselect-dropdown-list',
          style: {
            height: config.height
          }
        });
        var search = newEl('input', {
          class: ['multiselect-dropdown-search', (_config$searchInput$c = (_config$searchInput = config.searchInput) === null || _config$searchInput === void 0 ? void 0 : _config$searchInput.class) !== null && _config$searchInput$c !== void 0 ? _config$searchInput$c : 'form-control'],
          style: {
            width: '100%',
            display: ((_el$attributes$multis = el.attributes['multiselect-search']) === null || _el$attributes$multis === void 0 ? void 0 : _el$attributes$multis.value) === 'true' ? 'block' : 'none'
          },
          placeholder: config.txtSearch
        });
        listWrap.appendChild(search);
        div.appendChild(listWrap);
        listWrap.appendChild(list); // Загрузка опций

        el.loadOptions = function () {
          var _el$attributes$multis2;

          list.innerHTML = '';

          if (((_el$attributes$multis2 = el.attributes['multiselect-select-all']) === null || _el$attributes$multis2 === void 0 ? void 0 : _el$attributes$multis2.value) == 'true' && isMultiple) {
            var allSelector = newEl('div', {
              class: 'multiselect-dropdown-all-selector'
            });
            var allCheckbox = newEl('input', {
              type: 'checkbox'
            });
            allSelector.appendChild(allCheckbox);
            allSelector.appendChild(newEl('label', {
              text: config.txtAll
            }));
            allSelector.addEventListener('click', function () {
              allSelector.classList.toggle('checked');
              allCheckbox.checked = !allCheckbox.checked;
              var check = allCheckbox.checked;
              list.querySelectorAll(":scope > div:not(.multiselect-dropdown-all-selector)").forEach(function (divOpt) {
                if (divOpt.style.display !== 'none') {
                  divOpt.querySelector("input").checked = check;
                  divOpt.optEl.selected = check;
                }
              });
              el.dispatchEvent(new Event('change'));
            });
            allCheckbox.addEventListener('click', function (e) {
              return e.stopPropagation();
            });
            el.addEventListener('change', function () {
              var optionsVisible = Array.from(list.querySelectorAll(":scope > div:not(.multiselect-dropdown-all-selector)")).filter(function (d) {
                return d.style.display !== 'none';
              });
              var existsNotSelected = optionsVisible.find(function (d) {
                return !d.querySelector('input').checked;
              });
              allCheckbox.checked = !existsNotSelected;
            });
            list.appendChild(allSelector);
          }

          Array.from(el.options).forEach(function (o) {
            var optionWrapper = newEl('div', {
              class: o.selected ? 'checked' : '',
              optEl: o
            });
            var inputType = isMultiple ? 'checkbox' : 'radio';
            var optionInput = newEl('span', {
              class: 'fake-checkbox',
              type: inputType,
              name: 'multiselect-' + idx,
              checked: o.selected
            });
            optionWrapper.appendChild(optionInput);
            optionWrapper.appendChild(newEl('label', {
              text: o.text
            }));
            optionWrapper.addEventListener('click', function (e) {
              if (isMultiple) {
                optionWrapper.classList.toggle('checked');
                optionInput.checked = !optionInput.checked;
                o.selected = !o.selected;
              } else {
                Array.from(el.options).forEach(function (opt) {
                  return opt.selected = false;
                });
                Array.from(list.children).forEach(function (child) {
                  return child.classList.remove('checked');
                });
                o.selected = true;
                optionInput.checked = true;
                optionWrapper.classList.add('checked');

                if (optionWrapper.classList.contains('checked')) {
                  e.stopPropagation();
                  listWrap.style.display = 'none';
                }
              }

              el.dispatchEvent(new Event('change'));
              div.refresh();
            });
            optionInput.addEventListener('click', function (e) {
              return e.stopPropagation();
            });
            o.listitemEl = optionWrapper;
            list.appendChild(optionWrapper);
          });
          div.listEl = listWrap;

          if (!isMultiple) {
            div.classList.add('single-select');
            el.selectedIndex = -1;
            Array.from(el.options).forEach(function (opt) {
              return opt.selected = false;
            });
            list.querySelectorAll('div.checked').forEach(function (checkedDiv) {
              checkedDiv.classList.remove('checked');
              var input = checkedDiv.querySelector('input[type="radio"]');
              if (input) input.checked = false;
            });
          }

          div.refresh = function () {
            div.querySelectorAll('span.optext, span.placeholder').forEach(function (el) {
              return div.removeChild(el);
            });
            var selectedOptions = Array.from(el.selectedOptions);

            if (isMultiple) {
              var _el$attributes$multis3, _el$attributes$multis4;

              if (selectedOptions.length > ((_el$attributes$multis3 = (_el$attributes$multis4 = el.attributes['multiselect-max-items']) === null || _el$attributes$multis4 === void 0 ? void 0 : _el$attributes$multis4.value) !== null && _el$attributes$multis3 !== void 0 ? _el$attributes$multis3 : 5)) {
                div.appendChild(newEl('span', {
                  class: ['optext', 'maxselected'],
                  text: selectedOptions.length + ' ' + config.txtSelected
                }));
              } else {
                selectedOptions.forEach(function (sel) {
                  var _el$attributes$multis5;

                  var span = newEl('span', {
                    class: 'optext',
                    text: sel.text,
                    srcOption: sel
                  });

                  if (((_el$attributes$multis5 = el.attributes['multiselect-hide-x']) === null || _el$attributes$multis5 === void 0 ? void 0 : _el$attributes$multis5.value) !== 'true') {
                    span.appendChild(newEl('span', {
                      class: 'optdel',
                      text: '✖',
                      title: config.txtRemove,
                      onclick: function onclick(ev) {
                        span.srcOption.listitemEl.dispatchEvent(new Event('click'));
                        div.refresh();
                        ev.stopPropagation();
                      }
                    }));
                  }

                  div.appendChild(span);
                });
              }

              if (selectedOptions.length === 0) {
                var _el$attributes$placeh, _el$attributes$placeh2;

                div.appendChild(newEl('span', {
                  class: 'placeholder',
                  text: (_el$attributes$placeh = (_el$attributes$placeh2 = el.attributes['placeholder']) === null || _el$attributes$placeh2 === void 0 ? void 0 : _el$attributes$placeh2.value) !== null && _el$attributes$placeh !== void 0 ? _el$attributes$placeh : config.placeholder
                }));
              }
            } else {
              if (div.classList.contains('single-select')) {
                if (selectedOptions.length > 0 && selectedOptions[0].selected) {
                  var _el$attributes$multis6;

                  var span = newEl('span', {
                    class: 'optext',
                    text: selectedOptions[0].text,
                    srcOption: selectedOptions[0]
                  });

                  if (((_el$attributes$multis6 = el.attributes['multiselect-hide-x']) === null || _el$attributes$multis6 === void 0 ? void 0 : _el$attributes$multis6.value) !== 'true') {
                    var delBtn = newEl('span', {
                      class: 'optdel',
                      text: '✖',
                      title: config.txtRemove,
                      onclick: function onclick(ev) {
                        ev.stopPropagation(); // Сброс выбора

                        el.selectedIndex = -1;
                        Array.from(el.options).forEach(function (opt) {
                          return opt.selected = false;
                        });
                        Array.from(div.listEl.querySelectorAll('.checked')).forEach(function (el) {
                          return el.classList.remove('checked');
                        });
                        Array.from(div.listEl.querySelectorAll('input[type="radio"]')).forEach(function (input) {
                          return input.checked = false;
                        });
                        el.dispatchEvent(new Event('change'));
                        div.refresh();
                      }
                    });
                    span.appendChild(delBtn);
                  }

                  div.appendChild(span);
                } else {
                  var _el$attributes$placeh3, _el$attributes$placeh4;

                  div.appendChild(newEl('span', {
                    class: 'placeholder',
                    text: (_el$attributes$placeh3 = (_el$attributes$placeh4 = el.attributes['placeholder']) === null || _el$attributes$placeh4 === void 0 ? void 0 : _el$attributes$placeh4.value) !== null && _el$attributes$placeh3 !== void 0 ? _el$attributes$placeh3 : config.placeholder
                  }));
                }
              } else {
                if (selectedOptions.length > 0) {
                  var _el$attributes$multis7;

                  var _span = newEl('span', {
                    class: 'optext',
                    text: selectedOptions[0].text,
                    srcOption: selectedOptions[0]
                  });

                  if (((_el$attributes$multis7 = el.attributes['multiselect-hide-x']) === null || _el$attributes$multis7 === void 0 ? void 0 : _el$attributes$multis7.value) !== 'true') {
                    _span.appendChild(newEl('span', {
                      class: 'optdel',
                      text: '✖',
                      title: config.txtRemove,
                      onclick: function onclick(ev) {
                        _span.srcOption.listitemEl.dispatchEvent(new Event('click'));

                        div.refresh();
                        ev.stopPropagation();
                      }
                    }));
                  }

                  div.appendChild(_span);
                } else {
                  var _el$attributes$placeh5, _el$attributes$placeh6;

                  div.appendChild(newEl('span', {
                    class: 'placeholder',
                    text: (_el$attributes$placeh5 = (_el$attributes$placeh6 = el.attributes['placeholder']) === null || _el$attributes$placeh6 === void 0 ? void 0 : _el$attributes$placeh6.value) !== null && _el$attributes$placeh5 !== void 0 ? _el$attributes$placeh5 : config.placeholder
                  }));
                }
              }
            }
          };

          div.refresh();
        };

        el.loadOptions();
        search.addEventListener('input', function () {
          list.querySelectorAll(":scope div:not(.multiselect-dropdown-all-selector)").forEach(function (d) {
            var txt = d.querySelector("label").innerText.toUpperCase();
            d.style.display = txt.includes(search.value.toUpperCase()) ? 'block' : 'none';
          });
        });
        div.addEventListener('click', function () {
          listWrap.style.display = 'block';
          search.focus();
          search.select();
        });
        document.addEventListener('click', function (e) {
          if (!div.contains(e.target)) {
            listWrap.style.display = 'none';
            div.refresh();
          }
        });
      });
    }

    var popup = document.querySelector(".tickets-popup");
    var ticketsBg = document.querySelector(".tickets-bg");
    var popupBack = document.querySelector(".tickets-popup__back");
    var popupCloseBtn = document.querySelector(".tickets-popup__close");
    var RTEform = document.querySelector(".rte-input-form");
    var RTEdetails = document.querySelector(".rte-order-details");

    function openPopup() {
      popup.classList.add("active");
      ticketsBg.classList.add("active");
      document.querySelector("html").style.overflow = "hidden";
    }

    function closePopup() {
      popup.classList.remove("active");
      ticketsBg.classList.remove("active");
      document.querySelector("html").style.overflow = "";
    }

    var ticketBtns = document.querySelectorAll(".tickets__btn");
    ticketBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        openPopup();
        var ticketCountSilver = document.querySelector(".rte-tbody .rte-tr:first-child .rte-number-input");
        var ticketCountSilverIncrease = document.querySelector(".rte-tbody .rte-tr:first-child .rte-increase-button"); // const ticketCountGold = document.querySelector(".rte-tbody .rte-tr:nth-child(2) .rte-number-input");
        // const ticketCountGoldIncrease = document.querySelector(".rte-tbody .rte-tr:nth-child(2) .rte-increase-button");
        // const ticketCountVip = document.querySelector(".rte-tbody .rte-tr:nth-child(3) .rte-number-input");
        // const ticketCountVipIncrease = document.querySelector(".rte-tbody .rte-tr:nth-child(3) .rte-increase-button");

        if (btn.classList.contains("tickets__btn") && ticketCountSilver.value == '0') {
          ticketCountSilverIncrease.click();
        } // else if (btn.classList.contains("tickets__btn--gold") && ticketCountGold.value == '0') {
        //     ticketCountGoldIncrease.click()
        // } else if (btn.classList.contains("tickets__btn--vip") && ticketCountVip.value == '0') {
        //     ticketCountVipIncrease.click()
        // }

      });
    });
    popupCloseBtn.addEventListener("click", function () {
      closePopup();
    });
    var nextBtn = document.querySelector(".rte-table-footer button");
    var termsCheckboxes = '';

    if (nextBtn) {
      setTimeout(function () {
        nextBtn.textContent = isUALang ? textJSDictionary.get("Order") : "Order";
        nextBtn.id = "order-btn-step1";
      }, 200);
    }

    nextBtn === null || nextBtn === void 0 ? void 0 : nextBtn.addEventListener("click", function () {
      var inputs = document.querySelectorAll(".rte-number-input");
      var countValidate = Array.from(inputs).some(function (elem) {
        return elem.value !== "0";
      });

      if (countValidate) {
        setTimeout(function () {
          document.querySelector(".tickets-popup__step").textContent = '2';
          popupBack.classList.add("active");
          RTEform.style.display = "none";
          RTEdetails.style.display = "block";
          var nextOrderBtn = document.querySelector(".rte-add-button");
          nextOrderBtn.textContent = isUALang ? textJSDictionary.get("Order") : "Order";
          nextOrderBtn.id = "order-btn-step2";
          var orderDetailsElements = document.querySelectorAll(".rte-order-details__element");
          orderDetailsElements.forEach(function (element) {
            var formGroup = element.querySelector(".rte-form-group");
            if (!formGroup) return;
            var dropdownContainer = document.createElement("div");
            var targetInputGroup = element.querySelector(".rte-form-group:nth-last-child(2)");
            targetInputGroup.append(dropdownContainer);
            dropdownContainer.style.width = "100%";
            var event = new Event('input', {
              bubbles: true,
              cancelable: true
            });
          });

          function setupDynamicSelects() {
            var detailElements = document.querySelectorAll(".rte-order-details__element");
            detailElements.forEach(function (element) {
              var formGroups = element.querySelectorAll(".rte-form-group");
              formGroups.forEach(function (group) {
                if (!group.querySelector('select')) {
                  createSelectFromInputs(group);
                }
              });
              MultiselectDropdown({}, element);
            });
            document.querySelectorAll('select[multiple]').forEach(function (select) {
              MultiselectDropdown({});
            });
          }

          setupDynamicSelects();
          termsCheckboxes = document.querySelectorAll(".rte-order-agreement-element input");
          termsCheckboxes.forEach(function (checkbox) {
            checkbox.required = true;
            checkbox.addEventListener("change", function () {
              if (this.checked) {
                this.parentElement.classList.add("active");
              } else {
                this.parentElement.classList.remove("active");
              }

              var termsValid = _toConsumableArray(termsCheckboxes).every(function (input) {
                return input.checked === true;
              });

              if (termsValid) {
                nextOrderBtn.disabled = false;
                nextOrderBtn.style.opacity = 1;
              } else {
                nextOrderBtn.disabled = true;
                nextOrderBtn.style.opacity = 0.5;
              }
            });
          });
          nextOrderBtn.addEventListener("click", function () {
            var termsValid = _toConsumableArray(termsCheckboxes).every(function (input) {
              return input.checked === true;
            });

            if (!termsValid) {
              errorOverlay.classList.add("active");
              var errorText = isUALang ? textJSDictionary.get("You must fill in all required fields and agree to the terms of the public offer, user agreement and privacy policy.") : "You must fill in all required fields and agree to the terms of the public offer, user agreement and privacy policy.";
              showErrorPopup(errorText);
            }
          });
        }, 200);
      }
    });
    popupBack.addEventListener("click", function () {
      this.classList.remove("active");
      RTEform.style.display = "block";
      RTEdetails.style.display = "none";
      document.querySelector(".tickets-popup__step").textContent = '1';
    });
    var errorOverlay = document.querySelector(".error-overlay");
    var errorPopup = document.querySelector(".error-popup");
    var errorBtn = document.querySelector(".error-popup__btn");

    window.alert = function () {// Просто игнорируем вызов alert
    };

    function showErrorPopup(errorMessage) {
      errorPopup.querySelector(".error-popup__text").textContent = errorMessage;
      errorPopup.classList.add("active");
    }

    var originalFetch = window.fetch;

    window.fetch = function () {
      return originalFetch.apply(void 0, arguments).then(function (response) {
        if (response.status === 422) {
          console.log('Ошибка: статус 422 (Unprocessable Entity)');
          errorOverlay.classList.add("active");
          var errorText = isUALang ? textJSDictionary.get("Promo code does not exist") : "Promo code does not exist";
          showErrorPopup(errorText);
        }

        return response;
      });
    };

    errorBtn.addEventListener("click", function () {
      errorOverlay.classList.remove("active");
      errorPopup.classList.remove("active");
    });
    errorOverlay.addEventListener("click", function () {
      errorOverlay.classList.remove("active");
      errorPopup.classList.remove("active");
    });

    function changePopupLang() {
      var locale = document.documentElement.lang;
      if (locale !== "ua") return;
      var firstStepOrderButton = document.querySelector('#order-btn-step1');
      var firstStepElements = {
        labelText: ".rte-table-text",
        type: ".rte-thead .rte-tr .rte-th:nth-child(1)",
        quantity: ".rte-thead .rte-tr .rte-th:nth-child(2)",
        price: ".rte-thead .rte-tr .rte-th:nth-child(3)",
        sum: ".rte-thead .rte-tr .rte-th:nth-child(4)",
        footer: ".rte-table-footer-text",
        orderBrn: "#order-btn-step1"
      };
      var agreementElements = {
        first: ".rte-order-agreement-element:nth-child(1)",
        second: ".rte-order-agreement-element:nth-child(2)"
      };
      var formElements = {
        labels: ".rte-form-label"
      };
      var firstStepTranslation = new Map([["Select the number of tickets you wish to purchase", "translate"], ["Type", "translate"], ["Quantity", "translate"], ["Price", "translate"], ["Sum", "translate"], ["If the event provides additional discounts or promo codes, they can be applied in the next step", "translate"], ["Order", "translate"]]);
      var agreementTranslation = new Map([["Do you accept terms and conditions of", "translate"], ["and agree to the processing of personal data", "translate"]]);
      var formTranslation = new Map([["First name", "translate"], ["Telephone number", "translate"], ["Email", "translate"], ["Company", "translate"], ["Telegram", "translate"], ["Position", "translate"], ["Marketing vertical", "translate"], ["Promocode", "translate"]]);
      injectTranslation(firstStepElements, firstStepTranslation);

      function injectTranslation(nodes, dictionary) {
        var _loop = function _loop() {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              value = _Object$entries$_i[1];

          var currElement = document.querySelector(value);
          var currElementText = currElement.textContent;
          dictionary.forEach(function (uaTranslation, original) {
            if (original.trim() !== currElementText.trim()) return;
            currElement.textContent = uaTranslation;
          });
        };

        for (var _i = 0, _Object$entries = Object.entries(nodes); _i < _Object$entries.length; _i++) {
          _loop();
        }
      }

      function injectAgreementTranslation() {
        var agreementFirst = document.querySelector(agreementElements.first);
        var agreementSecond = document.querySelector(agreementElements.second);
        agreementTranslation.forEach(function (uaTranslation, original) {
          agreementFirst.innerHTML = agreementFirst.innerHTML.replace(original, uaTranslation);
          agreementSecond.innerHTML = agreementSecond.innerHTML.replace(original, uaTranslation);
        });
      }

      function injectFormTranslation() {
        var labels = document.querySelectorAll(formElements.labels);
        labels.forEach(function (label) {
          var currElementText = label.textContent;
          formTranslation.forEach(function (uaTranslation, original) {
            if (original.trim() !== currElementText.trim()) return;
            label.textContent = uaTranslation;
          });
        });
      }

      firstStepOrderButton.addEventListener('click', function () {
        injectAgreementTranslation();
        injectFormTranslation();
      });
    }

    var ticketsContainer = document.querySelector(".tickets__content");
    if (!ticketsContainer) return;
    ticketsContainer.addEventListener('click', function (event) {
      var isBuyButton = event.target.classList.contains('tickets__btn');
      if (!isBuyButton) return;
      changePopupLang();
    });
  });

  var expozone = (function () {
    function initZoneLabels() {
      var labels = document.querySelectorAll('.label');
      var places = document.querySelectorAll('.zone__place');
      window.addEventListener('scroll', setLabels);
      setLabels();
      places.forEach(function (place) {
        var related = [place];
        var sibling = place.nextElementSibling; // Если сосед — path без .zone__place, считаем его частью зоны

        if (sibling && sibling.tagName === 'path' && !sibling.classList.contains('zone__place')) {
          related.push(sibling);
        }

        var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        related.forEach(function (el) {
          if (isTouchDevice) {
            el.addEventListener('click', function (e) {
              e.stopPropagation(); // Чтобы избежать закрытия при клике на сам элемент

              var currentLabel = _toConsumableArray(labels).find(function (label) {
                return place.dataset.place === label.dataset.location;
              });

              var alreadyActive = place.classList.contains('active'); // Сначала убираем все активные классы

              labels.forEach(function (label) {
                return label.classList.remove('active');
              });
              places.forEach(function (p) {
                return p.classList.remove('active');
              }); // Потом активируем, если он еще не был активен

              if (!alreadyActive) {
                currentLabel === null || currentLabel === void 0 ? void 0 : currentLabel.classList.add('active');
                place.classList.add('active');
              }
            }); // Закрытие при клике вне зоны

            document.addEventListener('click', function (e) {
              if (!place.contains(e.target) && !(sibling === null || sibling === void 0 ? void 0 : sibling.contains(e.target))) {
                var currentLabel = _toConsumableArray(labels).find(function (label) {
                  return place.dataset.place === label.dataset.location;
                });

                currentLabel === null || currentLabel === void 0 ? void 0 : currentLabel.classList.remove('active');
                place.classList.remove('active');
              }
            });
          } else {
            // Десктопное поведение
            el.addEventListener('mouseenter', function () {
              var currentLabel = _toConsumableArray(labels).find(function (label) {
                return place.dataset.place === label.dataset.location;
              });

              currentLabel === null || currentLabel === void 0 ? void 0 : currentLabel.classList.add('active');
              place.classList.add('active');
            });
            el.addEventListener('mouseleave', function () {
              var currentLabel = _toConsumableArray(labels).find(function (label) {
                return place.dataset.place === label.dataset.location;
              });

              currentLabel === null || currentLabel === void 0 ? void 0 : currentLabel.classList.remove('active');
              place.classList.remove('active');
            });
          }
        });
      });

      function setLabels() {
        labels.forEach(function (label) {
          var currentPlace = _toConsumableArray(places).filter(function (place) {
            return window.getComputedStyle(place.parentElement, null).display !== 'none' && place.dataset.place === label.dataset.location;
          });

          if (!currentPlace[0]) return;
          var placeRect = currentPlace[0].getBoundingClientRect();
          var tooltipWidth = label.clientWidth;
          var left = placeRect.left + placeRect.width / 2 - tooltipWidth / 2;
          label.classList.remove('tooltip--shift-left', 'tooltip--shift-right');
          var padding = 8;
          var shift = 40;

          if (left < padding) {
            left = left + shift;
            label.classList.add('tooltip--shift-right');
          } else if (left + tooltipWidth > window.innerWidth - padding) {
            left = left - shift;
            label.classList.add('tooltip--shift-left');
          }

          label.style.top = "".concat(placeRect.top - 5 + placeRect.height, "px");
          label.style.left = "".concat(left, "px");
          label.addEventListener('mouseenter', function () {
            label.classList.add('active');
            currentPlace[0].classList.add('active');
          });
          label.addEventListener('mouseleave', function () {
            label.classList.remove('active');
            currentPlace[0].classList.remove('active');
          });
        });
      }
    }

    initZoneLabels();
  });

  var location = (function () {
    // Загружаем YouTube API
    if (!window.YT) {
      var tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }

    var videoWrappers = document.querySelectorAll('.location__video');

    function initYouTubePlayers() {
      videoWrappers.forEach(function (wrapper) {
        var iframe = wrapper.querySelector('iframe');
        var btn = wrapper.querySelector('[data-video-play]');
        var preload = wrapper.querySelector('.location__video-preload'); // Создаем player

        var player = new YT.Player(iframe, {
          events: {
            onReady: function onReady() {
              // Кнопка включения
              btn.addEventListener('click', function () {
                player.playVideo();
                preload.style.opacity = 0;
                btn.style.display = 'none';
                wrapper.classList.add('is-playing');
              });
            },
            onStateChange: function onStateChange(event) {
              if (event.data === YT.PlayerState.ENDED) {
                wrapper.classList.remove('is-playing');
                preload.style.opacity = 1;
                btn.style.display = 'block';
              }
            }
          }
        });
      });
    } // Ждем, когда API подгрузится


    window.onYouTubeIframeAPIReady = initYouTubePlayers;
  });

  // export default () => {
  //   const canvas = document.querySelector('.wave-animation__canvas');
  //   if (!canvas) return;
  //
  //   const ctx = canvas.getContext('2d');
  //
  //   function resize() {
  //     const dpr = window.devicePixelRatio || 1;
  //     const rect = canvas.getBoundingClientRect();
  //
  //     canvas.width = rect.width * dpr;
  //     canvas.height = rect.height * dpr;
  //
  //     // сброс трансформаций
  //     ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  //
  //     canvas.style.width = rect.width + 'px';
  //     canvas.style.height = rect.height + 'px';
  //   }
  //
  //   resize();
  //   window.addEventListener('resize', resize);
  //
  //   function animate() {
  //     const rect = canvas.getBoundingClientRect();
  //     ctx.clearRect(0, 0, rect.width, rect.height);
  //     const time = Date.now() * 0.00033; // Чуть ускорил анимацию для живости
  //     const centerX = rect.width / 2;
  //
  //     for (let i = 0; i < 3; i++) {
  //       ctx.beginPath();
  //       ctx.strokeStyle = `rgba(211, 159, 255, ${0.6 - i * 0.1})`;
  //       ctx.lineWidth = 4; // Чуть толще для лучшей видимости клубка
  //
  //
  //       // Небольшое общее смещение линий, чтобы они не были идеально одинаковыми
  //       const baseOffset = (i - 2) * 35; // Лёгкое расслоение (15 px между линиями)
  //
  //       for (let x = 0; x <= rect.width; x += 1) { // Шаг 1 для плавности
  //         const distFromCenter = Math.abs(x - centerX);
  //
  //         // Чем ближе к центру — тем сильнее хаос (экспоненциальный буст)
  //         const centerEffect = Math.exp(-distFromCenter / 120); // 180 — регулирует ширину клубка
  //
  //         let y = rect.height / 2 + baseOffset;
  //
  //         // Основная плавная волна (видна по краям)
  //         y += Math.sin(x * 0.015 + time + i * 0.5) * 25;
  //
  //         // Хаотичные колебания — только в центре и очень сильные
  //         y += Math.sin(x * 0.08 + time * 3 + i * 1.3) * 60 * centerEffect;
  //         y += Math.sin(x * 0.12 - time * 4 + i * 2.1) * 50 * centerEffect;
  //         y += Math.sin(x * 0.15 + time * 2.5 + i * 1.7) * 40 * centerEffect;
  //         y += Math.sin(x * 0.10 - time * 3.5 + i * 0.9) * 55 * centerEffect;
  //         y += Math.sin(x * 0.18 + time * 4.2 + i * 2.4) * 35 * centerEffect; // Ещё одна частота для плотности
  //
  //         if (x === 0) ctx.moveTo(x, y);
  //         else ctx.lineTo(x, y);
  //       }
  //       ctx.stroke();
  //     }
  //
  //     requestAnimationFrame(animate);
  //   }
  //
  //   animate();
  // }
  var mediaPartners = (function () {
    var canvases = document.querySelectorAll('.wave-animation__canvas');
    if (!canvases.length) return;
    canvases.forEach(function (canvas) {
      var ctx = canvas.getContext('2d');
      var width = 0;
      var height = 0;
      var centerY = 0;

      function resize() {
        var dpr = window.devicePixelRatio || 1;
        var rect = canvas.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        centerY = height / 2;
        canvas.width = width * dpr;
        canvas.height = height * dpr; // масштабируем контекст, чтобы координаты были в CSS пикселях

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      resize();
      window.addEventListener('resize', resize);

      function animate() {
        ctx.clearRect(0, 0, width, height);
        var time = Date.now() * 0.00033;
        var centerX = width / 2;

        for (var i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.strokeStyle = "rgba(211, 159, 255, ".concat(0.6 - i * 0.1, ")");
          ctx.lineWidth = 4;
          var baseOffset = (i - 2) * 35;

          for (var x = 0; x <= width; x += 1) {
            var distFromCenter = Math.abs(x - centerX);
            var centerEffect = Math.exp(-distFromCenter / 120);
            var y = centerY + baseOffset;
            y += Math.sin(x * 0.015 + time + i * 0.5) * 25;
            y += Math.sin(x * 0.08 + time * 3 + i * 1.3) * 60 * centerEffect;
            y += Math.sin(x * 0.12 - time * 4 + i * 2.1) * 50 * centerEffect;
            y += Math.sin(x * 0.15 + time * 2.5 + i * 1.7) * 40 * centerEffect;
            y += Math.sin(x * 0.10 - time * 3.5 + i * 0.9) * 55 * centerEffect;
            y += Math.sin(x * 0.18 + time * 4.2 + i * 2.4) * 35 * centerEffect;
            if (x === 0) ctx.moveTo(x, y);else ctx.lineTo(x, y);
          }

          ctx.stroke();
        }

        requestAnimationFrame(animate);
      }

      animate();
    });
  });

  var galary = (function () {
    var allImages = _toConsumableArray(document.querySelectorAll('.zoom-img'));

    if (!allImages.length) return; // 🔥 Защита: если нет изображений, модуль не выполняется

    var galarySliderWrapper = document.querySelector('.galary__slider .swiper-wrapper');
    if (!galarySliderWrapper) return; // 🔥 Защита: если нет контейнера слайдера
    // показать только первые 32 изображения в слайдер

    galarySliderWrapper.innerHTML = '';
    allImages.slice(0, 32).forEach(function (img) {
      var slide = img.closest('.galary__slide');
      if (slide) galarySliderWrapper.appendChild(slide);
    });
    var galarySlider = null;
    var modalSwiper = null;

    var initSlider = function initSlider() {
      galarySlider = new Swiper(".galary__slider", {
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 24,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          type: "progressbar"
        },
        navigation: {
          nextEl: ".galary__arrow.wait-slider__nav--next",
          prevEl: ".galary__arrow.wait-slider__nav--prev"
        },
        breakpoints: {
          1024: {
            slidesPerGroup: 2
          },
          1230: {
            slidesPerGroup: 3
          }
        }
      });
    };

    var destroySlider = function destroySlider() {
      if (galarySlider) {
        galarySlider.destroy(true, true);
        galarySlider = null;
      }
    };

    var handleResize = function handleResize() {
      if (window.innerWidth < 1024) {
        if (!galarySlider) initSlider();
      } else {
        destroySlider();
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Модалка

    function openModal() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var modal = document.getElementById('galleryModal');
      if (!modal) return; // 🔥 Защита

      var wrapper = modal.querySelector('.modal-slider .swiper-wrapper');
      if (!wrapper) return; // 🔥 Защита

      document.documentElement.style.overflow = 'hidden';
      wrapper.innerHTML = '';
      var slides = allImages.map(function (img) {
        var _picture$querySelecto;

        var src = img.getAttribute('src');
        var alt = img.getAttribute('alt') || '';
        var picture = img.closest('picture');
        var webpSrc = (picture === null || picture === void 0 ? void 0 : (_picture$querySelecto = picture.querySelector('source[type="image/webp"]')) === null || _picture$querySelecto === void 0 ? void 0 : _picture$querySelecto.getAttribute('srcset')) || '';
        return "\n                <div class=\"swiper-slide\">\n                    <picture>\n                        ".concat(webpSrc ? "<source srcset=\"".concat(webpSrc, "\" type=\"image/webp\">") : '', "\n                        <img class=\"galary__img zoom-img\" src=\"").concat(src, "\" alt=\"").concat(alt, "\">\n                    </picture>\n                </div>\n            ");
      });
      if (modalSwiper) modalSwiper.destroy(true, true);
      modalSwiper = new Swiper('.modal-slider', {
        virtual: {
          slides: slides
        },
        navigation: {
          nextEl: '.modal .wait-slider__nav--next',
          prevEl: '.modal .wait-slider__nav--prev'
        },
        pagination: {
          el: ".modal__content .swiper-pagination",
          type: "fraction"
        },
        loop: false,
        spaceBetween: 15,
        simulateTouch: true,
        touchEventsTarget: 'container',
        grabCursor: true,
        cssMode: false
      });
      modal.classList.add('open');
      modalSwiper.slideTo(index, 0, false);
      document.addEventListener('keydown', handleKeyDown);
    }

    function closeModal() {
      var modal = document.getElementById('galleryModal');
      if (!modal) return;
      modal.classList.remove('open');
      document.removeEventListener('keydown', handleKeyDown);
      document.documentElement.style.overflow = '';
    }

    function handleKeyDown(e) {
      if (!modalSwiper) return;
      var modal = document.getElementById('galleryModal');
      if (!(modal === null || modal === void 0 ? void 0 : modal.classList.contains('open'))) return;
      if (e.key === 'ArrowRight') modalSwiper.slideNext();else if (e.key === 'ArrowLeft') modalSwiper.slidePrev();else if (e.key === 'Escape') closeModal();
    }

    allImages.forEach(function (img, index) {
      img.addEventListener('click', function () {
        openModal(index);
      });
    });
    var modalCloseBtn = document.querySelector('.modal__close');
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  });

  var footer = (function () {
    var year = new Date().getFullYear();
    var placeY = document.getElementsByClassName("year");

    for (var i = 0; i < placeY.length; i++) {
      var elemY = placeY[i];
      elemY.innerHTML = year;
    }
  });

  var wait = (function () {
    var swiper = new Swiper(".wait-slider", {
      slidesPerView: 1,
      // centeredSlides: true,
      spaceBetween: 25,
      // loop: true,
      // pagination: {
      //   el: ".swiper-pagination",
      //   type: "progressbar",
      // },
      navigation: {
        nextEl: ".wait-slider__nav--next",
        prevEl: ".wait-slider__nav--prev"
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 25
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 25
        },
        1360: {
          slidesPerView: 4,
          spaceBetween: 30
        }
      }
    });
  });

  var promo = (function () {
    setTimeout(function () {
      var videoEl = document.getElementById("video");

      if (videoEl) {
        var path = window.cdn_path || '';
        videoEl.src = path + "img/video.mp4";
      }
    }, 1000);
    var diamonds = document.querySelectorAll('.diamond');

    if (diamonds.length > 0) {
      document.addEventListener('mousemove', function (e) {
        if (window.innerWidth < 1024) return;
        diamonds.forEach(function (d) {
          var speed = 500 / d.clientWidth;
          d.style.transform = "translate3d(".concat(-(e.clientX * speed / 1000), "px,").concat(-(e.clientY * speed / 1000), "px,0)");
        });
      });
    }

    setTimeout(function () {
      var promoEl = document.getElementById('promo');

      if (promoEl) {
        promoEl.classList.add('show-diamonds');
      }
    }, 9000);
  });

  var dress = (function () {
    var dressSection = document.querySelector(".dress");
    if (!dressSection) return; // 🔥 Защита

    var observerDressSection = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observerDressSection.unobserve(entry.target);
        } // else {
        //   entry.target.classList.remove("active");
        // }

      });
    }, {
      threshold: 0.75
    });
    observerDressSection.observe(dressSection);
  });

  scrollSmooth();
  header();
  promo();
  expozone();
  location(); // menu()
  // strips()

  function main() {
    speakersSlider();
    dress(); // speakersSlider()

    if (document.querySelector('.tickets')) {
      tickets();
    }

    mediaPartners(); // langSwitcher()
    // charity()

    wait();
    footer();
    galary();
  } // const loader = document.querySelector(".loader");
  // setTimeout(() => {
  //   loader.classList.add("hidden");
  //   setTimeout(() => {
  //     loader.style.display = "none";
  //   }, 500);
  // }, 2000);


  if (document.documentElement.clientWidth < 480) {
    window.addEventListener('scroll', function () {
      return setTimeout(main, 1000);
    }, {
      once: true
    });
  } else {
    main();
  } // function addRteScript() {
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

}());
//# sourceMappingURL=main.js.map
