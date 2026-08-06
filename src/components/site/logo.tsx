"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/**
 * Theme-aware LSGZ logo.
 *
 * - Light mode (white page bg)  → black stroke   (logo-black.png)
 * - Dark mode  (near-black bg)  → white stroke   (logo-white.png)
 *
 * Renders nothing until the client has resolved the theme (avoids a
 * hydration flash / wrong-color-on-first-paint) and then picks the right
 * asset explicitly in JSX based on next-themes' resolvedTheme.
 */
export function Logo({
  className,
  size = 28,
  alt = "LSGZ logo",
}: {
  className?: string;
  size?: number;
  alt?: string;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Until the client knows which theme is active, render a transparent
  // placeholder reserving the same space — prevents a flash of wrong color.
  if (!mounted) {
    return (
      <span
        aria-hidden
        className={cn("inline-block object-contain", className)}
        style={{ width: size, height: size }}
      />
    );
  }

  const isDark = resolvedTheme === "dark";
  const src = isDark ? "/logo-white.png" : "/logo-black.png";

  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn("h-auto w-full object-contain", className)}
      draggable={false}
    />
  );
}
