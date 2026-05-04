import { createLazyFileRoute } from "@tanstack/react-router";
import { ThemeToggle } from "@src/components/shell/theme-toggle";

export const Route = createLazyFileRoute("/components/theme-toggle")({
  component: ThemeTogglePage,
});

function ThemeTogglePage() {
  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">Theme Toggle</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Flips between <em>parchment</em> and <em>aged leather</em> with a left-to-right wipe
          driven by the View Transitions API. The clip-path animation reveals the new theme over a
          snapshot of the old one — a single 700ms gesture rather than a flicker.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Live</h2>
        <p className="text-style-body text-fg-muted">
          Click to flip. The whole document re-themes — this isn't a scoped preview.
        </p>
        <div className="flex items-center gap-3 border border-border rounded-sm p-5">
          <ThemeToggle />
          <span className="text-style-caption text-fg-muted">
            Same component the sidebar header uses.
          </span>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-style-eyebrow text-fg-muted">How it works</h2>
        <ul className="text-style-body text-fg-muted flex flex-col gap-2 list-disc pl-5">
          <li>
            <code>document.startViewTransition</code> snapshots the page, then a{" "}
            <code>flushSync</code> inside its callback writes the new <code>data-theme</code> on{" "}
            <code>&lt;html&gt;</code> so the post-snapshot reflects the swap.
          </li>
          <li>
            On <code>transition.ready</code>, the new layer's <code>clipPath</code> animates from{" "}
            <code>inset(0 100% 0 0)</code> to <code>inset(0 0 0 0)</code> over 700ms{" "}
            <code>ease-in-out</code> — a clean wipe from the left edge.
          </li>
          <li>
            The browser's default cross-fade is suppressed via{" "}
            <code>
              ::view-transition-old/new(root) {`{ animation: none; mix-blend-mode: normal }`}
            </code>{" "}
            so only the wipe is visible.
          </li>
          <li>
            <code>setTheme</code> from <code>next-themes</code> is deferred until the animation
            finishes; a local override drives the icon swap immediately on click.
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-style-eyebrow text-fg-muted">Fallback</h2>
        <p className="text-style-body text-fg-muted">
          Browsers without <code>document.startViewTransition</code> (Firefox, older Safari) fall
          through to a plain <code>setTheme</code> — the swap still happens, just without the wipe.{" "}
          <code>disableTransitionOnChange</code> on the provider keeps colour tokens from animating
          mid-flip in that path.
        </p>
      </section>
    </div>
  );
}
