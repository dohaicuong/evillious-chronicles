import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Pagination } from "@src/components/primitives/pagination";

export const Route = createLazyFileRoute("/components/pagination")({
  component: PaginationPage,
});

function PaginationPage() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(7);
  const [c, setC] = useState(50);
  const [d, setD] = useState(1);

  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">Pagination</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Numbered page navigation with prev/next caret buttons. Renders ellipses for gaps when the
          range exceeds visible slots.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Default — 12 pages</h2>
        <Pagination page={a} pageCount={12} onPageChange={setA} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Mid-range — 12 pages, page 7</h2>
        <Pagination page={b} pageCount={12} onPageChange={setB} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Large set — 100 pages</h2>
        <Pagination page={c} pageCount={100} onPageChange={setC} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Few pages — no ellipses</h2>
        <Pagination page={d} pageCount={5} onPageChange={setD} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Sizes</h2>
        <div className="flex flex-col items-start gap-4">
          <Pagination size="sm" page={a} pageCount={20} onPageChange={setA} />
          <Pagination size="md" page={a} pageCount={20} onPageChange={setA} />
          <Pagination size="lg" page={a} pageCount={20} onPageChange={setA} />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Siblings — 2</h2>
        <p className="text-style-caption text-fg-muted">
          Show two pages on either side of the current page.
        </p>
        <Pagination siblings={2} page={c} pageCount={100} onPageChange={setC} />
      </section>
    </div>
  );
}
