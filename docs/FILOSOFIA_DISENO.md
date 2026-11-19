# Filosofía de Migración y Principios de Diseño

Este documento establece las directrices conceptuales, metodológicas y técnicas para el desarrollo del **Sistema de Gestión de Actuaciones**. Su objetivo es servir como brújula para el equipo, recordando siempre cuál es el enfoque del proyecto.

---

## 1. No Replicar, sino Rediseñar y Evolucionar
*   **Principio:** **El nuevo sistema no es una copia web del sistema de escritorio anterior.**
*   **Enfoque:** Venimos a replantear los flujos de trabajo de la Defensoría del Pueblo de Jujuy para hacerlos más eficientes, modernos, intuitivos y seguros.
*   **Acción:** Cada funcionalidad del sistema actual debe analizarse críticamente:
    *   *¿Este paso aporta valor o es una limitación técnica de la tecnología anterior?*
    *   *¿Cómo puede la web o la automatización hacer esta tarea más rápida y transparente?*

---

## 2. Rescate de Lógicas de Negocio Valiosas
*   **Principio:** **Aprovechar el conocimiento acumulado en el sistema actual.**
*   **Enfoque:** Aunque cambiemos la interfaz y los procesos, el sistema anterior tiene años de refinamiento en reglas de negocio que funcionan muy bien.
*   **Casos Clave a Rescatar:**
    *   **Maestros Estructurados:** Catálogos precargados con validaciones estrictas (ej. jerarquía de Barrios/Localidades) que previenen errores humanos en la entrada de datos.
    *   **Filtros de Búsqueda:** La flexibilidad para buscar personas y actuaciones por múltiples criterios concurrentes (filtros) es un requerimiento altamente valorado por los operadores en el día a día.
    *   **Lógicas Especiales:** Casos como "Sin Información" en identidades, gestión de actuaciones "De Oficio", etc., representan soluciones a problemas reales del sector público que deben preservarse.

---

## 3. Estándares Técnicos "Enterprise" y Buenas Prácticas
Para lograr un producto de altísima calidad y seguridad, nos auto-imponemos de manera permanente las siguientes directrices técnicas:

*   **Código Limpio (Clean Code):** Modular, autocomplementario, con nombres semánticos y estructurado bajo patrones de diseño modernos.
*   **Cero Hardcoding (No Hardcodear):** Todos los valores, roles, catálogos geográficos y configuraciones deben manejarse mediante base de datos, variables de entorno o archivos de configuración dinámicos.
*   **Seguridad de Datos y Privacidad:** Encriptación de datos sensibles en tránsito y reposo, protección contra ataques comunes (SQL Injection, XSS, CSRF) y manejo riguroso de identidades.
*   **Escalabilidad y Robustez:** Base de datos relacional robusta con relaciones e índices adecuados (por ejemplo, para soportar relaciones N:M entre Actuaciones y Trámites sin pérdida de performance).

---

## 4. Tablero de Control de Definiciones Pendientes (Tracking)
*Es crucial no perder de vista aquellas áreas institucionales o legales que aún requieren investigación y definición. A continuación se listan y se controlará su estado:*

| ID Pendiente | Área / Tema | Descripción | Estado |
| :--- | :--- | :--- | :--- |
| **LEGAL-01** | Competencia e Incumbencia Legal | Formalizar la competencia legal de la Defensoría ante organismos (nacionales, provinciales, municipales) y las limitaciones con privados según sus estatutos. | 🟡 Pendiente |
| **ROL-01** | Sec. General y Sec. Legal y Técnica | Definir los roles, permisos de acceso y flujos específicos para el Secretario General y la Secretaría Legal y Técnica. | 🟡 Pendiente |
| **ROL-02** | Secretaría Privada | Definir el rol, consultas e incumbencias de la secretaría exclusiva del Defensor del Pueblo. | 🟡 Pendiente |
| **ROL-03** | Autoridades Máximas | Definir permisos de visualización y reportes para el Defensor del Pueblo, Defensor Adjunto Primero y Defensor Adjunto Segundo. | 🟡 Pendiente |
