import { createLazyFileRoute } from "@tanstack/react-router";
import { Ornament } from "@src/components/thematic/ornament";

export const Route = createLazyFileRoute("/components/thematic/ornament")({
  component: OrnamentPage,
});

function OrnamentPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-style-heading-1 text-fg">Ornament</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Decorative section break: two thin rules with a centered glyph in Pirata One. Used between
          volume sections for storybook pacing.
        </p>
      </header>

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
    </div>
  );
}
