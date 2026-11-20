---
name: gedefensoria-diseno
description: Sistema de diseño UX/UI y frontend propio de gedefensoria (Defensoría del Pueblo de Jujuy) — estilo de la maqueta de Canva, tokens de color por tema, zonas de la pantalla con sus nombres, componentes (PageHeader, StatusChip/estadoVisible, indicadores, tablas, tarjetas de celular, barra inferior, panel lateral), anchos y márgenes, vocabulario de la interfaz y método de QA. Usar SIEMPRE al crear, modificar o revisar cualquier pantalla, componente, color, texto visible o estilo de prototipo-ui/ (y luego de la app real), aunque el pedido diga solo "cambiá este botón", "agregá una columna" o "mejorá el diseño".
---

# Diseño UX/UI y frontend — gedefensoria

Skill de marca del proyecto. **Manda en colores, componentes y vocabulario.** La estructura general (marco, KPIs,
tablas, accesibilidad) sale de `diseno-apps-gestion`; si algo choca, gana esta skill.
Fuentes: maqueta de Canva (`docs/modelocanva.md`, 2026-11-20), código vigente en `prototipo-ui/src/index.css` y
`tailwind.config.js`. Mapa de zonas para hablar con el usuario: `docs/PARTES-PANTALLA.md`.

## 1. Principios (por qué se ve así)
- Herramienta de **6–8 horas diarias**: sobria, aireada, sin degradados ni brillos, fácil de escanear.
- **Aprovechar el ancho**: el contenido llena la pantalla; nada de columnas angostas centradas con franjas blancas.
- **Estado = color + texto + punto**, nunca solo color. **Letra mínima 12 px** (Canva usa 10–11: no se copia).
- Todo color, radio y sombra sale de **tokens** (`var(--color-…)` → clases Tailwind). Prohibido hex o clases de color
  sueltas (`bg-sky-50`) en componentes: si el usuario pide una clase Tailwind concreta, se traduce a su valor en el token.
- Dato de negocio con opciones (umbrales, textos, plazos) → configurable; mientras tanto, una constante con nombre
  (ej. `UMBRAL_ESPERA_LARGA_MIN`) y nota en `PREGUNTAS.md`.

## 2. Tokens (valores vigentes)
| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `bg` | `#F5F8F8` | `#111B20` | fondo del Área de trabajo |
| `surface` / `surface-alt` | `#FFF` / `#F8FAFB` | `#1B282E` / `#202F35` | tarjetas / encabezado de tabla |
| `border` / `border-strong` | `#E4EBED` / `#D6E1E4` | `#304147` / `#40545B` | bordes 1 px |
| `text` / `muted` / `subtle` | `#172D35` / `#5B6F78` / `#677C85` | `#EDF5F5` / `#C3D2D5` / `#A2B6BB` | textos |
| `primary` | `#176D70` | `#86D5CB` | **textos y enlaces** destacados, foco, pestaña activa |
| `primary-solid` (+`-hover`, `-fg`) | `#176D70` / `#11595C` / blanco | **igual que claro** | **botones y fondos sólidos** (como Canva) |
| `primary-subtle` | `#E9F5F3` | `#25403E` | fondos suaves de íconos y chips |
| `chrome-*` | menú `#176D70`, activo blanco con texto `#11595C` y rayita `#B9DCD8` | igual | Menú lateral |
- **Estados** (texto / fondo; en oscuro fondo = color 950 al 40 %): En espera `info` sky-700/sky-50 · Espera larga
  `warning` amber-800/amber-50 · En atención `success` emerald-700/emerald-50 · Derivada `violet` purple-700/purple-50 ·
  Peligro `danger` · Neutro `surface-hover`. Chips sin borde visible (borde = fondo).
- Tema **Negro** (OLED): fondo `#000`, primario y sólido menta `#6CC7C0` con texto negro.
- Radios: controles 10 px, tarjetas 15 px, chips redondos. Sombra de tarjeta `--shadow-card` (muy suave; en negro, ninguna).
- Letra: Inter (interfaz) y Plus Jakarta Sans (`font-display`: títulos y números grandes), locales. Cifras `tabular-nums`.

## 3. Zonas y medidas (ver `docs/PARTES-PANTALLA.md`)
- (2) **Menú lateral** 240 px, color institucional, grupos en mayúsculas (`ESPACIO DE TRABAJO`, `EXPEDIENTES`,
  `PROGRAMAS`, `INFORMES`); pie con (3) Configuración y (4) Ficha de usuario (iniciales en círculo claro, nombre en
  negrita, sector abajo). Colapsable a íconos con `Ctrl+B`.
- (5) **Barra superior** 78 px (64 en celular), fondo `surface`. (6) **Área de trabajo**: márgenes 16 / 32 / 40 px.
- **Regla de alineación:** barra superior y área de trabajo comparten `max-w-[1540px] mx-auto` y los mismos márgenes;
  la miga de pan queda justo sobre el título. Pantallas de trabajo y formularios: 1540 px (los campos limitan su ancho
  adentro de la tarjeta, no la pantalla entera).
- **Celular (< 768 px):** sin menú lateral; barra superior con marca "DP Defensoría · Jujuy", lupa y tema; (12)
  **Barra inferior** con 4 accesos por rol + "Más" (abre el menú completo, con selector de rol de demostración);
  `pb-28` en el área para no tapar contenido.

## 4. Componentes (usar estos, no reinventar)
- **`PageHeader`** (`components/common/PageHeader.tsx`): sección (eyebrow verde, mayúsculas) + título 30–36 px +
  subtítulo + acciones. **Toda pantalla nueva empieza con él.** Botón principal en celular = solo ícono (con `sr-only`).
- **`StatusChip`** + **`estadoVisible(item)`** (`components/common/estadoAtencion.ts`): única fuente del estado visible
  de una atención (En espera / Espera larga / Derivada / En atención / Finalizada / Sin atender). Ninguna pantalla
  calcula el estado por su cuenta.
- **Indicadores** (7): grilla 4 columnas (2 en celular), etiqueta + ícono en recuadro `primary-subtle` + número grande
  `font-display`; valores **derivados** de los datos, nunca guardados.
- **Tabla** (10): `bg-surface` + `rounded-card`, encabezado `bg-surface-alt` en mayúsculas 11–12 px `whitespace-nowrap`,
  columna **Estado** con chip, acciones de fila visibles (Dar pase, ver ficha). En celular se reemplaza por **tarjetas**
  (`md:hidden` / `hidden md:block`): hora + chip, nombre (abre la ficha), DNI, motivo, pie con asesor y espera,
  botón principal a todo el ancho.
- **Botones:** primario = `bg-primary-solid text-primary-solid-fg hover:bg-primary-solid-hover` (uno por vista);
  secundario = `bg-surface border-border-strong`. Nunca `bg-primary text-white` (rompe el contraste en oscuro).
- **Panel lateral (11):** `ActuanteDrawer`, se abre con `openActuanteDrawer(id)`. **Avisos:** `addToast` del contexto.

## 5. Vocabulario de la interfaz
- "**Atenciones del día**" (nunca "cola del día" ni "cola de Mesa de Entradas"); "las atenciones de Dr. …" en vez de
  "la cola de…". "Dar pase" deja la atención **Derivada** hasta que el profesional la toma ("Llamar y tomar").
- Español rioplatense, oraciones cortas, mayúscula solo inicial ("Registrar atención", no "Registrar Atención").
- Datos de ejemplo siempre ficticios (DNI 99.xxx.xxx, nombres inventados). Nunca datos reales (REGLAS §4.1).

## 6. Cómo trabajar un cambio de diseño
1. Ubicar la zona por su número/nombre en `PARTES-PANTALLA.md`; buscar el componente con grep antes de tocar.
2. Cambiar el token o el componente compartido (un solo lugar), no cada pantalla. Clase nueva → que exista en Tailwind.
3. Texto visible renombrado → grep en `src/` (menú, migas en `getBreadcrumb`, títulos, botones "Volver", toasts,
   `shortLabels` de la barra inferior) y avisar qué textos parecidos no se tocaron y por qué.
4. `npx tsc --noEmit` mientras se trabaja; `npm run build` al terminar.
5. **QA en Chrome** (lo hace Claude): claro y oscuro; 1440/1918 px y 390 px. Chrome no achica la ventana: usar un
   `iframe` del ancho deseado (para 1918 px, escalado con `transform: scale(0.8)`); consola sin errores.
6. Si el usuario corrige algo que puede repetirse → agregarlo acá (o a `diseno-apps-gestion` si sirve a otros proyectos).

## 7. Diferencias con Canva (a propósito)
- Letra mínima 12 px (Canva 10–11). Estados con la paleta Tailwind que pidió el usuario (sky/amber/emerald/purple).
- Enlaces del tema oscuro en menta `#86D5CB` (el verde oscuro no se lee como texto sobre fondo oscuro).
- Se mantienen pestañas por estado y barra de filtros del prototipo (Canva tenía filtros en píldoras).

## 8. Checklist antes de dar por terminado
- [ ] `PageHeader` y anchos/márgenes estándar; barra superior alineada con el contenido
- [ ] Solo tokens; botones con `primary-solid`; estados con `estadoVisible` + `StatusChip`
- [ ] Vocabulario (§5) y datos ficticios
- [ ] Celular: tarjetas en vez de tabla, barra inferior sin tapar contenido, sin scroll horizontal
- [ ] Build OK, QA claro/oscuro en 1440–1918 y 390 px, consola limpia; MJES actualizado
