---
name: pasos-manuales
description: Cómo guiar al usuario en pasos que tiene que hacer él en un sitio web (GitHub, Vercel, Supabase, Google Cloud, dominios, servidores) — configuraciones, secretos, tokens, usuarios, variables. Usar siempre que haya que pedirle al usuario que configure algo en un navegador o que Claude no pueda o no deba hacer solo.
---

# Pasos manuales del usuario

## 1. Formato de cada paso
- **Link directo** a la pantalla exacta (no solo "Settings → …"). El usuario lo pidió: le ahorra buscar.
- Nombre exacto de cada campo y el valor a poner (en `código` si hay que escribirlo tal cual).
- El botón final a tocar y cómo comprobar que quedó bien.
- Al final: qué hace Claude apenas el usuario avise ("Avisame cuando esté y …").
- Si los pasos son largos o se repiten, mostrarlos **dentro de la app** con botón "Copiar" y casillas para ir marcando.

## 2. Links del proyecto
Links de gedefensoria (repo `GonzaRada31/gedefensoria`, nube Azure). Completar con los recursos de Azure a medida que se creen:
| Qué | Link (plantilla) |
|---|---|
| Secretos del repo (Actions) | `https://github.com/GonzaRada31/gedefensoria/settings/secrets/actions` |
| Variables del repo | `https://github.com/GonzaRada31/gedefensoria/settings/variables/actions/new` |
| Ejecuciones de Actions | `https://github.com/GonzaRada31/gedefensoria/actions` |
| Visibilidad del repo | `https://github.com/GonzaRada31/gedefensoria/settings` |
| Azure Portal (inicio) | https://portal.azure.com/#home |
| Azure: grupos de recursos | https://portal.azure.com/#browse/resourcegroups |
| *(RedexIT usaba Vercel y Supabase: en este proyecto no aplican — ver D-002)* | |
| Google Cloud: nuevo proyecto | https://console.cloud.google.com/projectcreate |
| Google Auth: resumen / audiencia / clientes / marca | https://console.cloud.google.com/auth/overview · `/auth/audience` · `/auth/clients/create` · `/auth/branding` |

Cuando se confirme un link real del proyecto, reemplazar la plantilla por el link concreto en esta tabla.

## 3. Verificar lo que el usuario dice que hizo
- Antes de seguir, comprobarlo por CLI sin exponer valores: `gh repo view --json visibility`, `gh secret list`,
  `gh variable list`, una consulta a la API, etc. En RedexIT el usuario creyó haber pasado el repo a privado y seguía
  público, y una clave "cargada" estaba rechazada.
- Si no coincide, decirlo claro y dar el link directo para corregirlo.
- En Windows los comandos van en la sintaxis del shell que use el usuario (PowerShell: `Get-Content x | cmd`, no `cmd < x`).

## 4. Seguridad
- Secretos, tokens y contraseñas **nunca por el chat**: el usuario los pega directo en el sitio. Si hace falta
  cargarlos por terminal, leerlos desde un `.env` local (fuera de git) sin mostrarlos.
- Verificar después sin exponer valores.

## 5. Acciones que tocan producción
- Migrar producción, publicar o encender despliegues automáticos: el control de permisos de Claude Code las puede
  bloquear aunque el plan las haya anunciado. No insistir ni rodearlas: darle al usuario el link o el comando para
  hacerlo él, o pedirle autorización explícita.
- Recordar qué dispara cada acción (ej.: si cada push a `main` despliega, un push es una publicación).

## 6. Google Cloud (login con Google) — aprendido
- Un proyecto de Google Cloud por propósito (login ≠ backups): los alcances sensibles de uno traban al otro.
- **Sin logotipo** en la marca: subir una imagen dispara la verificación de Google (semanas).
- Dominios autorizados sin `https://` ni `/`: todos los que aparezcan en la página principal y la política de privacidad
  (incluido el del backend de autenticación, ej. `<id>.supabase.co`).
- En *Audience*, tocar **Publish app** (con `openid`, `profile`, `email` se publica sin verificación).
- Casilla "Use this client for an AI-powered agent": **desmarcada**.

## 7. Mejora continua
Si aparece un link o un aprendizaje útil, agregarlo acá en la misma sesión.
