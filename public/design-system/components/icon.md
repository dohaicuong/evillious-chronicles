```scope
BookOpenIcon
BookmarkSimpleIcon
GearIcon
HouseIcon
HourglassIcon
MagnifyingGlassIcon
MoonIcon
PauseIcon
PlayIcon
SunIcon
XIcon
```

# Icon

Phosphor Icons via [`@phosphor-icons/react`](https://github.com/phosphor-icons/react). The app sets `weight="light"` and `size=20` as global defaults via an `IconContext.Provider` in `__root.tsx`, so every imported icon picks up that look automatically. Override `size` or `weight` per icon when you need to.

```tsx preview
<BookOpenIcon />
```

## Anatomy

Import a named icon directly. Icons render an inline SVG that inherits `currentColor`, so wrap them in a parent with a `text-…` class to tint.

```tsx
import { BookOpenIcon } from "@phosphor-icons/react";

<BookOpenIcon />
<BookOpenIcon size={32} weight="duotone" className="text-accent-strong" />;
```

## Examples

### Common UI Icons

A representative slice of the icons used across the app — bookmarks, navigation, audio controls, settings.

```tsx preview
<div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
  {[
    { Icon: HouseIcon, name: "House" },
    { Icon: BookOpenIcon, name: "BookOpen" },
    { Icon: MagnifyingGlassIcon, name: "MagnifyingGlass" },
    { Icon: BookmarkSimpleIcon, name: "BookmarkSimple" },
    { Icon: GearIcon, name: "Gear" },
    { Icon: SunIcon, name: "Sun" },
    { Icon: MoonIcon, name: "Moon" },
    { Icon: PlayIcon, name: "Play" },
    { Icon: PauseIcon, name: "Pause" },
    { Icon: XIcon, name: "X" },
  ].map(({ Icon, name }) => (
    <div
      key={name}
      className="flex flex-col items-center gap-2 border border-border rounded-sm py-4 text-fg"
    >
      <Icon />
      <code className="text-style-caption text-fg-muted">{name}</code>
    </div>
  ))}
</div>
```

### Weights

Phosphor exposes six stroke / fill weights. The app default is `light`; use `fill` or `duotone` for emphasis (e.g. card titles, active states).

```tsx preview
<div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
  {["thin", "light", "regular", "bold", "fill", "duotone"].map((weight) => (
    <div
      key={weight}
      className="flex flex-col items-center gap-2 border border-border rounded-sm py-4 text-fg"
    >
      <BookmarkSimpleIcon size={32} weight={weight} />
      <code className="text-style-caption text-fg-muted">{weight}</code>
    </div>
  ))}
</div>
```

### Sizes

`size` accepts any number (treated as pixels) or a CSS length string. The default is 20 px set on the provider.

```tsx preview
<div className="flex flex-wrap items-end gap-6 border border-border rounded-sm p-6 text-fg">
  {[
    { px: 16, label: "16" },
    { px: 20, label: "20 (default)" },
    { px: 24, label: "24" },
    { px: 32, label: "32" },
    { px: 48, label: "48" },
  ].map(({ px, label }) => (
    <div key={px} className="flex flex-col items-center gap-2">
      <HourglassIcon size={px} />
      <code className="text-style-caption text-fg-muted">{label}</code>
    </div>
  ))}
</div>
```

### Per-sin tinting

Icons inherit `currentColor`, so any text class retints them. Drop a `data-sin` ancestor and add `text-accent` — the icon flips to the sin's accent without a per-icon prop.

```tsx preview
<div className="grid grid-cols-3 gap-3 sm:grid-cols-7">
  {["pride", "lust", "sloth", "gluttony", "greed", "wrath", "envy"].map((sin) => (
    <div
      key={sin}
      data-sin={sin}
      className="flex flex-col items-center gap-2 border border-border rounded-sm py-4 text-accent"
    >
      <BookmarkSimpleIcon size={28} weight="fill" />
      <code className="text-style-caption text-fg-muted capitalize">{sin}</code>
    </div>
  ))}
</div>
```

## Props

### Icon

Each Phosphor icon is its own component (e.g. `BookOpenIcon`, `MagnifyingGlassIcon`). They share the same prop surface, summarised below. See the [Phosphor docs](https://phosphoricons.com/) for the full prop list and the icon catalogue.

```json props
[
  {
    "prop": "size",
    "type": "number | string",
    "default": "20",
    "description": "Pixel size or CSS length. Default comes from the app-level `IconContext.Provider` in `__root.tsx`."
  },
  {
    "prop": "weight",
    "type": "\"thin\" | \"light\" | \"regular\" | \"bold\" | \"fill\" | \"duotone\"",
    "default": "\"light\"",
    "description": "Stroke / fill style. Default comes from the same provider; pass duotone or fill for emphasis."
  },
  {
    "prop": "color",
    "type": "string",
    "default": "currentColor",
    "description": "SVG fill / stroke color. Inherits currentColor by default — prefer Tailwind text classes (`text-accent`, `text-fg-muted`) over this prop."
  },
  {
    "prop": "mirrored",
    "type": "boolean",
    "default": "false",
    "description": "Flips the icon horizontally. Useful for direction-sensitive icons in RTL contexts."
  },
  {
    "prop": "...rest",
    "type": "SVGAttributes<SVGSVGElement>",
    "default": "—",
    "description": "Standard SVG attributes (className, style, role, aria-*) pass through to the rendered `<svg>`."
  }
]
```

## Accessibility

- Icons render inline SVG. Decorative icons should set `aria-hidden` (Phosphor does this when no `alt` / label is provided).
- For meaningful icons used without adjacent text, use `IconButton` (which requires `aria-label`) rather than a bare icon.
- The shared `IconContext.Provider` in `__root.tsx` keeps weight + size consistent across the app — change the defaults there rather than per-call when you want a global shift.
