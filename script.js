const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuBtn.innerHTML = navLinks.classList.contains("open")
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add("show"), index * 55);
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links > a:not(.nav-book)");

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    navItems.forEach(item => item.classList.remove("active"));

    const active = document.querySelector(
      `.nav-links a[href="#${entry.target.id}"]`
    );

    if (active) active.classList.add("active");
  });
}, {
  rootMargin: "-35% 0px -55% 0px"
});

sections.forEach(section => activeObserver.observe(section));

document.getElementById("year").textContent = new Date().getFullYear();

window.addEventListener("load", () => {
  if (window.location.hash) {
    history.replaceState(null, "", window.location.pathname);
    window.scrollTo(0, 0);
  }
});
