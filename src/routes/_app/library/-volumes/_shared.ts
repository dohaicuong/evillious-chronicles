import type {
  ArtworkPage,
  Chapter as ChapterType,
  ImageAsset,
  Page,
  Poetry,
  Sin,
  TitlePage,
  Translation,
} from "@src/lib/schema";
import { asset } from "@src/lib/asset";
import { getChapterManifest } from "@src/lib/chapter-manifest";

const ILLUSTRATION_RE = /^\s*<!--\s*illustration:\s*([\w-]+)\s*-->\s*$/;

/**
 * Builds a chapter's pages from per-page raw markdown strings. Each input is
 * one page in reading order: either prose, or a single line of the form
 * `<!-- illustration: illustration-N -->` that resolves against the supplied
 * `illustrations` map.
 */
export function makePagesBuilder(illustrations: Record<string, ImageAsset>) {
  return (...rawPages: string[]): Page[] =>
    rawPages.map((raw, i) => {
      const trimmed = raw.trim();
      const m = trimmed.match(ILLUSTRATION_RE);
      if (m) {
        const id = m[1]!;
        const illustration = illustrations[id];
        if (!illustration) throw new Error(`Unknown illustration "${id}"`);
        return { number: i + 1, layout: "illustration", illustration };
      }
      return { number: i + 1, layout: "prose", text: trimmed };
    });
}

// Manifest-driven directory listing for chapter pages. The chapter `.md`
// content lives in `public/` (served as static assets, not bundled). The
// Vite plugin `chapterManifestPlugin` scans `public/<slug>/chapters/...md`
// and serves the listing as `chapter-manifest.json`, fetched at boot.
function pagesUnder(prefix: string): string[] {
  // Strip leading "./" and trailing "/" — manifest keys are public-relative
  // paths like "venomania/chapters/01-ch1".
  const key = prefix.replace(/^\.?\//, "").replace(/\/$/, "");
  return getChapterManifest()[key] ?? [];
}

export function pageCountUnder(prefix: string): number {
  return pagesUnder(prefix).length;
}

// Same URL shape as the runtime fetch in `Chapter()` — keeps the offline
// pre-fetcher and the reader fetcher pointed at identical URLs so the SW
// cache key matches.
function urlsUnder(prefix: string): string[] {
  const dirKey = prefix.replace(/^\.?\//, "").replace(/\/$/, "");
  return pagesUnder(prefix).map((name) => `${import.meta.env.BASE_URL}${dirKey}/${name}`);
}

type ChapterProps = {
  id: string;
  number: number;
  title: string;
  // Path prefix (relative to `public/`) of the chapter's page directory —
  // e.g. `"./venomania/chapters/01-ch1"`. All `.md` files under that path
  // are listed in `chapter-manifest.json` and fetched at runtime.
  pages: string;
  songIds?: string[];
  illustrations: Record<string, ImageAsset>;
};

/**
 * Single-call chapter factory. Reads the manifest entry for the supplied
 * path prefix, fetches each `.md` file from the public origin in reading
 * order, parses each (prose vs. `<!-- illustration: id -->` directive) using
 * the supplied illustrations, and resolves to the schema's `Chapter` shape.
 */
export async function Chapter({
  id,
  number,
  title,
  pages,
  songIds,
  illustrations,
}: ChapterProps): Promise<ChapterType> {
  const dirKey = pages.replace(/^\.?\//, "").replace(/\/$/, "");
  const filenames = pagesUnder(pages);
  const ordered = await Promise.all(
    filenames.map(async (name) => {
      const url = `${import.meta.env.BASE_URL}${dirKey}/${name}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
      return res.text();
    }),
  );
  return {
    id,
    number,
    title,
    pages: makePagesBuilder(illustrations)(...ordered),
    ...(songIds ? { songIds } : {}),
  };
}

// Chapter declaration inside a Volume — the volume provides the illustrations,
// so each chapter just supplies id / number / title / pages-prefix.
export type VolumeChapter = Omit<ChapterProps, "illustrations">;

// ---------------------------------------------------------------------------
// Volume manifest split: slim (in TS bundle) vs. heavy (in public JSON).
// ---------------------------------------------------------------------------
//
// Slim — everything search, continue-reading, and the catalog need to render
// synchronously. Stays in the TS bundle so those features keep working
// without an async load.
//
// Heavy — hero / poetry / gallery / illustration metadata that's only needed
// once the user opens a volume. Lives in `public/<slug>/manifest.json`,
// fetched lazily and memoized per slug.

export type VolumeSlim = {
  id: string;
  slug: string;
  number: number;

  title: string;
  originalTitle?: string;
  romanizedTitle?: string;

  sin: Sin | null;
  series: string;

  // Public asset directory for this volume — where `manifest.json`, cover,
  // gallery, illustrations, and chapter `.md` files live under `public/`.
  // Defaults to `slug` when omitted; set explicitly when slug and dir name
  // diverge (e.g. slug `princess-sleep` ↔ dir `sleep-princess`).
  publicDir?: string;

  chapter: VolumeChapter[];
  afterword?: VolumeChapter;
};

export type VolumeHeavy = {
  subtitle?: string;

  cover: ImageAsset;
  titlePage?: TitlePage;
  openingPoetry?: Poetry;
  openingGallery?: ArtworkPage[];
  closingGallery?: ArtworkPage[];

  description?: string;
  publishedYear?: number;
  isbn?: string;
  translation?: Translation;

  chapterIllustration: Record<string, ImageAsset>;
};

// Back-compat input shape: heavy fields can be passed inline alongside slim
// during the migration. Once every volume is migrated, callers will pass
// only `VolumeSlim` and the factory will lazy-fetch heavy.
export type VolumeArgs = VolumeSlim & Partial<VolumeHeavy>;

// Slim catalog shapes — minimal metadata used by the library / series cards
// / chapter list, with no chapter content. Co-located here so the library
// catalog can be derived from each volume manifest in one place.
export type SlimChapter = {
  id: string;
  number: number;
  title: string;
  pageCount: number;
  kind?: "afterword";
};

export type SlimVolume = {
  id: string;
  number: number;
  title: string;
  // Carried into slim so synchronous catalogs (e.g. site-wide search) can
  // match Japanese / romanized volume titles without `meta()` resolution.
  originalTitle?: string;
  romanizedTitle?: string;
  sin: Sin | null;
  chapters: SlimChapter[];
};

function slimChapter(c: VolumeChapter, kind?: "afterword"): SlimChapter {
  // `pageCount` is a getter so slim derivation can run at module-load time —
  // before `loadChapterManifest()` resolves — without baking in an empty
  // count. Each access reads the current in-memory manifest.
  return {
    id: c.id,
    number: c.number,
    title: c.title,
    get pageCount() {
      return pageCountUnder(c.pages);
    },
    ...(kind ? { kind } : {}),
  };
}

function deriveSlim(s: VolumeSlim): SlimVolume {
  return {
    id: s.id,
    number: s.number,
    title: s.title,
    ...(s.originalTitle ? { originalTitle: s.originalTitle } : {}),
    ...(s.romanizedTitle ? { romanizedTitle: s.romanizedTitle } : {}),
    sin: s.sin,
    chapters: [
      ...s.chapter.map((c) => slimChapter(c)),
      ...(s.afterword ? [slimChapter(s.afterword, "afterword")] : []),
    ],
  };
}

// Volume detail / hero metadata — every Volume field except resolved chapter
// content. `chapters` and `afterword` carry the slim chapter list (id /
// number / title / pageCount / kind) so the chapter list and adjacency math
// keep working without fetching any `.md` content.
export type VolumeMeta = {
  id: string;
  slug: string;
  number: number;

  title: string;
  originalTitle?: string;
  romanizedTitle?: string;
  subtitle?: string;

  sin: Sin | null;
  series: string;

  cover: ImageAsset;
  titlePage?: TitlePage;
  openingPoetry?: Poetry;
  openingGallery?: ArtworkPage[];
  closingGallery?: ArtworkPage[];

  chapters: SlimChapter[];
  afterword?: SlimChapter;

  description?: string;
  publishedYear?: number;
  isbn?: string;
  translation?: Translation;
};

function deriveMeta(s: VolumeSlim, h: VolumeHeavy): VolumeMeta {
  // `chapterIllustration` is reader-only and not part of `VolumeMeta`.
  const { chapterIllustration: _ill, ...heavyForMeta } = h;
  return {
    id: s.id,
    slug: s.slug,
    number: s.number,
    title: s.title,
    ...(s.originalTitle ? { originalTitle: s.originalTitle } : {}),
    ...(s.romanizedTitle ? { romanizedTitle: s.romanizedTitle } : {}),
    sin: s.sin,
    series: s.series,
    ...heavyForMeta,
    chapters: s.chapter.map((c) => slimChapter(c)),
    ...(s.afterword ? { afterword: slimChapter(s.afterword, "afterword") } : {}),
  };
}

async function deriveChapter(
  s: VolumeSlim,
  h: VolumeHeavy,
  chapterId: string,
): Promise<ChapterType> {
  const target =
    s.chapter.find((c) => c.id === chapterId) ??
    (s.afterword?.id === chapterId ? s.afterword : undefined);
  if (!target) throw new Error(`Unknown chapter "${chapterId}" in volume "${s.id}"`);
  return Chapter({ ...target, illustrations: h.chapterIllustration });
}

export type VolumeBundle = {
  /** Sync slim metadata for catalogs (library, series page, chapter list). */
  slim: SlimVolume;
  /**
   * Async volume metadata for the volume detail page — hero, poetry, gallery,
   * title page, plus the slim chapter list. Awaits the heavy manifest (inline
   * during migration; lazy-fetched from `public/<slug>/manifest.json` once
   * the volume's TS file no longer carries heavy fields).
   */
  meta: () => Promise<VolumeMeta>;
  /** Lazy async resolver for one chapter's pages — single chapter's worth of fetches. */
  chapter: (chapterId: string) => Promise<ChapterType>;
  /**
   * All chapter `.md` URLs for this volume in reading order. Same URL shape
   * as the runtime reader, so pre-fetching these populates the SW's
   * `ec-chapters` cache for offline reads. Sync — paths come from slim.
   */
  chapterUrls: () => string[];
  /**
   * Cover, gallery (opening + closing), and chapter-illustration image
   * URLs — everything `<img>` rendering needs offline. Resolved via
   * `asset()` so the URLs match exactly what the browser requests when
   * the corresponding `<img>` mounts. Async because the heavy manifest is
   * lazy-loaded for migrated volumes.
   */
  imageUrls: () => Promise<string[]>;
};

// Heavy fields mounted inline on the args object — non-empty when the volume
// hasn't been migrated yet. We treat the presence of `cover` (the only
// strictly-required heavy field) as the signal.
function inlineHeavy(args: VolumeArgs): VolumeHeavy | null {
  if (!args.cover) return null;
  return {
    ...(args.subtitle !== undefined ? { subtitle: args.subtitle } : {}),
    cover: args.cover,
    ...(args.titlePage ? { titlePage: args.titlePage } : {}),
    ...(args.openingPoetry ? { openingPoetry: args.openingPoetry } : {}),
    ...(args.openingGallery ? { openingGallery: args.openingGallery } : {}),
    ...(args.closingGallery ? { closingGallery: args.closingGallery } : {}),
    ...(args.description !== undefined ? { description: args.description } : {}),
    ...(args.publishedYear !== undefined ? { publishedYear: args.publishedYear } : {}),
    ...(args.isbn !== undefined ? { isbn: args.isbn } : {}),
    ...(args.translation ? { translation: args.translation } : {}),
    chapterIllustration: args.chapterIllustration ?? {},
  };
}

function heavyManifestUrl(slim: VolumeSlim): string {
  return `${import.meta.env.BASE_URL}${slim.publicDir ?? slim.slug}/manifest.json`;
}

/**
 * Volume factory — single source of truth for one volume. Returns a bundle
 * with three views derived from a slim TS object plus a heavy manifest:
 *
 *  - `slim` (sync) for catalogs that only need metadata + page-counts.
 *  - `meta()` (async) for the volume detail page. Heavy metadata is either
 *    passed inline (back-compat during migration) or lazily fetched from
 *    `public/<slug>/manifest.json` and memoized.
 *  - `chapter(id)` (async) for the page reader — fetches one chapter's pages.
 *
 * Routes consume the same bundle, so titles, ids, sin, page-counts can't drift.
 */
export function Volume(args: VolumeArgs): VolumeBundle {
  // Strip heavy fields off the args so `slim` is exactly the slim shape.
  const {
    subtitle: _s,
    cover: _c,
    titlePage: _tp,
    openingPoetry: _op,
    openingGallery: _og,
    closingGallery: _cg,
    description: _d,
    publishedYear: _py,
    isbn: _isbn,
    translation: _tr,
    chapterIllustration: _ci,
    ...slim
  } = args;

  const inline = inlineHeavy(args);

  let cachedHeavy: Promise<VolumeHeavy> | undefined;
  function getHeavy(): Promise<VolumeHeavy> {
    if (inline) return Promise.resolve(inline);
    cachedHeavy ??= (async () => {
      const url = heavyManifestUrl(slim);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
      return (await res.json()) as VolumeHeavy;
    })();
    return cachedHeavy;
  }

  return {
    slim: deriveSlim(slim),
    meta: async () => deriveMeta(slim, await getHeavy()),
    chapter: async (chapterId) => deriveChapter(slim, await getHeavy(), chapterId),
    chapterUrls: () => {
      const all = slim.chapter.flatMap((c) => urlsUnder(c.pages));
      return slim.afterword ? [...all, ...urlsUnder(slim.afterword.pages)] : all;
    },
    imageUrls: async () => {
      const heavy = await getHeavy();
      // Set-deduped: chapterIllustration entries can be referenced by
      // multiple chapters but the underlying URL only needs caching once.
      const urls = new Set<string>();
      urls.add(asset(heavy.cover.src));
      for (const a of heavy.openingGallery ?? []) urls.add(asset(a.illustration.src));
      for (const a of heavy.closingGallery ?? []) urls.add(asset(a.illustration.src));
      for (const ill of Object.values(heavy.chapterIllustration)) {
        urls.add(asset(ill.src));
      }
      return Array.from(urls);
    },
  };
}
