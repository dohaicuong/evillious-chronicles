import { Link } from "@tanstack/react-router";
import { Card } from "@src/components/primitives/card";
import { Badge } from "@src/components/primitives/badge";
import { SinGlyph } from "@src/components/thematic/sin-glyph";
import { isVolumeAvailable } from "@src/data/volumes";
import type { Series, Sin } from "@src/data/library";

export function SeriesCard({ series }: { series: Series }) {
  const sins = [...new Set(series.volumes.map((v) => v.sin).filter((s): s is Sin => Boolean(s)))];
  const total = series.volumes.length;
  const available = series.volumes.filter((v) => isVolumeAvailable(v.id)).length;
  const songCount = series.songIds?.length ?? 0;

  const stats: string[] = [];
  if (total > 0) {
    stats.push(
      available > 0
        ? `${available} of ${total} volume${total !== 1 ? "s" : ""} available`
        : `${total} volume${total !== 1 ? "s" : ""}, none yet available`,
    );
  }
  if (songCount > 0) {
    stats.push(`${songCount} song${songCount !== 1 ? "s" : ""}`);
  }

  return (
    <Link
      to="/library/$seriesId"
      params={{ seriesId: series.id }}
      className="block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/30 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      <Card variant="interactive">
        <Card.Header>
          <Card.Title>{series.title}</Card.Title>
          {stats.length > 0 ? <Card.Description>{stats.join(" · ")}</Card.Description> : null}
        </Card.Header>
        <Card.Body>
          <p className="line-clamp-3 text-fg-muted">{series.description}</p>
        </Card.Body>
        <Card.Footer>
          <div className="flex flex-wrap gap-1.5">
            {sins.length > 0 ? (
              sins.map((sin) => (
                <span key={sin} data-sin={sin}>
                  <Badge
                    variant="soft"
                    size="sm"
                    className="capitalize"
                    icon={<SinGlyph sin={sin} weight="light" />}
                  >
                    {sin}
                  </Badge>
                </span>
              ))
            ) : (
              <Badge variant="outline" size="sm">
                Lore
              </Badge>
            )}
          </div>
        </Card.Footer>
      </Card>
    </Link>
  );
}
