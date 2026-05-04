```scope
Switch
```

# Switch

Pill toggle for boolean settings. Auto-themes inside `data-sin` wrappers — the checked surface picks up the active accent. Wraps Base UI's headless Switch.

```tsx preview
<label className="flex items-center gap-3">
  <Switch defaultChecked aria-label="Dark mode" />
  <span className="text-style-body text-fg">Dark mode</span>
</label>
```

## Anatomy

The wrapper renders Base UI's `Switch.Root` + `Switch.Thumb` as a single component. Pair with a `<label>` (or `aria-label`) — there's no visible text built in.

```tsx
import { Switch } from "@src/components/primitives/switch";

<label className="flex items-center gap-3">
  <Switch defaultChecked aria-label="Notifications" />
  <span className="text-style-body text-fg">Notifications</span>
</label>;
```

## Examples

### On / Off

`defaultChecked` picks the initial state for uncontrolled use. The thumb slides on a 21 px translation; the track flips from `bg-surface` (off) to `bg-accent` (on).

```tsx preview
<div className="flex flex-col gap-3">
  <label className="flex items-center gap-3">
    <Switch defaultChecked={false} aria-label="Off" />
    <span className="text-style-body text-fg">Off</span>
  </label>
  <label className="flex items-center gap-3">
    <Switch defaultChecked aria-label="On" />
    <span className="text-style-body text-fg">On</span>
  </label>
</div>
```

### Disabled

`disabled` dims the switch and blocks pointer + keyboard activation. Both states (on / off) honour disabled styling.

```tsx preview
<div className="flex flex-col gap-3">
  <label className="flex items-center gap-3">
    <Switch disabled aria-label="Locked off" />
    <span className="text-style-body text-fg">Locked off</span>
  </label>
  <label className="flex items-center gap-3">
    <Switch disabled defaultChecked aria-label="Locked on" />
    <span className="text-style-body text-fg">Locked on</span>
  </label>
</div>
```

### Per-sin themes

A `data-sin` ancestor retints the checked track without touching the switch.

```tsx preview
<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
  {["pride", "lust", "sloth", "gluttony", "greed", "wrath", "envy", "origin"].map((sin) => (
    <div key={sin} data-sin={sin} className="flex items-center gap-3">
      <Switch defaultChecked aria-label={sin} />
      <span className="text-style-body text-fg capitalize">{sin}</span>
    </div>
  ))}
</div>
```

## Props

### Switch

Wraps Base UI's `Switch.Root` and renders an internal `Switch.Thumb`. Forwards all root props.

```json props
[
  {
    "prop": "checked",
    "type": "boolean",
    "default": "—",
    "description": "Controlled checked state. Pair with `onCheckedChange`."
  },
  {
    "prop": "defaultChecked",
    "type": "boolean",
    "default": "false",
    "description": "Initial state in uncontrolled mode."
  },
  {
    "prop": "onCheckedChange",
    "type": "(checked: boolean) => void",
    "default": "—",
    "description": "Fires when the user toggles the switch."
  },
  {
    "prop": "disabled",
    "type": "boolean",
    "default": "false",
    "description": "Drops opacity to 50 %, blocks pointer + keyboard activation, and switches the cursor to not-allowed."
  },
  {
    "prop": "aria-label",
    "type": "string",
    "default": "—",
    "description": "Accessible name when the switch isn't wrapped in a `<label>`. Always provide one or the other."
  },
  {
    "prop": "...rest",
    "type": "Base UI Switch.Root props",
    "default": "—",
    "description": "Includes `name`, `value`, `required`, `inputRef`, etc. for form integration."
  }
]
```

```json data-attributes
[
  {
    "attribute": "data-checked",
    "description": "Present when the switch is on. Drives the accent track and the thumb's translate offset."
  },
  { "attribute": "data-disabled", "description": "Mirrored when `disabled` is set." }
]
```

## Accessibility

- Renders a real `<button role="switch">` (Base UI). Browsers expose checked / disabled state to assistive tech automatically.
- Wrap in a `<label>` or pass `aria-label` — there's no built-in visible text.
- The focus ring is `outline-accent` pinned in the base layer so it doesn't animate from `currentColor` on dark-text sin themes.

### Keyboard

```json keyboard
[
  { "keys": ["Space", "Enter"], "description": "Toggles the switch." },
  { "keys": ["Tab"], "description": "Moves focus into and out of the switch in document order." }
]
```
