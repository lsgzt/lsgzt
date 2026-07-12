"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Cursive "L" background element — uses the user's PNG image
 * (public/curvy-l.png, 2688×1152, RGBA with transparency).
 *
 * The image has the loop on the LEFT and the tail extending to the RIGHT.
 * It's a wide image (aspect ratio ~2.33:1) that's already perfect for both
 * mobile and desktop — we just need to place it correctly.
 *
 * Placement strategy:
 *   - The image is positioned at the TOP-LEFT of the hero (absolute, left:0, top:0).
 *   - The image height is set to fill the hero area (height: ~100% of hero).
 *   - The width scales proportionally from the height (since the image is wide,
 *     the width will be much larger than the viewport on mobile).
 *   - On DESKTOP (wide viewport): the image is tall enough to fill the hero
 *     height, and the tail extends across to the right edge of the page
 *     (or past it, cropped by overflow:hidden).
 *   - On MOBILE (narrow viewport): the image stays the same height (filling
 *     the hero), so the loop + stem on the left stay full-size. The tail
 *     extends past the right edge of the narrow viewport and gets cropped
 *     by the hero's overflow:hidden. The L does NOT shrink — only the tail
 *     gets cut.
 *
 * Animation:
 *   1. On page load, the L fades in (opacity 0 → 0.25) over ~1 second.
 *      (We can't do a stroke-draw animation on a PNG, so we do a gentle
 *      fade-in instead.)
 *   2. It stays at a faint ~25% opacity as a background element.
 *
 * Note: The comet sweep animation from the SVG version is not possible with
 * a static PNG. The L is now a simple, elegant background decoration that
 * fades in on load and stays faint. This is cleaner, more performant, and
 * exactly matches the user's reference image.
 *
 * Purely decorative — pointer-events:none, aria-hidden.
 */
export function CurvyL({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!inView) return;
    // Small delay so the fade-in feels intentional (after the loading screen)
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <div
      ref={ref}
      className={cn(
        "pointer-events-none absolute left-0 top-0 z-[1] overflow-hidden",
        className
      )}
      aria-hidden="true"
      style={{
        // Fill the hero height. The image will scale proportionally.
        height: "100%",
        width: "100%",
      }}
    >
      <img
        src="/curvy-l.png"
        alt=""
        className="absolute left-0 top-0 h-full w-auto max-w-none select-none"
        style={{
          // Gentle glow to match the previous SVG aesthetic
          filter: "drop-shadow(0 0 12px rgba(186, 0, 255, 0.35))",
          opacity: visible ? 0.25 : 0,
          transition: "opacity 1.2s ease-in-out",
        }}
        draggable={false}
      />
    </div>
  );
}
