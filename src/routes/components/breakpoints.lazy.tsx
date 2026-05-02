import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/components/breakpoints")({
  component: BreakpointsPage,
});

const breakpoints = [
  { name: "sm", min: "640px", note: "small phones in landscape, large phones in portrait" },
  { name: "md", min: "768px", note: "tablets in portrait, narrow laptops" },
  { name: "lg", min: "1024px", note: "tablets in landscape, standard laptops" },
  { name: "xl", min: "1280px", note: "wide laptops, smaller desktops" },
  { name: "2xl", min: "1536px", note: "large desktops" },
];

function BreakpointsPage() {
  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">Breakpoints</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Tailwind's default min-width breakpoints. Mobile-first — utilities apply at and above
          the named width. The reader is designed phone-first, so most layouts only need{" "}
          <code>sm:</code> or <code>md:</code> overrides.
        </p>
      </header>

      <section className="flex flex-col gap-2">
        <h2 className="text-style-eyebrow text-fg-muted mb-2">Reference</h2>
        {breakpoints.map((bp) => (
          <div
            key={bp.name}
            className="grid grid-cols-[4rem_6rem_1fr] items-baseline gap-4 border-t border-border py-3"
          >
            <code className="text-style-heading-3 text-fg">{bp.name}</code>
            <code className="text-style-body text-fg-muted tabular-nums">{`≥ ${bp.min}`}</code>
            <span className="text-style-caption text-fg-muted">{bp.note}</span>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-style-eyebrow text-fg-muted">Usage</h2>
        <p className="text-style-body text-fg-muted">
          Prefix any utility with the breakpoint name to apply it from that width up — e.g.{" "}
          <code>grid-cols-1 sm:grid-cols-2 lg:grid-cols-3</code>. Stack from smallest to
          largest; later breakpoints override earlier ones. Avoid <code>max-*</code> reverse
          breakpoints unless a layout truly needs phone-only treatment — they fight the
          mobile-first cascade.
        </p>
      </section>
    </div>
  );
}
