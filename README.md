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

English text comes from three different fan translations, one per volume:

- **Vol 1 — Clôture of Yellow:** the PDF hosted at
  **[ltquick.nl](https://www.ltquick.nl/pdf/ClotureofYellowBetterVersion.pdf)**.
- **Vol 2 — Wiegenlied of Green:** a personal PDF copy of an English fan
  translation (translator uncredited in the file; transcription credited to
  「轻之国度」 / Light Novel Country, distribution to 雪名残). If you recognise
  this translation and can identify the translator, please open an issue so
  I can attribute it properly.
- **Vol 3 — Praeludium of Red:** the chapter-by-chapter translation posted at
  **[doe-praeludiumofred.tumblr.com](https://doe-praeludiumofred.tumblr.com/directory)**.
- **Vol 4 — Praefacio of Blue:** the chapter-by-chapter translation posted at
  **[doe-praefacioofblue.tumblr.com](https://doe-praefacioofblue.tumblr.com/directory)**.

Full credit and gratitude to every translator and proof-reader involved;
without their work this project would not exist. If you're one of these
translators and would prefer attribution changes (or removal), open an issue
and I'll act on it immediately.

The original Japanese works, illustrations, lyrics, and music remain
copyright of their respective creators —
**Akuno-P (mothy) / EXIT TUNES / PHP Institute** and the credited
illustrators (壱加 / 忱 / ゆのみ on Vol 1; 鈴ノ助 / 壱加 / 忱 / なぎみそ /
かる / ゆーりん / 吉田ドンドリアン on Vol 2). Cover images © 一色 (Vol 1),
鈴ノ助 (Vol 2).

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
  cloture-of-yellow/     Vol 1 cover, artwork, illustrations
  wiegenlied-of-green/   Vol 2 cover, artwork, illustrations, source PDF
  praeludium-of-red/     Vol 3 cover (illustrations pending)
  praefacio-of-blue/     Vol 4 (cover and illustrations pending)
```

## License

The code in this repository is mine. The series content (text, images,
audio, lyrics) belongs to its respective rights-holders and is hosted here
only for my personal reading. Don't fork-and-publish this with the content
attached — make it your own private copy if you want one.
