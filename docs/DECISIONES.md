# Decisiones de arquitectura

> Formato breve: Contexto → Decisión → Consecuencias. Número correlativo (D-001, D-002…), con fecha.
> Detalle técnico en `ARQUITECTURA.md`.

## D-001 — Stack de aplicación (2026-05-26, registrada 2026-11-19)
- **Contexto:** el FoxPro de 2006 no se instala en Windows 11, corre en intranet con hardware viejo y bloquea la
  pantalla al derivar consultas. Se necesita una app web, tipada y con tiempo real.
- **Decisión:** frontend **React + TypeScript** (TailwindCSS + shadcn/ui, TanStack Query, Zustand) · backend **NestJS +
  TypeScript** · **PostgreSQL + Prisma** · **Socket.io** para pases y colas · **Zod** para validar.
- **Consecuencias:** front y back separados (dos apps, idealmente monorepo). La máquina de estados de Trámites y los
  permisos viven en NestJS. Redis para salas de WebSocket si hay varias instancias.

## D-002 — Alojamiento en Azure (2026-05-26, registrada 2026-11-19)
- **Contexto:** los servidores locales son viejos (HDD, poca RAM); se busca alta disponibilidad y despliegue continuo.
- **Decisión:** **Azure** — App Service o Container Apps para la app, PostgreSQL Flexible Server, Blob Storage para
  adjuntos. Desarrollo local con Docker Desktop.
- **Consecuencias:** falta definir quién paga y administra la suscripción (organismo o proveedor) y si TI de la
  provincia exige algo (login institucional, dominio). Se resuelve en `DEVOPS.md`.

## D-003 — Metodología de trabajo con Claude Code (2026-11-19)
- **Contexto:** se trajo el kit de metodología probado en otro proyecto (REGLAS corto, bitácora, tareas, preguntas con
  criterio por defecto, skills, buzón MJES, pre-commit).
- **Decisión:** `REGLAS.md` es el punto de entrada (estado + índice); `HANDOFF.md` se eliminó y su contenido pasó a
  `REGLAS.md` §2 y `TAREAS.md`. La bitácora sigue en `BITACORA.md`. El pre-commit queda inactivo hasta que haya código.
- **Consecuencias:** una sola fuente para estado y cola de trabajo. Las sesiones arrancan leyendo `REGLAS.md` (vía `CLAUDE.md`).
