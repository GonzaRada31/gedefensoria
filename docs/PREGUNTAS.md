# Preguntas para el usuario

> Cosas puntuales que necesito que respondas o hagas vos. Mientras no respondas, sigo con lo demás y aplico el
> **criterio por defecto** indicado. Respondé con el número (ej.: "P3: b"). Las respondidas pasan al final con la fecha.

## Pendientes

**P1. Numeración de Actuaciones (V-AS-02): ¿cómo se numeran hoy?**
- a) Un solo correlativo para toda la Defensoría, reiniciado por año (ej. `123/2026`) — lo más simple de auditar
- b) Correlativo por delegación (ej. `SSJ-123/2026`, `PER-45/2026`)
- c) Otro formato (contame cuál)
- *Por defecto:* a) en el borrador del modelo de datos, con el formato configurable. Lo mejor es una captura del FoxPro.

**P2. ¿Qué pueden hacer la Secretaría General y la Secretaría Legal y Técnica? (ROL-01)**
- a) Revisan y aprueban borradores (pasan Trámites a Definitivo) y ven todas las Actuaciones (recomendada) — coincide con
  "Asesor o Secretario" en RF-AS-006 y RF-AS-010
- b) Solo lectura y reportes
- *Por defecto:* a).

**P3. ¿Qué hace la Secretaría Privada además de autorizar Actas y enviar e-mails? (ROL-02)**
- a) Solo eso: autoriza números de Acta y despacha por e-mail; ve las Actuaciones que pasan por ella (recomendada)
- b) Además maneja la agenda de audiencias del Defensor (se cruza con Pre-consultas, V-ME-03)
- *Por defecto:* a), dejando lugar para b).

**P4. Autoridades (Defensor y Adjuntos) — ROL-03**
- a) Ven todo y los tableros; no cargan datos (recomendada)
- b) Además firman resoluciones dentro del sistema
- *Por defecto:* a).

**P5. Competencia legal (LEGAL-01): ¿podés conseguir la ley orgánica de la Defensoría de Jujuy?**
- Sirve para tipos de resolución, plazos legales y límites con privados. Si me pasás el número de ley, la busco.
- *Por defecto:* sigo sin ella; lo legal queda marcado *(a validar)* en la skill `gestion-expedientes`.

**P6. Foto de una hoja del Libro Diario**
- Para diseñar su vista digital (P-TR-01). **Tapá nombres y DNI** antes de pasarla.
- *Por defecto:* modelo con fecha, número, tipo, curso, actuación y destino/origen.

**P7. Numeración del Libro Diario: ¿un solo correlativo o uno por delegación?**
- a) Un solo correlativo anual para toda la Defensoría (recomendada si hay un único libro físico en Casa Central)
- b) Un libro por delegación, cada uno con su correlativo
- *Por defecto:* a), configurable (`docs/MODELO-DATOS.md` §3.4). La foto de P6 probablemente lo responde.

**P8. "Grupos Sociales" (menú Definiciones del FoxPro): ¿qué se carga ahí?**
- a) Pertenencia del Actuante a un colectivo (comunidad originaria, discapacidad, adultos mayores…) para estadísticas
- b) Agrupaciones u organizaciones que consultan en conjunto (vecinales, cooperativas)
- c) No se usa
- *Por defecto:* no se modela hasta ver una captura; si es a), será un catálogo opcional con marca de dato sensible.

**P9. ¿Se registra sexo o género del Actuante?**
- a) Sí, género autopercibido opcional (Ley 26.743), solo para estadísticas (recomendada si la Defensoría informa
  indicadores por género)
- b) No se registra
- *Por defecto:* b) hasta que lo confirmes (mínimo dato necesario).

**P10. ⚖️ ¿Se pueden alojar los datos fuera de Argentina? (legal, no avanzo sin respuesta para producción)**
- Azure no tiene región en Argentina; la más cercana es Brasil. La Ley 25.326 (art. 12) limita transferir datos
  personales a países sin protección "adecuada". Lo tiene que confirmar Legal y Técnica.
- a) Sí, Azure Brasil está aceptado (con contrato de Microsoft y cláusulas de protección de datos)
- b) No: hay que alojar en un servidor de la provincia o un proveedor argentino
- c) Lo consulto
- *Por defecto:* sigo con la propuesta Azure en `docs/DEVOPS.md` para el entorno de **pruebas con datos inventados**;
  producción queda frenada hasta tener respuesta.

**P11. Suscripción de Azure y dominio: ¿quién los administra?**
- a) La Defensoría con una suscripción propia (recomendada: el organismo es dueño de sus datos y cuentas)
- b) TI de la provincia
- c) Un proveedor externo
- *Por defecto:* a). Hace falta saber también qué subdominio oficial se usaría.

**P12. ¿Cómo entran los usuarios al sistema?**
- a) Usuario y contraseña propios del sistema, con segundo factor opcional (recomendada si el organismo no tiene
  cuentas Microsoft o Google institucionales)
- b) Con la cuenta institucional (Microsoft 365 / Google Workspace), si existe
- *Por defecto:* a), dejando preparada la opción b).

## Respondidas
