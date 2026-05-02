/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/react" />

declare module "*.md?raw" {
  const content: string;
  export default content;
}

declare module "virtual:chapter-manifest" {
  // Maps a public-relative chapter directory ("venomania/chapters/01-ch1")
  // to the lexicographically-sorted list of its `.md` filenames.
  const manifest: Record<string, string[]>;
  export default manifest;
}
