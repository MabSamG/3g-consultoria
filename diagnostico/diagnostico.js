/* =========================================================
   3G Tres Generaciones — Diagnóstico gratis
   ========================================================= */

/* ---------- Valores del cálculo (editables) ----------
   Cada respuesta usa un valor prudente dentro de su tramo. */
const MENSAJES_DIA = { '0-5': 3, '6-15': 10, '15+': 20 };
const PCT_FUERA_HORARIO = { pocos: 0.20, mitad: 0.50, muchos: 0.70 };
const GASTO_MEDIO = { '-20': 15, '20-50': 35, '50+': 60 };
const MINUTOS_POR_MENSAJE = 3;
const DIAS_MES = 30;
const TASA_RECUPERACION = 0.10; // 1 de cada 10, contesten Sí o No a reservar sin hablar contigo
const MINIMO_EUROS = 50;        // por debajo, en vez de clientes y dinero se muestra una frase

/* ---------- Textos según el sector ---------- */
const PALABRA_SECTOR = { servicios: 'cita', comercio: 'venta', otros: 'cliente' };
const BOCETO_SECTOR = { servicios: 'web', comercio: 'tienda online', otros: 'web' };

/* ---------- Otros ajustes ---------- */
const WHATSAPP_3G = '34611871937';
const TIEMPO_MAX_GUARDADO = 8000; // ms
// Cambiar si se modifica el texto de la casilla de consentimiento
const CONSENTIMIENTO_VERSION = '2026-10-06';

(function () {
  'use strict';

  const PREGUNTAS = ['negocio', 'sector', 'web', 'mensajes', 'fuera', 'reserva', 'gasto'];
  const ANTERIOR = { resultado: 'gasto', boceto: 'resultado' };

  const respuestas = { negocio: '', sector: null, web: null, mensajes: null, fuera: null, reserva: null, gasto: null };
  let resultado = null;
  let ultimoGuardado = '';
  let enviando = false;

  const $ = (id) => document.getElementById(id);
  const pantallas = document.querySelectorAll('[data-pantalla]');
  let pantallaActual = 'inicio';

  /* ---------- Cálculo ---------- */

  // Redondea hacia abajo a múltiplo de `paso` (el épsilon evita errores tipo 59,9999)
  function redondearAbajo(valor, paso) {
    return Math.floor(valor / paso + 1e-9) * paso;
  }

  function calcular(r) {
    const mensajes = MENSAJES_DIA[r.mensajes];
    const pctFuera = PCT_FUERA_HORARIO[r.fuera];
    const gasto = GASTO_MEDIO[r.gasto];

    const horas = redondearAbajo(mensajes * MINUTOS_POR_MENSAJE * DIAS_MES / 60, 1);
    const consultas = redondearAbajo(mensajes * pctFuera * DIAS_MES, 5);
    const clientes = redondearAbajo(consultas * TASA_RECUPERACION, 1);
    const dinero = redondearAbajo(clientes * gasto, 10);
    const mostrarDinero = dinero >= MINIMO_EUROS;

    return { mensajes, pctFuera, gasto, horas, consultas, clientes, dinero, mostrarDinero };
  }

  /* ---------- Navegación ---------- */

  function faltaAntesDe(nombre) {
    const hasta = nombre === 'resultado' || nombre === 'boceto' || nombre === 'gracias'
      ? PREGUNTAS.length
      : PREGUNTAS.indexOf(nombre);
    for (let i = 0; i < hasta; i++) {
      const p = PREGUNTAS[i];
      if (!respuestas[p]) return p;
    }
    return null;
  }

  function mostrar(nombre) {
    if (nombre !== 'inicio') {
      const falta = faltaAntesDe(nombre);
      if (falta) nombre = falta;
    }
    pantallaActual = nombre;

    pantallas.forEach((s) => { s.hidden = s.dataset.pantalla !== nombre; });

    const indice = PREGUNTAS.indexOf(nombre);
    const conVolver = indice >= 0 || nombre in ANTERIOR;
    $('dxBarra').hidden = !conVolver;
    const conProgreso = indice >= 0;
    $('dxProgreso').style.visibility = conProgreso ? '' : 'hidden';
    $('dxProgresoTexto').textContent = conProgreso ? `${indice + 1} de ${PREGUNTAS.length}` : '';
    $('dxProgreso').setAttribute('aria-valuenow', String(indice + 1));
    $('dxProgresoRelleno').style.width = conProgreso ? `${((indice + 1) / PREGUNTAS.length) * 100}%` : '0';

    if (nombre === 'negocio') $('dxNegocio').value = respuestas.negocio;
    if (nombre === 'resultado') pintarResultado();
    if (nombre === 'boceto') prepararBoceto();
    if (nombre === 'gracias') pintarGracias();

    window.scrollTo(0, 0);
    const foco = document.querySelector(`[data-pantalla="${nombre}"] [tabindex="-1"]`);
    if (foco) foco.focus({ preventScroll: true });
  }

  // `desde` permite que el botón «volver» use el historial sin duplicar entradas
  function ir(nombre) {
    history.pushState({ pantalla: nombre, desde: pantallaActual }, '');
    mostrar(nombre);
  }

  function siguienteDe(nombre) {
    const i = PREGUNTAS.indexOf(nombre);
    return i < PREGUNTAS.length - 1 ? PREGUNTAS[i + 1] : 'resultado';
  }

  function anteriorDe(nombre) {
    const i = PREGUNTAS.indexOf(nombre);
    if (i > 0) return PREGUNTAS[i - 1];
    if (i === 0) return 'inicio';
    return ANTERIOR[nombre] || 'inicio';
  }

  window.addEventListener('popstate', (e) => {
    mostrar((e.state && e.state.pantalla) || 'inicio');
  });

  $('dxVolver').addEventListener('click', () => {
    const destino = anteriorDe(pantallaActual);
    // Si la pantalla anterior está justo detrás en el historial, usamos «atrás» del navegador
    if (history.state && history.state.desde === destino) {
      history.back();
    } else {
      history.replaceState({ pantalla: destino }, '');
      mostrar(destino);
    }
  });

  document.querySelectorAll('[data-ir]').forEach((btn) => {
    btn.addEventListener('click', () => ir(btn.dataset.ir));
  });

  /* ---------- Preguntas ---------- */

  $('dxFormNegocio').addEventListener('submit', (e) => {
    e.preventDefault();
    const valor = $('dxNegocio').value.trim().replace(/\s+/g, ' ');
    const valido = valor.length > 0;
    $('dxNegocioError').hidden = valido;
    $('dxNegocio').setAttribute('aria-invalid', valido ? 'false' : 'true');
    if (!valido) {
      $('dxNegocio').focus();
      return;
    }
    respuestas.negocio = valor;
    $('dxNegocio').blur(); // cierra el teclado en el móvil
    ir('sector');
  });

  document.querySelectorAll('.dx-opciones').forEach((grupo) => {
    const campo = grupo.dataset.campo;
    grupo.querySelectorAll('.dx-opcion').forEach((btn) => {
      btn.addEventListener('click', () => {
        respuestas[campo] = btn.dataset.valor;
        marcarOpciones(grupo, btn.dataset.valor);
        setTimeout(() => {
          if (pantallaActual === campo) ir(siguienteDe(campo));
        }, 180);
      });
    });
  });

  function marcarOpciones(grupo, valor) {
    grupo.querySelectorAll('.dx-opcion').forEach((b) => {
      b.setAttribute('aria-pressed', b.dataset.valor === valor ? 'true' : 'false');
    });
  }

  /* ---------- Resultado ---------- */

  function formatear(n) {
    return n.toLocaleString('es-ES');
  }

  function pintarResultado() {
    resultado = calcular(respuestas);

    $('dxResNegocio').textContent = respuestas.negocio;
    $('dxResHoras').textContent = formatear(resultado.horas);
    $('dxResConsultas').textContent = formatear(resultado.consultas);
    const conWeb = respuestas.reserva === 'si';
    $('dxResMejora').hidden = !conWeb;
    $('dxResSi').textContent = conWeb ? 'si' : 'Si';
    $('dxResTasa').textContent = String(Math.round(1 / TASA_RECUPERACION));
    $('dxResPalabra').textContent = PALABRA_SECTOR[respuestas.sector];
    $('dxResSerian').textContent = resultado.clientes === 1 ? 'sería' : 'serían';
    // Espacio duro antes de «más,»: así nunca queda sola en una línea en el móvil
    $('dxResClientes').textContent = resultado.clientes === 1
      ? '1 cliente más,'
      : `unos ${formatear(resultado.clientes)} clientes más,`;
    $('dxResDinero').textContent = formatear(resultado.dinero);
    $('dxResDineroLinea').hidden = !resultado.mostrarDinero;
    // Si el dinero no llega al mínimo, una frase en el mismo bloque destacado
    $('dxResSinDinero').hidden = resultado.mostrarDinero;
    $('dxResSinDineroTexto').textContent = respuestas.web === 'si'
      ? 'Tu web ya trabaja por ti. Con unos ajustes, puede atraer clientes nuevos que todavía no te conocen.'
      : 'Con tu propia web, podrías atraer clientes nuevos que todavía no te conocen.';

    $('dxCarameloObjeto').textContent = BOCETO_SECTOR[respuestas.sector];
    $('dxCarameloNombre').textContent = respuestas.negocio;

    // El guardado nunca debe impedir ver el resultado
    try {
      guardarResultado();
    } catch (err) {
      console.warn('No se ha podido guardar el diagnóstico:', err);
    }
  }

  // Texto del botón elegido, para que en el panel de Netlify se lea la respuesta tal cual
  function textoRespuesta(campo) {
    const btn = document.querySelector(`[data-campo="${campo}"] [data-valor="${respuestas[campo]}"]`);
    return btn ? btn.textContent.trim() : '';
  }

  // Campos del formulario oculto «diagnostico» (index.html); «boceto» lleva estos y los de contacto
  function datosDiagnostico() {
    return {
      negocio: respuestas.negocio,
      sector: textoRespuesta('sector'),
      tiene_web: textoRespuesta('web'),
      mensajes_dia: textoRespuesta('mensajes'),
      fuera_horario: textoRespuesta('fuera'),
      reserva_online: textoRespuesta('reserva'),
      gasto_medio: textoRespuesta('gasto'),
      horas_mes: String(resultado.horas),
      consultas_fuera: String(resultado.consultas),
      clientes_mes: String(resultado.clientes),
      euros_mes: resultado.mostrarDinero ? String(resultado.dinero) : `${resultado.dinero} (no se mostró: menos de ${MINIMO_EUROS} €)`,
    };
  }

  /* ---------- Guardado en Netlify Forms (nunca bloquea al usuario) ---------- */

  async function enviarFormulario(nombre, datos) {
    const ctrl = new AbortController();
    const temporizador = setTimeout(() => ctrl.abort(), TIEMPO_MAX_GUARDADO);
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(Object.assign({ 'form-name': nombre }, datos)).toString(),
        signal: ctrl.signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    } finally {
      clearTimeout(temporizador);
    }
  }

  function guardarResultado() {
    const datos = Object.assign(datosDiagnostico(), { 'bot-field': '' });
    const clave = JSON.stringify(datos);
    if (clave === ultimoGuardado) return; // no repetir si vuelve a la misma pantalla sin cambiar nada
    ultimoGuardado = clave;

    enviarFormulario('diagnostico', datos)
      .catch(() => { ultimoGuardado = ''; }); // se reintentará al volver a ver el resultado
  }

  /* ---------- Formulario del boceto ---------- */

  const form = $('dxFormBoceto');

  function prepararBoceto() {
    $('dxCampoWeb').hidden = respuestas.web !== 'si';
  }

  function limpiarTelefono(valor) {
    return valor.replace(/[\s.\-()]/g, '').replace(/^0034/, '+34');
  }

  function telefonoValido(valor) {
    return /^(\+34)?[6789]\d{8}$/.test(limpiarTelefono(valor));
  }

  function emailValido(valor) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor);
  }

  function webValida(valor) {
    return /^(https?:\/\/)?[^\s/]+\.[^\s]{2,}$/i.test(valor);
  }

  function marcarCampo(input, valido) {
    input.setAttribute('aria-invalid', valido ? 'false' : 'true');
    const error = input.closest('.dx-campo').querySelector('.dx-error');
    if (error) error.hidden = valido;
    return valido;
  }

  function validarFormulario() {
    const f = form.elements;
    const comprobaciones = [
      [f.nombre, f.nombre.value.trim().length > 0],
      [f.whatsapp, telefonoValido(f.whatsapp.value)],
      [f.redes, f.redes.value.trim().replace(/^@/, '').length > 1],
      [f.web, respuestas.web !== 'si' || !f.web.value.trim() || webValida(f.web.value.trim())],
      [f.email, !f.email.value.trim() || emailValido(f.email.value.trim())],
      [f.consentimiento, f.consentimiento.checked],
    ];
    let primerError = null;
    comprobaciones.forEach(([input, valido]) => {
      if (!marcarCampo(input, valido) && !primerError) primerError = input;
    });
    if (primerError) primerError.focus();
    return !primerError;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (enviando || !validarFormulario()) return;

    const f = form.elements;
    const boton = $('dxEnviar');
    enviando = true;
    boton.disabled = true;
    boton.textContent = 'Enviando…';

    try {
      // Se envía antes de mostrar «Recibido» (y, por tanto, antes de que pueda abrir WhatsApp)
      await enviarFormulario('boceto', Object.assign(datosDiagnostico(), {
        nombre: f.nombre.value.trim(),
        whatsapp: limpiarTelefono(f.whatsapp.value),
        redes: f.redes.value.trim(),
        web: respuestas.web === 'si' ? f.web.value.trim() : '',
        email: f.email.value.trim(),
        consentimiento: f.consentimiento.checked ? 'Sí' : 'No',
        consentimiento_fecha: new Date().toISOString(),
        consentimiento_version: CONSENTIMIENTO_VERSION,
        'bot-field': f['bot-field'].value,
      }));
    } catch (err) {
      // Si falla el guardado seguimos igual: el mensaje de WhatsApp de la confirmación nos trae el contacto
      console.warn('No se ha podido guardar la petición de boceto:', err);
    } finally {
      enviando = false;
      boton.disabled = false;
      boton.textContent = 'Pedir mi boceto';
    }
    ir('gracias');
  });

  /* ---------- Confirmación ---------- */

  function enlaceWhatsapp() {
    const nombre = form.elements.nombre.value.trim();
    const texto = `Hola, soy ${nombre} de ${respuestas.negocio}, acabo de pedir el boceto de mi web.`;
    return `https://wa.me/${WHATSAPP_3G}?text=${encodeURIComponent(texto)}`;
  }

  function pintarGracias() {
    $('dxGraciasNegocio').textContent = respuestas.negocio;
    $('dxGraciasWhatsapp').href = enlaceWhatsapp();
  }

  /* ---------- Arranque ---------- */
  history.replaceState({ pantalla: 'inicio' }, '');
  mostrar('inicio');
})();
