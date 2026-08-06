"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Theme-aware LSGZ logo.
 *
 *  - Light mode (white page) → BLACK mark (/logo-black.png)
 *  - Dark mode  (dark page)  → WHITE mark (/logo-white.png)
 *
 * We don't rely on Tailwind's `dark:` variant here — we read the actual
 * resolved theme from next-themes after mount and pick the image src
 * explicitly in JSX, so there is zero ambiguity about which file renders.
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

  useEffect(() => {
    setMounted(true);
  }, []);

  // Before the client knows the theme, render both images stacked via
  // pure CSS that matches how next-themes toggles the class. This gives
  // the correct image immediately (no JS needed for the first paint)
  // and then React locks it down once mounted.
  if (!mounted) {
    return (
      <span
        className={cn("relative inline-block align-middle", className)}
        style={{ width: size, height: size }}
        aria-label={alt}
        role="img"
      >
        {/* Light-mode default: show black logo */}
        <img
          src="/logo-black.png"
          alt=""
          width={size}
          height={size}
          className="absolute inset-0 h-full w-full object-contain"
          style={{ display: "block" }}
          data-logo="light"
        />
        {/* Hide black logo when .dark is present on <html>, show white */}
        <style>{`
          :where(html.dark) [data-logo="light"] { display: none !important; }
          [data-logo="dark"] { display: none; }
          :where(html.dark) [data-logo="dark"] { display: block !important; }
        `}</style>
        <img
          src="/logo-white.png"
          alt=""
          width={size}
          height={size}
          className="absolute inset-0 h-full w-full object-contain"
          data-logo="dark"
        />
        <span className="sr-only">{alt}</span>
      </span>
    );
  }

  const src = resolvedTheme === "dark" ? "/logo-white.png" : "/logo-black.png";

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
