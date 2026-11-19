# Tareas

> Checklist por fase. Marcar `[x] (AAAA-MM-DD)` al completar. La cola de arriba es la que se trabaja en modo continuo.
> Fases de alto nivel en `ROADMAP.md`. Detalle de cada vista legacy en `RELEVAMIENTO.md` §7 (buscar por ID).

## Fase 1 — Análisis y Definición (actual)

### Relevamiento del sistema legacy (12 de 24 auditadas)
Las vistas marcadas con 📷 necesitan capturas o descripción del FoxPro por parte del usuario.
- [ ] 📷 `V-AS-02` Registro de Actuaciones — campos obligatorios, numeración central o por delegación **(prioridad 1)**
- [ ] 📷 `V-ME-03` Pre-Consultas — agenda de audiencias, nomenclador propio o texto libre
- [ ] 📷 `V-ADM-02` Digitalización y adjuntos — ¿por actuación o por trámite?, visor
- [ ] 📷 `V-ADM-03` Remitos — datos que lleva, circulación entre delegaciones
- [ ] 📷 `V-DEF-01` Geografía (países → provincias → departamentos → localidades → barrios)
- [ ] 📷 `V-DEF-02` Nomenclador (Área → Grupo → Tema → Subtema)
- [ ] 📷 `V-DEF-03` Instituciones externas (organismos y prestatarias: Ejesa, Agua de los Andes…)
- [ ] 📷 `V-REP-01` Planillas de búsqueda y consultas — filtros, exportación
- [ ] 📷 `V-REP-02` Circuito interno y reportes de actuación — trazabilidad
- [ ] 📷 `V-REP-03` Novedades y carga por asesor
- [ ] 📷 `V-SEC-02` Perfiles y autorizaciones granulares
- [ ] 📷 `V-HER-01` Herramientas (utilidades locales)
- [x] (2026-05-26) 12 vistas auditadas: V-SEC-01, V-ADM-01, V-ME-01, P-ME-02, V-ME-04, P-AS-01, V-AS-03, P-INT-01,
  P-TR-01, P-TR-02, P-TR-03, V-PE-01

### Diseño
- [ ] Borrador del diagrama ER (Persona/Actuante, Consulta, Actuación, Trámite N:M, Empleado, Sector, Delegación,
  Nomenclador, Institución, Geografía, Libro Diario, Auditoría) → `docs/MODELO-DATOS.md` (mermaid). Lo que dependa de
  V-AS-02 queda marcado.
- [ ] `docs/DEVOPS.md`: Docker local, GitHub Actions (lint, tipos, tests), Azure (Container Apps / App Service,
  PostgreSQL Flexible, Blob), entornos y secretos.
- [ ] Mapa de roles y permisos (matriz rol × acción) una vez respondidas ROL-01/02/03.

### Definiciones institucionales (dependen del usuario / la Defensoría)
- [ ] ROL-01 Secretaría General y Legal y Técnica · ROL-02 Secretaría Privada · ROL-03 Autoridades (ver `PREGUNTAS.md`)
- [ ] LEGAL-01 Competencia legal ante organismos y privados
- [ ] Foto de una hoja real del Libro Diario

### Metodología
- [x] (2026-11-19) Repo clonado en la PC de la Defensoría; kit de metodología instalado y adaptado (REGLAS, skills, docs)

## Fase 2 — Scaffolding y MVP (cuando cierre la Fase 1)
- [ ] `docs/PLAN-FASE2.md`: estructura del monorepo, módulos NestJS, orden de construcción → aprobación
- [ ] Monorepo React + NestJS + Prisma; Docker Compose local (PostgreSQL, Redis)
- [ ] Ajustar `.githooks/pre-commit` a los comandos reales y activarlo (`git config core.hooksPath .githooks`)
- [ ] CI en GitHub Actions
- [ ] Seeder de catálogos (geografía, nomenclador, empleados) desde la base vieja o CSV (RNF-005)
- [ ] Usuarios, roles y auditoría
- [ ] Actuantes y búsqueda (RF-ME-001/002)
- [ ] Mesa de Entradas: consultas, pre-consultas, pases en tiempo real (RF-ME-003…008)
- [ ] Bandeja del Asesor y Actuaciones (RF-AS-001…003, 005)
- [ ] Trámites, Libro Diario, Pedidos de Informe y plazos (RF-AS-004, 006…010, RF-AD-005)
