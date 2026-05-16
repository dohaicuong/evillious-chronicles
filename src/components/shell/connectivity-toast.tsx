import { useEffect, useRef } from "react";
import { useToast } from "@src/components/primitives/toast";
import { useOnlineStatus } from "@src/lib/offline";

// Fires a small toast on online ↔ offline transitions so the user gets
// non-blocking feedback when connectivity changes. Initial mount is skipped —
// we only want a toast when the state actually changes, not on every page load.
export function ConnectivityToast() {
  const online = useOnlineStatus();
  const toast = useToast();
  const initialMount = useRef(true);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }
    if (online) {
      toast.add({ type: "success", title: "Back online" });
    } else {
      toast.add({ type: "error", title: "You're offline" });
    }
  }, [online, toast]);

  return null;
}
