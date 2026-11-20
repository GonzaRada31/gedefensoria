# REGLAS.md — Punto de entrada de gedefensoria

> Leé este archivo completo al iniciar cada sesión. Es corto a propósito:
> los demás .md se leen **solo cuando la tarea lo requiere** (ver Índice).

## 1. Objetivo principal
**Sistema de Gestión de Actuaciones** para la **Defensoría del Pueblo de la Provincia de Jujuy**: reemplazar el sistema
de escritorio FoxPro (2006, intranet, ya no se instala en Windows 11) por una app web que registre Actuantes y
consultas, derive en tiempo real de Mesa de Entradas a Asesores, gestione Actuaciones y Trámites con plazos y
trazabilidad, y dé estadísticas para decidir. **No es una copia del sistema viejo: se rediseña** (`docs/FILOSOFIA_DISENO.md`).

## 2. Estado actual (actualizar al cerrar cada sesión)
- Fase: **1 — Análisis y Definición.** Relevamiento 12 de 25 vistas (48%). Prototipo UI en marcha: Marco, Cola del día, Ficha lateral y modales (`prototipo-ui/`).
- Última sesión: 2026-11-19 (sesión 6, cerrada) — ver `docs/BITACORA.md`
- Próximo paso: continuar con el prototipo UI (Pantalla 4: Registrar atención; Pantalla 6: Bandeja del Asesor; Pantalla 7: Actuación y trámites).

## 3. Índice (leer solo cuando haga falta)
| Archivo | Cuándo leerlo |
|---|---|
| `docs/TAREAS.md` | Cola de trabajo (checklist): al elegir, empezar o cerrar cualquier tarea |
| `docs/PREGUNTAS.md` | Preguntas pendientes para el usuario (con criterio por defecto): al empezar y al cerrar |
| `docs/BITACORA.md` | Qué se hizo antes (solo las últimas entradas) |
| `docs/DECISIONES.md` | Antes de cambiar stack, base de datos o arquitectura |
| `docs/RELEVAMIENTO.md` | Al auditar una vista legacy o diseñar algo de un módulo (buscar por ID, ej. `V-AS-02`) |
| `docs/REQUERIMIENTOS.md` | Al construir una función (RF-ME/AS/AD, RNF) |
| `docs/ARQUITECTURA.md` · `docs/FILOSOFIA_DISENO.md` | Stack y principios · definiciones institucionales pendientes |
| `docs/MODELO-DATOS.md` · `docs/DEVOPS.md` | Al tocar base de datos / Prisma · al tocar Docker, CI o alojamiento |
| `docs/INFORMES.md` · `docs/PROGRAMAS.md` | Cómo se cuenta cada número y qué ve cada perfil · Defensoría Móvil y otros programas |
| `docs/SEGURIDAD-ACCESO.md` | Ingreso, sesiones, invitaciones y Panel del Superadministrador |
| `docs/MARCO-LEGAL.md` · `docs/MENSAJES-SECTORES.md` | Leyes que rigen a la Defensoría · pedidos de información a los sectores |
| `docs/manual/` | Manual de Procedimientos (base del Centro de ayuda): al relevar o cambiar cómo se hace una tarea |
| `docs/PROMPT-*.md` | Prompts para otras IA: Gemini (capturas, prototipo) · Canva (maqueta de interfaz) |
| `docs/PROBLEMATICAS.md` · `docs/ROADMAP.md` | Dolores del sistema actual · fases de alto nivel |
| `docs/QA.md` | Al probar una pantalla en el navegador (método y registro) |
| `docs/PARTES-PANTALLA.md` | Nombres de cada zona de la pantalla (para hablar del diseño con el usuario) |
| `docs/INDEX.md` | Mapa completo de la documentación (para personas) |
| `.claude/skills/*/SKILL.md` | Cuando la tarea coincide con la descripción de la skill |

## 4. Reglas de trabajo
1. **Datos personales primero:** el sistema maneja datos sensibles. Nunca datos reales en desarrollo, tests, capturas,
   docs ni en el chat (las capturas del FoxPro pueden traer nombres y DNI: no transcribirlos). Permisos validados en
   el servidor; auditoría de accesos (skill `gestion-expedientes` §5).
2. **Una sola fuente de verdad** para cada dato; lo derivado se calcula. Trámites y auditoría: nunca borrar (anular).
3. **Antes de cambios grandes**, proponer el plan en un `.md` de `docs/` y esperar confirmación.
4. **Decisiones de arquitectura** en `docs/DECISIONES.md` con fecha y motivo (Contexto → Decisión → Consecuencias).
5. **Commits pequeños** con mensajes en español: `tipo: descripción` (feat, fix, docs, refactor).
6. **No leer archivos enteros sin necesidad**; buscar primero (grep/glob) y leer lo justo. `RELEVAMIENTO.md` es largo:
   buscar por ID de vista.
7. Si algo de este archivo está desactualizado o contradice el código o los docs, avisar y proponer corrección.
8. **Respuestas largas a archivo:** planes y análisis de más de ~30 líneas van a un .md en `docs/`; en la terminal,
   un resumen corto y la ruta.
9. **Desarrollo y tests siempre contra la base local** (Docker). Producción (Azure) solo con confirmación explícita.
10. **Pre-commit** (`.githooks/pre-commit`: lint, tipos, tests). **Inactivo hasta que exista código** (Fase 2); al
    crear el `package.json`, ajustar comandos y activarlo. Una vez activo, **nunca** `--no-verify`.
11. **Pedidos con varios puntos:** al terminar, confirmar punto por punto qué se hizo (y qué no, con el motivo).
12. **Buzón `docs/MJES.md`:** cuando el usuario diga "leé docs/MJES.md": leerlo, ejecutar el pedido, confirmar punto por
    punto y reemplazar su contenido por `✅ Procesado AAAA-MM-DD HH:MM — <resumen>` + la **respuesta completa**.
    Está en `.gitignore`. No reemplaza bitácora, decisiones ni tareas.
13. **Autonomía / modo continuo:** trabajar de corrido sobre `docs/TAREAS.md` con criterio profesional (sistema para
    uso real, no MVP descartable). **Solo se frena** por: producción, datos de personas reales, algo legal o
    institucional, cuentas o servicios externos, o algo irreversible. Lo demás: criterio por defecto → anotarlo en
    `PREGUNTAS.md` → seguir. Preguntas al final de la tanda, con opciones y una recomendada. Un plan aprobado
    autoriza a implementarlo entero (migración local, servicios, tests, pantallas, QA, commit y push).
14. **QA en el navegador lo hace Claude** (Chrome): claro/oscuro, 1440 y 390 px, teclado, consola limpia, cada rol.
15. **Al auditar una vista legacy:** actualizar su ficha y la matriz en `RELEVAMIENTO.md` §7, los RF afectados, la skill
    `gestion-expedientes` y `TAREAS.md` en la misma sesión.

16. **Gasto de tokens:** cuando la sesión ya esté muy cargada, avisar "conviene cerrar la sesión" al final de la
    respuesta (criterios en la skill `cierre-de-sesion`). No cerrar sin que el usuario lo pida.

17. **"Continuemos" / "sigamos"** (sin más detalle) = retomar solo: leer §2 (próximo paso), `docs/TAREAS.md`,
    `docs/PREGUNTAS.md` (respondidas nuevas) y lo que haya aparecido desde la última sesión (`docs/capturas/`,
    `prototipo-ui/`, `docs/MJES.md`), contar en 3–4 líneas qué se encontró y arrancar con lo más prioritario.

## 5. Documentación
- **Bitácora:** `docs/BITACORA.md`, la más nueva arriba, máximo ~10 líneas por entrada. (La §9 de `RELEVAMIENTO.md`
  quedó como historial de las sesiones 1–3; no se sigue escribiendo ahí.)
- **Tareas:** checklist por fase; `[x] (fecha)` al completar. `ROADMAP.md` es la vista de alto nivel, sin duplicar tareas.
- Mantener este archivo por debajo de ~120 líneas; el detalle va a `docs/`.

## 6. Skills y mejora continua
- **Regla de oro:** si el usuario corrige algo que podría repetirse, se agrega a la skill que corresponda (o se crea
  una) en la misma sesión, y se anota en la bitácora con `[skill]`.
- Skills: `gestion-expedientes` (dominio de la Defensoría), `desarrollo-apps-negocio` (método; el stack de acá es D-001),
  `diseno-apps-gestion` (pantallas), `pasos-manuales` (pasos web del usuario), `cierre-de-sesion`.

## 7. Cierre de sesión (obligatorio)
Cuando el usuario diga "cerramos", "fin de sesión" o similar → skill `cierre-de-sesion`.
