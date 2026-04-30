import Dexie, { type Table } from "dexie";

export type ChapterProgress = {
  chapterId: string;
  pagesRead: number;
  totalPages: number;
  lastReadAt: number;
};

export type Bookmark = {
  id?: number;
  seriesId: string;
  volumeId: string;
  chapterId: string;
  pageNumber: number;
  label?: string;
  createdAt: number;
};

class ECDatabase extends Dexie {
  chapterProgress!: Table<ChapterProgress, string>;
  bookmarks!: Table<Bookmark, number>;

  constructor() {
    super("evillious-chronicles");
    this.version(1).stores({
      chapterProgress: "&chapterId, lastReadAt",
    });
    this.version(2).stores({
      chapterProgress: "&chapterId, lastReadAt",
      bookmarks: "++id, chapterId, volumeId, seriesId, [chapterId+pageNumber], createdAt",
    });
  }
}

export const db = new ECDatabase();
