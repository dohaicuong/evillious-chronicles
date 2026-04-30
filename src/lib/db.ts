import Dexie, { type Table } from "dexie";

export type ChapterProgress = {
  chapterId: string;
  pagesRead: number;
  totalPages: number;
  lastReadAt: number;
};

class ECDatabase extends Dexie {
  chapterProgress!: Table<ChapterProgress, string>;

  constructor() {
    super("evillious-chronicles");
    this.version(1).stores({
      chapterProgress: "&chapterId, lastReadAt",
    });
  }
}

export const db = new ECDatabase();
