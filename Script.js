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
  const chooseEl = document.querySelectorAll(".main-nav-link")

  if (btnNavEl && headerEl) {
    btnNavEl.addEventListener('click', function () {
      headerEl.classList.toggle("nav-open");
    });
  }
  if(chooseEl && headerEl){
    chooseEl.forEach(link=> {
      link.addEventListener('click',function(){
      headerEl.classList.toggle("nav-open")})
    })
  }
})


// smoth scrool for safary
const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
})});



// for html files sections
loadSection('hero.html', 'hero-placeholder');
loadSection('featured.html', 'featured-placeholder');
loadSection('how.html', 'how-placeholder');
loadSection('meals.html', 'meals-placeholder');
loadSection('testimonials.html', 'testimonials-placeholder');
loadSection('pricing.html', 'pricing-placeholder');
loadSection('cta.html', 'cta-placeholder');
loadSection('footer.html', 'footer-placeholder');
