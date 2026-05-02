import { fileURLToPath } from "node:url";
import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import { aliasCacheGuardPlugin } from "./vite-plugins/alias-cache-guard.ts";
import { chapterManifestPlugin } from "./vite-plugins/chapter-manifest.ts";
import { fontPreloadPlugin } from "./vite-plugins/font-preload.ts";
import { pwaSetupPlugin } from "./vite-plugins/pwa-setup.ts";

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves the site under /<repo-name>/. The deploy workflow sets
  // BASE_URL accordingly; locally it falls back to "/".
  base: process.env.BASE_URL ?? "/",
  // Path aliases — keep in sync with tsconfig.app.json compilerOptions.paths.
  resolve: {
    alias: {
      "@src": fileURLToPath(new URL("./src", import.meta.url)),
      "@app": fileURLToPath(new URL("./src/routes/_app", import.meta.url)),
    },
  },
  staged: {
    "*": "vp check --fix",
  },
  fmt: { ignorePatterns: ["src/routeTree.gen.ts"] },
  lint: {
    ignorePatterns: ["src/routeTree.gen.ts"],
    options: { typeAware: true, typeCheck: true },
  },
  plugins: [
    aliasCacheGuardPlugin(),
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    chapterManifestPlugin(),
    pwaSetupPlugin(),
    fontPreloadPlugin([
      // Body text — EB Garamond regular, the only weight rendered on first
      // paint. Italic / 500 / 600 cuts swap in lazily once their callsites
      // mount and don't need preloading.
      /eb-garamond-latin-400-normal-[^/]+\.woff2$/,
      // UI captions / eyebrow labels — Inter regular. 500 / 600 are used
      // for in-page UI weight only and aren't on the LCP path.
      /inter-latin-400-normal-[^/]+\.woff2$/,
    ]),
  ],
});
