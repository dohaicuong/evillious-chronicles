import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/components/color")({
  component: ColorPage,
});

const baseColors = [
  { name: "parchment", value: "#f4efe2" },
  { name: "parchment-aged", value: "#ebe4d3" },
  { name: "ink", value: "#1a1325" },
  { name: "court", value: "#14101c" },
  { name: "court-light", value: "#1f1830" },
  { name: "candle", value: "#c9a961" },
  { name: "shadow", value: "#3d2e5c" },
  { name: "bone", value: "#e8d5a3" },
];

const sins = [
  { name: "pride", value: "#b6ac17", hint: "yellow-olive — Riliane / Daughter of Evil" },
  { name: "lust", value: "#7f4eb3", hint: "purple — Sateriasis Venomania" },
  { name: "sloth", value: "#297e63", hint: "dark teal — Margarita Blankenheim" },
  { name: "gluttony", value: "#c22a1c", hint: "red — Banica Conchita" },
  { name: "greed", value: "#1921b2", hint: "deep blue — Gallerian Marlon" },
  { name: "wrath", value: "#748f46", hint: "olive green" },
  { name: "envy", value: "#b82eb1", hint: "magenta" },
  { name: "origin", value: "#3fb3a8", hint: "seafoam teal — Eve Moonlit / Original Sin" },
];

const semantic = [
  { name: "bg", note: "page background" },
  { name: "surface", note: "raised cards / panels" },
  { name: "fg", note: "primary text" },
  { name: "fg-muted", note: "captions / metadata" },
  { name: "border", note: "rules and dividers" },
  { name: "accent", note: "candle-gold by default; sin-tinted under [data-sin]" },
  { name: "accent-fg", note: "readable text on top of accent" },
  { name: "accent-soft", note: "tinted hover background — accent at 18% over bg" },
  { name: "accent-hover", note: "accent darkened toward accent-fg by 10%" },
  { name: "accent-active", note: "accent darkened toward accent-fg by 20%" },
  { name: "accent-strong", note: "accent pulled toward fg 45% — for body text on the page bg" },
];

function ColorPage() {
  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">Color</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Three layers: a fixed brand palette, the seven canonical sins (plus origin), and
          theme-aware semantic tokens that swap via <code>[data-theme]</code> and{" "}
          <code>[data-sin]</code>.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Base palette</h2>
        <p className="text-style-caption text-fg-muted max-w-prose">
          Brand-fixed colours. Use these only for theming or static brand artwork — components
          should reach for the semantic tokens instead so theme and sin cascades work.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {baseColors.map((c) => (
            <Swatch key={c.name} name={c.name} value={c.value} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Sin palette</h2>
        <p className="text-style-caption text-fg-muted max-w-prose">
          Each sin has a canonical hue. Apply <code>data-sin="&lt;name&gt;"</code> to a wrapper and
          every descendant's <code>--accent</code> shifts to that sin — badges, focus rings,
          progress bars retint automatically.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {sins.map((s) => (
            <Swatch key={s.name} name={s.name} value={s.value} hint={s.hint} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Semantic tokens</h2>
        <p className="text-style-caption text-fg-muted max-w-prose">
          Resolved at the using element via CSS variables, so any <code>[data-theme]</code> or{" "}
          <code>[data-sin]</code> ancestor cascades down. Use these in component code — never raw
          palette names.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {semantic.map((s) => (
            <SemanticSwatch key={s.name} name={s.name} note={s.note} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Swatch({ name, value, hint }: { name: string; value: string; hint?: string }) {
  return (
    <div className="flex flex-col gap-2 border border-border rounded-sm overflow-hidden">
      <div className="h-16" style={{ background: value }} />
      <div className="flex flex-col gap-0.5 px-3 pb-3">
        <code className="text-style-caption text-fg">{name}</code>
        <code className="text-style-caption text-fg-muted">{value}</code>
        {hint ? <span className="text-style-caption text-fg-muted">{hint}</span> : null}
      </div>
    </div>
  );
}

function SemanticSwatch({ name, note }: { name: string; note: string }) {
  return (
    <div className="flex flex-col gap-2 border border-border rounded-sm overflow-hidden">
      <div className="h-16" style={{ background: `var(--color-${name})` }} />
      <div className="flex flex-col gap-0.5 px-3 pb-3">
        <code className="text-style-caption text-fg">{name}</code>
        <span className="text-style-caption text-fg-muted">{note}</span>
      </div>
    </div>
  );
}
