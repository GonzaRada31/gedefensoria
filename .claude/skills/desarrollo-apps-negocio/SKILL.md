---
name: desarrollo-apps-negocio
description: Método y experiencia acumulada para construir apps de gestión y tiendas online para negocios reales (RedexIT es el primero). Usar al empezar o planificar cualquier proyecto, módulo o pantalla nueva, al elegir stack o arquitectura, al organizar el trabajo autónomo, y al cerrar una tarea para registrar lo aprendido. Pensada para reutilizarse en proyectos de otros negocios.
---

# Desarrollo de apps para negocios

Experiencia de RedexIT (comercio de celulares, desde 2026-10-06), escrita para reutilizarla en otros proyectos. Lo
específico de cada proyecto está en su `REGLAS.md` y `docs/`; acá va solo lo que sirve para cualquier proyecto.
Las secciones de plata, stock y tienda (§1.4, §3, §7) son de comercio: en un proyecto sin ventas se toman como ejemplo
del principio de fondo (congelar el dato del momento, movimientos solo de inserción, lo derivado se calcula). **Al aprender algo que sirva para otro proyecto,
se agrega acá en la misma sesión** (§9).

## 1. Principios de producto
1. **Una sola fuente de verdad:** stock, precios y ventas viven en la gestión; la tienda online consume esos datos,
   nunca los duplica.
2. **Uso real, no demo:** cada pantalla resuelve un trabajo del negocio de punta a punta (con errores, permisos y
   estados vacíos), no un MVP descartable.
3. **El dueño decide, la app recuerda:** todo dato de negocio con opciones (tasas, descuentos, garantías, horarios,
   redes) es **configurable** desde la app, nunca fijo en el código.
4. **Saber si el negocio gana plata:** cada venta congela costo, tipo de cambio y comisión del momento. Sin eso no hay
   ganancia real ni tablero que sirva.
5. **Roles desde el día uno:** dueño, vendedor, técnico (o los del negocio). El vendedor nunca ve costos ni márgenes.

## 2. Stack probado (Argentina, costo cero al arrancar)
> **En gedefensoria manda `docs/DECISIONES.md` (D-001/D-002): React + NestJS + Prisma + PostgreSQL en Azure.**
> Esta tabla es la experiencia de RedexIT: sirve como referencia (zod, tests contra base local real, migraciones
> versionadas, tokens de Tailwind), no como elección para este proyecto. Lo de Next.js/Supabase/Vercel no aplica.

| Pieza | Elección | Por qué |
|---|---|---|
| App | Next.js (App Router, Server Actions) + React + TypeScript | Gestión y tienda en una sola app |
| Estilos | Tailwind 4 con tokens en `globals.css` (`@theme`), sin `tailwind.config` | Diseño consistente, claro/oscuro |
| Base | PostgreSQL en Supabase (Auth + Storage) | Gratis al inicio, RLS, backups propios |
| ORM | Drizzle (migraciones SQL versionadas; reglas de negocio en triggers y CHECK) | La base defiende los datos |
| Plata | `decimal.js` con un helper único (`money.ts`); columnas `numeric` | Nunca `float` ni `Number()` sobre importes |
| Validación | zod en cada entrada de servicio | Errores claros y tipados |
| Tests | Vitest contra una base local real (Supabase CLI en Docker) | Los triggers también se prueban |
| Deploy | GitHub → Vercel (CD en cada push a `main`); go-live en un servidor propio si conviene | |
| Emails | Resend con dominio propio verificado por DNS | |
| Pagos | MercadoPago (online, QR); el posnet del banco para tarjetas en el local | |

## 3. Arquitectura que funcionó
- **Servicios** (`src/server/services/*`): toda la lógica de negocio; reciben un `actor` (usuario + rol) y validan
  permisos ahí, no solo en la pantalla. Las pantallas y las Server Actions solo llaman servicios.
- **Transacciones** con contexto (motivo, referencia) para auditar; tablas de movimientos **solo de inserción**
  (stock, caja, pagos): se corrige con un movimiento inverso, nunca editando.
- **Idempotencia** por id generado en el cliente (uuid v7): un reintento no duplica ventas ni ingresos.
- **Stock por lotes (FIFO)** con costo y fecha de ingreso; equipos con número de serie/IMEI como unidades.
- **Lo derivado se calcula, no se guarda dos veces** (ej.: la deuda con un proveedor en consignación sale de las
  ventas de sus lotes, no de un contador aparte).
- Migraciones: cambio en el esquema TS → `drizzle-kit generate` → completar a mano triggers/vistas en el SQL →
  migrar local → tests → recién después producción con confirmación del dueño.

- **Next.js: toda página que lee la base sin cookies ni `searchParams` lleva `await connection()`**; si no, el build
  intenta prerenderizarla, falla en CI (sin base) y no se publica. El pre-commit no corre el build: antes de un push con
  páginas nuevas, correr `npm run build` o revisar este punto (pasó con `/privacidad`, 2026-10-15).

## 4. Forma de trabajo con el dueño (lo más importante)
1. `REGLAS.md` corto como punto de entrada; el detalle en `docs/` y se lee solo cuando hace falta.
2. **Modo continuo:** trabajar de corrido sobre la cola de tareas. Solo se frena por producción, plata o datos de
   clientes, temas legales, servicios externos o algo irreversible. Lo demás se resuelve con un **criterio por
   defecto**, se anota en `PREGUNTAS.md` y se sigue. Las preguntas se juntan al final de la tanda.
3. Preguntas con **opciones profesionales** y una recomendada (el dueño contesta mejor eligiendo que redactando).
4. Planes grandes en un `.md` en `docs/` antes de tocar la base; un plan aprobado autoriza a implementarlo entero.
5. Bitácora (la más nueva arriba), decisiones (D-00X), tareas con `[x]` y fecha; cierre de sesión con protocolo.
6. Pasos manuales del dueño (Google, DNS, pagos): con **link exacto**, campos uno por uno y secretos nunca por chat.
   Si son largos, mostrarlos **dentro de la app** con botón "Copiar" (ej.: pantalla de copias de seguridad).
7. QA en el navegador lo hace el agente (Chrome), en claro/oscuro y a 390 px; el dueño no revisa a mano.
8. Respuestas largas a un archivo; en la terminal, un resumen corto.

## 5. Seguridad y datos personales
- Secretos solo en variables de entorno (Vercel / GitHub Secrets); `.env*` fuera del repo.
- **Revisar todo archivo que pega el dueño antes de commitear:** nombres, DNI, últimos dígitos de tarjetas, teléfonos.
  Pasó dos veces en RedexIT con liquidaciones de pagos.
- RLS activado en todas las tablas; la app lee con la conexión del servidor y valida rol en cada servicio.
- Backups propios cifrados (Supabase Free no hace backups): diario, 3-2-1, con prueba de restauración.
- **`npm audit --omit=dev` en cada tanda.** Si hay algo crítico en producción y en `main` local hay commits que esperan
  migración, el parche va solo: `git worktree add ../hotfix -b hotfix/x origin/main` → subir la versión → build y
  tests → `git push origin hotfix/x:main` → `git rebase origin/main` en el `main` local (RedexIT, 2026-10-26: Next 16.4.0
  con RCE crítico, mientras T1 esperaba las migraciones 11–13).

## 6. Datos de IA externa e investigación
- Lo que dicen Gemini, blogs o comparadores es **"a verificar"**. Solo cuenta como medido un comprobante real (una
  liquidación con bruto y neto) o la página oficial con fecha.
- Investigaciones largas: se redactan los prompts en un archivo, el dueño los corre en otra IA con búsqueda y pega la
  respuesta en `docs/referencias/`; después se cruzan con datos reales.

## 7. Tienda online (aprendido)
- Detalle legal, patrones de ficha/carrito/buscador y envíos: skill `ecommerce-argentina` (repo de RedexIT; no viene en el kit).
- Diseño: herramientas como Stitch sirven de **inspiración**; se reconstruye con los tokens y componentes propios, y
  todo dato de negocio del diseño se confirma con el dueño.
- Mostrar precios según la ley vigente (en Argentina: precio final, "precio sin impuestos nacionales", cuotas con
  total financiado y CFT; un solo precio en 1 pago). Revisar con el contador.
- Un pago online se da por confirmado **solo por webhook verificado contra la API** del procesador.
- Subdominio para la tienda si el dominio raíz ya tiene un sitio (no romper correo ni WordPress).

## 8. Errores que no hay que repetir
- `Number()`/`parseFloat` sobre plata · recargo calculado como `precio × (1 + retención)` (se queda corto; la fórmula
  es `1 ÷ (1 − retención) − 1`) · clases de Tailwind inventadas (no fallan, no pintan) · `setState` dentro de
  `useEffect` para leer `localStorage` (usar `useSyncExternalStore`) · confiar en el resumen de una IA sin cruzarlo con
  los números · `await` de nivel superior en scripts `.ts` (usar `.mts`) · dejar Docker prendido en una PC con poca
  memoria mientras el dueño trabaja desde el celular · hacer push (CD automático) de código que lee columnas nuevas
  **antes** de migrar producción: el sitio se cae. Orden: migrar producción → push.
- Windows: arrancar Docker Desktop con `Start-Process` (PowerShell) y esperar a que `docker info` responda; un `start`
  desde bash después de cerrarlo a la fuerza puede no levantarlo. Archivos nuevos con apóstrofes en el texto o
  paréntesis en la ruta (`(tienda)`): crearlos con el editor, no con heredoc de bash (se corta y no crea nada).
  Si Docker cae con "recursos insuficientes" (`0x800705aa`) es falta de RAM: no insistir ni cerrar programas del
  usuario; pedirle que cierre navegadores o reinicie, y dejar documentado qué quedó sin commit.
- **Git:** mirar `git status` antes de `git add -A`; archivos sueltos del usuario (notas, respuestas de otra IA) no se
  commitean. Si se coló uno y no hubo push, sacarlo con `git rm --cached` + amend (gedefensoria, 2026-11-19).
- Redes de organismos con DNS interno lento: un `Could not resolve host` puede ser momentáneo; verificar con
  `nslookup`/`curl -sI` y reintentar antes de diagnosticar otra cosa.

## 9. Mejora continua
Al cerrar cada tarea: ¿aprendimos algo que sirva en **otro** negocio? → agregarlo acá (sección que corresponda) y
anotarlo en la bitácora con `[skill]`. Lo que solo sirve para este negocio va a su skill específica.
