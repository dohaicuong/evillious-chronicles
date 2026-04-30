import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { IconContext } from "@phosphor-icons/react";
import { Tooltip } from "../components/primitives/tooltip";
import { Toast } from "../components/primitives/toast";
import { AudioProvider } from "../lib/audio";
import { AudioDock } from "../components/audio/audio-dock";
import { ThemeProvider } from "../lib/theme";
import { ReaderSettingsProvider } from "../lib/reader-settings";

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
                <TanStackRouterDevtools />
              </IconContext.Provider>
            </AudioProvider>
          </Toast.Provider>
        </Tooltip.Provider>
      </ReaderSettingsProvider>
    </ThemeProvider>
  );
}
