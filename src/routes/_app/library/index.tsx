import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@src/components/primitives/link";
import { useMemo } from "react";
import { CaretRightIcon } from "@phosphor-icons/react";
import { series } from "@src/data/library";
import { characters } from "@src/data/characters";
import { songs } from "@src/data/songs";
import { SeriesCard } from "@src/components/library/series-card";
import { CharacterCard } from "@src/components/library/character-card";
import { SongList } from "@src/components/audio/song-list";
import { Ornament } from "@src/components/thematic/ornament";

export const Route = createFileRoute("/_app/library/")({
  component: LibraryPage,
});

function LibraryPage() {
  const featured = useMemo(() => pickRandom(characters, 4), []);
  const featuredSongIds = useMemo(() => pickRandom(Object.keys(songs), 5), []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <header className="mb-12 flex flex-col gap-3 max-w-2xl">
        <span className="text-style-eyebrow text-fg-muted">The Reader's Chronicle</span>
        <h1 className="text-style-display text-fg">Library</h1>
        <p className="text-style-lead text-fg-muted">
          A thousand years of song, sin, and sacrifice across the continent of Bolganio.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {series.map((s) => (
          <SeriesCard key={s.id} series={s} />
        ))}
      </div>

      {featuredSongIds.length > 0 ? (
        <>
          <Ornament glyph="❦" />
          <section className="flex flex-col gap-4">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-style-eyebrow text-fg-muted">Songs</h2>
              <Link
                to="/songs"
                className="inline-flex items-center gap-1 text-style-eyebrow text-fg-muted transition-colors hover:text-fg"
              >
                View all
                <CaretRightIcon size={14} />
              </Link>
            </div>
            <SongList songIds={featuredSongIds} />
          </section>
        </>
      ) : null}

      {featured.length > 0 ? (
        <>
          <Ornament glyph="☙" />
          <section className="flex flex-col gap-6">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-style-eyebrow text-fg-muted">Characters</h2>
              <Link
                to="/characters"
                className="inline-flex items-center gap-1 text-style-eyebrow text-fg-muted transition-colors hover:text-fg"
              >
                View all
                <CaretRightIcon size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:[&>:nth-child(3)]:block lg:grid-cols-4 lg:[&>:nth-child(4)]:block [&>:nth-child(3)]:hidden [&>:nth-child(4)]:hidden">
              {featured.map((c) => (
                <CharacterCard key={c.id} character={c} />
              ))}
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}

function pickRandom<T>(arr: readonly T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy.slice(0, n);
}
