# Registro de QA en navegador

> Cada pantalla la prueba Claude en Chrome (extensión Claude in Chrome) contra la base **local** antes de darla por
> terminada. El usuario no revisa a mano. Usuarios de prueba: solo locales y con datos inventados; nunca credenciales
> guardadas del navegador (Chrome autocompleta las del usuario).

## Método
| Control | Cómo se mide |
|---|---|
| Contraste | Ratio WCAG de cada texto contra su fondo: mínimo 4,5:1 (3:1 en texto grande). |
| Áreas táctiles | Todo botón, enlace o campo ≥ 44 × 44 px. |
| Desborde | Sin scroll horizontal (`scrollWidth > innerWidth`). |
| Nombres accesibles | Todo control con texto, `aria-label` o `<label>`. |
| Temas | Claro y oscuro. |
| Anchos | 1440 px y 390 px. |
| Teclado | Orden de Tab lógico y foco visible. |
| Consola | Sin errores ni avisos. |
| Flujos | Casos reales y de error, con cada rol que usa la pantalla (y que un rol sin permiso **no** pueda). |
| Datos de prueba | Si el flujo modifica datos sembrados, restaurarlos al terminar (los tests dependen de ellos). |

---

## AAAA-MM-DD — <pantalla>
- ✅ / ⚠️ hallazgos
