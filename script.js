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

// Desplegable "Packs" del menú.
// El submenú es position:fixed (para no quedar recortado por el
// overflow-x:auto de .site-nav__links) así que su posición se calcula
// en JS a partir del <li> que lo contiene. Se abre con hover/foco en
// escritorio y con tap en el botón de flecha en móvil.
document.querySelectorAll('.site-nav__item--dropdown').forEach((item) => {
  const caret = item.querySelector('.site-nav__caret');
  const submenu = item.querySelector('.site-nav__submenu');
  if (!caret || !submenu) return;

  let closeTimer = null;

  const positionSubmenu = () => {
    const itemRect = item.getBoundingClientRect();
    submenu.style.top = `${itemRect.bottom + 10}px`;

    const menuWidth = submenu.offsetWidth;
    const maxLeft = window.innerWidth - menuWidth - 12;
    submenu.style.left = `${Math.max(12, Math.min(itemRect.left, maxLeft))}px`;
  };

  const openDropdown = () => {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
    positionSubmenu();
    item.classList.add('is-open');
    caret.setAttribute('aria-expanded', 'true');
  };

  // Colapsa también cualquier sub-grupo abierto (p. ej. "Colombia")
  // para que el desplegable vuelva a su estado inicial al cerrarse.
  const closeSubgroups = () => {
    item.querySelectorAll('.site-nav__subgroup.is-open').forEach((group) => {
      group.classList.remove('is-open');
      const toggle = group.querySelector('.site-nav__subgroup-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  };

  const closeDropdown = () => {
    item.classList.remove('is-open');
    caret.setAttribute('aria-expanded', 'false');
    closeSubgroups();
  };

  const scheduleClose = () => {
    closeTimer = setTimeout(closeDropdown, 150);
  };

  item.addEventListener('mouseenter', openDropdown);
  item.addEventListener('mouseleave', scheduleClose);

  item.addEventListener('focusin', openDropdown);
  item.addEventListener('focusout', (event) => {
    if (!item.contains(event.relatedTarget)) {
      closeDropdown();
    }
  });

  caret.addEventListener('click', (event) => {
    event.stopPropagation();
    if (item.classList.contains('is-open')) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });

  document.addEventListener('click', (event) => {
    if (!item.contains(event.target)) {
      closeDropdown();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeDropdown();
    }
  });

  window.addEventListener('resize', closeDropdown);
  window.addEventListener('scroll', closeDropdown, { passive: true });

  // Sub-grupo "Colombia": acordeón dentro del propio panel, sin
  // necesidad de un segundo nivel de position:fixed.
  item.querySelectorAll('.site-nav__subgroup').forEach((group) => {
    const groupToggle = group.querySelector('.site-nav__subgroup-toggle');
    if (!groupToggle) return;

    groupToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = group.classList.toggle('is-open');
      groupToggle.setAttribute('aria-expanded', String(isOpen));
    });
  });
});
