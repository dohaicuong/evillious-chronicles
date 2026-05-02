import { Outlet, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowClockwiseIcon,
  ArrowSquareOutIcon,
  BookOpenTextIcon,
  BookmarkSimpleIcon,
  CloudArrowDownIcon,
  GearIcon,
  HeartIcon,
  ListIcon,
  NotebookIcon,
  PaletteIcon,
} from "@phosphor-icons/react";
import { ScrollArea } from "@src/components/primitives/scroll-area";
import { IconButton } from "@src/components/primitives/icon-button";
import { ExternalLink, Link } from "@src/components/primitives/link";
import { Menu } from "@src/components/primitives/menu";
import { BookmarksDrawer } from "@src/components/library/bookmarks-drawer";
import { ContinueReadingDrawer } from "@src/components/library/continue-reading-drawer";
import { LikesDrawer } from "@src/components/library/likes-drawer";
import { NotesDrawer } from "@src/components/library/notes-drawer";
import { OfflineDrawer } from "@src/components/library/offline-drawer";
import { SettingsDrawer } from "@src/components/library/settings-drawer";
import { cn } from "@src/lib/cn";
import { forceUpdate } from "@src/lib/pwa";
import { pruneOrphanReactions } from "@src/lib/reactions";
import { ThemeToggle } from "./theme-toggle";

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
          <nav className="flex items-center gap-4">
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
      <ContinueReadingDrawer open={continueOpen} onOpenChange={setContinueOpen} />
      <LikesDrawer open={likesOpen} onOpenChange={setLikesOpen} />
      <BookmarksDrawer open={bookmarksOpen} onOpenChange={setBookmarksOpen} />
      <NotesDrawer open={notesOpen} onOpenChange={setNotesOpen} />
      <OfflineDrawer open={offlineOpen} onOpenChange={setOfflineOpen} />
      <SettingsDrawer open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
}
