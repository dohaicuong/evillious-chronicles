import { createLazyFileRoute } from "@tanstack/react-router";
import { MusicNotesIcon } from "@phosphor-icons/react";
import { Button } from "../../components/primitives/button";
import { useAudio } from "../../lib/audio";
import { songs } from "../../data/songs";

export const Route = createLazyFileRoute("/components/audio")({
  component: AudioPage,
});

function AudioPage() {
  const { play, currentSong, close } = useAudio();

  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">Audio Dock</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Persistent player at the bottom-right of the viewport. Plays YouTube embeds (with fallback
          to native <code>&lt;audio&gt;</code> when a song has a local file). Triggered via{" "}
          <code>useAudio().play(song)</code>.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Catalog</h2>
        <p className="text-style-caption text-fg-muted">
          Click a song to load it into the dock. The dock appears bottom-right and persists across
          navigation.
        </p>
        <ul className="flex flex-col">
          {Object.values(songs).map((song) => {
            const isCurrent = currentSong?.id === song.id;
            return (
              <li
                key={song.id}
                className="flex items-center gap-4 border-t border-border last:border-b py-3"
              >
                <div className="flex-1 flex flex-col gap-0.5">
                  <span className="text-style-body text-fg">{song.title}</span>
                  <span className="text-style-caption text-fg-muted">
                    {song.originalTitle} · {song.vocalist} · {song.composer} · {song.releaseYear}
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
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">API</h2>
        <pre className="text-style-caption text-fg bg-surface border border-border rounded-sm p-4 overflow-x-auto">{`import { useAudio } from "@/lib/audio";
import { getSong } from "@/data/songs";

const { play, close, currentSong } = useAudio();

play(getSong("daughter-of-evil")!);
close();`}</pre>
      </section>
    </div>
  );
}
