import { Link } from "@tanstack/react-router";
import { Badge } from "../primitives/badge";
import { useChapterPercent } from "../../lib/progress";
import type { Chapter } from "../../data/library";

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
    <li className="border-t border-border last:border-b">
      <Link
        to="/library/$seriesId/$volumeId/$chapterId"
        params={{ seriesId, volumeId, chapterId: chapter.id }}
        className="flex items-center gap-4 py-4 -mx-3 px-3 rounded-sm hover:bg-accent-soft transition-colors"
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
    </li>
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
