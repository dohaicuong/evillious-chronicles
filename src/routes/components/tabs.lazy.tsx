import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Tabs } from "@src/components/primitives/tabs";

export const Route = createLazyFileRoute("/components/tabs")({
  component: TabsPage,
});

function TabsPage() {
  const [value, setValue] = useState<string | number | null>("bookmarks");

  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">Tabs</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Reader drawer tabs. Eyebrow type, animated indicator, sin-aware accent.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Default — Uncontrolled</h2>
        <Tabs defaultValue="toc">
          <Tabs.List>
            <Tabs.Tab value="toc">Contents</Tabs.Tab>
            <Tabs.Tab value="bookmarks">Bookmarks</Tabs.Tab>
            <Tabs.Tab value="notes">Notes</Tabs.Tab>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Panel value="toc">
            <p className="text-style-body text-fg">
              The chapters of this volume, ordered as the chronicler set them down. Wander where you
              will; the tale waits.
            </p>
          </Tabs.Panel>
          <Tabs.Panel value="bookmarks">
            <p className="text-style-body text-fg">
              Pages you have folded the corner of. Return to them at your leisure, or strike them
              from the record.
            </p>
          </Tabs.Panel>
          <Tabs.Panel value="notes">
            <p className="text-style-body text-fg">
              Marginalia and private annotations, kept apart from the manuscript proper.
            </p>
          </Tabs.Panel>
        </Tabs>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Controlled</h2>
        <Tabs value={value} onValueChange={setValue}>
          <Tabs.List>
            <Tabs.Tab value="toc">Contents</Tabs.Tab>
            <Tabs.Tab value="bookmarks">Bookmarks</Tabs.Tab>
            <Tabs.Tab value="notes">Notes</Tabs.Tab>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Panel value="toc">
            <p className="text-style-body text-fg">Showing the table of contents.</p>
          </Tabs.Panel>
          <Tabs.Panel value="bookmarks">
            <p className="text-style-body text-fg">Showing your bookmarks.</p>
          </Tabs.Panel>
          <Tabs.Panel value="notes">
            <p className="text-style-body text-fg">Showing your notes.</p>
          </Tabs.Panel>
        </Tabs>
        <p className="text-style-caption text-fg-muted">
          Active value: <code>{String(value)}</code>
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Sin Theme — Pride</h2>
        <div data-sin="pride">
          <Tabs defaultValue="bookmarks">
            <Tabs.List>
              <Tabs.Tab value="toc">Contents</Tabs.Tab>
              <Tabs.Tab value="bookmarks">Bookmarks</Tabs.Tab>
              <Tabs.Tab value="notes">Notes</Tabs.Tab>
              <Tabs.Indicator />
            </Tabs.List>
            <Tabs.Panel value="toc">
              <p className="text-style-body text-fg">
                Riliane's chapters, illuminated in yellow-olive.
              </p>
            </Tabs.Panel>
            <Tabs.Panel value="bookmarks">
              <p className="text-style-body text-fg">
                Pages marked by the Daughter of Evil herself.
              </p>
            </Tabs.Panel>
            <Tabs.Panel value="notes">
              <p className="text-style-body text-fg">
                Notes scrawled in the margins of the Lucifenian court.
              </p>
            </Tabs.Panel>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
