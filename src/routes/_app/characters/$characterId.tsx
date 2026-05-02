import { createFileRoute, notFound } from "@tanstack/react-router";
import { ExternalLink, Link } from "@src/components/primitives/link";
import { ArrowSquareOutIcon, CaretLeftIcon } from "@phosphor-icons/react";
import { getCharacter } from "@app/characters/-characters";
import type { Character } from "@app/characters/-characters";
import { series } from "@src/routes/_app/library/-library";
import { CharacterPortrait } from "@src/components/library/character-portrait";
import { ReactionButton } from "@src/components/library/reaction-button";

export const Route = createFileRoute("/_app/characters/$characterId")({
  component: CharacterDetailPage,
  loader: ({ params }) => {
    const found = getCharacter(params.characterId);
    if (!found) throw notFound();
    return found;
  },
});

function CharacterDetailPage() {
  const c = Route.useLoaderData();
  const epithet = c.otherNames?.[0];
  const appearsIn = (c.seriesIds ?? [])
    .map((id) => series.find((s) => s.id === id))
    .filter((s): s is (typeof series)[number] => Boolean(s));

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <Link
        to="/characters"
        className="inline-flex items-center gap-1 text-style-eyebrow text-fg-muted hover:text-fg transition-colors mb-6"
      >
        <CaretLeftIcon size={14} />
        Characters
      </Link>

      <header className="mb-10 flex flex-col gap-8 md:grid md:grid-cols-[1fr_280px] md:items-start md:gap-10">
        <div className="flex flex-col gap-3">
          <span className="text-style-eyebrow text-fg-muted">{epithet ?? "Character"}</span>
          <div className="flex items-start gap-3">
            <h1 className="text-style-display text-fg flex-1">{c.name}</h1>
            <ReactionButton targetType="character" targetId={c.id} label={c.name} size="md" />
          </div>
          {c.japaneseName ? (
            <p className="text-style-lead text-fg-muted">{c.japaneseName}</p>
          ) : null}
        </div>
        <div className="mx-auto aspect-[3/4] w-full max-w-[240px] overflow-hidden rounded-sm border border-border bg-surface md:mx-0 md:max-w-none">
          <CharacterPortrait character={c} />
        </div>
      </header>

      <div className="flow-root">
        <aside className="mb-6 md:float-right md:mb-4 md:ml-8 md:w-[360px]">
          <Infobox character={c} />
        </aside>

        <section className="space-y-8">
          {c.quote ? (
            <blockquote className="border-l-2 border-accent pl-4 text-style-quote text-fg italic">
              <p>&ldquo;{c.quote.text}&rdquo;</p>
              {c.quote.attribution ? (
                <footer className="mt-2 not-italic text-style-caption text-fg-muted">
                  — {c.quote.attribution}
                </footer>
              ) : null}
            </blockquote>
          ) : null}

          {c.summary ? (
            <p className="text-style-body text-fg whitespace-pre-line">{c.summary}</p>
          ) : null}

          {appearsIn.length > 0 ? (
            <section className="space-y-3">
              <h2 className="text-style-eyebrow text-fg-muted">Appears In</h2>
              <ul className="flex flex-col">
                {appearsIn.map((s) => (
                  <li key={s.id} className="border-t border-border first:border-t-0">
                    <Link
                      to="/library/$seriesId"
                      params={{ seriesId: s.id }}
                      className="flex items-baseline justify-between gap-4 py-3 transition-colors hover:text-accent-strong"
                    >
                      <span className="text-style-body text-fg">{s.title}</span>
                      <span className="text-style-caption text-fg-muted">
                        {s.volumes.length > 0
                          ? `${s.volumes.length} volume${s.volumes.length !== 1 ? "s" : ""}`
                          : "Series"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {c.wikiUrl ? (
            <ExternalLink
              href={c.wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-style-caption text-fg-muted hover:text-accent-strong"
            >
              <ArrowSquareOutIcon size={14} weight="light" />
              Read more on the Evillious Chronicles wiki
            </ExternalLink>
          ) : null}
        </section>
      </div>
    </div>
  );
}

function Infobox({ character: c }: { character: Character }) {
  const technical: [string, React.ReactNode][] = [];
  if (c.japaneseName) technical.push(["Japanese", c.japaneseName]);
  if (c.romaji) technical.push(["Romaji", c.romaji]);
  if (c.otherNames && c.otherNames.length > 0) {
    technical.push([
      "Other Names",
      <ul key="other-names" className="flex flex-col gap-0.5">
        {c.otherNames.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>,
    ]);
  }
  if (c.vocaloid) technical.push(["Vocaloid", c.vocaloid]);

  const biographical: [string, React.ReactNode][] = [];
  if (c.born) biographical.push(["Born", c.born]);
  if (c.died) biographical.push(["Died", c.died]);
  if (c.classification) biographical.push(["Classification", c.classification]);
  if (c.race) biographical.push(["Race", c.race]);
  if (c.gender) biographical.push(["Gender", c.gender]);
  if (c.hairColor) biographical.push(["Hair Color", c.hairColor]);
  if (c.eyeColor) biographical.push(["Eye Color", c.eyeColor]);
  if (c.affiliations && c.affiliations.length > 0) {
    biographical.push([
      "Affiliation(s)",
      <ul key="affiliations" className="flex flex-col gap-0.5">
        {c.affiliations.map((a) => (
          <li key={a.name}>
            {a.name}
            {a.note ? <span className="text-fg-muted"> {a.note}</span> : null}
          </li>
        ))}
      </ul>,
    ]);
  }

  return (
    <div className="rounded-sm border border-border bg-surface">
      <h2 className="bg-accent-soft px-4 py-2 text-center text-style-heading-4 text-accent-strong">
        {c.name}
      </h2>
      {technical.length > 0 ? <InfoSection title="Technical Information" rows={technical} /> : null}
      {biographical.length > 0 ? (
        <InfoSection title="Biographical Information" rows={biographical} />
      ) : null}
    </div>
  );
}

function InfoSection({ title, rows }: { title: string; rows: [string, React.ReactNode][] }) {
  return (
    <div className="border-b border-border last:border-b-0">
      <h2 className="bg-accent-soft px-4 py-2 text-center text-style-eyebrow text-accent-strong">
        {title}
      </h2>
      <dl className="flex flex-col">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="grid grid-cols-[6.5rem_1fr] gap-3 border-t border-border px-4 py-2 first:border-t-0"
          >
            <dt className="text-style-caption font-medium text-fg">{label}</dt>
            <dd className="text-style-caption text-fg-muted">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
