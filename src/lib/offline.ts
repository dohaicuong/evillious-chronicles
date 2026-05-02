import { useCallback, useEffect, useRef, useState } from "react";
import { getVolumeChapterUrls } from "@app/library/-volumes";

/**
 * Pre-fetches a volume's chapter `.md` files while online so they're in the
 * `ec-chapters` SW cache for later offline reads. The SW's
 * StaleWhileRevalidate rule for `*.md` is what actually persists each
 * response — `downloadVolume` just walks the URL list and lets the SW do
 * its job. Status is read back by inspecting the cache directly.
 *
 * `forceResyncVolume` deletes the volume's URLs from the cache before
 * walking, which guarantees the next fetch hits the network instead of
 * the SWR-cached copy. Useful when the user suspects the offline copy is
 * stale (e.g. after content was updated on the server).
 */

const CHAPTER_CACHE = "ec-chapters";
const CONCURRENCY = 8;

export type OfflineProgress = { done: number; total: number };

export type OfflineStatus = {
  cached: number;
  total: number;
  /** True when every chapter URL is present in the SW cache. */
  complete: boolean;
};

async function openCache(): Promise<Cache | null> {
  if (typeof caches === "undefined") return null;
  try {
    return await caches.open(CHAPTER_CACHE);
  } catch {
    return null;
  }
}

export async function getVolumeOfflineStatus(volumeId: string): Promise<OfflineStatus> {
  const urls = await getVolumeChapterUrls(volumeId);
  const cache = await openCache();
  if (!cache || urls.length === 0) {
    return { cached: 0, total: urls.length, complete: false };
  }
  let cached = 0;
  await Promise.all(
    urls.map(async (url) => {
      const hit = await cache.match(url);
      if (hit) cached += 1;
    }),
  );
  return { cached, total: urls.length, complete: cached === urls.length };
}

async function deleteFromCache(urls: string[]): Promise<void> {
  const cache = await openCache();
  if (!cache) return;
  await Promise.all(urls.map((url) => cache.delete(url)));
}

// Concurrency-limited walk: fan out CONCURRENCY workers that each pull the
// next URL from a shared cursor. Stops early on `signal.aborted`.
//
// Each worker fetches the URL and writes the response to `ec-chapters`
// directly via the Cache API. We don't rely on the SW intercepting the
// fetch and caching as a side effect — that path is fine in production but
// dead in dev (the SW only registers when `devOptions.enabled` is true).
// Writing the cache entry ourselves makes the offline flow work the same
// in dev, prod, and incognito; if the SW is also active, both writes go
// to the same cache key so the cost is one harmless overwrite per page.
async function fetchAll(
  urls: string[],
  signal: AbortSignal,
  onProgress: (p: OfflineProgress) => void,
): Promise<void> {
  const cache = await openCache();
  let cursor = 0;
  let done = 0;
  const total = urls.length;
  onProgress({ done, total });

  async function worker() {
    while (!signal.aborted) {
      const idx = cursor++;
      if (idx >= total) return;
      const url = urls[idx]!;
      try {
        // `cache: "reload"` skips the browser's HTTP cache so we always
        // get a fresh response. The clone is what we persist; the
        // original is awaited for completion / status checks.
        const res = await fetch(url, { signal, cache: "reload" });
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
  const urls = await getVolumeChapterUrls(volumeId);
  if (urls.length === 0) {
    onProgress({ done: 0, total: 0 });
    return;
  }
  await fetchAll(urls, signal, onProgress);
}

export async function forceResyncVolume(
  volumeId: string,
  signal: AbortSignal,
  onProgress: (p: OfflineProgress) => void,
): Promise<void> {
  const urls = await getVolumeChapterUrls(volumeId);
  if (urls.length === 0) {
    onProgress({ done: 0, total: 0 });
    return;
  }
  await deleteFromCache(urls);
  await fetchAll(urls, signal, onProgress);
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
