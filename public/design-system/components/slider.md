```scope
Slider
```

# Slider

Range control. Drives font size and audio scrubbing across the app. Auto-themes inside `data-sin` wrappers — track, indicator, thumb halo, and focus ring all retint via the `--accent` cascade.

```tsx preview
<div className="w-full max-w-md">
  <Slider defaultValue={50} min={0} max={100} step={1} aria-label="Font size" />
</div>
```

## Anatomy

The design-system wrapper renders the full Base UI tree — `Root`, `Control`, `Track`, `Indicator`, `Thumb` — as a single component. Pass standard slider props (`min`, `max`, `step`, `defaultValue` / `value`) and an `aria-label`; the wrapper forwards the label onto the thumb so screen readers announce the right context.

```tsx
import { Slider } from "@src/components/primitives/slider";

<Slider defaultValue={50} min={0} max={100} step={1} aria-label="Font size" />;
```

## Examples

### Default

A 0–100 slider with a single thumb starting at 50.

```tsx preview
<div className="w-full max-w-md">
  <Slider defaultValue={50} min={0} max={100} step={1} aria-label="Font size" />
</div>
```

### With min / max range

`min` and `max` accept any numeric range; `step` controls the granularity. Pair with a static label so the unit is clear.

```tsx preview
<div className="w-full max-w-md flex flex-col gap-3">
  <span className="text-style-eyebrow text-fg-muted">Font Size (12–32 px)</span>
  <Slider defaultValue={18} min={12} max={32} step={1} aria-label="Font size" />
</div>
```

### Disabled

```tsx preview
<div className="w-full max-w-md">
  <Slider defaultValue={40} disabled aria-label="Disabled slider" />
</div>
```

### Per-sin themes

Drop the slider inside a `data-sin` wrapper and the indicator + thumb border + focus halo all flip to the sin's accent token.

```tsx preview
<div className="grid grid-cols-1 gap-6 sm:grid-cols-3 w-full">
  {[
    ["pride", 30],
    ["greed", 60],
    ["wrath", 85],
  ].map(([sin, value]) => (
    <div key={sin} data-sin={sin} className="flex flex-col gap-3">
      <span className="text-style-eyebrow text-fg-muted capitalize">{sin}</span>
      <Slider defaultValue={value} aria-label={sin} />
    </div>
  ))}
</div>
```

## Props

### Slider

Wraps Base UI's Slider compound (`Root` + `Control` + `Track` + `Indicator` + `Thumb`) into a single component. Forwards standard slider props through to the root.

```json props
[
  {
    "prop": "value",
    "type": "number",
    "default": "—",
    "description": "Controlled value. Pair with `onValueChange`."
  },
  {
    "prop": "defaultValue",
    "type": "number",
    "default": "—",
    "description": "Initial value in uncontrolled mode."
  },
  {
    "prop": "onValueChange",
    "type": "(value: number) => void",
    "default": "—",
    "description": "Fires whenever the thumb moves (drag, keyboard, click on track)."
  },
  {
    "prop": "min",
    "type": "number",
    "default": "0",
    "description": "Lower bound of the range."
  },
  {
    "prop": "max",
    "type": "number",
    "default": "100",
    "description": "Upper bound of the range."
  },
  {
    "prop": "step",
    "type": "number",
    "default": "1",
    "description": "Granularity. Keyboard arrows move by this step; Page keys move by `largeStep` if Base UI supports it on your version."
  },
  {
    "prop": "disabled",
    "type": "boolean",
    "default": "false",
    "description": "Drops opacity, blocks pointer + keyboard interaction, and switches the cursor to not-allowed."
  },
  {
    "prop": "aria-label",
    "type": "string",
    "default": "—",
    "description": "Accessible name for the thumb. The wrapper forwards it through Base UI's `getAriaLabel` so the thumb announces correctly."
  },
  {
    "prop": "...rest",
    "type": "Base UI Slider.Root props",
    "default": "—",
    "description": "All other Base UI slider root props pass through (orientation, name, format, etc.)."
  }
]
```

```json data-attributes
[
  {
    "attribute": "data-dragging",
    "description": "Set on the thumb while the user is actively dragging — drives the `cursor-grabbing` and the slight scale up."
  },
  { "attribute": "data-disabled", "description": "Mirrored when `disabled` is set." }
]
```

## Accessibility

- The thumb is a focusable element with `role="slider"` (managed by Base UI). `aria-label` is forwarded to it.
- Keyboard users get arrow-key control out of the box; the focus halo is a stacked box-shadow keyed to `var(--accent)` so it retints under `data-sin` wrappers without extra plumbing.
- For paired controls (e.g. font size + reset button) keep them in the same labelled group so the relationship is announced.

### Keyboard

```json keyboard
[
  { "keys": ["ArrowRight", "ArrowUp"], "description": "Increment by `step`." },
  { "keys": ["ArrowLeft", "ArrowDown"], "description": "Decrement by `step`." },
  { "keys": ["Home"], "description": "Jump to `min`." },
  { "keys": ["End"], "description": "Jump to `max`." },
  { "keys": ["PageUp"], "description": "Increment by a larger step (typically 10× `step`)." },
  { "keys": ["PageDown"], "description": "Decrement by a larger step." }
]
```
