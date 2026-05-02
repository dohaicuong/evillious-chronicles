import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@src/components/primitives/link";
import { useMemo } from "react";
import { CaretLeftIcon } from "@phosphor-icons/react";
import { songs } from "@src/data/songs";
import { SongList } from "@src/components/audio/song-list";

export const Route = createFileRoute("/_app/songs/")({
  component: SongsPage,
});

function SongsPage() {
  const ids = useMemo(() => Object.keys(songs), []);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <Link
        to="/library"
        className="text-style-eyebrow text-fg-muted hover:text-fg mb-6 inline-flex items-center gap-1 transition-colors"
      >
        <CaretLeftIcon size={14} />
        Library
      </Link>
      <header className="mb-8 flex flex-col gap-3 max-w-2xl">
        <span className="text-style-eyebrow text-fg-muted">The Reader's Chronicle</span>
        <h1 className="text-style-display text-fg">Songs</h1>
        <p className="text-style-lead text-fg-muted">
          The full catalog of mothy's songs that thread through the cycles of Evillious.
        </p>
      </header>

      <SongList songIds={ids} />
    </div>
  );
}
