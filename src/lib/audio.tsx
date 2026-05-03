import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
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
  /**
   * Whether the low-volume ambient track plays during silence (when
   * `currentSong` is null). User-toggled via the nav button; persisted.
   */
  bgEnabled: boolean;
  play: (song: Song) => void;
  close: () => void;
  /**
   * Pin/clear the page's scene cue. Called from the page route on mount /
   * unmount; passing null clears the highlight.
   */
  setCue: (song: Song | null) => void;
  setBgEnabled: (enabled: boolean) => void;
};

const BG_STORAGE_KEY = "evillious-bg-audio-enabled";

function readBgEnabled(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = window.localStorage.getItem(BG_STORAGE_KEY);
    if (raw === null) return true;
    return raw === "true";
  } catch {
    return true;
  }
}

function writeBgEnabled(v: boolean): void {
  try {
    window.localStorage.setItem(BG_STORAGE_KEY, String(v));
  } catch {
    /* quota / private mode: silently drop */
  }
}

const AudioContext = createContext<AudioContextValue | null>(null);

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within an <AudioProvider>");
  return ctx;
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [cuedSong, setCuedSong] = useState<Song | null>(null);
  const [bgEnabled, setBgEnabledState] = useState<boolean>(() => readBgEnabled());

  useEffect(() => {
    writeBgEnabled(bgEnabled);
  }, [bgEnabled]);

  const play = useCallback((song: Song) => setCurrentSong(song), []);
  const close = useCallback(() => setCurrentSong(null), []);
  const setCue = useCallback((song: Song | null) => setCuedSong(song), []);
  const setBgEnabled = useCallback((v: boolean) => setBgEnabledState(v), []);

  const value = useMemo(
    () => ({ currentSong, cuedSong, bgEnabled, play, close, setCue, setBgEnabled }),
    [currentSong, cuedSong, bgEnabled, play, close, setCue, setBgEnabled],
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
