import { Outlet, createRootRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { IconContext } from "@phosphor-icons/react";
import { Tooltip } from "@src/components/primitives/tooltip";
import { Toast } from "@src/components/primitives/toast";
import { AudioProvider } from "@src/lib/audio";
import { AudioDock } from "@src/components/audio/audio-dock";
import { PwaUpdateToast } from "@src/components/shell/pwa-update-toast";
import { RouteError, RouteNotFound } from "@src/components/shell/route-error";
import { ThemeProvider } from "@src/lib/theme";
import { ReaderSettingsProvider } from "@src/lib/reader-settings";

// Devtools ship a non-trivial chunk and are only ever useful in development.
// Branching on `import.meta.env.DEV` lets Rolldown statically resolve the
// prod side to a no-op and dead-code-eliminate the import — the devtools
// package never ends up in the deployed bundle.
const RouterDevtools = import.meta.env.DEV
  ? lazy(() =>
      import("@tanstack/react-router-devtools").then((m) => ({
        default: m.TanStackRouterDevtools,
      })),
    )
  : () => null;

export const Route = createRootRoute({
  component: RootLayout,
  errorComponent: RouteError,
  notFoundComponent: RouteNotFound,
});

const iconDefaults = { size: 20, weight: "light" as const };

function RootLayout() {
  return (
    <ThemeProvider>
      <ReaderSettingsProvider>
        <Tooltip.Provider>
          <Toast.Provider>
            <AudioProvider>
              <IconContext.Provider value={iconDefaults}>
                <Outlet />
                <AudioDock />
                <Toast.Viewport />
                <PwaUpdateToast />
                <Suspense fallback={null}>
                  <RouterDevtools position="bottom-right" />
                </Suspense>
              </IconContext.Provider>
            </AudioProvider>
          </Toast.Provider>
        </Tooltip.Provider>
      </ReaderSettingsProvider>
    </ThemeProvider>
  );
}
