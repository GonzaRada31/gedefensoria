# Preguntas para el usuario

> Cosas puntuales que necesito que respondas o hagas vos. Mientras no respondas, sigo con lo demás y aplico el
> **criterio por defecto** indicado. Respondé con el número (ej.: "P3: b"). Las respondidas pasan al final con la fecha.

## Pendientes

**P1. Numeración de Actuaciones (V-AS-02): ¿cómo se numeran hoy?**
- a) Un solo correlativo para toda la Defensoría, reiniciado por año (ej. `123/2026`) — lo más simple de auditar
- b) Correlativo por delegación (ej. `SSJ-123/2026`, `PER-45/2026`)
- c) Otro formato (contame cuál)
- *Por defecto:* a), configurable. Lo resuelve una captura del FoxPro (prompt de Gemini).

**P2. ¿Qué pueden hacer la Secretaría General y la Secretaría Legal y Técnica? (ROL-01)**
- a) Revisan y aprueban borradores (pasan Trámites a Definitivo) y ven todas las Actuaciones (recomendada)
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

**P5. Ley de la Defensoría (LEGAL-01)**
- Ya sabemos que es la **Ley N° 6380** (sale del informe de la Defensoría Móvil). Si tenés el texto (PDF o link
  oficial), pasámelo; si no, lo busco yo. Sirve para tipos de resolución, plazos legales y competencia.
- *Por defecto:* la busco y la resumo en la skill `gestion-expedientes` marcando lo que haya que validar.

**P6. Foto de una hoja del Libro Diario** — para diseñar su vista digital. **Tapá nombres y DNI** antes de pasarla.
- *Por defecto:* fecha, número, tipo, curso, delegación, quién recibe, actuación y destino/origen.

**P8. "Grupos Sociales":** se resuelve con una captura (prompt de Gemini). *Por defecto:* no se modela hasta verla.

**P10. ⚖️ Dónde alojar el sistema (cambia D-002, ver D-005 y `DEVOPS.md` §5)**
- a) ARSAT, en pesos y con los datos en Argentina (recomendada, junto con c)
- b) Infraestructura de la Provincia (AWS del Ministerio de Modernización), por convenio. Ojo con la independencia:
  la Defensoría controla al Ejecutivo
- c) Proveedor argentino privado, en pesos
- d) Servidor propio nuevo en la Defensoría
- *Por defecto:* app portable (sirve para cualquiera de las cuatro); se decide antes de producción, con Legal y Técnica.

**P13. Defensoría Móvil: ¿dónde cargan las consultas en un operativo?** (`PROGRAMAS.md`)
- a) En el momento, con notebook o celular con datos (recomendada)
- b) En papel y después en la sede
- c) Ambas, con un modo sin conexión (mucho más complejo, para una fase posterior)
- *Por defecto:* a).

**P14. ¿Qué otros programas tiene la Defensoría?** Nombre, si salen a territorio y quién los coordina.
- *Por defecto:* el catálogo de programas queda abierto; arranca solo con "Defensoría Móvil".

**P15. Talleres y charlas: ¿alcanza con la cantidad de asistentes o hace falta la lista de personas?**
- a) Solo la cantidad (recomendada: mínimo dato necesario)
- b) Lista nominal
- *Por defecto:* a).

**P16. ¿Desde qué correo salen las invitaciones y los despachos a organismos?**
- a) Una casilla institucional de la Defensoría (ej. `sistema@<dominio>`), con los datos SMTP que dé TI (recomendada)
- b) Un servicio de envío externo (suele cobrarse en dólares: choca con P11)
- *Por defecto:* a). En desarrollo se usa Mailpit (no sale nada a internet).

**P17. Cierre por inactividad: ¿después de cuánto tiempo sin usar el sistema?**
- a) 30 minutos, con aviso 2 minutos antes y guardado del borrador (recomendada)
- b) 60 minutos
- c) Otro
- *Por defecto:* a), configurable desde el panel.

**P18. Logo y colores institucionales**: ¿hay manual de marca o logo oficial en buena calidad? (para la interfaz)
- *Por defecto:* paleta sobria (azul institucional y grises), reemplazable cuando llegue el logo.

## Respondidas
- **P7 (2026-11-19):** un solo correlativo del Libro Diario para toda la Defensoría. Al abrir un asiento se ve dónde
  se recibió el documento (delegación), la fecha, quién lo recibió y a qué actuación o actuaciones se adjuntó.
- **P9 (2026-11-19):** sí, género opcional, elegido de una lista predefinida y administrable, con una opción
  marcada por defecto (sugerida: "No informa").
- **P11 (2026-11-19):** por ahora administra el usuario (empleado de planta permanente). La Defensoría tiene
  limitaciones para pagar en dólares o al exterior (pesa en P10). *Recomendación:* usar cuentas con un e-mail
  institucional, no personal, y tener un segundo administrador de respaldo.
- **P12 (2026-11-19):** usuario y contraseña, sin guardado en el navegador, una sola sesión por usuario sin cortes
  bruscos, alta por invitación desde el listado de RRHH y un Panel de Superadministrador muy completo. Plan en
  `SEGURIDAD-ACCESO.md`.
