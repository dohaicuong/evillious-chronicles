import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Song } from "@src/data/schema";

type AudioContextValue = {
  currentSong: Song | null;
  play: (song: Song) => void;
  close: () => void;
};

const AudioContext = createContext<AudioContextValue | null>(null);

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within an <AudioProvider>");
  return ctx;
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  const play = useCallback((song: Song) => setCurrentSong(song), []);
  const close = useCallback(() => setCurrentSong(null), []);

  const value = useMemo(() => ({ currentSong, play, close }), [currentSong, play, close]);

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
