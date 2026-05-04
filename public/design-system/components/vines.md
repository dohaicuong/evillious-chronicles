```scope
Vines
Button
```

# Vines

A curling vine that hugs the two edges meeting at the chosen corner — runs along one edge, curls around, trails along the other, and finishes with a small inward spiral at the tip. Heart-shaped leaves dot the stem. Wraps a child element; the SVG is `aria-hidden` and `pointer-events-none`, so the wrapped element keeps its own semantics and click area.

```tsx preview
<Vines>
  <Button variant="primary">Decorated button</Button>
</Vines>
```

## Anatomy

`Vines` is a `relative inline-block` span. The child renders as-is; an absolutely-positioned SVG is layered on top. The SVG is centered on the named corner and mirrored across the appropriate axes for the other three corners, so the same path data hugs each corner consistently.

```tsx
import { Vines } from "@src/components/thematic/vines";

<Vines corner="top-right">
  <Button>Click me</Button>
</Vines>;
```

## Examples

### Four corners

`corner` picks which corner the vine wraps. The vine always runs along the two edges meeting at that corner, with the inward spiral on the side away from the visible weight.

```tsx preview
<div className="grid grid-cols-2 gap-12 border border-border rounded-sm p-12">
  <div className="flex justify-center">
    <Vines corner="top-right">
      <Button variant="primary">Top right</Button>
    </Vines>
  </div>
  <div className="flex justify-center">
    <Vines corner="top-left">
      <Button variant="primary">Top left</Button>
    </Vines>
  </div>
  <div className="flex justify-center">
    <Vines corner="bottom-right">
      <Button variant="primary">Bottom right</Button>
    </Vines>
  </div>
  <div className="flex justify-center">
    <Vines corner="bottom-left">
      <Button variant="primary">Bottom left</Button>
    </Vines>
  </div>
</div>
```

### Around any element

The vine is decoupled from button styling — anything can be the child. The SVG is sized in `em`, so it scales with the surrounding font size.

```tsx preview
<div className="flex flex-wrap items-center gap-12 border border-border rounded-sm p-12">
  <Vines>
    <span className="text-style-display text-fg">Volume I</span>
  </Vines>
  <Vines corner="bottom-left">
    <span className="text-style-heading-2 text-accent">Daughter of Evil</span>
  </Vines>
</div>
```

## Props

### Vines

```json props
[
  {
    "prop": "children",
    "type": "ReactNode",
    "default": "—",
    "description": "The element the vine wraps. Rendered as-is; the SVG sits on top with `pointer-events-none`."
  },
  {
    "prop": "corner",
    "type": "\"top-left\" | \"top-right\" | \"bottom-left\" | \"bottom-right\"",
    "default": "\"top-right\"",
    "description": "Which corner the vine hugs. The vine runs along the two edges meeting at this corner."
  },
  {
    "prop": "className",
    "type": "string",
    "default": "—",
    "description": "Merged onto the outer span. Use for layout overrides on the wrapper."
  }
]
```

## Accessibility

- The vine SVG is `aria-hidden` and `pointer-events-none` — the wrapped child keeps its full semantic and interactive surface area.
- Don't put critical interactive elements _inside_ the visual vine area on either edge — the SVG is `pointer-events-none` so clicks pass through, but visually the vine can imply the element is decorative.
