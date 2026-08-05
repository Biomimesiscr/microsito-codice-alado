# Códice Alado — Microsite

Landing page / "coming soon" microsite for **Códice Alado**, built with React 19, Vite 8, Tailwind CSS v4, and TypeScript.

## Tech Stack

- **React 19** — UI framework
- **Vite 8** — Build tool & dev server
- **Tailwind CSS v4** — Utility-first styling (no `tailwind.config.js`; theme defined via `@theme` blocks in CSS)
- **TypeScript** — Type safety with strict unused-import checks
- **i18next** — Internationalization (ES/EN)
- **Docker + Nginx** — Production deployment

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Typecheck + production build
npm run build

# Preview production build locally
npm run preview

# Lint
npm run lint
```

## Project Structure

```
├── docs/                    # Project documentation
│   ├── core-components.md   # Core component props & usage
│   └── i18n.md              # Internationalization guide
├── public/                  # Static assets (video, SVGs, favicon)
├── src/
│   ├── components/
│   │   └── core/            # Reusable UI primitives
│   │       ├── buttons/     # Button
│   │       ├── paragraphs/  # Paragraph
│   │       ├── titles/      # Title
│   │       └── toggles/     # SegmentedToggle, SwitchToggle
│   ├── locales/             # i18n translation files
│   │   ├── en/global.json   # English
│   │   └── es/global.json   # Spanish
│   ├── App.tsx              # Root component (routes: /, /menu, /micro-avispa)
│   ├── main.tsx             # React entry point
│   ├── i18n.ts              # i18next configuration
│   └── index.css            # Tailwind v4 theme — the only place colour is declared
├── Dockerfile               # Multi-stage Docker build
├── nginx.conf               # Nginx config for SPA routing & caching
└── index.html               # HTML shell (DM Sans font loaded via <link>)
```

## Core Components

The project provides a set of reusable UI primitives under `src/components/core/`. Prefer these over writing raw Tailwind HTML:

| Component | Import | Description |
|---|---|---|
| **Title** | `titles/Title` | Heading (`h1`–`h6`) with `primary` / `secondary` / `accent` variants and optional `glow` |
| **Button** | `buttons/Button` | Button with `pill` / `solid` / `outline` / `ghost` variants and `sm` / `md` / `lg` sizes |
| **Paragraph** | `paragraphs/Paragraph` | Body text with `body` / `lead` / `muted` variants |
| **SegmentedToggle** | `toggles/SegmentedToggle` | Multi-option segmented control with animated sliding indicator |
| **SwitchToggle** | `toggles/SwitchToggle` | Binary on/off switch with optional label |

See [`docs/core-components.md`](docs/core-components.md) for full prop tables, variant descriptions, and usage examples.

## Internationalization

The project supports **Spanish (es)** and **English (en)** via i18next. Translations live in `src/locales/{lang}/global.json`. The browser language is auto-detected on first visit, with English as fallback.

See [`docs/i18n.md`](docs/i18n.md) for setup details, usage patterns, and instructions for adding new languages or namespaces.

## Theme

All colour lives in `src/index.css` — **no component should declare a literal colour**. The file has two layers, both declared with Tailwind v4's `@theme` syntax.

**Brand palette** (raw values, not used directly in components):

| Token | Hex | |
|---|---|---|
| `cream` | `#E6E2CB` | Page background (light surface) |
| `rust` | `#914509` | Burnt orange accent |
| `ink` | `#000103` | Near-black body text |
| `olive` | `#585C24` | Page background (dark surface) |
| `olive-light` | `#6B6F35` | Raised elements on olive |
| `moss` | `#7C7E48` | Large headings on cream |
| `sage` | `#A8AC8B` | Body text on olive |
| `sand` | `#E3D9A8` | Pills, toggles, accent on olive |

**Semantic layer** — this is what components consume: `surface`, `surface-raised`, `fg`, `fg-muted`, `fg-subtle`, `heading`, `accent`, `line`. Use them as normal Tailwind utilities (`bg-surface`, `text-heading`, `border-line`, …).

Each **surface** remaps the semantic tokens for its subtree, so the same component renders correctly on either background:

```tsx
<Surface tone="cream">…</Surface>   // home, 404, infographies
<Surface tone="olive">…</Surface>   // menu
```

`Surface` (`src/components/layout/Surface.tsx`) sets `data-surface`, which `index.css` keys the overrides off. Because the utilities compile to `var(--color-…)`, the override cascades — so `@theme inline` must **not** be used for the semantic tokens.

Decorative illustrations go through `Decor` (`src/components/decor/Decor.tsx`), which paints an SVG/PNG via `mask-image` + `currentColor`. The asset's own colours are ignored; it takes the surface's token, so swapping the file needs no code change.

Font: **DM Sans** loaded via Google Fonts in `index.html`.

## Docker Deployment

```bash
# Build image
docker build -t codice-alado .

# Run container
docker run -p 8080:80 codice-alado
```

The app will be available at `http://localhost:8080`. Nginx handles SPA fallback routing and caches static assets with 1-year expiry.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Typecheck (`tsc -b`) then bundle with Vite |
| `npm run lint` | Run ESLint |
| `npm run preview` | Serve production build locally |

## TypeScript

Project references are used (`tsconfig.app.json` for `src/`, `tsconfig.node.json` for `vite.config.ts`). `noUnusedLocals` and `noUnusedParameters` are enabled — unused imports or variables will fail the build.