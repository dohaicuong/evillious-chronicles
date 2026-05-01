import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  BookmarkSimpleIcon,
  CaretLeftIcon,
  CaretRightIcon,
  NotePencilIcon,
} from "@phosphor-icons/react";
import { series } from "@src/data/library";
import { getVolume } from "@src/data/volumes";
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
    const full = await getVolume(params.volumeId);
    if (!full) throw notFound();
    const chapterIdx = full.chapters.findIndex((c) => c.id === params.chapterId);
    if (chapterIdx === -1) throw notFound();
    const chapter = full.chapters[chapterIdx]!;

    const pageNum = Number.parseInt(params.pageNumber, 10);
    if (!Number.isFinite(pageNum)) throw notFound();
    const pageIdx = chapter.pages.findIndex((p) => p.number === pageNum);
    if (pageIdx === -1) throw notFound();
    const page = chapter.pages[pageIdx]!;

    const prevChapter = chapterIdx > 0 ? full.chapters[chapterIdx - 1]! : null;
    const nextChapter =
      chapterIdx < full.chapters.length - 1 ? full.chapters[chapterIdx + 1]! : null;

    const prev: PageTarget | null =
      pageIdx > 0
        ? { chapterId: chapter.id, pageNumber: String(chapter.pages[pageIdx - 1]!.number) }
        : prevChapter && prevChapter.pages.length > 0
          ? {
              chapterId: prevChapter.id,
              pageNumber: String(prevChapter.pages[prevChapter.pages.length - 1]!.number),
            }
          : null;

    const next: PageTarget | null =
      pageIdx < chapter.pages.length - 1
        ? { chapterId: chapter.id, pageNumber: String(chapter.pages[pageIdx + 1]!.number) }
        : nextChapter && nextChapter.pages.length > 0
          ? {
              chapterId: nextChapter.id,
              pageNumber: String(nextChapter.pages[0]!.number),
            }
          : null;

    return { series: s, volume: full, chapter, page, pageIdx, prev, next };
  },
});

function PageReader() {
  const { series: s, volume, chapter, page, pageIdx, prev, next } = Route.useLoaderData();
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
          Volume {volume.number} · Chapter {chapter.number}
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
