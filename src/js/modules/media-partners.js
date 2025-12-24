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

export default () => {
  const canvases = document.querySelectorAll('.wave-animation__canvas');
  if (!canvases.length) return;

  canvases.forEach((canvas) => {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let centerY = 0;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      width = rect.width;
      height = rect.height;
      centerY = height / 2;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      // масштабируем контекст, чтобы координаты были в CSS пикселях
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener('resize', resize);

    function animate() {
      ctx.clearRect(0, 0, width, height);
      const time = Date.now() * 0.00033;
      const centerX = width / 2;

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(211, 159, 255, ${0.6 - i * 0.1})`;
        ctx.lineWidth = 4;

        const baseOffset = (i - 2) * 35;

        for (let x = 0; x <= width; x += 1) {
          const distFromCenter = Math.abs(x - centerX);
          const centerEffect = Math.exp(-distFromCenter / 120);

          let y = centerY + baseOffset;

          y += Math.sin(x * 0.015 + time + i * 0.5) * 25;
          y += Math.sin(x * 0.08 + time * 3 + i * 1.3) * 60 * centerEffect;
          y += Math.sin(x * 0.12 - time * 4 + i * 2.1) * 50 * centerEffect;
          y += Math.sin(x * 0.15 + time * 2.5 + i * 1.7) * 40 * centerEffect;
          y += Math.sin(x * 0.10 - time * 3.5 + i * 0.9) * 55 * centerEffect;
          y += Math.sin(x * 0.18 + time * 4.2 + i * 2.4) * 35 * centerEffect;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.stroke();
      }

      requestAnimationFrame(animate);
    }

    animate();
  });
};

