import { createLazyFileRoute } from "@tanstack/react-router";
import { ClockworkOrnament } from "@src/components/thematic/clockwork-ornament";

export const Route = createLazyFileRoute("/components/thematic/clockwork-ornament")({
  component: ClockworkOrnamentPage,
});

function ClockworkOrnamentPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-style-heading-1 text-fg">Clockwork Ornament</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Decorative pair of interlocking gears — six-tooth gear (18s) and a smaller four-tooth gear
          (12s reverse). Purely ornamental (<code>aria-hidden</code>); for loading semantics use{" "}
          <code>ClockworkSpinner</code>.
        </p>
      </header>

      <div className="flex flex-wrap items-end gap-12 border border-border rounded-sm p-8">
        <ClockworkOrnament size={48} />
        <ClockworkOrnament size={80} />
        <ClockworkOrnament size={120} />
        <div data-sin="pride">
          <ClockworkOrnament size={80} />
        </div>
        <div data-sin="greed">
          <ClockworkOrnament size={80} />
        </div>
      </div>
    </div>
  );
}
