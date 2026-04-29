import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { cn } from "../../lib/cn";

export const Route = createFileRoute("/components")({
  component: ComponentsLayout,
});

const navItems = [
  { to: "/components", label: "Overview", exact: true },
  { to: "/components/typography", label: "Typography", exact: false },
  { to: "/components/icon", label: "Icon", exact: false },
  { to: "/components/button", label: "Button", exact: false },
  { to: "/components/icon-button", label: "Icon Button", exact: false },
  { to: "/components/badge", label: "Badge", exact: false },
  { to: "/components/card", label: "Card", exact: false },
  { to: "/components/input", label: "Input", exact: false },
  { to: "/components/dialog", label: "Dialog", exact: false },
  { to: "/components/drawer", label: "Drawer", exact: false },
  { to: "/components/menu", label: "Menu", exact: false },
  { to: "/components/tabs", label: "Tabs", exact: false },
  { to: "/components/tooltip", label: "Tooltip", exact: false },
  { to: "/components/toast", label: "Toast", exact: false },
  { to: "/components/slider", label: "Slider", exact: false },
  { to: "/components/switch", label: "Switch", exact: false },
  { to: "/components/progress", label: "Progress", exact: false },
  { to: "/components/skeleton", label: "Skeleton", exact: false },
  { to: "/components/scroll-area", label: "Scroll Area", exact: false },
] as const;

function ComponentsLayout() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-56 shrink-0 border-r border-border px-6 py-12 flex flex-col gap-1">
        <Link
          to="/"
          className="text-style-eyebrow text-fg-muted hover:text-fg transition-colors mb-8"
        >
          ← Reader
        </Link>
        <h2 className="text-style-eyebrow text-fg-muted mb-3">Components</h2>
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: item.exact }}
            className={cn(
              "text-style-body text-fg-muted hover:text-fg transition-colors",
              "-ml-3 border-l-2 border-transparent pl-3 py-1",
              "data-[status=active]:text-accent data-[status=active]:border-accent",
            )}
          >
            {item.label}
          </Link>
        ))}
      </aside>
      <main className="flex-1 px-12 py-12 max-w-4xl">
        <Outlet />
      </main>
    </div>
  );
}
