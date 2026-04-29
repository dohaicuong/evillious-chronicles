import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { CaretLeftIcon } from "@phosphor-icons/react";
import { series } from "../../../../data/library";
import { VolumeCard } from "../../../../components/library/volume-card";
import { SongList } from "../../../../components/audio/song-list";
import { Ornament } from "../../../../components/thematic/ornament";

export const Route = createFileRoute("/_app/library/$seriesId/")({
  component: SeriesPage,
  loader: ({ params }) => {
    const found = series.find((s) => s.id === params.seriesId);
    if (!found) throw notFound();
    return found;
  },
});

function SeriesPage() {
  const s = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <Link
        to="/library"
        className="inline-flex items-center gap-1 text-style-eyebrow text-fg-muted hover:text-fg transition-colors mb-6"
      >
        <CaretLeftIcon size={14} />
        Library
      </Link>
      <header className="mb-12 flex flex-col gap-3 max-w-2xl">
        <span className="text-style-eyebrow text-fg-muted">Series</span>
        <h1 className="text-style-display text-fg">{s.title}</h1>
        <p className="text-style-lead text-fg-muted">{s.description}</p>
      </header>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {s.volumes.map((v) => (
          <VolumeCard key={v.id} seriesId={s.id} volume={v} />
        ))}
      </div>

      {s.songIds && s.songIds.length > 0 ? (
        <>
          <Ornament />
          <section className="flex flex-col gap-4 max-w-3xl">
            <h2 className="text-style-eyebrow text-fg-muted">Songs</h2>
            <SongList songIds={s.songIds} />
          </section>
        </>
      ) : null}
    </div>
  );
}
