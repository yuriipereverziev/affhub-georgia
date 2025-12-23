export default () => {
  const locale = document.documentElement.lang;
  const isUALang = locale === 'ua';

  const textJSDictionary = new Map([
    [' Ticket Purchase Policy, ', ' translate1, '],
    ['Privacy Policy', 'translate2'],
    [' Privacy Policy ', ' translate3 '],
    ['Position', 'translate4'],
    ['Marketing vertical', 'translate5'],
    ['Select', 'translate6'],
    ['Order', 'translate7'],
    ['You must fill in all required fields and agree to the terms of the public offer, user agreement and privacy policy.', 'translate8'],
    ['Promo code does not exist', 'translate9'],
  ]);

  var cardList = [
    {
      name: "pre-order",
      dates: {
        start: new Date().toISOString().split("T")[0],
        end: "2025-12-24",
      },
      prices: {
        silver: 100,
        gold: 150,
      }
    },
    {
      name: "order",
      dates: {
        start: "2025-12-22",
        end: "2025-12-31",
      },
      prices: {
        silver: 110,
        gold: 160,
      }
    },
    {
      name: "last",
      dates: {
        start: "2025-12-22",
        end: "2025-12-31",
      },
      prices: {
        silver: 120,
        gold: 170,
      }
    },
  ];

// Кнопки волн
  const firstWave = document.querySelector(".tickets__first-wave");
  const secondWave = document.querySelector(".tickets__second-wave");
  const lastWave = document.querySelector(".tickets__last-wave");

// Перевірка чи доступна волна
  function isWaveAvailable(phase) {
    const currentDate = new Date().toISOString().split("T")[0];
    const wave = cardList.find(el => el.name === phase);

    if (!wave) return false;

    return currentDate >= wave.dates.start && currentDate <= wave.dates.end;
  }

// Функція встановлення активної волни
  function setActiveWave(phase) {
    // Скидання класів
    [firstWave, secondWave, lastWave].forEach(wave => wave?.classList.remove("active"));

    // Встановлення активної волни
    if (phase === "pre-order") {
      firstWave?.classList.add("active");
    } else if (phase === "order") {
      secondWave?.classList.add("active");
    } else if (phase === "last") {
      lastWave?.classList.add("active");
    }

    // Оновлення цін
    setTicketsPrices(phase);

    // Оновлення кнопок покупки
    document.querySelectorAll(".tickets__btn").forEach(btn => {
      btn.setAttribute("data-name", phase);
      btn.disabled = !isWaveAvailable(phase);
    });
  }

// Встановлення поточної фази по даті
  function checkDate() {
    const currentDate = new Date().toISOString().split("T")[0];
    let currentPhase = null;

    // Перевірка чи поточна дата входить в якусь з хвиль
    cardList.forEach(el => {
      if (currentDate >= el.dates.start && currentDate <= el.dates.end) {
        currentPhase = el.name;
      }
    });

    // Якщо не знайдено активної хвилі, встановлюємо першу за замовчуванням
    if (!currentPhase) {
      currentPhase = cardList[0].name;
    }

    setActiveWave(currentPhase);
  }

// Оновлення цін для конкретної фази
  function setTicketsPrices(phase) {
    const silverPrice = document.querySelector(".tickets__inner--silver .price__value");
    const goldPrice = document.querySelector(".tickets__inner--gold .price__value");

    const {prices} = cardList.find(p => p.name === phase) || {};

    if (!prices) return;

    silverPrice.textContent = prices.silver;
    goldPrice.textContent = prices.gold;
  }

// Ініціалізація кліків на волни
  [firstWave, secondWave, lastWave].forEach((wave, index) => {
    wave?.addEventListener("click", () => {
      const phase = cardList[index]?.name;
      if (!phase) return;
      setActiveWave(phase);
    });
  });

// Ініціалізація при завантаженні сторінки
  checkDate();

  // function setTicketsPrices(phase = 'pre-order') {
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
  const style = document.createElement('style');
  style.setAttribute("id", "multiselect_dropdown_styles");
  style.innerHTML = `
      .multiselect-dropdown{
        display: inline-block;
        padding: 2px 5px 0px 5px;
        border-radius: 4px;
        border: solid 1px #ced4da;
        background-color: white;
        position: relative;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right .75rem center;
        background-size: 16px 12px;
      }
      .multiselect-dropdown span.optext, .multiselect-dropdown span.placeholder{
        margin-left:0.5em;
        padding:1px 0;
        border-radius: 4px;
        display:inline-block;
      }
      .multiselect-dropdown span.optext{
        background-color:lightgray;
        padding:1px 0.75em;
      }
      .multiselect-dropdown span.optext .optdel {
        float: right;
        margin: 0 -6px 1px 5px;
        font-size: 0.7em;
        margin-top: 2px;
        cursor: pointer;
        color: #666;
      }
      .multiselect-dropdown span.optext .optdel:hover { color: #c66;}
      .multiselect-dropdown span.placeholder{
        color:#ced4da;
      }
      .multiselect-dropdown-list-wrapper{
        box-shadow: gray 0 3px 8px;
        z-index: 100;
        padding:2px;
        border-radius: 4px;
        border: solid 1px #ced4da;
        display: none;
        margin: -1px;
        position: absolute;
        top:0;
        left: 0;
        right: 0;
        background: white;
      }
      .multiselect-dropdown-list-wrapper .multiselect-dropdown-search{
        margin-bottom:5px;
      }
      .multiselect-dropdown-list{
        padding:2px;
        height: 15rem;
        overflow-y:auto;
        overflow-x: hidden;
      }
      .multiselect-dropdown-list::-webkit-scrollbar {
        width: 6px;
      }
      .multiselect-dropdown-list::-webkit-scrollbar-thumb {
        background-color: #bec4ca;
        border-radius:3px;
      }

      .multiselect-dropdown-list div{
        padding: 5px;
      }
      .multiselect-dropdown-list input{
        height: 1.15em !important;
        width: 1.15em !important;
        margin-right: 0.35em !important;
      }
      .multiselect-dropdown-list div.checked{
      }
      .multiselect-dropdown-list div:hover{
        background-color: #ced4da;
      }
      .multiselect-dropdown span.maxselected {width:100%;}
      .multiselect-dropdown-all-selector {border-bottom:solid 1px #999;}
      `;
  document.head.appendChild(style);

  // функцию создания селекта из радио/чекбоксов
  function createSelectFromInputs(formGroup) {
    const inputs = Array.from(formGroup.querySelectorAll('input[type="radio"], input[type="checkbox"]'));
    if (inputs.length === 0) return null;

    const isMultiple = inputs[0].type === 'checkbox';
    const select = document.createElement('select');
    select.name = inputs[0].name + '_select';
    if (isMultiple) select.multiple = true;

    inputs.forEach(input => input.checked = false);

    const label = document.createElement('label');
    label.classList.add('rte-form-label', 'required');

    let text1 = "Position"
    let text2 = "Marketing vertical"
    let text3 = "Select"

    if (isUALang) {
      text1 = textJSDictionary.get(text1)
      text2 = textJSDictionary.get(text2)
      text3 = textJSDictionary.get(text3)
    }

    label.textContent = inputs[0].name.includes("position") ? text1 :
      inputs[0].name.includes("vertical") ? text2 :
        text3;

    inputs.forEach(input => {
      const labelEl = formGroup.querySelector(`label[for="${input.id}"]`);
      const optionEl = document.createElement('option');
      optionEl.value = input.value;
      optionEl.textContent = labelEl ? labelEl.textContent.trim() : input.value;
      select.appendChild(optionEl);
    });

    inputs.forEach(i => i.style.display = 'none');
    formGroup.querySelectorAll('label').forEach(l => l.style.display = 'none');

    formGroup.appendChild(label);
    formGroup.appendChild(select);

    select.addEventListener('change', () => {
      const selectedValues = Array.from(select.selectedOptions).map(o => o.value);
      inputs.forEach(input => {
        input.checked = selectedValues.includes(input.value);
        input.dispatchEvent(new Event('change'));
      });
      // console.log(selectedValues);
    });

    return select;
  }

  function MultiselectDropdown(options = {}, container = document) {
    const config = {
      style: {width: "100%"},
      search: true,
      height: '15rem',
      placeholder: '',
      txtSelected: 'selected',
      txtAll: 'All',
      txtRemove: 'Remove',
      txtSearch: 'search',
      ...options
    };

    function newEl(tag, attrs) {
      const e = document.createElement(tag);
      if (!attrs) return e;
      Object.entries(attrs).forEach(([k, v]) => {
        if (k === 'class') {
          if (Array.isArray(v)) v.forEach(c => c && e.classList.add(c));
          else if (v) e.classList.add(v);
        } else if (k === 'style' && typeof v === 'object') {
          Object.entries(v).forEach(([ks, vs]) => e.style[ks] = vs);
        } else if (k === 'text') {
          e.innerText = v === '' ? '\u00A0' : v;
        } else {
          e[k] = v;
        }
      });
      return e;
    }

    container.querySelectorAll("select:not(.telephone_code)").forEach((el, idx) => {
      if (el.dataset.multiselectInitialized) return;
      el.dataset.multiselectInitialized = 'true';

      const isMultiple = el.multiple;

      const div = newEl('div', {
        class: 'multiselect-dropdown',
        style: {width: config.style?.width ?? el.clientWidth + 'px', padding: config.style?.padding ?? ''}
      });
      el.style.display = 'none';
      el.parentNode.insertBefore(div, el.nextSibling);

      const listWrap = newEl('div', {class: 'multiselect-dropdown-list-wrapper'});
      const list = newEl('div', {class: 'multiselect-dropdown-list', style: {height: config.height}});
      const search = newEl('input', {
        class: ['multiselect-dropdown-search', config.searchInput?.class ?? 'form-control'],
        style: {
          width: '100%',
          display: el.attributes['multiselect-search']?.value === 'true' ? 'block' : 'none'
        },
        placeholder: config.txtSearch
      });

      listWrap.appendChild(search);
      div.appendChild(listWrap);
      listWrap.appendChild(list);

      // Загрузка опций
      el.loadOptions = () => {
        list.innerHTML = '';

        if (el.attributes['multiselect-select-all']?.value == 'true' && isMultiple) {
          const allSelector = newEl('div', {class: 'multiselect-dropdown-all-selector'});
          const allCheckbox = newEl('input', {type: 'checkbox'});
          allSelector.appendChild(allCheckbox);
          allSelector.appendChild(newEl('label', {text: config.txtAll}));

          allSelector.addEventListener('click', () => {
            allSelector.classList.toggle('checked');
            allCheckbox.checked = !allCheckbox.checked;
            const check = allCheckbox.checked;

            list.querySelectorAll(":scope > div:not(.multiselect-dropdown-all-selector)").forEach(divOpt => {
              if (divOpt.style.display !== 'none') {
                divOpt.querySelector("input").checked = check;
                divOpt.optEl.selected = check;
              }
            });

            el.dispatchEvent(new Event('change'));
          });

          allCheckbox.addEventListener('click', e => e.stopPropagation());

          el.addEventListener('change', () => {
            const optionsVisible = Array.from(list.querySelectorAll(":scope > div:not(.multiselect-dropdown-all-selector)"))
              .filter(d => d.style.display !== 'none');
            const existsNotSelected = optionsVisible.find(d => !d.querySelector('input').checked);
            allCheckbox.checked = !existsNotSelected;
          });

          list.appendChild(allSelector);
        }

        Array.from(el.options).forEach(o => {
          const optionWrapper = newEl('div', {class: o.selected ? 'checked' : '', optEl: o});
          const inputType = isMultiple ? 'checkbox' : 'radio';
          const optionInput = newEl('span', {
            class: 'fake-checkbox',
            type: inputType,
            name: 'multiselect-' + idx,
            checked: o.selected
          });

          optionWrapper.appendChild(optionInput);
          optionWrapper.appendChild(newEl('label', {text: o.text}));

          optionWrapper.addEventListener('click', (e) => {
            if (isMultiple) {
              optionWrapper.classList.toggle('checked');
              optionInput.checked = !optionInput.checked;
              o.selected = !o.selected;
            } else {
              Array.from(el.options).forEach(opt => opt.selected = false);
              Array.from(list.children).forEach(child => child.classList.remove('checked'));
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

          optionInput.addEventListener('click', e => e.stopPropagation());

          o.listitemEl = optionWrapper;
          list.appendChild(optionWrapper);
        });

        div.listEl = listWrap;

        if (!isMultiple) {
          div.classList.add('single-select');

          el.selectedIndex = -1;
          Array.from(el.options).forEach(opt => opt.selected = false);

          list.querySelectorAll('div.checked').forEach(checkedDiv => {
            checkedDiv.classList.remove('checked');
            const input = checkedDiv.querySelector('input[type="radio"]');
            if (input) input.checked = false;
          });
        }

        div.refresh = () => {
          div.querySelectorAll('span.optext, span.placeholder').forEach(el => div.removeChild(el));
          const selectedOptions = Array.from(el.selectedOptions);

          if (isMultiple) {
            if (selectedOptions.length > (el.attributes['multiselect-max-items']?.value ?? 5)) {
              div.appendChild(newEl('span', {
                class: ['optext', 'maxselected'],
                text: selectedOptions.length + ' ' + config.txtSelected
              }));
            } else {
              selectedOptions.forEach(sel => {
                const span = newEl('span', {class: 'optext', text: sel.text, srcOption: sel});
                if (el.attributes['multiselect-hide-x']?.value !== 'true') {
                  span.appendChild(newEl('span', {
                    class: 'optdel',
                    text: '✖',
                    title: config.txtRemove,
                    onclick: ev => {
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
              div.appendChild(newEl('span', {
                class: 'placeholder',
                text: el.attributes['placeholder']?.value ?? config.placeholder
              }));
            }
          } else {
            if (div.classList.contains('single-select')) {
              if (selectedOptions.length > 0 && selectedOptions[0].selected) {
                const span = newEl('span', {
                  class: 'optext',
                  text: selectedOptions[0].text,
                  srcOption: selectedOptions[0]
                });

                if (el.attributes['multiselect-hide-x']?.value !== 'true') {
                  const delBtn = newEl('span', {
                    class: 'optdel',
                    text: '✖',
                    title: config.txtRemove,
                    onclick: ev => {
                      ev.stopPropagation();

                      // Сброс выбора
                      el.selectedIndex = -1;
                      Array.from(el.options).forEach(opt => opt.selected = false);
                      Array.from(div.listEl.querySelectorAll('.checked')).forEach(el => el.classList.remove('checked'));
                      Array.from(div.listEl.querySelectorAll('input[type="radio"]')).forEach(input => input.checked = false);

                      el.dispatchEvent(new Event('change'));
                      div.refresh();
                    }
                  });
                  span.appendChild(delBtn);
                }

                div.appendChild(span);
              } else {
                div.appendChild(newEl('span', {
                  class: 'placeholder',
                  text: el.attributes['placeholder']?.value ?? config.placeholder
                }));
              }
            } else {
              if (selectedOptions.length > 0) {
                const span = newEl('span', {
                  class: 'optext',
                  text: selectedOptions[0].text,
                  srcOption: selectedOptions[0]
                });
                if (el.attributes['multiselect-hide-x']?.value !== 'true') {
                  span.appendChild(newEl('span', {
                    class: 'optdel',
                    text: '✖',
                    title: config.txtRemove,
                    onclick: ev => {
                      span.srcOption.listitemEl.dispatchEvent(new Event('click'));
                      div.refresh();
                      ev.stopPropagation();
                    }
                  }));
                }
                div.appendChild(span);
              } else {
                div.appendChild(newEl('span', {
                  class: 'placeholder',
                  text: el.attributes['placeholder']?.value ?? config.placeholder
                }));
              }
            }
          }
        };
        div.refresh();
      };

      el.loadOptions();

      search.addEventListener('input', () => {
        list.querySelectorAll(":scope div:not(.multiselect-dropdown-all-selector)").forEach(d => {
          const txt = d.querySelector("label").innerText.toUpperCase();
          d.style.display = txt.includes(search.value.toUpperCase()) ? 'block' : 'none';
        });
      });

      div.addEventListener('click', () => {
        listWrap.style.display = 'block';
        search.focus();
        search.select();
      });

      document.addEventListener('click', e => {
        if (!div.contains(e.target)) {
          listWrap.style.display = 'none';
          div.refresh();
        }
      });
    });
  }

  const popup = document.querySelector(".tickets-popup");
  const ticketsBg = document.querySelector(".tickets-bg");
  const popupBack = document.querySelector(".tickets-popup__back");
  const popupCloseBtn = document.querySelector(".tickets-popup__close");
  const RTEform = document.querySelector(".rte-input-form");
  const RTEdetails = document.querySelector(".rte-order-details");

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

  const ticketBtns = document.querySelectorAll(".tickets__btn");
  ticketBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      openPopup();

      const ticketCountSilver = document.querySelector(".rte-tbody .rte-tr:first-child .rte-number-input");
      const ticketCountSilverIncrease = document.querySelector(".rte-tbody .rte-tr:first-child .rte-increase-button");
      // const ticketCountGold = document.querySelector(".rte-tbody .rte-tr:nth-child(2) .rte-number-input");
      // const ticketCountGoldIncrease = document.querySelector(".rte-tbody .rte-tr:nth-child(2) .rte-increase-button");
      // const ticketCountVip = document.querySelector(".rte-tbody .rte-tr:nth-child(3) .rte-number-input");
      // const ticketCountVipIncrease = document.querySelector(".rte-tbody .rte-tr:nth-child(3) .rte-increase-button");

      if (btn.classList.contains("tickets__btn") && ticketCountSilver.value == '0') {
        ticketCountSilverIncrease.click()
      }
      // else if (btn.classList.contains("tickets__btn--gold") && ticketCountGold.value == '0') {
      //     ticketCountGoldIncrease.click()
      // } else if (btn.classList.contains("tickets__btn--vip") && ticketCountVip.value == '0') {
      //     ticketCountVipIncrease.click()
      // }
    })
  });

  popupCloseBtn.addEventListener("click", function () {
    closePopup()
  })

  const nextBtn = document.querySelector(".rte-table-footer button");
  let termsCheckboxes = '';

  if (nextBtn) {
    setTimeout(() => {
      nextBtn.textContent = isUALang ? textJSDictionary.get("Order") : "Order";
      nextBtn.id = "order-btn-step1";
    }, 200);
  }

  nextBtn?.addEventListener("click", function () {
    const inputs = document.querySelectorAll(".rte-number-input");
    const countValidate = Array.from(inputs).some((elem) => elem.value !== "0");

    if (countValidate) {
      setTimeout(() => {
        document.querySelector(".tickets-popup__step").textContent = '2';
        popupBack.classList.add("active");
        RTEform.style.display = "none";
        RTEdetails.style.display = "block";
        const nextOrderBtn = document.querySelector(".rte-add-button");
        nextOrderBtn.textContent = isUALang ? textJSDictionary.get("Order") : "Order";
        nextOrderBtn.id = "order-btn-step2";

        const orderDetailsElements = document.querySelectorAll(".rte-order-details__element");
        orderDetailsElements.forEach(element => {

          const formGroup = element.querySelector(".rte-form-group");
          if (!formGroup) return;


          const dropdownContainer = document.createElement("div");
          const targetInputGroup = element.querySelector(".rte-form-group:nth-last-child(2)");
          targetInputGroup.append(dropdownContainer);
          dropdownContainer.style.width = "100%";

          const event = new Event('input', {
            bubbles: true,
            cancelable: true
          });
        });

        function setupDynamicSelects() {
          const detailElements = document.querySelectorAll(".rte-order-details__element");

          detailElements.forEach(element => {
            const formGroups = element.querySelectorAll(".rte-form-group");

            formGroups.forEach(group => {
              if (!group.querySelector('select')) {
                createSelectFromInputs(group);
              }
            });

            MultiselectDropdown({}, element);
          });

          document.querySelectorAll('select[multiple]').forEach(select => {
            MultiselectDropdown({});
          });
        }

        setupDynamicSelects()

        termsCheckboxes = document.querySelectorAll(".rte-order-agreement-element input");
        termsCheckboxes.forEach(checkbox => {
          checkbox.required = true;
          checkbox.addEventListener("change", function () {
            if (this.checked) {
              this.parentElement.classList.add("active");
            } else {
              this.parentElement.classList.remove("active");
            }

            const termsValid = [...termsCheckboxes].every(input => {
              return (input.checked === true);
            });

            if (termsValid) {
              nextOrderBtn.disabled = false;
              nextOrderBtn.style.opacity = 1;
            } else {
              nextOrderBtn.disabled = true;
              nextOrderBtn.style.opacity = 0.5;
            }
          })
        });

        nextOrderBtn.addEventListener("click", function () {
          const termsValid = [...termsCheckboxes].every(input => {
            return (input.checked === true);
          });

          if (!termsValid) {
            errorOverlay.classList.add("active");
            const errorText = isUALang
              ? textJSDictionary.get("You must fill in all required fields and agree to the terms of the public offer, user agreement and privacy policy.")
              : "You must fill in all required fields and agree to the terms of the public offer, user agreement and privacy policy.";
            showErrorPopup(errorText)
          }
        })
      }, 200);
    }
  })

  popupBack.addEventListener("click", function () {
    this.classList.remove("active");
    RTEform.style.display = "block";
    RTEdetails.style.display = "none";
    document.querySelector(".tickets-popup__step").textContent = '1';
  })

  const errorOverlay = document.querySelector(".error-overlay");
  const errorPopup = document.querySelector(".error-popup");
  const errorBtn = document.querySelector(".error-popup__btn");

  window.alert = function () {
    // Просто игнорируем вызов alert
  };

  function showErrorPopup(errorMessage) {
    errorPopup.querySelector(".error-popup__text").textContent = errorMessage;
    errorPopup.classList.add("active");
  }

  const originalFetch = window.fetch;
  window.fetch = function (...args) {
    return originalFetch(...args)
      .then(response => {
        if (response.status === 422) {
          console.log('Ошибка: статус 422 (Unprocessable Entity)');
          errorOverlay.classList.add("active");
          const errorText = isUALang
            ? textJSDictionary.get("Promo code does not exist")
            : "Promo code does not exist";
          showErrorPopup(errorText);
        }
        return response;
      });
  };

  errorBtn.addEventListener("click", function () {
    errorOverlay.classList.remove("active");
    errorPopup.classList.remove("active");
  })

  errorOverlay.addEventListener("click", function () {
    errorOverlay.classList.remove("active");
    errorPopup.classList.remove("active");
  })


  function changePopupLang() {
    const locale = document.documentElement.lang;

    if (locale !== "ua") return

    const firstStepOrderButton = document.querySelector('#order-btn-step1')

    const firstStepElements = {
      labelText: ".rte-table-text",
      type: ".rte-thead .rte-tr .rte-th:nth-child(1)",
      quantity: ".rte-thead .rte-tr .rte-th:nth-child(2)",
      price: ".rte-thead .rte-tr .rte-th:nth-child(3)",
      sum: ".rte-thead .rte-tr .rte-th:nth-child(4)",
      footer: ".rte-table-footer-text",
      orderBrn: "#order-btn-step1",
    }

    const agreementElements = {
      first: ".rte-order-agreement-element:nth-child(1)",
      second: ".rte-order-agreement-element:nth-child(2)",
    }

    const formElements = {
      labels: ".rte-form-label",
    }

    const firstStepTranslation = new Map([
      ["Select the number of tickets you wish to purchase", "translate"],
      ["Type", "translate"],
      ["Quantity", "translate"],
      ["Price", "translate"],
      ["Sum", "translate"],
      ["If the event provides additional discounts or promo codes, they can be applied in the next step", "translate"],
      ["Order", "translate"],
    ]);

    const agreementTranslation = new Map([
      ["Do you accept terms and conditions of", "translate"],
      ["and agree to the processing of personal data", "translate"],
    ]);

    const formTranslation = new Map([
      ["First name", "translate"],
      ["Telephone number", "translate"],
      ["Email", "translate"],
      ["Company", "translate"],
      ["Telegram", "translate"],
      ["Position", "translate"],
      ["Marketing vertical", "translate"],
      ["Promocode", "translate"],
    ]);

    injectTranslation(firstStepElements, firstStepTranslation)

    function injectTranslation(nodes, dictionary) {
      for (const [, value] of Object.entries(nodes)) {
        const currElement = document.querySelector(value);
        const currElementText = currElement.textContent

        dictionary.forEach((uaTranslation, original) => {
          if (original.trim() !== currElementText.trim()) return;
          currElement.textContent = uaTranslation;
        })
      }
    }

    function injectAgreementTranslation() {
      const agreementFirst = document.querySelector(agreementElements.first);
      const agreementSecond = document.querySelector(agreementElements.second);

      agreementTranslation.forEach((uaTranslation, original) => {
        agreementFirst.innerHTML = agreementFirst.innerHTML.replace(original, uaTranslation)
        agreementSecond.innerHTML = agreementSecond.innerHTML.replace(original, uaTranslation)
      })
    }

    function injectFormTranslation() {
      const labels = document.querySelectorAll(formElements.labels);

      labels.forEach(label => {
        const currElementText = label.textContent

        formTranslation.forEach((uaTranslation, original) => {
          if (original.trim() !== currElementText.trim()) return;
          label.textContent = uaTranslation;
        })
      })
    }

    firstStepOrderButton.addEventListener('click', function () {
      injectAgreementTranslation()
      injectFormTranslation()
    })
  }

  const ticketsContainer = document.querySelector(".tickets__content");

  if (!ticketsContainer) return;

  ticketsContainer.addEventListener('click', function (event) {
    const isBuyButton = event.target.classList.contains('tickets__btn');
    if (!isBuyButton) return
    changePopupLang()
  })

}

