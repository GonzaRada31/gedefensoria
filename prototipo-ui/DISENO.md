# Sistema de Diseño y Arquitectura Visual — gedefensoria
**Defensoría del Pueblo de la Provincia de Jujuy (Argentina)**  
*Prototipo UI Navegable — Noviembre 2026*

> **Actualización 2026-11-20:** se adoptó el estilo de la maqueta de Canva (verde azulado institucional, menú lateral de color con ítem activo blanco, radios 10/16 px, sombras suaves, indicadores grandes). Fuente: código exportado de Canva en `docs/modelocanva.md`. Los valores vigentes (copiados de ahí, con mínimo de 12 px de letra) están en `src/index.css`; la tabla §2.1 de abajo quedó como historial del estilo anterior.

---

## 1. Fundamentos y Filosofía Institucional

El sistema web reemplaza a la plataforma de escritorio FoxPro (año 2006). A diferencia de una aplicación de consumo o una startup moderna, está concebido para:
1. **Jornadas operativas prolongadas (6–8 horas continuas):** reducción del cansancio visual mediante superficies neutras, ausencia de resplandores (*glow*) y contraste tipográfico nítido (WCAG 2.1 AA mínimo, con ratios AAA en texto principal).
2. **Equipos de hardware estándar y monitores CRT/LCD antiguos (1366×768 hasta 1920×1080):** cero animaciones pesadas, tipografía localmente almacenada sin dependencias externas ni CDN, tiempos de respuesta instantáneos.
3. **Flujo de atención asíncrono y sin bloqueos:** la derivación (pase) de Mesa de Entradas a Asesores no congela la pantalla del operador receptor ni emisor.
4. **Respeto a la identidad institucional de la Provincia de Jujuy:** paleta sobria con base azul institucional, grises técnicos y estados semánticos claros (color + texto explícito).

---

## 2. Tokens del Sistema de Diseño

### 2.1 Colores por Tema
El sistema implementa tres temas independientes más la sincronización con el sistema operativo (`sistema`). La selección se persiste en `localStorage` y se aplica directamente mediante `data-theme` en la raíz `<html>` para evitar parpadeos (*FOUC*).

| Token CSS | Tema Claro | Tema Oscuro | Tema Negro (OLED) | Función y Uso |
|---|---|---|---|---|
| `--color-bg` | `#F8FAFC` (Slate 50) | `#0B1120` (Navy Dark) | `#000000` (Puro) | Fondo general de la aplicación |
| `--color-surface` | `#FFFFFF` | `#151F32` (Slate 850) | `#0C0C0E` | Tarjetas, paneles, modales, grillas |
| `--color-surface-hover` | `#F1F5F9` (Slate 100) | `#1E2D4A` | `#18181B` | Hover en filas de tablas e interactivos |
| `--color-border` | `#E2E8F0` (Slate 200) | `#23324C` | `#27272A` | Bordes estructurales de 1px |
| `--color-border-strong` | `#CBD5E1` (Slate 300) | `#334668` | `#3F3F46` | Separadores destacados y scrollbars |
| `--color-text` | `#0F172A` (Slate 900) | `#F8FAFC` (Slate 50) | `#FFFFFF` | Texto principal de lectura |
| `--color-text-muted` | `#475569` (Slate 600) | `#CBD5E1` (Slate 300) | `#E4E4E7` | Metadatos y etiquetas secundarias |
| `--color-text-subtle` | `#64748B` (Slate 500) | `#94A3B8` (Slate 400) | `#A1A1AA` | Horarios, marcas de agua, iconos |
| `--color-primary` | `#1D4ED8` (Blue 700) | `#3B82F6` (Blue 500) | `#60A5FA` (Blue 400) | Color de acción institucional principal |
| `--color-primary-hover`| `#1E40AF` (Blue 800) | `#60A5FA` (Blue 400) | `#93C5FD` (Blue 300) | Hover de botones y acciones primarias |
| `--color-primary-subtle`| `#EFF6FF` (Blue 50) | `rgba(59,130,246,0.15)` | `rgba(96,165,250,0.18)`| Fondos de badges y chips activos |

### 2.2 Marco Lateral "Chrome" (Regla de Oro de Apps de Gestión)
Siguiendo la especificación de `diseno-apps-gestion`, el marco lateral de navegación es **oscuro en todos los temas**, garantizando una composición jerárquica clara de "marco y hoja":
- **Fondo del marco:** `#0B1120` (Slate/Navy profundo).
- **Texto:** `#F8FAFC` (contraste 15.9:1).
- **Texto secundario:** `#94A3B8` (contraste 5.8:1).
- **Ítem de navegación activo:** Sólido institucional `#1D4ED8` con tipografía `#FFFFFF` (contraste 6.2:1). No compite como botón primario de acción en el contenido.

### 2.3 Estados Semánticos Accesibles (Color + Texto)
El sistema prohíbe terminantemente comunicar estado sólo mediante color. Cada estado cuenta con un punto de referencia, texto legible y borde contenedor:

| Estado | Fondo (Claro / Oscuro) | Texto / Borde (Claro / Oscuro) | Ratio Contraste | Aplicación |
|---|---|---|---|---|
| **Éxito (Finalizada / Respondido)** | `#F0FDF4` / `#052E16` | `#15803D` / `#4ADE80` | ≥ 4.8:1 (AA) | Atenciones terminadas, pases recibidos |
| **Alerta (En espera > 30m / Por vencer)** | `#FFF7ED` / `#431407` | `#C2410C` / `#FB923C` | ≥ 4.7:1 (AA) | Demoras en cola, vencimientos a 2 días |
| **Peligro (Vencido / Cancelado)** | `#FEF2F2` / `#450A0A` | `#B91C1C` / `#F87171` | ≥ 5.2:1 (AA) | Plazos caducos, ausencias en llamada |
| **Informativo (En atención / Instrucción)** | `#EFF6FF` / `#172554` | `#1D4ED8` / `#60A5FA` | ≥ 6.2:1 (AA) | Actuación abierta, atención en curso |

---

## 3. Tipografía y Escala de Espaciado

### 3.1 Familias Tipográficas Locales
- **Texto de interfaz y datos:** `Inter` (pesos 400 Regular, 500 Medium, 600 SemiBold, 700 Bold). Almacenada en formato comprimido `.woff2` en `/public/fonts/`.
- **Cifras tabulares:** aplicación obligatoria de `.tabular-nums` (`font-variant-numeric: tabular-nums`) en importes, tiempos de espera, DNI, números de expedientes y Libro Diario.
- **Títulos institucionales y KPIs:** `Plus Jakarta Sans` (variable ttf local).

### 3.2 Escala Tipográfica (Mínimo 12 px)
- `text-4xl` (30 px / 38 px line-height): Indicadores numéricos principales de KPI.
- `text-2xl` (20 px / 28 px line-height): Títulos principales de pantalla.
- `text-lg` (16 px / 24 px line-height): Cabeceras de tarjetas y modales.
- `text-base` (14 px / 20 px line-height): Texto de lectura normal y campos de entrada.
- `text-xs` (12 px / 16 px line-height): Encabezados de tabla, badges, metadatos y tooltips. **(Límite inferior absoluto del sistema)**.
- *Nota:* las clases `11px` (`text-2xs`) se reservan exclusivamente para abreviaturas auxiliares y microetiquetas de contexto donde el contenedor brinda redundancia semántica.

### 3.3 Radios y Espaciado Base de 4 px
- **Base de espaciado:** 4 px (múltiplos de 4, 8, 12, 16, 20, 24, 32 px).
- **Radios:**
  - Controles e inputs (`rounded-control`): **8 px**.
  - Tarjetas, modales y tablas (`rounded-card`): **12 px**.
  - Chips de estado y contadores: **9999 px (píldora)**.

---

## 4. Componentes Diseñados e Implementados

1. **`AppLayout` (Pantalla 2):**
   - Menú lateral oscuro colapsable a iconos con atajo de teclado global `Ctrl+B` y persistencia en navegador.
   - Agrupación lógica de navegación por tarea: *Atención · Expedientes · Programas · Informes · Administración*.
   - Estado operativo permanente en el pie del menú: Delegación en sede, estado de conectividad en línea y conteo de personas en espera.
   - Barra superior de un renglón con miga de pan contextual, buscador global (`Ctrl+K`), selector de tema institucional y selector de perfil de demostración (`MESA_ENTRADAS`, `ASESOR`, `ADMINISTRATIVO`, `SUPERADM`).
2. **`GlobalSearchModal` (Ctrl+K):**
   - Búsqueda simultánea y predictiva de personas (por DNI, nombre, apellido o barrio) y actuaciones (por número oficial o texto de carátula).
   - Acceso con teclado (flechas, Enter y cierre inmediato con Esc).
3. **`MesaEntradasCola` (Pantalla 3):**
   - Pestañas con contadores dinámicos: *En espera*, *En atención*, *Finalizadas*, *Sin atender / Desistidas*.
   - Tabla densa optimizada con motivo visible directamente en la grilla, distintivo de Programas Territoriales (*Defensoría Móvil*), badge *"Multi-temática (N)"*, tiempo de espera en vivo y acciones de fila (*"Dar pase"* y *"Ver ficha"*).
4. **`RegistrarAtencion` (Pantalla 4):**
   - Asistente guiado por pasos (1: Persona/Grupo → 2: Motivo y Origen → 3: Destino y Pase).
   - Detección inmediata de duplicados y alerta de ANTECEDENTES (asesor previo asignado, actuación de conflicto abierta y documentación adeudada).
   - Soporte para personas sin documento acreditado (declaración jurada) y atención grupal (varias personas, una consulta).
   - Opción de Pre-consulta (finaliza en Mesa de Entradas) vs. Pase a Asesor de turno con balanceo de carga.
   - Flujo asíncrono real: al confirmar el pase, la pantalla queda libre al instante y regresa a la cola sin bloqueos.
5. **`ActuanteDrawer` (Pantalla 5):**
   - Panel lateral deslizante (512 px) que no pierde el contexto de la grilla de trabajo.
   - Cálculo automático de edad según fecha de nacimiento.
   - Detección de antecedentes (asesor previo asignado, número de actuación abierta, documentación pendiente).
   - Pestañas con historial de visitas y actuaciones vinculadas.
   - Cierre con tecla `Esc` y restitución del foco.
6. **`BandejaAsesor` (Pantalla 6):**
   - Bandeja de personas derivadas con tiempo de espera y antecedentes para leer antes de llamar.
   - Despacho en curso al presionar "Tomar".
   - Clasificación estricta mediante Nomenclador institucional (Área > Grupo > Tema > Subtema).
   - Función "+ Agregar otra consulta" que clona los datos del actuante y suma una problemática conexa (convirtiendo la visita en Multi-temática).
   - Cierre dual: "Actuación de Servicio" (se abre y cierra en el acto) o "Actuación de Conflicto" (con carátula propuesta y buscador predictivo de carátulas similares para evitar duplicados).
7. **`DetalleActuacion` (Pantalla 7):**
   - Encabezado oficial con número/año, carátula, estado, tipo y asesor a cargo.
   - Pestañas: *Resumen · Trámites · Circuito (pases) · Adjuntos · Historial*.
   - Tabla de Trámites estructurada en las 7 macro-categorías, curso (Entrada / Salida / Interno), chip con color + texto, número correlativo de Libro Diario, semáforos de vencimiento con plazo explicativo (*"vence en 2 días hábiles"*), botón de generación de reiteración en 1 clic y switch *"Ver versiones corregidas / históricas"*.
8. **`InicioDashboard` (Pantalla 8):**
   - 4 tarjetas de KPI accionables por rol (*Mesa de Entradas, Asesor, Administrativo, Superadministrador*).
   - Cifras tabulares grandes, variaciones comparativas y enlaces directos que filtran la grilla correspondiente al hacer clic.
9. **Modales de Variantes de Ingreso (Pantalla 1):**
   - `SessionConflictModal`: detección de sesión abierta en otro equipo (ej. *PC-MESA-04*) con opción de cierre remoto y continuidad.
   - `InactivityModal`: cuenta regresiva con guardado automático transparente en segundo plano (*"Guardando tus cambios…"*) antes de la caducidad por seguridad.
10. **`ToastContainer`:**
   - Notificaciones asíncronas de pases en segundo plano. Duración de 5 segundos con posibilidad de cierre manual, garantizando que el operador de Mesa de Entradas continúe su labor de registro sin bloqueos de pantalla.

---

## 5. Verificación de Accesibilidad y Ergonomía (WCAG 2.1 AA)

- **Foco visible:** todo elemento interactivo posee anillo de enfoque explícito de 2 px (`focus-visible:ring-2 focus-visible:ring-primary` con `outline-offset: 2px`). Se erradicó el uso de `outline: none` sin compensación.
- **Modo reducido de movimiento (`prefers-reduced-motion`):** configurado a nivel CSS para operadores propensos a fatiga visual o mareos por transiciones.
- **Prueba responsive:**
  - **1440 px (Escritorio):** visualización completa de datos, panel lateral integrado, tablas con ancho completo.
  - **390 px (Dispositivos móviles y terminales portátiles):** barra superior condensada en un solo renglón; el menú se transforma en cajón deslizable y la tabla cuenta con scroll horizontal encapsulado dentro de su contenedor de tarjeta, sin alterar el ancho del documento.

---

## 6. Propuestas de Mejora (No contempladas en los documentos iniciales)

1. **Atajo rápido para "Pase al Asesor de turno sugerido" (`F2` o clic rápido):**
   - *Motivo:* En horas pico en Mesa de Entradas, el operador puede necesitar derivar automáticamente al asesor de guardia disponible con menor cantidad de personas en espera sin seleccionar de una lista desplegable.
2. **Cola de impresión directa de comprobante de turno en papel térmico de 80 mm:**
   - *Motivo:* Para ciudadanos mayores que no manejan telefonía celular, entregarles un ticket físico simple con número de turno, nombre del profesional y sala de espera estimada reduce la ansiedad y las consultas repetitivas al mostrador.
3. **Indicador de "Electrodependencia / Vulnerabilidad Médica Prioritaria":**
   - *Motivo:* Cuando la consulta refiere a cortes de suministro eléctrico en personas electrodependientes (Ley 27.351), la cola de espera debería sugerir un orden de prioridad especial con aviso sonoro discreto en el despacho del asesor legal.
4. **Modo fuera de línea local (Service Worker + IndexedDB) para operativos de la Defensoría Móvil:**
   - *Motivo:* En zonas rurales o quebradas sin conectividad 4G (P-PRG-01), permitir cargar las consultas en una libreta local y sincronizarlas automáticamente cuando el vehículo regresa a la sede con Wi-Fi.
