# TODO

## Waltz of Evil databook

- Companion guidebook to the Deadly Sins of Evil series (_Aku no Taizai Tairiku Kanzen Kaisetsu Sho ~Aku no Enbukyoku~_). Worth adding alongside the eight novels — likely fits as a non-fiction volume under the `deadly-sins-of-evil` series, or as its own entry if it bridges other arcs. Confirm scope (TOC / sections) before deciding structure.

## Short stories tied to existing series

Full short-story catalog from the wiki's [Category:Short Stories](https://theevilliouschronicles.fandom.com/wiki/Category:Short_Stories), grouped by the existing `series` entry each one slots into. Open question: render as a `Volume`-shaped entry, or introduce a lighter-weight "short story" type? Leaning toward the former for consistency, with a flag/tag to mark them as shorts (and possibly a separate "Side stories" section on each series page).

- **The Daughter of Evil**
  - Her Reason (_Aku no Musume: Kanojo no Riyuu_)
  - The Daughter of Evil: Retrouver of Silver
  - The Daughter of Evil: Graduation
  - The Daughter of Evil: Illustration Story
  - The Daughter of Evil: Novelette of White
  - The Daughter of Evil: The Doll Festival
  - Twiright Prank (story)
  - The Adventure of a Boy and a Girl — bundled with _Entr'acte of Evil: The Daughter of Evil Worldguide_ (2011-08-30); Avadonia siblings rescue Chartette from the Lost Woods
  - The Demonic Twin Blades — bundled with the _Clôture of Yellow_ online release (2017-11-02); blacksmith Langley and the Vessel of Envy
  - Song of the Black Bird — bundled with the _Wiegenlied of Green_ e-book (2017-12-07); Lich Arklow's first meeting with Banica Conchita
  - The Daughter of Fog — from _Epic of Evil: The Daughter of Evil Fanbook_ (2012-08-26); Gast Venom backstory and the Vessel of Wrath
  - The Horse of Evil (story) and The Horse of Evil (manga short) — both 2022-08-23, from the Kagamine Rin & Len 14th Birthday Novels / Comics anthologies; Riliane's horse Josephine
- **Deadly Sins of Evil**
  - Welcome to Conchita Dining Room (gluttony / Conchita)
  - E.A.T Prologue (story) (gluttony)
  - Evil Food Eater Conchita: Setsubun (gluttony)
  - Gloom of Held — bundled with _Evil Food Eater Conchita_ (2013-09-24); Held meets Elluka and Irina Clockworker
  - The Lunacy of Duke Venomania: Valentine's Day (lust)
  - Gift Bonus Story (sloth / Princess Sleep)
  - Gift from the Princess who Brought Sleep (manga short) (sloth)
  - Fifth Pierrot (manga short)
  - Pierrot & SCP Bonus Story (Pierrot × Seven Crimes and Punishments crossover)
  - Judgment of Corruption Side Story: Gallerian (greed)
  - Heavenly Yard (story) (finale)
  - Outlaw & Lychgate (finale)
  - Deadly Sins of Evil (manga) — separate manga adaptation, may warrant its own bucket
- **Original Sin Story**
  - Original Sin Story: To
  - Moonlit Bear (story)
  - Tale of Abandonment on a Moonlit Night (story)
- **Clockwork Lullaby**
  - Seven Crimes and Punishments (story)
- **Companion / cross-series**
  - Waltz of Evil Bonus Stories — ships with the _Waltz of Evil_ databook (see section above)

## Story of Evil series (2 volumes)

- Separate light-novel series from _The Daughter of Evil_ — set in the **Fourth Period** (modern-day Japan, Tsuruki City), the post-rebirth era after Allen & Riliane's reset. Not a retelling; closer to a successor arc that follows the cycle into a new world. Should get its own `series` entry (suggested id: `story-of-evil`), distinct from `the-daughter-of-evil`.
- Volumes (both written by Akuno-P / mothy, illustrated by Yuzuki Kihiro, published by PHP):
  - **Story of Evil: The Paper Demon and the Secret Archive** — released 2018-02-18. Itsuki uncovers his uncle's secret archive and inadvertently forges a contract with the demon Marie.
  - **Story of Evil: The Twilight Demon and the False Queen** — released 2018-07-11. Hadzuki Mana finds a clockwork ram, names it Deus after forging a contract, and gains powers that draw the boys in her class.
- Themes: "Paper Demons" and "Clockwork Demons", witching-hour magic. Likely cross-references to existing songs/characters in the catalog — confirm `songIds` mapping when wiring up.

## Future: TanStack DB

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
