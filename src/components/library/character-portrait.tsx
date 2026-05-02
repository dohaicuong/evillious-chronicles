import { asset } from "@src/lib/asset";
import { cn } from "@src/lib/cn";
import type { Character } from "@app/characters/-characters";

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function CharacterPortrait({
  character,
  className,
}: {
  character: Character;
  className?: string;
}) {
  if (character.portrait) {
    return (
      <img
        src={asset(character.portrait)}
        alt={character.name}
        loading="lazy"
        className={cn("h-full w-full object-cover object-top", className)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={character.name}
      className={cn(
        "flex h-full w-full items-center justify-center bg-accent-soft text-accent-strong",
        className,
      )}
    >
      <span aria-hidden className="font-display text-5xl tracking-wider">
        {initialsOf(character.name)}
      </span>
    </div>
  );
}
