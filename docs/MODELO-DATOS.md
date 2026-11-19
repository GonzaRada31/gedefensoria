# Modelo de datos — borrador v0.1 (2026-11-19)

> Borrador del diagrama entidad-relación (ER: qué tablas hay y cómo se conectan) para PostgreSQL + Prisma (D-001).
> Sale de `RELEVAMIENTO.md` (§2–§8), `REQUERIMIENTOS.md` y la skill `gestion-expedientes`.
> **Marcas:** ⏳ = depende de una vista sin auditar o de una pregunta abierta (`PREGUNTAS.md`). Lo que no tiene marca
> se considera firme salvo que la Defensoría diga otra cosa.
> No es todavía el `schema.prisma`: se traduce a Prisma al arrancar la Fase 2.

## 1. Convenciones (D-004)
- **Nombres en español** y con la terminología del dominio: `actuante`, `actuacion`, `tramite`. Tablas en
  `snake_case`, modelos Prisma en `PascalCase`.
- **Identificadores:** UUID (v7, ordenable por fecha) en las entidades operativas (actuante, consulta, actuación,
  trámite, adjunto) para no exponer números correlativos en las URLs; `int` autoincremental en catálogos.
  El **número oficial** (ej. `123/2026`) es otro campo, nunca la clave.
- **Columnas comunes:** `creado_en`, `creado_por_id`, `actualizado_en`, `actualizado_por_id`.
- **Nunca borrar:** catálogos se desactivan (`activo = false`); trámites, adjuntos y pases se **anulan**
  (`anulado_en`, `anulado_por_id`, `motivo_anulacion`). La base de producción no da permiso de `DELETE` al usuario de
  la app sobre tablas operativas.
- **Lo derivado se calcula:** edad (de la fecha de nacimiento), tiempo de espera (de los horarios de la atención),
  semáforo (del vencimiento), "atención multi-temática" (cantidad de consultas de la atención), ubicación actual de una
  actuación (último pase aceptado). Excepciones justificadas en §6.
- **Catálogos administrables** (cero hardcoding): todo lo que es lista de opciones vive en una tabla con ABM
  (alta, baja y modificación) desde la app. Los enums de Prisma se usan **solo** para estados que maneja la máquina
  de estados del código (ej. estado del trámite), no para opciones del negocio.

## 2. Mapa general

```mermaid
flowchart LR
  subgraph ORG[Organización y seguridad]
    Delegacion --- Empleado --- Usuario --- Rol
    Empleado --- Sector
  end
  subgraph ATE[Atención]
    Actuante --- Consulta --- Atencion
  end
  subgraph EXP[Expedientes]
    Actuacion --- Tramite --- LibroDiario
    Actuacion --- Pase
    Tramite --- Adjunto
  end
  subgraph CAT[Catálogos]
    Geografia
    Nomenclador
    Institucion
    TiposTramite[Tipos de trámite]
    Plazos[Plazos y feriados]
  end
  Consulta --> Actuacion
  ATE --- CAT
  EXP --- CAT
  ORG -. auditoría .-> Auditoria[(evento_auditoria)]
```

## 3. Diagramas ER por módulo

### 3.1 Organización y seguridad

```mermaid
erDiagram
  delegacion ||--o{ empleado : "trabaja en"
  empleado ||--o| usuario : "tiene cuenta"
  empleado }o--o{ sector : "empleado_sector"
  usuario }o--o{ rol : "usuario_rol"
  rol }o--o{ permiso : "rol_permiso"
  localidad ||--o{ delegacion : "sede"

  delegacion {
    int id PK
    string codigo UK "ej. CC, PER"
    string nombre "Casa Central, Perico..."
    int localidad_id FK
    bool activo
  }
  sector {
    int id PK
    string nombre "Mesa de Entradas, Abogados, Psicología..."
    bool atiende_consultas "aparece como destino de pases ME->Asesor"
    bool activo
  }
  empleado {
    uuid id PK
    string cuit UK
    string apellido
    string nombre
    int delegacion_id FK
    bool activo
  }
  usuario {
    uuid id PK
    uuid empleado_id FK
    string usuario UK
    string hash_clave "argon2; o login institucional (ver DEVOPS)"
    bool activo
    datetime ultimo_acceso
  }
  rol {
    int id PK
    string codigo UK "SUPERADM, ASESOR, ADMINISTRATIVO, MESA_ENTRADAS..."
    string nombre
  }
  permiso {
    int id PK
    string codigo UK "tramite.aprobar, acta.autorizar, actuacion.ver_todas..."
  }
```

- Alta unificada de empleado + usuario + sectores + roles en un solo formulario (mejora de `V-ADM-01`).
- **Permisos granulares** (`rol_permiso`): los roles son conjuntos de permisos editables, así los roles pendientes
  (ROL-01/02/03 ⏳) se crean desde la app sin tocar código. Los permisos (`permiso.codigo`) sí los define el código,
  porque cada uno protege una acción concreta del servidor. ⏳ `V-SEC-02` puede sumar "autorizaciones" por usuario.
- **Alcance de datos** por rol: ver todas las actuaciones / solo las de su delegación / solo las suyas — se resuelve
  con permisos (`actuacion.ver_todas`, `actuacion.ver_delegacion`) y se aplica en el servidor en cada consulta.

### 3.2 Actuantes y atención (Mesa de Entradas → Asesor)

```mermaid
erDiagram
  actuante ||--o{ consulta_actuante : ""
  consulta ||--|{ consulta_actuante : "1 o más (grupal)"
  atencion ||--|{ consulta : "1 o más (múltiple)"
  consulta |o--o| consulta : "clonada de"
  consulta }o--o| actuacion : "resultado"
  tipo_documento ||--o{ actuante : ""
  localidad ||--o{ actuante : "domicilio"
  barrio ||--o{ actuante : "domicilio"
  empleado ||--o{ atencion : "asesor asignado"
  tema ||--o{ consulta : "clasificación"
  subtema ||--o{ consulta : "clasificación"
  origen_consulta ||--o{ consulta : ""
  institucion ||--o{ consulta : "contra / sobre"
  motivo_sin_atender ||--o{ atencion : ""

  actuante {
    uuid id PK
    string tipo "FISICA | ORGANIZACION"
    int tipo_documento_id FK "null si sin_documento"
    string nro_documento "único por tipo, si existe"
    bool sin_documento "reemplaza al DNI 0 del legacy"
    string apellido
    string nombre
    string razon_social "si es organización"
    string cuit
    date fecha_nacimiento "edad = calculada"
    string telefono
    string email
    string calle
    string numero
    int localidad_id FK
    int barrio_id FK "opcional; debe pertenecer a la localidad"
    string codigo_postal
  }
  atencion {
    uuid id PK
    int delegacion_id FK
    uuid asesor_id FK
    string estado "EN_ESPERA, DERIVADA, EN_ATENCION, FINALIZADA, SIN_ATENDER"
    datetime llegada
    datetime derivada_en "pase ME->Asesor"
    datetime aceptada_en "el Asesor la toma"
    datetime finalizada_en
    int motivo_sin_atender_id FK
  }
  consulta {
    uuid id PK
    int anio
    int secuencia "correlativo por año (como el legacy)"
    string tipo "CONSULTA | PRE_CONSULTA"
    uuid atencion_id FK "null en pre-consultas"
    uuid consulta_origen_id FK "clonación: consulta similar / múltiple"
    string referencia "motivo breve, visible en la cola de ME"
    int origen_id FK "Personal, Telefónica, Mail..."
    int tema_id FK "obligatorio al cerrar (RF-AS-005)"
    int subtema_id FK "opcional si el tema no tiene subtemas"
    int institucion_id FK "opcional"
    text detalle "dictamen del asesor - dato sensible"
    uuid actuacion_id FK "Servicio o Conflicto que genera o continúa"
  }
  consulta_actuante {
    uuid consulta_id PK
    uuid actuante_id PK
    string rol "TITULAR, INTEGRANTE, REPRESENTANTE"
  }
```

- **Atención** = la visita física (una persona o grupo entra al consultorio). Agrupa las consultas de esa visita:
  si tiene 2 o más, ME ve "Atención multi-temática (n)" (RF-ME-008). No existía como tabla en el legacy; resuelve la
  consulta múltiple sin trucos.
- **Grupal** = varias filas en `consulta_actuante`. **Representante** (campo del legacy) = otra fila con ese rol.
- **Pase ME → Asesor:** cambiar `atencion.estado` a `DERIVADA` + evento Socket.io a la sala del asesor. El horario de
  cada cambio queda en la propia atención (tiempo de espera y de demora se calculan).
- **Pre-consulta** = `consulta.tipo = PRE_CONSULTA`, sin atención ni actuación. ⏳ `V-ME-03`: si tienen nomenclador
  propio o agenda de audiencias, se agrega una tabla `audiencia`.
- **Duplicados:** índice único parcial `(tipo_documento_id, nro_documento) WHERE nro_documento IS NOT NULL` + búsqueda
  aproximada por nombre (extensiones `pg_trgm` y `unaccent`) para avisar posibles repetidos.
- ⏳ "Grupos Sociales" (menú Definiciones del legacy): sin relevar, ver P8.
- ⏳ Género / sexo: el legacy no lo muestra en `V-ME-04`; ver P9.

### 3.3 Actuaciones, pases y remitos

```mermaid
erDiagram
  actuacion ||--o{ actuacion_actuante : ""
  actuante ||--o{ actuacion_actuante : ""
  actuacion ||--o{ consulta : "originada por"
  actuacion ||--o{ pase : "circuito interno"
  tipo_actuacion ||--o{ actuacion : ""
  delegacion ||--o{ actuacion : "numeración ⏳"
  empleado ||--o{ actuacion : "asesor responsable"
  motivo_pase ||--o{ pase : ""
  remito ||--o{ remito_item : ""
  actuacion ||--o{ remito_item : ""

  actuacion {
    uuid id PK
    int numero "⏳ P1: correlativo anual central o por delegación"
    int anio
    int delegacion_id FK
    int tipo_actuacion_id FK "catálogo; cada tipo es SERVICIO o CONFLICTO"
    bool de_oficio "sin Actuante que consulte ⏳ campos"
    string caratula "buscador predictivo (RF-AD-006)"
    int tema_id FK
    int subtema_id FK
    uuid asesor_responsable_id FK
    string estado "ABIERTA, CERRADA ⏳ (archivo, reapertura)"
    date fecha_apertura
    date fecha_cierre
    string tipo_cierre "ACTA_CIERRE | CONSTANCIA_CIERRE | SERVICIO"
  }
  actuacion_actuante {
    uuid actuacion_id PK
    uuid actuante_id PK
    string rol "TITULAR, CO_ACTUANTE"
  }
  pase {
    uuid id PK
    uuid actuacion_id FK
    int sector_origen_id FK
    uuid usuario_origen_id FK
    int sector_destino_id FK
    uuid usuario_destino_id FK "opcional"
    int motivo_pase_id FK "obligatorio (RF-AD-007)"
    string observacion
    string estado "PENDIENTE, ACEPTADO, RECHAZADO, ANULADO"
    datetime enviado_en
    datetime respondido_en
    uuid respondido_por_id FK
  }
  remito {
    uuid id PK
    int numero "⏳ V-ADM-03"
    int delegacion_origen_id FK
    int delegacion_destino_id FK
    datetime fecha
  }
  remito_item {
    uuid remito_id PK
    uuid actuacion_id PK
  }
```

- **Número oficial:** único `(anio, numero)` o `(delegacion_id, anio, numero)` según P1 ⏳. Se genera en el servidor
  con un contador bloqueado por fila (tabla `contador`, ver §3.5), nunca con `MAX()+1`.
- **Servicio:** se crea ya cerrada (`fecha_cierre = fecha_apertura`, `tipo_cierre = SERVICIO`) desde la consulta.
- **Conflicto:** se cierra con un trámite de tipo Acta de Cierre o Constancia de Cierre (RELEVAMIENTO §8.H).
- **Ubicación actual** = sector destino del último pase `ACEPTADO` (se calcula). Un pase pendiente no mueve el
  expediente hasta que el receptor acepta (`P-INT-01`).
- ⏳ `V-AS-02`: campos obligatorios al crear, tipos de actuación existentes, ¿reapertura?, ¿contra qué institución?
  (hoy se infiere de la consulta y de los trámites).

### 3.4 Trámites, Libro Diario, plazos y respuestas

```mermaid
erDiagram
  actuacion ||--o{ actuacion_tramite : ""
  tramite ||--|{ actuacion_tramite : "N:M (RF-AD-001)"
  categoria_tramite ||--|{ tipo_tramite : "7 categorías / 31 tipos"
  tipo_tramite ||--o{ tramite : ""
  tipo_tramite ||--o{ plantilla : "plantillero"
  tramite ||--|{ tramite_version : "historial (no se pisa)"
  tramite ||--o{ tramite_estado_historial : ""
  tramite |o--o{ tramite : "reiteración de"
  tramite ||--o| libro_diario_asiento : "número al ser Definitivo"
  tramite ||--o{ prorroga : ""
  tramite ||--o{ respuesta_tramite : "respuesta"
  tramite ||--o{ respuesta_tramite : "respondido"
  tramite ||--o| acta_diligencia : "En Campo"
  tramite ||--o{ despacho_email : ""
  plazo ||--o{ tramite : ""
  ambito ||--o{ tramite : ""
  institucion ||--o{ tramite : "destino / origen"

  tramite {
    uuid id PK
    int tipo_tramite_id FK
    string curso "ENTRADA | SALIDA | INTERNO"
    int ambito_id FK
    string ambito_otro "texto si ámbito = Otro"
    string estado "máquina de estados (§8.G)"
    string concepto
    int institucion_id FK "organismo o prestataria"
    string persona_emisora_receptora "si no es institución"
    date fecha
    string canal_despacho "FISICO | EMAIL"
    uuid reitera_a_id FK "1a reitera al pedido, 2a a la 1a"
    int nro_reiteracion "0, 1 o 2"
    int plazo_id FK
    datetime vencimiento "calculado al emitir/prorrogar (§6)"
    datetime anulado_en
    uuid anulado_por_id FK
    string motivo_anulacion
  }
  tipo_tramite {
    int id PK
    int categoria_id FK
    string nombre
    string cursos_permitidos "ENTRADA, SALIDA, INTERNO"
    bool usa_ambito
    bool numera_en_libro
    bool requiere_autorizacion_acta "Actas: Sec. Privada"
    bool es_pedido_informe
    bool cierra_actuacion
    bool activo
  }
  tramite_version {
    uuid id PK
    uuid tramite_id FK
    int nro_version
    text contenido "texto enriquecido"
    uuid autor_id FK
    datetime creado_en
  }
  tramite_estado_historial {
    bigint id PK
    uuid tramite_id FK
    string estado_desde
    string estado_hasta
    uuid usuario_id FK
    string motivo
    datetime fecha
  }
  libro_diario_asiento {
    bigint id PK
    int anio
    int numero "correlativo ⏳ P7"
    uuid tramite_id FK, UK
    string curso
    datetime fecha
    uuid registrado_por_id FK
  }
  prorroga {
    uuid id PK
    uuid tramite_id FK
    datetime vencimiento_anterior
    datetime vencimiento_nuevo
    uuid autorizada_por_id FK "Asesor o Secretario (RF-AS-010)"
    datetime autorizada_en
    string motivo
  }
  respuesta_tramite {
    uuid respuesta_id PK "trámite de entrada que responde"
    uuid tramite_respondido_id PK "pedido/acta que queda Respondido"
  }
  acta_diligencia {
    uuid tramite_id PK
    uuid autorizada_por_id FK "Secretaría Privada"
    datetime autorizada_en
    datetime salida_en
    datetime retorno_en
    bool recepcionada
    bool con_respuesta
  }
  despacho_email {
    uuid id PK
    uuid tramite_id FK
    string destinatario
    uuid enviado_por_id FK
    datetime enviado_en
    uuid adjunto_pdf_id FK
  }
  plazo {
    int id PK
    string nombre "24 h, 72 h, 5 días hábiles..."
    int cantidad
    string unidad "HORAS | DIAS"
    bool habiles
    bool activo
  }
```

- **Estados** (enum del código, RELEVAMIENTO §8.G): `BORRADOR`, `EN_REVISION`, `DEFINITIVO`, `VENCIDO`,
  `PRORROGADO`, `RESPONDIDO`, `ANULADO`, y para Actas `PENDIENTE_AUTORIZACION`, `EN_CAMPO`,
  `ENTREGADA_SIN_RESPUESTA`, `ACTA_CON_RESPUESTA`. Cada cambio de estado escribe `tramite_estado_historial` **en la
  misma transacción** que actualiza `tramite.estado`.
- **Regla de reiteraciones:** máximo 1 pedido + 2 reiteraciones por `(actuación, institución)`. Se valida en el
  servidor (no alcanza un índice, porque el trámite es N:M con actuaciones).
- **Vencido:** lo marca un proceso programado (tarea diaria + al consultar) comparando `vencimiento` con la hora
  actual; el semáforo (verde/amarillo/rojo) no se guarda, se calcula con un umbral configurable (`parametro`).
- **Cierre cruzado** (RF-AS-009): al cargar una respuesta se insertan filas en `respuesta_tramite` y los trámites
  elegidos pasan a `RESPONDIDO`, todo en una transacción.
- **Versiones:** cada guardado de un borrador crea una `tramite_version` nueva; "Ver trámites corregidos" las lista
  con diff y autor. Ninguna versión se modifica.

### 3.5 Catálogos, adjuntos, configuración y auditoría

```mermaid
erDiagram
  pais ||--|{ provincia : ""
  provincia ||--|{ departamento : ""
  departamento ||--|{ localidad : ""
  localidad ||--o{ barrio : ""
  area ||--|{ grupo : ""
  grupo ||--|{ tema : ""
  tema ||--o{ subtema : ""
  ambito ||--o{ institucion : ""
  localidad ||--o{ institucion : ""
  actuacion ||--o{ adjunto : ""
  tramite ||--o{ adjunto : ""

  institucion {
    int id PK
    string nombre "Ejesa, Agua de los Andes, Ministerio..."
    int ambito_id FK
    string cuit
    string email "despacho por e-mail"
    string telefono
    bool activo
  }
  adjunto {
    uuid id PK
    uuid actuacion_id FK "uno de los dos ⏳ V-ADM-02"
    uuid tramite_id FK
    string blob_clave "Azure Blob privado"
    string nombre_original
    string tipo_mime
    int tamano_bytes
    string sha256 "integridad"
    uuid subido_por_id FK
    datetime anulado_en
  }
  feriado {
    date fecha PK
    string descripcion
    string alcance "NACIONAL | PROVINCIAL | INSTITUCIONAL"
  }
  contador {
    string clave PK "actuacion, libro_diario, consulta..."
    int anio PK
    int delegacion_id PK "0 si es central"
    int ultimo
  }
  parametro {
    string clave PK "semaforo.dias_amarillo, numeracion.formato..."
    string valor
    string descripcion
  }
  evento_auditoria {
    bigint id PK
    datetime fecha
    uuid usuario_id
    string accion "VER, CREAR, MODIFICAR, ANULAR, EXPORTAR, LOGIN..."
    string entidad
    string entidad_id
    jsonb cambios "antes/después"
    string ip
  }
```

Otros catálogos simples (id, nombre, activo): `tipo_documento`, `origen_consulta`, `motivo_sin_atender`,
`tipo_actuacion`, `motivo_pase`, `motivo_recepcion_tramite` (legacy "Motivos de Estados de Recepción"),
`categoria_tramite`, `ambito`, `plantilla`.

- **Geografía y nomenclador** ⏳ `V-DEF-01`/`V-DEF-02`: la estructura sale del menú legacy; se confirma con capturas
  y se carga con el seeder (RNF-005). Nomenclador en 4 tablas (no una tabla recursiva) porque la profundidad es fija
  y así las estadísticas por área/grupo son consultas simples.
- **Auditoría:** tabla solo de inserción, sin claves foráneas (para que nunca frene una operación), particionada por
  mes cuando crezca. Registra también las **lecturas** de actuaciones y actuantes (quién vio qué).
- **Adjuntos:** `CHECK (actuacion_id IS NOT NULL OR tramite_id IS NOT NULL)`. Se descargan con enlaces temporales.

## 4. Índices clave (RNF-001: hardware y red lentos)
| Tabla | Índice | Para qué |
|---|---|---|
| `actuante` | único parcial `(tipo_documento_id, nro_documento)`; GIN trigram sobre `unaccent(apellido \|\| ' ' \|\| nombre)`; `(calle)`, `(barrio_id)` | Búsqueda con filtros concurrentes y control de duplicados |
| `atencion` | `(delegacion_id, estado, llegada)` | Cola de ME del día |
| `consulta` | `(anio, secuencia)` único; `(actuacion_id)` | Antecedentes |
| `actuacion` | `(anio, numero[, delegacion_id])` único; `(asesor_responsable_id, estado)`; trigram sobre `caratula` | Bandeja y carátula predictiva |
| `actuacion_tramite` | PK `(actuacion_id, tramite_id)` + `(tramite_id)` | N:M en ambos sentidos |
| `tramite` | parcial `(vencimiento) WHERE estado IN ('DEFINITIVO','PRORROGADO')` | Semáforo y vencidos |
| `evento_auditoria` | `(entidad, entidad_id, fecha)` | Historial de un expediente |

## 5. Datos personales en el modelo
- Datos sensibles concentrados en `actuante` (identidad, contacto, domicilio) y en textos libres (`consulta.detalle`,
  `tramite_version.contenido`, adjuntos). Acceso controlado por permiso y registrado en `evento_auditoria`.
- Cifrado en reposo del lado de Azure (disco y Blob). Cifrado de columnas puntuales ⏳ si la Defensoría lo exige
  (complica la búsqueda: evaluarlo solo para campos que no se buscan).
- Exportaciones y tableros: agregados y sin datos identificatorios por defecto.

## 6. Datos guardados aunque se puedan calcular (excepciones justificadas)
| Dato | Por qué se guarda |
|---|---|
| `tramite.estado` | Se consulta todo el tiempo; el historial completo vive en `tramite_estado_historial` y se escriben juntos |
| `tramite.vencimiento` | El plazo legal queda fijo al emitir: si después se carga un feriado nuevo, no debe mover vencimientos ya notificados. Una prórroga lo recalcula y deja rastro en `prorroga` |
| `consulta.secuencia`, `actuacion.numero`, `libro_diario_asiento.numero` | Son números oficiales, no se recalculan nunca |

## 7. Pendientes que cambian el modelo
| Pendiente | Impacto |
|---|---|
| P1 / `V-AS-02` numeración y campos de Actuación | Clave única de `actuacion`, campos obligatorios, estados de cierre/archivo |
| P7 numeración del Libro Diario | Clave única de `libro_diario_asiento` (anual central o por delegación) |
| `V-ME-03` pre-consultas | Posible tabla `audiencia` y nomenclador de pre-consultas |
| `V-ADM-02` digitalización | Si el adjunto cuelga de actuación, trámite o ambos (hoy: ambos) |
| `V-ADM-03` remitos | Campos de `remito` |
| `V-DEF-01/02/03` catálogos | Columnas de geografía, nomenclador, instituciones |
| `V-SEC-02` perfiles | Autorizaciones por usuario además de por rol |
| ROL-01/02/03 | Permisos iniciales de cada rol (datos, no estructura) |
| P8 grupos sociales · P9 género | Tablas o campos nuevos en `actuante` |
