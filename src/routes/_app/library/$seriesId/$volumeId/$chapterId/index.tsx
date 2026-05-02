import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { series } from "@src/data/library";
import { getVolume } from "@src/data/volumes";
import { db } from "@src/lib/db";

/*
 * Chapter root — resolves the chapter's resume page (last page the reader
 * touched, or page 1 if none) and redirects to it. Kept as a separate index
 * route so links to /library/.../$chapterId resolve cleanly.
 */
export const Route = createFileRoute("/_app/library/$seriesId/$volumeId/$chapterId/")({
  loader: async ({ params }) => {
    const s = series.find((x) => x.id === params.seriesId);
    if (!s) throw notFound();
    const slim = s.volumes.find((x) => x.id === params.volumeId);
    if (!slim) throw notFound();
    const full = await getVolume(params.volumeId);
    if (!full) throw notFound();
    const chapter =
      full.chapters.find((c) => c.id === params.chapterId) ??
      (full.afterword?.id === params.chapterId ? full.afterword : null);
    if (!chapter) throw notFound();
    if (chapter.pages.length === 0) {
      // Empty chapter — fall back to the volume detail page.
      throw redirect({
        to: "/library/$seriesId/$volumeId",
        params: { seriesId: params.seriesId, volumeId: params.volumeId },
      });
    }

    // Resume target: last page the user reached. `pagesRead` is 1-based and,
    // for current data, matches the page-number index. Clamp into range and
    // fall back to the first page when there's no record yet.
    const record = await db.chapterProgress.get(params.chapterId);
    const pagesRead = record?.pagesRead ?? 0;
    const lastIdx = chapter.pages.length - 1;
    const targetIdx = pagesRead > 0 ? Math.min(pagesRead - 1, lastIdx) : 0;
    const targetPage = chapter.pages[targetIdx]!;

    throw redirect({
      to: "/library/$seriesId/$volumeId/$chapterId/$pageNumber",
      params: {
        seriesId: params.seriesId,
        volumeId: params.volumeId,
        chapterId: params.chapterId,
        pageNumber: String(targetPage.number),
      },
    });
  },
});
