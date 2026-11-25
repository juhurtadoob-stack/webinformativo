// Navegación adaptable
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks?.classList.toggle("open") ?? false;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Abrir menú");
  });
});

// Animaciones de entrada. Si el navegador no soporta IntersectionObserver,
// el contenido permanece visible.
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

// Año del pie de página
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Enlace oficial de acceso a StockUp
const stockUpUrl = "https://stockupp.vercel.app/";
const copyButton = document.getElementById("copyLink");
const copyMessage = document.getElementById("copyMessage");

copyButton?.addEventListener("click", async () => {
  if (!copyMessage) return;

  try {
    await navigator.clipboard.writeText(stockUpUrl);
    copyMessage.textContent = "Enlace copiado correctamente.";
  } catch {
    copyMessage.textContent = stockUpUrl;
  }

  window.setTimeout(() => {
    copyMessage.textContent = "";
  }, 3000);
});
