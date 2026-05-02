import { useCallback, useEffect, useRef, useState } from "react";
import { getVolumeAssets } from "@app/library/-volumes";

/**
 * Pre-fetches everything a volume needs for offline reading: chapter
 * `.md` files **and** image assets (cover, opening / closing galleries,
 * chapter illustrations). Each URL is fetched and written to the
 * appropriate SW runtime cache so the on-page renderer (and the SW's
 * own cache-first / SWR strategies) find a cached response when the
 * browser is offline.
 *
 *  - Chapter markdown → `ec-chapters` (StaleWhileRevalidate at runtime).
 *  - Images → `ec-assets` (CacheFirst at runtime, keyed on the SW's
 *    `request.destination === "image"` rule).
 *
 * Writing the cache entries ourselves makes the offline flow work the
 * same in dev (where the SW isn't registered), prod, and incognito; if
 * the SW is also active, both writes go to the same cache key so the
 * cost is one harmless overwrite per asset.
 *
 * `forceResyncVolume` deletes the volume's URLs from both caches before
 * walking, which guarantees the next fetch hits the network instead of
 * a stale cached copy. Useful when content was updated on the server.
 */

const CHAPTER_CACHE = "ec-chapters";
const ASSET_CACHE = "ec-assets";
const CONCURRENCY = 8;

export type OfflineProgress = { done: number; total: number };

export type OfflineStatus = {
  cached: number;
  total: number;
  /** True when every URL — chapters and images — is present in cache. */
  complete: boolean;
};

type Task = { url: string; cacheName: string };

async function getVolumeTasks(volumeId: string): Promise<Task[]> {
  const { chapters, images } = await getVolumeAssets(volumeId);
  return [
    ...chapters.map((url) => ({ url, cacheName: CHAPTER_CACHE })),
    ...images.map((url) => ({ url, cacheName: ASSET_CACHE })),
  ];
}

async function openCaches(names: Iterable<string>): Promise<Map<string, Cache>> {
  const map = new Map<string, Cache>();
  if (typeof caches === "undefined") return map;
  for (const name of new Set(names)) {
    try {
      map.set(name, await caches.open(name));
    } catch {
      // The cache for this name will be missing from the map; downstream
      // code treats that as "no cache available" and skips writes/reads.
    }
  }
  return map;
}

export async function getVolumeOfflineStatus(volumeId: string): Promise<OfflineStatus> {
  const tasks = await getVolumeTasks(volumeId);
  if (tasks.length === 0) return { cached: 0, total: 0, complete: false };
  const caches = await openCaches(tasks.map((t) => t.cacheName));
  let cached = 0;
  await Promise.all(
    tasks.map(async ({ url, cacheName }) => {
      const cache = caches.get(cacheName);
      if (!cache) return;
      const hit = await cache.match(url);
      if (hit) cached += 1;
    }),
  );
  return { cached, total: tasks.length, complete: cached === tasks.length };
}

async function deleteTasksFromCaches(tasks: Task[]): Promise<void> {
  const caches = await openCaches(tasks.map((t) => t.cacheName));
  await Promise.all(
    tasks.map(async ({ url, cacheName }) => {
      const cache = caches.get(cacheName);
      if (cache) await cache.delete(url);
    }),
  );
}

/**
 * Drop every entry from the offline reading caches (`ec-chapters` and
 * `ec-assets`). Audio entries that landed in `ec-assets` while listening
 * online go too. The app shell precache (`workbox-precache-*`) and the
 * tiny `ec-chapter-manifest` are left alone — those aren't offline
 * reading content, and removing them risks the next launch.
 */
export async function wipeOfflineCaches(): Promise<void> {
  if (typeof caches === "undefined") return;
  await Promise.all(
    [CHAPTER_CACHE, ASSET_CACHE].map((name) => caches.delete(name).catch(() => false)),
  );
}

// Concurrency-limited walk: fan out CONCURRENCY workers that each pull the
// next task from a shared cursor. Stops early on `signal.aborted`.
async function fetchAll(
  tasks: Task[],
  signal: AbortSignal,
  onProgress: (p: OfflineProgress) => void,
): Promise<void> {
  const cacheMap = await openCaches(tasks.map((t) => t.cacheName));
  let cursor = 0;
  let done = 0;
  const total = tasks.length;
  onProgress({ done, total });

  async function worker() {
    while (!signal.aborted) {
      const idx = cursor++;
      if (idx >= total) return;
      const { url, cacheName } = tasks[idx]!;
      try {
        // `cache: "reload"` skips the browser's HTTP cache so we always
        // get a fresh response. The clone is what we persist; the
        // original is awaited for completion / status checks.
        const res = await fetch(url, { signal, cache: "reload" });
        const cache = cacheMap.get(cacheName);
        if (cache && res.ok) {
          await cache.put(url, res.clone());
        }
      } catch {
        // Swallow per-URL errors — partial progress is fine; the user can
        // re-run the sync. An aborted fetch throws here too; the outer
        // signal check will exit the worker on the next iteration.
      }
      done += 1;
      onProgress({ done, total });
    }
  }

  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, total) }, worker));
}

export async function downloadVolume(
  volumeId: string,
  signal: AbortSignal,
  onProgress: (p: OfflineProgress) => void,
): Promise<void> {
  const tasks = await getVolumeTasks(volumeId);
  if (tasks.length === 0) {
    onProgress({ done: 0, total: 0 });
    return;
  }
  await fetchAll(tasks, signal, onProgress);
}

export async function forceResyncVolume(
  volumeId: string,
  signal: AbortSignal,
  onProgress: (p: OfflineProgress) => void,
): Promise<void> {
  const tasks = await getVolumeTasks(volumeId);
  if (tasks.length === 0) {
    onProgress({ done: 0, total: 0 });
    return;
  }
  await deleteTasksFromCaches(tasks);
  await fetchAll(tasks, signal, onProgress);
}

// React state for one volume's sync. The drawer instantiates one of these
// per visible row so progress is per-row without leaking into a global.
export type SyncState =
  | { kind: "idle"; status: OfflineStatus | null }
  | { kind: "downloading"; progress: OfflineProgress }
  | { kind: "complete"; status: OfflineStatus }
  | { kind: "error"; message: string; status: OfflineStatus | null };

export function useOfflineSync(volumeId: string): {
  state: SyncState;
  download: () => void;
  resync: () => void;
  cancel: () => void;
  refreshStatus: () => Promise<void>;
} {
  const [state, setState] = useState<SyncState>({ kind: "idle", status: null });
  const controllerRef = useRef<AbortController | null>(null);

  const refreshStatus = useCallback(async () => {
    const status = await getVolumeOfflineStatus(volumeId);
    setState((prev) =>
      // Don't clobber an in-flight download with a status read.
      prev.kind === "downloading"
        ? prev
        : status.complete
          ? { kind: "complete", status }
          : { kind: "idle", status },
    );
  }, [volumeId]);

  // Initial status read on mount and whenever the volume changes.
  useEffect(() => {
    void refreshStatus();
    return () => {
      controllerRef.current?.abort();
      controllerRef.current = null;
    };
  }, [refreshStatus]);

  const run = useCallback(
    (mode: "download" | "resync") => {
      controllerRef.current?.abort();
      const controller = new AbortController();
      controllerRef.current = controller;
      setState({ kind: "downloading", progress: { done: 0, total: 0 } });

      const op = mode === "resync" ? forceResyncVolume : downloadVolume;
      op(volumeId, controller.signal, (progress) => {
        if (controller.signal.aborted) return;
        setState({ kind: "downloading", progress });
      })
        .then(async () => {
          if (controller.signal.aborted) return;
          const status = await getVolumeOfflineStatus(volumeId);
          setState(status.complete ? { kind: "complete", status } : { kind: "idle", status });
        })
        .catch((err: unknown) => {
          if (controller.signal.aborted) return;
          const message = err instanceof Error ? err.message : "Sync failed";
          setState((prev) => ({
            kind: "error",
            message,
            status: prev.kind === "idle" || prev.kind === "complete" ? prev.status : null,
          }));
        });
    },
    [volumeId],
  );

  const download = useCallback(() => run("download"), [run]);
  const resync = useCallback(() => run("resync"), [run]);
  const cancel = useCallback(() => {
    controllerRef.current?.abort();
    controllerRef.current = null;
    void refreshStatus();
  }, [refreshStatus]);

  return { state, download, resync, cancel, refreshStatus };
}

// Online/offline tracking — drives the drawer's "you're offline, connect to
// sync" hint and disables sync buttons when the device is offline.
export function useOnlineStatus(): boolean {
  const [online, setOnline] = useState(() =>
    typeof navigator === "undefined" ? true : navigator.onLine,
  );
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);
  return online;
}
