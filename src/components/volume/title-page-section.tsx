import type { Volume } from "../../data/schema";

export function TitlePageSection({ volume }: { volume: Volume }) {
  const { titlePage, translation } = volume;
  if (!titlePage) return null;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-style-eyebrow text-fg-muted">Credits</h2>
      <dl className="flex flex-col gap-2">
        {titlePage.credits.map((c) => (
          <div
            key={`${c.role}-${c.name}`}
            className="grid grid-cols-[120px_1fr] sm:grid-cols-[160px_1fr] gap-3 border-t border-border py-2"
          >
            <dt className="text-style-caption text-fg-muted">{c.role}</dt>
            <dd className="text-style-body text-fg">{c.name}</dd>
          </div>
        ))}
      </dl>

      {translation?.url ? (
        <p className="text-style-caption text-fg-muted mt-3">
          Translation source:{" "}
          <a
            href={translation.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-2 decoration-accent/40 hover:decoration-accent transition-colors"
          >
            {translation.translator ?? translation.url}
          </a>
        </p>
      ) : null}

      {titlePage.disclaimer ? (
        <details className="mt-2 group">
          <summary className="cursor-pointer text-style-eyebrow text-fg-muted hover:text-fg transition-colors select-none">
            Disclaimer
          </summary>
          <p className="text-style-caption text-fg-muted mt-3 leading-relaxed">
            {titlePage.disclaimer}
          </p>
        </details>
      ) : null}
    </section>
  );
}
