# TODO

### Translation sources to wire up (Deadly Sins of Evil novels)

Each of these is a Tumblr fan translation, same shape as the Praeludium / Praefacio sources. Use the existing pipeline (curl directory → parse posts → assemble chapter markdowns → fixture + loader + library entry). Drop cover/illustrations into the matching `public/<slug>/` when available.

- ✅ **The Lunacy of Duke Venomania** — https://pokkoo-shuu.tumblr.com/thelunacyofdukevenomania
- ✅ **Evil Food Eater Conchita** — https://theevilfoodeaterconchita.tumblr.com/post/729399445695889408/directory
- ✅ **Gift from the Princess Who Brought Sleep** — https://giftfromthesleepprincess.tumblr.com/post/729399840750125056/directory
- ✅ **Fifth Pierrot** — https://thefifthclown.tumblr.com/directory
- ✅ **The Tailor of Enbizaka** — https://thetailorofenbizaka.tumblr.com/directory
- ✅ **Judgment of Corruption** — https://judgmentofcorruption.tumblr.com/directory
- **The Muzzle of Nemesis** — https://themuzzleofnemesis.tumblr.com/directory
- **Master of the Heavenly Yard** — https://dsoe-masteroftheheavenlyyard.tumblr.com/directory

### Reader / content

- **Chapter track list** — render `Chapter.songIds` as a "tracks in this chapter" list (schema already populated, no UI surface yet).

### Notes

- Markdown body / preview in the editor (`react-markdown` already a dep).

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
- ✅ Offline reading — per-volume download with progress, force-resync to bypass stale SW cache, online/offline detection. Writes the `ec-chapters` cache directly so it works in dev without an active SW.
- ✅ Backup & restore — versioned JSON export covering all four Dexie tables + reader settings; import via paste or QR scan with newest-wins merge. `QRCode` and `QRScanner` shipped as reusable primitives with demo pages. **UI gated**: drawer/dialogs/codec live in tree (`data-export.ts`, `data-import.ts`, `data-codec.ts`, `data-drawer.tsx`, `export-dialog.tsx`, `import-dialog.tsx`) but the menu entries are removed pending a transport that scales beyond a single QR (multi-QR chunking or WebRTC handshake — TBD). Re-enabling means: import `DataDrawer`, restore `dataOpen` state + the two `Menu.Item` entries + the `<DataDrawer>` mount in `app-shell.tsx`.
- ✅ Volume detail over-fetch fix — `VolumeBundle` split into `meta()` (sync, manifest-only) and `chapter(id)` (one chapter's worth of fetches). Volume page entry costs zero `.md` fetches now; reader fetches one chapter at a time.
- ✅ Chapter manifest as runtime JSON — replaced the build-time virtual module with a `chapter-manifest.json` served by middleware in dev / emitted into `dist/` for prod, fetched once at boot. Adding chapter `.md` files no longer requires a JS rebuild.
- ✅ Lighthouse CI — `treosh/lighthouse-ci-action@v12` workflow on PRs and pushes to master, accessibility threshold at 0.95 (error), perf/SEO/best-practices at warn level.
- ✅ Site-wide search — Cmd/Ctrl+K command palette in `AppShell` covering volumes (English + Japanese + romanized titles), chapters, songs (selecting plays via the audio dock), and characters (name / aliases / japanese name / romaji / vocaloid). Sectioned results, default browse list when empty, footer kbd hint ("Go to page" / "Play" depending on row kind). Documented at `/components/search`.
- ✅ Reader font family picker (Serif / Sans) and justify-text toggle in `SettingsDrawer`. Justify and auto-hyphenation flip together via shared CSS vars (`--reader-font-family`, `--reader-text-align`, `--reader-hyphens`); choices persist alongside the existing reader settings in `localStorage`.
- ✅ Page scene-track cue — `Page.songCue` surfaces in the audio dock as a tap-to-play teaser when nothing's playing, an "Up next" switch line when a different song is playing, and a "Scene track" badge when the cue matches the current track. Highlight-only, no autoplay (sidesteps browser autoplay policy and avoids surprising readers). New `cuedSong` / `setCue` on the audio context; the page route sets/clears the cue on mount.
