import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "@src/components/primitives/button";
import { ContinueReadingRow } from "@src/components/library/continue-reading-row";
import { ClockworkOrnament } from "@src/components/thematic/clockwork-ornament";

export const Route = createFileRoute("/_app/")({
  component: Home,
});

function ClockFace() {
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const inner = 22;
    const outer = 27;
    return {
      x1: 30 + Math.cos(angle) * inner,
      y1: 30 + Math.sin(angle) * inner,
      x2: 30 + Math.cos(angle) * outer,
      y2: 30 + Math.sin(angle) * outer,
    };
  });

  return (
    <svg
      aria-hidden
      viewBox="0 0 60 60"
      className="text-fg-muted/70 pointer-events-none absolute top-1/2 left-1/2 h-[0.5em] w-[0.5em] -translate-x-[35%] -translate-y-[60%]"
    >
      {ticks.map((t, i) => (
        <line
          key={i}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ))}
      {/* Hour hand — short, up-left (~10 o'clock) */}
      <line
        x1="30"
        y1="30"
        x2="22"
        y2="20"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Minute hand — long, right (3 o'clock) */}
      <line
        x1="30"
        y1="30"
        x2="44"
        y2="30"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="30" cy="30" r="1.6" fill="currentColor" />
    </svg>
  );
}

function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8 px-6 py-20">
      <span className="text-style-eyebrow text-fg-muted">A multimedia chronicle by mothy</span>

      <h1 className="text-style-display text-fg text-center">
        <span className="relative isolate inline-block">
          Evillious
          <ClockworkOrnament
            size={64}
            className="absolute top-1/2 right-full -z-10 hidden -translate-y-1/2 translate-x-10 opacity-40 sm:block"
          />
        </span>{" "}
        <span className="relative isolate inline-block whitespace-nowrap">
          <span className="relative inline-block">
            C
            <ClockFace />
          </span>
          hronicles
          <ClockworkOrnament
            size={64}
            count={3}
            className="absolute top-1/2 left-full -z-10 -translate-x-10 -translate-y-1/2 -scale-x-100 opacity-40"
          />
        </span>
      </h1>

      <p className="text-style-lead text-fg-muted text-center max-w-md">
        A reader's chronicle of sin and song — across a thousand years of the continent of Bolganio.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
        <Button variant="primary" render={<Link to="/library" />}>
          Open the Library
        </Button>
      </div>

      <ContinueReadingRow />
    </div>
  );
}
