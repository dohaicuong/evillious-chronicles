# TODO

## Pending

### Reader / content

- **Audio cues** — wire `Page.songCue` to the audio dock. Schema already in place at three levels (no changes needed): `Series.songIds` (rendered on series page), `Chapter.songIds` (a "tracks in this chapter" list — not rendered yet), `Page.songCue` (single id, intended to pin/highlight the song in the dock when the page is reached). Plan: IntersectionObserver on the page like progress; opt-in via a new `autoplaySongCues` toggle in `SettingsDrawer`.
- **Per-chapter annotation chips** on the volume page — small chips next to each chapter showing bookmark / note counts.

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

- **Home page** — old leather-bound book cover (texture, embossed title, raised hub bands via SVG).
- **Reader pages** — old rotten paper feel (paper grain, yellowing/foxing, vignette). Watch the dark-mode palette interaction.

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
- ✅ Continue Reading on home page — top-3 in-progress cards above "Open the Library", deep-link to last chapter / page (sin-tinted progress bar)
- ✅ Next-chapter CTA — large card at the end of a chapter above the existing `ChapterNav` (only renders when there's a next chapter)
