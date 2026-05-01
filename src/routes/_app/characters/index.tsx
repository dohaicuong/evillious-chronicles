import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowSquareOutIcon, CaretLeftIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import { characters } from "@src/data/characters";
import { CharacterCard } from "@src/components/library/character-card";
import { Input } from "@src/components/primitives/input";
import { Pagination } from "@src/components/primitives/pagination";

export const Route = createFileRoute("/_app/characters/")({
  component: CharactersPage,
});

const PAGE_SIZE = 16;

function CharactersPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return characters;
    return characters.filter((c) => {
      const haystack = [c.name, ...(c.otherNames ?? []), c.romaji, c.japaneseName, c.vocaloid]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  // Reset to page 1 whenever the filter changes the result set length.
  useEffect(() => {
    setPage(1);
  }, [query]);

  // Clamp if the data shrinks beneath the current page (defensive).
  useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  const start = (page - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <Link
        to="/library"
        className="text-style-eyebrow text-fg-muted hover:text-fg mb-6 inline-flex items-center gap-1 transition-colors"
      >
        <CaretLeftIcon size={14} />
        Library
      </Link>
      <header className="mb-8 flex flex-col gap-3 max-w-2xl">
        <span className="text-style-eyebrow text-fg-muted">Dramatis Personae</span>
        <h1 className="text-style-display text-fg">Characters</h1>
        <p className="text-style-lead text-fg-muted">
          The figures who walk the cycles of Evillious — princes and tailors, demons and devotees.
        </p>
      </header>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="flex flex-col gap-2 sm:max-w-md sm:flex-1">
          <Input
            type="search"
            placeholder="Search by name, alias, or vocaloid..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            leftIcon={<MagnifyingGlassIcon weight="light" />}
            aria-label="Search characters"
          />
          {query.trim() ? (
            <span className="text-style-caption text-fg-muted">
              {filtered.length} of {characters.length}{" "}
              {filtered.length === 1 ? "character" : "characters"}
            </span>
          ) : null}
        </div>
        {pageCount > 1 ? (
          <Pagination
            page={page}
            pageCount={pageCount}
            onPageChange={setPage}
            aria-label="Pagination (top)"
          />
        ) : null}
      </div>

      {filtered.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((c) => (
              <CharacterCard key={c.id} character={c} />
            ))}
          </div>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <a
              href="https://theevilliouschronicles.fandom.com/wiki/Category:Characters"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-style-caption text-fg-muted transition-colors hover:text-accent-strong"
            >
              <ArrowSquareOutIcon size={14} weight="light" />
              Characters category on the Evillious Chronicles wiki
            </a>
            {pageCount > 1 ? (
              <Pagination
                page={page}
                pageCount={pageCount}
                onPageChange={setPage}
                aria-label="Pagination (bottom)"
              />
            ) : null}
          </div>
        </>
      ) : (
        <p className="text-style-body text-fg-muted">No characters match &ldquo;{query}&rdquo;.</p>
      )}
    </div>
  );
}
