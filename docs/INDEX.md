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
| **Punto de entrada (Claude y equipo)** | [REGLAS.md](../REGLAS.md) | Objetivo, estado actual, próximo paso y reglas de trabajo. | Actualizado |
| **Tareas** | [docs/TAREAS.md](TAREAS.md) | Cola de trabajo por fase (checklist). | Actualizado |
| **Preguntas pendientes** | [docs/PREGUNTAS.md](PREGUNTAS.md) | Definiciones que faltan, con criterio por defecto. | Actualizado |
| **Decisiones** | [docs/DECISIONES.md](DECISIONES.md) | Registro de decisiones de arquitectura (D-001…). | Actualizado |
| **Bitácora** | [docs/BITACORA.md](BITACORA.md) | Qué se hizo en cada sesión. | Actualizado |
| **QA** | [docs/QA.md](QA.md) | Método y registro de pruebas en navegador. | Creado |

---

## 2. Relevamiento y Diagnóstico (As-Is)
*Análisis detallado de cómo opera el sistema de escritorio actual y qué problemas presenta.*

| Documento | Ubicación | Módulo / Propósito | Estado |
| :--- | :--- | :--- | :--- |
| **Relevamiento de Procesos** | [docs/RELEVAMIENTO.md](RELEVAMIENTO.md) | Análisis de flujos actuales, datos ingresados (Personas, Barrios, Canales). | En Progreso (50%) |
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
| **Arquitectura de Software** | [docs/ARQUITECTURA.md](ARQUITECTURA.md) | Stack tecnológico (React + NestJS + PostgreSQL + Azure), flujos de datos. | Borrador de Stack |
| **Modelo de Datos** | [docs/MODELO-DATOS.md](MODELO-DATOS.md) | Diagramas ER, índices y pendientes del modelo (PostgreSQL). | Borrador v0.1 |
| **DevOps** | [docs/DEVOPS.md](DEVOPS.md) | Entorno local, límites de memoria de Docker, CI, entornos y opciones de alojamiento. | Propuesta v0.1 |
| **Informes** | [docs/INFORMES.md](INFORMES.md) | Cómo se cuenta cada número y catálogo de informes por perfil. | Plan v0.1 |
| **Programas** | [docs/PROGRAMAS.md](PROGRAMAS.md) | Defensoría Móvil y otros programas: operativos, lugares, actividades. | Propuesta v0.1 |
| **Acceso y Panel** | [docs/SEGURIDAD-ACCESO.md](SEGURIDAD-ACCESO.md) | Ingreso, sesión única, invitaciones, Panel del Superadministrador. | Plan v0.1 |
| **Marco Legal** | [docs/MARCO-LEGAL.md](MARCO-LEGAL.md) | Ley 6380, Constitución 2023, datos personales: impacto en el sistema. | Investigación v0.1 |
| **Mensajes a sectores** | [docs/MENSAJES-SECTORES.md](MENSAJES-SECTORES.md) | Pedidos de información a Secretarías y Autoridades. | Listos para enviar |
| **Manual de Procedimientos** | [docs/manual/README.md](manual/README.md) | Procedimientos por área; base del Centro de ayuda. | Iniciado |
| **Prompts para Gemini** | [capturas](PROMPT-GEMINI-CAPTURAS.md) · [interfaz](PROMPT-GEMINI-UI.md) | Relevar capturas del FoxPro · prototipo de interfaz. | Listos |

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
