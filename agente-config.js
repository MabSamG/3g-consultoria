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
      id: "info_general",
      keywords: ["informacion", "información", "más info", "más información", "info", "ayuda", "quiero saber", "tengo una duda", "una pregunta", "dudas", "consulta", "necesito ayuda", "puedes ayudarme"],
      question: "Quiero información",
      answer: "¡Claro! ¿Sobre qué te gustaría saber más? Aquí tienes algunos temas frecuentes:",
      showOptions: true
    },
    {
      id: "horarios",
      keywords: ["horario", "horarios", "abierto", "atienden", "atención", "atencion", "hora", "cuando atienden", "dias"],
      question: "¿Cuáles son sus horarios de atención?",
      answer: "Atendemos de lunes a viernes de 9:30 a 15:00h (hora española). Fuera de ese horario, escríbenos por WhatsApp y te atenderemos lo antes posible."
    },
    {
      id: "servicios",
      keywords: ["servicio", "servicios", "que hacen", "que ofrecen", "planes", "paginas web", "tienda online", "que venden"],
      question: "¿Qué servicios ofrecen?",
      answer: "Creamos páginas web y tiendas online para emprendedores y negocios. Actualmente tenemos 3 planes: Impulso (página web profesional), Avanza (tienda local con reservas) y Elite (tienda virtual completa con pagos y envíos)."
    },
    {
      id: "plan_impulso",
      keywords: ["impulso", "plan impulso", "plan basico", "el mas barato", "pack impulso", "pack básico", "básico", "basico"],
      question: "¿Qué incluye el Plan Impulso?",
      answer: "El Plan Impulso incluye tu página web profesional, optimizada para móvil, con botón de WhatsApp, Agente IA y Google Business. Ahora en promoción por 299€ (antes 598€), con opción de financiación a 1 año."
    },
    {
      id: "plan_avanza",
      keywords: ["avanza", "plan avanza", "reservas", "tienda local", "pack avanza", "plan medio", "medio", "intermedio", "negocio local"],
      question: "¿Qué incluye el Plan Avanza?",
      answer: "El Plan Avanza añade al Plan Impulso una tienda local con opción a reservas, gestión de stock y backoffice sencilla. Ahora en promoción por 499€ (antes 998€), con opción a financiación a 1 año."
    },
    {
      id: "plan_elite",
      keywords: ["elite", "plan elite", "tienda virtual", "pagos", "pse", "nequi", "carrito de compra", "élite", "plan élite", "pack elite", "tienda completa", "superior", "completo"],
      question: "¿Qué incluye el Plan Elite?",
      answer: "El Plan Elite es tu tienda virtual completa: web profesional con carrito de compra, pasarela de pagos, CRM y cálculo de envíos. Ahora en promoción desde 799€ (antes 1.598€), con opción a financiación a 1 año."
    },
    {
      id: "pago",
      keywords: ["pago", "pagar", "precio", "cuesta", "financiacion", "cuotas", "mensualidad", "subvencion", "subvención"],
      question: "¿Cómo puedo pagar?",
      answer: "Ahora, y por tiempo limitado, ofrecemos en todos los planes financiación subvencionada a 1 año sin intereses. Además de nuestras dos formas de pago habituales: al contado o pago fraccionado: 50% al iniciar y 50% al entregar la web terminada."
    },
    {
      id: "plazos",
      keywords: ["plazo", "plazos", "tarda", "tiempo", "cuanto tarda", "entrega", "cuando esta lista", "darán", "dan", "mi web"],
      question: "¿Cuánto tarda la entrega?",
      answer: "El plazo depende del plan y del contenido que nos facilites, pero normalmente entregamos en pocos días desde que recibimos todo el material. Todo esto se aclara en la reunión de puesta en marcha y contenido al iniciar el trabajo."
    },
    {
      id: "seo",
      keywords: ["seo", "google", "posicionamiento", "aparecer en google", "buscadores"],
      question: "¿Ayudan a aparecer en Google?",
      answer: "Sí, todos los planes incluyen optimización SEO básica y configuración de tu Perfil de Google Business, para que tu negocio aparezca en Google Maps y en las búsquedas locales si así lo quieres."
    },
    {
      id: "agente",
      keywords: ["agente", "hablar con", "me atiendan", "atienda", "comunicarme"],
      question: "¿Necesitas hablar con nosotros?",
      answer: "Si necesitas atención más concreta o personalizada, puedes escribirnos al correo o al WhatsApp. Te atenderemos lo antes posible. Si lo prefieres, también puedes dejarnos aquí tu correo o teléfono y nos pondremos en contacto contigo."
    },
    {
      id: "dedicais",
      keywords: ["dedicais", "quienes sois", "quiénes sois", "quién hay", "quiés es", "quien es", "ustedes", "vosotros"],
      question: "¿Quiéres saber sobre nosotros?",
      answer: "¡Por supuesto! 3G es una empresa familiar que, como su propio nombre indica, está compuesta por tres generaciones: abuelo, madre e hijo. Cada uno especialista en un área diferente que, juntas, crean una experiencia completa para los emprendedores, empresas y negocios."
    },
    {
      id: "hola",
      keywords: ["hola", "ey", "buenos dias", "buenas tardes", "buenas noches", "ola", "qué tal", "que tal", "cómo están", "como están", "como estan"],
      question: "¡Hola!",
      answer: "¿En qué podemos ayudarte?"
    }
  ]
};
