import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { cn } from "../../lib/cn";
import { ScrollArea } from "../primitives/scroll-area";

const navLinkBase = cn(
  "text-style-eyebrow transition-colors",
  "text-fg-muted hover:text-fg",
  "data-[status=active]:text-accent",
);

export function AppShell() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Reset scroll on route change — the ScrollArea's own viewport scrolls,
  // not the document, so the router's default scroll restoration won't apply.
  useEffect(() => {
    viewportRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <div className="h-screen flex flex-col bg-bg">
      <header className="shrink-0 border-b border-border">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-baseline gap-1.5 font-display tracking-wide text-2xl">
            <span className="text-fg">Evillious</span>
            <span className="text-fg-muted">Chronicles</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/library" className={navLinkBase}>
              Library
            </Link>
          </nav>
        </div>
      </header>
      <ScrollArea viewportRef={viewportRef} className="flex-1">
        <main>
          <Outlet />
        </main>
      </ScrollArea>
    </div>
  );
}
