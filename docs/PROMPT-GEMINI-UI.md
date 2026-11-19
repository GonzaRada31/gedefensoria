# Prompt para el prototipo de interfaz con Gemini (Antigravity)

> **Etapa 1:** marco de la app + pantallas centrales de Mesa de Entradas, Asesor y Actuación, que ya están bien
> relevadas. Quedan para después los informes, el Panel del Superadministrador y los catálogos, que todavía están
> en plan.
> Gemini trabaja **solo** en `prototipo-ui/`. Después, Claude lo revisa con la skill `diseno-apps-gestion` §5
> (qué se trae, qué no y cómo) y lo integra a `apps/web` en la Fase 2.

```text
Sos diseñador/a UX-UI senior y desarrollador/a frontend. Proyecto "gedefensoria": sistema web de gestión de
Actuaciones (expedientes) de la Defensoría del Pueblo de la Provincia de Jujuy (Argentina). Reemplaza un sistema de
escritorio FoxPro de 2006. Lo usan empleados públicos en jornadas largas, con PC viejas y pantallas comunes: tiene
que ser RÁPIDO, LIVIANO, CLARO y SOBRIO, de aspecto institucional y profesional (no una startup).

TU TAREA: crear un PROTOTIPO NAVEGABLE de la interfaz (sin backend, con datos de ejemplo inventados), en la
carpeta prototipo-ui/ del repo. Es para validar diseño y experiencia; después se integra al proyecto real.

ANTES DE EMPEZAR, LEÉ (buscá lo justo, no leas todo):
- .claude/skills/diseno-apps-gestion/SKILL.md → reglas de diseño OBLIGATORIAS (marco, tablas, temas, tipografía,
  errores a evitar, checklist).
- .claude/skills/gestion-expedientes/SKILL.md → dominio y vocabulario.
- docs/RELEVAMIENTO.md §4 y §5 (flujo de Mesa de Entradas y pantallas relevadas) y §8 (trámites y estados).
- docs/MODELO-DATOS.md (qué datos existen: usá estos nombres y relaciones en los mocks).
- docs/INFORMES.md §1 (cómo se cuentan consultas, personas y atenciones).
- docs/PROGRAMAS.md (Defensoría Móvil: marca de programa/operativo en la atención).

STACK (el mismo del proyecto real, para poder reutilizar):
React 18 + TypeScript + Vite + TailwindCSS + shadcn/ui (Radix) + lucide-react + React Router + TanStack Table.
Fuentes guardadas en el proyecto (Inter y una display sobria), nada por CDN. Sin librerías pesadas de animación.
Datos de ejemplo en prototipo-ui/src/mocks/*.ts, tipados.

PANTALLAS DE ESTA ETAPA (en este orden):
1. Ingreso: usuario y contraseña, sin "recordarme". Variante: aviso "Tenés una sesión abierta en otro equipo desde
   las 09:12. ¿Cerrarla y continuar acá?". Variante: aviso de cierre por inactividad con cuenta regresiva y
   "Guardando tus cambios…".
2. Marco de la app: menú lateral oscuro agrupado por tarea (Atención · Expedientes · Programas · Informes ·
   Administración), colapsable (Ctrl+B); barra superior con miga de pan, buscador global (Ctrl+K) que encuentra
   personas por DNI/nombre y actuaciones por número o carátula, avisos, usuario y tema. Menú distinto según rol
   (Mesa de Entradas, Asesor, Administrativo): agregá un selector de rol de demostración.
3. Mesa de Entradas — Cola del día: pestañas En espera / En atención / Finalizadas / Sin atender con contador;
   tabla densa con persona, MOTIVO visible, asesor, tiempo de espera o de demora (en vivo), origen, y la etiqueta
   "Multi-temática (3)" cuando la atención tiene varias consultas. Marca visual de programa si vino de un operativo
   (ej. "Defensoría Móvil · SUM Barrio X"). Acciones de fila visibles: Dar pase, Ver ficha.
4. Mesa de Entradas — Registrar atención: pasos (buscar persona → datos de la persona/grupo → motivo y origen →
   ¿pre-consulta o pase a asesor?). Buscador por DNI con aviso de posible duplicado y de ANTECEDENTES (asesor
   previo, actuación abierta, documentación pendiente). Opción "Sin documento". Consulta grupal (varias personas).
   Al dar el pase, la pantalla queda libre al instante (aviso breve, sin bloqueo).
5. Ficha de la persona (Actuante) en panel lateral: datos, edad calculada, historial de atenciones, consultas y
   actuaciones con estado.
6. Bandeja del Asesor: personas derivadas a él con tiempo de espera y antecedentes para leer antes de llamar;
   "Tomar" → atención en curso: registrar consulta con Nomenclador (Área > Grupo > Tema > Subtema, combo con
   búsqueda), "Agregar otra consulta" (clona los datos, cambia el tema), cerrar como Actuación de Servicio o abrir
   Actuación de Conflicto (con carátula y sugerencia de carátulas parecidas).
7. Detalle de Actuación: encabezado (número/año, carátula, estado, asesor, tipo); pestañas Resumen · Trámites ·
   Circuito (pases) · Adjuntos · Historial. En Trámites: tabla con tipo (agrupado en las 7 categorías), curso,
   estado como chip con color + texto, número del Libro Diario, vencimiento con semáforo y texto ("vence en 2 días
   hábiles"), botón "Generar reiteración" cuando corresponde, y switch "Ver trámites corregidos".
8. Inicio por rol: 3–4 tarjetas de KPI accionables (ej. "En espera: 7", "Pedidos por vencer: 4") que llevan a la
   lista correspondiente.

REGLAS DE DISEÑO (no negociables, además de las de la skill):
- Tres temas: Claro, Oscuro y Negro, + "Sistema". Todos los colores como tokens CSS (variables) por tema.
- Paleta sobria institucional: azul institucional como color de acción + grises neutros. Colores de estado
  accesibles. Nada de degradados, brillos (glow), sombras fuertes ni fondos translúcidos.
- Texto mínimo 12 px; contraste WCAG 2.1 AA en los tres temas; foco del teclado SIEMPRE visible.
- Estado = color + texto (nunca solo color). Sin dato → "—".
- Una sola acción primaria por vista. Nunca un modal arriba de otro modal.
- Responsive: probado a 1440 px y 390 px (en celular, barra superior en un renglón; las tablas scrollean dentro de
  su panel).
- Todo usable con teclado (Tab, Enter, Esc cierra paneles y devuelve el foco).
- Lenguaje: español rioplatense, claro y respetuoso, no revictimizante. Vocabulario: Actuante, Consulta,
  Pre-consulta, Atención, Actuación (= expediente), Trámite, Pase, Nomenclador, Libro Diario, Delegación.
- Liviano: nada de efectos costosos; transiciones cortas y respetando prefers-reduced-motion.

DATOS DE EJEMPLO:
- TODOS inventados: nombres, DNI (usá rangos claramente falsos), domicilios. Nunca datos reales.
- Pueden ser reales los catálogos institucionales públicos: localidades y barrios de Jujuy, organismos y
  prestatarias (Ejesa, Agua de los Andes, ANSES, ISJ).
- Temas creíbles según el dominio (pensiones, tarifa social, previsional, vivienda, familia).

NO HAGAS:
- No toques nada fuera de prototipo-ui/ (ni docs, ni skills). No hagas commits.
- No inventes funciones que no están en los docs; si se te ocurre una mejora, anotala como propuesta (abajo).
- No uses Tailwind por CDN ni íconos de FontAwesome.

ENTREGABLES:
1. prototipo-ui/ funcionando con `npm install` y `npm run dev`.
2. prototipo-ui/DISENO.md con: tokens (colores por tema, tipografías, espaciado 4 px, radios), componentes creados,
   decisiones tomadas y por qué, verificación de contraste, y una sección "Propuestas" con las ideas que no están
   en los docs.
3. Al terminar cada pantalla, un resumen de 5 líneas como máximo en el chat: qué hiciste, qué decidiste y qué dudas
   tenés.

Empezá por el marco (pantalla 2) y la Cola de Mesa de Entradas (pantalla 3), y mostrámelas antes de seguir.
```

## Antes de pasarle el prompt
- Si llega el **logo y los colores oficiales** (P18), agregá al prompt: "Usá estos colores: …" y dejá el logo en
  `prototipo-ui/public/`.
- Cuando termine, decime **"revisá el prototipo de Gemini"**: lo pruebo en Chrome (temas, 1440/390, teclado,
  contraste) y armo la tabla de qué traemos al proyecto.
