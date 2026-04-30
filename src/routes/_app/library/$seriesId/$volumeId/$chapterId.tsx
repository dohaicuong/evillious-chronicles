import { Link, createFileRoute, notFound, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { CaretLeftIcon } from "@phosphor-icons/react";
import { series } from "../../../../../data/library";
import { getVolume } from "../../../../../data/volumes";
import { PageView } from "../../../../../components/reader/page-view";
import { PageProgressMark } from "../../../../../components/reader/page-progress-mark";
import { ChapterNav } from "../../../../../components/reader/chapter-nav";
import { SinGlyph } from "../../../../../components/thematic/sin-glyph";

export const Route = createFileRoute("/_app/library/$seriesId/$volumeId/$chapterId")({
  component: ChapterReader,
  loader: async ({ params }) => {
    const s = series.find((x) => x.id === params.seriesId);
    if (!s) throw notFound();
    const slim = s.volumes.find((x) => x.id === params.volumeId);
    if (!slim) throw notFound();
    const full = await getVolume(params.volumeId);
    if (!full) throw notFound();
    const idx = full.chapters.findIndex((c) => c.id === params.chapterId);
    if (idx === -1) throw notFound();
    return {
      series: s,
      volume: full,
      chapter: full.chapters[idx],
      prev: idx > 0 ? full.chapters[idx - 1] : null,
      next: idx < full.chapters.length - 1 ? full.chapters[idx + 1] : null,
    };
  },
});

function ChapterReader() {
  const { series: s, volume, chapter, prev, next } = Route.useLoaderData();
  const { hash } = useLocation();

  // Hash deep-link to a specific page (e.g. from the bookmarks drawer).
  // Re-runs when the route's hash changes; rAF lets the page elements paint first.
  useEffect(() => {
    if (!hash) return;
    const id = hash.startsWith("#") ? hash.slice(1) : hash;
    if (!/^page-\d+$/.test(id)) return;
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [hash, chapter.id]);

  return (
    <div data-sin={volume.sin ?? undefined} className="mx-auto max-w-2xl px-6 py-12 sm:py-16">
      <Link
        to="/library/$seriesId/$volumeId"
        params={{ seriesId: s.id, volumeId: volume.id }}
        className="inline-flex items-center gap-1 text-style-eyebrow text-fg-muted hover:text-fg transition-colors mb-8"
      >
        <CaretLeftIcon size={14} />
        {volume.title}
      </Link>

      <header className="mb-10 flex flex-col gap-2 border-b border-border pb-6">
        <span className="inline-flex items-center gap-2 text-style-eyebrow text-fg-muted">
          {volume.sin ? (
            <SinGlyph sin={volume.sin} size={14} weight="light" className="text-accent" />
          ) : null}
          Volume {volume.number} · Chapter {chapter.number}
        </span>
        <h1 className="text-style-heading-1 text-fg">{chapter.title}</h1>
      </header>

      <article>
        {chapter.pages.length === 0 ? (
          <p className="text-style-body text-fg-muted italic">
            This chapter has no content yet — translation in progress.
          </p>
        ) : (
          chapter.pages.map((page, i) => (
            <PageProgressMark
              key={page.number}
              seriesId={s.id}
              volumeId={volume.id}
              chapterId={chapter.id}
              pageIndex={i}
              pageNumber={page.number}
              totalPages={chapter.pages.length}
            >
              <PageView page={page} />
            </PageProgressMark>
          ))
        )}
      </article>

      <ChapterNav seriesId={s.id} volumeId={volume.id} prev={prev} next={next} />
    </div>
  );
}
