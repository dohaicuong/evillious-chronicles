```scope
Code
```

# Code

Monospaced surface for inline tokens and block-level snippets. Inline by default; pass `block` to render as a scrollable `<pre><code>`.

```tsx preview
<Code>data-theme="dark"</Code>
```

## Anatomy

Two render shapes from one component. Inline returns a `<code>` sized at `0.875em` so it tracks the surrounding line-height; block returns a `<pre><code>` that scrolls horizontally instead of wrapping, so indentation stays readable.

```tsx
import { Code } from "@src/components/primitives/code";

<Code>useTheme()</Code>
<Code block>{snippet}</Code>;
```

## Examples

### Inline

Use inside prose to highlight identifiers, attribute values, or short literals.

```tsx preview
<p className="text-style-body text-fg-muted">
  Toggle with <Code>data-theme="dark"</Code>, read it via <Code>useTheme()</Code>, or target the
  ::view-transition-new(root) pseudo with <Code>::view-transition-new(root)</Code>.
</p>
```

### Block

Wraps in `<pre><code>`. Long lines scroll horizontally rather than wrapping, so indentation stays intact.

```tsx preview
<Code block>{`function toggle() {
  const next = isDark ? "light" : "dark";
  if (!document.startViewTransition) {
    setTheme(next);
    return;
  }
  document.startViewTransition(() => {
    flushSync(() => {
      document.documentElement.setAttribute("data-theme", next);
    });
  });
}`}</Code>
```

### Block with overflow

Single very long line to demonstrate horizontal scroll behaviour.

```tsx preview
<Code block>
  {
    "const url = `https://example.com/v1/series/the-daughter-of-evil/volumes/wiegenlied-of-green/chapters/01-prologue?token=${token}&signature=${signature}`;"
  }
</Code>
```

## Props

### Code

Renders `<code>` (inline) or `<pre><code>` (block). Pure presentation — no syntax highlighting.

```json props
[
  {
    "prop": "block",
    "type": "boolean",
    "default": "false",
    "description": "Render as a multi-line scrollable `<pre><code>` instead of inline."
  },
  {
    "prop": "className",
    "type": "string",
    "default": "—",
    "description": "Merged after the inline / block class set. Applied to the outer element (`<code>` for inline, `<pre>` for block)."
  },
  {
    "prop": "...rest",
    "type": "HTMLAttributes<HTMLElement>",
    "default": "—",
    "description": "Standard `<code>` attributes pass through. In block mode they land on the inner `<code>`, not the `<pre>`."
  }
]
```
