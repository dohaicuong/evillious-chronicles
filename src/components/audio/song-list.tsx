import { PlayIcon } from "@phosphor-icons/react";
import { IconButton } from "../primitives/icon-button";
import { useAudio } from "../../lib/audio";
import { getSong } from "../../data/songs";

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

        return (
          <li
            key={id}
            className="flex items-center gap-4 border-t border-border last:border-b py-3"
          >
            <span className="text-style-caption text-fg-muted w-6 text-right tabular-nums">
              {i + 1}
            </span>
            <div className="flex-1 flex flex-col gap-0.5 min-w-0">
              <span className="text-style-body text-fg truncate">{song.title}</span>
              <span className="text-style-caption text-fg-muted truncate">
                {song.originalTitle ? <>{song.originalTitle} · </> : null}
                {song.vocalist}
                {song.composer ? <> · {song.composer}</> : null}
              </span>
            </div>
            <span className="text-style-caption text-fg-muted hidden sm:inline tabular-nums">
              {formatDuration(song.duration)}
            </span>
            <IconButton
              size="sm"
              variant={isCurrent ? "outline" : "ghost"}
              aria-label={isCurrent ? `Now playing: ${song.title}` : `Play ${song.title}`}
              onClick={() => play(song)}
            >
              <PlayIcon weight={isCurrent ? "fill" : "light"} />
            </IconButton>
          </li>
        );
      })}
    </ul>
  );
}
