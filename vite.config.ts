import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// Build-time scan of every chapter `.md` under `public/<slug>/chapters/`,
// exposed to the app as `virtual:chapter-manifest`. The chapter `.md` files
// live in `public/` so they're served as static assets (not bundled); the
// manifest gives the app a reliable directory listing it can iterate at
// runtime to fetch each page.
function chapterManifestPlugin() {
  const VIRTUAL_ID = "virtual:chapter-manifest";
  const RESOLVED_ID = `\0${VIRTUAL_ID}`;
  const publicDir = fileURLToPath(new URL("./public", import.meta.url));

  function buildManifest(): Record<string, string[]> {
    const manifest: Record<string, string[]> = {};
    function walk(dir: string) {
      for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        const stat = statSync(full);
        if (stat.isDirectory()) {
          walk(full);
        } else if (entry.endsWith(".md")) {
          const rel = relative(publicDir, full).replaceAll("\\", "/");
          // rel = "venomania/chapters/00-prologue/01.md"
          const slash = rel.lastIndexOf("/");
          const dirKey = rel.slice(0, slash);
          const file = rel.slice(slash + 1);
          (manifest[dirKey] ??= []).push(file);
        }
      }
    }
    try {
      walk(publicDir);
    } catch {
      // public/ may not exist yet on first run — fine.
    }
    for (const key in manifest) manifest[key]!.sort();
    return manifest;
  }

  return {
    name: "chapter-manifest",
    resolveId(id: string) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
      return null;
    },
    load(id: string) {
      if (id === RESOLVED_ID) {
        return `export default ${JSON.stringify(buildManifest())};`;
      }
      return null;
    },
    handleHotUpdate({
      file,
      server,
    }: {
      file: string;
      server: {
        moduleGraph: {
          getModulesByFile: (id: string) => Set<{ id?: string | null }> | undefined;
          getModuleById: (id: string) => { id?: string | null } | null;
        };
        reloadModule: (mod: unknown) => Promise<void>;
        ws: { send: (payload: { type: string }) => void };
      };
    }) {
      // When a chapter `.md` is added/removed/edited under public/, regenerate
      // the manifest so consumers see the new file list without a full restart.
      if (file.endsWith(".md") && file.includes("/public/")) {
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (mod) {
          void server.reloadModule(mod);
          server.ws.send({ type: "full-reload" });
        }
      }
    },
  };
}

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
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    chapterManifestPlugin(),
    VitePWA({
      // Prompt mode: a new SW waits for explicit user opt-in via the update
      // toast (see PwaUpdateToast). Avoids ripping the page out from under a
      // reader mid-chapter.
      registerType: "prompt",
      // Registration is handled manually through the useRegisterSW hook so we
      // can drive the toast UI from React state.
      injectRegister: false,
      // Static files referenced from index.html / manifest that aren't picked
      // up by globPatterns (which only sweeps the app shell). Listing them
      // here ensures they're precached.
      includeAssets: [
        "favicon.jpg",
        "apple-touch-icon.png",
        "icon-192.png",
        "icon-512.png",
        "robots.txt",
      ],
      manifest: {
        name: "Evillious Chronicles",
        short_name: "Evillious",
        description:
          "A reader's chronicle of mothy's Evillious Chronicles — a thousand years of song, sin, and sacrifice across the continent of Bolganio.",
        // Aged-leather dark token from src/index.css. Single value (manifest
        // doesn't have a portable light/dark variant), erring toward dark so
        // dark-mode users don't get a parchment splash flash on cold start.
        theme_color: "#2d2418",
        background_color: "#2d2418",
        display: "standalone",
        icons: [
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
      workbox: {
        // Precache the app shell only — JS/CSS/HTML/fonts/SVG icons. Chapter
        // images and audio fall through to the runtimeCaching rule below so a
        // first install stays light and chapters cache as the reader visits.
        globPatterns: ["**/*.{js,css,html,svg,woff2}"],
        runtimeCaching: [
          {
            urlPattern: ({ request, sameOrigin }) =>
              sameOrigin && (request.destination === "image" || request.destination === "audio"),
            handler: "CacheFirst",
            options: {
              cacheName: "ec-assets",
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
      devOptions: {
        // Enabling this lets you test the service worker during `vp dev`.
        // Off by default to avoid stale-cache surprises while iterating.
        enabled: false,
      },
    }),
  ],
});
