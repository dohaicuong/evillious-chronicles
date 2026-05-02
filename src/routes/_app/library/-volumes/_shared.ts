import type {
  ArtworkPage,
  Chapter as ChapterType,
  ImageAsset,
  Page,
  Poetry,
  Sin,
  TitlePage,
  Translation,
  Volume as VolumeType,
} from "@src/lib/schema";
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

export type VolumeManifest = {
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

  description?: string;
  publishedYear?: number;
  isbn?: string;
  translation?: Translation;

  chapterIllustration: Record<string, ImageAsset>;
  chapter: VolumeChapter[];
  afterword?: VolumeChapter;
};

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

function deriveSlim(m: VolumeManifest): SlimVolume {
  return {
    id: m.id,
    number: m.number,
    title: m.title,
    sin: m.sin,
    chapters: [
      ...m.chapter.map((c) => slimChapter(c)),
      ...(m.afterword ? [slimChapter(m.afterword, "afterword")] : []),
    ],
  };
}

async function deriveFull(m: VolumeManifest): Promise<VolumeType> {
  const { chapterIllustration, chapter, afterword, ...rest } = m;
  const chapters = await Promise.all(
    chapter.map((c) => Chapter({ ...c, illustrations: chapterIllustration })),
  );
  const afterwordResolved = afterword
    ? await Chapter({ ...afterword, illustrations: chapterIllustration })
    : undefined;
  return {
    ...rest,
    chapters,
    ...(afterwordResolved ? { afterword: afterwordResolved } : {}),
  };
}

export type VolumeBundle = {
  manifest: VolumeManifest;
  /** Sync slim metadata for catalogs (library, series page, chapter list). */
  slim: SlimVolume;
  /** Lazy async resolver for the full Volume — fetches every chapter's pages. */
  full: () => Promise<VolumeType>;
};

/**
 * Volume factory — single source of truth for one volume. Returns a bundle
 * exposing both views derived from the manifest:
 *  - `slim` (sync) for catalogs that only need metadata + page-counts.
 *  - `full()` (async) for the page reader, which awaits every chapter's
 *    markdown content from `public/`.
 *
 * The `-library.ts` slim catalog and the `-volumes/index.ts` lazy registry
 * both consume the same bundle, so titles, ids, sin, page-counts can't drift.
 */
export function Volume(manifest: VolumeManifest): VolumeBundle {
  return {
    manifest,
    slim: deriveSlim(manifest),
    full: () => deriveFull(manifest),
  };
}
