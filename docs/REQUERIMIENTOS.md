# Especificación de Requerimientos del Sistema (MVP)

Este documento especifica formalmente los requerimientos funcionales y no funcionales que debe cumplir el nuevo **Sistema de Gestión de Actuaciones** para la Defensoría del Pueblo de Jujuy, estructurado bajo el modelo To-Be de calidad Enterprise.

---

## 1. Requerimientos Funcionales (RF)

### A. Módulo: Mesa de Entradas (RF-ME)
*Funcionalidades específicas para el personal de recepción y registro inicial.*

*   **RF-ME-001: Registro Completo de Actuantes**
    *   *Descripción:* Permitir registrar personas tanto Físicas como Organizaciones (Razón Social). Debe incluir tipo de documento (`DNI`, `LC`, `LE`, `PASAPORTE`, `SIN INFORMACIÓN`), número de identificación, fecha de nacimiento (cálculo de edad automático), datos de domicilio estructurados (Calle, Nro) y datos de contacto (Teléfono, Mail).
*   **RF-ME-002: Buscador Avanzado de Personas**
    *   *Descripción:* Proveer un buscador rápido y flexible con filtros concurrentes por DNI, Nombre, Apellido, Calle o Barrio para ubicar antecedentes al instante.
*   **RF-ME-003: Registro de Consultas y Pre-consultas**
    *   *Descripción:* Permitir registrar el motivo de la visita. Si no amerita derivación a un asesor (pedidos de audiencias, consultas administrativas generales), se registrará como "Pre-consulta" y finalizará en la misma Mesa de Entradas sin generar actuaciones.
*   **RF-ME-004: Registro de Consultas Grupales**
    *   *Descripción:* Permitir asociar múltiples Actuantes a una única consulta cuando asisten en grupo por una misma problemática.
*   **RF-ME-005: Detección Automática de Antecedentes y Asesor Previo**
    *   *Descripción:* Al ingresar un Actuante ya registrado, el sistema debe alertar visualmente al operador quién lo atendió antes, el tema, la actuación abierta, si tenía documentación pendiente de entrega y el estado general del trámite.
*   **RF-ME-006: Clonación de Datos para Consultas de Continuidad y Nuevas Problemáticas**
    *   *Descripción:* Proveer una función de "Consulta Similar" que clone toda la información (persona o grupo de personas, domicilio y contacto) de una consulta previa, permitiendo al operador de Mesa de Entradas modificar únicamente la problemática para generar rápidamente una nueva consulta o derivación de seguimiento sin re-tipear datos redundantes.
*   **RF-ME-007: Derivación Asíncrona de Consultas (Pase de Consulta)**
    *   *Descripción:* Permitir enviar la consulta ("dar el pase") a la cola de espera de un Asesor en forma totalmente asíncrona. La pantalla de Mesa de Entradas debe quedar liberada inmediatamente para continuar con la atención de otros ciudadanos, sin esperar síncronamente la aceptación del Asesor.
*   **RF-ME-008: Visibilidad Detallada en Cola de Espera y Estado de Atención**
    *   *Descripción:* Mostrar la cola de personas en espera y en proceso de atención en tiempo real, incluyendo nombre del ciudadano, tiempo transcurrido, Asesor asignado y el motivo/área temática del reclamo de forma visible directa en la grilla. Si la atención en curso posee múltiples consultas de diferentes temáticas registradas por el Asesor, el panel de ME debe mostrar de forma explícita un indicador visual de "Atención Multi-temática" (o "Múltiples Consultas") con el conteo correspondiente.

### B. Módulo: Asesores (RF-AS)
*Funcionalidades específicas para los profesionales de atención (Abogados, Psicólogos, TS, etc.).*

*   **RF-AS-001: Dashboard de Atención en Tiempo Real**
    *   *Descripción:* Bandeja de entrada propia para el Asesor que muestra las derivaciones pendientes de Mesa de Entradas con alertas visuales de tiempo de espera y el historial previo del Actuante seleccionable para lectura antes de llamarlo a pasar.
*   **RF-AS-002: Registro de Múltiples Consultas y Creación Autónoma**
    *   *Descripción:* Si durante una entrevista presencial el Actuante plantea problemáticas diferentes, permitir al Asesor asentar múltiples consultas de forma autónoma. El profesional podrá generar y registrar nuevas consultas clonando la sesión en curso y modificando únicamente la temática y su dictamen. Esto evita la necesidad de que Mesa de Entradas cargue una nueva derivación manual. Estas consultas quedarán vinculadas a la misma sesión de atención física y se sincronizarán en tiempo real en la pantalla de Mesa de Entradas.
*   **RF-AS-003: Clasificación y Generación de Actuaciones (Servicio vs Conflicto)**
    *   *Descripción:*
        *   **Actuación de Servicio:** Cierre rápido de expediente en el mismo acto de la consulta.
        *   **Actuación de Conflicto:** Generación de expediente formal para su posterior trámite e investigación.
*   **RF-AS-004: Gestión Avanzada de Trámites y Máquina de Estados**
    *   *Descripción:* Permitir cargar trámites vinculados a una Actuación bajo un control de estados estricto (`Borrador`, `En Revisión`, `Definitivo`, `Vencido`, `Prorrogado`, `Respondido`). Soporta la simplificación de los 31 tipos legacy en 7 categorías en la UI, capturando su Curso (Entrada, Salida, Interno) y Ámbito (Nacional, Provincial, Municipal, Internacional, Privado, Particular, u "Otro" con texto libre).
*   **RF-AS-005: Clasificación Obligatoria por Nomenclador**
    *   *Descripción:* Al registrar o evacuar una consulta, el Asesor debe clasificar obligatoriamente la problemática utilizando el Nomenclador oficial jerárquico (Área > Grupo > Tema > Subtema). Esto garantiza la consistencia de los datos para la analítica y toma de decisiones.
*   **RF-AS-006: Flujo de Borradores a Definitivo y Firma de Actas**
    *   *Descripción:* Los trámites creados como borradores (ej. `Borrador de Pedido de Informe`) requieren revisión y pase digital del Asesor o Secretarios para convertirse en "Definitivos". Para el caso de **Actas**, la asignación de número oficial definitivo está bloqueada hasta recibir la autorización digital de la **Secretaría Privada** tras su revisión final.
*   **RF-AS-007: Gestión de Plazos y Alertas de Vencimiento de Pedidos de Informe**
    *   *Descripción:* Permitir emitir Pedidos de Informe asignándoles plazos predefinidos (24hs, 72hs, 5 días) distinguiendo entre días **hábiles** o **de corrido**. El sistema calculará el vencimiento y alertará al Asesor mediante semáforos de color (Verde, Amarillo, Rojo). Los administradores controlarán el catálogo de plazos disponibles.
*   **RF-AS-008: Clonación y Generación Rápida de Reiteraciones (1 Clic)**
    *   *Descripción:* Si un Pedido de Informe vence sin respuesta (máximo 2 reiteraciones), proveer un botón de "Generar Reiteración" en la fila del trámite. El sistema creará un nuevo trámite vinculante, clonará la plantilla y texto del Pedido de Informe original (evitando descargas o Word manuales) y cambiará el título a `1ª Reiteración` o `2ª Reiteración`, permitiendo editar plazos y vencimientos.
*   **RF-AS-009: Registro de Actas "En Campo" y Respuestas Cruzadas**
    *   *Descripción:* Al salir a notificar un Acta de Requerimiento de Información, el trámite cambia a estado `En Campo` (Pendiente/Espera). Al retornar, el operador registrará si fue recepcionada, si contiene respuesta o no (marcando `"Acta con Respuesta"`). Las respuestas ingresadas permitirán seleccionar de manera cruzada qué trámites pendientes cierran, marcándolos como `"Respondido"`.
*   **RF-AS-010: Prórrogas Autorizadas**
    *   *Descripción:* En caso de recibir solicitudes de prórroga para Pedidos de Informe, permitir otorgar nuevos plazos en el sistema, requiriendo la **autorización digital obligatoria del Asesor a cargo o Secretarios** para recalcular el vencimiento.

### C. Módulo: Administración (RF-AD)
*Funcionalidades administrativas de control y digitalización.*

*   **RF-AD-001: Asociación Muchos a Muchos de Actuaciones y Trámites**
    *   *Descripción:* Permitir a los administradores asociar fluidamente un mismo trámite a múltiples actuaciones de forma cruzada, y viceversa, sin duplicar registros.
*   **RF-AD-002: Digitalización e Integración de Expedientes**
    *   *Descripción:* Módulo de carga de archivos (PDFs, imágenes) con capacidad de adjuntar documentación tanto al expediente (Actuación) general como a hitos específicos (Trámites). Debe contar con un pre-visualizador rápido e integrado de archivos en el sistema.
*   **RF-AD-003: Gestión Estricta del Nomenclador de Problemáticas**
    *   *Descripción:* Permitir al rol de Administración/SUPERADM crear y administrar la estructura de Temas, Subtemas y Áreas. Debe contar con algoritmos de validación en tiempo real para evitar la creación de problemáticas duplicadas o sinónimas, manteniendo la base de datos analítica limpia.
*   **RF-AD-004: Dashboards de Analítica Avanzada e Informes**
    *   *Descripción:* Paneles interactivos con gráficos y cruce de datos que permitan medir volúmenes de consultas por temática, carga de trabajo por asesor, tiempos de resolución y zonas demográficas de mayor impacto. Todo esto enfocado a la toma de decisiones operativas y redistribución de recursos.
*   **RF-AD-005: Libro Diario Digital y Numeración Correlativa Automática**
    *   *Descripción:* El sistema llevará un registro inalterable digital del "Libro Diario" simulando e integrando la correlatividad de salidas/entradas físicas. Al pasar un borrador a definitivo, el sistema generará automáticamente el número oficial correlativo del trámite.
*   **RF-AD-006: Control de Carátula Unificada Predictiva**
    *   *Descripción:* Al crear un trámite o expediente, el sistema desplegará un buscador semántico predictivo de carátulas para sugerir nomenclaturas y títulos de problemáticas similares ya cargados, previniendo que expedientes de una misma temática tengan nombres diferentes y facilitando búsquedas por Tema, Empresa u Organismo.
*   **RF-AD-007: Pases Internos con Motivos Administrables**
    *   *Descripción:* En el circuito de pases, los administradores dispondrán de una interfaz para definir los motivos preestablecidos seleccionables en el menú desplegable (ej. "Para digitalizar", "Para revisión").

---

## 2. Requerimientos No Funcionales (RNF)

*   **RNF-001: Alta Optimización de Recursos de Hardware (Crucial)**
    *   *Descripción:* Dado que el entorno de intranet cuenta con servidores antiguos con discos rígidos mecánicos (HDD) y baja memoria RAM, la aplicación web debe estar altamente optimizada. Se deben evitar consultas SQL complejas o recurrentes (optimizar índices y queries) y minimizar el consumo de recursos de memoria en el servidor.
*   **RNF-002: Comunicación en Tiempo Real Asíncrona**
    *   *Descripción:* La comunicación entre Mesa de Entradas y los Asesores para la cola de espera y los pases debe realizarse utilizando tecnologías bidireccionales asíncronas como WebSockets (o en su defecto Server-Sent Events) para evitar bloqueos e interfaces congeladas.
*   **RNF-003: Seguridad y Control de Accesos por Roles (RBAC)**
    *   *Descripción:* Autenticación segura y autorización estricta basada en roles:
        *   `SUPERADM`: Acceso total.
        *   `ASESOR`: Vista e incumbencias exclusivas de atención y carga.
        *   `ADMINISTRATIVO`: Gestión de digitalización y relaciones de trámites.
        *   *Otros roles*: Escalables jerárquicamente a futuro.
*   **RNF-004: Usabilidad Responsiva Web**
    *   *Descripción:* Interfaz de usuario ligera, limpia y responsiva, diseñada para reducir la fatiga visual del personal que trabaja jornadas completas.
*   **RNF-005: Migración y Carga Inicial Automatizada (Seeding)**
    *   *Descripción:* Para evitar la carga manual de información geográfica (países, provincias, localidades) y catálogos institucionales (nomenclador de temáticas, empleados actuales), se debe desarrollar un script automatizado (*Seeder*) capaz de extraer, transformar e inyectar esta información fundacional directamente a la nueva base PostgreSQL desde la base antigua o archivos CSV.
