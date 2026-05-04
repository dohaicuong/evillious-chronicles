# Component Library

A reader's gothic-storybook system: parchment and aged leather, candle gold against court ink, and a per-sin accent that paints whole subtrees in the colour of their curse.

## Two parchments

The system ships with two themes that swap entirely via `[data-theme]` on the document root. The light theme is _parchment_ — pale leaf with ink-violet text, a leaf for daylight reading. The dark theme is _aged leather_ — warm brown with a bone foreground, the inside of a well-worn pocket-watch case. Both share the same candle-gold accent so the brand stays anchored across the swap.

## Sin-tinted accents

Drop `data-sin="pride"` on any wrapper and every descendant's `--accent` shifts to that sin's hue — Pride's yellow-olive, Lust's purple, Sloth's dark teal, Gluttony's red, Greed's deep blue, Wrath's olive, Envy's magenta, and the seafoam _origin_ for Eve's arc. The cascade does the rest: badges, progress bars, hover states, focus rings — all paint themselves the local colour. Volumes, chapters, and series each carry the right `data-sin`, so the chronicle re-skins itself as the reader walks through it.

## Semantic tokens

Components reach for `bg`, `surface`, `fg`, `fg-muted`, `border`, and the `accent` family — never raw palette names. Each token is a CSS variable resolved at the using element, so a sin or theme change at any ancestor flows down without recomputation. Derived shades (`accent-soft`, `accent-hover`, `accent-active`, `accent-strong`) are mixed at runtime via `color-mix`, which means hover automatically darkens the light sins and lightens the dark ones.

## Typography

Four type families do most of the work. _Marcellus SC_ handles display headings — small caps with the slight pinch of an antique playbill. _EB Garamond_ carries body text and the italic _lead_ paragraphs that introduce a section, where lining figures and old-style ligatures make prose feel printed rather than rendered. _IM Fell English SC_ takes the largest hero-level display where the rougher inked edges read as letterpress. _Pirata One_ appears only in accents — a fleuron between sections, the glyph in an ornament — sized just enough to mark the page break without competing with the text. _Inter_ covers captions and small UI metadata where Garamond's serifs would crowd the line.

Sizes are fluid via `clamp()` from display down through heading-3 and lead, so a chapter title scales naturally between phone and desktop without a stack of breakpoints. Letter-spacing widens with size, mimicking the way old type would air-out when set in larger fonts.

## Reader-controlled prose

The chapter reader exposes its own font-size and line-height as CSS variables (`--reader-font-size`, `--reader-line-height`) consumed by the `text-style-reader-prose` utility. The Reader Settings drawer writes straight into those variables so the sliders only affect prose — never the surrounding UI — and changes apply instantly without re-render gymnastics.
