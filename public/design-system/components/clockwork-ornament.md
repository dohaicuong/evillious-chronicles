```scope
ClockworkOrnament
```

# Clockwork Ornament

Decorative cluster of meshing gears for hero areas — a six-tooth gear (slow forward) plus a smaller four-tooth gear (faster, reversed) that visually meshes with it. `count={3}` adds a third gear; `chain` extends the train rightward with progressively smaller gears, alternating spin direction. Purely ornamental (`aria-hidden`); for loading semantics use `ClockworkSpinner`.

```tsx preview
<ClockworkOrnament size={80} />
```

## Anatomy

The big gear sits at the origin and rotates forward; the medium gear meshes at ~45° down-right and rotates reverse. Optional small gear (`count={3}`) meshes at -15°. Each step in `chain` clones the medium gear's behaviour: 70% smaller, meshing with the previous neighbour, alternating direction. Mesh distances are tuned with a 0.88 factor so the visible gear teeth visually touch despite Phosphor's icon padding.

```tsx
import { ClockworkOrnament } from "@src/components/thematic/clockwork-ornament";

<ClockworkOrnament size={80} count={2} chain={0} speed={1} />;
```

## Examples

### Sizes

`size` controls the big gear; the medium and small gears are derived as 55% and 40% of that.

```tsx preview
<div className="flex flex-wrap items-end gap-12 border border-border rounded-sm p-8">
  <ClockworkOrnament size={48} />
  <ClockworkOrnament size={80} />
  <ClockworkOrnament size={120} />
</div>
```

### Three-gear cluster

`count={3}` adds the small gear at the upper-right of the big gear. Useful when the layout has more breathing room and you want a richer mechanical impression.

```tsx preview
<div className="flex flex-wrap items-end gap-12 border border-border rounded-sm p-8">
  <ClockworkOrnament size={80} count={2} />
  <ClockworkOrnament size={80} count={3} />
</div>
```

### Chained gear train

`chain` extends the medium gear rightward with progressively smaller gears (each 70% of the previous). Each link alternates direction so the train reads as a real geared mechanism. The chain intentionally overflows the bounding box on the right — anchor the ornament with `right-full` next to a heading and the trail runs into the text.

```tsx preview
<div className="flex flex-wrap items-end gap-12 border border-border rounded-sm p-8">
  <ClockworkOrnament size={80} chain={2} />
  <ClockworkOrnament size={80} chain={4} />
</div>
```

### Speed

`speed` is a multiplier on every gear's spin duration. `<1` speeds the cluster up; `>1` slows it down.

```tsx preview
<div className="flex flex-wrap items-end gap-12 border border-border rounded-sm p-8">
  <ClockworkOrnament size={80} speed={0.5} />
  <ClockworkOrnament size={80} speed={1} />
  <ClockworkOrnament size={80} speed={2} />
</div>
```

### Sin-tinted

The big gear renders in `text-accent`; smaller gears step up to `text-accent-strong` for contrast. Both pick up the local `data-sin` accent.

```tsx preview
<div className="flex flex-wrap items-end gap-12 border border-border rounded-sm p-8">
  <div data-sin="pride">
    <ClockworkOrnament size={80} />
  </div>
  <div data-sin="greed">
    <ClockworkOrnament size={80} />
  </div>
  <div data-sin="envy">
    <ClockworkOrnament size={80} />
  </div>
</div>
```

## Props

### ClockworkOrnament

```json props
[
  {
    "prop": "size",
    "type": "number",
    "default": "80",
    "description": "Pixel size of the big gear. Medium and small gears are derived from this (~55% and ~40%)."
  },
  {
    "prop": "count",
    "type": "2 | 3",
    "default": "2",
    "description": "Whether to render the optional small gear above the big gear."
  },
  {
    "prop": "chain",
    "type": "number",
    "default": "0",
    "description": "Number of extra gears chained right of the medium gear. Each is 70% of its predecessor."
  },
  {
    "prop": "speed",
    "type": "number",
    "default": "1",
    "description": "Multiplier on gear spin durations. <1 = faster, >1 = slower."
  },
  {
    "prop": "className",
    "type": "string",
    "default": "—",
    "description": "Merged onto the outer span. Use to override positioning (`absolute right-full` etc.)."
  }
]
```

## Accessibility

- Marked `aria-hidden` — the ornament carries no semantic load. If you need a loading indicator, use `ClockworkSpinner` instead, which announces via `role="status"`.
- The animation runs continuously; respect users with `prefers-reduced-motion` upstream by gating the surrounding decoration rather than disabling the gears individually.
