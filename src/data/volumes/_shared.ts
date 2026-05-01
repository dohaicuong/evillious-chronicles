import type { ImageAsset, Page } from "@src/data/schema";

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
