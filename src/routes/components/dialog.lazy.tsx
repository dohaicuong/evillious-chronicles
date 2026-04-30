import { createLazyFileRoute } from "@tanstack/react-router";
import { Button } from "@src/components/primitives/button";
import { Dialog } from "@src/components/primitives/dialog";

export const Route = createLazyFileRoute("/components/dialog")({
  component: DialogPage,
});

function DialogPage() {
  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">Dialog</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Centered modal built on Base UI. Theming flows in through <code>data-sin</code>.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Confirm</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Dialog>
            <Dialog.Trigger render={<Button variant="secondary">Open dialog</Button>} />
            <Dialog.Portal>
              <Dialog.Backdrop />
              <Dialog.Popup>
                <Dialog.Title>Leave the chapter?</Dialog.Title>
                <Dialog.Description>
                  Your bookmark will be saved to the current page. You can return to this passage
                  any time from the library.
                </Dialog.Description>
                <div className="mt-7 flex justify-end gap-2">
                  <Dialog.Close render={<Button variant="ghost">Cancel</Button>} />
                  <Dialog.Close render={<Button variant="primary">Leave</Button>} />
                </div>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Destructive — Wrath</h2>
        <p className="text-style-caption text-fg-muted">
          Wrap the popup contents in <code>data-sin="wrath"</code> to retint the accent crimson for
          dangerous actions.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Dialog>
            <Dialog.Trigger render={<Button variant="secondary">Delete note</Button>} />
            <Dialog.Portal>
              <Dialog.Backdrop />
              <Dialog.Popup>
                <div data-sin="wrath" className="flex flex-col">
                  <Dialog.Title>Delete this note?</Dialog.Title>
                  <Dialog.Description>
                    This will permanently remove the annotation from your copy of the manuscript.
                    This action cannot be undone.
                  </Dialog.Description>
                  <div className="mt-7 flex justify-end gap-2">
                    <Dialog.Close render={<Button variant="ghost">Cancel</Button>} />
                    <Dialog.Close render={<Button variant="primary">Delete</Button>} />
                  </div>
                </div>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog>
        </div>
      </section>
    </div>
  );
}
