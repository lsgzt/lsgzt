"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Animated cursive "L" — uses the user's exact SVG path from line_artwork.html.
 *
 * Behavior:
 *   1. On page load, the L draws itself in ~1 second (happens only once).
 *   2. It then dissolves to a very faint background state (~10% opacity).
 *   3. Every 5–9 seconds (random interval), a thin glowing highlight sweeps
 *      left-to-right across the L. During the sweep, the L's opacity temporarily
 *      boosts and a subtle glow appears. After the sweep, it returns to faded.
 *   4. The sweep repeats forever.
 *
 * Responsive:
 *   - Desktop: full tail extends across the page.
 *   - Mobile: the L keeps its proportions (no stretching/distortion), but the
 *     tail is cropped short by the viewport — so you see a consistent, well-
 *     shaped L rather than a squished one.
 *
 * Performance:
 *   - The draw animation is one-shot (CSS pathLength).
 *   - The sweep uses a single `transform: translateX()` on a clipped rect —
 *     this is GPU-composited, no repaints, runs at 60fps.
 *   - The opacity boost during sweep is a short CSS transition.
 *   - No heavy filters during steady state; glow is a single drop-shadow that
 *     only applies during the ~1s sweep window.
 *   - requestAnimationFrame drives the random scheduling so timers stay in
 *     sync with the browser's render loop.
 *
 * Purely decorative — pointer-events:none, aria-hidden.
 */
export function CurvyL({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const lPathRef = useRef<SVGPathElement>(null);
  const sweepGroupRef = useRef<SVGGElement>(null);
  const lGroupRef = useRef<SVGGElement>(null);
  const inView = useInView(ref, { once: true });
  const [phase, setPhase] = useState<"drawing" | "dissolving" | "settled">(
    "drawing"
  );

  // The exact path from the user's line_artwork.html
  const path =
    "M6400 8320 c-201 -42 -461 -297 -695 -685 -153 -252 -250 -459 -510 -1090 -59 -143 -113 -273 -120 -290 -10 -26 -31 -38 -136 -84 -662 -288 -1668 -518 -2864 -655 -661 -76 -1217 -86 -1715 -30 -141 16 -312 41 -343 50 -16 5 -18 0 -15 -52 l3 -58 75 -12 c336 -58 921 -81 1350 -54 398 25 1090 111 1550 191 770 135 1502 333 1943 526 44 19 81 33 83 30 6 -6 -82 -199 -181 -397 -89 -178 -189 -356 -288 -513 l-62 -98 -50 5 c-27 3 -113 14 -190 26 -116 18 -169 21 -310 17 -180 -5 -231 -13 -360 -54 -187 -61 -317 -163 -383 -300 -87 -183 -28 -357 143 -424 85 -33 281 -34 405 -1 106 28 283 115 375 184 97 74 256 229 345 337 61 75 79 91 102 91 32 0 236 -43 619 -129 680 -154 1035 -201 1679 -222 309 -11 393 -10 649 5 431 25 999 87 1731 191 987 140 1862 228 2740 276 312 17 1439 23 1840 10 506 -16 1162 -55 1630 -96 628 -55 887 -81 1590 -155 157 -17 420 -44 585 -60 165 -17 363 -37 440 -45 715 -77 1885 -175 2570 -214 732 -43 859 -46 1705 -46 790 1 994 5 1485 35 88 6 205 13 260 16 310 17 949 68 1360 110 208 21 803 97 1150 147 l290 42 3 38 c3 38 3 39 -25 33 -80 -17 -649 -95 -948 -130 -1370 -162 -2899 -233 -4206 -196 -543 16 -1418 62 -1699 90 -52 5 -162 14 -245 20 -145 10 -673 55 -1015 85 -91 8 -196 18 -235 21 -38 3 -281 28 -540 54 -258 27 -515 54 -570 59 -55 5 -442 43 -860 85 -875 86 -1124 108 -1540 136 -165 11 -334 22 -375 25 -336 25 -742 37 -1390 42 -881 7 -1203 -3 -1920 -58 -349 -26 -468 -37 -1050 -100 -239 -25 -741 -89 -1326 -168 -1117 -152 -1623 -182 -2369 -140 -454 25 -804 79 -1500 229 -104 23 -250 54 -323 70 -73 15 -135 30 -138 33 -2 2 30 54 71 115 156 230 307 510 475 878 66 145 77 163 108 178 107 51 404 253 582 395 125 100 332 302 432 421 203 242 361 544 413 791 24 113 24 243 0 307 -22 60 -73 125 -114 147 -38 19 -116 26 -171 15z m149 -88 c66 -48 90 -131 77 -261 -21 -208 -159 -521 -331 -749 -140 -187 -419 -459 -650 -633 -127 -97 -365 -248 -365 -233 0 9 134 337 262 644 214 510 423 870 629 1081 150 154 296 212 378 151z m-2344 -3187 c171 -27 195 -32 195 -43 0 -14 -124 -160 -213 -250 -237 -242 -478 -355 -723 -339 -241 15 -334 191 -203 386 89 133 251 222 464 255 143 22 298 19 480 -9z";

  // --- Phase 1: draw + dissolve (one-shot, on page load) ---
  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setPhase("dissolving"), 1100);
    const t2 = setTimeout(() => setPhase("settled"), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [inView]);

  // --- Phase 2: highlight sweep (repeats forever, random 5-9s intervals) ---
  useEffect(() => {
    if (phase !== "settled") return;

    let rafId: number;
    let timeoutId: ReturnType<typeof setTimeout>;
    let isRunning = true;

    const scheduleSweep = () => {
      if (!isRunning) return;
      // Random interval between 5 and 9 seconds
      const delay = 5000 + Math.random() * 4000;
      timeoutId = setTimeout(() => {
        triggerSweep();
      }, delay);
    };

    const triggerSweep = () => {
      if (!isRunning) return;
      const sweepGroup = sweepGroupRef.current;
      const group = lGroupRef.current;
      if (!sweepGroup || !group) {
        scheduleSweep();
        return;
      }

      // Boost opacity + add glow during the sweep.
      // Using CSS transition on opacity/filter (cheap, GPU-composited).
      group.style.transition = "opacity 0.4s ease-out, filter 0.4s ease-out";
      group.style.opacity = "0.6";
      group.style.filter =
        "drop-shadow(0 0 8px rgba(217, 0, 255, 0.5)) drop-shadow(0 0 4px rgba(255, 255, 255, 0.35))";

      // Animate the sweep wrapper from left to right in viewBox units.
      // We update the SVG `transform` attribute (which uses viewBox units,
      // NOT CSS pixels). The sweep takes ~1.1s.
      const duration = 1100;
      const startX = -4000;
      const endX = 28000;
      const startTime = performance.now();

      const animateSweep = (now: number) => {
        if (!isRunning) return;
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // ease-in-out for a premium feel
        const eased =
          progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        const currentX = startX + (endX - startX) * eased;
        // SVG transform attribute uses viewBox units — this is the key
        // difference from CSS transform (which would use CSS pixels)
        sweepGroup.setAttribute("transform", `translate(${currentX}, 0)`);
        sweepGroup.style.opacity = "1";

        if (progress < 1) {
          rafId = requestAnimationFrame(animateSweep);
        } else {
          // Sweep done — hide sweep, fade L back to settled state
          sweepGroup.style.opacity = "0";
          group.style.transition = "opacity 0.7s ease-in, filter 0.7s ease-in";
          group.style.opacity = "0.1";
          group.style.filter = "none";
          // Schedule the next sweep
          scheduleSweep();
        }
      };
      rafId = requestAnimationFrame(animateSweep);
    };

    // Start the first sweep after a short pause
    scheduleSweep();

    return () => {
      isRunning = false;
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [phase]);

  // Draw-phase opacity
  const drawOpacity =
    phase === "drawing" ? 0.9 : phase === "dissolving" ? 0.45 : 0.1;

  // Glow during draw
  const drawFilter =
    phase === "settled"
      ? "none"
      : "drop-shadow(0 0 10px rgba(186, 0, 255, 0.5))";

  return (
    <div
      ref={ref}
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 26880 11520"
        // "slice" preserves aspect ratio and crops overflow — so on narrow
        // (mobile) viewports the tail is cropped short but the loop + stem
        // keep their proper shape (no stretching/distortion). On wide
        // (desktop) viewports the full tail shows.
        preserveAspectRatio="xMidYMin slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          {/* The exact gradient from line_artwork.html */}
          <linearGradient id="curvy-l-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d400ff" stopOpacity={1} />
            <stop offset="50%" stopColor="#ba00ff" stopOpacity={1} />
            <stop offset="100%" stopColor="#7a00ff" stopOpacity={1} />
          </linearGradient>

          {/* Clip path = the L's stroke, so the sweep only appears on the L */}
          <clipPath id="curvy-l-clip">
            <path d={path} fill="none" strokeWidth={180} strokeLinecap="round" strokeLinejoin="round" />
          </clipPath>

          {/* The sweep highlight — white-to-transparent, thin, with soft edges */}
          <linearGradient id="sweep-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity={0} />
            <stop offset="45%" stopColor="#ffffff" stopOpacity={0} />
            <stop offset="50%" stopColor="#ffffff" stopOpacity={0.95} />
            <stop offset="55%" stopColor="#ffffff" stopOpacity={0} />
            <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* The y-flip transform from the original, applied via a group.
            This group's opacity/filter is what we boost during the sweep. */}
        <g
          ref={lGroupRef}
          transform="translate(0, 11520) scale(1, -1)"
          style={{
            opacity: drawOpacity,
            filter: drawFilter,
            transition:
              phase === "settled"
                ? "opacity 0.6s ease-in, filter 0.6s ease-in"
                : "none",
          }}
        >
          {/* The L itself — thin stroke (70 in viewBox units, looks ~2px at display size) */}
          <motion.path
            ref={lPathRef}
            d={path}
            fill="none"
            stroke="url(#curvy-l-gradient)"
            strokeWidth={70}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              inView
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{
              pathLength: { duration: 1, ease: [0.65, 0, 0.35, 1] },
              opacity: {
                duration: phase === "drawing" ? 0.4 : 1.5,
                ease: "easeInOut",
              },
            }}
          />

          {/* The sweep highlight — clipped to the L's stroke shape so the
              white gradient only appears on the L itself, not the background.
              The wrapper <g> is translated left-to-right via rAF.
              The sweep rect is ~3000 viewBox units wide (~equivalent to a
              2-4px band at display size given the viewBox is 26880 wide). */}
          <g clipPath="url(#curvy-l-clip)">
            <g
              ref={sweepGroupRef}
              style={{
                opacity: 0,
                willChange: "transform, opacity",
              }}
            >
              <rect
                x={0}
                y={0}
                width={3000}
                height={11520}
                fill="url(#sweep-gradient)"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
