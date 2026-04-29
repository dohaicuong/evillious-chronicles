import { createFileRoute } from "@tanstack/react-router";
import { series } from "../../../data/library";
import { SeriesCard } from "../../../components/library/series-card";

export const Route = createFileRoute("/_app/library/")({
  component: LibraryPage,
});

function LibraryPage() {
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
    </div>
  );
}
