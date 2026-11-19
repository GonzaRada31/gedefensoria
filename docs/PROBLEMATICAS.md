# Registro de Problemáticas y Cuellos de Botella

Este documento recopila de manera exhaustiva todos los inconvenientes, limitaciones y puntos de dolor (tanto técnicos como funcionales) del ecosistema actual de la Defensoría del Pueblo de Jujuy. Cada problemática aquí listada servirá de insumo directo para diseñar las soluciones del nuevo sistema.

---

## 1. Problemáticas Funcionales y Operativas
*Limitaciones en el flujo de trabajo diario de los operadores y en la interacción con el ciudadano.*

*   **PF-001: Fragmentación de Canales de Entrada**
    *   *Descripción:* Al ingresar reclamos por tantos medios diferentes (Presencial, WhatsApp, Mail, Web, Redes), los operadores deben duplicar tareas para unificarlos, o bien algunos casos quedan sin registrar.
*   **PF-002: Inconsistencias en el Registro de Personas**
    *   *Descripción:* Falta de validación fuerte de identidad en el ingreso, lo que puede provocar duplicaciones (ej. una misma persona registrada con DNI y luego sin información o con errores de tipeo en el nombre).
*   **PF-003: Sub-registro de Consultas Múltiples**
    *   *Descripción:* Cuando un Actuante realiza múltiples consultas diferentes en una sola visita presencial, el sistema actual no facilita registrarlas de forma individualizada para cada asesoramiento, distorsionando las estadísticas de carga de trabajo de los asesores.
*   **PF-004: Dificultad para Gestionar Consultas Grupales**
    *   *Descripción:* Registrar y asociar fluidamente a varias personas que asisten juntas a una única consulta es engorroso, lo que lleva a que solo se registre a una persona ("principal") y se pierda el registro del resto.
*   **PF-005: Falta de Sincronización en la Cola de Espera**
    *   *Descripción:* Mesa de Entradas no tiene una forma ágil de monitorear el tiempo de espera real de los ciudadanos, y los Asesores no pueden pre-visualizar el historial de la persona que está esperando antes de hacerla pasar al consultorio.
*   **PF-006: Bloqueo Síncrono del Flujo de Pases (Fricción Crítica)**
    *   *Descripción:* Cuando el operador de Mesa de Entradas le deriva ("pasa") un ciudadano a un Asesor, la pantalla de ME queda completamente congelada/bloqueada esperando que el Asesor acepte el pase de forma síncrona. Si el Asesor se demora, ME no puede seguir registrando a otras personas.
*   **PF-007: Visibilidad Oculta del Motivo de Consulta en la Fila**
    *   *Descripción:* Desde la lista general de personas en espera, el personal de Mesa de Entradas solo ve el nombre, tiempo y Asesor asignado, pero no el motivo de la consulta a menos que hagan clic para abrir el detalle completo del registro.
*   **PF-008: Fuga de Permisos y Menús Saturados (Sin Contexto de Rol)**
    *   *Descripción:* El sistema legacy expone una enorme barra de menús con opciones de configuración crítica y seguridad a perfiles que no deberían tener acceso (ej. un usuario con rol `ADMINISTRATIVO` normal está viendo las opciones de un `SUPERADM`). Esto no solo abruma al operador, sino que representa una gravísima falla de seguridad y diseño que se solucionará aplicando un control de accesos basado en roles (RBAC) estricto en la nueva arquitectura web.
*   **PF-009: Anti-patrón de Búsqueda de Antecedentes (UX)**
    *   *Descripción:* Para saber si un ciudadano ya vino a la Defensoría en el pasado, el operador de Mesa de Entradas se ve forzado a ir a la vista general, cambiar el estado a "TODAS" y borrar manualmente el filtro de fecha "De" (que viene fijo en el día actual). Esta mezcla de filtros temporales con búsqueda global ralentiza enormemente la atención al público.

---

## 2. Problemáticas Técnicas y Tecnológicas
*Limitaciones de la plataforma de software anterior, la base de datos o la infraestructura.*

*   **PT-001: Arquitectura de Escritorio Legada (Legacy)**
    *   *Descripción:* El sistema actual es de escritorio (desktop), lo que dificulta las actualizaciones, requiere instalación manual en cada computadora y limita el acceso remoto o el teletrabajo.
*   **PT-002: Dificultad para Generar Reportes y Estadísticas**
    *   *Descripción:* Extraer datos consolidados o métricas de gestión para la toma de decisiones políticas (como la cantidad de reclamos por barrio o tiempos de resolución de trámites) es complejo y requiere consultas manuales a la base de datos.
*   **PT-003: Rigidez en la Relación de Actuaciones y Trámites**
    *   *Descripción:* El sistema actual tiene dificultades para relacionar de forma flexible un trámite con múltiples actuaciones (relación N:M), lo que genera duplicación de expedientes o trámites cargados de manera aislada.
*   **PT-004: Complejidad en la Digitalización y Adjuntos**
    *   *Descripción:* La carga de PDFs o imágenes escaneadas de las actuaciones o trámites específicos es lenta y propensa a fallas, careciendo de un visor integrado ágil para los administradores y asesores.
*   **PT-005: Servidores e Infraestructura de Hardware Obsoleta**
    *   *Descripción:* El sistema opera en intranet con servidores locales de pocos recursos (Windows Server para aplicación y Linux para BD) que cuentan con discos mecánicos (HDD) y memoria RAM muy limitada. El nuevo sistema web debe ser extremadamente liviano y optimizado para funcionar bajo estas condiciones.
*   **PT-006: Motor FoxPro Legado y Bloqueo de Despliegue en Windows 11**
    *   *Descripción:* Diseñado en 2006 (era Windows XP/monitores CRT) utilizando un motor tipo Visual FoxPro. No cuenta con interfaz responsiva y, críticamente, los sistemas de seguridad de Windows 11 catalogan los archivos del instalador viejo como virus/malware, bloqueando por completo la instalación en nuevas computadoras.

---

## 3. Cuellos de Botella Críticos (Bottlenecks)
*Procesos que ralentizan significativamente la gestión de expedientes y la respuesta al ciudadano.*

*   **CB-001: Re-tipeo de Datos en Consultas de Continuidad**
    *   *Descripción:* Cuando un Actuante viene por un tema de seguimiento atendido previamente por el mismo asesor, el operador de Mesa de Entradas debe escribir toda la información de nuevo. Falta una función que clone o precargue los datos de la consulta anterior de referencia.
*   **CB-002: Carga Manual y Fragmentada de Archivos**
    *   *Descripción:* El proceso para adjuntar y digitalizar expedientes físicos requiere múltiples pasos manuales y no asocia automáticamente la documentación escaneada al trámite correspondiente dentro de la actuación.
*   **CB-003: Multi-ventanas y Saturación por Bloqueo de Pases**
    *   *Descripción:* Al bloquearse la pantalla de ME durante los pases de consultas, el personal se ve obligado a abrir más de 10 instancias simultáneas de la aplicación de escritorio. Esto agota la memoria RAM del equipo cliente, sobrecarga la base de datos del servidor y genera fricciones en el equipo de trabajo.
*   **CB-004: Alta Fragmentada de Personal y Asesores**
    *   *Descripción:* Para registrar un nuevo Asesor y ponerlo operativo, el administrador debe navegar por múltiples pantallas y submódulos desconectados (crear el empleado, luego ir a otro módulo para buscar el sector, y finalmente relacionarlos de forma manual). Este flujo fragmentado causa ineficiencia y riesgo de crear empleados "huérfanos" sin sector asignado.
