# Manual de Procedimientos Administrativos

> Cómo se hace cada tarea en la Defensoría, área por área, escrito para quien la hace todos los días.
> Es la base del **Centro de ayuda** del sistema: cada procedimiento se convierte en un artículo buscable dentro de la
> app, con enlaces a la pantalla correspondiente.
> Se actualiza **al cierre de cada sesión** (skill `cierre-de-sesion`, paso 5).

## Reglas de redacción
- Lenguaje claro, frases cortas, pasos numerados. Sin jerga técnica (si hace falta un término, se explica).
- Describe **cómo se trabaja con el sistema nuevo**; si hoy se hace distinto en el FoxPro, se aclara en "Cambios
  respecto del sistema anterior".
- Sin datos reales en los ejemplos (nombres y DNI inventados).
- Cada procedimiento tiene un **estado**: `Borrador` (lo escribió el equipo del proyecto con el relevamiento) →
  `Revisado` (lo leyó el área) → `Aprobado` (lo validó la jefatura). Al Centro de ayuda solo pasan los aprobados.

## Estructura
```
docs/manual/
├─ README.md            (este archivo: índice y plantilla)
├─ mesa-de-entradas/    PROC-ME-nn
├─ asesores/            PROC-AS-nn
├─ administracion/      PROC-AD-nn
├─ programas/           PROC-PR-nn (Defensoría Móvil y otros)
├─ secretarias/         PROC-SE-nn
└─ sistema/             PROC-SI-nn (ingreso, clave, panel de administración)
```

## Índice
| Código | Procedimiento | Área | Estado |
|---|---|---|---|
| PROC-ME-01 | [Atención en Mesa de Entradas y pase al asesor](mesa-de-entradas/PROC-ME-01-atencion-y-pase.md) | Mesa de Entradas | Borrador |
| PROC-AS-01 | [Pedido de Informe, reiteraciones y Acta de Requerimiento](asesores/PROC-AS-01-pedido-de-informe.md) | Asesores | Borrador |
| PROC-PR-01 | [Registro de consultas en un operativo de la Defensoría Móvil](programas/PROC-PR-01-operativo-defensoria-movil.md) | Programas | Borrador |

## Plantilla
```markdown
# PROC-XX-nn — <Nombre>
- Área: · Estado: Borrador · Última revisión: AAAA-MM-DD · Responsable de validar: <cargo>
## Para qué sirve
## Quién lo hace
## Cuándo
## Pasos
1. …
## Casos especiales
## Qué queda registrado
## Cambios respecto del sistema anterior
## Preguntas frecuentes
## Referencias (normativa, RF, otras guías)
```
