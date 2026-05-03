import { useEffect, useRef, useState } from "react";
import { useAudio } from "@src/lib/audio";

const BG_VOLUME = 0.15;
const FADE_MS = 600;
const FADE_STEP_MS = 30;

/**
 * Persistent low-volume ambient track that plays whenever no foreground
 * song is selected. Renders a single hidden `<audio>` element so playback
 * survives route changes.
 *
 * The element carries `autoPlay` for the happy path (browsers that allow
 * it — e.g. when the site has prior engagement). If the browser refuses,
 * we fall back to a one-shot pointer/key listener and call `play()`
 * manually on the first gesture.
 */
export function BackgroundAudio() {
  const { currentSong, bgEnabled } = useAudio();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const [hasGesture, setHasGesture] = useState(false);

  // Pin initial volume to BG_VOLUME so the autoplay attempt (if it
  // succeeds) starts at the ambient level instead of the browser default
  // of 1.0. The `play` listener also flips `hasGesture` — if autoplay
  // got us playing, the playback effect below shouldn't try to play()
  // again or fight the volume.
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = BG_VOLUME;
    const onPlay = () => setHasGesture(true);
    el.addEventListener("play", onPlay);
    return () => el.removeEventListener("play", onPlay);
  }, []);

  // Fallback path: autoplay refused. The next pointer/key event arms
  // playback by flipping `hasGesture`, which the playback effect then
  // turns into a manual `play()` call.
  useEffect(() => {
    if (hasGesture) return;
    const onGesture = () => setHasGesture(true);
    window.addEventListener("pointerdown", onGesture, { once: true });
    window.addEventListener("keydown", onGesture, { once: true });
    return () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
    };
  }, [hasGesture]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const shouldPlay = bgEnabled && hasGesture && !currentSong;

    if (fadeRef.current != null) {
      window.clearInterval(fadeRef.current);
      fadeRef.current = null;
    }

    if (shouldPlay && el.paused) {
      el.volume = 0;
      el.play().catch(() => {
        // Autoplay rejection (Safari is strict about gesture freshness):
        // re-arm so the next interaction tries again.
        setHasGesture(false);
      });
    } else if (!shouldPlay && el.paused) {
      // At rest already — don't fade volume to 0, that would silence the
      // next autoplay/play attempt before it begins.
      return;
    }

    const start = el.volume;
    const target = shouldPlay ? BG_VOLUME : 0;
    if (start === target) {
      return;
    }

    const steps = Math.max(1, Math.floor(FADE_MS / FADE_STEP_MS));
    const delta = (target - start) / steps;
    let i = 0;

    fadeRef.current = window.setInterval(() => {
      i++;
      el.volume = Math.max(0, Math.min(1, start + delta * i));
      if (i >= steps) {
        if (fadeRef.current != null) {
          window.clearInterval(fadeRef.current);
          fadeRef.current = null;
        }
        if (!shouldPlay) el.pause();
      }
    }, FADE_STEP_MS);

    return () => {
      if (fadeRef.current != null) {
        window.clearInterval(fadeRef.current);
        fadeRef.current = null;
      }
    };
  }, [bgEnabled, hasGesture, currentSong]);

  return (
    <audio ref={audioRef} src="/background.mp3" loop autoPlay preload="auto" aria-hidden hidden />
  );
}
