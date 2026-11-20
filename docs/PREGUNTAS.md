# Preguntas para el usuario

> Cosas puntuales que necesito que respondas o hagas vos. Mientras no respondas, sigo con lo demás y aplico el
> **criterio por defecto** indicado. Respondé con el número (ej.: "P3: b"). Las respondidas pasan al final con la fecha.

## Pendientes

**P2, P3 y P4. Roles de Secretarías y Autoridades (ROL-01/02/03)** → se pide a cada sector con los mensajes de
`MENSAJES-SECTORES.md`.
- *Por defecto mientras tanto:* Secretarías General y Legal y Técnica revisan y aprueban borradores y ven todas las
  Actuaciones; Secretaría Privada autoriza Actas y despacha por e-mail; Autoridades ven todo y los tableros sin cargar.

**P5. Marco legal** → investigación inicial en `MARCO-LEGAL.md` (Ley 6380, Constitución 2023 art. 77, Ley 25.326) y
pedido de informe a Legal y Técnica (`MENSAJES-SECTORES.md` §2).

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

**P14. ¿Qué otros programas tiene la Defensoría?** Nombre, si salen a territorio y quién los coordina.
- *Por defecto:* el catálogo de programas queda abierto; arranca solo con "Defensoría Móvil".

**P19. Si las Autoridades deciden que los talleres cuentan como consultas: ¿cómo suman?**
- a) Una consulta por taller (recomendada: no infla el total)
- b) Una consulta por asistente
- *Por defecto:* el parámetro del panel arranca desactivado (no cuentan); si se activa, a).

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

**P20. Estado "Derivada" en la cola (prototipo, 2026-11-20)** → al dar pase, ¿la persona pasa directo a "En atención" o
queda "Derivada" hasta que el profesional la llama?
- *Por defecto:* queda **Derivada** (violeta) hasta que el profesional la toma desde su bandeja; ahí pasa a "En atención".
  "Espera larga" se marca a partir de los 30 minutos de espera (valor que va a ser configurable desde la app).

**P21. Pie del menú lateral** → la maqueta de Canva reemplazó el estado operativo (en línea, sede, contadores) por
Configuración + ficha del usuario.
- *Por defecto:* sale el estado operativo (los contadores ya están en las tarjetas de indicadores). La sede activa se
  muestra en el selector de delegación de la barra superior, que todavía falta agregar.

## Respondidas
- **P1 (2026-11-19):** correlativo único para toda la Defensoría que **reinicia cada año** (Actuación N° 1 cada
  1° de enero), con el año bien diferenciado. Formato en documentos: `DPJUJ-<número>-<año>` (configurable). Hoy el
  FoxPro numera de corrido desde el primer día: ese número se conserva como número histórico al migrar.
- **P13 (2026-11-19):** se carga en el momento o días después; selector "Pertenece a un programa" editable después
  (cambiar o quitar, con motivo); se planifica **modo sin conexión** (`PROGRAMAS.md` §6, D-006).
- **P15 (2026-11-19):** registro tipo "Taller / charla" con datos mínimos (participantes que no dan datos o son
  menores) y planilla adjunta opcional solo para control interno. Si cuentan como consultas lo deciden las
  Autoridades: parámetro del panel (P19).
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
