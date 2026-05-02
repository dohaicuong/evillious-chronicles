import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@src/components/primitives/link";
import { Button } from "@src/components/primitives/button";
import { ContinueReadingRow } from "@src/components/library/continue-reading-row";
import { ClockFace } from "@src/components/thematic/clock-face";
import { ClockworkOrnament } from "@src/components/thematic/clockwork-ornament";
import { Vines } from "@src/components/thematic/vines";

export const Route = createFileRoute("/_app/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8 px-6 py-20">
      <span className="text-style-eyebrow text-fg-muted">A multimedia chronicle by mothy</span>

      <h1 className="text-style-display text-fg text-center">
        <span className="relative isolate inline-block">
          Evillious
          <ClockworkOrnament
            size={64}
            speed={0.5}
            chain={2}
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
        <Vines>
          <Button variant="primary" render={<Link to="/library" />}>
            Open Library
          </Button>
        </Vines>
      </div>

      <ContinueReadingRow />
    </div>
  );
}
