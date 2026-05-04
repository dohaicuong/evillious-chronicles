```scope
ThemeToggle
```

# Theme Toggle

Flips between _parchment_ and _aged leather_ with a left-to-right wipe driven by the View Transitions API. The clip-path animation reveals the new theme over a snapshot of the old one — a single 700 ms gesture rather than a flicker.

```tsx preview
<ThemeToggle />
```

## Anatomy

`ThemeToggle` is a small icon button that owns the theme-flip behaviour. The component reads from `next-themes` for state, but the click handler runs the swap through `document.startViewTransition` so the page re-renders under a wipe rather than blinking. There are no props — it's a single-purpose control wired to the global theme.

```tsx
import { ThemeToggle } from "@src/components/shell/theme-toggle";

<ThemeToggle />;
```

> Clicking the live preview re-themes the entire docs page, not just the swatch — this isn't a scoped surface. That's intentional: the toggle is a global control and the preview should match production behaviour.

## How it works

- `document.startViewTransition` snapshots the page, then a `flushSync` inside its callback writes the new `data-theme` on `<html>` so the post-snapshot reflects the swap.
- On `transition.ready`, the new layer's `clipPath` animates from `inset(0 100% 0 0)` to `inset(0 0 0 0)` over 700 ms `ease-in-out` — a clean wipe from the left edge.
- The browser's default cross-fade is suppressed via `::view-transition-old/new(root) { animation: none; mix-blend-mode: normal }` so only the wipe is visible.
- `setTheme` from `next-themes` is deferred until the animation finishes; a local override drives the icon swap immediately on click so the button reads as responsive even before the wipe completes.

## Fallback

Browsers without `document.startViewTransition` (Firefox, older Safari) fall through to a plain `setTheme` — the swap still happens, just without the wipe. `disableTransitionOnChange` on the provider keeps colour tokens from animating mid-flip in that path, so the swap remains a single frame rather than a half-second cross-fade through every component's `transition-colors`.

## Accessibility

- The button carries an `aria-label` describing the current target theme ("Switch to aged leather" / "Switch to parchment"), which updates as the theme flips.
- The wipe is purely visual; the underlying state change happens instantly via `flushSync`. A reader using `prefers-reduced-motion` still gets the swap — only the visual transition is skipped via the fallback path when the View Transitions API isn't available. Where the API exists, the system will honour reduced-motion preferences via the browser's own handling of the transition pseudo-elements.
