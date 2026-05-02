import { Outlet, useLocation } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ArrowClockwiseIcon,
  ArrowSquareOutIcon,
  BookOpenTextIcon,
  BookmarkSimpleIcon,
  CloudArrowDownIcon,
  GearIcon,
  HeartIcon,
  ListIcon,
  MagnifyingGlassIcon,
  NotebookIcon,
  PaletteIcon,
} from "@phosphor-icons/react";
import { ScrollArea } from "@src/components/primitives/scroll-area";
import { IconButton } from "@src/components/primitives/icon-button";
import { ExternalLink, Link } from "@src/components/primitives/link";
import { Menu } from "@src/components/primitives/menu";
import { cn } from "@src/lib/cn";
import { forceUpdate } from "@src/lib/pwa";
import { pruneOrphanReactions } from "@src/lib/reactions";
import { ThemeToggle } from "./theme-toggle";

// Drawers and dialogs are mounted only after their first open. Each pulls
// in non-trivial dependencies (the search and likes surfaces transitively
// import the full character + song catalogs), so deferring keeps them out
// of the main bundle and off the LCP critical path.
const BookmarksDrawer = lazy(() =>
  import("@src/components/library/bookmarks-drawer").then((m) => ({ default: m.BookmarksDrawer })),
);
const ContinueReadingDrawer = lazy(() =>
  import("@src/components/library/continue-reading-drawer").then((m) => ({
    default: m.ContinueReadingDrawer,
  })),
);
const LikesDrawer = lazy(() =>
  import("@src/components/library/likes-drawer").then((m) => ({ default: m.LikesDrawer })),
);
const NotesDrawer = lazy(() =>
  import("@src/components/library/notes-drawer").then((m) => ({ default: m.NotesDrawer })),
);
const OfflineDrawer = lazy(() =>
  import("@src/components/library/offline-drawer").then((m) => ({ default: m.OfflineDrawer })),
);
const SearchDialog = lazy(() =>
  import("@src/components/library/search-dialog").then((m) => ({ default: m.SearchDialog })),
);
const SettingsDrawer = lazy(() =>
  import("@src/components/library/settings-drawer").then((m) => ({ default: m.SettingsDrawer })),
);

// Mount children once `active` has been true at least once, then keep them
// mounted so the drawer/dialog's close animation still has a tree to play
// against. Suspense fallback is `null` because each lazy chunk is small and
// the user just clicked — a flash of nothing reads better than a spinner.
function DeferredMount({ active, children }: { active: boolean; children: ReactNode }) {
  const [mounted, setMounted] = useState(active);
  useEffect(() => {
    if (active) setMounted(true);
  }, [active]);
  return mounted ? <Suspense fallback={null}>{children}</Suspense> : null;
}

export function AppShell() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [continueOpen, setContinueOpen] = useState(false);
  const [likesOpen, setLikesOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [offlineOpen, setOfflineOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Detect macOS once at mount so the search-trigger hint reads "⌘K" on
  // Mac and "Ctrl K" everywhere else. SSR-safe via the typeof guard.
  const isMac = useMemo(
    () => typeof navigator !== "undefined" && /Mac|iPhone|iPad|iPod/i.test(navigator.platform),
    [],
  );

  // Cmd/Ctrl+K toggles the search palette globally. Skip when the user is
  // mid-edit in a contentEditable surface so reader annotations etc. keep
  // their own bindings — plain inputs/textareas don't claim ⌘K so we let
  // it through unconditionally there.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "k" && e.key !== "K") return;
      if (!(e.metaKey || e.ctrlKey)) return;
      const target = e.target as HTMLElement | null;
      if (target?.isContentEditable) return;
      e.preventDefault();
      setSearchOpen((open) => !open);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Reset scroll on route change — the ScrollArea's own viewport scrolls,
  // not the document, so the router's default scroll restoration won't apply.
  useEffect(() => {
    viewportRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  // One-shot sweep: drop any reaction records whose target id no longer
  // resolves to a current series / song / character. Catches orphans left
  // behind by a slug rename so the LikesDrawer doesn't silently swallow
  // them and the DB doesn't accumulate cruft over time.
  useEffect(() => {
    void pruneOrphanReactions();
  }, []);

  // Force a fresh version on demand. The standalone PWA has no URL bar,
  // and iOS Safari clings to disk-cached HTML, so the menu button defers
  // to `forceUpdate` which knows how to wait for the SW hand-off and how
  // to fall back to the unregister-and-reload path when needed.
  function hardReload() {
    void forceUpdate();
  }

  return (
    <div className="h-screen flex flex-col bg-bg">
      {/*
        Skip link — first focusable element on the page. Hidden visually until
        focused, at which point it pops into the top-left so a keyboard user
        can jump past the topbar straight to the main content. The target
        `<main tabIndex={-1}>` accepts programmatic focus on activation.
      */}
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-2 focus-visible:left-2 focus-visible:z-50 focus-visible:rounded-sm focus-visible:bg-surface focus-visible:text-fg focus-visible:px-3 focus-visible:py-2 focus-visible:text-style-eyebrow focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      >
        Skip to main content
      </a>
      <header className={cn("shrink-0", !isHome && "border-b border-border")}>
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-baseline gap-1.5 font-display tracking-wide text-2xl">
            <span className="text-fg">Evillious</span>
            <span className="text-fg-muted">Chronicles</span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4">
            {/* Large screens: input-shaped trigger with ⌘K / Ctrl K hint. */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search (Ctrl K)"
              className={cn(
                "hidden sm:inline-flex items-center gap-2 h-8 w-56 px-3",
                "rounded-sm border border-border bg-surface",
                "text-style-caption text-fg-muted",
                "hover:border-accent/60 hover:text-fg transition-colors",
                "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
              )}
            >
              <MagnifyingGlassIcon size={16} weight="light" className="shrink-0" aria-hidden />
              <span className="flex-1 text-left">Search...</span>
              <kbd
                aria-hidden
                className="ml-auto rounded-xs border border-border px-1.5 py-0.5 text-[10px] font-mono leading-none text-fg-muted"
              >
                {isMac ? "⌘K" : "Ctrl K"}
              </kbd>
            </button>
            {/* Small screens: just the search icon. */}
            <IconButton
              variant="ghost"
              size="sm"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="sm:hidden"
            >
              <MagnifyingGlassIcon weight="light" />
            </IconButton>
            <div className="hidden sm:flex items-center gap-4">
              <IconButton
                variant="ghost"
                size="sm"
                aria-label="Open bookmarks"
                onClick={() => setBookmarksOpen(true)}
              >
                <BookmarkSimpleIcon weight="light" />
              </IconButton>
              <Menu>
                <Menu.Trigger
                  render={
                    <IconButton variant="ghost" size="sm" aria-label="More options">
                      <ListIcon weight="light" />
                    </IconButton>
                  }
                />
                <Menu.Portal>
                  <Menu.Positioner align="end">
                    <Menu.Popup>
                      <Menu.Item onClick={() => setContinueOpen(true)}>
                        <BookOpenTextIcon
                          weight="light"
                          className="inline-block mr-2 align-[-2px]"
                        />
                        Continue reading
                      </Menu.Item>
                      <Menu.Item onClick={() => setNotesOpen(true)}>
                        <NotebookIcon weight="light" className="inline-block mr-2 align-[-2px]" />
                        Notes
                      </Menu.Item>
                      <Menu.Item onClick={() => setLikesOpen(true)}>
                        <HeartIcon weight="light" className="inline-block mr-2 align-[-2px]" />
                        Likes
                      </Menu.Item>
                      <Menu.Separator />
                      <Menu.Item onClick={() => setOfflineOpen(true)}>
                        <CloudArrowDownIcon
                          weight="light"
                          className="inline-block mr-2 align-[-2px]"
                        />
                        Offline reading
                      </Menu.Item>
                      <Menu.Item onClick={() => setSettingsOpen(true)}>
                        <GearIcon weight="light" className="inline-block mr-2 align-[-2px]" />
                        Reader settings
                      </Menu.Item>
                      <Menu.Item
                        render={
                          <ExternalLink
                            href="https://theevilliouschronicles.fandom.com/wiki/The_Evillious_Chronicles_Wiki"
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        }
                      >
                        <ArrowSquareOutIcon
                          weight="light"
                          className="inline-block mr-2 align-[-2px]"
                        />
                        Evillious Chronicles wiki
                      </Menu.Item>
                      <Menu.Separator />
                      <Menu.Item onClick={hardReload}>
                        <ArrowClockwiseIcon
                          weight="light"
                          className="inline-block mr-2 align-[-2px]"
                        />
                        Reload for updates
                      </Menu.Item>
                      <Menu.Item render={<Link to="/components" />}>
                        <PaletteIcon weight="light" className="inline-block mr-2 align-[-2px]" />
                        Component library
                      </Menu.Item>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu>
            </div>
            <Menu>
              <Menu.Trigger
                render={
                  <IconButton
                    variant="ghost"
                    size="sm"
                    aria-label="Open menu"
                    className="sm:hidden"
                  >
                    <ListIcon weight="light" />
                  </IconButton>
                }
              />
              <Menu.Portal>
                <Menu.Positioner align="end">
                  <Menu.Popup>
                    <Menu.Item onClick={() => setContinueOpen(true)}>
                      <BookOpenTextIcon weight="light" className="inline-block mr-2 align-[-2px]" />
                      Continue reading
                    </Menu.Item>
                    <Menu.Item onClick={() => setBookmarksOpen(true)}>
                      <BookmarkSimpleIcon
                        weight="light"
                        className="inline-block mr-2 align-[-2px]"
                      />
                      Bookmarks
                    </Menu.Item>
                    <Menu.Item onClick={() => setNotesOpen(true)}>
                      <NotebookIcon weight="light" className="inline-block mr-2 align-[-2px]" />
                      Notes
                    </Menu.Item>
                    <Menu.Item onClick={() => setLikesOpen(true)}>
                      <HeartIcon weight="light" className="inline-block mr-2 align-[-2px]" />
                      Likes
                    </Menu.Item>
                    <Menu.Separator />
                    <Menu.Item onClick={() => setOfflineOpen(true)}>
                      <CloudArrowDownIcon
                        weight="light"
                        className="inline-block mr-2 align-[-2px]"
                      />
                      Offline reading
                    </Menu.Item>
                    <Menu.Item onClick={() => setSettingsOpen(true)}>
                      <GearIcon weight="light" className="inline-block mr-2 align-[-2px]" />
                      Reader settings
                    </Menu.Item>
                    <Menu.Item
                      render={
                        <ExternalLink
                          href="https://theevilliouschronicles.fandom.com/wiki/The_Evillious_Chronicles_Wiki"
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      }
                    >
                      <ArrowSquareOutIcon
                        weight="light"
                        className="inline-block mr-2 align-[-2px]"
                      />
                      Evillious Chronicles wiki
                    </Menu.Item>
                    <Menu.Separator />
                    <Menu.Item onClick={hardReload}>
                      <ArrowClockwiseIcon
                        weight="light"
                        className="inline-block mr-2 align-[-2px]"
                      />
                      Reload for updates
                    </Menu.Item>
                    <Menu.Item render={<Link to="/components" />}>
                      <PaletteIcon weight="light" className="inline-block mr-2 align-[-2px]" />
                      Component library
                    </Menu.Item>
                  </Menu.Popup>
                </Menu.Positioner>
              </Menu.Portal>
            </Menu>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <ScrollArea viewportRef={viewportRef} className="flex-1">
        <main id="main-content" tabIndex={-1} className="focus-visible:outline-none">
          <Outlet />
        </main>
      </ScrollArea>
      <DeferredMount active={continueOpen}>
        <ContinueReadingDrawer open={continueOpen} onOpenChange={setContinueOpen} />
      </DeferredMount>
      <DeferredMount active={likesOpen}>
        <LikesDrawer open={likesOpen} onOpenChange={setLikesOpen} />
      </DeferredMount>
      <DeferredMount active={bookmarksOpen}>
        <BookmarksDrawer open={bookmarksOpen} onOpenChange={setBookmarksOpen} />
      </DeferredMount>
      <DeferredMount active={notesOpen}>
        <NotesDrawer open={notesOpen} onOpenChange={setNotesOpen} />
      </DeferredMount>
      <DeferredMount active={offlineOpen}>
        <OfflineDrawer open={offlineOpen} onOpenChange={setOfflineOpen} />
      </DeferredMount>
      <DeferredMount active={settingsOpen}>
        <SettingsDrawer open={settingsOpen} onOpenChange={setSettingsOpen} />
      </DeferredMount>
      <DeferredMount active={searchOpen}>
        <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      </DeferredMount>
    </div>
  );
}
