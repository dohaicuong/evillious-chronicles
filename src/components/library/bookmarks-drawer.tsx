import { useState, type ReactElement } from "react";
import { Link } from "@tanstack/react-router";
import { BookmarkSimpleIcon, TrashIcon, XIcon } from "@phosphor-icons/react";
import { Drawer } from "../primitives/drawer";
import { IconButton } from "../primitives/icon-button";
import { ScrollArea } from "../primitives/scroll-area";
import { useAllBookmarks, removeBookmark } from "../../lib/bookmarks";
import { series as seriesList } from "../../data/library";
import type { Bookmark } from "../../lib/db";

export function BookmarksDrawer({ trigger }: { trigger: ReactElement }) {
  const [open, setOpen] = useState(false);
  const bookmarks = useAllBookmarks();

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <Drawer.Trigger render={trigger} />
      <Drawer.Portal>
        <Drawer.Backdrop />
        <Drawer.Popup side="right" className="gap-0 p-0">
          <header className="flex items-center justify-between border-b border-border px-6 py-4">
            <Drawer.Title>Bookmarks</Drawer.Title>
            <IconButton
              variant="ghost"
              size="sm"
              aria-label="Close bookmarks"
              onClick={() => setOpen(false)}
            >
              <XIcon weight="light" />
            </IconButton>
          </header>

          {bookmarks.length === 0 ? (
            <p className="px-6 py-6 text-style-body text-fg-muted italic">
              No bookmarks yet. Tap the bookmark icon on any page to save it.
            </p>
          ) : (
            <ScrollArea className="flex-1">
              <ul className="flex flex-col px-6 py-2">
                {bookmarks.map((b) => (
                  <BookmarkRow key={b.id} bookmark={b} onNavigate={() => setOpen(false)} />
                ))}
              </ul>
            </ScrollArea>
          )}
        </Drawer.Popup>
      </Drawer.Portal>
    </Drawer>
  );
}

function BookmarkRow({ bookmark, onNavigate }: { bookmark: Bookmark; onNavigate: () => void }) {
  const s = seriesList.find((x) => x.id === bookmark.seriesId);
  const v = s?.volumes.find((x) => x.id === bookmark.volumeId);
  const c = v?.chapters.find((x) => x.id === bookmark.chapterId);

  return (
    <li className="flex items-start gap-3 border-b border-border last:border-b-0 py-3">
      <BookmarkSimpleIcon weight="fill" className="mt-1 text-accent shrink-0" size={16} />
      <Link
        to="/library/$seriesId/$volumeId/$chapterId"
        params={{
          seriesId: bookmark.seriesId,
          volumeId: bookmark.volumeId,
          chapterId: bookmark.chapterId,
        }}
        hash={`page-${bookmark.pageNumber}`}
        onClick={onNavigate}
        className="flex-1 flex flex-col gap-0.5 min-w-0 text-left rounded-sm hover:bg-accent-soft -mx-2 px-2 py-1 transition-colors"
      >
        <span className="text-style-body text-fg line-clamp-1">
          {c?.title ?? bookmark.chapterId}
        </span>
        <span className="text-style-caption text-fg-muted line-clamp-1">
          {v?.title ?? bookmark.volumeId} · Page {bookmark.pageNumber}
        </span>
      </Link>
      <IconButton
        size="sm"
        variant="ghost"
        aria-label="Remove bookmark"
        onClick={() => {
          if (bookmark.id != null) void removeBookmark(bookmark.id);
        }}
      >
        <TrashIcon weight="light" />
      </IconButton>
    </li>
  );
}
