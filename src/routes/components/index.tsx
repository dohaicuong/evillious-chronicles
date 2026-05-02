import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/components/")({
  component: ComponentsOverview,
});

function ComponentsOverview() {
  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">Component Library</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          A reader's gothic-storybook system: parchment and aged leather, candle gold against
          court ink, and a per-sin accent that paints whole subtrees in the colour of their
          curse.
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-style-heading-3 text-fg">Two parchments</h2>
        <p className="text-style-body text-fg-muted">
          The system ships with two themes that swap entirely via{" "}
          <code>[data-theme]</code> on the document root. The light theme is{" "}
          <em>parchment</em> — pale leaf with ink-violet text, a leaf for daylight reading. The
          dark theme is <em>aged leather</em> — warm brown with a bone foreground, the inside of
          a well-worn pocket-watch case. Both share the same candle-gold accent so the brand
          stays anchored across the swap.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-style-heading-3 text-fg">Sin-tinted accents</h2>
        <p className="text-style-body text-fg-muted">
          Drop <code>data-sin="pride"</code> on any wrapper and every descendant's{" "}
          <code>--accent</code> shifts to that sin's hue — Pride's yellow-olive, Lust's purple,
          Sloth's dark teal, Gluttony's red, Greed's deep blue, Wrath's olive, Envy's magenta,
          and the seafoam <em>origin</em> for Eve's arc. The cascade does the rest: badges,
          progress bars, hover states, focus rings — all paint themselves the local colour.
          Volumes, chapters, and series each carry the right <code>data-sin</code>, so the
          chronicle re-skins itself as the reader walks through it.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-style-heading-3 text-fg">Semantic tokens</h2>
        <p className="text-style-body text-fg-muted">
          Components reach for <code>bg</code>, <code>surface</code>, <code>fg</code>,{" "}
          <code>fg-muted</code>, <code>border</code>, and the <code>accent</code> family —
          never raw palette names. Each token is a CSS variable resolved at the using element,
          so a sin or theme change at any ancestor flows down without recomputation. Derived
          shades (<code>accent-soft</code>, <code>accent-hover</code>,{" "}
          <code>accent-active</code>, <code>accent-strong</code>) are mixed at runtime via{" "}
          <code>color-mix</code>, which means hover automatically darkens the light sins and
          lightens the dark ones.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-style-heading-3 text-fg">Typography</h2>
        <p className="text-style-body text-fg-muted">
          Four type families do most of the work. <em>Marcellus SC</em> handles display
          headings — small caps with the slight pinch of an antique playbill. <em>EB Garamond</em>{" "}
          carries body text and the italic <em>lead</em> paragraphs that introduce a section,
          where lining figures and old-style ligatures make prose feel printed rather than
          rendered. <em>IM Fell English SC</em> takes the largest hero-level display where the
          rougher inked edges read as letterpress. <em>Pirata One</em> appears only in
          accents — a fleuron between sections, the glyph in an ornament — sized just enough to
          mark the page break without competing with the text. <em>Inter</em> covers captions
          and small UI metadata where Garamond's serifs would crowd the line.
        </p>
        <p className="text-style-body text-fg-muted">
          Sizes are fluid via <code>clamp()</code> from display down through heading-3 and lead,
          so a chapter title scales naturally between phone and desktop without a stack of
          breakpoints. Letter-spacing widens with size, mimicking the way old type would
          air-out when set in larger fonts.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-style-heading-3 text-fg">Reader-controlled prose</h2>
        <p className="text-style-body text-fg-muted">
          The chapter reader exposes its own font-size and line-height as CSS variables (
          <code>--reader-font-size</code>, <code>--reader-line-height</code>) consumed by the{" "}
          <code>text-style-reader-prose</code> utility. The Reader Settings drawer writes
          straight into those variables so the sliders only affect prose — never the
          surrounding UI — and changes apply instantly without re-render gymnastics.
        </p>
      </section>
    </div>
  );
}
