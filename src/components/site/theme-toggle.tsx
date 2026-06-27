"use client";

import { useCallback } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Apple-style theme toggle: a small pill that swaps sun/moon with a
 * crossfade. Uses a click-driven mounted flag (not useEffect) so we avoid
 * the React hooks set-state-in-effect rule while still preventing hydration
 * mismatch — the placeholder is shown until first interaction or until the
 * client theme resolves via the click handler.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  // resolvedTheme is undefined on the server and during the first client render,
  // then becomes "light" or "dark" once next-themes reads the stored theme.
  // We treat "undefined" as "show placeholder" to avoid hydration mismatch.
  const isDark = resolvedTheme === "dark";
  const isLight = resolvedTheme === "light";
  const mounted = isDark || isLight;

  const handleToggle = useCallback(() => {
    setTheme(isDark ? "light" : "dark");
  }, [isDark, setTheme]);

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary/40 text-foreground transition-colors hover:border-foreground/20 hover:bg-secondary/80",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted ? (
          isDark ? (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <Moon className="h-4 w-4" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate: 45, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -45, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <Sun className="h-4 w-4" />
            </motion.span>
          )
        ) : (
          <span className="h-4 w-4" />
        )}
      </AnimatePresence>
    </button>
  );
}
