# Core Components

Reusable UI primitives under `src/components/core/`. **Always prefer these over writing raw Tailwind HTML** to ensure visual consistency.

## Overview

| Component | Path | Description |
|---|---|---|
| `Title` | `titles/Title.tsx` | Heading (`h1`–`h6`) with `primary` / `secondary` / `accent` variants and optional `glow` |
| `Button` | `buttons/Button.tsx` | Button with `glass` / `solid` / `outline` / `ghost` variants, `sm` / `md` / `lg` sizes |
| `Paragraph` | `paragraphs/Paragraph.tsx` | Body text with `body` / `lead` / `muted` variants |
| `SegmentedToggle` | `toggles/SegmentedToggle.tsx` | Multi-option segmented control with animated sliding indicator |
| `SwitchToggle` | `toggles/SwitchToggle.tsx` | Binary on/off switch with optional label |

All components accept a `className` prop for one-off Tailwind overrides. **Never modify the component files directly for single-use style changes.**

All components extend native HTML element attributes via `ComponentPropsWithoutRef<"element">`, so `id`, `aria-*`, `data-*`, etc. pass through correctly.

---

## Title

**File:** `src/components/core/titles/Title.tsx`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `tag` | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6"` | `"h2"` | HTML heading element |
| `variant` | `"primary" \| "secondary" \| "accent"` | `"primary"` | Visual style |
| `glow` | `boolean` | `false` | White drop-shadow glow |
| `className` | `string` | `""` | Additional Tailwind classes |

### Variants

| Variant | Styles | Use for |
|---|---|---|
| `primary` | `text-white font-bold text-4xl→7xl` | Hero / main headings |
| `secondary` | `text-white/95 font-medium text-2xl→5xl` | Section headings |
| `accent` | `text-tertiary font-bold text-3xl→5xl` | Highlighted callout headings |

### Examples

```tsx
import { Title } from "@/components/core/titles/Title";

// Hero heading with glow
<Title tag="h1" variant="primary" glow>
  Códice Alado
</Title>

// Section heading
<Title tag="h2" variant="secondary">
  Coming Soon
</Title>

// Accent callout
<Title tag="h3" variant="accent">
  Stay tuned
</Title>
```

---

## Button

**File:** `src/components/core/buttons/Button.tsx`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"glass" \| "solid" \| "outline" \| "ghost"` | `"glass"` | Visual style |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Button size |
| `className` | `string` | `""` | Additional Tailwind classes |

### Variants

| Variant | Description | Best for |
|---|---|---|
| `glass` | `bg-black/30 backdrop-blur-md border-white/20 rounded-full` | Nav buttons, overlays |
| `solid` | `bg-primary rounded-lg` | Primary actions, CTAs |
| `outline` | `bg-transparent border-white/30 rounded-lg` | Secondary actions |
| `ghost` | `bg-transparent text-white/85 rounded-md hover:scale-103` | Tertiary, text-like buttons |

### Sizes

| Size | Padding | Text |
|---|---|---|
| `sm` | `px-4 py-1.5` | `text-xs→sm` |
| `md` | `px-8 py-3` | `text-sm→base` |
| `lg` | `px-10 py-4` | `text-base→lg` |

### Examples

```tsx
import { Button } from "@/components/core/buttons/Button";

// Glass button (nav)
<Button variant="glass" size="md">
  Menú
</Button>

// Solid CTA
<Button variant="solid" size="lg" onClick={handleSubmit}>
  Submit
</Button>

// Ghost text-like button
<Button variant="ghost" size="sm">
  Log In
</Button>
```

---

## Paragraph

**File:** `src/components/core/paragraphs/Paragraph.tsx`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"body" \| "lead" \| "muted"` | `"body"` | Visual style |
| `className` | `string` | `""` | Additional Tailwind classes |

### Variants

| Variant | Styles | Use for |
|---|---|---|
| `body` | `text-white/85 font-light text-base→lg max-w-3xl` | Default body text |
| `lead` | `text-white/95 font-normal text-lg→xl max-w-4xl` | Intro / lead paragraphs |
| `muted` | `text-white/55 font-light text-xs→sm` | Captions, footnotes, helpers |

### Examples

```tsx
import { Paragraph } from "@/components/core/paragraphs/Paragraph";

// Lead paragraph
<Paragraph variant="lead">
  Something magical is coming.
</Paragraph>

// Standard body text
<Paragraph>
  We're building a new experience for you.
</Paragraph>

// Muted caption
<Paragraph variant="muted">
  © 2026 Códice Alado
</Paragraph>
```

---

## SegmentedToggle

**File:** `src/components/core/toggles/SegmentedToggle.tsx`

Multi-option toggle with an animated sliding indicator. Ideal for mutually exclusive choices like language pickers or view modes.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `ToggleOption[]` (`{ value: string; label: string }`) | required | Selectable options |
| `value` | `string` | required | Currently selected value |
| `onChange` | `(value: string) => void` | required | Selection change callback |
| `className` | `string` | `""` | Additional Tailwind classes |

### Examples

```tsx
import { SegmentedToggle } from "@/components/core/toggles/SegmentedToggle";

const [lang, setLang] = useState("es");

<SegmentedToggle
  options={[
    { value: "es", label: "Español" },
    { value: "en", label: "English" },
  ]}
  value={lang}
  onChange={setLang}
/>
```

---

## SwitchToggle

**File:** `src/components/core/toggles/SwitchToggle.tsx`

Binary on/off toggle with optional label. Accessible (`role="switch"`, `aria-checked`).

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | required | Current on/off state |
| `onChange` | `(checked: boolean) => void` | required | Toggle callback |
| `label` | `string` | — | Optional label text |
| `className` | `string` | `""` | Additional Tailwind classes |

### Examples

```tsx
import { SwitchToggle } from "@/components/core/toggles/SwitchToggle";

const [dark, setDark] = useState(true);

// With label
<SwitchToggle
  checked={dark}
  onChange={setDark}
  label="Dark mode"
/>

// Without label (icon-only context)
<SwitchToggle checked={dark} onChange={setDark} />
```

---

## Guidelines

- **Use core components** instead of writing raw Tailwind headings, buttons, or text blocks.
- **Extend with `className`** — never edit component files for one-off changes.
- **Use theme tokens** (`primary`, `secondary`, `tertiary`, `quaternary`) from `src/index.css` over hardcoded hex values.
- **Native attributes pass through** — `id`, `aria-*`, `data-*`, `onClick`, `style`, etc. all work on every component.