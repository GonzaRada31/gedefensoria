# Acceso, sesiones y Panel del Superadministrador — plan v0.1 (2026-11-19)

> Respuesta a P12. Se detalla en una sesión dedicada antes de construirlo (ver §5, pendiente "planificar en detalle").
> Relacionado: `MODELO-DATOS.md` §3.1 (usuarios, roles, permisos) y §3.5 (auditoría).

## 1. Quiénes entran
- Por ahora **solo personal de la Defensoría**. Cada usuario está atado a un empleado (alta unificada, `V-ADM-01`).
- **Alta por invitación**, nunca con clave inventada por el administrador:
  1. RRHH entrega el listado de personal activo (legajo, apellido, nombre, e-mail institucional, sector, delegación).
     El listado se importa desde el panel (CSV/Excel) con **vista previa y validación** (e-mails repetidos,
     sectores inexistentes) antes de grabar.
  2. El Superadministrador elige a quiénes invitar y con qué rol. El sistema manda un **e-mail con un enlace de un
     solo uso** que vence en 72 h ⏳ (P16: desde qué correo).
  3. La persona crea su clave y queda activa. Si el enlace vence, se reenvía desde el panel.
- **Bajas:** cuando RRHH informa una baja, el usuario se **desactiva** (nunca se borra: su autoría queda en la
  auditoría). Sus actuaciones abiertas se reasignan desde el panel.
- En desarrollo y pruebas, el listado de RRHH se reemplaza por **datos inventados**. El listado real se carga recién
  en producción.

## 2. Usuario y contraseña
| Pedido | Cómo se resuelve | Límite honesto |
|---|---|---|
| Que la clave no se guarde en el navegador | El formulario de ingreso desalienta el guardado (`autocomplete` adecuados, sin "recordarme"). **Lo que realmente lo impide** es una política de Chrome/Edge en las PC de la Defensoría (`PasswordManagerEnabled = false`) que configura TI | Un navegador personal sin esa política puede ofrecer guardarla igual: ninguna página web lo puede bloquear del todo |
| Que la clave no pueda ser capturada | Solo HTTPS; la clave nunca se guarda ni se registra (se guarda un *hash* Argon2id, una huella que no se puede revertir); nunca aparece en logs ni en URLs; bloqueo temporal tras 5 intentos fallidos; aviso de ingreso desde un equipo nuevo | Un programa espía instalado en la PC sí puede capturarla: eso se cubre con el **segundo factor** (código en el celular), recomendado obligatorio para SUPERADM y Autoridades |
| Clave robusta | Mínimo 12 caracteres, se rechazan claves filtradas conocidas y datos propios (DNI, nombre); sin vencimiento periódico forzado (la recomendación actual es cambiarla ante sospecha) | — |
| Recuperar la clave | Enlace de un solo uso al e-mail institucional; el Superadministrador puede forzar el cambio | — |

## 3. Una sola sesión por usuario (sin perder datos)
- Cada usuario tiene **como máximo una sesión activa**.
- Si entra desde otro equipo con una sesión abierta, ve: *"Tenés una sesión abierta en [equipo/navegador] desde las
  [hora]. ¿Cerrarla y continuar acá?"*. Si confirma:
  1. La sesión vieja recibe un aviso en pantalla (por WebSocket): *"Se inició tu sesión en otro equipo. Guardando
     tus cambios…"*.
  2. Se **guardan solos los borradores** de lo que esté abierto (formularios con guardado automático en el servidor
     cada pocos segundos, tabla `borrador_formulario`).
  3. Recién después se cierra la sesión vieja y se abre la nueva. Al volver a entrar, el sistema ofrece *"Tenés
     un borrador sin terminar de [formulario]: ¿continuar?"*.
- Igual con el **cierre por inactividad** ⏳ (P17, tiempo sugerido: 30 min) y con el **cierre forzado** desde el
  panel: siempre con aviso, guardado del borrador y luego el cierre. Nunca se corta de golpe.
- La sesión se maneja con cookie `HttpOnly` + `Secure` (el código de la página no la puede leer) y se renueva sola
  mientras se use.

## 4. Panel del Superadministrador (índice a desarrollar)
Panel con **tarjetas configurables** (cada administrador elige qué ve y en qué orden) y secciones:

| Sección | Contenido |
|---|---|
| **Resumen** | Estado general en semáforo: servidor, base, almacenamiento, correo, último respaldo, errores de las últimas 24 h, usuarios conectados ahora |
| **Usuarios** | Alta por invitación e importación de RRHH, roles, activar/desactivar, forzar cambio de clave, reenviar invitación, reasignar actuaciones |
| **Sesiones** | Quién está conectado, desde dónde y desde cuándo; cierre controlado (§3) |
| **Roles y permisos** | Matriz rol × permiso editable; vista "qué puede hacer este usuario" |
| **Auditoría** | Quién vio, creó, cambió, anuló o exportó qué; filtros por usuario, expediente y fecha; exportable |
| **Seguridad** | Intentos fallidos, bloqueos, ingresos desde equipos nuevos, segundo factor por usuario |
| **Servidores e infraestructura** | CPU, memoria, espacio, conexiones a la base, tamaño de tablas, tiempos de respuesta, colas de WebSocket |
| **Respaldos** | Último respaldo, resultado de la última prueba de restauración, retención |
| **Tareas programadas** | Vencimientos, totales de informes, limpiezas: última ejecución y resultado; ejecutar a mano |
| **Correo** | Cola de envíos (invitaciones, despachos a organismos), rebotes, reintentos |
| **Logs técnicos** | Errores de la aplicación (sin datos personales), con búsqueda |
| **Catálogos y parámetros** | Acceso a todas las tablas administrables y a los parámetros (plazos, feriados, semáforo, numeración, plantillas) |
| **Avisos del sistema** | Mensaje para todos los usuarios (ej. "mantenimiento el viernes 18 h") |

Las acciones del panel quedan en la auditoría. Los permisos del panel son granulares: puede haber un "administrador
de usuarios" que no vea los servidores.

## 5. Pendiente
- **Sesión de planificación detallada del panel** (pantallas, métricas exactas, alertas y a quién llegan).
- P16 correo de salida · P17 tiempo de inactividad · política de Chrome con TI · segundo factor obligatorio para qué roles.
