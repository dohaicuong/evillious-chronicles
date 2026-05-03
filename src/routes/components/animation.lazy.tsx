import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createLazyFileRoute("/components/animation")({
  component: AnimationPage,
});

// One-shot animations need a replay tick for the docs page to keep showing
// them off; this remounts its child on a fixed cadence so the underlying
// CSS animation re-fires on each tick.
function ReplayLoop({ intervalMs, children }: { intervalMs: number; children: React.ReactNode }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);
  return <div key={tick}>{children}</div>;
}

function AnimationPage() {
  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">Animation</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          A small set of named keyframes drives the moving parts — clockwork gears, progress bars,
          and skeleton shimmer. Most other transitions use Tailwind's stock utilities at
          deliberately slow durations so the storybook pacing reads as contemplative rather than
          reactive.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Keyframes</h2>
        <div className="flex flex-col gap-6">
          <KeyframeCard
            name="spin"
            source="Tailwind built-in"
            description="One full clockwise rotation around the element's center. Drives the gear ornaments and the clock face's minute hand. Varied durations (4s for the spinner, 18s for the big gear, etc.) tune the visual weight."
          >
            <div
              className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent"
              style={{ animation: "spin 1.4s linear infinite" }}
            />
          </KeyframeCard>

          <KeyframeCard
            name="progress-indeterminate"
            source="Custom — index.css"
            description="Sweeps a translucent block from off-screen-left to off-screen-right (-100% → 400%). Used by the indeterminate Progress bar; loops continuously while the operation runs."
          >
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface">
              <div
                className="h-full w-1/3 bg-accent"
                style={{ animation: "progress-indeterminate 1.6s ease-in-out infinite" }}
              />
            </div>
          </KeyframeCard>

          <KeyframeCard
            name="skeleton-shimmer"
            source="Custom — index.css"
            description="Slides a 200% background gradient from right to left to suggest light glancing across an unloaded surface. Pair with a horizontal linear-gradient background to render the shimmer band."
          >
            <div
              className="h-4 w-full rounded-sm"
              style={{
                background:
                  "linear-gradient(90deg, var(--color-surface) 0%, var(--color-border) 50%, var(--color-surface) 100%)",
                backgroundSize: "200% 100%",
                animation: "skeleton-shimmer 1.5s ease-in-out infinite",
              }}
            />
          </KeyframeCard>

          <KeyframeCard
            name="scene-cue-enter"
            source="Custom — index.css"
            description="200ms fade + 6px slide-up that fires once on mount. Used by the audio dock's scene-cue surfaces (CueTeaser, UpNextCue, SceneTrackBadge) so they appear smoothly when the reader lands on a page that pins a song. Apply via the animate-scene-cue-enter utility."
          >
            <ReplayLoop intervalMs={2200}>
              <div className="flex w-full justify-center">
                <span className="rounded-sm border border-border bg-surface px-3 py-2 text-style-caption text-fg animate-scene-cue-enter">
                  Scene track: Daughter of Evil
                </span>
              </div>
            </ReplayLoop>
          </KeyframeCard>

          <KeyframeCard
            name="scene-cue-pulse"
            source="Custom — index.css"
            description="700ms expanding box-shadow ring in --color-accent-soft. One-shot — fires when the page-bound song cue changes while the surface is already mounted (a counter-keyed PulseOverlay re-mounts to retrigger the animation on each transition). Skipped on first mount so it doesn't double up with scene-cue-enter."
          >
            <ReplayLoop intervalMs={1500}>
              <div className="flex w-full justify-center">
                <span className="relative rounded-sm border border-border bg-surface px-3 py-2 text-style-caption text-fg">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-sm animate-scene-cue-pulse"
                  />
                  Scene track: Daughter of Evil
                </span>
              </div>
            </ReplayLoop>
          </KeyframeCard>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-style-eyebrow text-fg-muted">Durations & easing</h2>
        <p className="text-style-body text-fg-muted">
          Tailwind's defaults cover the common cases — <code>duration-150</code> for hover
          transitions, <code>duration-200</code> for sidebar collapse, longer{" "}
          <code>duration-1000</code>+ for set-pieces like spinners. Easing usually stays at{" "}
          <code>ease-out</code> for entries and <code>ease-in-out</code> for repeating motion;
          <code>linear</code> is reserved for continuous rotation (gears, clock hands) where
          acceleration would feel unnatural.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-style-eyebrow text-fg-muted">When not to animate</h2>
        <p className="text-style-body text-fg-muted">
          Reading is the primary use — anything that distracts from prose, page-turn flow, or
          progress should stay still. Reserve motion for state transitions the reader initiated
          (drawer open, page advance) and for genuinely indeterminate work (loading, syncing).
        </p>
      </section>
    </div>
  );
}

function KeyframeCard({
  name,
  source,
  description,
  children,
}: {
  name: string;
  source: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 border border-border rounded-sm p-5">
      <div className="flex items-baseline justify-between gap-3">
        <code className="text-style-heading-3 text-fg">@keyframes {name}</code>
        <span className="text-style-caption text-fg-muted">{source}</span>
      </div>
      <p className="text-style-caption text-fg-muted">{description}</p>
      <div className="flex items-center justify-center border-t border-border pt-5 mt-1">
        {children}
      </div>
    </div>
  );
}
