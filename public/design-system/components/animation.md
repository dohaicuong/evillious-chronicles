```scope

```

# Animation

A small set of named keyframes drives the moving parts — clockwork gears, progress bars, skeleton shimmer, and scene-cue surfaces. Most other transitions use Tailwind's stock utilities at deliberately slow durations so the storybook pacing reads as contemplative rather than reactive.

## Keyframes

### spin

One full clockwise rotation around the element's centre. Tailwind's built-in. Drives the gear ornaments and the clock face's minute hand. Varied durations (4s for the spinner, 18s for the big gear) tune the visual weight.

```tsx preview
<div
  className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent"
  style={{ animation: "spin 1.4s linear infinite" }}
/>
```

### progress-indeterminate

Custom keyframe in `index.css`. Sweeps a translucent block from off-screen-left to off-screen-right (`-100%` → `400%`). Used by the indeterminate `Progress` bar; loops continuously while the operation runs.

```tsx preview
<div className="h-1.5 w-full overflow-hidden rounded-full bg-surface">
  <div
    className="h-full w-1/3 bg-accent"
    style={{ animation: "progress-indeterminate 1.6s ease-in-out infinite" }}
  />
</div>
```

### skeleton-shimmer

Custom keyframe in `index.css`. Slides a 200% background gradient from right to left to suggest light glancing across an unloaded surface. Pair with a horizontal linear-gradient background to render the shimmer band.

```tsx preview
<div
  className="h-4 w-full rounded-sm"
  style={{
    background:
      "linear-gradient(90deg, var(--color-surface) 0%, var(--color-border) 50%, var(--color-surface) 100%)",
    backgroundSize: "200% 100%",
    animation: "skeleton-shimmer 1.5s ease-in-out infinite",
  }}
/>
```

### scene-cue-enter

Custom utility (`animate-scene-cue-enter`). 200 ms fade + 6 px slide-up that fires once on mount. Used by the audio dock's scene-cue surfaces (CueTeaser, UpNextCue, SceneTrackBadge) so they appear smoothly when the reader lands on a page that pins a song. The preview re-mounts on a 2.2 s loop so you can see the entry animation repeat.

```tsx preview
() => {
  const ReplayLoop = ({ intervalMs, children }) => {
    const [tick, setTick] = useState(0);
    useEffect(() => {
      const id = window.setInterval(() => setTick((t) => t + 1), intervalMs);
      return () => window.clearInterval(id);
    }, [intervalMs]);
    return <div key={tick}>{children}</div>;
  };
  return (
    <ReplayLoop intervalMs={2200}>
      <div className="flex w-full justify-center">
        <span className="rounded-sm border border-border bg-surface px-3 py-2 text-style-caption text-fg animate-scene-cue-enter">
          Scene track: Daughter of Evil
        </span>
      </div>
    </ReplayLoop>
  );
};
```

### scene-cue-pulse

Custom utility (`animate-scene-cue-pulse`). 700 ms expanding box-shadow ring in `--color-accent-soft`. One-shot — fires when the page-bound song cue _changes_ while the surface is already mounted (a counter-keyed `PulseOverlay` re-mounts to retrigger the animation on each transition). Skipped on first mount so it doesn't double up with `scene-cue-enter`.

```tsx preview
() => {
  const ReplayLoop = ({ intervalMs, children }) => {
    const [tick, setTick] = useState(0);
    useEffect(() => {
      const id = window.setInterval(() => setTick((t) => t + 1), intervalMs);
      return () => window.clearInterval(id);
    }, [intervalMs]);
    return <div key={tick}>{children}</div>;
  };
  return (
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
  );
};
```

## Durations & easing

Tailwind's defaults cover the common cases — `duration-150` for hover transitions, `duration-200` for sidebar collapse, longer `duration-1000`+ for set-pieces like spinners. Easing usually stays at `ease-out` for entries and `ease-in-out` for repeating motion; `linear` is reserved for continuous rotation (gears, clock hands) where acceleration would feel unnatural.

## When not to animate

Reading is the primary use — anything that distracts from prose, page-turn flow, or progress should stay still. Reserve motion for state transitions the reader initiated (drawer open, page advance) and for genuinely indeterminate work (loading, syncing).
