import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { IconContext } from "@phosphor-icons/react";
import { Tooltip } from "@src/components/primitives/tooltip";
import { Toast } from "@src/components/primitives/toast";
import { AudioProvider } from "@src/lib/audio";
import { AudioDock } from "@src/components/audio/audio-dock";
import { PwaUpdateToast } from "@src/components/shell/pwa-update-toast";
import { ThemeProvider } from "@src/lib/theme";
import { ReaderSettingsProvider } from "@src/lib/reader-settings";

export const Route = createRootRoute({
  component: RootLayout,
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
                <TanStackRouterDevtools />
              </IconContext.Provider>
            </AudioProvider>
          </Toast.Provider>
        </Tooltip.Provider>
      </ReaderSettingsProvider>
    </ThemeProvider>
  );
}
