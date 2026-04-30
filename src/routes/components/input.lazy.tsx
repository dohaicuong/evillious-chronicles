import { createLazyFileRoute } from "@tanstack/react-router";
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Input } from "@src/components/primitives/input";

export const Route = createLazyFileRoute("/components/input")({
  component: InputPage,
});

function InputPage() {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">Input</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Three sizes, optional icons, validation and disabled states.
        </p>
      </header>

      <section className="flex flex-col gap-4 max-w-md">
        <h2 className="text-style-eyebrow text-fg-muted">Sizes</h2>
        <Input size="sm" placeholder="Small" />
        <Input size="md" placeholder="Medium" />
        <Input size="lg" placeholder="Large" />
      </section>

      <section className="flex flex-col gap-2 max-w-md">
        <h2 className="text-style-eyebrow text-fg-muted">Controlled</h2>
        <Input
          placeholder="Type something..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <p className="text-style-caption text-fg-muted">
          Current value: <span className="text-fg">{value || "(empty)"}</span>
        </p>
      </section>

      <section className="flex flex-col gap-4 max-w-md">
        <h2 className="text-style-eyebrow text-fg-muted">With Icons</h2>
        <Input leftIcon={<MagnifyingGlassIcon />} placeholder="Search the library" />
        <Input rightIcon={<XIcon />} placeholder="Filter" />
      </section>

      <section className="flex flex-col gap-4 max-w-md">
        <h2 className="text-style-eyebrow text-fg-muted">States</h2>
        <Input disabled placeholder="Disabled" />
        <Input invalid placeholder="Invalid" defaultValue="not quite right" />
      </section>

      <section className="flex flex-col gap-4 max-w-md" data-sin="pride">
        <h2 className="text-style-eyebrow text-fg-muted">Sin Theme — Pride</h2>
        <Input placeholder="Focus me to see the accent border" />
      </section>
    </div>
  );
}
