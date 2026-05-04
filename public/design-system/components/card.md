```scope
Card
Button
BookOpenIcon
BookmarkSimpleIcon
```

# Card

The base surface for series, volumes, and chapters. Compound primitive: `Card` is the shell, with `Card.Header`, `Card.Title`, `Card.Description`, `Card.Body`, and `Card.Footer` slotting in for layout. Auto-themes inside `data-sin`.

```tsx preview
<Card className="max-w-md">
  <Card.Header>
    <Card.Title className="flex items-center gap-2">
      <BookOpenIcon weight="duotone" className="text-accent-strong" />
      Daughter of Evil
    </Card.Title>
    <Card.Description>Volume I — The Story of Evil</Card.Description>
  </Card.Header>
  <Card.Body>
    "The time is 14:00. Now, it is the time of the snack." A princess of vibrant yellow rules her
    kingdom with iron and ivory.
  </Card.Body>
  <Card.Footer>
    <Button variant="ghost" size="sm">
      Details
    </Button>
    <Button variant="primary" size="sm">
      Read
    </Button>
  </Card.Footer>
</Card>
```

## Anatomy

The shell handles the border, surface, and (optionally) interactive hover. Subcomponents are thin layout wrappers — they exist so the spacing rhythm (header `p-5 pb-3`, body `p-5 py-3`, footer `p-5 pt-3 border-t`) stays consistent without callers reaching for utility classes.

```tsx
import { Card } from "@src/components/primitives/card";

<Card>
  <Card.Header>
    <Card.Title>…</Card.Title>
    <Card.Description>…</Card.Description>
  </Card.Header>
  <Card.Body>…</Card.Body>
  <Card.Footer>…</Card.Footer>
</Card>;
```

## Examples

### Flat

The default. Static surface, no hover affordance.

```tsx preview
<Card className="max-w-md">
  <Card.Header>
    <Card.Title className="flex items-center gap-2">
      <BookOpenIcon weight="duotone" className="text-accent-strong" />
      Daughter of Evil
    </Card.Title>
    <Card.Description>Volume I — The Story of Evil</Card.Description>
  </Card.Header>
  <Card.Body>
    "The time is 14:00. Now, it is the time of the snack." A princess of vibrant yellow rules her
    kingdom with iron and ivory.
  </Card.Body>
  <Card.Footer>
    <Button variant="ghost" size="sm">
      Details
    </Button>
    <Button variant="primary" size="sm">
      Read
    </Button>
  </Card.Footer>
</Card>
```

### Interactive

Pass `variant="interactive"` for the hover treatment (accent border + soft accent tint). The cursor switches to pointer — wrap in a `Link` or `<button>` for activation.

```tsx preview
<Card variant="interactive" className="max-w-md">
  <Card.Header>
    <Card.Title className="flex items-center gap-2">
      <BookmarkSimpleIcon weight="duotone" className="text-accent-strong" />
      Continue Reading
    </Card.Title>
    <Card.Description>Chapter 4 — The Servant's Letter</Card.Description>
  </Card.Header>
  <Card.Body>Hover to see the accent border and soft tint take effect.</Card.Body>
</Card>
```

### Sin-themed wrapper — Pride

The wrapper sets `data-sin="pride"`, so hover, border, and accent text all shift to Pride yellow without touching the card itself.

```tsx preview
<div data-sin="pride">
  <Card variant="interactive" className="max-w-md">
    <Card.Header>
      <Card.Title className="flex items-center gap-2">
        <BookOpenIcon weight="duotone" className="text-accent-strong" />
        The Daughter of Evil
      </Card.Title>
      <Card.Description>Riliane Lucifen d'Autriche</Card.Description>
    </Card.Header>
    <Card.Body>
      Hover, border, and accent text all read from <code>--color-accent</code> at the
      <code> data-sin</code> wrapper.
    </Card.Body>
    <Card.Footer>
      <Button variant="secondary" size="sm">
        Library
      </Button>
      <Button variant="primary" size="sm">
        Open Volume
      </Button>
    </Card.Footer>
  </Card>
</div>
```

### Per-sin grid

```tsx preview
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
  {[
    ["pride", "The Story of Evil"],
    ["lust", "The Tailor of Enbizaka"],
    ["sloth", "The Muzzle of Nemesis"],
    ["gluttony", "Evil Food Eater Conchita"],
  ].map(([sin, subtitle]) => (
    <div key={sin} data-sin={sin}>
      <Card variant="interactive" className="h-full">
        <Card.Header>
          <Card.Title className="flex items-center gap-2 capitalize">
            <BookOpenIcon weight="duotone" className="text-accent-strong" />
            {sin}
          </Card.Title>
          <Card.Description>{subtitle}</Card.Description>
        </Card.Header>
        <Card.Body className="text-style-caption text-fg-muted">
          Hover to feel the {sin} accent.
        </Card.Body>
        <Card.Footer>
          <Button variant="primary" size="sm" className="w-full">
            Read
          </Button>
        </Card.Footer>
      </Card>
    </div>
  ))}
</div>
```

## Props

### Card

The shell. A flex column with border, surface, and (optionally) hover affordance.

```json props
[
  {
    "prop": "variant",
    "type": "\"flat\" | \"interactive\"",
    "default": "\"flat\"",
    "description": "Flat is the default static surface. Interactive adds cursor-pointer plus an accent border and accent-soft background on hover."
  },
  {
    "prop": "...rest",
    "type": "HTMLAttributes<HTMLDivElement>",
    "default": "—",
    "description": "All standard `<div>` attributes (className, onClick, etc.) pass through."
  }
]
```

### Card.Header

Top container. Spacing is `p-5 pb-3` so titles don't crowd the body. Renders a `<div>`.

```json props
[
  {
    "prop": "...rest",
    "type": "HTMLAttributes<HTMLDivElement>",
    "default": "—",
    "description": "All standard `<div>` attributes pass through."
  }
]
```

### Card.Title

The card heading. Renders an `<h3>` styled with `text-style-heading-3 text-fg`.

```json props
[
  {
    "prop": "...rest",
    "type": "HTMLAttributes<HTMLHeadingElement>",
    "default": "—",
    "description": "All standard `<h3>` attributes pass through."
  }
]
```

### Card.Description

Subtitle / caption beneath the title. Renders a `<p>` with `text-style-caption text-fg-muted`.

```json props
[
  {
    "prop": "...rest",
    "type": "HTMLAttributes<HTMLParagraphElement>",
    "default": "—",
    "description": "All standard `<p>` attributes pass through."
  }
]
```

### Card.Body

The flexible middle. Padding is `p-5 py-3`; `flex-1` so the footer pins to the bottom regardless of body length.

```json props
[
  {
    "prop": "...rest",
    "type": "HTMLAttributes<HTMLDivElement>",
    "default": "—",
    "description": "All standard `<div>` attributes pass through."
  }
]
```

### Card.Footer

Bottom container. Padding is `p-5 pt-3` with a top border (`border-t border-border`) and `flex items-center gap-3` so action rows lay out without extra wrappers.

```json props
[
  {
    "prop": "...rest",
    "type": "HTMLAttributes<HTMLDivElement>",
    "default": "—",
    "description": "All standard `<div>` attributes pass through."
  }
]
```

## Accessibility

- The shell is a plain `<div>` — when the card itself is the click target, render an interactive child (`<Link>` covering the surface, or wrap the card in a `<button>` reset) rather than relying on `onClick` on the div.
- `Card.Title` is an `<h3>`. If the card sits in a section that already owns a heading hierarchy, override the visual style via `className` and pass `render` from a different heading component instead of nesting two h3s.
- The interactive variant changes hover styling but doesn't set `role="button"` or focus styles on its own — make the actual activator focusable.
