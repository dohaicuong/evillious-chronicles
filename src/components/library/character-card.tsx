import { Link } from "@src/components/primitives/link";
import { Card } from "@src/components/primitives/card";
import { Badge } from "@src/components/primitives/badge";
import { CharacterPortrait } from "@src/components/library/character-portrait";
import type { Character } from "@src/data/characters";

export function CharacterCard({ character }: { character: Character }) {
  const epithet = character.otherNames?.[0];
  const classifications = splitChips(character.classification);
  const vocaloids = splitChips(character.vocaloid);

  return (
    <Link
      to="/characters/$characterId"
      params={{ characterId: character.id }}
      className="block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fg/30 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      <Card variant="interactive" className="overflow-hidden">
        <div className="aspect-[3/2] w-full overflow-hidden bg-surface">
          <CharacterPortrait character={character} />
        </div>
        <Card.Header>
          <Card.Title>{character.name}</Card.Title>
          {epithet ? <Card.Description>{epithet}</Card.Description> : null}
        </Card.Header>
        {character.summary ? (
          <Card.Body>
            <p className="line-clamp-3 text-fg-muted">{character.summary}</p>
          </Card.Body>
        ) : null}
        <Card.Footer>
          <div className="flex flex-wrap gap-1.5">
            {vocaloids.map((v) => (
              <Badge key={`v:${v}`} variant="soft" size="sm">
                {v}
              </Badge>
            ))}
            {classifications.map((c) => (
              <Badge key={`c:${c}`} variant="outline" size="sm">
                {c}
              </Badge>
            ))}
          </div>
        </Card.Footer>
      </Card>
    </Link>
  );
}

function splitChips(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean);
}
