import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  BookOpenTextIcon,
  BookmarkSimpleIcon,
  NotebookIcon,
  PaletteIcon,
} from "@phosphor-icons/react";
import { Button } from "@src/components/primitives/button";
import { IconButton } from "@src/components/primitives/icon-button";
import { BookmarksDrawer } from "@src/components/library/bookmarks-drawer";
import { ContinueReadingDrawer } from "@src/components/library/continue-reading-drawer";
import { ContinueReadingRow } from "@src/components/library/continue-reading-row";
import { NotesDrawer } from "@src/components/library/notes-drawer";
import { ThemeToggle } from "@src/components/shell/theme-toggle";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [continueOpen, setContinueOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 px-6 py-20 relative">
      <div className="absolute top-4 right-4 flex items-center gap-1">
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
        <ThemeToggle />
      </div>
      <ContinueReadingDrawer open={continueOpen} onOpenChange={setContinueOpen} />
      <BookmarksDrawer open={bookmarksOpen} onOpenChange={setBookmarksOpen} />
      <NotesDrawer open={notesOpen} onOpenChange={setNotesOpen} />

      <span className="text-style-eyebrow text-fg-muted">A multimedia chronicle by mothy</span>

      <h1 className="text-style-display text-fg text-center">Evillious Chronicles</h1>

      <div aria-hidden className="font-accent text-2xl text-accent leading-none">
        ✦
      </div>

      <p className="text-style-lead text-fg-muted text-center max-w-md">
        A reader's chronicle of sin and song — across a thousand years of the continent of Bolganio.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
        <Button variant="primary" render={<Link to="/library" />}>
          Open the Library
        </Button>
      </div>

      <ContinueReadingRow />
    </main>
  );
}
