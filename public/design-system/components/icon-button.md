```scope
IconButton
BookmarkSimpleIcon
CaretRightIcon
GearIcon
MagnifyingGlassIcon
PauseIcon
PlayIcon
XIcon
```

# Icon Button

Square, icon-only sibling of `Button`. Same variants and focus treatment, but it requires `aria-label` and clones its child icon to inject the size that matches the button's footprint.

```tsx preview
<IconButton variant="primary" aria-label="Search">
  <MagnifyingGlassIcon weight="light" />
</IconButton>
```

## Anatomy

Pass a single Phosphor icon as the child. The component clones the icon to set its `size` prop based on the button's `size`, so callers don't manage that themselves. `aria-label` is mandatory — there's no visible text to fall back on.

```tsx
import { IconButton } from "@src/components/primitives/icon-button";
import { PlayIcon } from "@phosphor-icons/react";

<IconButton aria-label="Play">
  <PlayIcon weight="light" />
</IconButton>;
```

## Examples

### Variants

```tsx preview
<IconButton variant="primary" aria-label="Continue reading">
  <CaretRightIcon weight="light" />
</IconButton>
<IconButton variant="secondary" aria-label="Bookmark page">
  <BookmarkSimpleIcon weight="light" />
</IconButton>
<IconButton variant="outline" aria-label="Search">
  <MagnifyingGlassIcon weight="light" />
</IconButton>
<IconButton variant="ghost" aria-label="Settings">
  <GearIcon weight="light" />
</IconButton>
```

### Sizes

The icon size is derived from the button size (16 / 20 / 24 px), so the same `<PlayIcon />` child renders correctly at every size.

```tsx preview
<IconButton size="sm" aria-label="Play (small)">
  <PlayIcon weight="light" />
</IconButton>
<IconButton size="md" aria-label="Play (medium)">
  <PlayIcon weight="light" />
</IconButton>
<IconButton size="lg" aria-label="Play (large)">
  <PlayIcon weight="light" />
</IconButton>
```

### Disabled

```tsx preview
<IconButton variant="primary" disabled aria-label="Pause (disabled)">
  <PauseIcon weight="light" />
</IconButton>
<IconButton variant="secondary" disabled aria-label="Bookmark (disabled)">
  <BookmarkSimpleIcon weight="light" />
</IconButton>
<IconButton variant="outline" disabled aria-label="Search (disabled)">
  <MagnifyingGlassIcon weight="light" />
</IconButton>
<IconButton variant="ghost" disabled aria-label="Close (disabled)">
  <XIcon weight="light" />
</IconButton>
```

### Per-sin themes

Drop the button inside a `data-sin` wrapper and the accent shifts via `color-mix()` tokens — same primitive, no per-sin overrides.

```tsx preview
<div className="flex flex-wrap items-center gap-3">
  {["pride", "lust", "sloth", "gluttony", "greed", "wrath", "envy", "origin"].map((sin) => (
    <div key={sin} data-sin={sin} className="flex flex-col items-center gap-2">
      <IconButton variant="primary" aria-label={`Continue (${sin})`}>
        <CaretRightIcon weight="light" />
      </IconButton>
      <span className="text-style-caption text-fg-muted capitalize">{sin}</span>
    </div>
  ))}
</div>
```

## Props

### IconButton

Renders a `<button>` element wrapping Base UI's headless `Button`. Clones its single child to inject a `size` prop matched to the button size.

```json props
[
  {
    "prop": "variant",
    "type": "\"primary\" | \"secondary\" | \"outline\" | \"ghost\"",
    "default": "\"primary\"",
    "description": "Visual emphasis. Mirrors Button: primary fills with accent, secondary/outline use accent border, ghost is unstyled until hover."
  },
  {
    "prop": "size",
    "type": "\"sm\" | \"md\" | \"lg\"",
    "default": "\"md\"",
    "description": "Square footprint (h-8/10/12). Also drives the cloned icon's size prop (16 / 20 / 24)."
  },
  {
    "prop": "aria-label",
    "type": "string",
    "default": "—",
    "description": "Required. There is no visible text, so screen readers rely on this for the button's accessible name."
  },
  {
    "prop": "disabled",
    "type": "boolean",
    "default": "false",
    "description": "Applies the disabled styling (opacity + not-allowed cursor). On native buttons it also blocks click activation; for non-native renders, set aria-disabled too."
  },
  {
    "prop": "render",
    "type": "ReactElement",
    "default": "—",
    "description": "Base UI escape hatch. Provide an element (typically a router Link) and the button styling is projected onto it instead of the default <button>."
  },
  {
    "prop": "nativeButton",
    "type": "boolean",
    "default": "!render",
    "description": "Forces native button semantics. Defaults to true unless render is provided."
  },
  {
    "prop": "...rest",
    "type": "ButtonHTMLAttributes",
    "default": "—",
    "description": "All standard <button> attributes pass through to the rendered element."
  }
]
```

```json data-attributes
[
  {
    "attribute": "data-disabled",
    "description": "Present when the button is disabled (mirrored to non-native renders so styling is consistent across <button> and <a>)."
  }
]
```

## Accessibility

- `aria-label` is required by the type — TS will fail the build if it's missing.
- Renders a native `<button>` by default, so role, focus, and disabled state are handled by the browser.
- The cloned child receives a `size` prop; if you need to override it (e.g. a non-Phosphor icon), wrap the icon in a span so the clone target is a no-op host element.

### Keyboard

```json keyboard
[
  { "keys": ["Enter"], "description": "Activates the button." },
  { "keys": ["Space"], "description": "Activates the button." },
  { "keys": ["Tab"], "description": "Moves focus into and out of the button in document order." }
]
```
