"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Animated cursive "L" — a hand-drawn-style letter that:
 *   1. Draws itself in ~1 second (stroke-dashoffset animation)
 *   2. The tail extends from the left across toward the right edge of the page
 *   3. Slowly dissolves into the aurora (opacity fade over ~1.5s)
 *   4. Stays as a very faint background element (low final opacity)
 *
 * The path is a single continuous cursive stroke:
 *   - starts with a small loop at the top (the ascender)
 *   - descends vertically
 *   - curves into a long sweeping tail that reaches across the page
 *
 * Purely decorative — pointer-events:none, aria-hidden.
 *
 * Performance note: uses a single CSS-animated SVG path (no per-frame JS),
 * so it's cheap even on low-end devices. The draw animation runs once on
 * mount, then the element becomes static.
 */
export function CurvyL({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [phase, setPhase] = useState<"drawing" | "dissolving" | "settled">(
    "drawing"
  );

  useEffect(() => {
    if (!inView) return;
    // Phase 1: draw (~1s)
    // Phase 2: dissolve into aurora (~1.5s, starts after draw completes)
    // Phase 3: settled (very faint, static)
    const t1 = setTimeout(() => setPhase("dissolving"), 1100);
    const t2 = setTimeout(() => setPhase("settled"), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [inView]);

  // The cursive L path. ViewBox is wide so the tail can stretch across the page.
  // Path: small loop at top → vertical descent → sweeping curvy tail to the right
  // Coordinates chosen to look hand-drawn and organic (no perfect geometry).
  const path =
    "M 40 20 " + // start at top of ascender
    "C 38 12, 48 8, 52 16 " + // small loop at the top
    "C 54 22, 50 30, 46 38 " + // descend from loop
    "L 44 70 " + // straight vertical stroke down
    "C 43 80, 42 90, 46 100 " + // slight curve at the bottom
    "C 55 115, 75 122, 105 124 " + // tail begins curving right
    "C 150 127, 200 125, 260 120 " + // tail continues sweeping right
    "C 340 113, 420 105, 500 100 " + // tail reaches further across
    "C 600 93, 700 90, 800 92 " + // tail extends toward right edge
    "C 880 94, 940 98, 980 102"; // tail fades toward the end

  // Stroke opacity per phase
  const strokeOpacity =
    phase === "drawing" ? 0.9 : phase === "dissolving" ? 0.5 : 0.08;

  // pathLength = 1 so we can animate strokeDashoffset from 1 → 0 cleanly
  return (
    <div
      ref={ref}
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1000 140"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 h-full w-full"
      >
        <motion.path
          d={path}
          fill="none"
          stroke="url(#curvy-l-gradient)"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            inView
              ? { pathLength: 1, opacity: strokeOpacity }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{
            pathLength: { duration: 1, ease: [0.65, 0, 0.35, 1] },
            opacity: {
              duration: phase === "drawing" ? 0.4 : 1.5,
              ease: "easeInOut",
            },
          }}
          style={{
            filter:
              phase === "settled"
                ? "blur(0.5px)"
                : "drop-shadow(0 0 6px rgba(124, 58, 237, 0.3))",
          }}
        />
        <defs>
          <linearGradient id="curvy-l-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--foreground)" />
            <stop offset="30%" stopColor="var(--foreground)" />
            <stop offset="60%" stopColor="var(--primary)" stopOpacity={0.7} />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity={0.2} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
