import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "@src/components/primitives/button";
import { ContinueReadingRow } from "@src/components/library/continue-reading-row";

export const Route = createFileRoute("/_app/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8 px-6 py-20">
      <span className="text-style-eyebrow text-fg-muted">A multimedia chronicle by mothy</span>

      <h1 className="text-style-display text-fg text-center">Evillious Chronicles</h1>

      <div aria-hidden className="font-accent text-2xl text-accent leading-none">
        ✦
      </div>

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
