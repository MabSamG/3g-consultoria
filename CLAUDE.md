# 3G Tres Generaciones — web

Web estática sin framework ni build (HTML/CSS/JS). Se despliega sola en Netlify al hacer push a `main`.
Todo lo que hay en el repo se publica en la web: no guardar aquí encargos, notas internas ni secretos.

## Formularios

Se guardan con Netlify Forms (sin base de datos propia): un `<form data-netlify="true" netlify-honeypot="bot-field" hidden>`
en el HTML con todos los campos, y el JS lo envía con `fetch('/')` en `application/x-www-form-urlencoded`.
Formularios: `agente-contacto` (chat), `diagnostico` y `boceto` (/diagnostico/).

Para probar en local: `netlify dev`. Nunca `netlify deploy`.
