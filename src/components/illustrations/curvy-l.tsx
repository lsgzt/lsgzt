"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Animated cursive "L" — a calligraphic, hand-drawn-style letter.
 *
 * Shape (single continuous stroke):
 *   1. Small loop at the bottom-left (the "foot" of the L)
 *   2. Tall vertical stem rising upward with a subtle inward (concave) curve
 *   3. Long sweeping tail at the top that extends across the page width,
 *      curving gently downward as it goes
 *
 * Animation timeline:
 *   - Phase 1 "drawing" (0–1.1s): stroke draws itself via pathLength 0→1
 *   - Phase 2 "dissolving" (1.1–2.6s): opacity fades as it melts into the aurora
 *   - Phase 3 "settled" (2.6s+): very faint background element (8% opacity)
 *
 * Style: purple → teal gradient stroke with a soft neon glow during draw,
 *        fading to a barely-there whisper once settled.
 *
 * Positioning: the SVG is absolutely positioned to cover the hero area.
 * The path is drawn in a 1200×500 viewBox with `preserveAspectRatio="none"`
 * so the tail stretches to any page width. The loop + stem sit on the left,
 * the tail extends to the right edge.
 *
 * Purely decorative — pointer-events:none, aria-hidden.
 * Performance: single SVG path, one-shot animation, no per-frame JS.
 */
export function CurvyL({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [phase, setPhase] = useState<"drawing" | "dissolving" | "settled">(
    "drawing"
  );

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setPhase("dissolving"), 1100);
    const t2 = setTimeout(() => setPhase("settled"), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [inView]);

  /*
    The cursive L path. ViewBox: 1200 wide × 500 tall.
    The path is one continuous stroke:

      - Start at the loop (bottom-left, around x=70, y=440)
      - Draw a small clockwise loop (the "foot")
      - Emerge from the loop and rise upward into the vertical stem
        with a subtle inward (concave-left) curve
      - At the top of the stem (~x=95, y=110), sweep rightward
        into a long tail that gently arcs downward to the right edge

    Coordinates are hand-tuned to feel organic and calligraphic,
    not geometrically perfect.
  */
  const path = [
    // Start at loop bottom
    "M 72 445",
    // Pronounced clockwise loop (the foot of the L) — bigger, more circular
    "C 44 445, 36 420, 56 408",
    "C 80 394, 100 414, 94 438",
    "C 90 456, 70 460, 60 450",
    // Emerge from loop and rise into the stem with a subtle inward curve
    "C 72 432, 80 380, 84 318",
    "C 87 248, 90 178, 94 128",
    "C 95 116, 97 110, 100 108",
    // At the top, sweep rightward into the long tail
    // Tail curves gently downward as it extends across the page
    "C 140 106, 200 112, 280 120",
    "C 380 130, 490 140, 600 144",
    "C 720 148, 840 150, 950 152",
    "C 1060 154, 1140 156, 1190 158",
  ].join(" ");

  // Stroke opacity per phase
  const strokeOpacity =
    phase === "drawing" ? 0.95 : phase === "dissolving" ? 0.45 : 0.08;

  // Glow filter — stronger during draw, gone when settled
  const glowFilter =
    phase === "settled"
      ? "blur(0.5px)"
      : "drop-shadow(0 0 6px rgba(168, 85, 247, 0.5)) drop-shadow(0 0 12px rgba(20, 184, 166, 0.25))";

  return (
    <div
      ref={ref}
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 500"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          {/* Purple → teal gradient along the stroke */}
          <linearGradient id="curvy-l-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="35%" stopColor="#8b5cf6" />
            <stop offset="65%" stopColor="#6366f1" />
            <stop offset="90%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        <motion.path
          d={path}
          fill="none"
          stroke="url(#curvy-l-gradient)"
          strokeWidth={2.4}
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
          style={{ filter: glowFilter }}
        />
      </svg>
    </div>
  );
}
