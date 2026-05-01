import { createLazyFileRoute } from "@tanstack/react-router";
import { ClockworkSpinner } from "@src/components/thematic/clockwork-spinner";
import { Ornament } from "@src/components/thematic/ornament";
import { SinGlyph } from "@src/components/thematic/sin-glyph";
import type { Sin } from "@src/data/schema";

export const Route = createLazyFileRoute("/components/thematic")({
  component: ThematicPage,
});

const sins: Sin[] = ["pride", "lust", "sloth", "gluttony", "greed", "wrath", "envy", "origin"];

function ThematicPage() {
  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">Thematic</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Decorative pieces that lean into the chronicle's gothic-storybook character.
        </p>
      </header>

      {/* Sin glyphs */}
      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Sin Glyphs</h2>
        <p className="text-style-caption text-fg-muted max-w-prose">
          A symbolic icon per sin — picked from Phosphor for accessibility and consistency. Color
          inherits via <code>currentColor</code>; size via Phosphor's <code>size</code> prop.
        </p>
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
      </section>

      {/* Clockwork spinner */}
      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Clockwork Spinner</h2>
        <p className="text-style-caption text-fg-muted max-w-prose">
          Slow gear rotation (4s) — slower than Tailwind's default <code>animate-spin</code> to fit
          the pocket-watch motif. Use for loading states.
        </p>
        <div className="flex flex-wrap items-center gap-8 border border-border rounded-sm p-6">
          <ClockworkSpinner size={20} />
          <ClockworkSpinner size={32} />
          <ClockworkSpinner size={48} />
          <div data-sin="pride">
            <ClockworkSpinner size={32} />
          </div>
          <div data-sin="wrath">
            <ClockworkSpinner size={32} />
          </div>
          <div data-sin="lust">
            <ClockworkSpinner size={32} />
          </div>
        </div>
      </section>

      {/* Ornaments / dividers */}
      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Ornament</h2>
        <p className="text-style-caption text-fg-muted max-w-prose">
          Decorative section break: two thin rules with a centered glyph in Pirata One. Used between
          volume sections for storybook pacing.
        </p>
        <div className="border border-border rounded-sm p-8 flex flex-col gap-2">
          <p className="text-style-body text-fg">A passage of prose, then…</p>
          <Ornament />
          <p className="text-style-body text-fg">…a section break, in candle gold.</p>
          <Ornament glyph="❦" />
          <p className="text-style-body text-fg">Different glyph: a fleuron.</p>
          <div data-sin="pride">
            <Ornament />
          </div>
          <p className="text-style-body text-fg">Sin-themed: the glyph picks up the sin accent.</p>
          <Ornament glyph="☙" />
          <p className="text-style-body text-fg">Another fleuron variant.</p>
        </div>
      </section>
    </div>
  );
}
