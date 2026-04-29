import { createLazyFileRoute } from "@tanstack/react-router";
import {
  BookmarkSimpleIcon,
  CaretRightIcon,
  GearIcon,
  MagnifyingGlassIcon,
  PauseIcon,
  PlayIcon,
  XIcon,
} from "@phosphor-icons/react";
import { IconButton } from "../../components/primitives/icon-button";

export const Route = createLazyFileRoute("/components/icon-button")({
  component: IconButtonPage,
});

const sins = ["pride", "lust", "sloth", "gluttony", "greed", "wrath", "envy"] as const;

function IconButtonPage() {
  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">IconButton</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          Square, icon-only sibling of <code>Button</code>. Requires <code>aria-label</code>.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Variants — Candle</h2>
        <div className="flex flex-wrap items-center gap-3">
          <IconButton variant="primary" aria-label="Continue reading">
            <CaretRightIcon weight="light" />
          </IconButton>
          <IconButton variant="secondary" aria-label="Bookmark page">
            <BookmarkSimpleIcon weight="light" />
          </IconButton>
          <IconButton variant="outline" aria-label="Search">
            <MagnifyingGlassIcon weight="light" />
          </IconButton>
          <IconButton variant="ghost" aria-label="Settings">
            <GearIcon weight="light" />
          </IconButton>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Sizes</h2>
        <div className="flex flex-wrap items-center gap-3">
          <IconButton size="sm" aria-label="Play (small)">
            <PlayIcon weight="light" />
          </IconButton>
          <IconButton size="md" aria-label="Play (medium)">
            <PlayIcon weight="light" />
          </IconButton>
          <IconButton size="lg" aria-label="Play (large)">
            <PlayIcon weight="light" />
          </IconButton>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Disabled</h2>
        <div className="flex flex-wrap items-center gap-3">
          <IconButton variant="primary" disabled aria-label="Pause (disabled)">
            <PauseIcon weight="light" />
          </IconButton>
          <IconButton variant="secondary" disabled aria-label="Bookmark (disabled)">
            <BookmarkSimpleIcon weight="light" />
          </IconButton>
          <IconButton variant="outline" disabled aria-label="Search (disabled)">
            <MagnifyingGlassIcon weight="light" />
          </IconButton>
          <IconButton variant="ghost" disabled aria-label="Close (disabled)">
            <XIcon weight="light" />
          </IconButton>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Per-Sin Themes</h2>
        <div className="flex flex-wrap items-center gap-3">
          {sins.map((sin) => (
            <div key={sin} data-sin={sin} className="flex flex-col items-center gap-2">
              <IconButton variant="primary" aria-label={`Continue (${sin})`}>
                <CaretRightIcon weight="light" />
              </IconButton>
              <span className="text-style-caption text-fg-muted capitalize">{sin}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
