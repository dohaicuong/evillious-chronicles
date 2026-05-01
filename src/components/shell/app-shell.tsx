import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowClockwiseIcon,
  ArrowSquareOutIcon,
  BookOpenTextIcon,
  BookmarkSimpleIcon,
  GearIcon,
  ListIcon,
  MoonIcon,
  NotebookIcon,
  PaletteIcon,
  SunIcon,
} from "@phosphor-icons/react";
import { ScrollArea } from "@src/components/primitives/scroll-area";
import { IconButton } from "@src/components/primitives/icon-button";
import { Menu } from "@src/components/primitives/menu";
import { BookmarksDrawer } from "@src/components/library/bookmarks-drawer";
import { ContinueReadingDrawer } from "@src/components/library/continue-reading-drawer";
import { NotesDrawer } from "@src/components/library/notes-drawer";
import { SettingsDrawer } from "@src/components/library/settings-drawer";
import { useTheme } from "@src/lib/theme";
import { cn } from "@src/lib/cn";
import { ThemeToggle } from "./theme-toggle";

export function AppShell() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [continueOpen, setContinueOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Reset scroll on route change — the ScrollArea's own viewport scrolls,
  // not the document, so the router's default scroll restoration won't apply.
  useEffect(() => {
    viewportRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  // Hard reload — checks for SW updates, activates any waiting worker, then
  // forces a reload. The standalone PWA has no URL bar so this is the only
  // way for the user to pull a fresh version on demand.
  async function hardReload() {
    if ("serviceWorker" in navigator) {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(
          registrations.map(async (reg) => {
            await reg.update().catch(() => undefined);
            reg.waiting?.postMessage({ type: "SKIP_WAITING" });
          }),
        );
      } catch {
        // ignore — fall through to reload regardless
      }
    }
    window.location.reload();
  }

  return (
    <div className="h-screen flex flex-col bg-bg">
      <header className={cn("shrink-0", !isHome && "border-b border-border")}>
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-baseline gap-1.5 font-display tracking-wide text-2xl">
            <span className="text-fg">Evillious</span>
            <span className="text-fg-muted">Chronicles</span>
          </Link>
          <nav className="flex items-center">
            <div className="hidden sm:flex items-center gap-4">
              <IconButton
                variant="ghost"
                size="sm"
                aria-label="Component library"
                render={<Link to="/components" />}
              >
                <PaletteIcon weight="light" />
              </IconButton>
              <IconButton
                variant="ghost"
                size="sm"
                aria-label="Continue reading"
                onClick={() => setContinueOpen(true)}
              >
                <BookOpenTextIcon weight="light" />
              </IconButton>
              <IconButton
                variant="ghost"
                size="sm"
                aria-label="Open bookmarks"
                onClick={() => setBookmarksOpen(true)}
              >
                <BookmarkSimpleIcon weight="light" />
              </IconButton>
              <IconButton
                variant="ghost"
                size="sm"
                aria-label="Open notes"
                onClick={() => setNotesOpen(true)}
              >
                <NotebookIcon weight="light" />
              </IconButton>
              <IconButton
                variant="ghost"
                size="sm"
                aria-label="Reader settings"
                onClick={() => setSettingsOpen(true)}
              >
                <GearIcon weight="light" />
              </IconButton>
              <IconButton
                variant="ghost"
                size="sm"
                aria-label="Reload for updates"
                onClick={hardReload}
              >
                <ArrowClockwiseIcon weight="light" />
              </IconButton>
              <IconButton
                variant="ghost"
                size="sm"
                aria-label="Open Evillious Chronicles wiki in a new tab"
                render={
                  <a
                    href="https://theevilliouschronicles.fandom.com/wiki/The_Evillious_Chronicles_Wiki"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <ArrowSquareOutIcon weight="light" />
              </IconButton>
              <ThemeToggle />
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
                    <Menu.Item render={<Link to="/components" />}>
                      <PaletteIcon weight="light" className="inline-block mr-2 align-[-2px]" />
                      Component library
                    </Menu.Item>
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
                    <Menu.Item onClick={() => setSettingsOpen(true)}>
                      <GearIcon weight="light" className="inline-block mr-2 align-[-2px]" />
                      Reader settings
                    </Menu.Item>
                    <Menu.Item onClick={hardReload}>
                      <ArrowClockwiseIcon
                        weight="light"
                        className="inline-block mr-2 align-[-2px]"
                      />
                      Reload for updates
                    </Menu.Item>
                    <Menu.Item
                      render={
                        <a
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
                    <Menu.Item onClick={() => setTheme(isDark ? "light" : "dark")}>
                      {isDark ? (
                        <SunIcon weight="light" className="inline-block mr-2 align-[-2px]" />
                      ) : (
                        <MoonIcon weight="light" className="inline-block mr-2 align-[-2px]" />
                      )}
                      {isDark ? "Switch to light theme" : "Switch to dark theme"}
                    </Menu.Item>
                  </Menu.Popup>
                </Menu.Positioner>
              </Menu.Portal>
            </Menu>
          </nav>
        </div>
      </header>
      <ScrollArea viewportRef={viewportRef} className="flex-1">
        <main>
          <Outlet />
        </main>
      </ScrollArea>
      <ContinueReadingDrawer open={continueOpen} onOpenChange={setContinueOpen} />
      <BookmarksDrawer open={bookmarksOpen} onOpenChange={setBookmarksOpen} />
      <NotesDrawer open={notesOpen} onOpenChange={setNotesOpen} />
      <SettingsDrawer open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
}
