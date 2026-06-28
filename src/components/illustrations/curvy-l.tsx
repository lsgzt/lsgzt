"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Animated cursive "L" — uses the user's exact SVG path (main sub-path only)
 * from line_artwork.html.
 *
 * Behavior:
 *   1. On page load, the L draws itself in ~1 second (happens only once).
 *   2. It then settles to a very faint background state (~12% opacity).
 *   3. Every 5–9 seconds (random interval), a "progressive brighten" sweep
 *      travels left-to-right across the L. As the sweep position advances,
 *      the portion of the L to the LEFT of the sweep is bright (with a subtle
 *      glow), while the portion to the RIGHT stays faded. Like:
 *         -===   (sweep near left — left portion bright)
 *         =-==   (sweep moving right)
 *         ==-=   (sweep further right)
 *         ===-   (sweep near right)
 *         ====   (sweep complete — whole L bright, then fades back)
 *   4. The sweep repeats forever.
 *
 * How the sweep works:
 *   - The L path is rendered TWICE:
 *     (a) a faded base layer (always at ~12% opacity)
 *     (b) a bright layer (full opacity + glow), clipped to a rectangle that
 *         grows from the left edge to the current sweep x-position.
 *   - As the sweep x-position moves left→right, the clip rectangle grows,
 *     revealing more of the bright layer. So the bright portion "follows"
 *     the sweep position.
 *   - When the sweep reaches the right edge, the whole L is bright. Then
 *     both layers fade back to the settled state and the cycle repeats.
 *
 * Responsive:
 *   - The viewBox is tightly fit to the L's bounding box (with padding), so
 *     the entire L — loop, stem, AND tail — is always visible on every
 *     viewport. On wide screens the L sits in the upper-left and scales up;
 *     on narrow (mobile) screens the L scales down to fit but keeps its
 *    完整 shape. No cropping, no distortion.
 *
 * Performance:
 *   - The draw animation is one-shot (CSS pathLength via Framer Motion).
 *   - The sweep uses a single `clipPath` with a `<rect>` whose `width` is
 *     updated via requestAnimationFrame. Updating a clip rect's width is
 *     cheaper than re-rendering the path. The bright layer is GPU-composited.
 *   - No heavy filters during steady state; the glow is a single drop-shadow
 *     on the bright layer that only applies during the sweep window.
 *
 * Purely decorative — pointer-events:none, aria-hidden.
 */
export function CurvyL({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const lPathRef = useRef<SVGPathElement>(null);
  const clipRectRef = useRef<SVGRectElement>(null);
  const brightGroupRef = useRef<SVGGElement>(null);
  const inView = useInView(ref, { once: true });
  const [phase, setPhase] = useState<"drawing" | "dissolving" | "settled">(
    "drawing"
  );

  // The MAIN sub-path only (first 'z' closes it). The original path had 3
  // sub-paths; the extra 2 were small decorative loops that made the L look
  // "doubled". Stripping them gives a single, clean L stroke.
  const path =
    "M6400 8320 c-201 -42 -461 -297 -695 -685 -153 -252 -250 -459 -510 -1090 -59 -143 -113 -273 -120 -290 -10 -26 -31 -38 -136 -84 -662 -288 -1668 -518 -2864 -655 -661 -76 -1217 -86 -1715 -30 -141 16 -312 41 -343 50 -16 5 -18 0 -15 -52 l3 -58 75 -12 c336 -58 921 -81 1350 -54 398 25 1090 111 1550 191 770 135 1502 333 1943 526 44 19 81 33 83 30 6 -6 -82 -199 -181 -397 -89 -178 -189 -356 -288 -513 l-62 -98 -50 5 c-27 3 -113 14 -190 26 -116 18 -169 21 -310 17 -180 -5 -231 -13 -360 -54 -187 -61 -317 -163 -383 -300 -87 -183 -28 -357 143 -424 85 -33 281 -34 405 -1 106 28 283 115 375 184 97 74 256 229 345 337 61 75 79 91 102 91 32 0 236 -43 619 -129 680 -154 1035 -201 1679 -222 309 -11 393 -10 649 5 431 25 999 87 1731 191 987 140 1862 228 2740 276 312 17 1439 23 1840 10 506 -16 1162 -55 1630 -96 628 -55 887 -81 1590 -155 157 -17 420 -44 585 -60 165 -17 363 -37 440 -45 715 -77 1885 -175 2570 -214 732 -43 859 -46 1705 -46 790 1 994 5 1485 35 88 6 205 13 260 16 310 17 949 68 1360 110 208 21 803 97 1150 147 l290 42 3 38 c3 38 3 39 -25 33 -80 -17 -649 -95 -948 -130 -1370 -162 -2899 -233 -4206 -196 -543 16 -1418 62 -1699 90 -52 5 -162 14 -245 20 -145 10 -673 55 -1015 85 -91 8 -196 18 -235 21 -38 3 -281 28 -540 54 -258 27 -515 54 -570 59 -55 5 -442 43 -860 85 -875 86 -1124 108 -1540 136 -165 11 -334 22 -375 25 -336 25 -742 37 -1390 42 -881 7 -1203 -3 -1920 -58 -349 -26 -468 -37 -1050 -100 -239 -25 -741 -89 -1326 -168 -1117 -152 -1623 -182 -2369 -140 -454 25 -804 79 -1500 229 -104 23 -250 54 -323 70 -73 15 -135 30 -138 33 -2 2 30 54 71 115 156 230 307 510 475 878 66 145 77 163 108 178 107 51 404 253 582 395 125 100 332 302 432 421 203 242 361 544 413 791 24 113 24 243 0 307 -22 60 -73 125 -114 147 -38 19 -116 26 -171 15z";

  // Tight viewBox that fits the entire L (with padding), computed from the
  // path's bounding box after the flip transform. With translate(6400, 8320)
  // scale(-1, -1), the L is upright with the loop on the LEFT and the tail
  // extending to the RIGHT — matching the user's reference orientation.
  const viewBox = "-200 -200 11006 9810";

  // The clip rect's x-start and max width (in viewBox units).
  // The clip grows from 0 width (nothing bright) to full width (whole L bright).
  const CLIP_X_START = -200;
  const CLIP_MAX_WIDTH = 11006;

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

  // --- Phase 2: progressive brighten sweep (repeats forever, random 5-9s) ---
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
      const clipRect = clipRectRef.current;
      const brightGroup = brightGroupRef.current;
      if (!clipRect || !brightGroup) {
        scheduleSweep();
        return;
      }

      // Make the bright layer visible + add glow
      brightGroup.style.transition =
        "opacity 0.3s ease-out, filter 0.3s ease-out";
      brightGroup.style.opacity = "1";
      brightGroup.style.filter =
        "drop-shadow(0 0 6px rgba(217, 0, 255, 0.6)) drop-shadow(0 0 3px rgba(255, 255, 255, 0.4))";

      // Animate the clip rect's width from 0 → CLIP_MAX_WIDTH.
      // As the width grows, more of the bright layer is revealed (left-to-right).
      // The bright layer is on TOP of the faded base layer, so:
      //   - left of sweep position: bright (bright layer visible)
      //   - right of sweep position: faded (base layer shows through)
      const duration = 1500; // 1.5s sweep — slow enough to feel premium
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
        const currentWidth = CLIP_MAX_WIDTH * eased;
        // Update the clip rect's width — this reveals more of the bright layer
        clipRect.setAttribute("width", String(currentWidth));

        if (progress < 1) {
          rafId = requestAnimationFrame(animateSweep);
        } else {
          // Sweep complete — whole L is bright (====). Hold briefly, then
          // fade the bright layer out to return to the faded settled state.
          clipRect.setAttribute("width", String(CLIP_MAX_WIDTH));
          // Hold the fully-bright state for 400ms
          setTimeout(() => {
            if (!isRunning) return;
            brightGroup.style.transition =
              "opacity 0.8s ease-in, filter 0.8s ease-in";
            brightGroup.style.opacity = "0";
            brightGroup.style.filter = "none";
            // Reset clip rect to 0 width for the next sweep
            setTimeout(() => {
              if (!isRunning) return;
              clipRect.setAttribute("width", "0");
              scheduleSweep();
            }, 800);
          }, 400);
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

  // Base layer opacity per phase
  const baseOpacity =
    phase === "drawing" ? 0.9 : phase === "dissolving" ? 0.4 : 0.12;

  return (
    <div
      ref={ref}
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden="true"
    >
      <svg
        viewBox={viewBox}
        // "meet" ensures the ENTIRE L is always visible — no cropping.
        // The L scales to fit the viewport while preserving aspect ratio.
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          {/* The exact gradient from line_artwork.html */}
          <linearGradient id="curvy-l-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d400ff" stopOpacity={1} />
            <stop offset="50%" stopColor="#ba00ff" stopOpacity={1} />
            <stop offset="100%" stopColor="#7a00ff" stopOpacity={1} />
          </linearGradient>

          {/* Clip path for the bright layer — a rect whose width is animated
              from 0 → full. This reveals the bright layer left-to-right. */}
          <clipPath id="curvy-l-bright-clip">
            <rect
              ref={clipRectRef}
              x={CLIP_X_START}
              y={-200}
              width={0}
              height={9810}
            />
          </clipPath>
        </defs>

        {/* Faded base layer — always visible at low opacity.
            This is the "faded L" that's always there in settled state.
            The transform flips the path so loop is on left, tail extends right. */}
        <g transform="translate(6400, 8320) scale(-1, -1)">
          <path
            d={path}
            fill="none"
            stroke="url(#curvy-l-gradient)"
            strokeWidth={70}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              opacity: baseOpacity,
              transition:
                phase === "settled"
                  ? "opacity 0.6s ease-in"
                  : "none",
            }}
          />
        </g>

        {/* Bright layer — same path, but clipped to a growing rect in VIEWER
            space (not the flipped path space). The clip rect grows from
            left to right, revealing the bright stroke progressively.
            Initially invisible (opacity 0). During a sweep, opacity → 1 and
            the clip rect grows. This sits ON TOP of the base layer. */}
        <g
          ref={brightGroupRef}
          clipPath="url(#curvy-l-bright-clip)"
          style={{
            opacity: 0,
            willChange: "opacity, filter",
          }}
        >
          <g transform="translate(6400, 8320) scale(-1, -1)">
            <motion.path
              ref={lPathRef}
              d={path}
              fill="none"
              stroke="url(#curvy-l-gradient)"
              strokeWidth={70}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{
                pathLength: { duration: 1, ease: [0.65, 0, 0.35, 1] },
              }}
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
