document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");
  const nav = document.querySelector("nav");
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksContainer = document.getElementById('nav-links');

  const observerOptions = {
    root: null,
    threshold: 0.6,
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));

        const activeLink = document.querySelector(
          `nav ul li a[href="#${entry.target.id}"]`
        );
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  sections.forEach((section) => observer.observe(section));

  if(menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('show');
    });

    menuToggle.addEventListener('keydown', (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        navLinksContainer.classList.toggle('show');
      }
    });
  }
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll < lastScrollTop - 5) {
      nav.style.top = "0";
      nav.classList.add("scrolled-up");
      nav.classList.remove("scrolled-down");
    } else if (currentScroll > lastScrollTop + 5) {
      nav.style.top = "-100px";
      nav.classList.add("scrolled-down");
      nav.classList.remove("scrolled-up");
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });
});
