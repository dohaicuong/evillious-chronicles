# TODO

## TOP PRIORITY

## Pending

- reaction feature(like) for novel, song and character

### Reader / content

- **Audio cues** — wire `Page.songCue` to the audio dock. Schema already in place at three levels (no changes needed): `Series.songIds` (rendered on series page), `Chapter.songIds` (a "tracks in this chapter" list — not rendered yet), `Page.songCue` (single id, intended to pin/highlight the song in the dock when the page is reached). Plan: IntersectionObserver on the page like progress; opt-in via a new `autoplaySongCues` toggle in `SettingsDrawer`.

### Translation sources to wire up (Deadly Sins of Evil novels)

Each of these is a Tumblr fan translation, same shape as the Praeludium / Praefacio sources. Use the existing pipeline (curl directory → parse posts → assemble chapter markdowns → fixture + loader + library entry). Drop cover/illustrations into the matching `public/<slug>/` when available.

- ✅ **The Lunacy of Duke Venomania** — https://pokkoo-shuu.tumblr.com/thelunacyofdukevenomania
- **Evil Food Eater Conchita** — https://theevilfoodeaterconchita.tumblr.com/post/729399445695889408/directory
- **Gift from the Princess Who Brought Sleep** — https://giftfromthesleepprincess.tumblr.com/post/729399840750125056/directory
- **Fifth Pierrot** — https://thefifthclown.tumblr.com/directory
- **The Tailor of Enbizaka** — https://thetailorofenbizaka.tumblr.com/directory
- **Judgment of Corruption** — https://judgmentofcorruption.tumblr.com/directory
- **The Muzzle of Nemesis** — https://themuzzleofnemesis.tumblr.com/directory
- **Master of the Heavenly Yard** — https://dsoe-masteroftheheavenlyyard.tumblr.com/directory

### Translation sources to wire up (Original Sin Story novels)

- **Original Sin Story: Crime** — https://oss-crime.tumblr.com/directory
- **Original Sin Story: Punishment** — https://oss-punishment.tumblr.com/directory

### Notes

- Markdown body / preview in the editor (`react-markdown` already a dep).

### Settings

- Font family picker, justify/hyphenation, per-volume overrides.

### Discoverability

- **Search** — title-only across volumes / chapters / notes / bookmarks; library-page search box.
- **Keyboard shortcuts** in the reader (`b` bookmark, `n` note, `g` settings, `?` cheatsheet); global discovery dialog.

### Data hygiene

- **Export / import** — one JSON file from the three Dexie tables (`chapterProgress`, `bookmarks`, `notes`). Cheap insurance against site-data clears.

### Artistic touch-ups

### Future: TanStack DB

- Worth considering if we ever add a sync server (multi-device reading, cross-device bookmark sync). Has a Dexie-backed collection adapter, so the migration would be mechanical. Skip for now — local-only personal reader doesn't benefit from the sync engine.

## Resolved

- ✅ Design system — primitives, AppShell, tokens, sin theming
- ✅ Library — series grid, volume cards, chapter list
- ✅ Reader core — page view, prose renderer, chapter nav
- ✅ Audio dock — YouTube + native audio support, mobile collapse toggle
- ✅ Thematic polish — sin glyphs, clockwork spinner, ornaments
- ✅ Dark mode — aged-leather palette via `next-themes`
- ✅ Deploy — GitHub Pages via Actions
- ✅ Mobile fixes — series page overflow (song list `truncate` → `line-clamp-1`)
- ✅ Persistence (roadmap #4) — Dexie schema (`chapterProgress`, `bookmarks`, `notes`)
- ✅ Reading progress — IntersectionObserver auto-track, live aggregate on cards / volume page; manual "Mark complete" / "Reset" controls per chapter and per volume
- ✅ Continue Reading drawer — top-nav, lists in-progress volumes, deep-links to last chapter / page (filter on raw `pagesRead` to handle tiny prologues that round to 0%)
- ✅ Bookmarks — per-page toggle, top-nav drawer, `#page-N` deep-link with smooth scroll, inline rename
- ✅ Notes — per-page editor dialog (Cmd/Ctrl+Enter saves; empty deletes), top-nav drawer, `#page-N` deep-link
- ✅ Reader settings (roadmap #5) — `SettingsDrawer` with font-size / line-height / reader-width sliders, live preview, reset; scoped to chapter prose via CSS vars + new `text-style-reader-prose` utility
- ✅ Continue Reading on home page — top-3 in-progress cards above "Open Library", deep-link to last chapter / page (sin-tinted progress bar)
- ✅ Next-chapter CTA — large card at the end of a chapter above the existing `ChapterNav` (only renders when there's a next chapter)
- ✅ Per-chapter annotation chips — small bookmark/note count chips next to each chapter on the volume page (one Dexie query at the list level, hidden on mobile to keep the row compact)
