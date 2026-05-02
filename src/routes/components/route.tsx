import { Link, Outlet, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeftIcon,
  BookOpenIcon,
  CaretRightIcon,
  PuzzlePieceIcon,
  SidebarSimpleIcon,
  SparkleIcon,
  TextAaIcon,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { cn } from "@src/lib/cn";
import { ThemeToggle } from "@src/components/shell/theme-toggle";

export const Route = createFileRoute("/components")({
  component: ComponentsLayout,
});

type NavItem = { to: string; label: string; exact?: boolean };
type NavGroupConfig = { label: string; icon: Icon; items: NavItem[] };

const themeGroup: NavGroupConfig = {
  label: "Theme",
  icon: TextAaIcon,
  items: [{ to: "/components/typography", label: "Typography" }],
};

const componentsGroup: NavGroupConfig = {
  label: "Components",
  icon: PuzzlePieceIcon,
  items: [
    { to: "/components/icon", label: "Icon" },
    { to: "/components/button", label: "Button" },
    { to: "/components/icon-button", label: "Icon Button" },
    { to: "/components/badge", label: "Badge" },
    { to: "/components/card", label: "Card" },
    { to: "/components/input", label: "Input" },
    { to: "/components/dialog", label: "Dialog" },
    { to: "/components/drawer", label: "Drawer" },
    { to: "/components/menu", label: "Menu" },
    { to: "/components/tabs", label: "Tabs" },
    { to: "/components/tooltip", label: "Tooltip" },
    { to: "/components/toast", label: "Toast" },
    { to: "/components/slider", label: "Slider" },
    { to: "/components/switch", label: "Switch" },
    { to: "/components/progress", label: "Progress" },
    { to: "/components/pagination", label: "Pagination" },
    { to: "/components/skeleton", label: "Skeleton" },
    { to: "/components/scroll-area", label: "Scroll Area" },
    { to: "/components/audio", label: "Audio" },
  ],
};

const thematicGroup: NavGroupConfig = {
  label: "Thematic Components",
  icon: SparkleIcon,
  items: [
    { to: "/components/thematic/sin-glyph", label: "Sin Glyphs" },
    { to: "/components/thematic/clockwork-spinner", label: "Clockwork Spinner" },
    { to: "/components/thematic/clockwork-ornament", label: "Clockwork Ornament" },
    { to: "/components/thematic/clock-face", label: "Clock Face" },
    { to: "/components/thematic/vines", label: "Vines" },
    { to: "/components/thematic/ornament", label: "Ornament" },
  ],
};

function ComponentsLayout() {
  const [collapsed, setCollapsed] = useState(false);

  // Default to collapsed on small viewports. We sync once on mount rather
  // than continuously, so a user who manually toggles isn't fought by resize.
  useEffect(() => {
    if (window.matchMedia("(max-width: 640px)").matches) {
      setCollapsed(true);
    }
  }, []);

  const expand = () => setCollapsed(false);

  return (
    <div className="min-h-screen flex">
      <aside
        className={cn(
          "shrink-0 border-r border-border py-12 flex flex-col gap-1 transition-[width] duration-200",
          collapsed ? "w-14 px-2 items-center" : "w-64 px-6",
        )}
      >
        <div
          className={cn(
            "flex items-center mb-8 w-full",
            collapsed ? "flex-col gap-3" : "justify-between",
          )}
        >
          <Link
            to="/"
            aria-label="Back to reader"
            className="text-style-eyebrow text-fg-muted hover:text-fg transition-colors flex items-center gap-1"
          >
            {collapsed ? <ArrowLeftIcon size={18} weight="light" /> : "← Reader"}
          </Link>
          <div className={cn("flex items-center gap-1", collapsed && "flex-col")}>
            {!collapsed ? <ThemeToggle /> : null}
            <button
              type="button"
              onClick={() => setCollapsed((c) => !c)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-pressed={collapsed}
              className="p-1 text-fg-muted hover:text-fg transition-colors rounded-sm"
            >
              <SidebarSimpleIcon size={18} weight="light" />
            </button>
          </div>
        </div>

        <Link
          to="/components"
          activeOptions={{ exact: true }}
          aria-label={collapsed ? "Overview" : undefined}
          className={cn(
            "text-style-body text-fg-muted hover:text-fg transition-colors flex items-center mb-4",
            "data-[status=active]:text-accent",
            collapsed
              ? "justify-center p-2 rounded-sm"
              : "gap-2 -ml-3 border-l-2 border-transparent pl-3 py-1 data-[status=active]:border-accent",
          )}
        >
          <BookOpenIcon size={18} weight="light" className="shrink-0" />
          {!collapsed ? <span>Overview</span> : null}
        </Link>

        <NavGroup config={themeGroup} collapsed={collapsed} onExpand={expand} />
        <NavGroup config={componentsGroup} collapsed={collapsed} onExpand={expand} />
        <NavGroup config={thematicGroup} collapsed={collapsed} onExpand={expand} />
      </aside>
      <main className="flex-1 px-12 py-12 max-w-4xl">
        <Outlet />
      </main>
    </div>
  );
}

function NavGroup({
  config,
  collapsed,
  onExpand,
}: {
  config: NavGroupConfig;
  collapsed: boolean;
  onExpand: () => void;
}) {
  const [open, setOpen] = useState(false);
  const GroupIcon = config.icon;

  if (collapsed) {
    return (
      <button
        type="button"
        onClick={onExpand}
        aria-label={config.label}
        title={config.label}
        className="flex items-center justify-center p-2 text-fg-muted hover:text-fg transition-colors rounded-sm"
      >
        <GroupIcon size={20} weight="light" />
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-1 mb-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-2 text-left text-sm font-semibold text-fg-muted hover:text-fg transition-colors -ml-1 py-1"
      >
        <CaretRightIcon
          weight="bold"
          size={10}
          className={cn("shrink-0 transition-transform", open && "rotate-90")}
        />
        <GroupIcon size={16} weight="light" className="shrink-0" />
        {config.label}
      </button>
      {open ? (
        <div className="flex flex-col gap-1 pl-5">
          {config.items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact ?? false }}
              className={cn(
                "text-style-body text-fg-muted hover:text-fg transition-colors",
                "-ml-3 border-l-2 border-transparent pl-3 py-1",
                "data-[status=active]:text-accent data-[status=active]:border-accent",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
