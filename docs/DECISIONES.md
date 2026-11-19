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

## D-004 — Convenciones del modelo de datos (2026-11-19, criterio por defecto)
- **Contexto:** hace falta un borrador del modelo para avanzar sin esperar todas las vistas legacy.
- **Decisión:** nombres en español con la terminología del dominio; UUID v7 en entidades operativas e `int` en
  catálogos; número oficial separado de la clave; nunca `DELETE` en tablas operativas (anular/desactivar); catálogos en
  tablas administrables y enums solo para estados de la máquina de estados; entidad nueva **Atención** que agrupa las
  consultas de una visita (resuelve consulta múltiple e indicador multi-temático). Detalle en `MODELO-DATOS.md`.
- **Consecuencias:** se puede cambiar sin costo hasta la primera migración (Fase 2). Lo marcado ⏳ en el modelo
  depende de vistas sin auditar y de P1, P7–P9.

## D-005 — App portable y alojamiento en Argentina (2026-11-19) — ⏳ PROPUESTA, falta confirmación
- **Contexto:** la Defensoría no puede pagar en dólares ni al exterior (P11); los datos son sensibles (Ley 25.326,
  art. 12) y el organismo controla al Poder Ejecutivo (independencia). D-002 (Azure) choca con esto.
- **Propuesta:** la app se construye **portable**: contenedores Docker, PostgreSQL estándar, almacenamiento
  compatible con S3 (MinIO en local), secretos por variables de entorno, sin servicios exclusivos de una nube.
  Producción en **ARSAT o un proveedor argentino en pesos**; la infraestructura provincial (AWS) queda como
  alternativa con convenio. Detalle y comparación en `DEVOPS.md` §5.
- **Consecuencias:** si se confirma, D-002 queda reemplazada. El desarrollo local no cambia (salvo MinIO en lugar de
  Azurite). La elección final del proveedor necesita el visto bueno de Legal y Técnica y de las Autoridades.

## D-006 — Modo sin conexión como PWA (2026-11-19) — ⏳ PROPUESTA
- **Contexto:** la Defensoría Móvil carga consultas en territorio, a veces sin internet (P13).
- **Propuesta:** la misma app web instalable como PWA, con guardado local cifrado (IndexedDB), cola de
  sincronización e identificadores UUID generados en el equipo; los números oficiales se asignan en el servidor.
  Alcance limitado a registrar atenciones, consultas y talleres. Plan en `PROGRAMAS.md` §6.
- **Consecuencias:** se construye después del núcleo, pero desde ahora los modelos usan UUID generables en el
  cliente y validación compartida (Zod en `packages/shared`) para que el equipo valide igual que el servidor.
