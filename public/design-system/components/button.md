# Button

The reader's primary call-to-action surface. Four variants for emphasis hierarchy, three sizes for density, and a sin-aware accent so the same component reads correctly inside any `data-sin` scope.

```tsx preview
<Button variant="primary" size="md">
  Continue Reading
</Button>
```

## Anatomy

Import the component and pass its props. `render` is the escape hatch for projecting the styling onto a different element (typically a router `<Link>`).

```tsx
import { Button } from "@src/components/primitives/button";

<Button render={<Link />}>Continue Reading</Button>;
```

## Examples

### Variants

```tsx preview
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
```

### Sizes

```tsx preview
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### Disabled

```tsx preview
<Button disabled>Primary</Button>
<Button variant="secondary" disabled>Secondary</Button>
<Button variant="outline" disabled>Outline</Button>
<Button variant="ghost" disabled>Ghost</Button>
```

### Render as link

Project the button styling onto a router `<Link>`. Keyboard activation (Enter / Space) is preserved across the element swap.

```tsx preview
<Button render={<Link to="/components" />}>Back to components</Button>
```

### Per-sin themes

Drop a `data-sin` wrapper at any ancestor and the accent shifts via `color-mix()` tokens. The button stylesheet doesn't change.

```tsx preview
<div className="grid grid-cols-2 gap-3 sm:grid-cols-4 w-full">
  {["pride", "lust", "sloth", "gluttony", "greed", "wrath", "envy", "origin"].map((sin) => (
    <div key={sin} data-sin={sin} className="flex flex-col items-center gap-2">
      <Button variant="primary" className="w-full capitalize">
        {sin}
      </Button>
      <Button variant="secondary" className="w-full capitalize">
        {sin}
      </Button>
      <Button variant="outline" className="w-full capitalize">
        {sin}
      </Button>
    </div>
  ))}
</div>
```

## Props

### Button

Renders a `<button>` element. Wraps Base UI's headless `Button` and applies the design system's variant, size, and focus tokens.

```json props
[
  {
    "prop": "variant",
    "type": "\"primary\" | \"secondary\" | \"outline\" | \"ghost\"",
    "default": "\"primary\"",
    "description": "Visual emphasis. Primary fills with accent; secondary/outline use accent border; ghost is unstyled until hover."
  },
  {
    "prop": "size",
    "type": "\"sm\" | \"md\" | \"lg\"",
    "default": "\"md\"",
    "description": "Height and horizontal padding. Affects font size; rounded-sm corner radius is constant."
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
    "description": "All standard <button> attributes (onClick, type, form, name, etc.) pass through to the rendered element."
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

- Renders a native `<button>` by default, so role, focus, and disabled state are handled by the browser.
- When `render` swaps the element to an anchor or Link, native `disabled` has no effect — set `aria-disabled` manually if you need the disabled affordance there.
- Focus ring is `outline-accent` pinned at the base layer so it doesn't animate from `currentColor` on dark-text sin themes (lust, sloth, gluttony, greed, envy).

### Keyboard

```json keyboard
[
  { "keys": ["Enter"], "description": "Activates the button." },
  {
    "keys": ["Space"],
    "description": "Activates the button. Patched in for non-native renders (anchors) where browsers don't fire activation on Space by default."
  },
  { "keys": ["Tab"], "description": "Moves focus into and out of the button in document order." }
]
```
