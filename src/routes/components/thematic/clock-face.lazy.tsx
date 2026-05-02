import { createLazyFileRoute } from "@tanstack/react-router";
import { ClockFace } from "@src/components/thematic/clock-face";

export const Route = createLazyFileRoute("/components/thematic/clock-face")({
  component: ClockFacePage,
});

function ClockFacePage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-style-heading-1 text-fg">Clock Face</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Twelve tick marks, a static hour hand at 3 o'clock, and a minute hand that ticks once per
          step (60-step rotation). Sized in <code>em</code> so it scales with surrounding text;
          designed to overlay the "C" of a display heading.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-12 border border-border rounded-sm p-8 text-style-display text-fg">
        <span className="relative inline-block">
          C
          <ClockFace />
        </span>
        <span className="relative inline-block" style={{ fontSize: "6rem" }}>
          C
          <ClockFace />
        </span>
      </div>
    </div>
  );
}
