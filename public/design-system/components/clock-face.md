```scope
ClockFace
```

# Clock Face

Twelve tick marks, a static hour hand at 3 o'clock, and a minute hand that ticks once per second around the dial (60 discrete steps per rotation). Sized in `em` so it scales with the surrounding text — designed to overlay the "C" of a display heading. Purely ornamental (`aria-hidden`).

```tsx preview
<span className="relative inline-block text-style-display text-fg">
  C
  <ClockFace />
</span>
```

## Anatomy

`ClockFace` is an absolutely-positioned SVG that anchors itself over a relative parent. The default placement targets the inside of a capital "C" — top-left of the parent, biased up and to the left so the dial tucks under the curve of the letter. Wrap in a `relative inline-block` and place a single character next to it.

```tsx
import { ClockFace } from "@src/components/thematic/clock-face";

<span className="relative inline-block text-style-display text-fg">
  C
  <ClockFace />
</span>;
```

## Examples

### Two sizes — em-relative

Because the SVG is sized in `em`, changing the parent's `font-size` resizes the clock without touching the component.

```tsx preview
<div className="flex flex-wrap items-center gap-12 text-style-display text-fg">
  <span className="relative inline-block">
    C
    <ClockFace />
  </span>
  <span className="relative inline-block" style={{ fontSize: "6rem" }}>
    C
    <ClockFace />
  </span>
</div>
```

### Sin-tinted

`stroke="currentColor"` means the dial picks up whatever colour the parent advertises — including `data-sin` accents.

```tsx preview
<div className="flex flex-wrap items-center gap-12 text-style-display">
  <span data-sin="pride" className="relative inline-block text-accent">
    C
    <ClockFace />
  </span>
  <span data-sin="wrath" className="relative inline-block text-accent">
    C
    <ClockFace />
  </span>
  <span data-sin="envy" className="relative inline-block text-accent">
    C
    <ClockFace />
  </span>
</div>
```

## Props

### ClockFace

```json props
[
  {
    "prop": "className",
    "type": "string",
    "default": "—",
    "description": "Merged onto the SVG. Override positioning (`top-*`, `left-*`, `-translate-*`) when overlaying a glyph other than capital C."
  }
]
```

## Notes

- The minute hand animation uses `steps(60, end)` so it advances in 60 discrete jumps per rotation — visually closer to a real clock's mechanism than a smooth sweep.
- One full rotation lasts 32 seconds; this is intentionally divorced from real time. The component reads as ornamental, not functional.
- The hour hand is static at 3 o'clock; if you need a different fixed time, fork the SVG rather than threading it as a prop — the design intentionally exposes a single, opinionated decoration.
