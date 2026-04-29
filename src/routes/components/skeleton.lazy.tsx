import { createLazyFileRoute } from "@tanstack/react-router";
import { Skeleton } from "../../components/primitives/skeleton";

export const Route = createLazyFileRoute("/components/skeleton")({
  component: SkeletonPage,
});

function SkeletonPage() {
  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">Skeleton</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Loading placeholders with a gentle shimmer. Three convenience shapes for rect, text, and
          circle.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Rect</h2>
        <div className="max-w-md">
          <Skeleton variant="rect" className="h-32 w-full" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Text</h2>
        <div className="flex max-w-md flex-col gap-5">
          <div className="flex flex-col gap-2">
            <span className="text-style-caption text-fg-muted">Single line</span>
            <Skeleton variant="text" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-style-caption text-fg-muted">Paragraph (3 lines)</span>
            <Skeleton variant="text" lines={3} />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Circle</h2>
        <div className="flex items-center gap-4">
          <Skeleton variant="circle" className="h-8 w-8" />
          <Skeleton variant="circle" className="h-12 w-12" />
          <Skeleton variant="circle" className="h-16 w-16" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Card Placeholder</h2>
        <div className="max-w-sm rounded-sm border border-border p-5">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Skeleton variant="circle" className="h-12 w-12" />
              <Skeleton variant="text" className="h-5 flex-1" />
            </div>
            <Skeleton variant="text" lines={2} />
            <Skeleton variant="rect" className="h-10 w-32" />
          </div>
        </div>
      </section>
    </div>
  );
}
