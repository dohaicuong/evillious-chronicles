```scope
Skeleton
```

# Skeleton

Loading placeholders with a gentle shimmer. Three convenience shapes — `rect`, `text`, `circle` — that cover almost every layout-preserving wait state in the app.

```tsx preview
<div className="w-full max-w-md">
  <Skeleton variant="rect" className="h-32 w-full" />
</div>
```

## Anatomy

A single `<div>` (or a stack of `<div>`s for multi-line text). The shimmer is a 200 %-wide horizontal gradient swept by the `skeleton-shimmer` keyframe on a 1.6 s loop.

```tsx
import { Skeleton } from "@src/components/primitives/skeleton";

<Skeleton variant="rect" className="h-32 w-full" />
<Skeleton variant="text" lines={3} />
<Skeleton variant="circle" className="h-12 w-12" />;
```

## Examples

### Rect

The default. Use for cards, image placeholders, or any rectangular block. Pass any `h-…` and `w-…` utilities via `className`.

```tsx preview
<div className="w-full max-w-md">
  <Skeleton variant="rect" className="h-32 w-full" />
</div>
```

### Text — single line

```tsx preview
<div className="w-full max-w-md">
  <Skeleton variant="text" />
</div>
```

### Text — paragraph

`lines` stacks N skeletons with `gap-2`. The last line shrinks to `w-3/4` so it reads like real prose rather than a justified slab.

```tsx preview
<div className="w-full max-w-md">
  <Skeleton variant="text" lines={3} />
</div>
```

### Circle

Use for avatars and round badges. Pass an explicit `h-…` / `w-…` (the variant only sets `aspect-square` and `rounded-full`).

```tsx preview
<div className="flex items-center gap-4">
  <Skeleton variant="circle" className="h-8 w-8" />
  <Skeleton variant="circle" className="h-12 w-12" />
  <Skeleton variant="circle" className="h-16 w-16" />
</div>
```

### Card placeholder

Compose the variants to suggest the final layout while content loads.

```tsx preview
<div className="max-w-sm rounded-sm border border-border p-5">
  <div className="flex flex-col gap-4">
    <div className="flex items-center gap-3">
      <Skeleton variant="circle" className="h-12 w-12" />
      <Skeleton variant="text" className="h-5 flex-1" />
    </div>
    <Skeleton variant="text" lines={2} />
    <Skeleton variant="rect" className="h-10 w-32" />
  </div>
</div>
```

## Props

### Skeleton

A presentational placeholder. Renders `role="status"` with `aria-busy` so screen readers announce a loading state.

```json props
[
  {
    "prop": "variant",
    "type": "\"rect\" | \"text\" | \"circle\"",
    "default": "\"rect\"",
    "description": "Shape preset. `rect` and `text` render a `w-full h-4 rounded-sm` block by default; `circle` adds `aspect-square` + `rounded-full` and expects an explicit size via className."
  },
  {
    "prop": "lines",
    "type": "number",
    "default": "1",
    "description": "Only honoured when `variant=\"text\"`. With >1 lines, the wrapper renders a `flex-col gap-2` stack and shrinks the last line to `w-3/4`."
  },
  {
    "prop": "className",
    "type": "string",
    "default": "—",
    "description": "Merged after the variant classes. Use for explicit `h-…` / `w-…` sizing."
  },
  {
    "prop": "role",
    "type": "string",
    "default": "\"status\"",
    "description": "Override only if you have a different ARIA structure that already conveys loading state at a higher level."
  },
  {
    "prop": "aria-busy",
    "type": "boolean",
    "default": "true",
    "description": "Default true so AT users hear the busy state. Set false if a parent already advertises it."
  },
  {
    "prop": "aria-live",
    "type": "\"polite\" | \"assertive\" | \"off\"",
    "default": "\"polite\"",
    "description": "Polite by default — assistive tech announces the load without interrupting."
  },
  {
    "prop": "...rest",
    "type": "HTMLAttributes<HTMLDivElement>",
    "default": "—",
    "description": "Standard div props pass through."
  }
]
```
