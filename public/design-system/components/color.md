# Color

Three layers: a fixed brand palette, the seven canonical sins (plus origin), and theme-aware semantic tokens that swap via `[data-theme]` and `[data-sin]`. Components should reach for the semantic tokens — they're what the theme and sin cascades actually retint.

## Base palette

Brand-fixed colours. Use these only for theming the system itself or for static brand artwork — production components should consume the semantic tokens below so theme and sin cascades work.

```tsx preview
() => {
  const Swatch = ({ name, value, hint }) => (
    <div className="flex flex-col gap-2 border border-border rounded-sm overflow-hidden">
      <div className="h-16" style={{ background: value }} />
      <div className="flex flex-col gap-0.5 px-3 pb-3">
        <code className="text-style-caption text-fg">{name}</code>
        <code className="text-style-caption text-fg-muted">{value}</code>
        {hint ? <span className="text-style-caption text-fg-muted">{hint}</span> : null}
      </div>
    </div>
  );
  const baseColors = [
    { name: "parchment", value: "#f4efe2" },
    { name: "parchment-aged", value: "#ebe4d3" },
    { name: "ink", value: "#1a1325" },
    { name: "candle", value: "#c9a961" },
    { name: "bone", value: "#e8d5a3" },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
      {baseColors.map((c) => (
        <Swatch key={c.name} name={c.name} value={c.value} />
      ))}
    </div>
  );
};
```

## Sin palette

Each sin has a canonical hue. Apply `data-sin="<name>"` to a wrapper and every descendant's `--accent` shifts to that sin — badges, focus rings, progress bars retint automatically.

```tsx preview
() => {
  const Swatch = ({ name, value, hint }) => (
    <div className="flex flex-col gap-2 border border-border rounded-sm overflow-hidden">
      <div className="h-16" style={{ background: value }} />
      <div className="flex flex-col gap-0.5 px-3 pb-3">
        <code className="text-style-caption text-fg">{name}</code>
        <code className="text-style-caption text-fg-muted">{value}</code>
        {hint ? <span className="text-style-caption text-fg-muted">{hint}</span> : null}
      </div>
    </div>
  );
  const sins = [
    { name: "pride", value: "#b6ac17", hint: "yellow-olive — Riliane / Daughter of Evil" },
    { name: "lust", value: "#7f4eb3", hint: "purple — Sateriasis Venomania" },
    { name: "sloth", value: "#297e63", hint: "dark teal — Margarita Blankenheim" },
    { name: "gluttony", value: "#c22a1c", hint: "red — Banica Conchita" },
    { name: "greed", value: "#1921b2", hint: "deep blue — Gallerian Marlon" },
    { name: "wrath", value: "#748f46", hint: "olive green — Nemesis Sudou" },
    { name: "envy", value: "#b82eb1", hint: "magenta — Kayo Sudou" },
    { name: "origin", value: "#3fb3a8", hint: "seafoam teal — Eve Moonlit / Original Sin" },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
      {sins.map((s) => (
        <Swatch key={s.name} name={s.name} value={s.value} hint={s.hint} />
      ))}
    </div>
  );
};
```

## Semantic tokens

Resolved at the using element via CSS variables, so any `[data-theme]` or `[data-sin]` ancestor cascades down. Use these in component code — never raw palette names.

```tsx preview
() => {
  const Swatch = ({ name, note }) => (
    <div className="flex flex-col gap-2 border border-border rounded-sm overflow-hidden">
      <div className="h-16" style={{ background: `var(--color-${name})` }} />
      <div className="flex flex-col gap-0.5 px-3 pb-3">
        <code className="text-style-caption text-fg">{name}</code>
        <span className="text-style-caption text-fg-muted">{note}</span>
      </div>
    </div>
  );
  const tokens = [
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
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
      {tokens.map((t) => (
        <Swatch key={t.name} name={t.name} note={t.note} />
      ))}
    </div>
  );
};
```

## Cascades

- `[data-theme="parchment" | "aged"]` flips the underlying `bg`/`fg`/`border` semantics. Set on `<html>` via the theme toggle.
- `[data-sin="<name>"]` shifts `accent` and its derivatives to that sin's hue. Stackable — a wrath chapter inside an envy volume reads as wrath inside its own wrapper.
- Both cascades work via CSS variables, so retinting is free at runtime: components don't re-render, they just read a different value from `var(--accent)`.
