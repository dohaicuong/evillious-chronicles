import { createLazyFileRoute } from "@tanstack/react-router";
import { Button } from "@src/components/primitives/button";
import { useToast } from "@src/components/primitives/toast";

export const Route = createLazyFileRoute("/components/toast")({
  component: ToastPage,
});

function ToastPage() {
  const toast = useToast();

  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">Toast</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Transient notifications. Slide in from the right with a sin-tinted strip.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Types</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="secondary"
            onClick={() =>
              toast.add({
                type: "info",
                title: "Bookmarked",
                description: "Page 47 of The Daughter of Evil saved to your library.",
              })
            }
          >
            Info
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast.add({
                type: "success",
                title: "Note saved",
                description: "Your annotation on Chapter 3 has been recorded.",
              })
            }
          >
            Success
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              toast.add({
                type: "error",
                title: "Couldn't save note",
                description: "The manuscript could not be reached. Try again in a moment.",
              })
            }
          >
            Error
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">With action</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="secondary"
            onClick={() =>
              toast.add({
                type: "info",
                title: "Note deleted",
                description: "Your annotation on page 112 was removed.",
                actionProps: {
                  children: "Undo",
                  onClick: () => {
                    toast.add({
                      type: "success",
                      title: "Note restored",
                      description: "Your annotation is back on page 112.",
                    });
                  },
                },
              })
            }
          >
            Delete with undo
          </Button>
        </div>
      </section>
    </div>
  );
}
