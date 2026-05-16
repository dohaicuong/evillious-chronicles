import { useEffect, useRef, useState } from "react";
import {
  CaretDownIcon,
  CaretUpIcon,
  MusicNoteIcon,
  MusicNotesIcon,
  XIcon,
} from "@phosphor-icons/react";
import { extractYouTubeId, useAudio } from "@src/lib/audio";
import { IconButton } from "@src/components/primitives/icon-button";
import { Button } from "@src/components/primitives/button";
import { cn } from "@src/lib/cn";
import type { Song } from "@src/lib/schema";

/**
 * Returns a counter that increments each time `value` changes after the
 * first render. Use the counter as a `key` on a child element to force
 * remount on each transition — that re-fires its CSS animation, which a
 * plain class swap can't do reliably (the `animation` shorthand only fires
 * on element creation or property change).
 *
 * Stays at 0 on the initial mount so the entry animation has the stage to
 * itself; pulses don't double up with the appear effect.
 */
function usePulseCounter(value: string | undefined): number {
  const [count, setCount] = useState(0);
  const isFirst = useRef(true);
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    setCount((c) => c + 1);
  }, [value]);
  return count;
}

function PulseOverlay({ run }: { run: number }) {
  if (run === 0) return null;
  return (
    <span
      key={run}
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-sm animate-scene-cue-pulse"
    />
  );
}

export function AudioDock() {
  const { currentSong, cuedSong, play, close, setCue } = useAudio();
  const [collapsed, setCollapsed] = useState(false);

  // Pulse counter has to be called unconditionally (rules of hooks), so it
  // sits at the top — even on renders where neither cue surface is shown,
  // it just sits at 0.
  const cuePulse = usePulseCounter(cuedSong?.id);

  // No track playing and no scene cue — nothing to show.
  if (!currentSong && !cuedSong) return null;

  // Scene cue with nothing playing — render a compact teaser instead of the
  // full player. Tapping plays the cue; the X dismisses just the cue, not
  // the whole dock concept (cue clears on page-unmount anyway).
  if (!currentSong && cuedSong) {
    return (
      <CueTeaser
        song={cuedSong}
        pulseRun={cuePulse}
        onPlay={() => play(cuedSong)}
        onDismiss={() => setCue(null)}
      />
    );
  }

  // currentSong is non-null past this point.
  const playing = currentSong!;
  const cueDiffers = cuedSong != null && cuedSong.id !== playing.id;
  const cueMatches = cuedSong != null && cuedSong.id === playing.id;
  const videoId = playing.youtubeUrl ? extractYouTubeId(playing.youtubeUrl) : null;

  const hasMeta = Boolean(playing.vocalist || playing.composer);

  return (
    <aside
      role="complementary"
      aria-label="Audio player"
      className={cn(
        // Mobile: full-bleed bar stuck to the bottom edge — no side margins,
        // top-border-only, rounded top corners so the bar reads as a card
        // detaching from the screen bottom rather than a flat system bar.
        "fixed inset-x-0 bottom-0 z-40 flex flex-col rounded-t-sm border-t border-border bg-bg shadow-lg shadow-ink/30",
        // sm+: float as a card in the bottom-right corner with full border + all corners rounded.
        "sm:inset-x-auto sm:right-4 sm:bottom-4 sm:w-[22rem] sm:max-w-[calc(100vw-2rem)] sm:rounded-sm sm:border",
        // Safe-area padding so iPhone home-indicator doesn't overlap the
        // bottom edge when the bar is flush with the screen. `sm:pb-*` resets
        // to the floating-card padding.
        collapsed
          ? "gap-0 px-3 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] sm:p-1.5 sm:pb-1.5"
          : "gap-3 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:pb-4",
      )}
    >
      <header className="flex items-center gap-3">
        <Thumbnail videoId={videoId} compact={collapsed} />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex items-center gap-2 min-w-0">
            <p
              className={cn(
                "text-fg truncate",
                collapsed ? "text-style-body font-semibold" : "text-style-heading-4",
              )}
            >
              {playing.title}
            </p>
            {cueMatches ? <SceneTrackBadge /> : null}
          </div>
          {!collapsed && hasMeta ? (
            <p className="text-style-caption text-fg-muted truncate">
              {playing.vocalist}
              {playing.vocalist && playing.composer ? " · " : null}
              {playing.composer}
            </p>
          ) : null}
          {!collapsed && playing.originalTitle ? (
            <p className="text-style-caption text-fg-muted truncate">
              {playing.originalTitle}
              {playing.romanizedTitle ? <> · {playing.romanizedTitle}</> : null}
            </p>
          ) : null}
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
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

      {!collapsed && cueDiffers ? (
        <UpNextCue song={cuedSong!} pulseRun={cuePulse} onPlay={() => play(cuedSong!)} />
      ) : null}

      <div className={cn(collapsed && "h-0 overflow-hidden")} aria-hidden={collapsed}>
        {videoId ? (
          <iframe
            key={playing.id}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={playing.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="aspect-video w-full rounded-sm border border-border"
          />
        ) : playing.audio ? (
          <audio key={playing.id} src={playing.audio} controls autoPlay className="w-full" />
        ) : (
          <p className="text-style-caption text-fg-muted italic">No audio source available.</p>
        )}
      </div>
    </aside>
  );
}

// Square album-art slot — smaller when the dock is collapsed so the bar
// reads as a thin status strip on mobile. YouTube thumbnails are 16:9
// (mqdefault = 320×180); `object-cover` center-crops the subject. When
// there's no videoId (audio-only or no source) we fall back to a glyph
// so the header layout stays visually consistent across track types.
function Thumbnail({ videoId, compact }: { videoId: string | null; compact: boolean }) {
  const base = cn(
    "shrink-0 rounded-sm border border-border bg-surface overflow-hidden",
    compact ? "h-8 w-8" : "h-10 w-10",
  );
  if (!videoId) {
    return (
      <div className={cn(base, "flex items-center justify-center text-fg-muted")} aria-hidden>
        <MusicNoteIcon weight="light" size={compact ? 16 : 20} />
      </div>
    );
  }
  return (
    <img
      src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
      alt=""
      aria-hidden
      loading="lazy"
      className={cn(base, "object-cover")}
    />
  );
}

function SceneTrackBadge() {
  return (
    <span
      className="shrink-0 rounded-full border border-accent/40 bg-accent-soft px-2 py-0.5 text-style-caption text-accent animate-scene-cue-enter"
      title="The author tied this song to the current reading page."
    >
      Scene track
    </span>
  );
}

function CueTeaser({
  song,
  pulseRun,
  onPlay,
  onDismiss,
}: {
  song: Song;
  pulseRun: number;
  onPlay: () => void;
  onDismiss: () => void;
}) {
  const hasSource = Boolean(song.audio || song.youtubeUrl);
  return (
    <aside
      role="complementary"
      aria-label="Scene track suggestion"
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 flex flex-col gap-3 rounded-t-sm border-t border-border bg-bg p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-lg shadow-ink/30 animate-scene-cue-enter",
        "sm:inset-x-auto sm:right-4 sm:bottom-4 sm:w-[22rem] sm:max-w-[calc(100vw-2rem)] sm:rounded-sm sm:border sm:pb-4",
      )}
    >
      <PulseOverlay run={pulseRun} />
      <header className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-style-eyebrow text-fg-muted">Scene track</span>
          <p className="text-style-heading-4 text-fg truncate">{song.title}</p>
          {song.originalTitle ? (
            <p className="text-style-caption text-fg-muted truncate">
              {song.originalTitle}
              {song.romanizedTitle ? <> · {song.romanizedTitle}</> : null}
            </p>
          ) : null}
        </div>
        <IconButton variant="ghost" size="sm" aria-label="Dismiss scene track" onClick={onDismiss}>
          <XIcon weight="light" />
        </IconButton>
      </header>
      <Button
        variant="primary"
        size="sm"
        onClick={onPlay}
        disabled={!hasSource}
        title={hasSource ? undefined : "No audio source available."}
      >
        <MusicNotesIcon weight="light" />
        Play
      </Button>
    </aside>
  );
}

function UpNextCue({
  song,
  pulseRun,
  onPlay,
}: {
  song: Song;
  pulseRun: number;
  onPlay: () => void;
}) {
  const hasSource = Boolean(song.audio || song.youtubeUrl);
  return (
    <button
      type="button"
      onClick={onPlay}
      disabled={!hasSource}
      className={cn(
        "relative flex items-center gap-2 rounded-sm border border-border bg-surface px-3 py-2 text-left text-style-caption animate-scene-cue-enter",
        "transition-colors hover:bg-accent-soft focus:outline-none focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-60",
      )}
      title={hasSource ? `Switch to ${song.title}` : "No audio source available."}
    >
      <PulseOverlay run={pulseRun} />
      <MusicNotesIcon weight="light" className="shrink-0 text-fg-muted" />
      <span className="text-fg-muted">Scene track:</span>
      <span className="min-w-0 flex-1 truncate text-fg">{song.title}</span>
    </button>
  );
}
