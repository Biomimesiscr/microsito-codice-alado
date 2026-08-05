# Infography System — Complete Guide

A full-screen interactive infography engine with **layered zoom**, **hover-to-zoom** slots, **click-to-navigate** slots, and a reusable block library.

---

## Overview

The infography system lets you build multi-layer interactive visualizations where:
- **Layers** organize content by zoom level (0 = zoomed out, 1/2/etc. = zoomed in)
- **Slots** position components on the canvas at specific `(x, y)` coordinates
- A slot can live on **one or several layers** (`layer: 1` or `layer: [1, 2]`); a multi-layer slot is **preserved** — it stays mounted and visible across those layers with no fade/flicker
- **Hovering a `zoomable` slot** zooms the scene toward it (resets on mouse-leave)
- **Clicking a slot with `navigateTo`** jumps the canvas to another layer
- **Wheel scrolling** moves between layers; **+/− buttons** do the same
- **Blocks** are reusable, dumb presentational components (text, images, lists)

### Key Components

```
InfographyCanvas ← Orchestrator: layer state, zoom math, wheel/navigation
├── InfographySlot ← Positions a block; manages its own per-layer visibility,
│   │                 hover-zoom, and click-to-navigate
│   └── (Your block, e.g., TitleBlock, BugImage)
├── ZoomController ← +/− buttons + level label
└── useInfography ← Context hook for slots to access canvas state
```

---

## Quick Start — Create an Infography

### 1. Define the content (layers array)

```typescript
// src/components/infographies/MyBug.tsx
import { InfographyCanvas } from '../infography/InfographyCanvas'
import { TitleBlock, BodyText, BugImage, FactList } from '../blocks'
import type { LayerItem } from '../infography/types'

const layers: LayerItem[] = [
  // Layer 0: overview
  {
    layer: 0,
    x: '50%',        // center horizontally
    y: 100,          // 100px from top
    component: <TitleBlock prefix="MY" bold="BUG" />
  },
  {
    layer: 0,
    x: '50%',
    y: 200,
    component: <BodyText>A fascinating creature...</BodyText>
  },
  {
    layer: 0,
    x: '50%',
    y: 300,
    component: <BugImage src="/images/my-bug.png" size={100} />
  },

  // Layer 1: details
  {
    layer: 1,
    x: 30,           // 30px from left (absolute)
    y: 20,
    component: <FactList title="Facts" items={['Fact 1', 'Fact 2']} />
  },
  {
    layer: 1,
    x: 'calc(100% - 100px)',  // CSS expressions work
    y: '50%',                  // percentages work
    component: <BugImage src="/images/detail.png" size={150} />
  },
]

export function MyBug() {
  return <InfographyCanvas height="100%" layers={layers} />
}
```

### 2. Add the route

```typescript
// src/App.tsx
import { MyBug } from './components/infographies/MyBug'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ... other routes ... */}
        <Route element={<InfographyLayout />}>
          <Route path="/micro-avispa" element={<MicroAvispa />} />
          <Route path="/my-bug" element={<MyBug />} />  {/* Add here */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
```

### 3. Visit `/my-bug` in the browser

Done! You now have a full-screen interactive infography.

---

## API Reference

### `InfographyCanvas`

The main orchestrator. Manages zoom state, wheel events, and focus transforms.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `layers` | `LayerItem[]` | (required) | The slots that make up the infography; each declares the layer(s) it appears on |
| `height` | `number \| string` | `420` | Canvas height in px or CSS (e.g., `"100%"`) |
| `zoomLabels` | `string[]` | `['%95', '%120', '%125', ...]` | Labels shown next to the zoom level (one per layer) |

#### Example

```tsx
<InfographyCanvas
  height="100%"
  zoomLabels={['Zoom Out', 'Medium', 'Zoom In']}
  layers={layers}
/>
```

#### Behavior

- **Wheel scroll** → changes layer (up/down)
- **+/− buttons** (top-right) → change layer (with label)
- **Hover a `zoomable` slot** → zooms the scene toward it; **mouse-leave** resets
- **Click a slot with `navigateTo`** → jumps to that layer (Tab + Enter/Space works too)
- Plain slots (no `zoomable`, no `navigateTo`) are non-interactive display content

> The hover zoom uses a `transform-origin` scale (the scene scales *around* the
> hovered slot, which stays put). This is intentionally not a "pan to center" —
> it keeps the cursor over the element so there's no hover oscillation.

---

### `LayerItem`

A single slot (piece of content) in the infography.

```typescript
interface LayerItem {
  layer: number | number[] // Which zoom level(s). Array = preserved across them.
  x: number | string       // Left position: px (number) or CSS (string)
  y: number | string       // Top position: px (number) or CSS (string)
  zoomable?: boolean       // If true, hovering zooms toward it (default: false)
  focusZoom?: number       // Hover zoom scale when zoomable (default: 1.18)
  navigateTo?: number      // If set, clicking the slot jumps to this layer
  component: ReactNode     // The React component to render
}
```

#### Position Examples

```typescript
// Absolute pixel positions
{ layer: 0, x: 32, y: 100, component: ... }

// Centered
{ layer: 0, x: '50%', y: 200, component: ... }

// CSS expressions
{ layer: 1, x: 'calc(100% - 100px)', y: '50%', component: ... }

// Mixed
{ layer: 1, x: 300, y: 'calc(100% - 50px)', component: ... }
```

#### Multiple layers (preserve)

Give `layer` an array to keep a slot mounted and visible across several layers.
Moving between those layers does **not** fade or remount it — it stays put:

```typescript
// Visible on both layer 1 and 2, preserved across the transition:
{ layer: [1, 2], x: '50%', y: '50%', component: <BugImage src="/x.png" size={150} /> }
```

#### Hover zoom (`zoomable` + `focusZoom`)

Only slots marked `zoomable` react to hover. `focusZoom` tunes the magnification:

```typescript
// Hover zooms to 1.5x (more magnified)
{ layer: 1, x: '50%', y: 200, zoomable: true, focusZoom: 1.5, component: ... }

// Hover zooms to default 1.18x
{ layer: 1, x: '50%', y: 200, zoomable: true, component: ... }
```

#### Click to navigate (`navigateTo`)

```typescript
// Clicking this slot jumps the canvas to layer 2:
{ layer: 1, x: 30, y: 20, navigateTo: 2, component: <FactList title="Más" items={['...']} /> }
```

A slot can be both `zoomable` and `navigateTo` (hover zooms, click navigates).

---

### `useInfography`

A hook that gives slots access to the canvas state (for advanced use).

```typescript
import { useInfography } from '../infography/useInfography'

function MyComponent() {
  const { currentLayer, goToLayer } = useInfography()

  return (
    <div>
      Current layer: {currentLayer}
      <button onClick={() => goToLayer(2)}>Go to layer 2</button>
    </div>
  )
}
```

#### Context Value

| Property | Type | Description |
|----------|------|-------------|
| `currentLayer` | `number` | Active zoom level (0-indexed) |
| `goToLayer` | `(layer: number) => void` | Navigate to a layer (clamped to valid range) |
| `focusElement` | `(el: HTMLElement, centeredX: boolean, focusZoom?: number) => void` | Internal: applies hover zoom toward a slot (rarely needed) |
| `resetFocus` | `() => void` | Internal: resets the zoom (rarely needed) |

---

## Built-in Blocks

Pre-made presentational components for common content types.

### `TitleBlock`

Large heading with separate prefix and bold text.

```typescript
import { TitleBlock } from '../blocks/TitleBlock'

<TitleBlock prefix="MICRO" bold="AVISPA" />
// Renders: MICROavispA (with "MICRO" light, "AVISPA" bold)
```

| Prop | Type | Description |
|------|------|-------------|
| `prefix` | `string` | Light-weight text |
| `bold` | `string` | Bold text |

---

### `BodyText`

Centered paragraph with optional max-width.

```typescript
import { BodyText } from '../blocks/BodyText'

<BodyText maxWidth={300}>
  A paragraph of descriptive text about the creature.
</BodyText>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | (required) | The text content |
| `maxWidth` | `number` | `340` | Max width in px |

---

### `BugImage`

Loads an image; shows a graceful placeholder if it fails.

```typescript
import { BugImage } from '../blocks/BugImage'

<BugImage src="/images/bug.png" size={150} alt="My bug" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | (required) | Image URL |
| `size` | `number` | (required) | Width & height in px (square) |
| `alt` | `string` | `''` | Alt text (shows in placeholder if image fails) |

**Placeholder behavior:** If the image fails to load (404, network error), renders a
dashed circle with the `alt` text. No broken-image icon, no visual break.

---

### `FactList`

Bulleted list with a title.

```typescript
import { FactList } from '../blocks/FactList'

<FactList
  title="Characteristics"
  items={[
    'Fact one',
    'Fact two',
    'Fact three',
  ]}
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Uppercase section title |
| `items` | `string[]` | Array of bullet points |

---

### `BlobDetail`

Image in a rounded frame with a caption below.

```typescript
import { BlobDetail } from '../blocks/BlobDetail'

<BlobDetail src="/images/larva.png" label="Larva stage" />
```

| Prop | Type | Description |
|------|------|-------------|
| `src` | `string` | Image URL |
| `label` | `string` | Caption text |

---

### `SectionLabel`

Hierarchical label: small subtitle over large title.

```typescript
import { SectionLabel } from '../blocks/SectionLabel'

<SectionLabel
  title="ANATOMY OF THE"
  subtitle="thorax"
  align="right"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | (required) | Small, uppercase label |
| `subtitle` | `string` | (required) | Large, bold heading |
| `align` | `'left' \| 'right'` | `'left'` | Text alignment |

---

## Creating Custom Blocks

A block is just a React component. There's no special base class—just receive props and render.

### Simple Block Example

```typescript
// src/components/blocks/CustomBlock.tsx

interface Props {
  label: string
  value: string
  color?: string
}

export function CustomBlock({ label, value }: Props) {
  return (
    <div className="rounded-lg p-4 bg-surface-raised">
      <p className="text-sm font-semibold text-fg-muted">{label}</p>
      <p className="text-2xl font-bold text-fg">{value}</p>
    </div>
  )
}
```

### Use it in layers

```typescript
const layers: LayerItem[] = [
  {
    layer: 0,
    x: '50%',
    y: 100,
    component: <CustomBlock label="Population" value="Millions" color="green" />
  },
]
```

### Tips

- **Keep them dumb** — blocks don't know about zoom, layers, or focus. Just render what they're given.
- **Use Tailwind** — styling should use `className` with Tailwind utilities.
- **Avoid side effects** — blocks render many times; no `useEffect` unless necessary.
- **Make them reusable** — if you write it once, you'll use it in multiple places.

---

## Styling & Layout

### Tailwind Integration

All blocks use Tailwind classes. The canvas and layout wrappers also use Tailwind:

```typescript
// Surfaces set the palette; never hardcode a colour (see README.md → Theme)
<Surface tone="cream">   // InfographyLayout, Layout
<Surface tone="olive">   // Menu

// Dynamic transforms stay inline (InfographyCanvas)
<div style={{ transform: `translate(${tx}px, ${ty}px) scale(${z})` }}>
```

### Colors & Theme

Check `tailwind.config.js` for the project's color palette. Common colors:

- `white`, `black`, `gray-*` (50-950)
- Theme colors like `primary`, `accent` (if defined)

Example custom block with theme colors:

```typescript
<div className="bg-primary/10 text-primary border border-primary/20">
  Themed content
</div>
```

### Responsive Sizing

Slots use absolute positioning, so responsive breakpoints work on the *block level*, not the slot position:

```typescript
// Slot position is fixed
{ layer: 0, x: '50%', y: 100, component: 
  // But the block itself can be responsive
  <div className="w-full max-w-xs md:max-w-md lg:max-w-lg">
    Content
  </div>
}
```

---

## Advanced Patterns

### Multi-Language Content

Use `react-i18next` (already in the project):

```typescript
import { useTranslation } from 'react-i18next'

const layers: LayerItem[] = [
  {
    layer: 0,
    x: '50%',
    y: 100,
    component: <TranslatedTitle />
  },
]

function TranslatedTitle() {
  const { t } = useTranslation()
  return <TitleBlock prefix={t('bug.prefix')} bold={t('bug.name')} />
}
```

Then add keys to `src/locales/{es,en}/global.json`:

```json
{
  "bug": {
    "prefix": "MICRO",
    "name": "AVISPA"
  }
}
```

### Dynamic Content (Data-Driven Layers)

Build layers from an API response or data file:

```typescript
interface BugData {
  name: string
  facts: string[]
  image: string
}

function BugInfography({ data }: { data: BugData }) {
  const layers: LayerItem[] = [
    { layer: 0, x: '50%', y: 100, component: <TitleBlock bold={data.name} prefix="" /> },
    { layer: 1, x: 30, y: 20, component: <FactList title="Facts" items={data.facts} /> },
  ]
  
  return <InfographyCanvas height="100%" layers={layers} />
}
```

### Conditional Rendering

Show/hide slots based on conditions:

```typescript
const layers: LayerItem[] = [
  { layer: 0, x: '50%', y: 100, component: <TitleBlock bold="BUG" /> },
  ...(includeDetails ? [{
    layer: 1,
    x: '50%',
    y: 200,
    component: <FactList title="Details" items={details} />
  }] : [])
]
```

---

## Common Tasks

### Add a new layer to an existing infography

1. Add a new `LayerItem` to the `layers` array with a new `layer` number:

```typescript
const layers: LayerItem[] = [
  // ... existing layers 0, 1, 2 ...
  
  // New layer 3
  {
    layer: 3,
    x: '50%',
    y: '50%',
    component: <BugImage src="/images/detail.png" size={200} />
  },
]
```

2. The `ZoomController` automatically creates a +/− button for it.

### Adjust slot positions

If content looks off-center or too crowded:

```typescript
// Before
{ layer: 0, x: '50%', y: 100, component: ... }

// After: move 50px higher
{ layer: 0, x: '50%', y: 50, component: ... }

// Or use CSS calc for relative sizing
{ layer: 0, x: '50%', y: 'calc(50% - 100px)', component: ... }
```

### Customize zoom labels

```typescript
<InfographyCanvas
  height="100%"
  zoomLabels={['Overview', 'Details', 'Micro', 'Nano']}
  layers={layers}
/>
```

Labels must match the number of layers.

### Customize zoom intensity (focusZoom)

Make hover zoom more or less (requires `zoomable: true`):

```typescript
// Subtle zoom
{ layer: 1, x: '50%', y: 200, zoomable: true, focusZoom: 1.1, component: ... }

// Aggressive zoom
{ layer: 1, x: '50%', y: 200, zoomable: true, focusZoom: 2.0, component: ... }

// Default 1.18x
{ layer: 1, x: '50%', y: 200, zoomable: true, component: ... }
```

---

## Troubleshooting

### Content is top-clustered on full-screen canvas

**Problem:** You tuned slot positions for the old 420px height, now it's 100% viewport.

**Solution:** Increase `y` values (or use percentage-based `y`):

```typescript
// Before (420px canvas)
{ layer: 0, x: '50%', y: 80, component: ... }

// After (1080px canvas)
{ layer: 0, x: '50%', y: 200, component: ... }
// Or use percentage
{ layer: 0, x: '50%', y: '15%', component: ... }
```

### Images not loading

**Problem:** Image shows placeholder circle instead of picture.

**Solutions:**
1. Check the file exists at the path (e.g., `public/images/bug.png`)
2. Check the path is correct in `<BugImage src="/images/bug.png" />`
3. Check the image is readable by the browser (not blocked by CORS, etc.)

The `BugImage` component gracefully falls back, so this isn't a runtime error—just verify the URL.

### Hover zoom not working

**Problem:** Hovering a slot doesn't zoom.

**Solutions:**
1. Did you set `zoomable: true` on the item? Only zoomable slots react to hover.
2. Is the slot visible? Check the current `layer` includes the item's layer(s).
3. Is it reachable? Check the slot isn't covered by another element on top of it.

### Click-to-navigate not working

**Problem:** Clicking a slot doesn't change layers.

**Solutions:**
1. Did you set `navigateTo` to a valid layer index? Out-of-range values are clamped.
2. Is the slot visible and on the current layer?

### Zoom buttons disabled but more layers exist

**Problem:** +/− buttons are grayed out, but you know there are more layers.

**Solution:** `zoomLabels` must have one entry per layer. If you have 4 layers (0–3), provide 4 labels:

```typescript
<InfographyCanvas
  zoomLabels={['Label 0', 'Label 1', 'Label 2', 'Label 3']}
  layers={layers}
/>
```

---

## Performance Tips

### Large slot counts

If you have **many slots** (100+), the canvas still renders efficiently—each layer is hidden with `pointer-events: none`, so inactive layers don't consume click/interaction overhead.

### Heavy custom blocks

If a block is expensive to render (calculations, large images), memoize it:

```typescript
import { memo } from 'react'

const ExpensiveBlock = memo(function({ data }: Props) {
  // Complex logic here
  return <div>...</div>
})
```

### Images

Use appropriately-sized images:
- Large blocks (200px+): 500–800px source
- Small blocks (80px): 150–200px source

PNG with transparency works best for bug/insect images.

---

## File Structure

```
src/components/
├── infography/                    ← Core engine (do not modify)
│   ├── types.ts                   ← TypeScript interfaces
│   ├── useInfography.ts           ← Context + hook
│   ├── InfographyCanvas.tsx       ← Main orchestrator
│   ├── InfographySlot.tsx         ← Slot positioning, per-layer visibility, hover/navigate
│   └── ZoomController.tsx         ← +/− buttons + label
│
├── blocks/                        ← Reusable presentational blocks
│   ├── TitleBlock.tsx
│   ├── BodyText.tsx
│   ├── BugImage.tsx
│   ├── FactList.tsx
│   ├── BlobDetail.tsx
│   └── SectionLabel.tsx
│
├── infographies/                  ← Your infography pages
│   ├── MicroAvispa.tsx            ← Example: micro-avispa
│   └── MyBug.tsx                  ← Your new infography here
│
└── layout/
    ├── Layout.tsx                 ← Main site layout (dark)
    └── InfographyLayout.tsx       ← Infography page layout (light + back btn)
```

---

## Cheat Sheet

### Create a new infography in 3 steps

```typescript
// 1. Define layers
const layers: LayerItem[] = [
  { layer: 0, x: '50%', y: 100, component: <TitleBlock bold="NAME" /> },
  { layer: 1, x: 30, y: 20, component: <FactList title="Facts" items={['A', 'B']} /> },
]

// 2. Wrap in component
export function MyBug() {
  return <InfographyCanvas height="100%" layers={layers} />
}

// 3. Add route
<Route path="/my-bug" element={<MyBug />} />
```

### Common layer heights (for full-screen 1080px canvas)

| Level | Typical Use | Y Position |
|-------|------------|-----------|
| 0 | Overview | 150–300 |
| 1 | Details | 100–150 (or re-center) |
| 2 | Micro | 50–150 (or re-center) |

Adjust based on your content; use percentages for flexibility.

---

## Questions?

- Check the `src/components/infographies/MicroAvispa.tsx` example for a working reference
- Review the block components in `src/components/blocks/` for styling patterns
- The infography engine is in `src/components/infography/` — read the code if you need internals
