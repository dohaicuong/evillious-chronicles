import { XIcon } from "@phosphor-icons/react";
import { extractYouTubeId, useAudio } from "../../lib/audio";
import { IconButton } from "../primitives/icon-button";

export function AudioDock() {
  const { currentSong, close } = useAudio();
  if (!currentSong) return null;

  const videoId = currentSong.youtubeUrl ? extractYouTubeId(currentSong.youtubeUrl) : null;

  return (
    <aside
      role="complementary"
      aria-label="Audio player"
      className="fixed bottom-4 right-4 z-40 w-[22rem] max-w-[calc(100vw-2rem)] flex flex-col gap-3 rounded-sm border border-border bg-bg p-4 shadow-lg shadow-ink/30"
    >
      <header className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="text-style-heading-4 text-fg truncate">{currentSong.title}</p>
          {currentSong.originalTitle ? (
            <p className="text-style-caption text-fg-muted truncate">
              {currentSong.originalTitle}
              {currentSong.romanizedTitle ? <> · {currentSong.romanizedTitle}</> : null}
            </p>
          ) : null}
          {currentSong.vocalist || currentSong.composer ? (
            <p className="text-style-caption text-fg-muted truncate">
              {currentSong.vocalist}
              {currentSong.vocalist && currentSong.composer ? " · " : null}
              {currentSong.composer}
            </p>
          ) : null}
        </div>
        <IconButton variant="ghost" size="sm" aria-label="Close audio player" onClick={close}>
          <XIcon weight="light" />
        </IconButton>
      </header>

      {videoId ? (
        <iframe
          key={currentSong.id}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={currentSong.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="aspect-video w-full rounded-sm border border-border"
        />
      ) : currentSong.audio ? (
        <audio key={currentSong.id} src={currentSong.audio} controls autoPlay className="w-full" />
      ) : (
        <p className="text-style-caption text-fg-muted italic">No audio source available.</p>
      )}
    </aside>
  );
}
