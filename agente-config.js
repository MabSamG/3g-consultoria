/* ============================================================
   agente-config.js
   Contenido del Agente IA de 3G. Aquí se define TODO lo que el
   asistente "sabe" responder — no hay ninguna IA real detrás,
   solo coincidencia de palabras clave contra este listado.

   Cómo añadir o editar una respuesta:
   {
     id: "identificador_unico",
     keywords: ["palabra1", "palabra2", ...],  // sin tildes, en minúsculas
     question: "Texto corto para mostrar como sugerencia (chip)",
     answer: "Lo que responde el asistente"
   }

   - "keywords" debe incluir varias formas en que un cliente podría
     escribir la misma pregunta (sinónimos, variantes, con/sin tilde).
   - Cuantas más keywords típicas incluyas, mejor "entenderá" el
     asistente, aunque nunca es comprensión real: es búsqueda de
     coincidencias de texto.
   ============================================================ */

window.AGENTE_CONFIG = {
  saludo: "¡Hola! 👋 Soy el asistente de 3G Tres Generaciones. ¿En qué te puedo ayudar?",
  nombreNegocio: "3G Tres Generaciones",
  whatsapp: "34611871937",

  // mensaje cuando no encuentra ninguna coincidencia
  fallback: "No estoy seguro de haber entendido bien eso. Puedes elegir una de estas preguntas, o hablar directamente con nosotros por WhatsApp:",

  // ids de las FAQs que se muestran como sugerencias (al inicio y en el fallback)
  sugerenciasIniciales: ["horarios", "servicios", "pago", "plazos"],

  faqs: [
    {
      id: "horarios",
      keywords: ["horario", "horarios", "abierto", "atienden", "hora", "cuando atienden", "dias"],
      question: "¿Cuáles son sus horarios?",
      answer: "Atendemos de lunes a viernes de 9:00 a 18:00h (hora española). Fuera de ese horario, escríbenos por WhatsApp y te respondemos en cuanto podamos."
    },
    {
      id: "servicios",
      keywords: ["servicio", "servicios", "que hacen", "que ofrecen", "planes", "paginas web", "tienda online", "que venden"],
      question: "¿Qué servicios ofrecen?",
      answer: "Creamos páginas web y tiendas online para negocios en Colombia. Tenemos 3 planes: Impulso (página web profesional), Avanza (tienda local con reservas) y Elite (tienda virtual completa con pagos y envíos)."
    },
    {
      id: "plan_impulso",
      keywords: ["impulso", "plan impulso", "plan basico", "el mas barato"],
      question: "¿Qué incluye el Plan Impulso?",
      answer: "El Plan Impulso incluye tu página web profesional, optimizada para móvil, con botón de WhatsApp, Agente IA y Google Business. Desde 299€ (antes 598€), con financiación a 1 año."
    },
    {
      id: "plan_avanza",
      keywords: ["avanza", "plan avanza", "reservas", "tienda local"],
      question: "¿Qué incluye el Plan Avanza?",
      answer: "El Plan Avanza añade tienda local con opción a reservas, gestión de stock y backoffice. Desde 499€ (antes 998€), con financiación a 1 año."
    },
    {
      id: "plan_elite",
      keywords: ["elite", "plan elite", "tienda virtual", "pagos", "pse", "nequi", "carrito de compra"],
      question: "¿Qué incluye el Plan Elite?",
      answer: "El Plan Elite es tu tienda virtual completa: carrito de compra, pasarela de pagos (PSE, Nequi, Daviplata), CRM y cálculo de envíos. Desde 799€ (antes 1.598€), con financiación a 1 año."
    },
    {
      id: "pago",
      keywords: ["pago", "pagar", "precio", "cuesta", "financiacion", "cuotas", "mensualidad"],
      question: "¿Cómo puedo pagar?",
      answer: "Ofrecemos pago único o financiación subvencionada a 1 año sin intereses. También hay opción de pago fraccionado: 50% al iniciar y 50% al entregar la web terminada."
    },
    {
      id: "plazos",
      keywords: ["plazo", "plazos", "tarda", "tiempo", "cuanto tarda", "entrega", "cuando esta lista"],
      question: "¿Cuánto tarda la entrega?",
      answer: "El plazo depende del plan y del contenido que nos facilites, pero normalmente entregamos en pocos días desde que recibimos todo el material."
    },
    {
      id: "seo",
      keywords: ["seo", "google", "posicionamiento", "aparecer en google", "buscadores"],
      question: "¿Ayudan a aparecer en Google?",
      answer: "Sí, todos los planes incluyen optimización SEO básica y configuración de tu Perfil de Google Business, para que tu negocio aparezca en Google Maps y en las búsquedas locales."
    }
  ]
};
