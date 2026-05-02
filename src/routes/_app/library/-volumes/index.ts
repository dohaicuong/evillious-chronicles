import type { Chapter } from "@src/lib/schema";
import type { VolumeBundle, VolumeMeta } from "./_shared";

/*
 * Volume registry — dynamic imports so each volume's content (markdown
 * chapters, fixtures) becomes its own lazy chunk and stays out of the main
 * bundle. The volume / chapter / page route loaders await `getVolumeMeta`
 * (volume detail) and `getVolumeChapter` (page reader) on demand.
 *
 * Lives in `src/routes/_app/library/-volumes/` (dash-prefix folder, excluded
 * from TanStack Router's file-based route generation) so volume declarations
 * sit next to the route files that consume them. Each per-volume module
 * exports a `VolumeBundle` (`{ manifest, slim, meta, chapter }`).
 */

const loaders: Record<string, () => Promise<VolumeBundle>> = {
  "cloture-of-yellow": () => import("./cloture-of-yellow").then((m) => m.clotureOfYellow),
  "wiegenlied-of-green": () => import("./wiegenlied-of-green").then((m) => m.wiegenliedOfGreen),
  "praeludium-of-red": () => import("./praeludium-of-red").then((m) => m.praeludiumOfRed),
  "praefacio-of-blue": () => import("./praefacio-of-blue").then((m) => m.praefacioOfBlue),
  venomania: () => import("./venomania").then((m) => m.venomania),
};

export async function getVolumeMeta(id: string): Promise<VolumeMeta | undefined> {
  const load = loaders[id];
  return load ? (await load()).meta() : undefined;
}

export async function getVolumeChapter(
  volumeId: string,
  chapterId: string,
): Promise<Chapter | undefined> {
  const load = loaders[volumeId];
  if (!load) return undefined;
  const bundle = await load();
  // Chapter not present in this volume's manifest — surface as undefined so
  // route loaders can `throw notFound()`.
  const slim = bundle.slim.chapters.find((c) => c.id === chapterId);
  if (!slim) return undefined;
  return bundle.chapter(chapterId);
}

const availableSet = new Set(Object.keys(loaders));

export const availableVolumeIds = Array.from(availableSet);

export function isVolumeAvailable(id: string): boolean {
  return availableSet.has(id);
}
