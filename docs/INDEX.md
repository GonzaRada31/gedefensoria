# Índice de Documentación Profesional

Este índice actúa como el mapa central de toda la documentación del **Sistema de Gestión de Actuaciones** de la Defensoría del Pueblo de Jujuy. Organiza los archivos por fase del proyecto, área funcional y módulo del sistema para una navegación rápida y profesional.

---

## 1. Documentación General y Gestión del Proyecto
*Documentos de alto nivel sobre la planificación, la visión general y la filosofía del proyecto.*

| Documento | Ubicación | Módulo / Propósito | Estado |
| :--- | :--- | :--- | :--- |
| **README principal** | [README.md](file:///c:/Users/redex/Documents/GitHub/Defensoria/README.md) | Visión global, objetivos de la institución y guía rápida. | Actualizado |
| **Roadmap del Proyecto** | [docs/ROADMAP.md](file:///c:/Users/redex/Documents/GitHub/Defensoria/docs/ROADMAP.md) | Fases de desarrollo, tareas pendientes e hitos clave. | En Progreso (Fase 1) |
| **Filosofía de Diseño** | [docs/FILOSOFIA_DISENO.md](file:///c:/Users/redex/Documents/GitHub/Defensoria/docs/FILOSOFIA_DISENO.md) | Principios de diseño, migración de datos y mentalidad To-Be. | Creado |
| **Índice de Docs** | [docs/INDEX.md](file:///c:/Users/redex/Documents/GitHub/Defensoria/docs/INDEX.md) | Este mapa interactivo de la documentación. | Actualizado |

---

## 2. Relevamiento y Diagnóstico (As-Is)
*Análisis detallado de cómo opera el sistema de escritorio actual y qué problemas presenta.*

| Documento | Ubicación | Módulo / Propósito | Estado |
| :--- | :--- | :--- | :--- |
| **Relevamiento de Procesos** | [docs/RELEVAMIENTO.md](file:///c:/Users/redex/Documents/GitHub/Defensoria/docs/RELEVAMIENTO.md) | Análisis de flujos actuales, datos ingresados (Personas, Barrios, Canales). | En Progreso |
| **Registro de Problemáticas** | [docs/PROBLEMATICAS.md](file:///c:/Users/redex/Documents/GitHub/Defensoria/docs/PROBLEMATICAS.md) | Detalle de dolores, cuellos de botella (PF / PT / CB). | Creado |

---

## 3. Especificación Funcional del Nuevo Sistema (To-Be)
*Planificación de los requerimientos y módulos que integrarán la nueva solución.*

| Documento | Ubicación | Módulo / Propósito | Estado |
| :--- | :--- | :--- | :--- |
| **Requerimientos Funcionales** | [docs/REQUERIMIENTOS.md](file:///c:/Users/redex/Documents/GitHub/Defensoria/docs/REQUERIMIENTOS.md) | Requerimientos mínimos del MVP (Buscador, registro, trazabilidad). | Pendiente de Definir |

---

## 4. Diseño Técnico e Infraestructura
*Planificación técnica, arquitectura de software y estrategia de despliegue continuo.*

| Documento | Ubicación | Módulo / Propósito | Estado |
| :--- | :--- | :--- | :--- |
| **Arquitectura de Software** | [docs/ARQUITECTURA.md](file:///c:/Users/redex/Documents/GitHub/Defensoria/docs/ARQUITECTURA.md) | Stack tecnológico, diagramas de base de datos y flujos de datos. | Borrador de Stack / En Definición |
| **Estrategia DevOps** | `docs/DEVOPS.md` | Contenedores (Docker), pipeline de CI/CD y despliegue a staging. | *Pendiente (Post Relevamiento)* |

---

## 5. Mapeo Temático por Módulos del Sistema
A medida que desarrollemos el software, las especificaciones se organizarán según los siguientes módulos funcionales:

*   **Módulo de Personas (Ciudadanos y Organizaciones):**
    *   Relevamiento en: [docs/RELEVAMIENTO.md#estructura-del-registro-de-personas-extraida-del-sistema-actual](file:///c:/Users/redex/Documents/GitHub/Defensoria/docs/RELEVAMIENTO.md#estructura-del-registro-de-personas-extraida-del-sistema-actual)
    *   Requerimientos en: [docs/REQUERIMIENTOS.md](file:///c:/Users/redex/Documents/GitHub/Defensoria/docs/REQUERIMIENTOS.md)
*   **Módulo de Actuaciones (Expedientes y Seguimiento):**
    *   Relevamiento en: [docs/RELEVAMIENTO.md](file:///c:/Users/redex/Documents/GitHub/Defensoria/docs/RELEVAMIENTO.md)
    *   Requerimientos en: [docs/REQUERIMIENTOS.md](file:///c:/Users/redex/Documents/GitHub/Defensoria/docs/REQUERIMIENTOS.md)
*   **Módulo de Notificaciones (Email/WhatsApp):**
    *   Planificado en: [docs/ROADMAP.md#fase-4-funcionalidades-avanzadas](file:///c:/Users/redex/Documents/GitHub/Defensoria/docs/ROADMAP.md#fase-4-funcionalidades-avanzadas)
