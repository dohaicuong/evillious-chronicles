import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { IconContext } from "@phosphor-icons/react";
import { Tooltip } from "../components/primitives/tooltip";
import { Toast } from "../components/primitives/toast";

export const Route = createRootRoute({
  component: RootLayout,
});

const iconDefaults = { size: 20, weight: "light" as const };

function RootLayout() {
  return (
    <Tooltip.Provider>
      <Toast.Provider>
        <IconContext.Provider value={iconDefaults}>
          <Outlet />
          <Toast.Viewport />
          <TanStackRouterDevtools />
        </IconContext.Provider>
      </Toast.Provider>
    </Tooltip.Provider>
  );
}
