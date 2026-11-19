# Bitácora

> La entrada más nueva arriba. Máximo ~10 líneas cada una. Las mejoras de skills se marcan con `[skill]`.
> Las sesiones 1 a 3 están en detalle en `RELEVAMIENTO.md` §9 (historial; ya no se escribe ahí).

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
