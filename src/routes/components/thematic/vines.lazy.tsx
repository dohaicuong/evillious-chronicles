import { createLazyFileRoute } from "@tanstack/react-router";
import { Button } from "@src/components/primitives/button";
import { Vines } from "@src/components/thematic/vines";

export const Route = createLazyFileRoute("/components/thematic/vines")({
  component: VinesPage,
});

function VinesPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-style-heading-1 text-fg">Vines</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          A curling vine that hugs the two edges meeting at the chosen corner — runs along one edge,
          curls around the corner, and trails along the other with a small inward spiral at the tip.
          Heart-shaped leaves dot the stem. Wraps a child element; aria-hidden /
          pointer-events-none.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-12 border border-border rounded-sm p-12">
        <div className="flex justify-center">
          <Vines corner="top-right">
            <Button variant="primary">Top right</Button>
          </Vines>
        </div>
        <div className="flex justify-center">
          <Vines corner="top-left">
            <Button variant="primary">Top left</Button>
          </Vines>
        </div>
        <div className="flex justify-center">
          <Vines corner="bottom-right">
            <Button variant="primary">Bottom right</Button>
          </Vines>
        </div>
        <div className="flex justify-center">
          <Vines corner="bottom-left">
            <Button variant="primary">Bottom left</Button>
          </Vines>
        </div>
      </div>
    </div>
  );
}
