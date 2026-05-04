```scope
Button
SearchDialog
MagnifyingGlassIcon
```

# Search

Site-wide command palette. Searches volumes, chapters, songs, and characters from a single query and routes results to the appropriate destination — links navigate, songs play through the audio dock. Mounted in `AppShell` with a global <code>Ctrl K</code> / <code>⌘ K</code> shortcut, but it's just a `Dialog` underneath so any caller can drive the open state.

```tsx preview
() => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        <MagnifyingGlassIcon weight="light" />
        Open search
      </Button>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
};
```

## Anatomy

`SearchDialog` is a controlled component — the parent owns `open` and listens for `onOpenChange`. The dialog reads the catalogs (`series`, `songs`, `characters`) directly and builds results in-memory; there's no network. Selecting a row closes the dialog as part of the action.

```tsx
import { SearchDialog } from "@src/components/library/search-dialog";

function MySearchTrigger() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Search</Button>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
```

## Examples

### Trigger

Open the palette, then start typing. With an empty query, the dialog renders a default browse list (top results per category) so it's useful as a directory before you've typed anything.

```tsx preview
() => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        <MagnifyingGlassIcon weight="light" />
        Open search
      </Button>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
};
```

## What it searches

- **Volumes** — English title, original Japanese title, romanized title.
- **Chapters** — chapter title within each volume's slim manifest.
- **Songs** — title, original / romanized titles, vocalist, composer. Selecting a song plays it through the audio dock instead of navigating.
- **Characters** — name, aliases, Japanese name, romaji, vocaloid binding.

Each section is capped at six rows. The query is matched as a case-insensitive substring against the concatenated haystack for the row.

## Props

### SearchDialog

```json props
[
  {
    "prop": "open",
    "type": "boolean",
    "default": "—",
    "description": "Whether the palette is visible. Controlled — the parent owns this state."
  },
  {
    "prop": "onOpenChange",
    "type": "(open: boolean) => void",
    "default": "—",
    "description": "Fired when the dialog requests open/close (Esc, backdrop click, row activation)."
  }
]
```

## Accessibility

- The dialog combines a roving-tabindex listbox with `aria-activedescendant` so the input keeps focus while the highlight moves through results — screen readers announce the active row without losing the typing context.
- `Tab` is constrained to a two-stop loop (input ↔ active row) so keyboard users can't fall off the result list into the close button by accident.
- The active row only paints its highlight once focus has actually moved into the list — while the user is typing, the input owns visual focus and no row competes for attention.
- Selecting a row activates the row's native semantics: `<Link>` rows navigate via TanStack Router; `<button>` rows (songs) call the click handler. The dialog closes as part of either path.

### Keyboard

```json keyboard
[
  { "keys": ["Ctrl K"], "description": "Open or close from anywhere (mounted in `AppShell`)." },
  { "keys": ["⌘ K"], "description": "Mac equivalent of Ctrl K." },
  {
    "keys": ["ArrowDown"],
    "description": "Move highlight to the next row. The first ArrowDown from the input lands on the first row."
  },
  {
    "keys": ["ArrowUp"],
    "description": "Move highlight to the previous row; from the input, wraps to the last row."
  },
  { "keys": ["Tab"], "description": "Two-stop loop between the input and the active row." },
  { "keys": ["Enter"], "description": "Activate the focused row — navigate or play." },
  { "keys": ["Escape"], "description": "Close the dialog." }
]
```
