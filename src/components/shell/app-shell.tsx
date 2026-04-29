import { Link, Outlet } from "@tanstack/react-router";
import { cn } from "../../lib/cn";

const navLinkBase = cn(
  "text-style-eyebrow transition-colors",
  "text-fg-muted hover:text-fg",
  "data-[status=active]:text-accent",
);

export function AppShell() {
  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <header className="border-b border-border">
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
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
