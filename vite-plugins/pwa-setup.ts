import { VitePWA } from "vite-plugin-pwa";

/**
 * Wraps `vite-plugin-pwa` with this app's manifest, precache shell list,
 * and runtime caching rules. Returns the Vite plugin (or array of plugins)
 * VitePWA produces — drop straight into `plugins: []`.
 *
 * Caching strategy at a glance:
 *  - Precache: app shell (JS/CSS/HTML/fonts/SVG icons) plus the small set
 *    of static assets referenced from index.html / manifest.
 *  - `ec-assets` (CacheFirst): images and audio. Effectively immutable.
 *  - `ec-chapters` (StaleWhileRevalidate): chapter markdown — boots
 *    offline, picks up edits on next online visit.
 *  - `ec-chapter-manifest` (StaleWhileRevalidate): the chapter listing
 *    JSON the app fetches at boot (see `src/lib/chapter-manifest.ts`).
 *
 * Registration is driven manually from React via `useRegisterSW` so the
 * update toast (see PwaUpdateToast) controls when a new SW takes over —
 * we never want to rip the page out from under a reader mid-chapter.
 */
export function pwaSetupPlugin() {
  return VitePWA({
    // Prompt mode: a new SW waits for explicit user opt-in via the update
    // toast. Avoids ripping the page out from under a reader mid-chapter.
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
      // images, audio, and markdown fall through to the runtimeCaching rules
      // below so a first install stays light and content caches as it's read.
      globPatterns: ["**/*.{js,css,html,svg,woff2}"],
      runtimeCaching: [
        {
          // Cover art, opening galleries, in-prose illustrations, plus the
          // reader's audio dock files. Cache-first because they almost
          // never change once published.
          urlPattern: ({ request, sameOrigin }) =>
            sameOrigin && (request.destination === "image" || request.destination === "audio"),
          handler: "CacheFirst",
          options: {
            cacheName: "ec-assets",
            expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
          },
        },
        {
          // Chapter markdown lives at `public/<slug>/chapters/.../*.md` and
          // is fetched at runtime by the `Chapter()` factory. SWR so the
          // first read is offline-replayable and edits ship on the next
          // online visit without a hard reload.
          urlPattern: ({ url, sameOrigin }) => sameOrigin && url.pathname.endsWith(".md"),
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "ec-chapters",
            expiration: { maxEntries: 2000, maxAgeSeconds: 60 * 60 * 24 * 90 },
          },
        },
        {
          // Chapter listing JSON emitted by `chapterManifestPlugin`. Fetched
          // once at boot (see `src/lib/chapter-manifest.ts`); SWR so the
          // app boots offline against the last-seen listing while a fresh
          // copy is pulled in the background for the next visit.
          urlPattern: ({ url, sameOrigin }) =>
            sameOrigin && url.pathname.endsWith("/chapter-manifest.json"),
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "ec-chapter-manifest",
            expiration: { maxEntries: 4, maxAgeSeconds: 60 * 60 * 24 * 30 },
          },
        },
      ],
    },
    devOptions: {
      // Enabling this lets you test the service worker during `vp dev`.
      // Off by default to avoid stale-cache surprises while iterating.
      enabled: false,
    },
  });
}
