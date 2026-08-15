"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const ariaLabel = mounted
    ? isDark
      ? "Switch to light mode"
      : "Switch to dark mode"
    : "Toggle theme";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={ariaLabel}
      className={cn(
        "relative inline-flex size-10 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-secondary",
        className,
      )}
    >
      {/* Avoid hydration mismatch: render icons only after mount */}
      {mounted && (
        <>
          <Sun
            className={cn(
              "size-5 transition-all duration-300",
              isDark
                ? "scale-0 -rotate-90 opacity-0"
                : "scale-100 rotate-0 opacity-100",
            )}
          />
          <Moon
            className={cn(
              "absolute size-5 transition-all duration-300",
              isDark
                ? "scale-100 rotate-0 opacity-100"
                : "scale-0 rotate-90 opacity-0",
            )}
          />
        </>
      )}
    </button>
  );
}
