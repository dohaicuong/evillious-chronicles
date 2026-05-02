import { createFileRoute, notFound } from "@tanstack/react-router";
import { Link } from "@src/components/primitives/link";
import { useEffect, useState } from "react";
import {
  BookmarkSimpleIcon,
  CaretLeftIcon,
  CaretRightIcon,
  NotePencilIcon,
} from "@phosphor-icons/react";
import { series } from "@src/routes/_app/library/-library";
import { getVolumeChapter, getVolumeMeta } from "@app/library/-volumes";
import { PageView } from "@src/components/reader/page-view";
import { Button } from "@src/components/primitives/button";
import { IconButton } from "@src/components/primitives/icon-button";
import { NoteEditorDialog } from "@src/components/library/note-editor-dialog";
import { SinGlyph } from "@src/components/thematic/sin-glyph";
import { toggleBookmark, useBookmark } from "@src/lib/bookmarks";
import { useNote } from "@src/lib/notes";
import { bumpChapterProgress } from "@src/lib/progress";
import { readerSettingsCssVars, useReaderSettings } from "@src/lib/reader-settings";

type PageTarget = { chapterId: string; pageNumber: string };

export const Route = createFileRoute("/_app/library/$seriesId/$volumeId/$chapterId/$pageNumber")({
  component: PageReader,
  loader: async ({ params }) => {
    const s = series.find((x) => x.id === params.seriesId);
    if (!s) throw notFound();
    const slim = s.volumes.find((x) => x.id === params.volumeId);
    if (!slim) throw notFound();

    // Hero metadata + slim chapter list (for adjacency math). The active
    // chapter's actual pages come from `getVolumeChapter` below — only one
    // chapter's worth of `.md` fetches per page navigation.
    const [meta, chapter] = await Promise.all([
      getVolumeMeta(params.volumeId),
      getVolumeChapter(params.volumeId, params.chapterId),
    ]);
    if (!meta || !chapter) throw notFound();

    const slimChapters = meta.afterword ? [...meta.chapters, meta.afterword] : meta.chapters;
    const chapterIdx = slimChapters.findIndex((c) => c.id === params.chapterId);
    if (chapterIdx === -1) throw notFound();

    const pageNum = Number.parseInt(params.pageNumber, 10);
    if (!Number.isFinite(pageNum)) throw notFound();
    const pageIdx = chapter.pages.findIndex((p) => p.number === pageNum);
    if (pageIdx === -1) throw notFound();
    const page = chapter.pages[pageIdx]!;

    // Prev/next are derived from slim page-counts. Page numbers are 1..N
    // contiguous (see `makePagesBuilder`), so a count is sufficient — no
    // reason to fetch the adjacent chapter's content just to build a link.
    const prevSlim = chapterIdx > 0 ? slimChapters[chapterIdx - 1]! : null;
    const nextSlim = chapterIdx < slimChapters.length - 1 ? slimChapters[chapterIdx + 1]! : null;

    const prev: PageTarget | null =
      pageIdx > 0
        ? { chapterId: chapter.id, pageNumber: String(chapter.pages[pageIdx - 1]!.number) }
        : prevSlim && prevSlim.pageCount > 0
          ? { chapterId: prevSlim.id, pageNumber: String(prevSlim.pageCount) }
          : null;

    const next: PageTarget | null =
      pageIdx < chapter.pages.length - 1
        ? { chapterId: chapter.id, pageNumber: String(chapter.pages[pageIdx + 1]!.number) }
        : nextSlim && nextSlim.pageCount > 0
          ? { chapterId: nextSlim.id, pageNumber: "1" }
          : null;

    return { series: s, volume: meta, chapter, page, pageIdx, prev, next };
  },
});

function PageReader() {
  const { series: s, volume, chapter, page, pageIdx, prev, next } = Route.useLoaderData();
  const isAfterword = chapter.id === volume.afterword?.id;
  const { settings } = useReaderSettings();
  const cssVars = readerSettingsCssVars(settings);
  const totalPages = chapter.pages.length;
  const bookmark = useBookmark(chapter.id, page.number);
  const note = useNote(chapter.id, page.number);
  const bookmarked = !!bookmark;
  const hasNote = !!note;
  const [editorOpen, setEditorOpen] = useState(false);

  // Bump reading progress on every page-mount. `pageIdx + 1` is the 1-based
  // page reached, matching the deep-link page anchor.
  useEffect(() => {
    void bumpChapterProgress(chapter.id, pageIdx + 1, totalPages);
  }, [chapter.id, pageIdx, totalPages]);

  return (
    <div
      data-sin={volume.sin ?? undefined}
      style={cssVars}
      className="mx-auto max-w-[var(--reader-max-width,42rem)] px-6 py-12 sm:py-16"
    >
      <Link
        to="/library/$seriesId/$volumeId"
        params={{ seriesId: s.id, volumeId: volume.id }}
        className="text-style-eyebrow text-fg-muted hover:text-fg mb-8 inline-flex items-center gap-1 transition-colors"
      >
        <CaretLeftIcon size={14} />
        {volume.title}
      </Link>

      <header className="border-border mb-10 flex flex-col gap-2 border-b pb-6">
        <span className="text-style-eyebrow text-fg-muted inline-flex items-center gap-2">
          {volume.sin ? (
            <SinGlyph sin={volume.sin} size={14} weight="light" className="text-accent" />
          ) : null}
          Volume {volume.number} · {isAfterword ? "Afterword" : `Chapter ${chapter.number}`}
        </span>
        <h1 className="text-style-heading-1 text-fg">{chapter.title}</h1>
        <div className="flex items-center justify-between gap-3">
          <span className="text-style-caption text-fg-muted tabular-nums">
            Page {page.number} of {totalPages}
          </span>
          <div className="flex items-center gap-0.5">
            <IconButton
              size="sm"
              variant="ghost"
              aria-label={hasNote ? "Edit note" : "Add note"}
              aria-pressed={hasNote}
              onClick={() => setEditorOpen(true)}
            >
              <NotePencilIcon weight={hasNote ? "fill" : "light"} />
            </IconButton>
            <IconButton
              size="sm"
              variant="ghost"
              aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
              aria-pressed={bookmarked}
              onClick={() => {
                void toggleBookmark({
                  seriesId: s.id,
                  volumeId: volume.id,
                  chapterId: chapter.id,
                  pageNumber: page.number,
                });
              }}
            >
              <BookmarkSimpleIcon weight={bookmarked ? "fill" : "light"} />
            </IconButton>
          </div>
        </div>
      </header>

      <article>
        <PageView page={page} />
      </article>

      <PageNav seriesId={s.id} volumeId={volume.id} prev={prev} next={next} />

      <NoteEditorDialog
        seriesId={s.id}
        volumeId={volume.id}
        chapterId={chapter.id}
        pageNumber={page.number}
        open={editorOpen}
        onOpenChange={setEditorOpen}
      />
    </div>
  );
}

function PageNav({
  seriesId,
  volumeId,
  prev,
  next,
}: {
  seriesId: string;
  volumeId: string;
  prev: PageTarget | null;
  next: PageTarget | null;
}) {
  return (
    <nav
      aria-label="Page navigation"
      className="border-border mt-12 flex items-center justify-between gap-4 border-t pt-6"
    >
      {prev ? (
        <Button
          variant="ghost"
          render={
            <Link
              to="/library/$seriesId/$volumeId/$chapterId/$pageNumber"
              params={{ seriesId, volumeId, ...prev }}
            />
          }
        >
          <CaretLeftIcon weight="light" />
          Previous
        </Button>
      ) : (
        <span aria-hidden />
      )}
      {next ? (
        <Button
          variant="primary"
          render={
            <Link
              to="/library/$seriesId/$volumeId/$chapterId/$pageNumber"
              params={{ seriesId, volumeId, ...next }}
            />
          }
        >
          Next
          <CaretRightIcon weight="light" />
        </Button>
      ) : (
        <span aria-hidden />
      )}
    </nav>
  );
}
