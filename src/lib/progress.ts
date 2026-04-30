import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";

type SlimChapter = { id: string; pageCount: number };

export function useChapterPercent(chapterId: string, pageCount: number): number {
  const record = useLiveQuery(() => db.chapterProgress.get(chapterId), [chapterId]);
  const pagesRead = Math.min(record?.pagesRead ?? 0, pageCount);
  return pageCount ? Math.round((pagesRead / pageCount) * 100) : 0;
}

export function useVolumeProgress(chapters: SlimChapter[]): {
  pagesRead: number;
  totalPages: number;
  percent: number;
} {
  const ids = chapters.map((c) => c.id);
  const records =
    useLiveQuery(
      () => db.chapterProgress.where("chapterId").anyOf(ids).toArray(),
      [ids.join("|")],
    ) ?? [];

  const byId = new Map(records.map((r) => [r.chapterId, r] as const));
  const totalPages = chapters.reduce((sum, c) => sum + c.pageCount, 0);
  const pagesRead = chapters.reduce((sum, c) => {
    const r = byId.get(c.id);
    return sum + Math.min(r?.pagesRead ?? 0, c.pageCount);
  }, 0);

  return {
    pagesRead,
    totalPages,
    percent: totalPages ? Math.round((pagesRead / totalPages) * 100) : 0,
  };
}

export async function bumpChapterProgress(
  chapterId: string,
  pagesRead: number,
  totalPages: number,
): Promise<void> {
  // Transaction prevents lost updates when multiple page observers fire near-simultaneously.
  await db.transaction("rw", db.chapterProgress, async () => {
    const existing = await db.chapterProgress.get(chapterId);
    if ((existing?.pagesRead ?? 0) >= pagesRead) return;
    await db.chapterProgress.put({
      chapterId,
      pagesRead,
      totalPages,
      lastReadAt: Date.now(),
    });
  });
}

export async function markChapterComplete(
  chapterId: string,
  totalPages: number,
): Promise<void> {
  await db.chapterProgress.put({
    chapterId,
    pagesRead: totalPages,
    totalPages,
    lastReadAt: Date.now(),
  });
}

export async function resetChapterProgress(chapterId: string): Promise<void> {
  await db.chapterProgress.delete(chapterId);
}

export async function markVolumeComplete(chapters: SlimChapter[]): Promise<void> {
  const now = Date.now();
  await db.transaction("rw", db.chapterProgress, async () => {
    for (const c of chapters) {
      await db.chapterProgress.put({
        chapterId: c.id,
        pagesRead: c.pageCount,
        totalPages: c.pageCount,
        lastReadAt: now,
      });
    }
  });
}

export async function resetVolumeProgress(chapterIds: string[]): Promise<void> {
  await db.chapterProgress.bulkDelete(chapterIds);
}
