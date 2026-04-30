import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  BookOpenTextIcon,
  BookmarkSimpleIcon,
  GearIcon,
  ListIcon,
  MoonIcon,
  NotebookIcon,
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
import { ThemeToggle } from "./theme-toggle";

export function AppShell() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
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

  return (
    <div className="h-screen flex flex-col bg-bg">
      <header className="shrink-0 border-b border-border">
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
