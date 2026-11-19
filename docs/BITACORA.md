# Bitácora

> La entrada más nueva arriba. Máximo ~10 líneas cada una. Las mejoras de skills se marcan con `[skill]`.
> Las sesiones 1 a 3 están en detalle en `RELEVAMIENTO.md` §9 (historial; ya no se escribe ahí).

## 2026-11-19 — Cierre sesión 5
- P1 respondida: Actuaciones con correlativo único que reinicia cada año, formato `DPJUJ-<n>-<año>` (configurable);
  el número histórico del FoxPro se conserva al migrar. P13 y P15 respondidas; nueva P19.
- Defensoría Móvil: selector "Pertenece a un programa" editable después; tipos de registro (normal / grupal /
  taller con datos mínimos y planilla adjunta); talleres-como-consultas = parámetro del panel; **modo sin conexión
  planificado** (PWA, D-006 propuesta).
- Nuevos: `MARCO-LEGAL.md` (Ley 6380, Constitución 2023 art. 77) y `MENSAJES-SECTORES.md` (pedidos a Secretarías
  y Autoridades para P2–P5). Manual: PROC-PR-01 actualizado.
- `[skill]` `desarrollo-apps-negocio` §4: reglas que deciden los superiores del cliente → parámetro configurable,
  no un hecho · `gestion-expedientes`: numeración, programas, talleres, Ley 6380.
- Próxima sesión: el usuario pasa capturas a Gemini → integrar `docs/capturas/`; revisar `prototipo-ui/`.

## 2026-11-19 — Sesión 5 (2ª tanda): informes, programas, acceso y manual
- Respondidas P7 (Libro Diario único), P9 (género opcional), P11 (sin pagos en dólares), P12 (acceso). Nuevas P13–P18.
- Analizado el informe de la Defensoría Móvil → `PROGRAMAS.md` + ficha `P-PRG-01` (25 vistas). Ley N° 6380.
- Nuevos: `INFORMES.md` (conteo: multi-temática = varias consultas, 1 atención), `SEGURIDAD-ACCESO.md`, RF-PR y RF-SI.
- P10: investigadas opciones de alojamiento en Argentina → **D-005 propuesta** (app portable; ARSAT o proveedor local).
- DEVOPS: techos de memoria para Docker (WSL ya limitado a 4 GB); MinIO en lugar de Azurite.
- Manual de Procedimientos iniciado (`docs/manual/`, 3 procedimientos). Prompts de Gemini: capturas y prototipo UI.
- `[skill]` `cierre-de-sesion`: paso del manual + aviso por tokens · `desarrollo-apps-negocio` §9: crear vs mejorar
  skills y documentar · `gestion-expedientes`: conteo, programas, Ley 6380, P7/P9.

## 2026-11-19 — Sesión 5: modelo de datos y DevOps
- Sin capturas de V-AS-02 → plan B. Creado `docs/MODELO-DATOS.md` v0.1: 5 diagramas ER (organización, atención,
  actuaciones, trámites/Libro Diario, catálogos/auditoría), índices, datos personales y pendientes ⏳.
- Nueva entidad **Atención** (agrupa consultas de una visita). Convenciones en **D-004**.
- Creado `docs/DEVOPS.md` v0.1: monorepo pnpm, Docker solo para servicios (con límites de RAM), CI, entornos,
  Azure (Static Web Apps + Container Apps + PostgreSQL Flexible + Blob + Key Vault).
- QA: los 7 diagramas mermaid se verificaron en Chrome (renderizan sin errores).
- Preguntas nuevas P7–P12; **P10 (datos fuera de Argentina, Ley 25.326) frena producción**.
- `[skill]` `gestion-expedientes`: Atención como entidad y puntero al modelo.

## 2026-11-19 — Cierre sesión 4
- Push a GitHub de la metodología y cierre. Sin cambios de stack ni decisiones nuevas.
- `[skill]` `desarrollo-apps-negocio` §8: revisar `git status` antes de `git add -A` (se coló una nota ajena,
  sacada antes del push) y reintentar si la red de la Defensoría no resuelve github.com.
- Próxima sesión: V-AS-02 con capturas, o borrador ER / DEVOPS.md. Responder P1–P6.

## 2026-11-19 — Sesión 4: nueva PC + metodología
- Repo clonado en la PC de la Defensoría (`C:\Users\Invitado1\Documents\antigravity\gedefensoria`).
- Instalado y adaptado el kit de metodología: `CLAUDE.md` → `REGLAS.md`; `docs/` TAREAS, PREGUNTAS, DECISIONES, BITACORA, QA, MJES.
- `[skill]` Agregadas `cierre-de-sesion`, `pasos-manuales` (links del repo y Azure), `diseno-apps-gestion`,
  `desarrollo-apps-negocio` (nota: el stack de acá es D-001) y `gestion-expedientes` reescrita con el relevamiento real
  (Actuación = expediente, Trámite = paso N:M).
- `HANDOFF.md` eliminado (D-003). Corregido el conteo del relevamiento: son 24 vistas, 12 auditadas (50%).
- Creado `~/.claude/CLAUDE.md` con las preferencias globales del usuario.
- Pendiente: V-AS-02 (capturas), DEVOPS.md, borrador ER, preguntas P1–P6.

## 2026-11-19 — Sesión 3 (resumen)
- Repo Git creado y subido a GitHub; rutas absolutas del INDEX corregidas; creado HANDOFF.md.

## 2026-05-26/27 — Sesiones 1 y 2 (resumen)
- Auditadas 12 vistas/procesos (Mesa de Entradas, Asesores, Trámites, Personas, Circuito interno).
- Definidos: pases asíncronos, 7 categorías de trámite, Libro Diario, reiteraciones, máquina de estados, soft delete.
