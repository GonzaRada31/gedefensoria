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
5. **Manual de Procedimientos** (`docs/manual/`): si en la sesión se relevó, definió o cambió cómo se hace una
   tarea, creá o actualizá su procedimiento con la plantilla de `docs/manual/README.md` (estado `Borrador`) y su
   fila en el índice. Es la base del Centro de ayuda.
6. **Skills:** revisá la sesión con los criterios de `desarrollo-apps-negocio` §9 (crear vs. mejorar) y aplicalos.
   Anotalo en la bitácora con `[skill]`.
7. **Commit:** proponé un commit `docs: cierre de sesión AAAA-MM-DD`.
   - Pasa por el hook de pre-commit (lint, tipos y tests). Antes, verificá que la base local esté levantada
     (el comando que figure en REGLAS.md).
   - Si el hook bloquea el commit, revisá `logs/tests-ultimo.log`, corregí y reintentá.
     **Nunca** uses `--no-verify`.
8. **Resumen al usuario:** si la sesión tuvo pedidos con varios puntos, confirmá punto por punto qué se hizo
   y qué quedó pendiente.

## Cuándo sugerir el cierre (gasto de tokens)
Avisale al usuario **"conviene cerrar la sesión"** (sin cerrarla por tu cuenta) cuando pase alguna de estas cosas:
- La conversación ya tuvo varias tandas grandes (muchos documentos leídos o escritos) y la siguiente tarea es de
  otro tema: arrancar de cero con `REGLAS.md` sale más barato que seguir arrastrando todo el contexto.
- Aparece un aviso de resumen automático del contexto, o empezás a releer archivos que ya leíste.
- Terminó un bloque coherente de trabajo (todo commiteado) y lo que sigue es largo.
El aviso va al final de la respuesta, con una línea sobre qué conviene hacer en la sesión siguiente.

## Reglas
- No reescribas entradas viejas de la bitácora; solo agregá.
- Si REGLAS.md supera ~120 líneas, proponé mover detalle a `docs/`.
