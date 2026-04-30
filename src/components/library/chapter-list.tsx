import { Link } from "@tanstack/react-router";
import { DotsThreeVerticalIcon } from "@phosphor-icons/react";
import { Badge } from "@src/components/primitives/badge";
import { IconButton } from "@src/components/primitives/icon-button";
import { Menu } from "@src/components/primitives/menu";
import {
  markChapterComplete,
  resetChapterProgress,
  useChapterPercent,
} from "@src/lib/progress";
import type { Chapter } from "@src/data/library";

type Props = {
  seriesId: string;
  volumeId: string;
  chapters: Chapter[];
};

export function ChapterList({ seriesId, volumeId, chapters }: Props) {
  return (
    <ul className="flex flex-col">
      {chapters.map((c) => (
        <ChapterRow key={c.id} seriesId={seriesId} volumeId={volumeId} chapter={c} />
      ))}
    </ul>
  );
}

function ChapterRow({
  seriesId,
  volumeId,
  chapter,
}: {
  seriesId: string;
  volumeId: string;
  chapter: Chapter;
}) {
  const progress = useChapterPercent(chapter.id, chapter.pageCount);

  return (
    <li className="flex items-center gap-1 border-t border-border last:border-b">
      <Link
        to="/library/$seriesId/$volumeId/$chapterId"
        params={{ seriesId, volumeId, chapterId: chapter.id }}
        className="flex-1 flex items-center gap-4 py-4 -ml-3 pl-3 pr-2 rounded-sm hover:bg-accent-soft transition-colors"
      >
        <span className="text-style-caption text-fg-muted w-8 text-right tabular-nums">
          {chapter.number}
        </span>
        <span className="text-style-body text-fg flex-1">{chapter.title}</span>
        <span className="text-style-caption text-fg-muted hidden sm:inline">
          {chapter.pageCount} pages
        </span>
        <ChapterStatus progress={progress} />
      </Link>
      <ChapterRowMenu chapter={chapter} progress={progress} />
    </li>
  );
}

function ChapterRowMenu({ chapter, progress }: { chapter: Chapter; progress: number }) {
  return (
    <Menu>
      <Menu.Trigger
        render={
          <IconButton size="sm" variant="ghost" aria-label={`Actions for ${chapter.title}`}>
            <DotsThreeVerticalIcon weight="bold" />
          </IconButton>
        }
      />
      <Menu.Portal>
        <Menu.Positioner align="end">
          <Menu.Popup>
            <Menu.Item
              disabled={progress === 100}
              onClick={() => void markChapterComplete(chapter.id, chapter.pageCount)}
            >
              Mark complete
            </Menu.Item>
            <Menu.Item
              disabled={progress === 0}
              onClick={() => void resetChapterProgress(chapter.id)}
            >
              Reset progress
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu>
  );
}

function ChapterStatus({ progress }: { progress: number }) {
  if (progress === 100) {
    return (
      <Badge variant="soft" size="sm">
        Read
      </Badge>
    );
  }
  if (progress > 0) {
    return (
      <Badge variant="solid" size="sm">
        {progress}%
      </Badge>
    );
  }
  return <span className="w-10" />;
}
