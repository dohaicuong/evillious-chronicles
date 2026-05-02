import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { series } from "@src/routes/_app/library/-library";
import { SeriesCard } from "@src/components/library/series-card";

// Featured songs and characters live in a separate chunk so the heavy
// character catalog (~180KB) doesn't sit on the LCP critical path of the
// library landing page. The fold-above content (header + series grid)
// renders immediately; the featured section streams in afterwards.
const FeaturedSection = lazy(() =>
  import("@src/components/library/featured-section").then((m) => ({ default: m.FeaturedSection })),
);

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

      <Suspense fallback={null}>
        <FeaturedSection />
      </Suspense>
    </div>
  );
}
