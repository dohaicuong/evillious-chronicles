# Typography

Drop a `text-style-*` utility on any element. Color stays separate — each style sets size, weight, family, and tracking, but not colour. Pair with `text-fg` / `text-fg-muted` / `text-accent` as needed.

## Scale

```tsx preview
() => {
  const styles = [
    { name: "text-style-display", sample: "Daughter of Evil" },
    { name: "text-style-heading-1", sample: "The Library" },
    { name: "text-style-heading-2", sample: "Volume I — The Story of Evil" },
    { name: "text-style-heading-3", sample: "Chapter I — The Servant" },
    { name: "text-style-heading-4", sample: "First Movement" },
    {
      name: "text-style-lead",
      sample:
        "On a vast continent, in a small kingdom torn by the ambitions of a young queen, a servant carried a dreadful secret.",
    },
    {
      name: "text-style-body",
      sample:
        "The yellow flowers swayed in the courtyard while the bells tolled three. Riliane traced a finger along the edge of the marble balustrade, watching the green-cloaked guards pass below — none of them daring to glance up at her.",
    },
    { name: "text-style-quote", sample: '"Oho ho ho ho! Bow down to me, peasants!"' },
    { name: "text-style-caption", sample: "Page 47 of 312 — Volume I" },
    { name: "text-style-eyebrow", sample: "Volume I" },
  ];
  return (
    <div className="flex flex-col w-full">
      {styles.map((style) => (
        <div
          key={style.name}
          className="grid grid-cols-1 sm:grid-cols-[200px_1fr] items-baseline gap-2 sm:gap-6 border-t border-border py-5"
        >
          <code className="text-style-caption text-fg-muted">{style.name}</code>
          <div className={style.name + " text-fg"}>{style.sample}</div>
        </div>
      ))}
    </div>
  );
};
```

## When to use which

- **`display`** — title pages, the volume cover. One per surface; reads as the work's name.
- **`heading-1`** — page titles. The route's H1.
- **`heading-2`** — major section breaks within a page (volume sections, doc-page sections like Anatomy / Examples / Props).
- **`heading-3`** / **`heading-4`** — sub-sections and tighter groupings.
- **`lead`** — the paragraph immediately under an H1. Slightly larger than body, sets the tone.
- **`body`** — running prose. The reader's primary surface.
- **`quote`** — pull-quotes, dialogue blocks, and lyric lines.
- **`caption`** — metadata, hints, helper text. Always paired with `text-fg-muted`.
- **`eyebrow`** — small uppercase tracking-heavy labels above section headings (`Volume I`, `Now playing`).

## Color is separate

The `text-style-*` utilities never set `color`. Pair them with the semantic tokens — `text-fg` for primary copy, `text-fg-muted` for captions/labels, `text-accent` (or `text-accent-strong`) for emphasis. This is intentional: the same text style reads correctly on parchment, aged-leather, and any sin cascade because colour resolves from the local theme rather than being baked into the typography token.
