import { createLazyFileRoute } from "@tanstack/react-router";
import { BookOpenIcon } from "@phosphor-icons/react";
import { ScrollArea } from "@src/components/primitives/scroll-area";
import { Card } from "@src/components/primitives/card";

export const Route = createLazyFileRoute("/components/scroll-area")({
  component: ScrollAreaPage,
});

const chapters = [
  "Prologue — A Tale Begins",
  "Chapter I — The Servant",
  "Chapter II — Yellow Flowers",
  "Chapter III — The Daughter's Decree",
  "Chapter IV — A Green-Cloaked Visitor",
  "Chapter V — The Sea of Bandits",
  "Chapter VI — Marlon's Decree",
  "Chapter VII — Whispers in the Hall",
  "Chapter VIII — The Tea Ceremony",
  "Chapter IX — A Mirror's Reflection",
  "Chapter X — The Servant's Choice",
  "Chapter XI — The Sound of Bells",
  "Chapter XII — A Body for a Body",
  "Chapter XIII — The Final Movement",
  "Epilogue — Re_birthday",
];

const wideContent = Array.from(
  { length: 20 },
  (_, i) => `Volume ${i + 1} — A long title that overflows the container width`,
);

function ScrollAreaPage() {
  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">Scroll Area</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Custom-styled scrollbars that auto-reveal on hover or while scrolling. Both axes
          supported.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Vertical — Chapter list</h2>
        <Card className="h-72">
          <ScrollArea className="h-full" viewportClassName="p-2">
            <ul className="flex flex-col">
              {chapters.map((c, i) => (
                <li
                  key={c}
                  className="flex items-center gap-3 rounded-sm px-3 py-2.5 hover:bg-accent-soft transition-colors cursor-pointer"
                >
                  <BookOpenIcon className="text-fg-muted shrink-0" />
                  <span className="text-style-body text-fg flex-1">{c}</span>
                  <span className="text-style-caption text-fg-muted">{i + 1}</span>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Both axes — Long titles</h2>
        <Card className="h-48">
          <ScrollArea className="h-full" viewportClassName="p-4">
            <div className="flex flex-col gap-2 w-max">
              {wideContent.map((line) => (
                <span key={line} className="text-style-body text-fg whitespace-nowrap">
                  {line}
                </span>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Long prose</h2>
        <Card className="h-64">
          <ScrollArea className="h-full" viewportClassName="px-5 py-4">
            <p className="text-style-body text-fg">
              On a vast continent, in a small kingdom torn by the ambitions of a young queen, a
              servant carried a dreadful secret. The yellow flowers swayed in the courtyard while
              the bells tolled three. Riliane traced a finger along the edge of the marble
              balustrade, watching the green-cloaked guards pass below — none of them daring to
              glance up at her.{" "}
              {Array.from({ length: 8 }, (_, i) => (
                <span key={i}>
                  Time stretched. The candle in her chamber guttered, then steadied. The pocket
                  watch on her vanity ticked the hours away with no regard for crowns or kingdoms.
                  Outside, the bells of Lucifenia rang for noon, and the kingdom turned, as kingdoms
                  do, toward whatever ending the Master of the Court had written for it.{" "}
                </span>
              ))}
            </p>
          </ScrollArea>
        </Card>
      </section>
    </div>
  );
}
