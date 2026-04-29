import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/components/typography")({
  component: TypographyPage,
});

const typeStyles = [
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
] as const;

function TypographyPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-style-heading-1 text-fg">Typography</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Drop a <code>text-style-*</code> utility on any element. Color stays separate.
        </p>
      </header>

      <section className="flex flex-col">
        {typeStyles.map((style) => (
          <div
            key={style.name}
            className="grid grid-cols-1 sm:grid-cols-[200px_1fr] items-baseline gap-2 sm:gap-6 border-t border-border py-5"
          >
            <code className="text-style-caption text-fg-muted">{style.name}</code>
            <div className={style.name}>{style.sample}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
