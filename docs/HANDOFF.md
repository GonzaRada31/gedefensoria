# Estado del Proyecto y Punto de Retoma

**Última actualización:** 2026-11-19
**Repositorio:** https://github.com/GonzaRada31/gedefensoria
**Clonar en nueva máquina:** `git clone https://github.com/GonzaRada31/gedefensoria.git`

---

## 1. Resumen Ejecutivo

El proyecto está en **Fase 1 — Análisis y Definición**. No hay código escrito aún. Todo el trabajo realizado hasta la fecha es documentación de relevamiento, requerimientos y arquitectura.

| Área | Estado |
| :--- | :--- |
| Relevamiento del sistema legacy (FoxPro) | 🟡 En Progreso — 12 de 22 vistas auditadas (55%) |
| Requerimientos Funcionales y No Funcionales | 🟢 Borrador Completo |
| Stack tecnológico y arquitectura base | 🟢 Definido — Falta diagrama ER |
| Repositorio Git / GitHub | 🟢 Creado y operativo |
| Diagrama ER de base de datos | 🔴 Pendiente |
| Documento DEVOPS.md | 🔴 Pendiente |
| Código fuente | 🔴 No iniciado |

---

## 2. Lo que está completamente documentado

### Relevamiento auditado (12 vistas)

| ID | Nombre | Módulo |
| :--- | :--- | :--- |
| `V-SEC-01` | Inicio de Sesión y Perfiles | Acceso y Seguridad |
| `V-ADM-01` | Gestión de Empleados y Sectores | Administración |
| `V-ME-01` | Dashboard Operativo de Mesa de Entradas | Mesa de Entradas |
| `P-ME-02` | Flujo de Pase de Consulta (bloqueo síncrono → solución async) | Mesa de Entradas |
| `V-ME-04` | Formulario de Registro de Consultas | Mesa de Entradas |
| `P-AS-01` | Consultas Múltiples y Creación Autónoma por Asesor | Atención |
| `V-AS-03` | Administración de Trámites (grilla N:M) | Atención |
| `P-INT-01` | Circuito Interno de Pases Físicos | Circuito Interno |
| `P-TR-01` | Ciclo Borrador → Definitivo + Libro Diario Digital | Trámites |
| `P-TR-02` | Pedidos de Informe + Reiteraciones + Semáforos | Trámites |
| `P-TR-03` | Cierre de Actuaciones (Acta / Constancia) | Trámites |
| `V-PE-01` | Formulario de Administración de Personas / Ciudadanos | Personas |

### Requerimientos documentados
- **27 Requerimientos Funcionales** distribuidos en 3 módulos: Mesa de Entradas (RF-ME-001 al 008), Asesores (RF-AS-001 al 010), Administración (RF-AD-001 al 007). Ver [REQUERIMIENTOS.md](REQUERIMIENTOS.md).
- **5 Requerimientos No Funcionales** (rendimiento en hardware viejo, WebSockets, RBAC, responsividad, seeder de migración).

### Arquitectura definida
Stack: **React + TypeScript** (frontend) · **NestJS + TypeScript** (backend) · **PostgreSQL + Prisma** (base de datos) · **Azure** (cloud) · **Socket.io** (tiempo real) · **TailwindCSS + shadcn/ui** (UI). Ver [ARQUITECTURA.md](ARQUITECTURA.md).

---

## 3. Punto de retoma exacto

**Comenzar por `V-AS-02 — Registro de Actuaciones (Expedientes)`.**

Es la vista más crítica pendiente: define cómo se genera el expediente principal del sistema, sus campos obligatorios y las reglas de numeración (¿centralizada o por delegación?). Sin esto, el diseño del esquema de base de datos está incompleto.

**Para auditarla:** compartir capturas del formulario de FoxPro para crear/editar una Actuación.

---

## 4. Cola de trabajo completa — Relevamiento pendiente

Ordenado por prioridad:

| # | ID | Nombre | Módulo | Qué se necesita |
|:---:|:---:|:---|:---|:---|
| 1 | `V-AS-02` | **Registro de Actuaciones (Expedientes)** | Atención | Captura del formulario FoxPro. Resolver: campos obligatorios, numeración centralizada o por delegación. |
| 2 | `V-ME-03` | **Pre-Consultas** | Mesa de Entradas | Captura de la grilla. Resolver: ¿vinculación a calendario de audiencias? ¿nomenclador propio o texto libre? |
| 3 | `V-ADM-02` | **Módulo de Digitalización y Adjuntos** | Administración | Captura del módulo. Resolver: ¿se adjunta por trámite o por actuación? ¿cómo funciona el visor legacy? |
| 4 | `V-ADM-03` | **Generación y Emisión de Remitos** | Administración | Captura del formulario. Resolver: ¿qué datos lleva el remito? ¿cómo circula entre delegaciones? |
| 5 | `V-DEF-01` | **Gestión Geográfica (Barrios/Localidades)** | Tablas Maestras | Descripción o captura de la jerarquía geográfica y su interfaz de carga. |
| 6 | `V-DEF-02` | **Taxonomía de Problemáticas (Nomenclador)** | Tablas Maestras | Descripción o captura de la interfaz Área → Grupo → Tema → Subtema. |
| 7 | `V-DEF-03` | **Relación con Instituciones Externas** | Tablas Maestras | Descripción del registro de organismos y empresas prestatarias (Ejesa, etc.). |
| 8 | `V-REP-01` | **Planillas de Búsqueda y Consultas** | Reportes | Captura del módulo de reportes: filtros, exportación Excel/PDF. |
| 9 | `V-REP-02` | **Circuito Interno y Reportes de Actuación** | Reportes | Captura del reporte de trazabilidad histórica de un expediente. |
| 10 | `V-SEC-02` | **Gestión de Perfiles y Autorizaciones** | Seguridad | Captura de la interfaz de permisos granulares de FoxPro. |

---

## 5. Lo que falta para completar la Fase 1 e iniciar código

1. **Terminar el relevamiento** (10 vistas pendientes, priorizando `V-AS-02`).
2. **Diseñar el diagrama ER** de la base de datos (entidades: Persona, Consulta, Actuación, Trámite, Empleado, Nomenclador, etc.).
3. **Crear `docs/DEVOPS.md`** con la estrategia Docker + GitHub Actions + Azure.
4. **Validar con la Defensoría** los roles jerárquicos pendientes: `ROL-01` (Sec. General), `ROL-02` (Sec. Privada), `ROL-03` (Autoridades). Ver [FILOSOFIA_DISENO.md](FILOSOFIA_DISENO.md#4-tablero-de-control-de-definiciones-pendientes-tracking).

Una vez completados estos cuatro puntos, la Fase 1 estará cerrada y se puede iniciar el scaffolding del proyecto (Fase 2).

---

## 6. Referencia rápida de documentos

| Documento | Propósito |
| :--- | :--- |
| [RELEVAMIENTO.md](RELEVAMIENTO.md) | Auditoría del sistema legacy + bitácora de sesiones |
| [REQUERIMIENTOS.md](REQUERIMIENTOS.md) | RF y RNF formales del MVP |
| [ARQUITECTURA.md](ARQUITECTURA.md) | Stack tecnológico y decisiones de diseño |
| [FILOSOFIA_DISENO.md](FILOSOFIA_DISENO.md) | Principios del proyecto y definiciones institucionales pendientes |
| [PROBLEMATICAS.md](PROBLEMATICAS.md) | Catálogo de dolores y cuellos de botella del sistema actual |
| [ROADMAP.md](ROADMAP.md) | Fases e hitos del proyecto |
