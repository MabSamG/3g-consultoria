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
  sugerenciasIniciales: ["servicios", "precios_planes", "pago"],

  faqs: [
    {
  id: "precios_planes",
  keywords: ["precio de los planes", "precios", "cuanto cuestan los planes", "tarifas", "financiacion", "cuanto cuesta"],
  question: "Ver precios de los planes",
  answer: "Nuestros planes: Plan Impulso 299€ (antes 598€), Plan Avanza 499€ (antes 998€) y Plan Elite desde 799€ (antes 1.598€). Los tres con opción de financiación subvencionada a 1 año sin intereses: 23€/mes, 42€/mes y 66€/mes."
    },
    {
      id: "info_general",
      keywords: ["informacion", "información", "info", "ayuda", "quiero saber", "tengo una duda", "una pregunta", "dudas", "consulta", "necesito ayuda", "puedes ayudarme"],
      question: "Quiero información",
      answer: "¡Claro! ¿Sobre qué te gustaría saber más? Aquí tienes algunos temas frecuentes:",
      showOptions: true,
      isGeneric: true
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
      answer: "Trabajamos en tres áreas. Tecnología: páginas web y tiendas online, con 3 planes: Impulso (página web profesional), Avanza (tienda local con reservas) y Elite (tienda virtual completa con pagos y envíos). Diseño: identidad de marca y branding. Consultoría: auditoría de negocio y sesiones estratégicas."
    },
    {
      id: "contratar",
      keywords: ["contratar", "reservar", "contrato","quiero la mia", "quiero una web", "quiero mi web", "quiero mi plan", "quiero un impulso", "quiero un avanza", "quiero crecer", "quiero una élite", "quiero una elite", "quiero un elite", "quiero mi pack"],
      question: "Quiero contratar",
      answer: "¡Genial! Escribe aquí abajo, en el cuadro de texto del chat, tu teléfono o tu correo y te contactamos nosotros. Si lo prefieres, también puedes escribirnos directamente por WhatsApp. Te atenderemos lo antes posible. ¡Gracias!"
    },
    {
      id: "plan_impulso",
      keywords: ["impulso", "plan impulso", "plan basico", "el mas barato", "pack impulso", "pack básico", "básico", "basico"],
      question: "¿Qué incluye el Plan Impulso?",
      answer: "El Plan Impulso incluye tu página web profesional, optimizada para móvil, con botón de WhatsApp, Agente IA y Google Business. Ahora en promoción por 299€ (antes 598€), con opción de financiación a 1 año por 23€/mes."
    },
    {
      id: "plan_avanza",
      keywords: ["avanza", "plan avanza", "reservas", "tienda local", "pack avanza", "plan medio", "medio", "intermedio", "negocio local"],
      question: "¿Qué incluye el Plan Avanza?",
      answer: "El Plan Avanza añade al Plan Impulso una tienda local con opción a reservas, gestión de stock y backoffice sencilla. Ahora en promoción por 499€ (antes 998€), con opción de financiación a 1 año por 42€/mes."
    },
    {
      id: "plan_elite",
      keywords: ["elite", "plan elite", "tienda virtual", "pagos", "bizum", "carrito de compra", "pack elite", "tienda completa", "superior", "completo"],
      question: "¿Qué incluye el Plan Elite?",
      answer: "El Plan Elite es tu tienda virtual completa: web profesional con carrito de compra, pasarela de pagos (Bizum, transferencia y tarjeta), CRM y cálculo de envíos. Ahora en promoción desde 799€ (antes 1.598€), con opción de financiación a 1 año por 66€/mes."
    },
    {
      id: "pago",
      keywords: ["pago", "pagar", "oferta", "promocion", "promoción", "precio", "cuesta", "financiacion", "cuotas", "mensualidad", "subvencion", "subvención"],
      question: "¿Cómo puedo pagar?",
      answer: "Ahora, y por tiempo limitado, todos los planes tienen opción de financiación subvencionada a 1 año sin intereses: Impulso 23€/mes, Avanza 42€/mes y Elite 66€/mes. También puedes pagar al contado o en dos partes: 50% al iniciar y 50% al entregar la web terminada."
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
      keywords: ["agente", "hablar con", "me atiendan", "atienda", "comunicarme", "saber más", "saber mas", "contacto", "contactar"],
      question: "¿Necesitas hablar con nosotros?",
      answer: "Puedes escribirnos por WhatsApp al 611 87 19 37 o a info@3gtresgeneraciones.com. Si lo prefieres, también podemos hacer una visita presencial o una reunión privada por Zoom. Y si nos dejas aquí tu correo o teléfono, te contactamos nosotros."
    },
    {
      id: "branding",
      keywords: ["logo", "logotipo", "branding", "identidad de marca", "identidad corporativa", "marca", "manual de marca", "diseno grafico", "tarjetas de visita", "paleta de colores", "tipografia"],
      question: "¿Diseñan logotipos y marcas?",
      answer: "Sí. En Diseño creamos tu identidad de marca: logotipo, paleta de colores, tipografías y manual de marca, y lo aplicamos a tus tarjetas, redes sociales y todo lo que necesites. Cuéntanos tu caso por WhatsApp y te preparamos una propuesta."
    },
    {
      id: "consultoria",
      keywords: ["consultoria", "consultor", "asesoria", "asesoramiento", "auditoria", "sesion estrategica", "estrategia", "mejorar mi negocio", "captar clientes", "captacion de clientes", "organizacion", "plan de mejora"],
      question: "¿Qué hacen en consultoría?",
      answer: "Tenemos dos servicios de consultoría. Auditoría de negocio: revisamos tu negocio a fondo y te damos un plan de mejora concreto. Sesión estratégica: una reunión para trabajar un reto concreto, como precios, captación de clientes u organización. Escríbenos por WhatsApp y vemos cuál te encaja."
    },
    {
      id: "reunion",
      keywords: ["visita", "presencial", "en persona", "zoom", "videollamada", "reunion", "quedar", "cita", "boceto", "ejemplo de mi web", "muestra"],
      question: "¿Podemos reunirnos?",
      answer: "¡Claro! Puedes elegir una visita presencial, una reunión privada por Zoom o pedirnos un boceto gratis de tu web. Escríbenos por WhatsApp al 611 87 19 37 y lo concertamos."
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

