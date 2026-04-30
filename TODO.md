# TODO

## Persistence (roadmap #4)

- ✅ Dexie set up (`src/lib/db.ts`), `chapterProgress` table, auto-tracked via IntersectionObserver in the reader
- ✅ Bookmarks — `bookmarks` table, per-page toggle in reader, top-nav drawer with deep-link to `#page-N`, inline rename
- ✅ Manual progress controls — per-chapter "Mark complete" / "Reset progress" overflow menu in chapter list; per-volume "Mark all" / "Reset all" next to the volume progress bar
- ✅ Notes — `notes` table, per-page note editor dialog, top-nav drawer, deep-link to `#page-N`
- Notes: markdown body / preview (currently plain text)

### Future: TanStack DB

- Worth considering if we ever add a sync server (multi-device reading, cross-device bookmark sync)
- Has a Dexie-backed collection adapter, so the migration would be mechanical
- Skip for now — local-only personal reader doesn't benefit from the sync engine

## Reader tools (roadmap #5)

- `SettingsPanel` — theme (already done) + font size + line-height + reader width

## Artistic touch-ups

- **Home page** — make it look like the cover of an old leather-bound book (texture, embossed title, raised hub bands maybe via SVG)
- **Reader pages** — style the prose pages to feel like old rotten paper (paper-grain texture, slight yellowing/foxing, maybe a vignette at the edges)

## Resolved

- ✅ Design system — primitives, AppShell, tokens, sin theming
- ✅ Library — series grid, volume cards, chapter list
- ✅ Reader core — page view, prose renderer, chapter nav
- ✅ Audio dock — YouTube + native audio support
- ✅ Thematic polish — sin glyphs, clockwork spinner, ornaments
- ✅ Dark mode — aged-leather palette via `next-themes`
- ✅ Deploy — GitHub Pages via Actions
- ✅ Mobile fixes — series page overflow (song list `truncate` → `line-clamp-1`), audio dock collapse toggle
- ✅ Reading progress — Dexie + IntersectionObserver, live aggregate on cards/volume page
- ✅ Bookmarks — per-page toggle, top-nav drawer (home + app shell), `#page-N` deep-link with smooth scroll
