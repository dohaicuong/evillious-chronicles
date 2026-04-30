import { createLazyFileRoute } from "@tanstack/react-router";
import { BookmarkSimpleIcon, HourglassIcon, NoteIcon } from "@phosphor-icons/react";
import { Badge } from "@src/components/primitives/badge";

export const Route = createLazyFileRoute("/components/badge")({
  component: BadgePage,
});

const sins = ["pride", "lust", "sloth", "gluttony", "greed", "wrath", "envy"] as const;

function BadgePage() {
  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">Badge</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Pill-shaped labels for sin tags, status, and metadata. Auto-themes inside{" "}
          <code>data-sin</code> wrappers.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Variants — Candle</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="solid">Volume I</Badge>
          <Badge variant="soft">Volume I</Badge>
          <Badge variant="outline">Draft</Badge>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Sizes</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="sm" variant="solid">
            Small Solid
          </Badge>
          <Badge size="md" variant="outline">
            Medium Outline
          </Badge>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">With Icon</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Badge size="sm" icon={<HourglassIcon weight="light" />}>
            Reading
          </Badge>
          <Badge icon={<BookmarkSimpleIcon weight="light" />}>Bookmarked</Badge>
          <Badge variant="solid" icon={<NoteIcon weight="light" />}>
            New
          </Badge>
          <Badge variant="outline" icon={<HourglassIcon weight="light" />}>
            In Progress
          </Badge>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Per-Sin Themes</h2>
        <div className="flex flex-col">
          {sins.map((sin) => (
            <div
              key={sin}
              data-sin={sin}
              className="grid grid-cols-[100px_1fr] items-center gap-4 border-t border-border py-3"
            >
              <code className="text-style-caption text-fg-muted capitalize">{sin}</code>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="solid" className="capitalize">
                  {sin}
                </Badge>
                <Badge variant="soft" className="capitalize">
                  {sin}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {sin}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
