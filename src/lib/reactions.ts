import { useLiveQuery } from "dexie-react-hooks";
import { db, type Reaction, type ReactionKind, type ReactionTargetType } from "./db";

export type { Reaction, ReactionKind, ReactionTargetType };

/**
 * Read-and-toggle hook for a single reaction. The compound
 * `[targetType+targetId+kind]` index reduces the lookup to one indexed
 * read, and `useLiveQuery` re-fires on any change to the reactions table.
 */
export function useReaction(
  targetType: ReactionTargetType,
  targetId: string,
  kind: ReactionKind = "like",
): {
  active: boolean;
  reaction: Reaction | undefined;
  toggle: () => Promise<void>;
} {
  const reaction = useLiveQuery(
    () =>
      db.reactions.where("[targetType+targetId+kind]").equals([targetType, targetId, kind]).first(),
    [targetType, targetId, kind],
  );

  return {
    active: !!reaction,
    reaction,
    toggle: async () => {
      // Re-read inside the transaction to avoid a race with the hook's last
      // snapshot (e.g. a quick double-tap shouldn't toggle off a record that
      // was just inserted by the same user gesture).
      await db.transaction("rw", db.reactions, async () => {
        const existing = await db.reactions
          .where("[targetType+targetId+kind]")
          .equals([targetType, targetId, kind])
          .first();
        if (existing?.id != null) {
          await db.reactions.delete(existing.id);
        } else {
          await db.reactions.add({
            targetType,
            targetId,
            kind,
            createdAt: Date.now(),
          });
        }
      });
    },
  };
}

/**
 * All reactions on a given target type, newest first. Useful for surfacing
 * "Liked series", "Liked songs", etc. on a profile-style page later.
 */
export function useReactions(
  targetType: ReactionTargetType,
  kind: ReactionKind = "like",
): Reaction[] {
  return (
    useLiveQuery(
      () =>
        db.reactions
          .where("targetType")
          .equals(targetType)
          .filter((r) => r.kind === kind)
          .reverse()
          .sortBy("createdAt"),
      [targetType, kind],
    ) ?? []
  );
}
