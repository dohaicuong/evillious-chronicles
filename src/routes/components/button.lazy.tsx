import { createLazyFileRoute } from "@tanstack/react-router";
import { Button } from "../../components/primitives/button";

export const Route = createLazyFileRoute("/components/button")({
  component: ButtonPage,
});

const sins = ["pride", "lust", "sloth", "gluttony", "greed", "wrath", "envy"] as const;

function ButtonPage() {
  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">Button</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Four variants, three sizes. Auto-themes inside <code>data-sin</code> wrappers.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Default — Candle</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Continue Reading</Button>
          <Button variant="secondary">Library</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Settings</Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Per-Sin Themes</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {sins.map((sin) => (
            <div key={sin} data-sin={sin} className="flex flex-col items-center gap-2">
              <Button variant="primary" className="w-full capitalize">
                {sin}
              </Button>
              <Button variant="secondary" className="w-full capitalize">
                {sin}
              </Button>
              <Button variant="outline" className="w-full capitalize">
                {sin}
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
