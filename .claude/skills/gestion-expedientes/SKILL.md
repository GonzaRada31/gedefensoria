---
name: gestion-expedientes
description: Conocimiento del dominio de la Defensoría del Pueblo de Jujuy — Actuantes, Consultas (pre-consulta, múltiple, grupal), Actuaciones (expedientes de Servicio y de Conflicto), Trámites (N:M, 7 categorías, Borrador→Definitivo, Libro Diario), Pedidos de Informe con reiteraciones y plazos, Actas, pases internos, roles y datos personales. Usar al planificar, modelar la base de datos, diseñar pantallas o decidir funciones del sistema, aunque el pedido no diga "expediente" ni "actuación".
---

# Dominio: Defensoría del Pueblo de Jujuy

> Resumen operativo de `docs/RELEVAMIENTO.md` y `docs/REQUERIMIENTOS.md` (la fuente de verdad son esos documentos;
> si chocan con esta skill, mandan ellos y se corrige acá). Lo marcado *(a validar)* sigue abierto: ver
> `docs/PREGUNTAS.md`. Lo confirmado pierde la marca.

## 1. Terminología (respetarla en código, base y pantallas)
| Término | Qué es | Ojo |
|---|---|---|
| **Actuante** | Persona física u organización que consulta | No "requirente" ni "ciudadano" en el modelo |
| **Consulta** | Registro de una atención | **Múltiple** (varios temas en una misma atención, la crea el Asesor clonando) · **Grupal** (varias personas, una consulta) |
| **Pre-consulta** | Visita que no pasa al Asesor (audiencias, trámites varios); termina en Mesa de Entradas | No genera Actuación |
| **Actuación** | **El expediente principal** | **De Servicio:** se abre y cierra en el acto · **De Conflicto:** inicia Trámites |
| **Trámite** | Cada gestión, escrito o hito de una Actuación de Conflicto | **N:M con Actuación** (un trámite puede estar en varias actuaciones) |
| **Carátula** | Nro + Año + Actuante + título de la Actuación | Buscador predictivo para no duplicar carátulas (RF-AD-006) |
| **Libro Diario** | Registro correlativo oficial de documentos que entran y salen | Inalterable; número al pasar a Definitivo |
| **Nomenclador** | Área → Grupo → Tema → Subtema | Clasificación obligatoria de toda consulta (RF-AS-005) |
| **Pase** | Derivación de una consulta (ME → Asesor) o de un expediente entre sectores | Asíncrono; el receptor acepta |
| **Atención** | Una visita física al consultorio (persona o grupo); agrupa sus consultas | Entidad del modelo nuevo (D-004), no existía en el legacy; 2+ consultas = "multi-temática" |

| **Programa / Operativo** | Programa institucional (ej. Defensoría Móvil) y cada salida a territorio | Marca en la Atención; la consulta sigue siendo del asesor (`docs/PROGRAMAS.md`) |

Modelo de datos: `docs/MODELO-DATOS.md` (borrador v0.1, pendientes marcados ⏳).

**Cómo se cuenta (confirmado 2026-11-19):** cada consulta (tema) suma 1 → una atención multi-temática con 3 temas =
3 consultas, 1 atención, 1 persona. Personas = actuantes distintos. Pre-consultas y asistentes a talleres se cuentan
aparte. Una consulta nunca suma dos veces: asesor, programa y tema son **cortes** del mismo total (`docs/INFORMES.md`).
**Ley de la Defensoría:** Ley provincial N° 6380 (competencia: Administración Pública provincial y municipal,
prestadoras de servicios públicos y de salud) *(texto completo a relevar, P5)*.

⚠️ En otros organismos "actuación" es un paso dentro del expediente: **acá no**. Actuación = expediente, Trámite = paso.

## 2. Flujo
1. **Mesa de Entradas:** busca o registra al Actuante (por DNI, sin duplicar) → ve sus antecedentes (asesor previo,
   actuación abierta, documentación pendiente) → registra la consulta o pre-consulta → da el **pase** a la cola de un
   Asesor sin bloquear la pantalla (WebSockets).
2. **Asesor:** toma la consulta de su bandeja → atiende → clasifica con el Nomenclador → puede crear más consultas en
   la misma atención (ME ve el indicador "Atención multi-temática") → cierra como **Actuación de Servicio** o abre
   una **Actuación de Conflicto**.
3. **Instrucción (Conflicto):** Trámites en Borrador → En Revisión → **Definitivo** (número del Libro Diario).
   Las **Actas** no reciben número hasta que las autoriza la **Secretaría Privada**.
4. **Pedidos de Informe:** 1 pedido base + hasta **2 reiteraciones** por destino y Actuación. Plazos configurables
   (24 h, 72 h, 5 días…), **hábiles o de corrido**. Semáforo verde/amarillo/rojo. Reiteración en 1 clic clonando.
   Prórroga solo con autorización del Asesor o un Secretario. Agotadas las reiteraciones → **Acta de Requerimiento**
   (estado `En Campo` → entregada sin respuesta / con respuesta).
5. **Respuesta:** al cargarla, **cierre cruzado**: se marcan con casillas los trámites pendientes que responde → `Respondido`.
6. **Cierre de la Actuación:** **Acta de Cierre** (presencial, firmada en papel y digitalizada) o **Constancia de
   Cierre** (no presencial, sin firma). Plantillas institucionales en el Plantillero Digital.

## 3. Estados y reglas que no se negocian
- **Trámite:** `Borrador`, `En Revisión`, `Definitivo`, `Vencido`, `Prorrogado`, `Respondido`, `Anulado`; Acta:
  `Pendiente de autorización`, `En Campo`, `Entregada sin respuesta`, `Acta con respuesta`. Máquina de estados en el
  backend (RELEVAMIENTO §8.G); las transiciones inválidas se rechazan en el servidor.
- **Nunca borrar:** trámites se **anulan** con motivo, usuario y fecha (soft delete). Borradores versionados:
  "Ver trámites corregidos" muestra versiones previas con diff y autor.
- **Tipos de trámite:** 31 tipos legacy agrupados en **7 categorías** para la UI (RELEVAMIENTO §8.B); se guarda el
  tipo detallado para reportes. Cada trámite tiene **Curso** (Entrada / Salida / Interno) y **Ámbito** (Nacional,
  Provincial, Municipal, Internacional, Privado, Particular, Otro + texto).
- **Canal de despacho:** físico (remito, Mesa de Entradas) o e-mail (lo envía la Secretaría Privada, PDF con membrete,
  queda la traza de quién y cuándo).
- **Cero hardcoding:** catálogos (nomenclador, tipos, plazos, feriados, motivos de pase, geografía, instituciones,
  plantillas) se administran desde la app.
- **"Sin información"** es un valor válido de tipo de documento: no forzar DNI.
- **De Oficio:** la Defensoría puede abrir actuaciones sin Actuante que consulte *(a validar: campos y flujo)*.

## 4. Sectores y roles
- Confirmados en el legacy: `SUPERADM`, `ASESOR`, `ADMINISTRATIVO` + sectores Mesa de Entradas, Asesores
  (abogados, psicólogos, trabajadores sociales), Administración, Informática, **Delegaciones** del interior.
- **Pendientes (ROL-01/02/03):** Secretaría General y Legal y Técnica, Secretaría Privada, Autoridades (Defensor,
  Adjunto Primero y Segundo). *(a validar)*
- Permisos **en el servidor** (el legacy expone Definiciones y Seguridad a cualquier administrativo: no repetirlo).

## 5. Datos personales y seguridad
- Ley 25.326 de Protección de Datos Personales y normativa provincial *(a validar cuál)*. Se manejan datos
  sensibles (salud, situación social, violencia): mínimo necesario y finalidad clara.
- **Auditoría** de quién vio, creó, cambió, anuló o exportó cada Actuación (tabla solo de inserción).
- Reserva de identidad del Actuante en notas a organismos *(a validar si se usa hoy)*.
- Nunca datos reales en desarrollo, tests, capturas ni en el chat: datos inventados. Las capturas del FoxPro que
  pase el usuario pueden tener datos reales: **no copiar nombres ni DNI a los docs**.
- Adjuntos en Azure Blob privado con enlaces temporales; exportaciones y estadísticas anonimizadas por defecto.

## 6. Diseño (además de `diseno-apps-gestion`)
- **Hardware viejo** y jornadas largas (RNF-001, RNF-004): liviano, rápido, poco cansador a la vista; WCAG 2.1 AA.
- En la cola de Mesa de Entradas, el **motivo/tema visible en la grilla**, sin abrir la ficha.
- Estado = color **+ texto**; vencimientos con número ("vence en 2 días hábiles").
- Búsqueda con **filtros concurrentes** (DNI, nombre, calle, barrio): muy valorada por los operadores.
- Lenguaje claro y no revictimizante en todo texto que reciba el Actuante.

## 7. Abierto *(a validar — ver `docs/PREGUNTAS.md`)*
Numeración de Actuaciones (central o por delegación) y campos obligatorios (V-AS-02) · Pre-consultas y agenda de
audiencias (V-ME-03) · adjuntos por Actuación o por Trámite (V-ADM-02) · remitos entre delegaciones (V-ADM-03) ·
roles ROL-01/02/03 · competencia legal LEGAL-01 · formato del Libro Diario (foto de una hoja real) · programas
P13–P15. **Confirmado:** Libro Diario con correlativo único anual; el asiento guarda delegación, fecha y quién
recibió (P7) · género opcional de lista con valor por defecto (P9).

## 8. Mejora continua
Cada respuesta del usuario o vista auditada que confirme o corrija algo de este archivo se aplica acá en la misma
sesión (y en `RELEVAMIENTO.md`, que es la fuente de verdad).
