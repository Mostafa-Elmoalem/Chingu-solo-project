window.addEventListener("DOMContentLoaded", () => {
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

  // Header nav toggle logic
  loadSection('Header.html', 'header-placeholder', () => {
    const btnNavEl = document.querySelector(".btn-mobile-nav");
    const headerEl = document.querySelector(".header");
    const chooseEls = document.querySelectorAll(".main-nav-link");

    if (btnNavEl && headerEl) {
      btnNavEl.addEventListener('click', function () {
        headerEl.classList.toggle("nav-open");
      });
    }

    if (chooseEls.length && headerEl) {
      chooseEls.forEach(link => {
        link.addEventListener('click', function () {
          headerEl.classList.remove("nav-open");
        });
      });
    }
  });

  // Load remaining sections (no need for callbacks here)
  loadSection('hero.html', 'hero-placeholder', () => {
    // Sticky nav after hero loaded
    const sectionHeroEl = document.querySelector(".section-hero");

    if (sectionHeroEl) {
      const obs = new IntersectionObserver(
        function (entries) {
          const ent = entries[0];
          if (!ent.isIntersecting) document.body.classList.add("sticky");
          else document.body.classList.remove("sticky");
        },
        {
          root: null,
          threshold: 0,
          rootMargin: "-80px",
        }
      );
      obs.observe(sectionHeroEl);
    }
  });

  loadSection('featured.html', 'featured-placeholder');
  loadSection('how.html', 'how-placeholder');
  loadSection('meals.html', 'meals-placeholder');
  loadSection('testimonials.html', 'testimonials-placeholder');
  loadSection('pricing.html', 'pricing-placeholder');
  loadSection('cta.html', 'cta-placeholder');
  loadSection('footer.html', 'footer-placeholder');

  // Smooth scroll
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a:link");
    if (!link) return;

    const href = link.getAttribute("href");
    if (href.startsWith("#")) {
      e.preventDefault();
      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const sectionEl = document.querySelector(href);
        sectionEl?.scrollIntoView({ behavior: "smooth" });
      }
    }
  });

  //  Scroll-to-top button
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.textContent = '↑';
  scrollTopBtn.classList.add('scroll-top-btn');
  scrollTopBtn.style.display = 'none';
  document.body.appendChild(scrollTopBtn);

  window.addEventListener('scroll', () => {
    scrollTopBtn.style.display = window.scrollY > 500 ? 'block' : 'none';
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
