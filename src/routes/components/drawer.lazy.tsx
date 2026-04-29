import { createLazyFileRoute } from "@tanstack/react-router";
import { Button } from "../../components/primitives/button";
import { Drawer } from "../../components/primitives/drawer";

export const Route = createLazyFileRoute("/components/drawer")({
  component: DrawerPage,
});

function DrawerPage() {
  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">Drawer</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          A side panel for settings and ancillary controls. Slides in, dims the page, traps focus.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Right Side</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Drawer>
            <Drawer.Trigger render={<Button variant="primary">Open Settings</Button>} />
            <Drawer.Portal>
              <Drawer.Backdrop />
              <Drawer.Popup side="right">
                <Drawer.Title>Settings</Drawer.Title>
                <Drawer.Description>Reader preferences</Drawer.Description>
                <div className="text-style-body mt-2 flex flex-col gap-3 text-fg">
                  <p>
                    Adjust the lantern light, the parchment grain, the cadence of the page-turn.
                    Your choices persist between visits.
                  </p>
                  <p className="text-fg-muted">Nothing here is saved yet — this is a demo.</p>
                </div>
                <div className="mt-auto flex justify-end gap-2">
                  <Drawer.Close render={<Button variant="ghost">Cancel</Button>} />
                  <Drawer.Close render={<Button variant="primary">Save</Button>} />
                </div>
              </Drawer.Popup>
            </Drawer.Portal>
          </Drawer>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Left Side</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Drawer>
            <Drawer.Trigger render={<Button variant="secondary">Open Index</Button>} />
            <Drawer.Portal>
              <Drawer.Backdrop />
              <Drawer.Popup side="left">
                <Drawer.Title>Table of Contents</Drawer.Title>
                <Drawer.Description>Navigate the volume</Drawer.Description>
                <ul className="text-style-body mt-2 flex flex-col gap-2 text-fg">
                  <li>I. The Yellow Country</li>
                  <li>II. The Servant of Evil</li>
                  <li>III. The Daughter of Evil</li>
                  <li>IV. Regret Message</li>
                </ul>
                <Drawer.Close />
              </Drawer.Popup>
            </Drawer.Portal>
          </Drawer>
        </div>
      </section>

      <section className="flex flex-col gap-4" data-sin="pride">
        <h2 className="text-style-eyebrow text-fg-muted">Sin Theme — Pride</h2>
        <p className="text-style-body text-fg-muted">
          The drawer's portal mounts at the document root, so the trigger sits inside the{" "}
          <code>data-sin</code> wrapper but the popup does not. Wrap the popup contents to cascade
          the accent.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Drawer>
            <Drawer.Trigger render={<Button variant="primary">Riliane's Chambers</Button>} />
            <Drawer.Portal>
              <Drawer.Backdrop />
              <Drawer.Popup side="right">
                <div data-sin="pride" className="contents">
                  <Drawer.Title>The Daughter of Evil</Drawer.Title>
                  <Drawer.Description>Volume I — yellow blooms in the courtyard</Drawer.Description>
                  <div className="text-style-body mt-2 flex flex-col gap-3 text-fg">
                    <p>
                      Oho ho ho ho. Bow down to me, peasants. The accent here pulls Pride yellow
                      from the sin cascade.
                    </p>
                  </div>
                  <div className="mt-auto flex justify-end gap-2">
                    <Drawer.Close render={<Button variant="outline">Dismiss</Button>} />
                    <Drawer.Close render={<Button variant="primary">Decree</Button>} />
                  </div>
                </div>
              </Drawer.Popup>
            </Drawer.Portal>
          </Drawer>
        </div>
      </section>
    </div>
  );
}
