import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { Button } from "@src/components/primitives/button";
import { SearchDialog } from "@src/components/library/search-dialog";

export const Route = createLazyFileRoute("/components/search")({
  component: SearchPage,
});

function SearchPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">Search</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Site-wide command palette. Searches volumes, chapters, songs, and characters from a single
          query and routes results to the appropriate destination.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Trigger</h2>
        <p className="text-style-caption text-fg-muted">
          Mounted in <code>AppShell</code> with a global <code>Ctrl K</code> / <code>⌘ K</code>{" "}
          shortcut.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary" onClick={() => setOpen(true)}>
            <MagnifyingGlassIcon weight="light" />
            Open search
          </Button>
        </div>
        <SearchDialog open={open} onOpenChange={setOpen} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">What it searches</h2>
        <ul className="flex flex-col gap-2 text-style-body text-fg">
          <li>
            <strong>Volumes</strong> — English title, original Japanese title, romanized title.
          </li>
          <li>
            <strong>Chapters</strong> — chapter title within each volume's slim manifest.
          </li>
          <li>
            <strong>Songs</strong> — title, original / romanized titles, vocalist, composer.
            Selecting a song plays it via the global audio dock.
          </li>
          <li>
            <strong>Characters</strong> — name, aliases, Japanese name, romaji, vocaloid binding.
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Keyboard</h2>
        <ul className="flex flex-col gap-2 text-style-body text-fg">
          <li>
            <code>Ctrl K</code> / <code>⌘ K</code> — open or close from anywhere.
          </li>
          <li>
            <code>↓</code> / <code>↑</code> — move the highlight through the result list. The first
            arrow-down from the input lands on the first row.
          </li>
          <li>
            <code>Tab</code> — moves between the input and the active row only (two-stop loop).
          </li>
          <li>
            <code>Enter</code> — activates the focused row (navigate / play).
          </li>
          <li>
            <code>Esc</code> — close the dialog.
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">API</h2>
        <pre className="text-style-caption text-fg bg-surface border border-border rounded-sm p-4 overflow-x-auto">{`import { SearchDialog } from "@src/components/library/search-dialog";

const [open, setOpen] = useState(false);

<SearchDialog open={open} onOpenChange={setOpen} />`}</pre>
      </section>
    </div>
  );
}
