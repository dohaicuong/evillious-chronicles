import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Song } from "@src/lib/schema";

type AudioContextValue = {
  currentSong: Song | null;
  /**
   * Scene-cue track for the page currently in the reader. Surfaces in the
   * audio dock so the user can see / tap-to-play the song the author tied
   * to this page (`Page.songCue`). Distinct from `currentSong` — setting a
   * cue never starts playback on its own (would fight browser autoplay
   * policy and surprise users reading without sound).
   */
  cuedSong: Song | null;
  play: (song: Song) => void;
  close: () => void;
  /**
   * Pin/clear the page's scene cue. Called from the page route on mount /
   * unmount; passing null clears the highlight.
   */
  setCue: (song: Song | null) => void;
};

const AudioContext = createContext<AudioContextValue | null>(null);

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within an <AudioProvider>");
  return ctx;
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [cuedSong, setCuedSong] = useState<Song | null>(null);

  const play = useCallback((song: Song) => setCurrentSong(song), []);
  const close = useCallback(() => setCurrentSong(null), []);
  const setCue = useCallback((song: Song | null) => setCuedSong(song), []);

  const value = useMemo(
    () => ({ currentSong, cuedSong, play, close, setCue }),
    [currentSong, cuedSong, play, close, setCue],
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

/**
 * Extract a YouTube video ID from various URL formats.
 * Supports `youtube.com/watch?v=ID`, `youtu.be/ID`, and `youtube.com/embed/ID`.
 */
export function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]+)/);
  return match ? match[1] : null;
}
