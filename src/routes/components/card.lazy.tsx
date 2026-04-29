import { createLazyFileRoute } from "@tanstack/react-router";
import { BookOpenIcon, BookmarkSimpleIcon } from "@phosphor-icons/react";
import { Button } from "../../components/primitives/button";
import { Card } from "../../components/primitives/card";

export const Route = createLazyFileRoute("/components/card")({
  component: CardPage,
});

const sins = ["pride", "lust", "sloth", "gluttony"] as const;

const sinSubtitles: Record<(typeof sins)[number], string> = {
  pride: "The Story of Evil",
  lust: "The Tailor of Enbizaka",
  sloth: "The Muzzle of Nemesis",
  gluttony: "Evil Food Eater Conchita",
};

function CardPage() {
  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-style-heading-1 text-fg">Card</h1>
        <p className="text-style-lead mt-2 text-fg-muted">
          The base surface for series, volumes, and chapters. Auto-themes inside{" "}
          <code>data-sin</code>.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Flat</h2>
        <Card className="max-w-md">
          <Card.Header>
            <Card.Title className="flex items-center gap-2">
              <BookOpenIcon weight="duotone" className="text-accent-strong" />
              Daughter of Evil
            </Card.Title>
            <Card.Description>Volume I — The Story of Evil</Card.Description>
          </Card.Header>
          <Card.Body>
            "The time is 14:00. Now, it is the time of the snack." A princess of vibrant yellow
            rules her kingdom with iron and ivory.
          </Card.Body>
          <Card.Footer>
            <Button variant="ghost" size="sm">
              Details
            </Button>
            <Button variant="primary" size="sm">
              Read
            </Button>
          </Card.Footer>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Interactive</h2>
        <Card variant="interactive" className="max-w-md">
          <Card.Header>
            <Card.Title className="flex items-center gap-2">
              <BookmarkSimpleIcon weight="duotone" className="text-accent-strong" />
              Continue Reading
            </Card.Title>
            <Card.Description>Chapter 4 — The Servant's Letter</Card.Description>
          </Card.Header>
          <Card.Body>Hover to see the accent border and soft tint take effect.</Card.Body>
        </Card>
      </section>

      <section className="flex flex-col gap-4" data-sin="pride">
        <h2 className="text-style-eyebrow text-fg-muted">Sin-Themed Wrapper — Pride</h2>
        <Card variant="interactive" className="max-w-md">
          <Card.Header>
            <Card.Title className="flex items-center gap-2">
              <BookOpenIcon weight="duotone" className="text-accent-strong" />
              The Daughter of Evil
            </Card.Title>
            <Card.Description>Riliane Lucifen d'Autriche</Card.Description>
          </Card.Header>
          <Card.Body>
            The wrapper sets <code>data-sin="pride"</code>, so hover, border, and accent text all
            shift to Pride yellow without touching the card itself.
          </Card.Body>
          <Card.Footer>
            <Button variant="secondary" size="sm">
              Library
            </Button>
            <Button variant="primary" size="sm">
              Open Volume
            </Button>
          </Card.Footer>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-style-eyebrow text-fg-muted">Per-Sin Grid</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sins.map((sin) => (
            <div key={sin} data-sin={sin}>
              <Card variant="interactive" className="h-full">
                <Card.Header>
                  <Card.Title className="flex items-center gap-2 capitalize">
                    <BookOpenIcon weight="duotone" className="text-accent-strong" />
                    {sin}
                  </Card.Title>
                  <Card.Description>{sinSubtitles[sin]}</Card.Description>
                </Card.Header>
                <Card.Body className="text-style-caption text-fg-muted">
                  Hover to feel the {sin} accent.
                </Card.Body>
                <Card.Footer>
                  <Button variant="primary" size="sm" className="w-full">
                    Read
                  </Button>
                </Card.Footer>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
