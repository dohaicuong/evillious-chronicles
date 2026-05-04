```scope
Dialog
Button
```

# Dialog

Centered modal built on Base UI. Backdrop dims and blurs the page; the popup floats with a subtle scale-in. Compound primitive: `Dialog` is the root, with `Dialog.Trigger`, `Dialog.Portal`, `Dialog.Backdrop`, `Dialog.Popup`, `Dialog.Title`, `Dialog.Description`, and `Dialog.Close`. Theming flows in through `data-sin` wrappers placed inside the popup.

```tsx preview
<Dialog>
  <Dialog.Trigger render={<Button variant="secondary">Open dialog</Button>} />
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Title>Leave the chapter?</Dialog.Title>
      <Dialog.Description>
        Your bookmark will be saved to the current page. You can return to this passage any time
        from the library.
      </Dialog.Description>
      <div className="mt-7 flex justify-end gap-2">
        <Dialog.Close render={<Button variant="ghost">Cancel</Button>} />
        <Dialog.Close render={<Button variant="primary">Leave</Button>} />
      </div>
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog>
```

## Anatomy

The trigger uses Base UI's `render` prop to project dialog semantics onto any focusable control. The popup must live inside `Dialog.Portal` so it escapes ancestor `overflow` and stacks above the rest of the page; `Dialog.Backdrop` is the dimmer.

```tsx
import { Dialog } from "@src/components/primitives/dialog";
import { Button } from "@src/components/primitives/button";

<Dialog>
  <Dialog.Trigger render={<Button>Open</Button>} />
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Title>…</Dialog.Title>
      <Dialog.Description>…</Dialog.Description>
      <div className="mt-7 flex justify-end gap-2">
        <Dialog.Close render={<Button variant="ghost">Cancel</Button>} />
        <Dialog.Close render={<Button variant="primary">Confirm</Button>} />
      </div>
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog>;
```

## Examples

### Confirm

The standard surface — a question, supporting copy, and a Cancel / confirm pair. `Dialog.Close` wraps each footer button so clicking either dismisses the dialog automatically.

```tsx preview
<Dialog>
  <Dialog.Trigger render={<Button variant="secondary">Open dialog</Button>} />
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Title>Leave the chapter?</Dialog.Title>
      <Dialog.Description>
        Your bookmark will be saved to the current page. You can return to this passage any time
        from the library.
      </Dialog.Description>
      <div className="mt-7 flex justify-end gap-2">
        <Dialog.Close render={<Button variant="ghost">Cancel</Button>} />
        <Dialog.Close render={<Button variant="primary">Leave</Button>} />
      </div>
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog>
```

### Destructive — Wrath

The popup portals to the document root, escaping the outer `data-sin` cascade. Wrap the popup contents in `data-sin="wrath"` to retint the accent crimson for dangerous actions.

```tsx preview
<Dialog>
  <Dialog.Trigger render={<Button variant="secondary">Delete note</Button>} />
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <div data-sin="wrath" className="flex flex-col">
        <Dialog.Title>Delete this note?</Dialog.Title>
        <Dialog.Description>
          This will permanently remove the annotation from your copy of the manuscript. This action
          cannot be undone.
        </Dialog.Description>
        <div className="mt-7 flex justify-end gap-2">
          <Dialog.Close render={<Button variant="ghost">Cancel</Button>} />
          <Dialog.Close render={<Button variant="primary">Delete</Button>} />
        </div>
      </div>
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog>
```

## Props

### Dialog

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

### Dialog.Trigger

The control that opens the dialog. Use `render` to project dialog semantics onto a `Button` / `IconButton` / custom element.

```json props
[
  {
    "prop": "render",
    "type": "ReactElement",
    "default": "—",
    "description": "Element to render as the trigger. Dialog state and ARIA attributes are merged onto it."
  },
  {
    "prop": "...rest",
    "type": "Base UI Dialog.Trigger props",
    "default": "—",
    "description": "Standard button props pass through."
  }
]
```

### Dialog.Portal

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

### Dialog.Backdrop

The dimmer behind the popup. Fades in via `data-starting-style` / `data-ending-style`. Click-to-dismiss is handled by Base UI when the dialog is `dismissible`.

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

```json data-attributes
[
  {
    "attribute": "data-starting-style",
    "description": "Set on the entry frame so the open animation can interpolate from `opacity-0`."
  },
  {
    "attribute": "data-ending-style",
    "description": "Set on the close frame for the matching exit animation."
  }
]
```

### Dialog.Popup

The popup surface — bordered, rounded, shadowed, capped at `max-w-md`. Animates in from `opacity-0 scale-95`.

```json props
[
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
    "description": "Set on entry; drives the open animation from `opacity-0 scale-95`."
  },
  { "attribute": "data-ending-style", "description": "Set on exit." }
]
```

### Dialog.Title

The dialog heading. Wired via `aria-labelledby` automatically.

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

### Dialog.Description

The supporting copy. Wired via `aria-describedby` automatically. Sits 8 px below the title via `mt-2`.

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

### Dialog.Close

Closes the dialog when activated. Use `render` to project close semantics onto a `Button` so the footer reads as a normal action pair.

```json props
[
  {
    "prop": "render",
    "type": "ReactElement",
    "default": "—",
    "description": "Element to render as the close affordance. Click handlers are merged."
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

- `Dialog.Title` and `Dialog.Description` are automatically wired via `aria-labelledby` and `aria-describedby` on the popup. Always include both — the popup is not announced without them.
- Focus moves into the popup on open and returns to the trigger on close. The first focusable child receives initial focus; pass `initialFocus` on `Dialog.Root` to override.
- Set `data-sin` _inside_ the popup (not on the trigger) so the accent applies to the dialog content; the popup portals out of the trigger's cascade.

### Keyboard

```json keyboard
[
  { "keys": ["Enter", "Space"], "description": "Activates the trigger to open the dialog." },
  { "keys": ["Escape"], "description": "Closes the dialog and returns focus to the trigger." },
  {
    "keys": ["Tab"],
    "description": "Cycles focus within the popup; cannot escape the dialog while open."
  }
]
```
