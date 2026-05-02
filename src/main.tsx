import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { PendingScreen } from "./components/thematic/pending-screen";
import { loadChapterManifest } from "./lib/chapter-manifest";

// Self-hosted fonts (latin subset). Vite bundles these so they ship from our
// own origin — removes the Google Fonts critical-path chain.
import "@fontsource/eb-garamond/latin-400.css";
import "@fontsource/eb-garamond/latin-400-italic.css";
import "@fontsource/eb-garamond/latin-500.css";
import "@fontsource/eb-garamond/latin-600.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/marcellus-sc/latin-400.css";
import "@fontsource/im-fell-english-sc/latin-400.css";
import "@fontsource/pirata-one/latin-400.css";

import "./index.css";

// `basepath` mirrors Vite's `base` so the router strips `/evillious-chronicles/`
// (or whatever Pages serves under) before matching routes. In dev it's "/".
const router = createRouter({
  routeTree,
  basepath: import.meta.env.BASE_URL,
  // Loading UI: shown when a route's loader / lazy chunk takes longer than
  // pendingMs to resolve. Kept on screen for at least pendingMinMs once it
  // appears, so the chronicle quote is actually readable rather than
  // flashing past. Tuned high on both sides to favour stillness over
  // responsiveness — a quick blank moment beats a stuttery spinner.
  defaultPendingComponent: PendingScreen,
  defaultPendingMs: 400,
  defaultPendingMinMs: 800,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Pull the chapter manifest before the first render so route loaders that
// derive page-counts or fetch chapter pages see a populated listing. The
// manifest is just a small JSON file served from the same origin (emitted
// by `chapterManifestPlugin` in vite.config.ts), so the wait is trivial in
// practice; it fails soft to an empty manifest if the fetch errors, in
// which case chapter routes surface the failure through their error UI.
async function bootstrap() {
  await loadChapterManifest();
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}

void bootstrap();
