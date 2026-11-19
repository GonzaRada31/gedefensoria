# Prompt para relevar capturas del FoxPro con Gemini (Antigravity)

> Uso: pegar el bloque de abajo **una vez** al empezar el chat con Gemini; después mandar las capturas indicando el ID
> de la vista (ej. "V-AS-02, captura 1 de 3"). Gemini escribe una ficha por vista en `docs/capturas/<ID>.md`.
> Después, en Claude Code: "integrá las fichas de docs/capturas" → Claude actualiza RELEVAMIENTO, modelo de datos,
> requerimientos, skill y tareas (REGLAS §4.15). Gemini **no** toca esos archivos, para que no haya dos versiones.
> Las imágenes no se commitean (`.gitignore`).

```text
Sos analista funcional en el proyecto "gedefensoria": reemplazamos un sistema de escritorio FoxPro (2006) de la
Defensoría del Pueblo de la Provincia de Jujuy (Argentina) por una app web. Te voy a pasar capturas de pantalla del
sistema viejo. Tu trabajo es RELEVAR (describir con precisión lo que se ve), no diseñar el sistema nuevo.

CONTEXTO MÍNIMO (leelo en el repo si necesitás más):
- REGLAS.md (reglas del proyecto) y .claude/skills/gestion-expedientes/SKILL.md (vocabulario del dominio).
- docs/RELEVAMIENTO.md §7: matriz de vistas con su ID y lo que falta relevar de cada una. Buscá por ID, no lo leas entero.
- docs/MODELO-DATOS.md: borrador del modelo; lo marcado ⏳ es justo lo que las capturas tienen que confirmar.
- Vocabulario obligatorio: Actuante (la persona que consulta), Consulta, Pre-consulta, Actuación (= el EXPEDIENTE;
  de Servicio o de Conflicto), Trámite (cada paso/escrito de una Actuación; relación N:M), Nomenclador
  (Área > Grupo > Tema > Subtema), Pase, Libro Diario, Delegación. No uses "expediente" para Trámite.

REGLA DE ORO — DATOS PERSONALES (no negociable):
- Las capturas pueden mostrar personas reales. NUNCA transcribas nombres, apellidos, DNI/CUIT, domicilios,
  teléfonos, e-mails ni textos de casos. Reemplazalos por el tipo de dato: <APELLIDO>, <DNI 8 dígitos>, <CALLE>,
  <TEXTO LIBRE ~2 líneas>. Podés anotar formato y largo ("DNI sin puntos, 8 dígitos").
- Sí podés copiar textos de la interfaz (etiquetas, títulos, botones, menús, columnas, mensajes del sistema) y
  valores de catálogos institucionales (tipos de trámite, áreas del nomenclador, nombres de delegaciones, organismos
  como Ejesa). Si dudás de si algo es personal, tratalo como personal.
- No guardes las imágenes dentro del repo.

QUÉ EXTRAER DE CADA CAPTURA:
1. Identificación: ID de vista que te indique, título de la ventana, menú desde el que se abre, modo (alta /
   edición / consulta / listado).
2. Campos: TODOS, en orden de pantalla, con: etiqueta exacta · tipo de control (texto, número, fecha, combo,
   check, opción, grilla, botón binoculares/buscador) · si parece obligatorio (asterisco, color, mensaje) · si está
   deshabilitado o se autocompleta · catálogo del que sale (si se ve) · formato del valor (anonimizado).
3. Grillas: columnas exactas en orden, qué filtra o alimenta cada una, relación maestro-detalle.
4. Botones y acciones: etiqueta exacta y qué parece hacer. Atajos de teclado si se ven.
5. Numeración: cómo se ve cualquier número oficial (ej. "Nro / Año", prefijo de delegación, correlativo) — es clave.
6. Estados y valores de catálogo visibles (estados, tipos, motivos, orígenes, ámbitos) — copiá la lista completa
   si un combo está desplegado.
7. Mensajes, validaciones o errores que aparezcan.
8. Lo que NO se puede saber solo con la imagen: escribilo como pregunta para el usuario, no lo inventes.

PREGUNTAS ABIERTAS QUE LAS CAPTURAS DEBERÍAN RESPONDER (marcá cuáles quedan respondidas):
- V-AS-02 Actuaciones: campos obligatorios al crear; ¿numeración central o por delegación? (P1); tipos de actuación
  existentes; estados (abierta/cerrada/archivada/reabierta); ¿se registra "contra quién" (institución)?; De Oficio.
- V-ME-03 Pre-consultas: ¿texto libre o nomenclador propio?; ¿agenda de audiencias con el Defensor?
- V-ADM-02 Digitalización: ¿el adjunto va a la Actuación, al Trámite o a ambos?; tipos de archivo; visor.
- V-ADM-03 Remitos: datos del remito, numeración, origen/destino, qué se remite.
- V-DEF-01 Geografía: niveles (país > provincia > departamento > localidad > barrio), código postal, campos extra.
- V-DEF-02 Nomenclador: niveles y campos de cada uno; ¿hay códigos?; ¿se dan de baja?
- V-DEF-03 Instituciones: campos (ámbito, CUIT, e-mail, contacto, domicilio).
- V-REP-01/02/03 Reportes: filtros, columnas, totales, exportación (Excel/PDF/impresión).
- V-SEC-02 Perfiles: cómo se definen permisos (por menú, por acción, por usuario).
- V-HER-01 Herramientas: qué opciones hay.
- Libro Diario (P6/P7): columnas y si el número es único o por delegación.
- "Grupos Sociales" del menú Definiciones (P8): qué se carga ahí.

FORMATO DE SALIDA:
Escribí (o actualizá, si ya existe) el archivo docs/capturas/<ID>.md con esta estructura, una ficha por vista:

# <ID> — <Nombre de la vista>
- Capturas analizadas: <n> · Fecha: <AAAA-MM-DD> · Analizado por: Gemini
## Identificación
## Campos
| # | Etiqueta exacta | Control | Obligatorio | Catálogo / origen | Formato (anonimizado) | Notas |
## Grillas
## Acciones
## Numeración
## Catálogos y estados visibles
## Mensajes y validaciones
## Preguntas abiertas respondidas por esta captura
(cita la pregunta y la respuesta; ej. "P1: numeración aparenta ser central — se ve 'Nro 123 / Año 2026' sin prefijo")
## Dudas para el usuario
(lo que la imagen no permite saber)
## Problemas de uso observados
(lo que se ve incómodo o propenso a errores; solo hechos visibles, sin proponer el diseño nuevo)

REGLAS DE TRABAJO:
- Español rioplatense, claro. Sé literal: si una etiqueta dice "Nro.Act.", escribí "Nro.Act.".
- Distinguí siempre lo que SE VE de lo que DEDUCÍS (marcá deducciones con "(deducido)").
- No edites ningún otro archivo del repo (ni RELEVAMIENTO, ni el modelo, ni el código): solo docs/capturas/.
  La integración la hace Claude Code después.
- No hagas commits.
- Al terminar cada vista, respondeme en el chat con un resumen de 5 líneas como máximo: qué quedó claro, qué
  preguntas se respondieron y qué captura más te falta.

Confirmame que entendiste y decime qué vista te paso primero (la prioridad es V-AS-02, Registro de Actuaciones).
```
