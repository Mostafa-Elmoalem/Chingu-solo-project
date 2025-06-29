function loadSection(file, elementId, callback) {
  fetch(file)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.text();
    })
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
      if (callback) callback();
    })
    .catch((error) => {
      console.error(`Could not load section ${file}:`, error);
      document.getElementById(elementId).innerHTML =
        `<p style="color:red; text-align:center;">Failed to load content.</p>`;
    });
}

loadSection('Header.html', 'header-placeholder', () => {
  const btnNavEl = document.querySelector(".btn-mobile-nav");
  const headerEl = document.querySelector(".header");

  if (btnNavEl && headerEl) {
    btnNavEl.addEventListener('click', function () {
      headerEl.classList.toggle("nav-open");
    });
  }
});

// تحميل باقي الأقسام
loadSection('hero.html', 'hero-placeholder');
loadSection('featured.html', 'featured-placeholder');
loadSection('how.html', 'how-placeholder');
loadSection('meals.html', 'meals-placeholder');
loadSection('testimonials.html', 'testimonials-placeholder');
loadSection('pricing.html', 'pricing-placeholder');
loadSection('cta.html', 'cta-placeholder');
loadSection('footer.html', 'footer-placeholder');
