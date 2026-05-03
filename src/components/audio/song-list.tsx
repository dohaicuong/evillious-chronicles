import { PlayIcon } from "@phosphor-icons/react";
import { useAudio } from "@src/lib/audio";
import { getSong } from "@app/songs/-songs";
import { cn } from "@src/lib/cn";
import { ReactionButton } from "@src/components/library/reaction-button";

const durationFmt = new Intl.DurationFormat("en", { style: "digital" });

function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return durationFmt.format(hours > 0 ? { hours, minutes, seconds } : { minutes, seconds });
}

export function SongList({ songIds }: { songIds: string[] }) {
  const { play, currentSong } = useAudio();

  return (
    <ul className="flex flex-col">
      {songIds.map((id, i) => {
        const song = getSong(id);
        if (!song) return null;
        const isCurrent = currentSong?.id === song.id;
        const hasSource = Boolean(song.audio || song.youtubeUrl);

        const rowClass = cn(
          "flex w-full items-center gap-4 px-3 py-3 text-left transition-colors",
          "outline-accent outline-offset-2 focus-visible:outline-2",
          hasSource && "cursor-pointer hover:bg-accent-soft",
          !hasSource && "cursor-default",
        );

        const content = (
          <>
            <span className="text-style-caption text-fg-muted w-6 text-right tabular-nums">
              {i + 1}
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="text-style-body text-fg line-clamp-1">{song.title}</span>
              <span className="text-style-caption text-fg-muted line-clamp-1">
                {[song.originalTitle, song.vocalist, song.composer].filter(Boolean).join(" · ")}
              </span>
            </div>
            {song.duration ? (
              <span className="text-style-caption text-fg-muted hidden tabular-nums sm:inline">
                {formatDuration(song.duration)}
              </span>
            ) : null}
            <span
              aria-hidden
              className={cn(
                "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-sm",
                hasSource ? (isCurrent ? "text-accent" : "text-fg-muted") : "opacity-0",
              )}
            >
              <PlayIcon size={16} weight={isCurrent ? "fill" : "light"} />
            </span>
          </>
        );

        return (
          <li key={id} className="border-border border-t last:border-b flex items-center gap-1">
            {hasSource ? (
              <button
                type="button"
                className={cn(rowClass, "flex-1")}
                onClick={() => play(song)}
                aria-label={isCurrent ? `Now playing: ${song.title}` : `Play ${song.title}`}
              >
                {content}
              </button>
            ) : (
              <div className={cn(rowClass, "flex-1")}>{content}</div>
            )}
            <ReactionButton
              targetType="song"
              targetId={song.id}
              label={song.title}
              className="mr-2"
            />
          </li>
        );
      })}
    </ul>
  );
}
