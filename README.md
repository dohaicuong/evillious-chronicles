# Evillious Chronicles

A reader's chronicle of mothy / Akuno-P's _Evillious Chronicles_ — a thousand
years of song, sin, and sacrifice across the continent of Bolganio.

Live at **[dohaicuong.github.io/evillious-chronicles](https://dohaicuong.github.io/evillious-chronicles/)**.

## About the series

The _Evillious Chronicles_ is an interconnected dark-fantasy multimedia series
by [mothy / Akuno-P](https://en.wikipedia.org/wiki/Akuno-P), originally told
through Vocaloid songs and expanded into light novels, manga, and short
stories. The narrative spans the western half of the continent of Bolganio
("Evillious"), where seven Demons embodying the Seven Deadly Sins shape a
millennium of cyclical evil.

Major arcs include the **Original Sin Story**, the **Story of Evil**
(centred on Princess Riliane Lucifen d'Autriche, the _Daughter of Evil_),
the **Seven Deadly Sins Series**, and the _Clockwork Lullaby_ — the song
that ties every cycle together.

## Why this exists

This is a **personal reader** I'm building for myself, to keep the media
alive in a form that's pleasant to read on a screen. mothy stopped active
publication years ago and several of the original distribution channels —
fan groups, blogs, image hosts, video uploads — have rotted, vanished, or
been taken down over time. I want my own copy of the volumes I love, with
the typography and illustrations intact, and a way to actually read them
end-to-end without juggling PDF tabs.

It is **not** a public re-distribution platform. I'm one fan with a copy of
the books, building a reading interface for myself.

## Translation source

English text for _The Daughter of Evil — Vol 1: Clôture of Yellow_ comes
from the fan translation hosted at **[ltquick.nl](https://www.ltquick.nl/pdf/ClotureofYellowBetterVersion.pdf)**.
Full credit and gratitude to the translator and proof-readers; without that
work this project would not exist. If you're the translator and would prefer
attribution changes (or removal), open an issue and I'll act on it
immediately.

The original Japanese works, illustrations, lyrics, and music remain
copyright of their respective creators —
**Akuno-P (mothy) / EXIT TUNES / PHP Institute** and the credited
illustrators (壱加 / 忱 / ゆのみ on Vol 1). Cover image © 一色.

## Stack

- **Vite+** (Vite / Rolldown / Oxlint / Oxfmt unified toolchain) via the
  `vp` CLI
- **React 19** + **TanStack Router** (file-based routing, lazy chunks)
- **Tailwind CSS v4** with a custom design system: themed sin palette,
  semantic tokens (`--bg`, `--fg`, `--accent`, etc.), `text-style-*`
  typography utilities, sin-aware `data-sin` cascade
- **Base UI** for headless component primitives (Dialog, Drawer, Tabs,
  Tooltip, Toast, Slider, Switch, Progress, Menu, ScrollArea)
- **Phosphor Icons** (light weight, app default via `IconContext.Provider`)
- **Self-hosted fonts** (`@fontsource`) — IM Fell English SC, Marcellus SC,
  EB Garamond, Inter, Pirata One
- **react-markdown** for prose rendering with custom typography mapping
- **GitHub Pages** deployment via Actions

## Local development

```bash
vp install   # install deps
vp dev       # local dev server
vp check     # format + lint + type-check
vp build     # production build
```

The volume content (markdown chapters, illustrations) loads as a lazy chunk
keyed by volume id; the main bundle stays slim regardless of how many
volumes are added.

## Project structure

```
src/
  components/
    primitives/    Button, Card, Dialog, Drawer, Input, Tabs, ...
    library/       SeriesCard, VolumeCard, ChapterList
    volume/        VolumeHero, TitlePageSection, PoetrySection, GallerySection
    reader/        PageView, ProseRenderer, ChapterNav
    shell/         AppShell
  data/
    schema.ts      Series → Volume → Chapter → Page
    library.ts     Slim series/volume catalog (cards & chapter list)
    songs.ts       Global song catalog
    volumes/       Per-volume full schema fixtures + chapter markdown
  routes/          File-based routes (TanStack Router)
public/
  cloture-of-yellow/   Cover, artwork, illustrations
```

## License

The code in this repository is mine. The series content (text, images,
audio, lyrics) belongs to its respective rights-holders and is hosted here
only for my personal reading. Don't fork-and-publish this with the content
attached — make it your own private copy if you want one.
