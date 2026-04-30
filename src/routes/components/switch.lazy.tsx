import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Switch } from "@src/components/primitives/switch";

export const Route = createLazyFileRoute("/components/switch")({
  component: SwitchPage,
});

const sins = ["pride", "lust", "sloth", "gluttony", "greed", "wrath", "envy"] as const;

function SwitchPage() {
  const [on, setOn] = useState(true);

  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">Switch</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Pill toggle. Auto-themes inside <code>data-sin</code> wrappers.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Uncontrolled</h2>
        <label className="flex items-center gap-3">
          <Switch defaultChecked aria-label="Dark mode" />
          <span className="text-style-body text-fg">Dark mode</span>
        </label>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Controlled</h2>
        <label className="flex items-center gap-3">
          <Switch checked={on} onCheckedChange={setOn} aria-label="Notifications" />
          <span className="text-style-body text-fg">Notifications</span>
          <span className="text-style-caption text-fg-muted">{on ? "On" : "Off"}</span>
        </label>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Disabled</h2>
        <label className="flex items-center gap-3">
          <Switch disabled aria-label="Locked setting" />
          <span className="text-style-body text-fg">Locked setting</span>
        </label>
        <label className="flex items-center gap-3">
          <Switch disabled defaultChecked aria-label="Locked on" />
          <span className="text-style-body text-fg">Locked on</span>
        </label>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Per-Sin Themes</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {sins.map((sin) => (
            <div key={sin} data-sin={sin} className="flex items-center gap-3">
              <Switch defaultChecked aria-label={sin} />
              <span className="text-style-body text-fg capitalize">{sin}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
