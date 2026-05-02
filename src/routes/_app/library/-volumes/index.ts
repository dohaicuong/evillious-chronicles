import type { Volume } from "@src/lib/schema";

/*
 * Volume registry — dynamic imports so each volume's content (markdown
 * chapters, fixtures) becomes its own lazy chunk and stays out of the main
 * bundle. The volume / chapter / page route loaders await `getVolume(id)`
 * when navigating into a volume.
 *
 * Lives in `src/routes/_app/library/-volumes/` (dash-prefix folder, excluded
 * from TanStack Router's file-based route generation) so volume declarations
 * sit next to the route files that consume them. Each per-volume module
 * exports a `VolumeBundle` (`{ manifest, slim, full }`); `full()` triggers
 * the per-chapter fetches and returns the schema's `Volume` shape.
 */

const loaders: Record<string, () => Promise<Volume>> = {
  "cloture-of-yellow": () => import("./cloture-of-yellow").then((m) => m.clotureOfYellow.full()),
  "wiegenlied-of-green": () =>
    import("./wiegenlied-of-green").then((m) => m.wiegenliedOfGreen.full()),
  "praeludium-of-red": () => import("./praeludium-of-red").then((m) => m.praeludiumOfRed.full()),
  "praefacio-of-blue": () => import("./praefacio-of-blue").then((m) => m.praefacioOfBlue.full()),
  venomania: () => import("./venomania").then((m) => m.venomania.full()),
};

export async function getVolume(id: string): Promise<Volume | undefined> {
  const load = loaders[id];
  return load ? await load() : undefined;
}

const availableSet = new Set(Object.keys(loaders));

export const availableVolumeIds = Array.from(availableSet);

export function isVolumeAvailable(id: string): boolean {
  return availableSet.has(id);
}
