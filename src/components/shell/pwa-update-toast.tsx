import { useEffect, useRef } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { useToast } from "@src/components/primitives/toast";

export function PwaUpdateToast() {
  const toast = useToast();

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW();

  // Guard against duplicate toasts when state flips back-and-forth (e.g. the
  // user dismisses, then a hot-reload re-runs the effect in dev).
  const firedRefresh = useRef(false);
  const firedOffline = useRef(false);

  useEffect(() => {
    if (!needRefresh || firedRefresh.current) return;
    firedRefresh.current = true;

    toast.add({
      type: "info",
      title: "A new chapter has been printed",
      description: "Reload to see the latest updates to the chronicle.",
      actionProps: {
        children: "Reload",
        onClick: () => {
          setNeedRefresh(false);
          // updateServiceWorker(true)'s reload-page argument is a no-op in
          // vite-plugin-pwa v1; the library only reloads via the workbox
          // `controlling` listener, which can stall. Send the skip-waiting
          // message ourselves and force the reload so the click is guaranteed.
          void updateServiceWorker().finally(() => {
            window.location.reload();
          });
        },
      },
      onClose: () => {
        firedRefresh.current = false;
        setNeedRefresh(false);
      },
    });
  }, [needRefresh, setNeedRefresh, toast, updateServiceWorker]);

  useEffect(() => {
    if (!offlineReady || firedOffline.current) return;
    firedOffline.current = true;

    toast.add({
      type: "success",
      title: "Available offline",
      description: "The chronicle is now cached and readable without a connection.",
      onClose: () => {
        setOfflineReady(false);
      },
    });
  }, [offlineReady, setOfflineReady, toast]);

  return null;
}
