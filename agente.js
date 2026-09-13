/* ============================================================
   agente.js
   Widget de "Agente IA" conversacional — 100% en el cliente,
   sin llamadas a ningún servidor ni API de IA real.

   Cómo "entiende" al cliente: cuando escribe un mensaje, se
   compara el texto (en minúsculas y sin tildes) contra las
   "keywords" de cada FAQ en agente-config.js, y se responde con
   la que tenga más coincidencias. Si ninguna FAQ coincide, se
   muestra un mensaje de "no entendí" con sugerencias y la opción
   de hablar por WhatsApp. Esto NO es comprensión real del
   lenguaje: es una búsqueda de palabras, así que frases muy
   distintas a las keywords configuradas no se reconocerán.

   Uso: incluir en el HTML, en este orden:
     <link rel="stylesheet" href="agente.css">
     <script src="agente-config.js"></script>
     <script src="agente.js"></script>
   ============================================================ */

(function(){
  const cfg = window.AGENTE_CONFIG;
  if(!cfg){
    console.warn("Agente IA: falta agente-config.js");
    return;
  }

  // ---------- utilidades de texto ----------
  function normalize(str){
    return (str || "")
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // quita tildes
  }

  function findBestFaq(userText){
    const text = normalize(userText);
    let best = null;
    let bestScore = 0;
    (cfg.faqs || []).forEach(faq => {
      let score = 0;
      (faq.keywords || []).forEach(kw => {
        if(text.includes(normalize(kw))) score += 1;
      });
      if(score > bestScore){
        bestScore = score;
        best = faq;
      }
    });
    return bestScore > 0 ? best : null;
  }

  function faqById(id){
    return (cfg.faqs || []).find(f => f.id === id);
  }

  function whatsappLink(text){
    const num = cfg.whatsapp || "";
    return `https://wa.me/${num}?text=${encodeURIComponent(text || "Hola")}`;
  }

  // ---------- construir el HTML del widget ----------
  const launcher = document.createElement("button");
  launcher.id = "agente-launcher";
  launcher.setAttribute("aria-label", "Abrir Agente Virtual");
  launcher.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
        stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span>Agente Virtual</span>`;

  const panel = document.createElement("div");
  panel.id = "agente-panel";
  panel.innerHTML = `
    <div id="agente-header">
      <div id="agente-avatar">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
            stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div id="agente-header-text">
        <div class="title">Asistente Virtual</div>
        <div class="subtitle"><span class="agente-dot"></span>${cfg.nombreNegocio || ""} · en línea</div>
      </div>
      <button id="agente-close" aria-label="Cerrar chat">&times;</button>
    </div>
    <div id="agente-body"></div>
    <form id="agente-form">
      <input id="agente-input" type="text" placeholder="Escribe tu pregunta..." autocomplete="off">
      <button type="submit" id="agente-send" aria-label="Enviar">➤</button>
    </form>
  `;

  document.body.appendChild(launcher);
  document.body.appendChild(panel);

  const body = panel.querySelector("#agente-body");
  const form = panel.querySelector("#agente-form");
  const input = panel.querySelector("#agente-input");

  // ---------- render helpers ----------
  function addBubble(text, from){
    const b = document.createElement("div");
    b.className = "agente-bubble" + (from === "user" ? " user" : "");
    b.textContent = text;
    body.appendChild(b);
    body.scrollTop = body.scrollHeight;
  }

  function addChips(faqIds, opts){
    opts = opts || {};
    const wrap = document.createElement("div");
    wrap.className = "agente-options";

    faqIds.forEach(id => {
      const faq = faqById(id);
      if(!faq) return;
      const btn = document.createElement("button");
      btn.className = "agente-option-btn";
      btn.textContent = faq.question;
      btn.addEventListener("click", () => handleUserMessage(faq.question, faq));
      wrap.appendChild(btn);
    });

    if(opts.showWhatsapp){
      const wa = document.createElement("button");
      wa.className = "agente-option-btn whatsapp";
      wa.textContent = "💬 Hablar con un asesor por WhatsApp";
      wa.addEventListener("click", () => {
        window.open(whatsappLink("Hola, tengo una pregunta"), "_blank", "noopener");
      });
      wrap.appendChild(wa);
    }

    body.appendChild(wrap);
    body.scrollTop = body.scrollHeight;
  }

  function renderGreeting(){
    body.innerHTML = "";
    addBubble(cfg.saludo || "¿En qué te puedo ayudar?");
    // Sin chips aquí a propósito: queremos que se sienta conversacional,
    // que el cliente escriba primero. Las sugerencias aparecen después,
    // como ayuda tras su primera respuesta (ver handleUserMessage).
  }

  function handleUserMessage(text, matchedFaq){
    if(!text || !text.trim()) return;
    addBubble(text, "user");

    const faq = matchedFaq || findBestFaq(text);

    if(faq){
      addBubble(faq.answer);
      // ofrece seguir ayudando
      addChips(cfg.sugerenciasIniciales || [], { showWhatsapp: true });
    } else {
      addBubble(cfg.fallback || "No entendí bien tu pregunta.");
      addChips(cfg.sugerenciasIniciales || [], { showWhatsapp: true });
    }
  }

  // ---------- eventos ----------
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value;
    input.value = "";
    handleUserMessage(text);
  });

  function openPanel(){
    panel.classList.add("open");
    if(body.innerHTML === ""){ renderGreeting(); }
    setTimeout(() => input.focus(), 200);
  }
  function closePanel(){ panel.classList.remove("open"); }

  launcher.addEventListener("click", () => {
    panel.classList.contains("open") ? closePanel() : openPanel();
  });
  panel.querySelector("#agente-close").addEventListener("click", closePanel);

})();
