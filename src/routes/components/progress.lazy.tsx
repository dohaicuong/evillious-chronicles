import { createLazyFileRoute } from "@tanstack/react-router";
import { Progress } from "../../components/primitives/progress";

export const Route = createLazyFileRoute("/components/progress")({
  component: ProgressPage,
});

const sins = ["pride", "lust", "sloth", "gluttony", "greed", "wrath", "envy"] as const;
const stops = [0, 25, 50, 75, 100] as const;

function ProgressPage() {
  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">Progress</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Linear bar for chapter reading, audio scrubbing, and loading. Auto-themes inside{" "}
          <code>data-sin</code> wrappers.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Sizes</h2>
        <div className="flex max-w-md flex-col gap-5">
          <div className="flex flex-col gap-2">
            <span className="text-style-caption text-fg-muted">Small</span>
            <Progress value={64} size="sm" aria-label="Small progress" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-style-caption text-fg-muted">Medium</span>
            <Progress value={64} size="md" aria-label="Medium progress" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-style-caption text-fg-muted">Large</span>
            <Progress value={64} size="lg" aria-label="Large progress" />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Values</h2>
        <div className="flex max-w-md flex-col gap-5">
          {stops.map((v) => (
            <div key={v} className="flex flex-col gap-2">
              <span className="text-style-caption text-fg-muted">{v}%</span>
              <Progress value={v} aria-label={`${v} percent`} />
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Indeterminate</h2>
        <div className="flex max-w-md flex-col gap-2">
          <span className="text-style-caption text-fg-muted">Loading</span>
          <Progress value={null} aria-label="Loading" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">With Label & Value</h2>
        <div className="max-w-md">
          <Progress value={42} label="Chapter 3" showValue aria-label="Chapter 3 progress" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Per-Sin Themes</h2>
        <div className="grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
          {sins.map((sin) => (
            <div key={sin} data-sin={sin} className="flex flex-col gap-2">
              <span className="text-style-caption text-fg-muted capitalize">{sin}</span>
              <Progress value={64} aria-label={`${sin} progress`} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
