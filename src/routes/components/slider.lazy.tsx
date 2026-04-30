import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Slider } from "@src/components/primitives/slider";

export const Route = createLazyFileRoute("/components/slider")({
  component: SliderPage,
});

function SliderPage() {
  const [size, setSize] = useState(18);

  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">Slider</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Single-thumb range control. Drives font size and audio scrubbing. Auto-themes inside{" "}
          <code>data-sin</code> wrappers.
        </p>
      </header>

      <section className="flex max-w-md flex-col gap-3">
        <span className="text-style-eyebrow text-fg-muted">Font Size</span>
        <Slider defaultValue={50} min={0} max={100} step={1} aria-label="Font size" />
      </section>

      <section className="flex max-w-md flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <span className="text-style-eyebrow text-fg-muted">Font Size</span>
          <span className="text-style-caption text-fg-muted">{size}px</span>
        </div>
        <Slider
          value={size}
          onValueChange={(v) => setSize(v)}
          min={12}
          max={32}
          step={1}
          aria-label="Font size"
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Per-Sin Themes</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div data-sin="pride" className="flex flex-col gap-3">
            <span className="text-style-eyebrow text-fg-muted">Pride</span>
            <Slider defaultValue={30} aria-label="Pride" />
          </div>
          <div data-sin="greed" className="flex flex-col gap-3">
            <span className="text-style-eyebrow text-fg-muted">Greed</span>
            <Slider defaultValue={60} aria-label="Greed" />
          </div>
          <div data-sin="wrath" className="flex flex-col gap-3">
            <span className="text-style-eyebrow text-fg-muted">Wrath</span>
            <Slider defaultValue={85} aria-label="Wrath" />
          </div>
        </div>
      </section>
    </div>
  );
}
