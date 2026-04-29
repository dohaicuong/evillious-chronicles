import { Link } from "@tanstack/react-router";
import { BookOpenIcon } from "@phosphor-icons/react";
import { Badge } from "../primitives/badge";
import { Button } from "../primitives/button";
import { asset } from "../../lib/asset";
import type { Volume } from "../../data/schema";

export function VolumeHero({ volume }: { volume: Volume }) {
  const firstChapter = volume.chapters[0];

  return (
    <section className="flex flex-col gap-10">
      <img
        src={asset(volume.cover.src)}
        alt={volume.cover.alt}
        className="w-full rounded-sm border border-border shadow-md shadow-ink/30"
      />

      <div className="flex flex-col gap-4 max-w-2xl">
        <div className="flex flex-col gap-2">
          <span className="text-style-eyebrow text-fg-muted">Volume {volume.number}</span>
          <h1 className="text-style-display text-fg">{volume.title}</h1>
          {volume.originalTitle ? (
            <p className="text-style-caption text-fg-muted">
              {volume.originalTitle}
              {volume.romanizedTitle ? <> · {volume.romanizedTitle}</> : null}
            </p>
          ) : null}
        </div>

        {volume.sin ? (
          <div>
            <Badge variant="soft" size="md" className="capitalize">
              {volume.sin}
            </Badge>
          </div>
        ) : null}

        {volume.description ? (
          <p className="text-style-lead text-fg-muted">{volume.description}</p>
        ) : null}

        {firstChapter ? (
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="lg"
              render={
                <Link
                  to="/library/$seriesId/$volumeId/$chapterId"
                  params={{
                    seriesId: volume.series,
                    volumeId: volume.id,
                    chapterId: firstChapter.id,
                  }}
                />
              }
            >
              <BookOpenIcon weight="light" />
              Start Reading
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
