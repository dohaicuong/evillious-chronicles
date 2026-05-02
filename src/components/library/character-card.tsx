import { Link } from "@src/components/primitives/link";
import { Card } from "@src/components/primitives/card";
import { Badge } from "@src/components/primitives/badge";
import { CharacterPortrait } from "@src/components/library/character-portrait";
import { ReactionButton } from "@src/components/library/reaction-button";
import type { Character } from "@app/characters/-characters";

export function CharacterCard({ character }: { character: Character }) {
  const epithet = character.otherNames?.[0];
  const classifications = splitChips(character.classification);
  const vocaloids = splitChips(character.vocaloid);

  return (
    <div className="relative h-full">
      <Link
        to="/characters/$characterId"
        params={{ characterId: character.id }}
        className="block h-full"
      >
        <Card variant="interactive" className="overflow-hidden">
          <div className="aspect-[3/2] w-full overflow-hidden bg-surface">
            <CharacterPortrait character={character} />
          </div>
          <Card.Header>
            <Card.Title className="pr-10">{character.name}</Card.Title>
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
      <ReactionButton
        targetType="character"
        targetId={character.id}
        label={character.name}
        className="absolute right-2 top-2 backdrop-blur-sm bg-bg/40 hover:bg-bg/60 rounded-sm"
      />
    </div>
  );
}

function splitChips(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean);
}
