// Netlify Function — guarda los diagnósticos en Supabase y avisa por email (Resend).
// POST /.netlify/functions/diagnostico
//   { accion: 'resultado', id?, ...diagnóstico }            → crea o actualiza la fila, devuelve { id }
//   { accion: 'boceto', id?, ...diagnóstico, ...contacto }  → guarda el contacto y envía el aviso
//
// Variables de entorno: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY, NOTIFY_EMAIL, RESEND_FROM (opcional)

const TABLA = 'diagnosticos';
const SECTORES = { estetica: 'Estética', peluqueria: 'Peluquería', moda: 'Moda', otro: 'Otro' };
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async (req) => {
  if (req.method !== 'POST') return json({ error: 'Método no permitido' }, 405);

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'JSON no válido' }, 400);
  }
  if (!body || typeof body !== 'object') return json({ error: 'Datos no válidos' }, 400);

  // Campo trampa relleno → bot. Respondemos como si todo fuera bien y no guardamos nada.
  if (body.sitio) return json({ ok: true });

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY');
    return json({ error: 'Servicio no configurado' }, 500);
  }

  const diagnostico = validarDiagnostico(body);
  if (!diagnostico) return json({ error: 'Datos del diagnóstico no válidos' }, 400);
  const id = typeof body.id === 'string' && UUID.test(body.id) ? body.id : null;

  try {
    if (body.accion === 'resultado') {
      return json({ id: await guardar(id, diagnostico) });
    }

    if (body.accion === 'boceto') {
      const contacto = validarContacto(body, diagnostico.tiene_web);
      if (!contacto) return json({ error: 'Datos de contacto no válidos' }, 400);

      const fila = {
        ...diagnostico,
        ...contacto,
        pide_boceto: true,
        consentimiento: true,
        consentimiento_at: new Date().toISOString(),
      };
      const filaId = await guardar(id, fila);

      try {
        await avisar(fila);
      } catch (err) {
        // El contacto ya está guardado: un fallo del email no debe romper la respuesta
        console.error('Error enviando el aviso:', err);
      }
      return json({ ok: true, id: filaId });
    }

    return json({ error: 'Acción no válida' }, 400);
  } catch (err) {
    console.error('Error guardando en Supabase:', err);
    return json({ error: 'No se ha podido guardar' }, 502);
  }
};

/* ---------- Validación ---------- */

function texto(valor, max) {
  if (typeof valor !== 'string') return '';
  return valor.trim().replace(/\s+/g, ' ').slice(0, max);
}

function entero(valor, max) {
  return Number.isInteger(valor) && valor >= 0 && valor <= max;
}

function validarDiagnostico(b) {
  const negocio = texto(b.negocio, 120);
  if (!negocio || !(b.sector in SECTORES)) return null;
  if (typeof b.tiene_web !== 'boolean' || typeof b.reserva_online !== 'boolean') return null;
  if (!entero(b.mensajes_dia, 1000) || !entero(b.gasto_medio, 100000)) return null;
  if (typeof b.pct_fuera_horario !== 'number' || b.pct_fuera_horario < 0 || b.pct_fuera_horario > 1) return null;
  if (!entero(b.horas_mes, 1e6) || !entero(b.consultas_fuera, 1e6) || !entero(b.clientes_recuperables, 1e6)) return null;
  if (b.dinero_mes !== null && !entero(b.dinero_mes, 1e8)) return null;

  return {
    negocio,
    sector: b.sector,
    tiene_web: b.tiene_web,
    mensajes_dia: b.mensajes_dia,
    pct_fuera_horario: b.pct_fuera_horario,
    reserva_online: b.reserva_online,
    gasto_medio: b.gasto_medio,
    horas_mes: b.horas_mes,
    consultas_fuera: b.consultas_fuera,
    clientes_recuperables: b.clientes_recuperables,
    dinero_mes: b.dinero_mes,
  };
}

function validarContacto(b, tieneWeb) {
  const contacto_nombre = texto(b.contacto_nombre, 80);
  const redes = texto(b.redes, 200);
  const web = tieneWeb ? texto(b.web, 200) : '';
  const email = texto(b.email, 160).toLowerCase();
  const version = texto(b.consentimiento_version, 40);

  let whatsapp = texto(b.whatsapp, 20).replace(/[\s.\-()]/g, '').replace(/^0034/, '+34');
  if (!/^(\+34)?[6789]\d{8}$/.test(whatsapp)) return null;
  if (!whatsapp.startsWith('+34')) whatsapp = '+34' + whatsapp;

  if (!contacto_nombre || redes.replace(/^@/, '').length < 2) return null;
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return null;
  if (b.consentimiento !== true || !/^[\w.-]+$/.test(version)) return null;

  return {
    contacto_nombre,
    whatsapp,
    redes,
    web: web || null,
    email: email || null,
    consentimiento_version: version,
  };
}

/* ---------- Supabase (API REST) ---------- */

async function supabase(ruta, opciones) {
  const clave = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const headers = {
    apikey: clave,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  };
  // Las claves antiguas (JWT) van también en Authorization; las nuevas sb_secret_ solo en apikey
  if (clave.startsWith('eyJ')) headers.Authorization = `Bearer ${clave}`;

  const url = `${process.env.SUPABASE_URL.replace(/\/$/, '')}/rest/v1/${ruta}`;
  const res = await fetch(url, { ...opciones, headers });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  return res.json();
}

// Actualiza la fila si existe; si no (p. ej. falló el guardado del resultado), crea una nueva.
async function guardar(id, fila) {
  if (id) {
    const filas = await supabase(`${TABLA}?id=eq.${id}&select=id`, { method: 'PATCH', body: JSON.stringify(fila) });
    if (filas.length) return filas[0].id;
  }
  const filas = await supabase(`${TABLA}?select=id`, { method: 'POST', body: JSON.stringify(fila) });
  return filas[0].id;
}

/* ---------- Aviso por email (Resend) ---------- */

function enlaceRedes(redes) {
  if (/^https?:\/\//i.test(redes)) return redes;
  if (/^(www\.)?[\w-]+\.[a-z]{2,}\//i.test(redes)) return `https://${redes}`;
  return `https://www.instagram.com/${redes.replace(/^@/, '')}/`;
}

async function avisar(f) {
  const { RESEND_API_KEY, NOTIFY_EMAIL } = process.env;
  if (!RESEND_API_KEY || !NOTIFY_EMAIL) {
    console.warn('Sin RESEND_API_KEY o NOTIFY_EMAIL: no se envía el aviso');
    return;
  }

  const dinero = f.dinero_mes === null ? '— (no se le mostró)' : `${f.dinero_mes}`;
  const resumen = `Nuevo boceto: ${f.negocio} · ${SECTORES[f.sector]} · ${f.horas_mes} h/mes · ` +
    `${f.consultas_fuera} consultas fuera de horario · ${dinero} €/mes · ` +
    `WhatsApp ${f.whatsapp} · Redes ${enlaceRedes(f.redes)}`;

  const detalle = [
    resumen,
    '',
    `Contacto: ${f.contacto_nombre}`,
    `WhatsApp: https://wa.me/${f.whatsapp.replace('+', '')}`,
    `Redes: ${f.redes}`,
    `Web: ${f.web || '(no tiene / no indicada)'}`,
    `Email: ${f.email || '(no indicado)'}`,
    `Reserva o compra online: ${f.reserva_online ? 'Sí' : 'No'}`,
    `Gasto medio por cliente: ${f.gasto_medio} €`,
  ].join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.RESEND_FROM || '3G Diagnóstico <onboarding@resend.dev>',
      to: NOTIFY_EMAIL.split(',').map((e) => e.trim()).filter(Boolean),
      subject: `Nuevo boceto: ${f.negocio}`,
      text: detalle,
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

function json(datos, status = 200) {
  return new Response(JSON.stringify(datos), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}
