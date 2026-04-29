import { Link } from "@tanstack/react-router";
import { Card } from "../primitives/card";
import { Badge } from "../primitives/badge";
import { Progress } from "../primitives/progress";
import { SinGlyph } from "../thematic/sin-glyph";
import type { Volume } from "../../data/library";

export function VolumeCard({ seriesId, volume }: { seriesId: string; volume: Volume }) {
  const totalPages = volume.chapters.reduce((sum, c) => sum + c.pageCount, 0);
  const completedPages = volume.chapters.reduce(
    (sum, c) => sum + (c.pageCount * c.progress) / 100,
    0,
  );
  const overall = totalPages ? Math.round((completedPages / totalPages) * 100) : 0;

  return (
    <div data-sin={volume.sin ?? undefined}>
      <Link
        to="/library/$seriesId/$volumeId"
        params={{ seriesId, volumeId: volume.id }}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/30 focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm"
      >
        <Card variant="interactive">
          <Card.Header>
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-style-eyebrow text-fg-muted">Volume {volume.number}</span>
                <Card.Title className="mt-1">{volume.title}</Card.Title>
              </div>
              {volume.sin ? (
                <Badge
                  variant="soft"
                  size="sm"
                  className="capitalize shrink-0"
                  icon={<SinGlyph sin={volume.sin} weight="light" />}
                >
                  {volume.sin}
                </Badge>
              ) : null}
            </div>
          </Card.Header>
          <Card.Body>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-style-caption text-fg-muted">
                  {volume.chapters.length} chapter{volume.chapters.length !== 1 ? "s" : ""}
                </span>
                <span className="text-style-caption text-fg-muted">{overall}%</span>
              </div>
              <Progress value={overall} aria-label={`${volume.title} reading progress`} />
            </div>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
}
