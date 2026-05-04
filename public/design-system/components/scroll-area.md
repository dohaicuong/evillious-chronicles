```scope
ScrollArea
Card
BookOpenIcon
```

# Scroll Area

Custom-styled scrollbars that auto-reveal on hover or while scrolling. Both axes supported. Wraps Base UI's compound scroll-area into a single component, so callers don't manage `Root` / `Viewport` / `Scrollbar` / `Thumb` themselves.

```tsx preview
<Card className="h-72">
  <ScrollArea className="h-full" viewportClassName="p-2">
    <ul className="flex flex-col">
      {[
        "Prologue — A Tale Begins",
        "Chapter I — The Servant",
        "Chapter II — Yellow Flowers",
        "Chapter III — The Daughter's Decree",
        "Chapter IV — A Green-Cloaked Visitor",
        "Chapter V — The Sea of Bandits",
        "Chapter VI — Marlon's Decree",
        "Chapter VII — Whispers in the Hall",
        "Chapter VIII — The Tea Ceremony",
        "Chapter IX — A Mirror's Reflection",
        "Chapter X — The Servant's Choice",
        "Chapter XI — The Sound of Bells",
        "Chapter XII — A Body for a Body",
        "Chapter XIII — The Final Movement",
        "Epilogue — Re_birthday",
      ].map((c, i) => (
        <li
          key={c}
          className="flex items-center gap-3 rounded-sm px-3 py-2.5 hover:bg-accent-soft transition-colors cursor-pointer"
        >
          <BookOpenIcon className="text-fg-muted shrink-0" />
          <span className="text-style-body text-fg flex-1">{c}</span>
          <span className="text-style-caption text-fg-muted">{i + 1}</span>
        </li>
      ))}
    </ul>
  </ScrollArea>
</Card>
```

## Anatomy

The wrapper renders the full Base UI tree internally — `Root` + `Viewport` + `Content` + vertical `Scrollbar` + horizontal `Scrollbar` + `Corner`. Style the outer container's height (the wrapper itself, or a parent like `Card`); the viewport fills it and scrolls.

```tsx
import { ScrollArea } from "@src/components/primitives/scroll-area";

<ScrollArea className="h-72" viewportClassName="p-2">
  {/* tall content */}
</ScrollArea>;
```

## Examples

### Vertical — chapter list

A common case: a fixed-height container with a scrollable list inside. The scrollbar fades in on hover or while actively scrolling.

```tsx preview
<Card className="h-72">
  <ScrollArea className="h-full" viewportClassName="p-2">
    <ul className="flex flex-col">
      {[
        "Prologue — A Tale Begins",
        "Chapter I — The Servant",
        "Chapter II — Yellow Flowers",
        "Chapter III — The Daughter's Decree",
        "Chapter IV — A Green-Cloaked Visitor",
        "Chapter V — The Sea of Bandits",
        "Chapter VI — Marlon's Decree",
        "Chapter VII — Whispers in the Hall",
        "Chapter VIII — The Tea Ceremony",
        "Chapter IX — A Mirror's Reflection",
        "Chapter X — The Servant's Choice",
        "Chapter XI — The Sound of Bells",
        "Chapter XII — A Body for a Body",
        "Chapter XIII — The Final Movement",
        "Epilogue — Re_birthday",
      ].map((c, i) => (
        <li
          key={c}
          className="flex items-center gap-3 rounded-sm px-3 py-2.5 hover:bg-accent-soft transition-colors cursor-pointer"
        >
          <BookOpenIcon className="text-fg-muted shrink-0" />
          <span className="text-style-body text-fg flex-1">{c}</span>
          <span className="text-style-caption text-fg-muted">{i + 1}</span>
        </li>
      ))}
    </ul>
  </ScrollArea>
</Card>
```

### Horizontal — overflowing wide content

Use `w-max` on the inner content so it grows past the viewport width — both axes show their scrollbars when the content overflows that direction.

```tsx preview
<Card className="h-48">
  <ScrollArea className="h-full" viewportClassName="p-4">
    <div className="flex flex-col gap-2 w-max">
      {Array.from({ length: 20 }, (_, i) => (
        <span
          key={i}
          className="text-style-body text-fg whitespace-nowrap"
        >{`Volume ${i + 1} — A long title that overflows the container width`}</span>
      ))}
    </div>
  </ScrollArea>
</Card>
```

### Long prose

Shows the scrollbar against actual reading content. The viewport gets `px-5 py-4` for comfortable reading inset; the scrollbar floats on top without nudging the text.

```tsx preview
<Card className="h-64">
  <ScrollArea className="h-full" viewportClassName="px-5 py-4">
    <p className="text-style-body text-fg">
      On a vast continent, in a small kingdom torn by the ambitions of a young queen, a servant
      carried a dreadful secret. The yellow flowers swayed in the courtyard while the bells tolled
      three. Riliane traced a finger along the edge of the marble balustrade, watching the
      green-cloaked guards pass below — none of them daring to glance up at her.{" "}
      {Array.from({ length: 8 }, (_, i) => (
        <span key={i}>
          Time stretched. The candle in her chamber guttered, then steadied. The pocket watch on her
          vanity ticked the hours away with no regard for crowns or kingdoms. Outside, the bells of
          Lucifenia rang for noon, and the kingdom turned, as kingdoms do, toward whatever ending
          the Master of the Court had written for it.{" "}
        </span>
      ))}
    </p>
  </ScrollArea>
</Card>
```

## Props

### ScrollArea

Despite Base UI exposing the area as a compound, the design-system wrapper renders the whole tree internally and exports a single component. Style the outer height + `viewportClassName` for inner padding.

```json props
[
  {
    "prop": "viewportClassName",
    "type": "string",
    "default": "—",
    "description": "Merged onto the inner viewport (the scrolling element). Use for inset padding so the scrollbar overlays content rather than living next to it."
  },
  {
    "prop": "viewportRef",
    "type": "Ref<HTMLDivElement>",
    "default": "—",
    "description": "Ref forwarded to the viewport. Useful for programmatic scrolling."
  },
  {
    "prop": "scrollRestorationId",
    "type": "string",
    "default": "—",
    "description": "Tags the viewport with `data-scroll-restoration-id` so TanStack Router caches and restores scrollY across back / forward navigation. Omit for transient surfaces (drawers, dialogs)."
  },
  {
    "prop": "className",
    "type": "string",
    "default": "—",
    "description": "Merged onto the outer Root. Use for height + width sizing."
  },
  {
    "prop": "children",
    "type": "ReactNode",
    "default": "—",
    "description": "Scrollable content. Wrapped internally in `ScrollArea.Content`."
  },
  {
    "prop": "...rest",
    "type": "Base UI ScrollArea.Root props",
    "default": "—",
    "description": "Standard root props pass through."
  }
]
```

```json data-attributes
[
  {
    "attribute": "data-hovering",
    "description": "Set on the scrollbar while the user hovers the area. Drives `opacity-100`."
  },
  {
    "attribute": "data-scrolling",
    "description": "Set on the scrollbar while the viewport is actively scrolling."
  },
  {
    "attribute": "data-orientation",
    "description": "Set on the scrollbar (`vertical` / `horizontal`) — drives the width / height tokens."
  }
]
```

## Accessibility

- The viewport is intentionally pulled out of the tab order (`tabIndex={-1}`) — putting an entire content region in the tab order with no useful focus styling is worse than not. Wheel, mouse drag, and keyboard arrow scrolling still work when a descendant is focused.
- Custom scrollbars don't replace native ones — they sit on top of them. Mobile devices keep their platform scrollbars, so touch users never lose the affordance.
- For long lists, prefer pagination + virtualisation over a tall scroll area when scrolling latency matters.
