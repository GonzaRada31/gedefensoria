# Índice de Documentación Profesional

Este índice actúa como el mapa central de toda la documentación del **Sistema de Gestión de Actuaciones** de la Defensoría del Pueblo de Jujuy. Organiza los archivos por fase del proyecto, área funcional y módulo del sistema para una navegación rápida y profesional.

---

## 1. Documentación General y Gestión del Proyecto
*Documentos de alto nivel sobre la planificación, la visión general y la filosofía del proyecto.*

| Documento | Ubicación | Módulo / Propósito | Estado |
| :--- | :--- | :--- | :--- |
| **README principal** | [README.md](../README.md) | Visión global, objetivos de la institución y guía rápida. | Actualizado |
| **Roadmap del Proyecto** | [docs/ROADMAP.md](ROADMAP.md) | Fases de desarrollo, tareas pendientes e hitos clave. | En Progreso (Fase 1) |
| **Filosofía de Diseño** | [docs/FILOSOFIA_DISENO.md](FILOSOFIA_DISENO.md) | Principios de diseño, migración de datos y mentalidad To-Be. | Creado |
| **Índice de Docs** | [docs/INDEX.md](INDEX.md) | Este mapa interactivo de la documentación. | Actualizado |
| **Handoff / Estado Actual** | [docs/HANDOFF.md](HANDOFF.md) | Estado del proyecto, punto de retoma exacto y cola de trabajo. | Actualizado |

---

## 2. Relevamiento y Diagnóstico (As-Is)
*Análisis detallado de cómo opera el sistema de escritorio actual y qué problemas presenta.*

| Documento | Ubicación | Módulo / Propósito | Estado |
| :--- | :--- | :--- | :--- |
| **Relevamiento de Procesos** | [docs/RELEVAMIENTO.md](RELEVAMIENTO.md) | Análisis de flujos actuales, datos ingresados (Personas, Barrios, Canales). | En Progreso (55%) |
| **Registro de Problemáticas** | [docs/PROBLEMATICAS.md](PROBLEMATICAS.md) | Detalle de dolores, cuellos de botella (PF / PT / CB). | Creado |

---

## 3. Especificación Funcional del Nuevo Sistema (To-Be)
*Planificación de los requerimientos y módulos que integrarán la nueva solución.*

| Documento | Ubicación | Módulo / Propósito | Estado |
| :--- | :--- | :--- | :--- |
| **Requerimientos Funcionales** | [docs/REQUERIMIENTOS.md](REQUERIMIENTOS.md) | RF y RNF del MVP (Mesa de Entradas, Asesores, Administración). | Borrador Completo |

---

## 4. Diseño Técnico e Infraestructura
*Planificación técnica, arquitectura de software y estrategia de despliegue continuo.*

| Documento | Ubicación | Módulo / Propósito | Estado |
| :--- | :--- | :--- | :--- |
| **Arquitectura de Software** | [docs/ARQUITECTURA.md](ARQUITECTURA.md) | Stack tecnológico (React + NestJS + PostgreSQL + Azure), flujos de datos. | Borrador de Stack — Falta ER |
| **Estrategia DevOps** | `docs/DEVOPS.md` | Contenedores (Docker), pipeline de CI/CD y despliegue a staging. | *Pendiente (Post Relevamiento)* |

---

## 5. Mapeo Temático por Módulos del Sistema
A medida que desarrollemos el software, las especificaciones se organizarán según los siguientes módulos funcionales:

*   **Módulo de Personas (Ciudadanos y Organizaciones):**
    *   Relevamiento en: [docs/RELEVAMIENTO.md — Ficha V-PE-01](RELEVAMIENTO.md#ficha-v-pe-01-formulario-de-administración-de-personas--ciudadanos)
    *   Requerimientos en: [docs/REQUERIMIENTOS.md — RF-ME-001/002](REQUERIMIENTOS.md)
*   **Módulo de Actuaciones (Expedientes y Seguimiento):**
    *   Relevamiento en: [docs/RELEVAMIENTO.md](RELEVAMIENTO.md)
    *   Requerimientos en: [docs/REQUERIMIENTOS.md — RF-AS-003/004](REQUERIMIENTOS.md)
*   **Módulo de Trámites (Hitos N:M):**
    *   Relevamiento en: [docs/RELEVAMIENTO.md — Ficha V-AS-03 / Sección 8](RELEVAMIENTO.md)
    *   Requerimientos en: [docs/REQUERIMIENTOS.md — RF-AS-004 al RF-AS-010](REQUERIMIENTOS.md)
*   **Módulo de Mesa de Entradas (Cola y Pases):**
    *   Relevamiento en: [docs/RELEVAMIENTO.md — Sección 4](RELEVAMIENTO.md)
    *   Requerimientos en: [docs/REQUERIMIENTOS.md — RF-ME-001 al RF-ME-008](REQUERIMIENTOS.md)
*   **Módulo de Notificaciones (Email/WhatsApp):**
    *   Planificado en: [docs/ROADMAP.md — Fase 4](ROADMAP.md#fase-4-funcionalidades-avanzadas)
