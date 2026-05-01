import type { Volume } from "@src/data/schema";

/*
 * Volume registry — dynamic imports so each volume's content (markdown chapters,
 * fixtures) becomes its own lazy chunk and stays out of the main bundle. The
 * volume route's loader awaits getVolume(id) when navigating to a volume page.
 */

const loaders: Record<string, () => Promise<Volume>> = {
  "cloture-of-yellow": () => import("./cloture-of-yellow").then((m) => m.clotureOfYellow),
  "wiegenlied-of-green": () => import("./wiegenlied-of-green").then((m) => m.wiegenliedOfGreen),
};

export async function getVolume(id: string): Promise<Volume | undefined> {
  const load = loaders[id];
  return load ? await load() : undefined;
}

export const availableVolumeIds = Object.keys(loaders);
