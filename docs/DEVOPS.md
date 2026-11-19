# DevOps — propuesta v0.1 (2026-11-19)

> Cómo se desarrolla, se prueba y se publica el sistema. Base: D-001 (React + NestJS + PostgreSQL/Prisma) y D-002
> (Azure, en revisión por D-005). **Es una propuesta:** lo marcado ⏳ espera respuesta de la Defensoría (`PREGUNTAS.md` P10, P16) y nada
> de Azure se crea sin confirmación explícita (REGLAS §4.9).

## 1. Estructura del repositorio (monorepo)
Monorepo = un solo repositorio con varias apps que comparten código.

```
gedefensoria/
├─ apps/
│  ├─ api/        NestJS + Prisma + Socket.io
│  └─ web/        React + Vite + Tailwind + shadcn/ui
├─ packages/
│  └─ shared/     esquemas Zod, tipos, estados del trámite (los usan front y back)
├─ docker/        compose local
├─ docs/
└─ .github/workflows/
```
- Gestor de paquetes: **pnpm** con workspaces (instala una sola vez las dependencias repetidas: ahorra disco y RAM).
- Versión de Node fijada en `.nvmrc` / `package.json#engines` (Node 22 LTS).

## 2. Entorno local (PC con poca memoria)
- **Docker solo para los servicios**, las apps corren directo en la PC (`pnpm dev`): consume bastante menos RAM que
  meter todo en contenedores.
- `docker/compose.yml` con límites de memoria:

| Servicio | Imagen | Para qué | RAM máx. |
|---|---|---|---|
| `db` | `postgres:16-alpine` | Base local (con `pg_trgm` y `unaccent`) | 512 MB |
| `minio` | `minio/minio` | Almacenamiento compatible con S3 para adjuntos (portable a cualquier proveedor, D-005) | 128 MB |
| `mailpit` | `axllent/mailpit` | Atrapa los e-mails de despacho (no sale nada a internet) | 64 MB |
| `redis` | `redis:7-alpine` | Solo con perfil `--profile redis`, si se prueban varias instancias | 64 MB |

### 2.1 Que Docker no se coma la memoria (PC con 15 GB)
Docker en Windows corre adentro de una máquina virtual (WSL 2). Si no tiene techo, va tomando memoria y la PC se
congela. Se ponen **tres techos**, de afuera hacia adentro:

| Nivel | Qué se limita | Estado / valor |
|---|---|---|
| 1. WSL 2 (`C:\Users\Invitado1\.wslconfig`) | Memoria total de **todo** Docker | ✅ Ya está: `memory=4GB`, `swap=2GB`, `autoMemoryReclaim=gradual` (devuelve la memoria que no usa). Sugerido sumar `processors=4` |
| 2. Cada contenedor (`compose.yml`) | Memoria y CPU de cada servicio | `mem_limit` y `cpus` de la tabla de arriba: la suma (≈ 0,8 GB) queda muy por debajo de los 4 GB |
| 3. PostgreSQL por dentro | Memoria que la base pide | `shared_buffers=128MB`, `work_mem=4MB`, `maintenance_work_mem=64MB`, `max_connections=20` (por parámetros en el compose) |

Además:
- `restart: "no"` en todos los servicios: **no arrancan solos** al prender la PC.
- Docker Desktop: desactivar "Start Docker Desktop when you sign in" y activar **Resource Saver** (se duerme si no se
  usa). Se abre solo cuando se trabaja en el proyecto.
- Las apps en modo desarrollo (Node) con techo: `NODE_OPTIONS=--max-old-space-size=1024`.
- Al terminar cada tanda: `pnpm servicios:down` (Claude lo hace solo) y, una vez por mes,
  `docker system prune` (borra imágenes viejas, libera disco).
- Si algún día hace falta más memoria (por ejemplo para los tests E2E), se sube `memory` a 6 GB, nunca sin techo.

- Comandos previstos: `pnpm servicios:up` / `pnpm servicios:down` (se apagan al terminar cada tanda),
  `pnpm db:migrate`, `pnpm db:seed` (catálogos + datos **inventados**), `pnpm dev`.
- Variables en `.env` (no se commitea) a partir de `.env.example` (sí se commitea, sin secretos).

## 3. Calidad antes de cada commit y en CI
- **Pre-commit** (`.githooks/pre-commit`): lint + tipos + tests rápidos de lo modificado. Se activa al crear el
  `package.json` (REGLAS §4.10).
- **GitHub Actions** (`.github/workflows/ci.yml`) en cada push y pull request:
  1. `pnpm install --frozen-lockfile`
  2. lint (ESLint) y formato (Prettier)
  3. tipos (`tsc --noEmit`) en las tres carpetas
  4. tests unitarios (Vitest / Jest) + tests de integración de la API contra un PostgreSQL de servicio del propio CI
  5. `prisma migrate diff` para detectar cambios de esquema sin migración
  6. build de `api` y `web`
  7. `pnpm audit` (dependencias con vulnerabilidades conocidas)
- Tests end-to-end (Playwright) de los flujos críticos — pase ME→Asesor, Borrador→Definitivo, reiteración — cuando
  existan esas pantallas.

## 4. Entornos
| Entorno | Dónde | Datos | Se publica |
|---|---|---|---|
| Local | PC del desarrollador | Inventados (seeder) | — |
| Pruebas (staging) | Azure, recursos chicos | Inventados | Automático al pasar CI en `main` |
| Producción | Azure | **Reales** | Manual, con aprobación (environment protegido de GitHub) |

Nunca se copian datos de producción a pruebas ni a local.

## 5. Dónde alojarlo: opciones (P10 y P11) — ⚠️ cambia D-002, ver D-005 (propuesta)
**Condiciones que surgieron:** la Defensoría **no puede pagar servicios en dólares ni al exterior** (P11); los datos
son sensibles y la Ley 25.326 (art. 12) limita su transferencia a países sin protección "adecuada" (se puede con
cláusulas contractuales modelo aprobadas por la AAIP, Disposición 60-E/2016 y Resolución 198/2023, o con
consentimiento); y la Defensoría **controla a la Administración Pública provincial**, así que alojar sus reclamos en
la infraestructura del Poder Ejecutivo es un tema de **independencia**, no solo técnico.

| Opción | Pago | Datos en Argentina | Independencia | Comentario |
|---|---|---|---|---|
| **A. Infraestructura de la Provincia** (el Ministerio de Planificación Estratégica y Modernización ya corre el GDE provincial en AWS) | Lo paga/gestiona la Provincia por convenio | Depende (AWS São Paulo o la Local Zone de Buenos Aires) | ⚠️ Baja: los datos quedan en manos del controlado | Lo más rápido si hay convenio; exige un acuerdo de confidencialidad fuerte |
| **B. ARSAT** (empresa del Estado nacional, centro de datos en Argentina) | En pesos, por convenio entre organismos | ✅ Sí | ✅ Buena | Habría que confirmar con ARSAT la oferta vigente para organismos provinciales |
| **C. Proveedor argentino privado** (servidores virtuales en centros de datos del país) | En pesos, con factura local | ✅ Sí | ✅ Buena | Barato y simple; elegir uno con respaldos, SLA y certificaciones |
| **D. Servidor propio en la Defensoría** | Compra de equipo (en pesos) | ✅ Sí | ✅ Máxima | Los servidores actuales son viejos: habría que comprar uno nuevo y garantizar respaldo fuera del edificio, energía y personal |
| **E. Azure / AWS contratado directo** (D-002) | ❌ Dólares, al exterior | ❌ No (Brasil o EE. UU.) | ✅ Buena | Choca con P11. Solo si se paga a través de un revendedor local en pesos y Legal aprueba la transferencia |

**Cómo lo resuelven otras empresas de desarrollo en Argentina con el sector público:** lo más común es (1) usar la
nube que **ya tiene contratada el gobierno** (como hace Jujuy con AWS para el GDE, o San Luis con su Poder Judicial
en AWS), (2) **ARSAT** para organismos que necesitan datos en el país y pago en pesos, o (3) un proveedor local en
pesos. Y casi siempre construyen la app **sin atarse a un proveedor**: contenedores Docker + PostgreSQL estándar +
almacenamiento compatible con S3. Así se puede mudar de un lugar a otro sin reescribir nada.

**Recomendación (D-005, propuesta):** construir la app **portable** (Docker + PostgreSQL + almacenamiento compatible
con S3, sin servicios exclusivos de una nube). Para producción, **B (ARSAT) o C (proveedor argentino en pesos)**, y
pedir a Legal y Técnica que lo valide. A queda como alternativa si hay un convenio que garantice confidencialidad e
independencia. Mientras se decide, el desarrollo sigue igual: todo corre en la PC.

> La propuesta de Azure de la sección siguiente queda **en suspenso** hasta que se decida D-005. Si se elige otra
> opción, se reescribe esta sección con el mismo esquema: app en contenedor, base administrada con respaldos,
> almacenamiento privado, secretos fuera del código, monitoreo y despliegue desde GitHub.

## 5.1 Azure (propuesta original, en suspenso)

```mermaid
flowchart LR
  U[Navegadores de la Defensoría] -->|HTTPS| SWA[Static Web Apps<br/>React]
  U -->|HTTPS + WebSocket| ACA[Container Apps<br/>API NestJS, 1 réplica mínima]
  ACA --> PG[(PostgreSQL Flexible<br/>Burstable B1ms/B2s)]
  ACA --> BLOB[(Blob Storage privado<br/>adjuntos)]
  ACA --> KV[Key Vault<br/>secretos]
  ACA --> AI[Application Insights<br/>errores y rendimiento]
  GH[GitHub Actions] -->|OIDC, sin claves guardadas| ACA
  GH --> SWA
```

- **Front:** Azure Static Web Apps (sirve el React compilado; plan gratuito o estándar).
- **API:** Azure Container Apps con **mínimo 1 réplica siempre encendida** (sin "arranque en frío" y con los
  WebSockets estables). Con 1 réplica no hace falta Redis; si se escala a 2+, se suma Azure Cache for Redis para el
  adaptador de Socket.io. *Alternativa:* App Service Linux B1/B2 con contenedor — igual de válida; Container Apps
  queda mejor si después se agregan tareas programadas (vencimientos, respaldos de verificación).
- **Base:** PostgreSQL Flexible Server, nivel Burstable para empezar; respaldos automáticos con retención de 35 días;
  acceso solo por red privada o lista de IPs; TLS obligatorio.
- **Adjuntos:** Blob Storage privado, sin acceso público; la API entrega enlaces temporales (SAS de pocos minutos).
  Borrado lógico + retención (soft delete de Blob) para no perder digitalizaciones.
- **Secretos:** Key Vault + identidad administrada de la API (la app no guarda contraseñas de Azure). GitHub despliega
  con **OIDC** (federación: GitHub demuestra quién es sin una clave guardada).
- **Región** ⏳ P10: la más cercana es *Brazil South*. Ojo legal: la Ley 25.326 (art. 12) restringe transferir datos
  personales a países sin protección "adecuada"; hay que confirmar con Legal y Técnica si alojar fuera de Argentina
  está permitido o si hace falta otro esquema (servidor provincial, cláusulas contractuales).
- **Suscripción** ⏳ P11: quién la paga y administra (la Defensoría, la provincia o un proveedor).
- **Ingreso de usuarios** ⏳ P12: usuario y contraseña propios del sistema (con 2FA opcional) o login institucional
  (Microsoft Entra ID / Google Workspace del organismo, si existe).
- **Dominio** ⏳ P11: subdominio oficial (ej. `gestion.<dominio-de-la-defensoria>`) — lo gestiona TI de la provincia.

### Costo orientativo mensual (a validar con la calculadora de Azure antes de decidir)
Static Web Apps gratis/estándar · Container Apps 1 réplica chica · PostgreSQL B1ms con 32 GB · Blob con pocos GB ·
Application Insights con muestreo. El grueso es la base y la réplica siempre encendida. **No se da un número** hasta
tener la región (P10) y el plan de la suscripción (P11).

## 6. Publicación y migraciones
1. Push a `main` → CI verde → imagen de la API a GitHub Container Registry (o Azure Container Registry) → despliegue a
   **pruebas** → `prisma migrate deploy` → prueba de humo (endpoint `/salud`).
2. Producción: botón manual en GitHub (environment `produccion` con aprobación) → misma imagen ya probada → migraciones
   → humo. Si falla, se vuelve a la revisión anterior de Container Apps (un clic).
3. Migraciones solo "hacia adelante" y compatibles con la versión anterior (agregar antes que renombrar o borrar).

## 7. Respaldo, monitoreo y seguridad operativa
- **Respaldos:** automáticos de PostgreSQL + una **prueba de restauración trimestral** en pruebas, anotada en la bitácora.
- **Monitoreo:** Application Insights (errores, lentitud, caídas) con alertas por e-mail al responsable ⏳.
  Sentry queda como alternativa si se prefiere (ARQUITECTURA §3).
- **Registros (logs):** sin datos personales (se registran IDs, no nombres ni DNI).
- **Accesos a producción:** cuentas nominales, sin cuentas compartidas; nadie consulta la base de producción "a mano"
  salvo incidente, y queda registrado.
- **Dependencias:** Dependabot semanal en GitHub.

## 8. Orden de implementación (Fase 2)
1. Monorepo + `compose.yml` + `.env.example` → 2. Pre-commit activo → 3. CI → 4. Seeder con datos inventados →
5. (Con P10 y D-005 resueltos y confirmación) recursos del proveedor elegido para pruebas → 6. Despliegue continuo a pruebas →
7. Producción, recién cuando haya un circuito completo probado por la Defensoría.
