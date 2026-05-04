```scope
Link
ExternalLink
ArrowSquareOutIcon
```

# Link

Routing-aware link with the design system's focus treatment baked in. Built via TanStack Router's `createLink` so the route tree's type-safe `to` / `params` / `search` / `activeOptions` checking is preserved end-to-end.

```tsx preview
<Link to="/components" className="text-accent hover:text-accent-hover underline underline-offset-4">
  Browse components
</Link>
```

## Anatomy

`Link` wraps a styled `<a>` with TanStack's typed router props. `ExternalLink` is the plain-anchor sibling that shares the same focus styles for non-routed destinations. Visuals (color, hover, layout) stay with the caller via `className`; the primitive only owns transitions and the focus-visible outline.

```tsx
import { Link, ExternalLink } from "@src/components/primitives/link";

<Link to="/components/button">Internal route</Link>
<ExternalLink href="https://example.com">External destination</ExternalLink>;
```

## Examples

### Defaults

With no className, you get a plain text link with the focus outline ready to fire. Tab onto each example to see the gold accent outline appear with rounded-sm corners matching the primitive's baked-in radius.

```tsx preview
<Link to="/components">Plain link</Link>
<Link
  to="/components/button"
  className="text-accent hover:text-accent-hover underline underline-offset-4"
>
  Underlined
</Link>
<Link to="/components/typography" className="text-fg-muted hover:text-fg transition-colors">
  Muted hover
</Link>
```

### Active state

TanStack's `data-status="active"` attribute is forwarded to the underlying anchor — style it with `data-[status=active]` variants. Use `activeOptions={{ exact: true }}` for the home-link pattern so a parent route doesn't stay active under its children.

```tsx preview
<div className="flex flex-col gap-2">
  <Link
    to="/components"
    activeOptions={{ exact: true }}
    className="text-fg-muted hover:text-fg transition-colors data-[status=active]:text-accent"
  >
    Overview (active when on /components)
  </Link>
  <Link
    to="/components/link"
    className="text-fg-muted hover:text-fg transition-colors data-[status=active]:text-accent"
  >
    Link (active when here)
  </Link>
</div>
```

### Sin-tinted

Drop the link inside a `data-sin` wrapper and the focus outline retints along with the rest of the subtree — no re-styling needed.

```tsx preview
<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
  {["pride", "lust", "greed", "wrath"].map((sin) => (
    <div key={sin} data-sin={sin} className="flex flex-col items-start gap-1">
      <code className="text-style-caption text-fg-muted capitalize">{sin}</code>
      <Link
        to="/components/link"
        className="text-accent hover:text-accent-hover underline underline-offset-4"
      >
        Tab to focus
      </Link>
    </div>
  ))}
</div>
```

### External

`ExternalLink` renders a plain `<a>` with the same base and focus styles as `Link`. Pass `href` directly. Add `target="_blank" rel="noopener noreferrer"` when opening a new tab.

```tsx preview
<div className="flex flex-col gap-3">
  <ExternalLink
    href="https://theevilliouschronicles.fandom.com/wiki/The_Evillious_Chronicles_Wiki"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 text-style-body text-fg-muted hover:text-accent-strong w-fit"
  >
    <ArrowSquareOutIcon size={14} weight="light" />
    Evillious Chronicles wiki
  </ExternalLink>
  <ExternalLink
    href="https://tanstack.com/router"
    target="_blank"
    rel="noopener noreferrer"
    className="text-accent hover:text-accent-hover underline underline-offset-4 w-fit"
  >
    TanStack Router docs
  </ExternalLink>
</div>
```

## Props

### Link

Routing-aware anchor produced via TanStack Router's `createLink`. Type-safe `to` / `params` / `search` against the route tree, plus the standard `<a>` attributes.

```json props
[
  {
    "prop": "to",
    "type": "RegisteredRouterPaths",
    "default": "—",
    "description": "Target route path. Type-checked against the route tree — invalid paths fail the build."
  },
  {
    "prop": "params",
    "type": "RouteParams<to>",
    "default": "—",
    "description": "Path params for parameterised routes, type-narrowed to the chosen `to`."
  },
  {
    "prop": "search",
    "type": "RouteSearch<to>",
    "default": "—",
    "description": "Search-params object for the chosen `to`, validated against the route's search schema."
  },
  {
    "prop": "activeOptions",
    "type": "{ exact?: boolean; includeHash?: boolean; includeSearch?: boolean }",
    "default": "—",
    "description": "Controls when `data-status=\"active\"` is set. Pass `{ exact: true }` for home-link behaviour."
  },
  {
    "prop": "className",
    "type": "string",
    "default": "—",
    "description": "Caller-owned visual styling. Merged after the primitive's base + focus styles."
  },
  {
    "prop": "...rest",
    "type": "AnchorHTMLAttributes",
    "default": "—",
    "description": "All standard `<a>` attributes (target, rel, onClick, etc.) pass through."
  }
]
```

```json data-attributes
[
  {
    "attribute": "data-status",
    "description": "Set to \"active\" by TanStack Router when the current URL matches `to` (subject to `activeOptions`). Style with `data-[status=active]:...` variants."
  }
]
```

### ExternalLink

Plain `<a>` with the same base and focus styles as `Link`, but no router binding. Use for external URLs, mailto, or anchor jumps.

```json props
[
  {
    "prop": "href",
    "type": "string",
    "default": "—",
    "description": "Destination URL. Not validated against the route tree."
  },
  {
    "prop": "className",
    "type": "string",
    "default": "—",
    "description": "Caller-owned visual styling. Merged after the primitive's base + focus styles."
  },
  {
    "prop": "...rest",
    "type": "AnchorHTMLAttributes",
    "default": "—",
    "description": "All standard `<a>` attributes (target, rel, onClick, etc.) pass through."
  }
]
```

## Accessibility

- Both components render a native `<a>`, so role and keyboard activation are handled by the browser.
- Focus uses CSS `outline` (not `text-decoration` or `box-shadow`) so it draws a single rectangle around the element box and doesn't cascade through nested text. Focus colour reads `--color-accent` at the using element so it cascades cleanly under `[data-sin]`.
- For new-tab `ExternalLink`s, always set `rel="noopener noreferrer"` to avoid window-opener leaks.
- Use `Button` (or `IconButton`) when the action does something other than navigate, even if it visually looks like a link.

### Keyboard

```json keyboard
[
  { "keys": ["Enter"], "description": "Activates the link (browser default)." },
  { "keys": ["Tab"], "description": "Moves focus into and out of the link in document order." }
]
```
