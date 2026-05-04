```scope
Badge
BookmarkSimpleIcon
HourglassIcon
NoteIcon
```

# Badge

Pill-shaped label for sin tags, status, and metadata. Three variants for emphasis, two sizes for density, and an optional leading icon.

```tsx preview
<Badge variant="soft">Volume I</Badge>
```

## Anatomy

Renders a single `<span>` with optional icon slot. Auto-themes inside `data-sin` wrappers via the same `color-mix()` accent tokens used by the rest of the system.

```tsx
import { Badge } from "@src/components/primitives/badge";

<Badge variant="soft">Volume I</Badge>;
```

## Examples

### Variants

```tsx preview
<Badge variant="solid">Volume I</Badge>
<Badge variant="soft">Volume I</Badge>
<Badge variant="outline">Draft</Badge>
```

### Sizes

```tsx preview
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="sm" variant="solid">Small Solid</Badge>
<Badge size="md" variant="outline">Medium Outline</Badge>
```

### With icon

The `icon` prop slots a leading icon. The icon container scales with the badge size (12 px at sm, 16 px at md), so the same Phosphor icon renders correctly at both sizes.

```tsx preview
<Badge size="sm" icon={<HourglassIcon weight="light" />}>Reading</Badge>
<Badge icon={<BookmarkSimpleIcon weight="light" />}>Bookmarked</Badge>
<Badge variant="solid" icon={<NoteIcon weight="light" />}>New</Badge>
<Badge variant="outline" icon={<HourglassIcon weight="light" />}>In Progress</Badge>
```

### Per-sin themes

Drop a `data-sin` wrapper at any ancestor and the accent shifts. Only `solid` and `soft` retint — `outline` reads `border-border` / `text-fg-muted` and stays neutral on purpose.

```tsx preview
<div className="flex flex-col gap-3">
  {["pride", "lust", "sloth", "gluttony", "greed", "wrath", "envy", "origin"].map((sin) => (
    <div
      key={sin}
      data-sin={sin}
      className="grid grid-cols-[100px_1fr] items-center gap-4 border-t border-border py-3"
    >
      <code className="text-style-caption text-fg-muted capitalize">{sin}</code>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="solid" className="capitalize">
          {sin}
        </Badge>
        <Badge variant="soft" className="capitalize">
          {sin}
        </Badge>
        <Badge variant="outline" className="capitalize">
          {sin}
        </Badge>
      </div>
    </div>
  ))}
</div>
```

## Props

### Badge

Renders a `<span>`. Pure presentation — no role, no interaction.

```json props
[
  {
    "prop": "variant",
    "type": "\"solid\" | \"soft\" | \"outline\"",
    "default": "\"soft\"",
    "description": "Visual emphasis. Solid fills with accent; soft uses the accent-soft tint; outline is a neutral chip with border-border."
  },
  {
    "prop": "size",
    "type": "\"sm\" | \"md\"",
    "default": "\"md\"",
    "description": "Height and horizontal padding. Also drives the inner icon container size (12 / 16 px)."
  },
  {
    "prop": "icon",
    "type": "ReactNode",
    "default": "—",
    "description": "Optional leading icon. Wrapped in a sized icon container so any Phosphor icon scales to match the badge."
  },
  {
    "prop": "...rest",
    "type": "HTMLAttributes<HTMLSpanElement>",
    "default": "—",
    "description": "All standard `<span>` attributes (className, title, etc.) pass through."
  }
]
```

## Accessibility

- Badge is a static label, not a status announcement. If the label represents a state that updates dynamically (e.g. "Live"), wrap it in a container with `role="status"` or `aria-live` rather than relying on the badge itself.
- The `outline` variant is the only variant that reads as a neutral chip; `solid` / `soft` always carry the local accent. Choose accordingly when meaning matters more than emphasis.
