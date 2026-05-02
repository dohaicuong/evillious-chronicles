import { createLazyFileRoute } from "@tanstack/react-router";
import { SinGlyph } from "@src/components/thematic/sin-glyph";
import type { Sin } from "@src/data/schema";

export const Route = createLazyFileRoute("/components/thematic/sin-glyph")({
  component: SinGlyphPage,
});

const sins: Sin[] = ["pride", "lust", "sloth", "gluttony", "greed", "wrath", "envy", "origin"];

function SinGlyphPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-style-heading-1 text-fg">Sin Glyphs</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          One symbolic icon per sin — picked from Phosphor for accessibility and consistency.
          Color inherits via <code>currentColor</code>; size via Phosphor's <code>size</code>{" "}
          prop.
        </p>
      </header>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-7">
        {sins.map((sin) => (
          <div
            key={sin}
            data-sin={sin}
            className="flex flex-col items-center gap-2 border border-border rounded-sm py-5 text-accent"
          >
            <SinGlyph sin={sin} size={32} weight="light" />
            <code className="text-style-caption text-fg-muted capitalize">{sin}</code>
          </div>
        ))}
      </div>
    </div>
  );
}
