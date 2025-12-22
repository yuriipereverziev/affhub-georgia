export default () => {

    function initZoneLabels() {
        const labels = document.querySelectorAll('.label')
        const places = document.querySelectorAll('.zone__place')

        window.addEventListener('scroll', setLabels)
        setLabels()

        places.forEach(place => {
            const related = [place];
            const sibling = place.nextElementSibling;

            // Если сосед — path без .zone__place, считаем его частью зоны
            if (sibling && sibling.tagName === 'path' && !sibling.classList.contains('zone__place')) {
                related.push(sibling);
            }

            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

            related.forEach(el => {
                if (isTouchDevice) {
                    el.addEventListener('click', (e) => {
                        e.stopPropagation(); // Чтобы избежать закрытия при клике на сам элемент
                        const currentLabel = [...labels].find(label => place.dataset.place === label.dataset.location);

                        const alreadyActive = place.classList.contains('active');

                        // Сначала убираем все активные классы
                        labels.forEach(label => label.classList.remove('active'));
                        places.forEach(p => p.classList.remove('active'));

                        // Потом активируем, если он еще не был активен
                        if (!alreadyActive) {
                            currentLabel?.classList.add('active');
                            place.classList.add('active');
                        }
                    });

                    // Закрытие при клике вне зоны
                    document.addEventListener('click', (e) => {
                        if (!place.contains(e.target) && !sibling?.contains(e.target)) {
                            const currentLabel = [...labels].find(label => place.dataset.place === label.dataset.location);
                            currentLabel?.classList.remove('active');
                            place.classList.remove('active');
                        }
                    });
                } else {
                    // Десктопное поведение
                    el.addEventListener('mouseenter', () => {
                        const currentLabel = [...labels].find(label => place.dataset.place === label.dataset.location);
                        currentLabel?.classList.add('active');
                        place.classList.add('active');
                    });

                    el.addEventListener('mouseleave', () => {
                        const currentLabel = [...labels].find(label => place.dataset.place === label.dataset.location);
                        currentLabel?.classList.remove('active');
                        place.classList.remove('active');
                    });
                }
            });
        });

        function setLabels() {
            labels.forEach(label => {
                const currentPlace = [...places].filter(place => {
                    return window.getComputedStyle(place.parentElement, null).display !== 'none' &&
                        place.dataset.place === label.dataset.location;
                });

                if (!currentPlace[0]) return;

                const placeRect = currentPlace[0].getBoundingClientRect();
                const tooltipWidth = label.clientWidth;
                let left = placeRect.left + (placeRect.width / 2) - (tooltipWidth / 2);

                label.classList.remove('tooltip--shift-left', 'tooltip--shift-right');

                const padding = 8;
                const shift = 40;

                if (left < padding) {
                    left = left + shift;
                    label.classList.add('tooltip--shift-right');
                } else if (left + tooltipWidth > window.innerWidth - padding) {
                    left = left - shift;
                    label.classList.add('tooltip--shift-left');
                }

                label.style.top = `${placeRect.top - 5 + placeRect.height}px`;
                label.style.left = `${left}px`;

                label.addEventListener('mouseenter', () => {
                    label.classList.add('active');
                    currentPlace[0].classList.add('active');
                });

                label.addEventListener('mouseleave', () => {
                    label.classList.remove('active');
                    currentPlace[0].classList.remove('active');
                });
            });
        }

    }
    initZoneLabels()
};
