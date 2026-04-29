import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

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
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
