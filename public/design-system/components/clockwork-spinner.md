```scope
ClockworkSpinner
```

# Clockwork Spinner

Slow gear rotation (4s) — markedly slower than Tailwind's default `animate-spin` to fit the pocket-watch motif. Wraps the rotating Phosphor `GearIcon` in a `role="status"` span with `aria-label="Loading"`, so screen readers announce it as a live indicator.

```tsx preview
<ClockworkSpinner size={32} />
```

## Anatomy

A single Phosphor `GearIcon` with `animate-[spin_4s_linear_infinite]`, wrapped in a `role="status"` span. Inherits colour from `text-accent` so it tints with the local sin cascade.

```tsx
import { ClockworkSpinner } from "@src/components/thematic/clockwork-spinner";

<ClockworkSpinner size={32} />;
```

## Examples

### Sizes

`size` is forwarded to the underlying icon. Pick the size to match the surrounding text or button height.

```tsx preview
<div className="flex flex-wrap items-center gap-8 border border-border rounded-sm p-6">
  <ClockworkSpinner size={20} />
  <ClockworkSpinner size={32} />
  <ClockworkSpinner size={48} />
</div>
```

### Sin-tinted

`text-accent` pulls the local `data-sin` colour. Drop into a wrath/lust/pride container and the gear retints accordingly.

```tsx preview
<div className="flex flex-wrap items-center gap-8 border border-border rounded-sm p-6">
  <div data-sin="pride">
    <ClockworkSpinner size={32} />
  </div>
  <div data-sin="wrath">
    <ClockworkSpinner size={32} />
  </div>
  <div data-sin="lust">
    <ClockworkSpinner size={32} />
  </div>
  <div data-sin="envy">
    <ClockworkSpinner size={32} />
  </div>
</div>
```

## Props

### ClockworkSpinner

```json props
[
  {
    "prop": "size",
    "type": "number",
    "default": "24",
    "description": "Pixel size forwarded to the inner Phosphor `GearIcon`."
  },
  {
    "prop": "className",
    "type": "string",
    "default": "—",
    "description": "Merged onto the outer span. Use to override colour (`text-fg-muted` etc.) when the accent isn't right."
  }
]
```

## Accessibility

- The wrapping span carries `role="status"` and `aria-label="Loading"` so screen readers announce the indicator. If the loading message lives in surrounding text, pass an explicit `aria-label` (or wrap a labelled region) so the announcement isn't duplicated.
- Use `ClockworkSpinner` for true loading semantics; `ClockworkOrnament` is the decorative cousin and is `aria-hidden`.
