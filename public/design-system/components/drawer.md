```scope
Drawer
Button
```

# Drawer

A side panel for settings and ancillary controls. Slides in from the right or left, dims the page with a backdrop, traps focus. Built on Base UI's `Dialog` primitive with side-aware styling. Compound: `Drawer` is the root, with `Drawer.Trigger`, `Drawer.Portal`, `Drawer.Backdrop`, `Drawer.Popup`, `Drawer.Title`, `Drawer.Description`, and `Drawer.Close`.

```tsx preview
<Drawer>
  <Drawer.Trigger render={<Button variant="primary">Open Settings</Button>} />
  <Drawer.Portal>
    <Drawer.Backdrop />
    <Drawer.Popup side="right">
      <Drawer.Title>Settings</Drawer.Title>
      <Drawer.Description>Reader preferences</Drawer.Description>
      <p className="text-style-body mt-2 text-fg">
        Adjust the lantern light, the parchment grain, the cadence of the page-turn.
      </p>
      <div className="mt-auto flex justify-end gap-2">
        <Drawer.Close render={<Button variant="ghost">Cancel</Button>} />
        <Drawer.Close render={<Button variant="primary">Save</Button>} />
      </div>
    </Drawer.Popup>
  </Drawer.Portal>
</Drawer>
```

## Anatomy

The trigger uses Base UI's `render` prop to project drawer semantics onto any focusable control. The popup must live inside `Drawer.Portal` so it escapes ancestor `overflow`; pass `side="left"` or `side="right"` to anchor the panel.

```tsx
import { Drawer } from "@src/components/primitives/drawer";
import { Button } from "@src/components/primitives/button";

<Drawer>
  <Drawer.Trigger render={<Button>Open</Button>} />
  <Drawer.Portal>
    <Drawer.Backdrop />
    <Drawer.Popup side="right">
      <Drawer.Title>…</Drawer.Title>
      <Drawer.Description>…</Drawer.Description>
      <div className="mt-auto flex justify-end gap-2">
        <Drawer.Close render={<Button variant="ghost">Cancel</Button>} />
        <Drawer.Close render={<Button variant="primary">Save</Button>} />
      </div>
    </Drawer.Popup>
  </Drawer.Portal>
</Drawer>;
```

## Examples

### Right side

The default. Slides in from the right; the backdrop fades behind it. Footer actions push to the bottom via `mt-auto`.

```tsx preview
<Drawer>
  <Drawer.Trigger render={<Button variant="primary">Open Settings</Button>} />
  <Drawer.Portal>
    <Drawer.Backdrop />
    <Drawer.Popup side="right">
      <Drawer.Title>Settings</Drawer.Title>
      <Drawer.Description>Reader preferences</Drawer.Description>
      <div className="text-style-body mt-2 flex flex-col gap-3 text-fg">
        <p>
          Adjust the lantern light, the parchment grain, the cadence of the page-turn. Your choices
          persist between visits.
        </p>
        <p className="text-fg-muted">Nothing here is saved yet — this is a demo.</p>
      </div>
      <div className="mt-auto flex justify-end gap-2">
        <Drawer.Close render={<Button variant="ghost">Cancel</Button>} />
        <Drawer.Close render={<Button variant="primary">Save</Button>} />
      </div>
    </Drawer.Popup>
  </Drawer.Portal>
</Drawer>
```

### Left side

`side="left"` slides the panel in from the opposite edge. Useful for navigational surfaces (table of contents, library index) where the muscle memory is "back / index lives on the left."

```tsx preview
<Drawer>
  <Drawer.Trigger render={<Button variant="secondary">Open Index</Button>} />
  <Drawer.Portal>
    <Drawer.Backdrop />
    <Drawer.Popup side="left">
      <Drawer.Title>Table of Contents</Drawer.Title>
      <Drawer.Description>Navigate the volume</Drawer.Description>
      <ul className="text-style-body mt-2 flex flex-col gap-2 text-fg">
        <li>I. The Yellow Country</li>
        <li>II. The Servant of Evil</li>
        <li>III. The Daughter of Evil</li>
        <li>IV. Regret Message</li>
      </ul>
      <Drawer.Close />
    </Drawer.Popup>
  </Drawer.Portal>
</Drawer>
```

### Sin theme — Pride

The popup portals to the document root, escaping the outer `data-sin` cascade. Wrap the popup contents in an inner `data-sin` div with `className="contents"` so the accent flows through without breaking the flex layout.

```tsx preview
<div data-sin="pride">
  <Drawer>
    <Drawer.Trigger render={<Button variant="primary">Riliane's Chambers</Button>} />
    <Drawer.Portal>
      <Drawer.Backdrop />
      <Drawer.Popup side="right">
        <div data-sin="pride" className="contents">
          <Drawer.Title>The Daughter of Evil</Drawer.Title>
          <Drawer.Description>Volume I — yellow blooms in the courtyard</Drawer.Description>
          <p className="text-style-body mt-2 text-fg">
            Oho ho ho ho. Bow down to me, peasants. The accent here pulls Pride yellow from the sin
            cascade.
          </p>
          <div className="mt-auto flex justify-end gap-2">
            <Drawer.Close render={<Button variant="outline">Dismiss</Button>} />
            <Drawer.Close render={<Button variant="primary">Decree</Button>} />
          </div>
        </div>
      </Drawer.Popup>
    </Drawer.Portal>
  </Drawer>
</div>
```

## Props

### Drawer

Root provider. Manages open state, focus, and scroll lock.

```json props
[
  {
    "prop": "...rest",
    "type": "Base UI Dialog.Root props",
    "default": "—",
    "description": "Forwards directly to Base UI's `Dialog.Root`. Supports `open` / `defaultOpen`, `onOpenChange`, `modal`, `dismissible`, etc."
  }
]
```

### Drawer.Trigger

The control that opens the drawer. Use `render` to project drawer semantics onto a `Button` / `IconButton` / custom element.

```json props
[
  {
    "prop": "render",
    "type": "ReactElement",
    "default": "—",
    "description": "Element to render as the trigger. Drawer state and ARIA attributes are merged onto it."
  },
  {
    "prop": "...rest",
    "type": "Base UI Dialog.Trigger props",
    "default": "—",
    "description": "Standard button props pass through."
  }
]
```

### Drawer.Portal

Renders children into a portal at the document root so the popup escapes any clipping ancestor.

```json props
[
  {
    "prop": "container",
    "type": "HTMLElement | null",
    "default": "document.body",
    "description": "Override portal target. Rarely needed."
  }
]
```

### Drawer.Backdrop

The dimmer behind the popup. Fades in via `data-starting-style` / `data-ending-style`. Click-to-dismiss is handled by Base UI when the drawer is `dismissible`.

```json props
[
  {
    "prop": "...rest",
    "type": "Base UI Dialog.Backdrop props",
    "default": "—",
    "description": "Standard div props pass through."
  }
]
```

### Drawer.Popup

The panel surface — full-height, capped at `w-96` / `max-w-[90vw]`. Slides in from the side you choose; the slide direction follows `side`.

```json props
[
  {
    "prop": "side",
    "type": "\"left\" | \"right\"",
    "default": "\"right\"",
    "description": "Which edge the panel anchors to. Drives both layout and the slide direction."
  },
  {
    "prop": "...rest",
    "type": "Base UI Dialog.Popup props",
    "default": "—",
    "description": "Standard div props pass through to the popup root."
  }
]
```

```json data-attributes
[
  {
    "attribute": "data-starting-style",
    "description": "Set on entry; drives the slide-in from the off-screen side."
  },
  { "attribute": "data-ending-style", "description": "Set on exit; reverses the slide." }
]
```

### Drawer.Title

The drawer heading. Wired via `aria-labelledby` automatically.

```json props
[
  {
    "prop": "...rest",
    "type": "Base UI Dialog.Title props",
    "default": "—",
    "description": "Standard h2 props pass through."
  }
]
```

### Drawer.Description

Supporting copy directly under the title. Wired via `aria-describedby` automatically.

```json props
[
  {
    "prop": "...rest",
    "type": "Base UI Dialog.Description props",
    "default": "—",
    "description": "Standard p props pass through."
  }
]
```

### Drawer.Close

Closes the drawer when activated. With no `render`, renders a default text button labelled _Close_. Pass `render={<Button …>}` for the standard footer pair.

```json props
[
  {
    "prop": "render",
    "type": "ReactElement",
    "default": "—",
    "description": "Element to render as the close affordance. Click handlers are merged."
  },
  {
    "prop": "children",
    "type": "ReactNode",
    "default": "\"Close\"",
    "description": "Label for the bare close button when `render` isn't provided."
  },
  {
    "prop": "...rest",
    "type": "Base UI Dialog.Close props",
    "default": "—",
    "description": "Standard button props pass through."
  }
]
```

## Accessibility

- `Drawer.Title` and `Drawer.Description` are wired via `aria-labelledby` and `aria-describedby` on the popup automatically. Always include both.
- Focus moves into the panel on open and returns to the trigger on close. The first focusable child receives initial focus.
- Set `data-sin` _inside_ the popup (not on the trigger) so the accent applies to the panel content; the popup portals out of the trigger's cascade.

### Keyboard

```json keyboard
[
  { "keys": ["Enter", "Space"], "description": "Activates the trigger to open the drawer." },
  { "keys": ["Escape"], "description": "Closes the drawer and returns focus to the trigger." },
  {
    "keys": ["Tab"],
    "description": "Cycles focus within the panel; cannot escape the drawer while open."
  }
]
```
