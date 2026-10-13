# vinext-starter

## Descarga automática de los cinco cursos en GitHub Pages

Cada curso ofrece «Descargar curso completo · PDF» en su cabecera. Están disponibles
Introducción a las Matemáticas, Álgebra Lineal, Cálculo Diferencial, Cálculo Vectorial y
Ecuaciones Diferenciales en `/descargas/<slug-del-curso>.pdf`.

Los PDFs se generan en cada publicación a partir del HTML completo de cada curso,
no de los minicapítulos visibles en el navegador ni de copias de los apuntes originales.
Conservan introducciones, notas, fórmulas, demostraciones y ejemplos; las pistas y
soluciones de las prácticas de cierre quedan al final. No incluyen el banco independiente
de Ejercitación. Se conservan los diagramas estáticos y se enlazan los modelos 3D y
laboratorios interactivos a su tema en la web. Las imágenes y fuentes quedan embebidas.

Preparación local (Node.js >=22.13, pnpm 10):

```bash
pnpm install --frozen-lockfile
pnpm exec playwright install chromium
pnpm run build:pages
pnpm run test:pdf
```

`build:pages` compila el sitio y genera los cinco PDFs en `out/descargas/`. Fuera de CI deja
copias en `output/pdf/` para revisión. Para regenerar los documentos después de una
compilación, usa `pnpm run build:pdf`. No edites ni subas los archivos generados: edita
el contenido del curso y publica normalmente (commit y push a `main`). Guardar un
archivo local sin publicarlo no cambia la web ni los PDFs públicos. GitHub Actions
instala Chromium y comprueba todos los documentos antes de desplegar. El manifiesto
`out/descargas/manifest.json` registra la huella del HTML de origen y del PDF generado;
las pruebas detectan documentos desactualizados y contenido o fórmulas perdidos.

La transformación está en `scripts/course-document.mjs`; la maquetación, en
`scripts/course-document.css`. La versión impresa de la división sintética usa los
mismos coeficientes y pasos que la animación.

A clean full-stack starter running on
[vinext](https://github.com/cloudflare/vinext), with optional Cloudflare D1 and
Drizzle support.

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
npm run build
```

This starter does not use `wrangler.jsonc`.

## Included Shape

- edit site code under `app/`
- `.openai/hosting.json` declares optional Sites D1 and R2 bindings
- `vite.config.ts` simulates declared bindings for local development
- `db/schema.ts` starts intentionally empty
- `examples/d1/` contains an optional D1 example surface
- `drizzle.config.ts` supports local migration generation when needed

## Workspace Auth Headers

OpenAI workspace sites can read the current user's email from
`oai-authenticated-user-email`.

SIWC-authenticated workspace sites may also receive
`oai-authenticated-user-full-name` when the user's SIWC profile has a non-empty
`name` claim. The full-name value is percent-encoded UTF-8 and is accompanied by
`oai-authenticated-user-full-name-encoding: percent-encoded-utf-8`.

Treat the full name as optional and fall back to email when it is absent:

```tsx
import { headers } from "next/headers";

export default async function Home() {
  const requestHeaders = await headers();
  const email = requestHeaders.get("oai-authenticated-user-email");
  const encodedFullName = requestHeaders.get("oai-authenticated-user-full-name");
  const fullName =
    encodedFullName &&
    requestHeaders.get("oai-authenticated-user-full-name-encoding") ===
      "percent-encoded-utf-8"
      ? decodeURIComponent(encodedFullName)
      : null;

  const displayName = fullName ?? email;
  // ...
}
```

## Optional Dispatch-Owned ChatGPT Sign-In

Import the ready-to-use helpers from `app/chatgpt-auth.ts` when the site needs
optional or required ChatGPT sign-in:

- Use `getChatGPTUser()` for optional signed-in UI.
- Use `requireChatGPTUser(returnTo)` for server-rendered pages that should send
  anonymous visitors through Sign in with ChatGPT.
- Use `chatGPTSignInPath(returnTo)` and `chatGPTSignOutPath(returnTo)` for
  browser links or actions.
- Pass a same-origin relative `returnTo` path for the destination after sign-in
  or sign-out. The helper validates and safely encodes it.
- Mark protected pages with `export const dynamic = "force-dynamic"` because
  they depend on per-request identity headers.

Dispatch owns `/signin-with-chatgpt`, `/signout-with-chatgpt`, `/callback`, the
OAuth cookies, and identity header injection. Do not implement app routes for
those reserved paths. Routes that do not import and call the helper remain
anonymous-compatible.

SIWC establishes identity only; it does not prove workspace membership. Use the
Sites hosting platform's access policy controls for workspace-wide restrictions,
or enforce explicit server-side membership or allowlist checks.

Use SIWC for account pages, user-specific dashboards, saved records, and write
actions tied to the current ChatGPT user. Leave public content anonymous.

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: verify the vinext build output
- `npm test`: build the starter and verify its rendered loading skeleton
- `npm run db:generate`: generate Drizzle migrations after schema changes

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Drizzle D1 Guide](https://orm.drizzle.team/docs/get-started/d1-new)
