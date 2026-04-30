import { Link } from "@tanstack/react-router";
import { Card } from "@src/components/primitives/card";
import { Badge } from "@src/components/primitives/badge";
import { SinGlyph } from "@src/components/thematic/sin-glyph";
import type { Series, Sin } from "@src/data/library";

export function SeriesCard({ series }: { series: Series }) {
  const sins = [...new Set(series.volumes.map((v) => v.sin).filter((s): s is Sin => Boolean(s)))];

  return (
    <Link
      to="/library/$seriesId"
      params={{ seriesId: series.id }}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/30 focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm"
    >
      <Card variant="interactive">
        <Card.Header>
          <Card.Title>{series.title}</Card.Title>
          <Card.Description>
            {series.volumes.length} volume{series.volumes.length !== 1 ? "s" : ""}
          </Card.Description>
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
