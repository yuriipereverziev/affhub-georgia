export default () => {
    function generateStripes(container) {
        if (container.dataset.generated) return;

        const numberOfStripes = parseInt(container.dataset.stripes) || 7;
        const colors = ['#AC00E6', '#F207FD', '#1963E7'];
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < numberOfStripes; i++) {
            const stripe = document.createElement('span');

            const width = Math.floor(Math.random() * (77 - 38 + 1)) + 38;
            const height = Math.floor(Math.random() * (8 - 4 + 1)) + 4;
            const color = colors[Math.floor(Math.random() * colors.length)];

            // Положение по вертикали:
            const sectorSize = 100 / numberOfStripes;
            const sectorStart = i * sectorSize;
            const sectorEnd = sectorStart + sectorSize;
            const top = Math.random() * (sectorEnd - sectorStart) + sectorStart;

            // Положение по горизонтали:
            const left = i % 2 === 0
                ? 5 + Math.random() * 25 // нечетные - слева
                : 70 + Math.random() * 25; // четные - справа

            stripe.style.width = width + 'px';
            stripe.style.height = height + 'px';
            stripe.style.background = color;
            stripe.style.top = top + '%';
            stripe.style.left = left + '%';

            fragment.prepend(stripe);
        }
        container.prepend(fragment);
        container.dataset.generated = "true";
    }

    function clearStripesFor(container) {
        container.innerHTML = '';
        delete container.dataset.generated;
    }

    // IntersectionObserver вызывает generateStripes, когда контейнер попадает в поле зрения
    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting && window.innerWidth >= 768) {
                generateStripes(entry.target);
            }
        }
    }, { rootMargin: "0px 0px 200px 0px" });

    document.querySelectorAll('.strips__container').forEach(el => {
        if (window.innerWidth >= 768) {
            observer.observe(el);
        }
    });

    window.addEventListener('resize', () => {
        document.querySelectorAll('.strips__container').forEach(el => {
            if (window.innerWidth < 768 && el.dataset.generated) {
                clearStripesFor(el);
            }
        });
    });
};