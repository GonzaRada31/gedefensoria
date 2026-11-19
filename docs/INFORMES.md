# Informes y estadísticas — plan v0.1 (2026-11-19)

> Qué informes va a tener el sistema, quién ve cada uno y **cómo se cuenta cada número**. Es la base de RF-AD-004.
> Se detalla pantalla por pantalla en la Fase 2; lo marcado ⏳ espera definición de roles (ROL-01/02/03) o capturas
> de `V-REP-01/02/03`.

## 1. Qué se cuenta (definiciones únicas para todo el sistema)
Cada número del sistema sale de **una sola definición**. Hoy los informes se arman a mano y aparecen diferencias
(ej. un mismo profesional escrito de dos formas, o meses con más personas que consultas). Con el sistema nuevo, el
informe se calcula solo y siempre de la misma manera.

| Indicador | Qué cuenta | Ejemplo |
|---|---|---|
| **Consultas** | Cada problemática registrada (`consulta` tipo CONSULTA). Una atención multi-temática con 3 temas suma **3 consultas** | Informe Defensoría Móvil mar–oct 2026: 2.452 |
| **Personas atendidas** | Actuantes **distintos** en el período (sin repetir aunque vuelvan) | 1.462 |
| **Atenciones** | Visitas (cada vez que una persona o un grupo es atendido). 1 atención = 1 o más consultas | — |
| **Pre-consultas** | Se cuentan **aparte**: no suman a "Consultas" ni a la carga de los asesores | — |
| **Actuaciones abiertas / cerradas** | Por fecha de apertura / de cierre; de Servicio y de Conflicto por separado | — |
| **Asistentes a actividades** | Personas en talleres o charlas (no son consultas, ver `PROGRAMAS.md`) | "Taller Perico": 81 asistentes |

**Respuesta a "¿la multi-temática suma como una o como varias?":** suma como **varias consultas** (una por tema) y
como **una sola atención** y **una persona** (o las del grupo). Las tres cifras se muestran juntas, así no se infla
nada: 3 consultas de 1 persona en 1 atención.

**Regla de no duplicar:** una consulta tiene un solo asesor, una sola delegación y, como máximo, un programa. Los
informes **cortan** el mismo total por distintas dimensiones (por asesor, por programa, por tema); nunca suman la
consulta dos veces. La suma de "por programa" + "sin programa" da siempre el total general.

## 2. Dimensiones (los "cortes" disponibles en todos los informes)
Período (día/semana/mes/año) · delegación · sector · asesor · **programa / operativo** · lugar (localidad, barrio) ·
nomenclador (área, grupo, tema, subtema) · **eje temático** ⏳ (agrupación transversal: Previsional, Discapacidad,
Servicios públicos…, ver `PROGRAMAS.md` §4) · origen de la consulta · institución reclamada · tipo de actuación ·
estado · género ⏳ (P9, solo agregado) · franja etaria (calculada).

## 3. Catálogo de informes por perfil
| # | Informe | ME | Asesor | Coord. programa | Administración | Secretarías ⏳ | Autoridades ⏳ | SUPERADM |
|---|---|---|---|---|---|---|---|---|
| I-01 | Cola del día y tiempos de espera/demora | ✔ | ✔ (propia) | — | ✔ | ✔ | ✔ | ✔ |
| I-02 | Mi producción (consultas, actuaciones, trámites por mes) | — | ✔ (propia) | ✔ (propia) | — | — | — | — |
| I-03 | Carga por asesor y por sector ("Novedades por asesor", `V-REP-03`) | — | — | ✔ (su equipo) | ✔ | ✔ | ✔ | ✔ |
| I-04 | Consultas por tema / eje / localidad (tablero) | — | ✔ (propias) | ✔ (programa) | ✔ | ✔ | ✔ | ✔ |
| I-05 | **Informe de programa** (Defensoría Móvil y otros): operativos, lugares, personas, consultas, temas, profesionales | — | — | ✔ | ✔ | ✔ | ✔ | ✔ |
| I-06 | Vencimientos y semáforo de Pedidos de Informe | — | ✔ (propios) | — | ✔ | ✔ | ✔ | ✔ |
| I-07 | Instituciones más reclamadas y tiempo de respuesta | — | — | — | ✔ | ✔ | ✔ | ✔ |
| I-08 | Actuaciones abiertas por antigüedad y por asesor | — | ✔ (propias) | — | ✔ | ✔ | ✔ | ✔ |
| I-09 | Libro Diario (listado y búsqueda) | — | ✔ | — | ✔ | ✔ | ✔ | ✔ |
| I-10 | Circuito interno de una actuación (`V-REP-02`) | ✔ | ✔ | — | ✔ | ✔ | ✔ | ✔ |
| I-11 | Buscador general / planillas (`V-REP-01`) con exportación | ✔ (limitada) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| I-12 | **Informe anual** (insumo del Informe Anual de la Defensoría) | — | — | — | ✔ | ✔ | ✔ | ✔ |
| I-13 | Auditoría de accesos y exportaciones | — | — | — | — | — | ⏳ | ✔ |

"(propia/os)" = solo lo suyo. Todo filtro de alcance se aplica **en el servidor**.

## 4. Reglas de los informes
- **Datos personales:** los tableros y exportaciones muestran agregados (cantidades), no nombres ni DNI. Listados
  nominales solo para quien tenga el permiso, y **cada exportación queda en la auditoría** (quién, qué filtros, cuándo).
- **Cifras chicas:** si un corte muestra menos de 5 personas en un tema sensible (violencia, salud), se muestra
  "menos de 5" en los informes que salen de la institución.
- **Exportación:** Excel (.xlsx) y PDF con membrete; el PDF lleva fecha, filtros usados y quién lo generó.
- **Rendimiento (RNF-001):** los tableros leen totales precalculados por día (se actualizan de noche y al cerrar cada
  atención), no recorren toda la base en cada consulta.
- **Informes guardados:** cada usuario puede guardar sus filtros favoritos ("Mis informes").
- **Sin dato → "—"**, nunca 0 (no es lo mismo "no hubo" que "no se cargó").

## 5. Pendiente
- Capturas de `V-REP-01/02/03` (qué informes usan hoy y cuáles extrañan).
- Qué informes piden las Autoridades y las Secretarías (ROL-01/02/03).
- Formato del Informe Anual (para que I-12 lo arme casi solo).
- Validar la regla de "menos de 5".
