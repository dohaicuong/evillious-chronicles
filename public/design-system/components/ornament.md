```scope
Ornament
```

# Ornament

A decorative section break — two thin rules with a centered glyph in Pirata One (the accent font). Use between volume sections for storybook pacing or as a chapter-end flourish. Marked `role="separator"` and `aria-hidden`.

```tsx preview
<Ornament />
```

## Anatomy

A flex row: `flex-1 h-px bg-border` rules on either side, with a glyph in `font-accent text-xl text-accent` in the middle. Default glyph is the four-pointed star (`✦`); pass `glyph` to swap it for any single character. Default vertical margin is `my-8`; override via `className` when the surrounding rhythm needs something different.

```tsx
import { Ornament } from "@src/components/thematic/ornament";

<Ornament />
<Ornament glyph="❦" />
```

## Examples

### Default — section break

The standard surface. The accent-coloured glyph sits between two muted rules.

```tsx preview
<div className="flex flex-col gap-2 border border-border rounded-sm p-8">
  <p className="text-style-body text-fg">A passage of prose, then…</p>
  <Ornament />
  <p className="text-style-body text-fg">…a section break, in candle gold.</p>
</div>
```

### Glyph variants

Any single character works. Heart (`❦`) and inverted-heart (`☙`) fleurons read as warmer; the four-pointed star (`✦`) is the storybook default.

```tsx preview
<div className="flex flex-col gap-2 border border-border rounded-sm p-8">
  <p className="text-style-caption text-fg-muted">Default — four-pointed star</p>
  <Ornament />
  <p className="text-style-caption text-fg-muted">Heart fleuron</p>
  <Ornament glyph="❦" />
  <p className="text-style-caption text-fg-muted">Inverted heart fleuron</p>
  <Ornament glyph="☙" />
  <p className="text-style-caption text-fg-muted">Asterism</p>
  <Ornament glyph="⁂" />
</div>
```

### Sin-tinted

The glyph picks up the local `data-sin` accent — useful when a section break sits inside a chapter coloured by its sin.

```tsx preview
<div className="flex flex-col gap-2 border border-border rounded-sm p-8">
  <div data-sin="pride">
    <Ornament />
  </div>
  <div data-sin="wrath">
    <Ornament glyph="❦" />
  </div>
  <div data-sin="envy">
    <Ornament glyph="☙" />
  </div>
</div>
```

## Props

### Ornament

```json props
[
  {
    "prop": "glyph",
    "type": "string",
    "default": "\"✦\"",
    "description": "The character that sits between the two rules. Renders in the accent font; any single Unicode glyph works."
  },
  {
    "prop": "className",
    "type": "string",
    "default": "—",
    "description": "Merged onto the outer flex row. Override `my-8` here when the surrounding rhythm calls for a different gap."
  }
]
```

## Accessibility

- Carries `role="separator"` so assistive tech announces the break in document flow. Also `aria-hidden` so the glyph itself doesn't get spoken — the role is the meaningful signal.
- Use prose semantics around the ornament (`<section>`, headings) for navigable structure; the ornament is a visual cue, not a heading replacement.
