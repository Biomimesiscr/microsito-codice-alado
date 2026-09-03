# Catálogo de fichas de insecto («Información del insecto»)

Sección reutilizable para las páginas largas de un proyecto de investigación
sobre una especie (Micro Avispas, y luego Chrysina, Zopherus, Euglossa…).
La ruta `/insecto/:id` es **data-driven**: añadir una especie nueva es un
archivo de datos + claves de i18n, sin tocar ningún componente de este
catálogo. `/micro-avispa` (la infografía a pantalla completa) se mantiene
como ruta independiente; «Escalas biológicas» la embebe además dentro de la
ficha vía `ScalesSection`.

## Arquitectura

```
src/
├── data/
│   ├── insectTypes.ts        # InsectProject y tipos relacionados
│   └── insects/
│       ├── index.ts          # registro { [slug]: InsectProject }
│       └── microAvispas.tsx  # datos de la ficha "Micro Avispas"
├── routes/InsectPage.tsx     # useParams(:id) → registro → 404 si no existe
└── components/
    ├── core/
    │   ├── icons/ArrowIcon.tsx
    │   └── media/ImageCarousel.tsx
    ├── blocks/
    │   ├── SectionHeading.tsx
    │   ├── DefinitionList.tsx
    │   └── ArrowList.tsx
    └── insect/
        ├── InsectProjectPage.tsx   # orquestador (este README)
        ├── InsectHero.tsx
        ├── PatternStatement.tsx
        ├── IntroBand.tsx
        ├── TaxonomyPanel.tsx
        ├── ScalesSection.tsx
        ├── CollectionMap.tsx
        ├── ResearcherBand.tsx
        └── RelatedArticles.tsx
```

## Regla de color

Ningún componente de este catálogo declara un color literal. Todo sale de la
capa semántica de `src/index.css` (`bg-surface`, `bg-surface-raised`,
`text-fg`, `text-fg-muted`, `text-fg-subtle`, `text-heading`, `text-accent`,
`border-line`) y las zonas oscuras son islas `data-surface="olive"` /
`"moss"` / `"cream"` (mismo patrón que `SpeciesCard` y `AboutHero`).

**Única excepción:** `pattern.colors` (`InsectProject`) — el patrón de color
real del insecto (p. ej. el patrón BOB negro-naranja-negro de las
Scelionidae, ver `microAvispas.tsx`) es un dato biológico, no de marca, y
viaja como `colors: string[]` en el archivo de datos, igual que
`ColorsDetail` ya hace en la infografía. Verificar con:

```bash
rg -n '#[0-9a-fA-F]{3,8}' src/components/insect src/components/core src/components/blocks src/routes
# Debe devolver vacío. Los literales de esta excepción viven en
# src/data/insects/microAvispas.tsx, fuera de este alcance.
```

## Mapa sin token

`CollectionMap` usa `react-map-gl/mapbox` + `mapbox-gl` con el token de
`import.meta.env.VITE_MAPBOX_TOKEN` (ver `.env.example`). **Ahora mismo no
hay token configurado**, así que en desarrollo se ve siempre el fallback: un
bloque `bg-surface-raised` con la lista de sitios (`{ id, lat, lng }`) en vez
del mapa interactivo — mismo patrón de degradación que `BugImage`/`Portrait`
ante un asset que falta, aplicado aquí a un servicio externo sin
credenciales. Con el token puesto en `.env.local`, el mismo componente
renderiza el mapa real con un marcador por sitio; `scrollZoom` va desactivado
para no secuestrar el scroll de la página.

## Componentes

### `ArrowIcon`

Flecha larga y delgada del diseño (`108:639`), viñeta de `ArrowList` y control
del carrusel. El SVG en `public/icons/arrow-right.svg` trae un `fill` fijo,
así que se pinta como máscara + `currentColor` (técnica de `Decor.tsx`) para
heredar el color de texto de la superficie en vez de quedar atado al color
del archivo.

| Prop | Tipo | Notas |
|---|---|---|
| `className` | `string?` | Controla tamaño y color (`text-*`) |

```tsx
<ArrowIcon className="h-[6px] w-[20px] text-accent" />
```

### `ImageCarousel`

Carrusel "coverflow" genérico (no específico de insectos, por eso vive en
`core/media/`): lámina activa grande y centrada, vecinas encogidas y
atenuadas. Estado local (`useState`) + `framer-motion` para las
transiciones; flechas prev/next (`ArrowIcon` rotado) y teclado ←/→ **con el
carrusel enfocado** (`tabIndex={0}` + `onKeyDown`, no un listener global: en
`window` secuestraba las flechas de toda la página y chocaba con la infografía
embebida).

| Prop | Tipo | Default | Notas |
|---|---|---|---|
| `slides` | `{ src: string; alt?: string }[]` | — | Requerido |
| `initial` | `number` | `0` | Índice inicial |
| `className` | `string?` | — | |

```tsx
<ImageCarousel slides={project.carousel} />
```

### `SectionHeading`

Título + subtítulo de sección genérico (Género/Especie, Escalas biológicas,
Sitios de colecta…). Distinto de `SectionLabel` (etiqueta chica de la
infografía) — se mantienen separados a propósito.

| Prop | Tipo | Default |
|---|---|---|
| `title` | `string` | — |
| `subtitle` | `string?` | — |
| `align` | `"left" \| "center"` | `"left"` |

```tsx
<SectionHeading title={t("insects.microAvispas.scales.title")} subtitle={body} />
```

### `DefinitionList`

Pares etiqueta/valor semánticos (`<dl>/<dt>/<dd>`), usados por la taxonomía.

| Prop | Tipo |
|---|---|
| `entries` | `{ label: string; value: string }[]` |

```tsx
<DefinitionList entries={[{ label: "Orden", value: "Hymenoptera" }]} />
```

### `ArrowList`

Lista con `ArrowIcon` como viñeta, a 1 o 2 columnas. La reutilizan
Género/Especie (sin enlace) y Artículos relacionados (con enlace externo). Un
item sin `href` se renderiza como texto plano.

| Prop | Tipo | Default |
|---|---|---|
| `items` | `(string \| { text: string; href?: string })[]` | — |
| `columns` | `1 \| 2` | `1` |

```tsx
<ArrowList items={["Acanthoscelio Ashmead", "Baryconus Foerster"]} columns={2} />
<ArrowList items={[{ text: "Widespread occurrence of...", url: undefined }]} />
```

### `InsectHero`

Cabecera de la ficha: dos columnas en `md+` (texto / foto), apiladas en
móvil.

| Prop | Tipo |
|---|---|
| `label` | `string` |
| `title` | `string` |
| `subtitle` | `string` |
| `meta` | `string` |
| `body` | `string` |
| `image` | `string` |
| `alt` | `string?` |

```tsx
<InsectHero
  label={t("insects.microAvispas.label")}
  title={t("insects.microAvispas.title")}
  subtitle={t("insects.microAvispas.subtitle")}
  meta={t("insects.microAvispas.meta")}
  body={t("insects.microAvispas.body")}
  image={project.hero.image}
/>
```

### `PatternStatement`

Regla de N colores arriba y abajo de un texto centrado. Genérico: no asume 3
colores ni BOB, cualquier especie con un patrón documentado la reutiliza.
`highlight` resalta la primera coincidencia dentro de `children` cuando este
es un string plano (con contenido más rico, el llamador ya decide qué
resaltar).

| Prop | Tipo |
|---|---|
| `colors` | `string[]` |
| `children` | `ReactNode` |
| `highlight` | `string?` |
| `caption` | `ReactNode?` — pie del enunciado; va *entre* las dos reglas, como en el mockup |

```tsx
<PatternStatement
  colors={project.pattern.colors}
  highlight="BOB"
  caption={<>black-orange-black<br />negro-naranja-negro</>}
>
  El patrón de color estudiado... fue de BOB
</PatternStatement>
```

### `IntroBand`

Banda «¿Qué son?». Isla `data-surface="olive"`. La forma orgánica del mockup
(dos elipses) se resuelve con un `border-radius` elíptico, sin SVG.

| Prop | Tipo |
|---|---|
| `title` | `string` |
| `body` | `string` |

```tsx
<IntroBand title="¿Qué son?" body="Las microavispas de la familia..." />
```

### `TaxonomyPanel`

Continúa dentro de la isla olive de `IntroBand`: foto + `DefinitionList` a la
derecha, y debajo una tarjeta `data-surface="cream"` con `ArrowList
columns={2}` para el listado de géneros.

| Prop | Tipo |
|---|---|
| `image` | `string` |
| `title` | `string` |
| `entries` | `DefinitionEntry[]` |
| `generaTitle` | `string` |
| `genera` | `string[]` |

```tsx
<TaxonomyPanel
  image={project.taxonomy.image}
  title={t("insects.microAvispas.taxonomy.title")}
  entries={taxonomyEntries}
  generaTitle={t("insects.microAvispas.genera.title")}
  genera={project.genera}
/>
```

### `ScalesSection`

`SectionHeading` + caja de altura fija que monta `InfographyCanvas`
(`src/components/infography/`, motor sin modificar) con `height="100%"`. Los
`layers` salen de los datos de la especie — ver
`src/components/infography/README.md` para el formato de `LayerItem`.

| Prop | Tipo |
|---|---|
| `title` | `string` |
| `body` | `string` |
| `layers` | `LayerItem[]` |
| `zoomLabels` | `string[]?` |

```tsx
<ScalesSection
  title={t("insects.microAvispas.scales.title")}
  body={t("insects.microAvispas.scales.body")}
  layers={project.scales.layers}
  zoomLabels={project.scales.zoomLabels}
/>
```

### `CollectionMap`

Mapa real (`react-map-gl/mapbox`) o fallback listado — ver "Mapa sin token"
arriba.

| Prop | Tipo |
|---|---|
| `title` | `string` |
| `body` | `string?` |
| `center` | `{ lng: number; lat: number }` |
| `zoom` | `number` |
| `sites` | `{ id: string; lng: number; lat: number; label?: string }[]` |

```tsx
<CollectionMap
  title={t("insects.microAvispas.collection.title")}
  center={{ lng: -84.2472, lat: 9.9128 }}
  zoom={14}
  sites={[{ id: "upaz", lng: -84.2472, lat: 9.9128, label: "..." }]}
/>
```

### `ResearcherBand`

Isla `data-surface="olive"` a sangre. Reutiliza `Portrait`
(`src/components/contact/Portrait.tsx`) y `Button variant="pill"`; los datos
de la persona (nombre, foto) salen de `src/data/teamData.ts` por
`memberId` — no se duplican aquí.

| Prop | Tipo |
|---|---|
| `name` | `string` |
| `role` | `string` |
| `email` | `string` |
| `photo` | `string` |
| `sectionTitle` | `string` |
| `profileTitle` | `string` |
| `credentials` | `string[]` |
| `ctaLabel` | `string` |
| `ctaTo` | `string` |

```tsx
<ResearcherBand
  name="Rebeca Mora Castro"
  role={t("insects.microAvispas.researcher.role")}
  email="rebeca.mora@ucr.ac.cr"
  photo="/team/rebeca-mora-castro.png"
  sectionTitle={t("insects.microAvispas.researcher.title")}
  profileTitle={t("insects.microAvispas.researcher.profileTitle")}
  credentials={credentials}
  ctaLabel={t("insects.microAvispas.researcher.cta")}
  ctaTo="/contact"
/>
```

### `RelatedArticles`

Banda `bg-surface-raised` + `SectionHeading` + `ArrowList` de enlaces
externos. Un artículo sin `url` se renderiza como texto plano.

| Prop | Tipo |
|---|---|
| `title` | `string` |
| `articles` | `{ title: string; url?: string }[]` |

```tsx
<RelatedArticles title={t("insects.microAvispas.articles.title")} articles={project.articles} />
```

### `InsectProjectPage`

Orquestador. Monta `Surface tone="cream" scroll`, el breadcrumb Inicio/Menú
(mismo markup que `Species.tsx`), y compone las secciones en orden,
envueltas en `AnimatedSection`. **Omite las secciones cuyos datos falten**
(`pattern`, `scales`, `collection`) — así una ficha sin mapa o sin infografía
sigue funcionando.

| Prop | Tipo |
|---|---|
| `project` | `InsectProject` |

```tsx
import { insects } from "../../data/insects";

<InsectProjectPage project={insects["micro-avispas"]} />
```

## Cómo crear una ficha nueva en 4 pasos

1. **Datos.** Crear `src/data/insects/<slug>.tsx` exportando un
   `InsectProject` (ver `src/data/insectTypes.ts` y `microAvispas.tsx` como
   referencia). `id` es el prefijo de i18n (`insects.<id>.*`) — no tiene que
   coincidir con el slug de la URL.
2. **i18n.** Añadir el bloque `insects.<id>.*` a `src/locales/es/global.json`
   y `src/locales/en/global.json` (label, title, subtitle, meta, body,
   pattern.*, intro.*, taxonomy.labels.*, genera.title, scales.*,
   collection.*, researcher.*, articles.title). Nombres científicos y
   propios van literales en el archivo de datos, no aquí.
3. **Assets.** Subir las imágenes a `public/images/insects/<slug>/` y, si
   aplica, actualizar `public/team/` para la persona investigadora
   (`src/data/teamData.ts`).
4. **Registro.** Añadir una línea en `src/data/insects/index.ts`:
   `"<slug-de-url>": miNuevaFicha`. La ruta `/insecto/<slug-de-url>` queda
   viva automáticamente — ningún componente de este catálogo cambia.
