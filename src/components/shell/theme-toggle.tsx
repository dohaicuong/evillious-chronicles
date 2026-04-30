import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useTheme } from "@src/lib/theme";
import { IconButton } from "@src/components/primitives/icon-button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // Avoid icon flicker on first paint — `resolvedTheme` resolves after mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <IconButton
      variant="ghost"
      size="sm"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {mounted ? (
        isDark ? (
          <SunIcon weight="light" />
        ) : (
          <MoonIcon weight="light" />
        )
      ) : (
        // Placeholder reserves space until theme resolves.
        <span className="block h-5 w-5" aria-hidden />
      )}
    </IconButton>
  );
}
