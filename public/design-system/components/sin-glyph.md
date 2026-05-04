```scope
SinGlyph
```

# Sin Glyphs

One symbolic Phosphor icon per sin — a small lookup that turns a `Sin` value into the right glyph at the size and weight you ask for. Color flows through `currentColor`, so wrap a `data-sin` ancestor and the glyph picks up the accent.

```tsx preview
<div data-sin="pride" className="text-accent">
  <SinGlyph sin="pride" size={32} weight="light" />
</div>
```

## Anatomy

`SinGlyph` is a thin lookup over Phosphor icons — pride → `CrownIcon`, lust → `MaskHappyIcon`, sloth → `GiftIcon`, gluttony → `ForkKnifeIcon`, greed → `CoinsIcon`, wrath → `CrosshairIcon`, envy → `ScissorsIcon`, origin → `AppleLogoIcon`. The chosen icon receives every other prop unchanged, so you control sizing and weight via the standard Phosphor surface.

```tsx
import { SinGlyph } from "@src/components/thematic/sin-glyph";

<SinGlyph sin="pride" size={32} weight="light" />;
```

## Examples

### All eight glyphs

The full set, each in its own `data-sin` cell so the accent picks up the right colour. `origin` is the eighth — the apple of original sin.

```tsx preview
<div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
  {["pride", "lust", "sloth", "gluttony", "greed", "wrath", "envy", "origin"].map((sin) => (
    <div
      key={sin}
      data-sin={sin}
      className="flex flex-col items-center gap-2 border border-border rounded-sm py-5 text-accent"
    >
      <SinGlyph sin={sin} size={32} weight="light" />
      <code className="text-style-caption text-fg-muted capitalize">{sin}</code>
    </div>
  ))}
</div>
```

### Weights

Phosphor's `weight` prop swaps the stroke style. `light` reads as the storybook default; `bold` and `fill` punch when the glyph carries more semantic weight.

```tsx preview
<div className="flex flex-wrap items-center gap-6 text-accent">
  <SinGlyph sin="wrath" size={28} weight="thin" />
  <SinGlyph sin="wrath" size={28} weight="light" />
  <SinGlyph sin="wrath" size={28} weight="regular" />
  <SinGlyph sin="wrath" size={28} weight="bold" />
  <SinGlyph sin="wrath" size={28} weight="fill" />
</div>
```

## Props

### SinGlyph

```json props
[
  {
    "prop": "sin",
    "type": "Sin",
    "default": "—",
    "description": "Which sin to render. One of `pride`, `lust`, `sloth`, `gluttony`, `greed`, `wrath`, `envy`, `origin`."
  },
  {
    "prop": "size",
    "type": "number | string",
    "default": "(Phosphor default)",
    "description": "Forwarded to the underlying Phosphor icon. Accepts a CSS length or unitless number (treated as px)."
  },
  {
    "prop": "weight",
    "type": "\"thin\" | \"light\" | \"regular\" | \"bold\" | \"fill\"",
    "default": "\"regular\"",
    "description": "Phosphor stroke style. The design system leans on `light` for ornamental contexts."
  },
  {
    "prop": "...rest",
    "type": "PhosphorIconProps",
    "default": "—",
    "description": "Standard Phosphor props (`color`, `mirrored`, `className`, etc.) pass through."
  }
]
```

## Accessibility

- The glyph is a Phosphor icon, not an `aria-hidden` decoration — by default screen readers may pick it up. When the surrounding text already labels the sin, pass `aria-hidden` to keep the announcement clean.
- Always pair a glyph with a visible or assistive label. The icon alone isn't readable for sighted screen-reader users (icon ↔ sin mapping isn't a known convention).
