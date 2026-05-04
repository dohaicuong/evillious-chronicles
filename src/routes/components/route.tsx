import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeftIcon,
  BookOpenIcon,
  CaretRightIcon,
  MagnifyingGlassIcon,
  PuzzlePieceIcon,
  SidebarSimpleIcon,
  SparkleIcon,
  StackIcon,
  TextAaIcon,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { cn } from "@src/lib/cn";
import { IconButton } from "@src/components/primitives/icon-button";
import { Link } from "@src/components/primitives/link";
import { ThemeToggle } from "@src/components/shell/theme-toggle";

// Shared focus-visible style for the bespoke nav buttons in this layout —
// mirrors the outline used by the Link primitive so keyboard focus reads
// the same whether it lands on a link or a toggle. outline-color pinned
// always so `transition-colors` can't animate it from currentColor on
// focus (would flash white on light-text sins like lust/envy).
const focusOutline = "outline-accent outline-offset-2 focus-visible:outline-2";

export const Route = createFileRoute("/components")({
  component: ComponentsLayout,
});

type NavItem = { to: string; label: string; exact?: boolean };
type NavGroupConfig = { label: string; icon: Icon; items: NavItem[] };

const themeGroup: NavGroupConfig = {
  label: "Theme",
  icon: TextAaIcon,
  items: [
    { to: "/components/color", label: "Color" },
    { to: "/components/typography", label: "Typography" },
    { to: "/components/breakpoints", label: "Breakpoints" },
    { to: "/components/animation", label: "Animation" },
    { to: "/components/theme-toggle", label: "Theme Toggle" },
  ],
};

const primitivesGroup: NavGroupConfig = {
  label: "Primitives",
  icon: PuzzlePieceIcon,
  items: [
    { to: "/components/icon", label: "Icon" },
    { to: "/components/button", label: "Button" },
    { to: "/components/icon-button", label: "Icon Button" },
    { to: "/components/link", label: "Link" },
    { to: "/components/badge", label: "Badge" },
    { to: "/components/card", label: "Card" },
    { to: "/components/code", label: "Code" },
    { to: "/components/input", label: "Input" },
    { to: "/components/menu", label: "Menu" },
    { to: "/components/tabs", label: "Tabs" },
    { to: "/components/tooltip", label: "Tooltip" },
    { to: "/components/slider", label: "Slider" },
    { to: "/components/switch", label: "Switch" },
    { to: "/components/progress", label: "Progress" },
    { to: "/components/pagination", label: "Pagination" },
    { to: "/components/skeleton", label: "Skeleton" },
    { to: "/components/scroll-area", label: "Scroll Area" },
    { to: "/components/qr-code", label: "QR Code" },
    { to: "/components/qr-scanner", label: "QR Scanner" },
  ],
};

const overlaysGroup: NavGroupConfig = {
  label: "Overlays",
  icon: StackIcon,
  items: [
    { to: "/components/dialog", label: "Dialog" },
    { to: "/components/drawer", label: "Drawer" },
    { to: "/components/toast", label: "Toast" },
    { to: "/components/audio", label: "Audio" },
    { to: "/components/search", label: "Search" },
  ],
};

const thematicGroup: NavGroupConfig = {
  label: "Thematic",
  icon: SparkleIcon,
  items: [
    { to: "/components/sin-glyph", label: "Sin Glyphs" },
    { to: "/components/clockwork-spinner", label: "Clockwork Spinner" },
    { to: "/components/clockwork-ornament", label: "Clockwork Ornament" },
    { to: "/components/clock-face", label: "Clock Face" },
    { to: "/components/vines", label: "Vines" },
    { to: "/components/ornament", label: "Ornament" },
  ],
};

function ComponentsLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [query, setQuery] = useState("");

  // Track the viewport across the small/large breakpoint and mirror it onto
  // the collapsed state — collapse below 640px, expand at or above. Manual
  // toggling within a viewport size still wins until the next breakpoint
  // crossing, since the listener only fires on `change`.
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 640px)");
    setCollapsed(mql.matches);
    const handler = (e: MediaQueryListEvent) => setCollapsed(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const expand = () => setCollapsed(false);
  const trimmed = query.trim();

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
            className={cn(
              "text-style-eyebrow text-fg-muted hover:text-fg transition-colors flex items-center gap-1 rounded-sm",
              focusOutline,
            )}
          >
            {collapsed ? <ArrowLeftIcon size={18} weight="light" /> : "← Reader"}
          </Link>
          <div className={cn("flex items-center gap-1", collapsed && "flex-col")}>
            {!collapsed ? <ThemeToggle /> : null}
            <IconButton
              variant="ghost"
              size="sm"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-pressed={collapsed}
              onClick={() => setCollapsed((c) => !c)}
            >
              <SidebarSimpleIcon weight="light" />
            </IconButton>
          </div>
        </div>

        <Link
          to="/components"
          activeOptions={{ exact: true }}
          aria-label={collapsed ? "Overview" : undefined}
          className={cn(
            "text-style-body text-fg-muted hover:text-fg transition-colors flex items-center mb-4 rounded-sm",
            "data-[status=active]:text-accent",
            focusOutline,
            collapsed
              ? "justify-center p-2"
              : "gap-2 -ml-3 border-l-2 border-transparent pl-3 py-1 data-[status=active]:border-accent",
          )}
        >
          <BookOpenIcon size={18} weight="light" className="shrink-0" />
          {!collapsed ? <span>Overview</span> : null}
        </Link>

        {!collapsed ? (
          <label className="relative mb-4 -ml-1">
            <MagnifyingGlassIcon
              size={14}
              weight="light"
              className="absolute left-2 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search components..."
              aria-label="Search components"
              className={cn(
                "w-full pl-7 pr-2 py-1 text-sm rounded-sm",
                "bg-surface text-fg placeholder:text-fg-muted",
                "border border-border",
                "focus-visible:outline-none focus-visible:border-accent",
              )}
            />
          </label>
        ) : null}

        <NavGroup config={themeGroup} collapsed={collapsed} onExpand={expand} query={trimmed} />
        <NavGroup
          config={primitivesGroup}
          collapsed={collapsed}
          onExpand={expand}
          query={trimmed}
        />
        <NavGroup config={overlaysGroup} collapsed={collapsed} onExpand={expand} query={trimmed} />
        <NavGroup config={thematicGroup} collapsed={collapsed} onExpand={expand} query={trimmed} />
      </aside>
      <main className="flex-1 px-12 py-12 max-w-6xl">
        <Outlet />
      </main>
    </div>
  );
}

function NavGroup({
  config,
  collapsed,
  onExpand,
  query,
}: {
  config: NavGroupConfig;
  collapsed: boolean;
  onExpand: () => void;
  query: string;
}) {
  const [open, setOpen] = useState(false);
  const GroupIcon = config.icon;

  const items = query
    ? config.items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
    : config.items;

  // Hide the group entirely while searching if nothing in it matches.
  if (query && items.length === 0) return null;

  if (collapsed) {
    return (
      <button
        type="button"
        onClick={onExpand}
        aria-label={config.label}
        title={config.label}
        className={cn(
          "flex items-center justify-center p-2 text-fg-muted hover:text-fg transition-colors rounded-sm",
          focusOutline,
        )}
      >
        <GroupIcon size={20} weight="light" />
      </button>
    );
  }

  // While searching, force the group open so matched items are visible without
  // requiring the user to click each group header.
  const isOpen = query ? true : open;

  return (
    <div className="flex flex-col gap-1 mb-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={isOpen}
        disabled={Boolean(query)}
        className={cn(
          "flex items-center gap-2 text-left text-sm font-semibold text-fg-muted hover:text-fg transition-colors -ml-1 py-1 px-1 rounded-sm disabled:opacity-100 disabled:hover:text-fg-muted",
          focusOutline,
        )}
      >
        <CaretRightIcon
          weight="bold"
          size={10}
          className={cn("shrink-0 transition-transform", isOpen && "rotate-90")}
        />
        <GroupIcon size={16} weight="light" className="shrink-0" />
        {config.label}
      </button>
      {isOpen ? (
        <div className="flex flex-col gap-1 pl-5">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact ?? false }}
              className={cn(
                "text-style-body text-fg-muted hover:text-fg transition-colors rounded-sm",
                "-ml-3 border-l-2 border-transparent pl-3 py-1",
                "data-[status=active]:text-accent data-[status=active]:border-accent",
                focusOutline,
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
