import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { CaretLeftIcon } from "@phosphor-icons/react";
import { series } from "../../../../../data/library";
import { getVolume } from "../../../../../data/volumes";
import { PageView } from "../../../../../components/reader/page-view";
import { ChapterNav } from "../../../../../components/reader/chapter-nav";

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
        <span className="text-style-eyebrow text-fg-muted">
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
          chapter.pages.map((page) => <PageView key={page.number} page={page} />)
        )}
      </article>

      <ChapterNav seriesId={s.id} volumeId={volume.id} prev={prev} next={next} />
    </div>
  );
}
