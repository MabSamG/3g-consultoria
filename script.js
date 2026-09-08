// 3G Consultoría — interacciones básicas de la landing

// Animación de aparición al hacer scroll (fade-in / slide-up)
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => revealObserver.observe(el));

// Oculta el botón flotante de WhatsApp mientras el CTA final (que ya
// incluye su propio botón) está visible, para no duplicarlo en pantalla.
const stickyWhatsapp = document.getElementById('stickyWhatsapp');
const ctaFinal = document.getElementById('contacto');

if (stickyWhatsapp && ctaFinal) {
  const ctaObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        stickyWhatsapp.style.opacity = entry.isIntersecting ? '0' : '1';
        stickyWhatsapp.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
      });
    },
    { threshold: 0.3 }
  );

  ctaObserver.observe(ctaFinal);
}
