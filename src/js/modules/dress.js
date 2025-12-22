export default () => {
  const dressSection = document.querySelector(".dress");
  if (!dressSection) return; // 🔥 Защита

  const observerDressSection = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observerDressSection.unobserve(entry.target);
      }
      // else {
      //   entry.target.classList.remove("active");
      // }
    });
  }, {
    threshold: 0.75
  });

  observerDressSection.observe(dressSection);
};
