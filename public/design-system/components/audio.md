```scope
Button
MusicNotesIcon
useAudio
```

# Audio Dock

Persistent player at the bottom-right of the viewport. Plays YouTube embeds, with a fallback to native `<audio>` when a song has a local file. Triggered via `useAudio().play(song)`; the dock mounts once at the app root and survives navigation, so a song you started on one chapter keeps playing as you turn pages.

```tsx preview
() => {
  const { play } = useAudio();
  const song = {
    id: "daughter-of-evil",
    title: "Daughter of Evil",
    originalTitle: "悪ノ娘",
    youtubeUrl: "https://www.youtube.com/watch?v=W77q-kK8iA8",
    vocalist: "Kagamine Rin",
    composer: "Akuno-P (mothy)",
    releaseYear: 2008,
  };
  return (
    <Button variant="primary" size="sm" onClick={() => play(song)}>
      <MusicNotesIcon weight="light" />
      Play "Daughter of Evil"
    </Button>
  );
};
```

## Anatomy

`AudioProvider` wraps the app once near the root. From any descendant, call `useAudio()` to receive the dock controls. Playback is opt-in — the user has to click a play affordance, since browsers block autoplay until then anyway.

```tsx
// app shell — once
import { AudioProvider } from "@src/lib/audio";

<AudioProvider>
  <App />
</AudioProvider>;

// any descendant
import { useAudio } from "@src/lib/audio";
import { songs } from "@app/songs/-songs";

function PlayDaughter() {
  const { play } = useAudio();
  return <Button onClick={() => play(songs["daughter-of-evil"])}>Play</Button>;
}
```

## Examples

### Catalog

Click a song to load it into the persistent dock. The dock appears bottom-right and keeps playing across navigation. While a song is loaded, the _Now playing_ state replaces the row's primary button so it's clear which one is active.

```tsx preview
() => {
  const { play, currentSong, close } = useAudio();
  const sampleSongs = [
    {
      id: "daughter-of-evil",
      title: "Daughter of Evil",
      originalTitle: "悪ノ娘",
      youtubeUrl: "https://www.youtube.com/watch?v=W77q-kK8iA8",
      vocalist: "Kagamine Rin",
      composer: "Akuno-P (mothy)",
      releaseYear: 2008,
    },
    {
      id: "servant-of-evil",
      title: "Servant of Evil",
      originalTitle: "悪ノ召使",
      youtubeUrl: "https://www.youtube.com/watch?v=yzpNpaS0uLc",
      vocalist: "Kagamine Len",
      composer: "Akuno-P (mothy)",
      releaseYear: 2008,
    },
    {
      id: "regret-message",
      title: "Regret Message",
      originalTitle: "リグレットメッセージ",
      youtubeUrl: "https://www.youtube.com/watch?v=7bdSWHkHbec",
      vocalist: "Kagamine Rin",
      composer: "Akuno-P (mothy)",
      releaseYear: 2008,
    },
  ];
  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-col">
        {sampleSongs.map((song) => {
          const isCurrent = currentSong?.id === song.id;
          return (
            <li
              key={song.id}
              className="flex items-center gap-4 border-t border-border last:border-b py-3"
            >
              <div className="flex-1 flex flex-col gap-0.5">
                <span className="text-style-body text-fg">{song.title}</span>
                <span className="text-style-caption text-fg-muted">
                  {[song.originalTitle, song.vocalist, song.composer, song.releaseYear].join(" · ")}
                </span>
              </div>
              <Button
                variant={isCurrent ? "outline" : "primary"}
                size="sm"
                onClick={() => play(song)}
              >
                <MusicNotesIcon weight="light" />
                {isCurrent ? "Now playing" : "Play"}
              </Button>
            </li>
          );
        })}
      </ul>
      {currentSong ? (
        <div className="flex items-center justify-between gap-3 mt-2">
          <span className="text-style-caption text-fg-muted">
            Currently loaded: <strong className="text-fg">{currentSong.title}</strong>
          </span>
          <Button variant="ghost" size="sm" onClick={close}>
            Close dock
          </Button>
        </div>
      ) : null}
    </div>
  );
};
```

## Props

### useAudio()

Returns the audio dock controls. Call from any component below `AudioProvider`.

```json props
[
  {
    "prop": "play",
    "type": "(song: Song) => void",
    "default": "—",
    "description": "Loads the song into the dock and starts playback. Replaces any currently-loaded song."
  },
  {
    "prop": "close",
    "type": "() => void",
    "default": "—",
    "description": "Tears down the dock. Use for an explicit \"stop and dismiss\" affordance."
  },
  {
    "prop": "currentSong",
    "type": "Song | null",
    "default": "null",
    "description": "The song the dock is currently bound to. Useful for rendering an \"is-playing\" indicator next to a row."
  },
  {
    "prop": "cuedSong",
    "type": "Song | null",
    "default": "null",
    "description": "Scene cue for the current page (set via `setCue`). Surfaces in the dock as a tap-to-play hint without auto-starting playback."
  },
  {
    "prop": "setCue",
    "type": "(song: Song | null) => void",
    "default": "—",
    "description": "Pin or clear the page's scene cue. Typically called from a route's mount / unmount effect."
  },
  {
    "prop": "bgEnabled",
    "type": "boolean",
    "default": "true",
    "description": "Whether the low-volume ambient track plays during silence (when `currentSong` is null). Persisted to localStorage."
  },
  {
    "prop": "setBgEnabled",
    "type": "(enabled: boolean) => void",
    "default": "—",
    "description": "Toggle the ambient background track. The setting persists across sessions."
  }
]
```

### AudioProvider

Mounted once near the app root. Holds the dock state — current song, cue, and background-audio preference.

```json props
[
  {
    "prop": "children",
    "type": "ReactNode",
    "default": "—",
    "description": "App tree. Any descendant calling `useAudio()` reads this provider's state."
  }
]
```

## Notes

- Browser autoplay policy means `play(song)` only starts audio after a user gesture. Calling it during initial render (e.g. to auto-resume) won't actually play — Chrome / Safari will queue the source paused.
- YouTube playback uses the IFrame Player API. If the embed is blocked (network rules, content restrictions), the dock falls back to the silent state — there is no error UI; check the browser console.
- `setCue` is independent of `play`. Cueing a song highlights it in the dock so the user knows there's a scene-tied track for this page, but doesn't start playback. The user has to tap to play.
