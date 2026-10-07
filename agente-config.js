/* ============================================================
   agente-config.js
   Contenido del asistente virtual de 3G. Aquí se define TODO lo que el
   asistente "sabe" responder — no hay ninguna IA real detrás,
   solo coincidencia de palabras clave contra este listado.

   Cómo añadir o editar una respuesta:
   {
     id: "identificador_unico",
     keywords: ["palabra1", "palabra2", ...],  // sin tildes, en minúsculas
     question: "Texto corto para mostrar como sugerencia (chip)",
     answer: "Lo que responde el asistente",
     showWhatsapp: true,  // opcional: añade el botón de WhatsApp tras la respuesta
     peso: 5              // opcional: multiplica la puntuación (por defecto 1)
   }

   - "keywords" debe incluir varias formas en que un cliente podría
     escribir la misma pregunta (sinónimos, variantes, con/sin tilde).
   - Se buscan como palabras o frases completas ("hora" no salta con
     "ahora"), y las frases de varias palabras pesan más que las
     sueltas: así "pagar a plazos" gana a "plazos".
   - Se toleran faltas típicas (k/c/qu, z/c/s, v/b, ll/y, h, g/j/x),
     así que no hace falta escribir cada falta como keyword.
   ============================================================ */

window.AGENTE_CONFIG = {
  saludo: "¡Hola! 👋 Soy el asistente de 3G Tres Generaciones. ¿En qué te puedo ayudar?",
  nombreNegocio: "3G Tres Generaciones",
  whatsapp: "34611871937",

  // mensaje cuando no encuentra ninguna coincidencia
  fallback: "No estoy seguro de haber entendido bien eso. Puedes elegir una de estas preguntas, o hablar directamente con nosotros por WhatsApp:",

  // ids de las FAQs que se muestran como sugerencias (al inicio y en el fallback)
  sugerenciasIniciales: ["servicios", "precios_planes", "financiacion", "reunion"],

  faqs: [
    {
      id: "precios_planes",
      keywords: ["precio de los planes", "precios", "cuanto cuestan los planes", "cuanto cuesta", "cuanto vale", "cuanto cobrais", "tarifas", "presupuesto"],
      question: "Ver precios de los planes",
      answer: "Promoción limitada a los 10 primeros clientes: Plan Impulso 299€ + IVA (antes 598€), Plan Avanza 499€ + IVA (antes 998€) y Plan Elite desde 799€ + IVA (antes 1.598€). Los tres con opción de financiación subvencionada a 1 año sin intereses: 23€/mes, 42€/mes y 66€/mes + IVA."
    },
    {
      id: "info_general",
      keywords: ["informacion", "info", "ayuda", "quiero saber", "tengo una duda", "una pregunta", "dudas", "consulta", "necesito ayuda", "puedes ayudarme"],
      question: "Quiero información",
      answer: "¡Claro! ¿Sobre qué te gustaría saber más? Aquí tienes algunos temas frecuentes:",
      showOptions: true,
      isGeneric: true
    },
    {
      id: "horarios",
      keywords: ["horario", "horarios", "abierto", "abiertos", "abris", "atienden", "cuando atienden", "disponible", "disponibles", "a que hora", "ahora mismo"],
      question: "¿Cuáles son sus horarios de atención?",
      answer: "Atendemos de lunes a viernes de 9:30 a 15:00h (hora española). Fuera de ese horario, escríbenos por WhatsApp y te atenderemos lo antes posible."
    },
    {
      id: "servicios",
      keywords: ["servicio", "servicios", "que hacen", "que haceis", "que ofrecen", "que ofreceis", "planes", "paginas web", "pagina web", "diseno web", "diseno de paginas", "crear una web", "hacer una web", "necesito una web", "que venden"],
      question: "¿Qué servicios ofrecen?",
      answer: "Trabajamos en tres áreas. Tecnología: páginas web y tiendas online, con 3 planes: Impulso (página web profesional), Avanza (tienda local con reservas) y Elite (tienda virtual completa con pagos y envíos). Diseño: identidad de marca y branding. Consultoría: auditoría de negocio y sesiones estratégicas."
    },
    {
      id: "comparar",
      keywords: ["diferencia", "diferencias", "comparar", "comparativa", "cual me recomiendas", "cual me recomendais", "cual elijo", "que plan", "que pack", "cual es mejor", "cual necesito"],
      question: "¿Qué plan me conviene?",
      answer: "En resumen: Impulso (299€ + IVA) es tu página web profesional. Avanza (499€ + IVA) añade una tienda local con reservas y gestión de stock. Elite (desde 799€ + IVA) es la tienda online completa, con carrito, pagos online, CRM y cálculo de envíos. Si nos cuentas tu negocio por WhatsApp, te decimos cuál te encaja."
    },
    {
      id: "contratar",
      keywords: ["contratar", "contrato", "quiero la mia", "quiero una web", "quiero mi web", "quiero mi plan", "quiero un impulso", "quiero un avanza", "quiero crecer", "quiero una elite", "quiero un elite", "quiero mi pack", "me interesa"],
      question: "Quiero contratar",
      answer: "¡Genial! Escribe aquí abajo, en el cuadro de texto del chat, tu teléfono o tu correo y te contactamos nosotros. Si lo prefieres, también puedes escribirnos directamente por WhatsApp. Te atenderemos lo antes posible. ¡Gracias!"
    },
    {
      id: "plan_impulso",
      keywords: ["impulso", "plan impulso", "plan basico", "el mas barato", "pack impulso", "pack basico", "basico"],
      question: "¿Qué incluye el Plan Impulso?",
      answer: "El Plan Impulso incluye tu página web profesional, optimizada para móvil, con botón de WhatsApp, asistente virtual 24/7 y Google Business. En promoción para los 10 primeros clientes por 299€ + IVA (antes 598€), con opción de financiación a 1 año por 23€/mes + IVA."
    },
    {
      id: "plan_avanza",
      keywords: ["avanza", "plan avanza", "reservas", "reservas online", "tienda local", "pack avanza", "plan medio", "intermedio", "negocio local"],
      question: "¿Qué incluye el Plan Avanza?",
      answer: "El Plan Avanza añade al Plan Impulso una tienda local con opción a reservas, gestión de stock y backoffice sencilla. En promoción para los 10 primeros clientes por 499€ + IVA (antes 998€), con opción de financiación a 1 año por 42€/mes + IVA."
    },
    {
      id: "plan_elite",
      keywords: ["elite", "plan elite", "pack elite", "tienda virtual", "tienda online", "tienda en linea", "vender online", "vender por internet", "ecommerce", "comercio electronico", "cuanto vale una tienda", "cuanto cuesta una tienda", "precio de una tienda", "carrito de compra", "pasarela de pago", "tienda completa", "superior", "completo"],
      question: "¿Qué incluye el Plan Elite?",
      answer: "El Plan Elite es tu tienda virtual completa: web profesional con carrito de compra, pasarela de pagos online (Bizum, transferencia y tarjeta), CRM y cálculo de envíos. En promoción para los 10 primeros clientes desde 799€ + IVA (antes 1.598€), con opción de financiación a 1 año por 66€/mes + IVA."
    },
    {
      id: "financiacion",
      keywords: ["oferta", "promocion", "financiacion", "financiar", "a plazos", "pagar a plazos", "fraccionar", "cuotas", "mensualidad", "al mes", "subvencion"],
      question: "Opción de financiación",
      answer: "Ahora mismo, todos los planes tienen opción de financiación subvencionada a 1 año sin intereses: Impulso 23€/mes, Avanza 42€/mes y Elite 66€/mes, + IVA."
    },
    {
      // Cómo se nos paga a nosotros: no se publica, se explica en el presupuesto
      id: "pago",
      keywords: ["pago", "pagar", "pagaros", "formas de pago", "forma de pago", "como pago", "como se paga", "metodo de pago", "metodos de pago", "transferencia", "tarjeta", "al contado", "por adelantado"],
      question: "¿Cómo se paga?",
      answer: "Te lo explicamos todo al preparar tu presupuesto. Escríbenos por WhatsApp.",
      showWhatsapp: true
    },
    {
      id: "bizum",
      keywords: ["bizum"],
      question: "¿La tienda acepta Bizum?",
      answer: "Sí, la tienda online del pack Elite puede aceptar pagos con Bizum, además de tarjeta."
    },
    {
      id: "iva",
      keywords: ["iva", "impuestos", "con iva", "sin iva", "mas iva", "iva incluido", "llevan iva", "incluyen iva", "incluye iva", "precios con iva", "precios llevan iva"],
      question: "¿Los precios llevan IVA?",
      answer: "Nuestros precios no incluyen IVA (21 %). Te lo detallamos en el presupuesto."
    },
    {
      id: "plazos",
      keywords: ["plazo de entrega", "plazos de entrega", "tarda", "tardais", "cuanto tarda", "cuanto tardais", "cuanto tiempo", "entrega", "cuando esta lista", "cuando estara"],
      question: "¿Cuánto tarda la entrega?",
      answer: "El plazo depende del plan y del contenido que nos facilites, pero normalmente entregamos en pocos días desde que recibimos todo el material. Todo esto se aclara en la reunión de puesta en marcha y contenido al iniciar el trabajo."
    },
    {
      id: "cambios",
      keywords: ["cambiar los textos", "cambiar textos", "cambiar las fotos", "cambiar fotos", "cambiar imagenes", "cambiar la web", "modificar", "editar", "actualizar la web", "hacer cambios", "puedo cambiar", "gestionar productos", "subir productos", "subir los productos", "subir yo", "mis productos", "stock", "panel"],
      question: "¿Puedo cambiar yo mi web?",
      answer: "Todos los cambios de textos e imágenes de la web los hacemos nosotros, y durante el primer año están incluidos en el soporte. En los packs Avanza y Elite tú gestionas directamente tus productos y el stock desde tu propio panel."
    },
    {
      id: "segundo_ano",
      keywords: ["despues del primer ano", "segundo ano", "pasado el primer ano", "pasado el ano", "a partir del segundo ano", "mantenimiento", "renovacion", "renovar", "cuota anual", "que pasa despues", "cuanto cuesta despues", "cuanto cuesta el mantenimiento", "precio del mantenimiento"],
      question: "¿Y después del primer año?",
      answer: "Antes de empezar te explicamos qué opciones tienes a partir del segundo año. Escríbenos por WhatsApp y te lo contamos.",
      showWhatsapp: true
    },
    {
      id: "apps",
      keywords: ["app", "apps", "aplicacion", "aplicaciones", "app movil", "aplicacion movil", "android", "ios", "iphone"],
      question: "¿Hacen apps?",
      answer: "De momento no hacemos apps, pero todas nuestras webs están adaptadas al móvil y se pueden guardar en la pantalla de inicio como si fueran una app."
    },
    {
      id: "seo",
      keywords: ["seo", "google", "posicionamiento", "aparecer en google", "buscadores", "google maps"],
      question: "¿Ayudan a aparecer en Google?",
      answer: "Sí, todos los planes incluyen optimización SEO básica y configuración de tu Perfil de Google Business, para que tu negocio aparezca en Google Maps y en las búsquedas locales si así lo quieres."
    },
    {
      id: "agente",
      keywords: ["hablar con", "una persona", "hablar con un agente", "un humano", "me atiendan", "atienda", "comunicarme", "saber mas", "contacto", "contactar", "telefono", "llamar", "email", "correo"],
      question: "¿Necesitas hablar con nosotros?",
      answer: "Puedes escribirnos por WhatsApp al 611 87 19 37 o a info@3gtresgeneraciones.com. Si lo prefieres, también podemos hacer una visita presencial o una reunión privada por Zoom. Y si nos dejas aquí tu correo o teléfono, te contactamos nosotros."
    },
    {
      id: "asistente_web",
      keywords: ["agente", "asistente", "asistente virtual", "chat", "chatbot", "bot", "robot", "como este", "como esta", "esto que estoy usando", "lo que estoy usando", "este chat", "un chat asi", "un agente asi", "un asistente asi", "responda solo", "conteste solo", "atencion automatica", "respuestas automaticas"],
      question: "¿Mi web tendrá un asistente como este?",
      answer: "¡Sí! Todos nuestros packs incluyen un asistente virtual como este, adaptado a tu negocio: tus servicios, precios, horarios y preguntas frecuentes. Atiende a tus clientes 24/7 y te pasa sus datos de contacto. Ahora mismo va incluido gratis con la promoción."
    },
    {
      id: "branding",
      keywords: ["logo", "logos", "logotipo", "branding", "identidad de marca", "identidad corporativa", "marca", "mi marca", "manual de marca", "diseno grafico", "tarjetas de visita", "paleta de colores", "tipografia"],
      question: "¿Diseñan logotipos y marcas?",
      answer: "Sí. En Diseño creamos tu identidad de marca: logotipo, paleta de colores, tipografías y manual de marca, y lo aplicamos a tus tarjetas, redes sociales y todo lo que necesites. Cuéntanos tu caso por WhatsApp y te preparamos una propuesta."
    },
    {
      id: "consultoria",
      keywords: ["consultoria", "consultor", "asesoria", "asesoramiento", "asesorar", "asesorais", "asesorarme", "auditoria", "sesion estrategica", "estrategia", "mejorar mi negocio", "mejorar las ventas", "vender mas", "mas clientes", "captar clientes", "captacion de clientes", "organizacion", "plan de mejora"],
      question: "¿Qué hacen en consultoría?",
      answer: "Tenemos dos servicios de consultoría. Auditoría de negocio: revisamos tu negocio a fondo y te damos un plan de mejora concreto. Sesión estratégica: una reunión para trabajar un reto concreto, como precios, captación de clientes u organización. Escríbenos por WhatsApp y vemos cuál te encaja."
    },
    {
      id: "reunion",
      keywords: ["visita", "presencial", "en persona", "zoom", "videollamada", "reunion", "reunirnos", "quedar", "cita", "boceto", "boceto gratis", "ejemplo de mi web", "muestra"],
      question: "¿Podemos reunirnos?",
      answer: "¡Claro! Puedes elegir una visita presencial, una reunión privada por Zoom o pedirnos un boceto gratis de tu web. Escríbenos por WhatsApp al 611 87 19 37 y lo concertamos."
    },
    {
      id: "dedicais",
      keywords: ["dedicais", "quienes sois", "quien hay", "quien es", "ustedes", "vosotros", "sobre vosotros"],
      question: "¿Quieres saber sobre nosotros?",
      answer: "¡Por supuesto! 3G es una empresa familiar que, como su propio nombre indica, está compuesta por tres generaciones: abuelo, madre e hijo. Cada uno especialista en un área diferente que, juntas, crean una experiencia completa para los emprendedores, empresas y negocios."
    },
    {
      id: "ubicacion",
      keywords: ["donde estais", "donde estan", "donde os encontrais", "ubicacion", "direccion", "de donde sois", "de donde son", "elche", "alicante", "zona", "ciudad", "estais cerca"],
      question: "¿Dónde están?",
      answer: "Estamos en Elche (Alicante). Podemos vernos en persona o, si no es cerca, por Zoom."
    },
    {
      id: "dominio",
      keywords: ["dominio", "el dominio", "a nombre de quien", "a mi nombre", "es mio", "propiedad", "propietario"],
      question: "¿El dominio es mío?",
      answer: "El dominio se registra a nombre del cliente; es suyo."
    },
    {
      id: "colombia",
      keywords: ["colombia", "colombiano", "colombiana", "bogota", "medellin", "latinoamerica", "fuera de espana", "otro pais"],
      question: "¿Trabajan fuera de España?",
      answer: "Ahora mismo trabajamos con clientes de España. Escríbenos por WhatsApp y lo vemos.",
      showWhatsapp: true,
      peso: 5 // si mencionan Colombia, esta respuesta manda aunque pregunten por otra cosa
    },
    {
      id: "despedida",
      keywords: ["gracias", "muchas gracias", "adios", "hasta luego", "chao", "chau", "genial gracias", "perfecto"],
      question: "¡Gracias!",
      answer: "¡A ti! Si necesitas algo más, aquí estoy, o escríbenos por WhatsApp cuando quieras."
    },
    {
      id: "hola",
      keywords: ["hola", "ey", "buenas", "buenos dias", "buenas tardes", "buenas noches", "que tal", "como estan", "como estais"],
      question: "¡Hola!",
      answer: "¿En qué podemos ayudarte?"
    }
  ]
};
