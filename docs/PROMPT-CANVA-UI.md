# Prompt para Canva IA — maqueta de interfaz (2026-11-20)

> Uso: pegar el **Prompt principal** en Canva IA (formato "Diseño web / Presentación 16:9" o "Maqueta de app").
> Después, si querés más pantallas, pegar de a una las **Pantallas extra**.
> No se indican colores a propósito: la paleta queda a criterio de Canva.
> Todos los datos de ejemplo son ficticios (nunca nombres ni DNI reales).

## Prompt principal

```
Diseñá la maqueta de alta fidelidad de una aplicación web de gestión para la Defensoría del Pueblo de la Provincia de Jujuy (Argentina). Reemplaza un sistema de escritorio de 2006: quiero un estilo actual, limpio y profesional, del nivel de un SaaS moderno (tipo Linear, Notion o Stripe Dashboard), nada anticuado ni recargado. Es una herramienta de trabajo que se usa 6 a 8 horas por día, así que tiene que ser sobria, liviana a la vista y muy fácil de leer.

Estilo: mucho aire y espacios generosos, tarjetas con esquinas redondeadas y sombras muy suaves, bordes finos, tipografía sans serif moderna con jerarquía clara (títulos firmes, datos fáciles de escanear, números alineados), iconos de línea finos y consistentes, chips o etiquetas redondeadas para los estados (siempre con texto, no solo color). Sin degradados fuertes, sin brillos, sin texturas, sin fotos de stock. No uses colores llamativos de más: la paleta dejala a tu criterio, coherente y con buen contraste.

Estructura de la pantalla (escritorio 1440 px):
- Menú lateral izquierdo angosto con el logo "Defensoría del Pueblo · Jujuy" y las secciones: Inicio, Cola del día, Actuantes, Actuaciones, Trámites, Pedidos de informe, Estadísticas, Configuración. Abajo, el usuario conectado con su rol.
- Barra superior con buscador global grande ("Buscar por DNI, nombre o N° de actuación…"), atajo de teclado visible (Ctrl+K), campana de avisos y selector de delegación.
- Contenido principal: pantalla "Cola del día" de Mesa de Entradas.
  - Fila de 4 indicadores en tarjetas: En espera (7), En atención (3), Atendidas hoy (24), Espera promedio (12 min).
  - Botón principal destacado: "+ Registrar atención".
  - Tabla moderna de personas en espera con columnas: Turno, Actuante, Motivo, Llegada, Espera, Estado, Asesor asignado, acciones. Estados de ejemplo: "En espera", "En atención", "Derivada", "Espera larga".
  - A la derecha, un panel lateral deslizable con la ficha de la persona seleccionada: datos de contacto, consultas anteriores, actuaciones abiertas y botones "Derivar a asesor" y "Atender".

Datos de ejemplo ficticios: nombres inventados (ej. "María Fernández", "Jorge Quispe"), DNI tipo "30.XXX.XXX", motivos como "Corte de luz", "Reclamo obra social", "Facturación de agua", número de actuación con formato "DPJUJ-0154-2026".

Entregá la pantalla en versión clara y en versión oscura, y una versión celular (390 px) de la misma pantalla con el menú como barra inferior.
```

## Pantallas extra (pegar de a una, en el mismo diseño)

**Registrar atención**
```
Con el mismo estilo, agregá la pantalla "Registrar atención": formulario en pasos (1. Actuante, 2. Motivo de la consulta, 3. Derivación). Paso 1 con buscador por DNI que muestra si la persona ya existe; campos agrupados en tarjetas; tema de la consulta con selector en cascada (Área → Grupo → Tema → Subtema); casilla "Pertenece a un programa"; al final, botones "Guardar y derivar" y "Guardar borrador". Datos ficticios.
```

**Bandeja del Asesor**
```
Con el mismo estilo, agregá la pantalla "Mi bandeja" del Asesor: arriba, pestañas "Nuevas derivaciones (3)", "Mis actuaciones", "Plazos por vencer"; lista de tarjetas o tabla con la persona, el motivo, quién la derivó y hace cuánto; las que vencen pronto con etiqueta "Vence en 2 días". Botón "Aceptar y atender" en cada derivación. Datos ficticios.
```

**Actuación y trámites**
```
Con el mismo estilo, agregá la pantalla de detalle de una actuación "DPJUJ-0154-2026": encabezado con número, estado ("En trámite"), actuante, asesor y organismo involucrado; a la izquierda una línea de tiempo vertical con los trámites (Nota enviada, Pedido de informe, Reiteración, Respuesta recibida) con fecha y autor; a la derecha un resumen con plazos, adjuntos y botón "+ Nuevo trámite". Datos ficticios.
```

## Pedirle a Canva la guía de estilo de lo que generó

```
Sobre el diseño que acabás de crear, armame la guía de estilo completa para que un programador la reproduzca exacta en una app web. No inventes nada nuevo: describí solo lo que usaste. Incluí:
1. Tipografías: nombre exacto de cada fuente, dónde se usa cada una, tamaños en px, pesos (400, 500, 600…) e interlineado para títulos, subtítulos, texto, etiquetas, tablas y números.
2. Colores: código HEX de cada color usado y para qué se usa (fondo, tarjetas, menú lateral, texto principal y secundario, bordes, botón principal y secundario, cada estado), en versión clara y oscura.
3. Espaciados: márgenes, separación entre tarjetas, relleno interno de tarjetas, botones y celdas de tabla, en px.
4. Formas: radio de las esquinas de tarjetas, botones, campos y etiquetas; grosor de bordes; sombras (desplazamiento, desenfoque, opacidad).
5. Componentes: cómo son los botones (primario, secundario, de texto), campos de formulario, tablas, etiquetas de estado, tarjetas de indicadores, menú lateral, barra superior y panel lateral.
6. Iconos: qué estilo o biblioteca de iconos usaste y su tamaño.
7. Medidas de la estructura: ancho del menú lateral, alto de la barra superior, ancho máximo del contenido y del panel lateral.
Presentalo como tabla o lista ordenada, en texto que se pueda copiar.
```
