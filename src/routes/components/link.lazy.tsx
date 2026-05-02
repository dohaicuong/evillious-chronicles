import { createLazyFileRoute } from "@tanstack/react-router";
import { ArrowSquareOutIcon } from "@phosphor-icons/react";
import { ExternalLink, Link } from "@src/components/primitives/link";

export const Route = createLazyFileRoute("/components/link")({
  component: LinkPage,
});

function LinkPage() {
  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">Link</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Routing-aware link built via TanStack Router's <code>createLink</code>, so the route
          tree's type-safe <code>to</code> / <code>params</code> / <code>search</code> /{" "}
          <code>activeOptions</code> checking is preserved end-to-end. Visual styling (colour,
          hover, underline) stays with the caller via <code>className</code>; the primitive only
          owns transitions and a focus-visible outline keyed to the local <code>--accent</code> so
          it cascades cleanly under <code>[data-sin]</code>.
        </p>
        <p className="text-style-body mt-3 text-fg-muted">
          For external destinations, use the sibling <code>ExternalLink</code> export — it shares
          the same base / focus styles but skips the route-tree typing and renders a plain{" "}
          <code>&lt;a href=...&gt;</code>.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Defaults</h2>
        <p className="text-style-caption text-fg-muted max-w-prose">
          With no className, you get a plain text link with the focus outline ready to fire. Tab
          onto each example to see the gold accent outline appear with rounded-sm corners matching
          the primitive's baked-in radius.
        </p>
        <div className="flex flex-wrap items-center gap-6 border border-border rounded-sm p-6">
          <Link to="/components">Plain link</Link>
          <Link
            to="/components/button"
            className="text-accent hover:text-accent-hover underline underline-offset-4"
          >
            Underlined
          </Link>
          <Link
            to="/components/typography"
            className="text-fg-muted hover:text-fg transition-colors"
          >
            Muted hover
          </Link>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Active state</h2>
        <p className="text-style-caption text-fg-muted max-w-prose">
          TanStack's <code>data-status="active"</code> attribute is forwarded to the underlying
          anchor — style it with <code>data-[status=active]</code> variants. Tabbing onto the active
          link shows the same focus outline; the active treatment doesn't suppress it.
        </p>
        <div className="flex flex-col gap-2 border border-border rounded-sm p-6">
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
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Sin-tinted</h2>
        <p className="text-style-caption text-fg-muted max-w-prose">
          Drop the link inside a <code>data-sin</code> wrapper and the focus outline retints along
          with the rest of the subtree — no re-styling needed.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 border border-border rounded-sm p-6">
          {(["pride", "lust", "greed", "wrath"] as const).map((sin) => (
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
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">External</h2>
        <p className="text-style-caption text-fg-muted max-w-prose">
          <code>ExternalLink</code> renders a plain <code>&lt;a&gt;</code> with the same base and
          focus styles as <code>Link</code>. Pass <code>href</code> directly. Add{" "}
          <code>target="_blank" rel="noopener noreferrer"</code> when opening a new tab.
        </p>
        <div className="flex flex-col gap-3 border border-border rounded-sm p-6">
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
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-style-eyebrow text-fg-muted">When to use</h2>
        <p className="text-style-body text-fg-muted">
          Reach for <code>Link</code> for any in-app navigation — the type-safe <code>to</code> will
          catch a typoed path at compile time. Reach for <code>ExternalLink</code> when you need a
          plain anchor (external URLs, mailto, anchor jumps) so the focus styling stays consistent.
          Reach for <code>Button</code> (or <code>IconButton</code>) when the action does something
          other than navigate, even if it visually looks like a link.
        </p>
      </section>
    </div>
  );
}
