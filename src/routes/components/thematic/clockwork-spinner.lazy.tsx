import { createLazyFileRoute } from "@tanstack/react-router";
import { ClockworkSpinner } from "@src/components/thematic/clockwork-spinner";

export const Route = createLazyFileRoute("/components/thematic/clockwork-spinner")({
  component: ClockworkSpinnerPage,
});

function ClockworkSpinnerPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-style-heading-1 text-fg">Clockwork Spinner</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Slow gear rotation (4s) — slower than Tailwind's default <code>animate-spin</code> to
          fit the pocket-watch motif. Use for loading states.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-8 border border-border rounded-sm p-6">
        <ClockworkSpinner size={20} />
        <ClockworkSpinner size={32} />
        <ClockworkSpinner size={48} />
        <div data-sin="pride">
          <ClockworkSpinner size={32} />
        </div>
        <div data-sin="wrath">
          <ClockworkSpinner size={32} />
        </div>
        <div data-sin="lust">
          <ClockworkSpinner size={32} />
        </div>
      </div>
    </div>
  );
}
