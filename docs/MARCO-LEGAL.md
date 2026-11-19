# Marco legal de la Defensoría — investigación v0.1 (2026-11-19)

> Investigación en fuentes públicas (P5 / LEGAL-01). **No es un dictamen jurídico:** lo marcado *(a validar)* lo
> tiene que confirmar la Secretaría Legal y Técnica (mensaje en `MENSAJES-SECTORES.md`). Fuentes al final.

## 1. Normas que rigen a la Defensoría
| Norma | Qué establece | Estado |
|---|---|---|
| **Constitución de la Provincia de Jujuy** (reforma publicada en el B.O. N° 68 del 21/06/2023) | Reconoce la Defensoría del Pueblo. Su **art. 77** protege los datos personales: acceso, rectificación, cancelación y oposición, y principios de finalidad, consentimiento, calidad, seguridad y confidencialidad | Vigente *(a validar: artículo exacto de la Defensoría en el texto 2023)* |
| **Ley N° 6380** "De la Defensoría del Pueblo de la Provincia de Jujuy" (B.O. N° 2, enero 2024) | Ley orgánica vigente. Fija competencia, procedimiento de quejas, obligación de colaborar y límites. Según la prensa, le da autonomía funcional y financiera | Vigente *(a validar: texto completo y modificaciones posteriores)* |
| Ley N° 5111 (1998) y antecedentes | Leyes anteriores de creación de la Defensoría | Probablemente reemplazadas por la 6380 *(a validar)* |
| **Ley nacional 25.326** de Protección de Datos Personales y normas de la AAIP | Tratamiento de datos, datos sensibles, seguridad, transferencias internacionales (art. 12) | Vigente; hay un proyecto de reforma en consulta pública |

## 2. Lo que importa de la Ley 6380 para el sistema (según los fragmentos públicos)
- **Competencia (art. 16):** la Administración Pública provincial y municipal, entes descentralizados y las
  prestadoras de servicios públicos y de salud. → El catálogo de **instituciones** necesita clasificar el ámbito,
  y una consulta sobre un organismo fuera de competencia tiene que poder registrarse como tal.
- **Exclusiones:** los Poderes Legislativo y Judicial cuando ejercen funciones legislativas o jurisdiccionales.
- **Obligación de colaborar:** los organismos alcanzados deben responder los pedidos de la Defensoría. → Es la base
  legal de los **Pedidos de Informe**, las reiteraciones y el Acta de Requerimiento *(a validar: plazos legales
  de respuesta y si la ley fija sanciones o la comunicación a la Legislatura)*.
- **Límites (art. 27):** la Defensoría no puede modificar, sustituir ni dejar sin efecto decisiones administrativas:
  recomienda, exhorta, media y advierte. → Los **tipos de resolución** del sistema salen de acá *(a validar: lista
  exacta, ej. recomendación, exhortación, advertencia, archivo)*.
- **Derivación de quejas:** si la queja está fuera de competencia o de plazo, puede derivarse a la autoridad
  competente, informando a la persona. → Hace falta un **motivo de cierre "Derivada / fuera de competencia"** y un
  plazo de presentación configurable *(a validar)*.
- **Autonomía funcional:** refuerza el criterio de D-005: los datos no deberían quedar en manos del Poder Ejecutivo.

## 3. Impacto en el sistema
| Tema | Dónde se refleja |
|---|---|
| Ámbito de competencia de cada institución | Catálogo `institucion` / `ambito` (`MODELO-DATOS.md` §3.5) |
| Fuera de competencia / derivación | Motivo de cierre de la consulta o actuación (nuevo, a confirmar) |
| Plazos legales de respuesta | Catálogo de plazos (los legales como predeterminados) |
| Tipos de resolución | Tipos de trámite de la categoría 7 |
| Datos sensibles (art. 77 de la Constitución y Ley 25.326) | `SEGURIDAD-ACCESO.md`, auditoría, `MODELO-DATOS.md` §5 |
| Alojamiento | `DEVOPS.md` §5 (D-005) |

## 4. Pendiente
- Texto completo de la Ley 6380 (Boletín Oficial N° 2/2024) → resumir artículo por artículo lo que afecta al sistema.
- Informe de la Secretaría Legal y Técnica (mensaje listo en `MENSAJES-SECTORES.md`).
- Si la Defensoría tiene reglamento interno, resoluciones de procedimiento o un registro de bases de datos ante la AAIP.

## Fuentes
- [Boletín Oficial de Jujuy N° 2/2024 — Ley 6380](https://boletinoficial.jujuy.gob.ar/?p=280268) ·
  [PDF](https://boletinoficial.jujuy.gob.ar/wp-content/uploads/2016/Boletines/2024/2-2024.pdf)
- [Constitución de Jujuy 2023 (PDF)](https://mpdpjujuy.gob.ar/wp-content/uploads/2024/02/constitucionprovincialjujuy2023_19-07-2023.pdf)
- [Protección de datos en la nueva Constitución de Jujuy (Marval)](https://www.marval.com/Publicacion/proteccion-de-datos-en-la-nueva-constitucion-provincial-de-jujuy-15580)
- [Ley 5111 (Boletín Oficial)](https://boletinoficial.jujuy.gob.ar/?p=53847)
- [Entrevista al Defensor del Pueblo (El Auditor)](https://elauditor.info/actualidad/pablo-luis-la-villa---en-jujuy--la-defensoria-del-pueblo-es-el-primer-escudo-que-tiene-la-gente-_a65d4c0866e6f5951a823e931)
- [Informe Anual 2024 de la Defensoría (PDF)](https://defensoriajujuy.org/wp-content/uploads/2026/01/INFORME_ANUAL_DEFENSORIA_DEL_PUEBLO_2024.pdf)
- [Ley 25.326 (texto oficial)](https://www.argentina.gob.ar/normativa/nacional/64790/texto)
