import { PlayIcon } from "@phosphor-icons/react";
import { IconButton } from "@src/components/primitives/icon-button";
import { useAudio } from "@src/lib/audio";
import { getSong } from "@src/data/songs";

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

        return (
          <li
            key={id}
            className="flex items-center gap-4 border-t border-border py-3 last:border-b"
          >
            <span className="w-6 text-right text-style-caption text-fg-muted tabular-nums">
              {i + 1}
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="line-clamp-1 text-style-body text-fg">{song.title}</span>
              <span className="line-clamp-1 text-style-caption text-fg-muted">
                {[song.originalTitle, song.vocalist, song.composer].filter(Boolean).join(" · ")}
              </span>
            </div>
            {song.duration ? (
              <span className="hidden text-style-caption text-fg-muted tabular-nums sm:inline">
                {formatDuration(song.duration)}
              </span>
            ) : null}
            {hasSource ? (
              <IconButton
                size="sm"
                variant={isCurrent ? "outline" : "ghost"}
                aria-label={isCurrent ? `Now playing: ${song.title}` : `Play ${song.title}`}
                onClick={() => play(song)}
              >
                <PlayIcon weight={isCurrent ? "fill" : "light"} />
              </IconButton>
            ) : (
              <span className="h-8 w-8 shrink-0" aria-hidden="true" />
            )}
          </li>
        );
      })}
    </ul>
  );
}
