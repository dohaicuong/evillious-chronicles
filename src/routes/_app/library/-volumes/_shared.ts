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
import chapterManifest from "virtual:chapter-manifest";

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

/**
 * Manifest-driven directory listing for chapter pages. The chapter `.md`
 * content lives in `public/` (served as static assets, not bundled) so we
 * can't use Vite's `import.meta.glob` to enumerate them. The Vite plugin
 * `chapterManifestPlugin` scans `public/*\/chapters/**\/*.md` at build time
 * and exposes the listing as a virtual module.
 */
function pagesUnder(prefix: string): string[] {
  // Strip leading "./" and trailing "/" — manifest keys are public-relative
  // paths like "venomania/chapters/01-ch1".
  const key = prefix.replace(/^\.?\//, "").replace(/\/$/, "");
  return chapterManifest[key] ?? [];
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
  // are listed in `virtual:chapter-manifest` and fetched at runtime.
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

  chapterIllustration: Record<string, ImageAsset>;
  chapter: VolumeChapter[];
  afterword?: VolumeChapter;
};

/**
 * Volume factory — builds the schema's `Volume` shape from a flatter input.
 * Bundles the per-chapter illustrations once at volume scope, then resolves
 * every chapter (and the optional afterword) by fetching their markdown
 * pages in parallel from `public/`.
 */
export async function Volume(props: VolumeProps): Promise<VolumeType> {
  const { chapterIllustration, chapter, afterword, ...rest } = props;
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
