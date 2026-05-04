```scope
Pagination
```

# Pagination

Numbered page navigation with prev/next caret buttons. Renders ellipses when the range exceeds the visible slot budget. Three sizes; the row wraps onto a second line on narrow viewports rather than overflowing.

```tsx preview
() => {
  const [page, setPage] = useState(1);
  return <Pagination page={page} pageCount={12} onPageChange={setPage} />;
};
```

## Anatomy

`Pagination` is a single component (not compound). Always controlled — the parent owns `page` and reacts to `onPageChange`.

```tsx
import { Pagination } from "@src/components/primitives/pagination";

const [page, setPage] = useState(1);

<Pagination page={page} pageCount={12} onPageChange={setPage} />;
```

## Examples

### Default — 12 pages

The standard surface. Caret buttons disable at the ends; the active page renders with the accent fill.

```tsx preview
() => {
  const [page, setPage] = useState(1);
  return <Pagination page={page} pageCount={12} onPageChange={setPage} />;
};
```

### Mid-range — page 7 of 12

Both ellipses show when the active page is far from either end and `pageCount` exceeds the slot budget (`5 + 2 × siblings`).

```tsx preview
() => {
  const [page, setPage] = useState(7);
  return <Pagination page={page} pageCount={12} onPageChange={setPage} />;
};
```

### Large set — 100 pages

The slot budget keeps the row compact regardless of total page count.

```tsx preview
() => {
  const [page, setPage] = useState(50);
  return <Pagination page={page} pageCount={100} onPageChange={setPage} />;
};
```

### Few pages — no ellipses

Below the slot budget (default 7) every page renders without ellipses.

```tsx preview
() => {
  const [page, setPage] = useState(1);
  return <Pagination page={page} pageCount={5} onPageChange={setPage} />;
};
```

### Sizes

`sm` keeps the row at a constant 32 px tall; `md` and `lg` shrink to `sm` on phones (so the 7-button row fits ~360 px viewports) and grow at the `sm:` breakpoint.

```tsx preview
() => {
  const [page, setPage] = useState(1);
  return (
    <div className="flex flex-col items-start gap-4">
      <Pagination page={page} pageCount={20} onPageChange={setPage} size="sm" />
      <Pagination page={page} pageCount={20} onPageChange={setPage} size="md" />
      <Pagination page={page} pageCount={20} onPageChange={setPage} size="lg" />
    </div>
  );
};
```

### Siblings

`siblings` controls how many pages render on each side of the active page. The default is 1; bumping to 2 shows a wider window at the cost of a longer row.

```tsx preview
() => {
  const [page, setPage] = useState(50);
  return <Pagination page={page} pageCount={100} onPageChange={setPage} siblings={2} />;
};
```

## Props

### Pagination

Renders a `<nav>` containing prev / page / next buttons. Always controlled — parent owns `page`.

```json props
[
  {
    "prop": "page",
    "type": "number",
    "default": "—",
    "description": "Current 1-based page. Required."
  },
  {
    "prop": "pageCount",
    "type": "number",
    "default": "—",
    "description": "Total page count. Renders nothing when `pageCount <= 1`."
  },
  {
    "prop": "onPageChange",
    "type": "(page: number) => void",
    "default": "—",
    "description": "Fires when the user clicks a page or one of the caret buttons. Receives the new 1-based page."
  },
  {
    "prop": "siblings",
    "type": "number",
    "default": "1",
    "description": "How many pages to render on each side of the active page before ellipses kick in."
  },
  {
    "prop": "size",
    "type": "\"sm\" | \"md\" | \"lg\"",
    "default": "\"md\"",
    "description": "Button height + icon size. `md` and `lg` compact down to `sm` on phones."
  },
  {
    "prop": "className",
    "type": "string",
    "default": "—",
    "description": "Merged onto the outer `<nav>`."
  },
  {
    "prop": "aria-label",
    "type": "string",
    "default": "\"Pagination\"",
    "description": "Accessible name for the `<nav>` landmark."
  }
]
```

## Accessibility

- The `<nav>` carries an `aria-label`, so screen-reader users hear it as a landmark.
- The active page sets `aria-current="page"`; the prev / next buttons carry explicit labels (`Previous page`, `Next page`).
- Page links render as `<button type="button">` (no URL change). For a router-aware version, wrap each in a `<Link>` outside the primitive — the existing primitive intentionally stays URL-agnostic.

### Keyboard

```json keyboard
[
  { "keys": ["Tab"], "description": "Walks through prev → page numbers → next in document order." },
  { "keys": ["Enter", "Space"], "description": "Activates the focused page button." }
]
```
