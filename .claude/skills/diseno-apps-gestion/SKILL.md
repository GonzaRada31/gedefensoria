---
name: diseno-apps-gestion
description: Cómo diseñar apps de gestión (back-office, ERP, CRM, POS, paneles de negocio) que se vean profesionales y se usen rápido — marco de pantalla (menú lateral + barra superior), KPIs, tablas densas, Kanban, paneles laterales, tres temas (claro/oscuro/negro), tipografía, accesibilidad y cómo adaptar diseños hechos con IA (Gemini, Stitch) a un sistema de diseño propio. Usar al diseñar o rediseñar cualquier pantalla de gestión, en cualquier proyecto. Para lo propio de cada proyecto (colores, logo, reglas) usar además su skill de marca, si existe.
---

# Diseño de apps de gestión (genérico, reutilizable)

Aprendido en RedexIT (2026-11, rediseño a partir de un diseño de Gemini). Se aplica a cualquier negocio.
Si la app tiene su propia skill de marca (ej. `<proyecto>-diseno`), esa manda en colores y logo; esta manda en estructura.

## 1. Marco de la pantalla
- **Menú lateral oscuro sobre contenido claro** ("marco y hoja"): es lo que más profesionalismo aporta con menos
  esfuerzo. Token propio (`chrome`, `on-chrome`, `on-chrome-muted`, `chrome-hover`), oscuro en todos los temas.
- **Agrupar el menú por tarea** (General · Ventas · Stock · Configuración · Sistema), no por orden de construcción.
  Títulos de grupo en mayúsculas chicas, color secundario.
- **Ítem activo sólido** (color de acción + texto que contraste ≥ 4,5:1). Es navegación: no cuenta como el primario.
- **Colapsable a íconos** (`Ctrl+B`), recordado en el navegador; con `title` y texto `sr-only` en modo íconos.
- **Pie del menú con el estado operativo** (ej. caja abierta/cerrada + saldo + botón), siempre visible.
- **Barra superior:** miga de pan (grupo / pantalla), acciones rápidas por rol (las de todos los días), dato del día
  (ej. cotización) con aviso si está vieja, avisos y tema. Buscador global `Ctrl+K` cuando exista.
- **Celular:** barra superior en **un solo renglón** (en el POS cada píxel cuenta); menú desplegable que incluye el
  selector de tema y el usuario. Probar a 390 px: es fácil que la barra se parta en tres renglones.

## 2. Tarjetas, KPIs y tablas
- Tarjetas `radius` medio (12 px), borde de 1 px y como mucho una sombra **muy suave** en tema claro (en oscuro no se
  ve: manda el borde). Nada de resplandores de color.
- **KPI** = etiqueta chica + número grande (letra display, cifras tabulares) + variación con flecha **y texto**
  ("+12 % vs. octubre") + opcional ícono en recuadro suave y mini gráfico. Sin dato → "—", nunca 0.
- **Tablas densas:** montos alineados a la derecha con cifras tabulares (`tabular-nums`); códigos (IMEI, SKU) en mono.
  Encabezados en etiqueta chica. Fila con hover suave. En celular, scroll horizontal dentro del panel, no de la página.
- **Kanban** (reparaciones, pedidos): columna = estado con punto de color **+ nombre + contador**; tarjeta con lo
  mínimo para decidir (equipo, falla, días, responsable) y un botón para avanzar.
- **Panel lateral (drawer)** para ver una ficha sin perder la lista; Esc cierra y el foco vuelve al disparador.

## 3. Temas
- **Claro, Oscuro y Negro** + "Sistema" (alterna claro/oscuro). Negro = `#000` de fondo y superficies `#0A0A0A`/`#141414`,
  ideal para OLED; reutiliza los colores de marca del oscuro.
- Todo color como token por tema (`data-theme` en `<html>` + script en `<head>` para no parpadear).
- Verificar contraste con un script (fórmula WCAG) para cada tema antes de dar por bueno un color.

## 4. Tipografía
- Texto de interfaz: **Inter** (o similar neo-grotesca). Títulos y KPIs: una display con carácter (ej. Plus Jakarta Sans).
- Montos: misma letra de interfaz con `tabular-nums` (se alinean como mono, se ven mejor). Mono solo para códigos.
- **Mínimo 12 px.** Las IA suelen usar 9–10 px y grises claros (2,5:1): no pasa accesibilidad.
- Fuentes guardadas en el proyecto (no CDN): en despliegues la descarga falla.

## 5. Cómo adaptar un diseño hecho con IA (Gemini, Stitch, v0)
1. Verlo en el navegador (servirlo con `npx http-server`; `file://` no siempre se puede abrir) en claro y oscuro.
2. Separar **qué gusta** (composición, jerarquía, densidad) de **cómo está hecho** (Tailwind por CDN, degradados, FontAwesome).
3. Comparar contra el manual propio: tabla "traemos / no traemos / cómo lo resolvemos".
4. Marcar **funciones y datos inventados** (CRM con "leads", sucursales, montos de ejemplo): no pasan al código; las
   funciones que valgan la pena van como propuesta al dueño.
5. Reconstruir con tokens y componentes propios. **Nunca copiar el HTML/CSS.**
6. Decisiones de estilo del dueño (menú oscuro, letras, sombras) → preguntas con criterio por defecto; registrar la
   decisión y actualizar manual, tokens y skill de marca.

## 6. Errores típicos (de las IA y nuestros)
- Degradados en botones y fondos, sombras con glow, texto de 9–10 px, estados solo por color.
- Barra superior que en celular ocupa media pantalla.
- Widget que lee "la" ubicación cuando hay varias (usar la principal explícitamente).
- Clases de utilidades inventadas que no existen en el CSS: no dan error, simplemente no pintan.
- Cambiar un archivo con la página abierta en dev genera falsos errores de hidratación: recargar antes de diagnosticar.

## 7. Checklist
- [ ] Marco: menú agrupado, activo sólido, colapsable, estado operativo al pie, barra superior de un renglón en celular
- [ ] Tres temas probados; contraste verificado con script
- [ ] KPIs con texto en la variación y "—" sin datos; montos tabulares a la derecha
- [ ] Nada de degradados, glow, texto < 12 px ni datos inventados
- [ ] 390 px y 1440 px; foco visible; áreas táctiles ≥ 44 px

## 8. Mejora continua
Cada aprendizaje de diseño de gestión que sirva para otros negocios se agrega acá (lo propio de cada proyecto va a
su skill de marca).

## 9. Lo que sirve de la guía de Gemini (filtrado 2026-11-12)
Fuente: guía de diseño de Gemini analizada en RedexIT (referencia, no regla). **Se toma:**
- **Acciones de fila:** las 2 más usadas (ver, cobrar/imprimir) siempre visibles, no escondidas en un menú `⋮`.
- **Selección múltiple:** barra con "N seleccionados" y acciones por lote (cambiar estado, exportar, etiquetas).
- **KPI accionable:** si el número es una tarea ("listos para entregar"), el clic filtra o lleva a esa lista.
- **Panel lateral (drawer):** encabezado (código + estado), pestañas (Resumen · Historial · Ítems · Documentos),
  cuerpo con scroll y pie fijo: acciones principales a la derecha, destructivas a la izquierda. Ancho 480–560 px.
- **Nunca un modal sobre otro modal:** el alta rápida (ej. cliente) va como subformulario en línea.
- **Una sola acción primaria sólida por vista;** el resto secundarias o fantasma.
- **Carga:** esqueletos con la forma real (tarjetas, filas), no un spinner que tapa todo.
- **Errores de formulario:** debajo del campo, con ícono, reservando el lugar para que no salte el diseño.
- **Gráficos:** grilla horizontal tenue y sin verticales; tooltip con el valor exacto. Anillo solo para distribución
  de estados, con el total en el centro y leyenda que resalta la parte al pasar el mouse.
- **Escala de espaciado de 4 px**; radios: tarjetas 12–16, controles 8–10, chips redondos.
- **Transiciones cortas:** hover ~120 ms, menús ~150 ms, paneles ~240 ms; respetar `prefers-reduced-motion`.
- **Buscador global** que encuentre por código, cliente, IMEI y SKU a la vez (`Ctrl+K`).

**No se toma (choca con nuestras reglas):**
- Texto de 11–11,5 px en chips y encabezados → mínimo 12 px.
- Avisos que se cierran a los 3,5 s → 5 s y pausa al pasar el mouse o enfocar (lectura y accesibilidad).
- `outline: none` con anillo por sombra → el foco tiene que verse siempre, también en modo de alto contraste.
- Barra superior translúcida con desenfoque → fondo sólido (contraste parejo, menos costo en celulares).
- Pantalla fija de 100vh sin scroll de página → solo en escritorio; en celular la página scrollea normal.
- Paleta índigo/slate de Gemini → los colores salen de la skill de marca de cada negocio.
