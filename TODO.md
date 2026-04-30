# TODO

## Persistence (roadmap #4)

- ✅ Dexie set up (`src/lib/db.ts`), `chapterProgress` table, auto-tracked via IntersectionObserver in the reader
- Bookmarks — `bookmarks` table (volumeId, chapterId, pageIndex, label, createdAt)
- Notes — `notes` table (volumeId, chapterId, pageIndex, body, createdAt, updatedAt)
- Manual "mark chapter complete" + reset-progress controls (no UI yet)

### Future: TanStack DB

- Worth considering if we ever add a sync server (multi-device reading, cross-device bookmark sync)
- Has a Dexie-backed collection adapter, so the migration would be mechanical
- Skip for now — local-only personal reader doesn't benefit from the sync engine

## Reader tools (roadmap #5)

- `SettingsPanel` — theme (already done) + font size + line-height + reader width
- `BookmarksPanel` — list bookmarks across volume / current chapter, jump-to
- `NotesPanel` — note list, edit, delete; per-page anchored notes
- All three live in a Drawer triggered from a TopBar `Gear` icon

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
