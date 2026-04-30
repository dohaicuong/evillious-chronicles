import { useState } from "react";
import { CaretDownIcon, CaretUpIcon, XIcon } from "@phosphor-icons/react";
import { extractYouTubeId, useAudio } from "@src/lib/audio";
import { IconButton } from "@src/components/primitives/icon-button";
import { cn } from "@src/lib/cn";

export function AudioDock() {
  const { currentSong, close } = useAudio();
  const [collapsed, setCollapsed] = useState(false);

  if (!currentSong) return null;

  const videoId = currentSong.youtubeUrl ? extractYouTubeId(currentSong.youtubeUrl) : null;

  return (
    <aside
      role="complementary"
      aria-label="Audio player"
      className={cn(
        "fixed bottom-4 right-4 z-40 w-[22rem] max-w-[calc(100vw-2rem)] flex flex-col rounded-sm border border-border bg-bg p-4 shadow-lg shadow-ink/30",
        collapsed ? "gap-0" : "gap-3",
      )}
    >
      <header className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="text-style-heading-4 text-fg truncate">{currentSong.title}</p>
          {!collapsed && currentSong.originalTitle ? (
            <p className="text-style-caption text-fg-muted truncate">
              {currentSong.originalTitle}
              {currentSong.romanizedTitle ? <> · {currentSong.romanizedTitle}</> : null}
            </p>
          ) : null}
          {!collapsed && (currentSong.vocalist || currentSong.composer) ? (
            <p className="text-style-caption text-fg-muted truncate">
              {currentSong.vocalist}
              {currentSong.vocalist && currentSong.composer ? " · " : null}
              {currentSong.composer}
            </p>
          ) : null}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <IconButton
            variant="ghost"
            size="sm"
            aria-label={collapsed ? "Expand audio player" : "Collapse audio player"}
            aria-expanded={!collapsed}
            onClick={() => setCollapsed((c) => !c)}
          >
            {collapsed ? <CaretUpIcon weight="light" /> : <CaretDownIcon weight="light" />}
          </IconButton>
          <IconButton variant="ghost" size="sm" aria-label="Close audio player" onClick={close}>
            <XIcon weight="light" />
          </IconButton>
        </div>
      </header>

      <div className={cn(collapsed && "h-0 overflow-hidden")} aria-hidden={collapsed}>
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
          <audio
            key={currentSong.id}
            src={currentSong.audio}
            controls
            autoPlay
            className="w-full"
          />
        ) : (
          <p className="text-style-caption text-fg-muted italic">No audio source available.</p>
        )}
      </div>
    </aside>
  );
}
