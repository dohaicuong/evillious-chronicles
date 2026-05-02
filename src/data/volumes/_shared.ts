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
} from "@src/data/schema";

const ILLUSTRATION_RE = /^\s*<!--\s*illustration:\s*([\w-]+)\s*-->\s*$/;

/**
 * Builds a chapter's pages from per-page raw markdown strings. Each input is
 * one page in reading order: either prose, or a single line of the form
 * `<!-- illustration: illustration-N -->` that resolves against the supplied
 * `illustrations` map.
 *
 * Each volume calls `makePagesBuilder(illustrations)` once, then invokes the
 * returned function with the page strings (typically loaded via
 * `loadPagesGlob` over a per-chapter directory of NN.md files).
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

/**
 * Sort a Vite glob's eager `?raw` map by file path so per-chapter pages
 * (`01.md`, `02.md`, …) come back in reading order regardless of the engine's
 * Object enumeration semantics.
 */
export function loadPagesGlob(glob: Record<string, string>): string[] {
  return Object.keys(glob)
    .sort()
    .map((k) => glob[k]!);
}

// Pre-collect every chapter markdown across every volume in one Vite glob
// call. Vite needs the call site to be literal (it's a compile-time transform),
// so the verbose `eager / query / import` triple lives here once instead of
// being repeated at every chapter declaration. The `Chapter()` factory then
// just slices this map by path prefix.
const ALL_PAGES = import.meta.glob("./*/chapters/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

type ChapterProps = {
  id: string;
  number: number;
  title: string;
  // Path prefix (relative to `src/data/volumes/`) of the chapter's page
  // directory — e.g. `"./venomania/chapters/01-ch1"`. All `.md` files under
  // that directory load in lexical order.
  pages: string;
  illustrations: Record<string, ImageAsset>;
};

/**
 * Single-call chapter factory. Looks up every page file under the supplied
 * path prefix in the pre-collected `ALL_PAGES` map, sorts them into reading
 * order, parses each (prose vs. `<!-- illustration: id -->` directives) using
 * the supplied illustrations, and returns the `Chapter` shape consumed by the
 * reader.
 */
export function Chapter({ id, number, title, pages, illustrations }: ChapterProps): ChapterType {
  const prefix = pages.endsWith("/") ? pages : `${pages}/`;
  const matched: Record<string, string> = {};
  for (const [path, content] of Object.entries(ALL_PAGES)) {
    if (path.startsWith(prefix)) matched[path] = content;
  }
  const ordered = loadPagesGlob(matched);
  return {
    id,
    number,
    title,
    pages: makePagesBuilder(illustrations)(...ordered),
  };
}

// Chapter declaration inside a Volume — the volume provides the illustrations,
// so each chapter just supplies id / number / title / pages-prefix.
export type VolumeChapter = Omit<ChapterProps, "illustrations">;

type VolumeProps = {
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

  // Illustrations referenced by `<!-- illustration: id -->` directives across
  // every chapter / afterword in this volume. Hoisted to volume level so each
  // chapter declaration stays minimal.
  chapterIllustration: Record<string, ImageAsset>;
  chapter: VolumeChapter[];
  afterword?: VolumeChapter;
};

/**
 * Volume factory — builds the schema's `Volume` shape from a flatter input.
 * Bundles the per-chapter illustrations once at volume scope, so each entry
 * in `chapter` (and the optional `afterword`) just declares its id / number /
 * title / pages-prefix and skips re-passing the illustration map.
 */
export function Volume(props: VolumeProps): VolumeType {
  const { chapterIllustration, chapter, afterword, ...rest } = props;
  return {
    ...rest,
    chapters: chapter.map((c) => Chapter({ ...c, illustrations: chapterIllustration })),
    ...(afterword
      ? { afterword: Chapter({ ...afterword, illustrations: chapterIllustration }) }
      : {}),
  };
}
