const menuToggle = document.querySelector(".menu-toggle");
const menuPanel = document.querySelector(".menu-panel");
const menuLinks = menuPanel.querySelectorAll("a");

menuLinks.forEach((link) => {
  const linkUrl = new URL(link.href, window.location.href);
  if (linkUrl.origin === window.location.origin && linkUrl.pathname === window.location.pathname) {
    link.setAttribute("aria-current", "page");
  }
});

const closeMenu = () => {
  menuPanel.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.querySelector(".menu-toggle-label").textContent = "Menú";
};

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.querySelector(".menu-toggle-label").textContent = isOpen ? "Menú" : "Cerrar";
  menuPanel.hidden = isOpen;
  if (!isOpen) menuLinks[0].focus();
});

menuLinks.forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !menuPanel.hidden) {
    closeMenu();
    menuToggle.focus();
  }
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
