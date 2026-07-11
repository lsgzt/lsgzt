"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Animated cursive "L" — uses the user's exact SVG path from
 * perfect_cursive_animationL.html, with the L anchored to the upper-left
 * at a FIXED SIZE on all viewports. The tail extends rightward; on wide
 * screens it reaches the right edge of the page, on narrow (mobile) screens
 * the tail is cropped by the container's overflow:hidden — the L itself
 * never shrinks.
 *
 * Behavior:
 *   1. On page load, the L draws itself in ~1 second (one smooth stroke).
 *   2. It then settles to a faint background state (~25% opacity, filled).
 *   3. Every 5–9 seconds (random), a "comet" highlight sweeps along the ENTIRE
 *      path — a short bright segment (pink → white → pink trail + glow) travels
 *      from start to end, following the L's curves.
 *   4. The sweep repeats forever.
 *
 * Sizing strategy:
 *   - The SVG has a FIXED pixel size (width: 900px, height: 800px) that does
 *     NOT change with viewport width. This keeps the L the same physical size
 *     on mobile and desktop.
 *   - The SVG is anchored to the top-left of the hero (absolute, top:0, left:0).
 *   - The parent container has overflow:hidden, so on narrow mobile screens
 *     the tail (which extends past the right edge) gets cropped — but the
 *     loop + stem on the left stay full-size and fully visible.
 *   - On wide desktop screens, the full L (including the tail) is visible
 *     and the tail reaches toward the right edge of the hero.
 *
 * Performance:
 *   - The draw animation is one-shot (CSS stroke-dashoffset transition).
 *   - The sweep is a single CSS transition on stroke-dashoffset (GPU-composited).
 *   - No requestAnimationFrame loop needed.
 *
 * Purely decorative — pointer-events:none, aria-hidden.
 */
export function CurvyL({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const baseRef = useRef<SVGPathElement>(null);
  const sweepRef = useRef<SVGPathElement>(null);
  const inView = useInView(ref, { once: true });
  const [phase, setPhase] = useState<"drawing" | "settled">("drawing");

  // The SINGLE OPEN path (no `z`, no extra loops) from the user's reference.
  const path =
    "M6400 8320 c-201 -42 -461 -297 -695 -685 -153 -252 -250 -459 -510 -1090 -59 -143 -113 -273 -120 -290 -10 -26 -31 -38 -136 -84 -662 -288 -1668 -518 -2864 -655 -661 -76 -1217 -86 -1715 -30 -141 16 -312 41 -343 50 -16 5 -18 0 -15 -52 l3 -58 75 -12 c336 -58 921 -81 1350 -54 398 25 1090 111 1550 191 770 135 1502 333 1943 526 44 19 81 33 83 30 6 -6 -82 -199 -181 -397 -89 -178 -189 -356 -288 -513 l-62 -98 -50 5 c-27 3 -113 14 -190 26 -116 18 -169 21 -310 17 -180 -5 -231 -13 -360 -54 -187 -61 -317 -163 -383 -300 -87 -183 -28 -357 143 -424 85 -33 281 -34 405 -1 106 28 283 115 375 184 97 74 256 229 345 337 61 75 79 91 102 91 32 0 236 -43 619 -129 680 -154 1035 -201 1679 -222 309 -11 393 -10 649 5 431 25 999 87 1731 191 987 140 1862 228 2740 276 312 17 1439 23 1840 10 506 -16 1162 -55 1630 -96 628 -55 887 -81 1590 -155 157 -17 420 -44 585 -60 165 -17 363 -37 440 -45 715 -77 1885 -175 2570 -214 732 -43 859 -46 1705 -46 790 1 994 5 1485 35 88 6 205 13 260 16 310 17 949 68 1360 110 208 21 803 97 1150 147 l290 42 3 38 c3 38 3 39 -25 33 -80 -17 -649 -95 -948 -130 -1370 -162 -2899 -233 -4206 -196 -543 16 -1418 62 -1699 90 -52 5 -162 14 -245 20 -145 10 -673 55 -1015 85 -91 8 -196 18 -235 21 -38 3 -281 28 -540 54 -258 27 -515 54 -570 59 -55 5 -442 43 -860 85 -875 86 -1124 108 -1540 136 -165 11 -334 22 -375 25 -336 25 -742 37 -1390 42 -881 7 -1203 -3 -1920 -58 -349 -26 -468 -37 -1050 -100 -239 -25 -741 -89 -1326 -168 -1117 -152 -1623 -182 -2369 -140 -454 25 -804 79 -1500 229 -104 23 -250 54 -323 70 -73 15 -135 30 -138 33 -2 2 30 54 71 115 156 230 307 510 475 878 66 145 77 163 108 178 107 51 404 253 582 395 125 100 332 302 432 421 203 242 361 544 413 791 24 113 24 243 0 307 -22 60 -73 125 -114 147 -38 19 -116 26 -171 15";

  // Tight viewBox that fits the entire L (with padding), computed from the
  // path's bounding box after the flip transform. With translate(6400, 8320)
  // scale(-1, -1), the L is upright with the loop on the LEFT and the tail
  // extending to the RIGHT.
  const viewBox = "-200 -200 11006 9810";

  // --- Phase 1: draw (one-shot, on page load) ---
  useEffect(() => {
    if (!inView) return;
    const base = baseRef.current;
    if (!base) return;

    // Use stroke-dashoffset to draw the L in ~1 second (one smooth stroke)
    const totalLen = base.getTotalLength();
    base.style.strokeDasharray = String(totalLen);
    base.style.strokeDashoffset = String(totalLen);
    base.getBoundingClientRect();
    requestAnimationFrame(() => {
      base.style.transition = "stroke-dashoffset 1s ease-in-out";
      base.style.strokeDashoffset = "0";
    });

    const t = setTimeout(() => setPhase("settled"), 1000);
    return () => clearTimeout(t);
  }, [inView]);

  // --- Phase 2: comet sweep (repeats forever, random 5-9s intervals) ---
  useEffect(() => {
    if (phase !== "settled") return;

    const sweep = sweepRef.current;
    if (!sweep) return;

    const totalLen = sweep.getTotalLength();
    const segment = totalLen * 0.06; // 6% of path length = comet length
    sweep.style.strokeDasharray = `${segment} ${totalLen}`;

    let timeoutId: ReturnType<typeof setTimeout>;
    let isRunning = true;

    const doSweep = () => {
      if (!isRunning) return;

      sweep.style.opacity = "1";
      sweep.style.transition = "none";
      sweep.style.strokeDashoffset = String(totalLen + segment);
      sweep.getBoundingClientRect();
      requestAnimationFrame(() => {
        sweep.style.transition = "stroke-dashoffset 5s linear";
        sweep.style.strokeDashoffset = String(-segment);
      });

      timeoutId = setTimeout(() => {
        if (!isRunning) return;
        sweep.style.transition = "opacity 0.4s";
        sweep.style.opacity = "0";
        timeoutId = setTimeout(() => {
          if (isRunning) doSweep();
        }, 5000 + Math.random() * 4000);
      }, 4900);
    };

    timeoutId = setTimeout(doSweep, 2500);

    return () => {
      isRunning = false;
      clearTimeout(timeoutId);
    };
  }, [phase]);

  return (
    <div
      ref={ref}
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox={viewBox}
        // "slice" + xMinYMin: the L scales to COVER the container (no empty
        // space), anchored to the top-left. The L is LARGE — it fills the
        // width on desktop so the tail reaches the right edge. The bottom
        // overflows and is cropped by the container's overflow:hidden.
        //
        // On mobile (narrow): slice scales by HEIGHT (since the container is
        // taller than the L's aspect ratio), so the L fills the height — the
        // loop + stem stay full-size on the left, and the tail extends past
        // the right edge where it gets cropped. The L does NOT shrink.
        //
        // On desktop (wide): slice scales by WIDTH, so the L fills the width
        // — the tail reaches the right edge of the page, and the bottom of
        // the L overflows below (cropped). The loop is at the top-left.
        preserveAspectRatio="xMinYMin slice"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="curvy-l-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d400ff" />
            <stop offset="50%" stopColor="#ba00ff" />
            <stop offset="100%" stopColor="#7a00ff" />
          </linearGradient>

          <linearGradient id="curvy-l-trail" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff33cc" stopOpacity={0} />
            <stop offset="40%" stopColor="#ff33cc" stopOpacity={1} />
            <stop offset="50%" stopColor="#ffffff" stopOpacity={1} />
            <stop offset="60%" stopColor="#ff33cc" stopOpacity={1} />
            <stop offset="100%" stopColor="#ff33cc" stopOpacity={0} />
          </linearGradient>
        </defs>

        <g transform="translate(6400, 8320) scale(-1, -1)">
          {/* Base L — draws itself on page load, then settles to faded state */}
          <path
            ref={baseRef}
            d={path}
            fill={phase === "settled" ? "url(#curvy-l-gradient)" : "transparent"}
            stroke="url(#curvy-l-gradient)"
            strokeWidth={150}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              opacity: phase === "settled" ? 0.25 : 1,
              transition:
                phase === "settled"
                  ? "opacity 1.5s ease-in-out, fill 1s ease-in-out"
                  : "none",
              filter: "drop-shadow(0 0 10px rgba(186, 0, 255, 0.5))",
            }}
          />

          {/* Comet sweep path — same shape, on top. A short bright segment
              travels along the path via stroke-dashoffset animation. */}
          <path
            ref={sweepRef}
            d={path}
            fill="none"
            stroke="url(#curvy-l-trail)"
            strokeWidth={180}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              opacity: 0,
              filter:
                "drop-shadow(0 0 14px #ff33cc) drop-shadow(0 0 24px #fff)",
            }}
          />
        </g>
      </svg>
    </div>
  );
}
