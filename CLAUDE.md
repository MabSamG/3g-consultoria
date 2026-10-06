# 3G Tres Generaciones — web

Web estática sin framework ni build (HTML/CSS/JS). Se despliega sola en Netlify al hacer push a `main`.
Todo lo que hay en el repo se publica en la web: no guardar aquí encargos, notas internas ni secretos.

## Supabase (obligatorio desde el cambio del 30 oct 2026)

Toda migración que cree una tabla debe, en el mismo archivo:
- Activar RLS (`alter table ... enable row level security`) y crear sus políticas.
- Declarar GRANTs explícitos. Si la tabla solo se usa desde una Netlify Function con la clave `service_role`,
  conceder permisos solo a `service_role` y no dar nada a `anon` ni a `authenticated`.

La clave `service_role` / secret solo va en variables de entorno de Netlify, nunca en el navegador ni en el repo.

## Netlify Functions

En `netlify/functions/`. Sin dependencias: usan `fetch` contra las APIs REST de Supabase y Resend.
Para probar en local: `netlify dev` con un `.env` en la raíz (ignorado por git). Nunca `netlify deploy`.
