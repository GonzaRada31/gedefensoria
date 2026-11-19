---
name: cierre-de-sesion
description: Protocolo para cerrar una sesión de trabajo en el proyecto dejando todo documentado. Usar siempre que el usuario diga "cerramos", "fin de sesión", "terminamos por hoy", "dejá todo documentado" o similar, y también antes de un cambio de agente o de PC.
---

# Cierre de sesión

Seguí estos pasos en orden y mostrale al usuario un resumen al final.

1. **Bitácora** (`docs/BITACORA.md`): agregá una entrada arriba de todo con la fecha,
   qué se hizo, decisiones tomadas y pendientes. Máximo ~10 líneas.
2. **Tareas** (`docs/TAREAS.md`): marcá `[x] (fecha)` lo completado y agregá tareas nuevas.
3. **Decisiones** (`docs/DECISIONES.md`): si se cambió stack, base o arquitectura,
   registrá una nueva decisión con número correlativo.
4. **REGLAS.md, sección 2:** actualizá fase, fecha de última sesión y próximo paso.
5. **Skills:** revisá la sesión buscando correcciones del usuario o errores repetidos.
   Si alguno podría volver a pasar, proponé agregarlo a una skill existente o crear
   una nueva. Anotalo en la bitácora con `[skill]`.
6. **Commit:** proponé un commit `docs: cierre de sesión AAAA-MM-DD`.
   - Pasa por el hook de pre-commit (lint, tipos y tests). Antes, verificá que la base local esté levantada
     (el comando que figure en REGLAS.md).
   - Si el hook bloquea el commit, revisá `logs/tests-ultimo.log`, corregí y reintentá.
     **Nunca** uses `--no-verify`.
7. **Resumen al usuario:** si la sesión tuvo pedidos con varios puntos, confirmá punto por punto qué se hizo
   y qué quedó pendiente.

## Reglas
- No reescribas entradas viejas de la bitácora; solo agregá.
- Si REGLAS.md supera ~120 líneas, proponé mover detalle a `docs/`.
