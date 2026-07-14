"use client";

import { useEffect, useRef, useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Animated cursive "L" — uses the user's cursiveL.tsx animation logic
 * (draw-on-load + periodic comet sweep), integrated into the existing
 * container that provides:
 *   - ~5% left crop (translateX(-5%))
 *   - Top-left positioning, fills hero height
 *   - Responsive sizing (smaller on mobile)
 *   - Large, full-width look (preserveAspectRatio slice)
 *
 * Animation:
 *   1. On page load, the L draws itself in ~1 second (one smooth stroke).
 *   2. It then fades to a subtle filled state (~25% opacity).
 *   3. Every 5-9 seconds (random), a glowing "comet" sweeps along the entire
 *      path — a short bright segment (pink → white → pink trail + dual glow)
 *      travels from start to end over 5 seconds, following the L's curves.
 *   4. The sweep repeats forever.
 *
 * Purely decorative — pointer-events:none, aria-hidden.
 */
export function CurvyL({ className }: { className?: string }) {
  const baseRef = useRef<SVGPathElement | null>(null);
  const sweepRef = useRef<SVGPathElement | null>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const id = useId();
  const gradientId = `gradient-${id.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const trailId = `trail-${id.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  useEffect(() => {
    const base = baseRef.current;
    const sweep = sweepRef.current;
    if (!base || !sweep) return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const addTimeout = (fn: () => void, ms: number) => {
      const t = setTimeout(fn, ms);
      timeouts.push(t);
      return t;
    };

    // Wait for SVG to fully render before measuring paths
    requestAnimationFrame(() => {
      const Lb = base.getTotalLength();
      const Ls = sweep.getTotalLength();

      // --- Base draw animation ---
      base.style.strokeDasharray = `${Lb}`;
      base.style.strokeDashoffset = `${Lb}`;

      requestAnimationFrame(() => {
        base.style.transition = "stroke-dashoffset 1s ease-in-out";
        base.style.strokeDashoffset = "0";
      });

      // Fade base to subtle filled version after draw completes
      addTimeout(() => {
        base.style.transition = "opacity 1.5s ease-in-out, fill 1s ease-in-out";
        base.style.opacity = "0.25";
        base.style.fill = `url(#${gradientId})`;
      }, 1000);

      // --- Sweep setup ---
      const seg = Ls * 0.06; // comet length (6% of total path)
      sweep.style.strokeDasharray = `${seg} ${Ls}`;

      // --- Sweep animation function ---
      const doSweep = () => {
        sweep.style.opacity = "1";
        sweep.style.transition = "none";
        sweep.style.strokeDashoffset = `${Ls + seg}`; // start off the left
        sweep.getBoundingClientRect(); // force reflow so transition takes effect

        requestAnimationFrame(() => {
          sweep.style.transition = "stroke-dashoffset 5s linear";
          sweep.style.strokeDashoffset = `${-seg}`; // end off the right
        });

        // Fade out BEFORE reset — no visible return
        addTimeout(() => {
          sweep.style.transition = "opacity 0.4s";
          sweep.style.opacity = "0";
        }, 4900);
      };

      // --- Recurring schedule ---
      const schedule = () => {
        addTimeout(doSweep, 5000 + Math.random() * 4000);
        addTimeout(schedule, 10000);
      };

      // Kick off the sweep cycle after a short initial delay
      addTimeout(schedule, 2500);
    });

    timeoutsRef.current = timeouts;

    // Cleanup all timeouts on unmount
    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [gradientId]);

  // The full L path (from the user's cursiveL.tsx) — includes the main stroke
  // plus the two extra sub-paths (the small decorative loops).
  const path =
    "M6400 8320 c-201 -42 -461 -297 -695 -685 -153 -252 -250 -459 -510 -1090 -59 -143 -113 -273 -120 -290 -10 -26 -31 -38 -136 -84 -662 -288 -1668 -518 -2864 -655 -661 -76 -1217 -86 -1715 -30 -141 16 -312 41 -343 50 -16 5 -18 0 -15 -52 l3 -58 75 -12 c336 -58 921 -81 1350 -54 398 25 1090 111 1550 191 770 135 1502 333 1943 526 44 19 81 33 83 30 6 -6 -82 -199 -181 -397 -89 -178 -189 -356 -288 -513 l-62 -98 -50 5 c-27 3 -113 14 -190 26 -116 18 -169 21 -310 17 -180 -5 -231 -13 -360 -54 -187 -61 -317 -163 -383 -300 -87 -183 -28 -357 143 -424 85 -33 281 -34 405 -1 106 28 283 115 375 184 97 74 256 229 345 337 61 75 79 91 102 91 32 0 236 -43 619 -129 680 -154 1035 -201 1679 -222 309 -11 393 -10 649 5 431 25 999 87 1731 191 987 140 1862 228 2740 276 312 17 1439 23 1840 10 506 -16 1162 -55 1630 -96 628 -55 887 -81 1590 -155 157 -17 420 -44 585 -60 165 -17 363 -37 440 -45 715 -77 1885 -175 2570 -214 732 -43 859 -46 1705 -46 790 1 994 5 1485 35 88 6 205 13 260 16 310 17 949 68 1360 110 208 21 803 97 1150 147 l290 42 3 38 c3 38 3 39 -25 33 -80 -17 -649 -95 -948 -130 -1370 -162 -2899 -233 -4206 -196 -543 16 -1418 62 -1699 90 -52 5 -162 14 -245 20 -145 10 -673 55 -1015 85 -91 8 -196 18 -235 21 -38 3 -281 28 -540 54 -258 27 -515 54 -570 59 -55 5 -442 43 -860 85 -875 86 -1124 108 -1540 136 -165 11 -334 22 -375 25 -336 25 -742 37 -1390 42 -881 7 -1203 -3 -1920 -58 -349 -26 -468 -37 -1050 -100 -239 -25 -741 -89 -1326 -168 -1117 -152 -1623 -182 -2369 -140 -454 25 -804 79 -1500 229 -104 23 -250 54 -323 70 -73 15 -135 30 -138 33 -2 2 30 54 71 115 156 230 307 510 475 878 66 145 77 163 108 178 107 51 404 253 582 395 125 100 332 302 432 421 203 242 361 544 413 791 24 113 24 243 0 307 -22 60 -73 125 -114 147 -38 19 -116 26 -171 15z m149 -88 c66 -48 90 -131 77 -261 -21 -208 -159 -521 -331 -749 -140 -187 -419 -459 -650 -633 -127 -97 -365 -248 -365 -233 0 9 134 337 262 644 214 510 423 870 629 1081 150 154 296 212 378 151z m-2344 -3187 c171 -27 195 -32 195 -43 0 -14 -124 -160 -213 -250 -237 -242 -478 -355 -723 -339 -241 15 -334 191 -203 386 89 133 251 222 464 255 143 22 298 19 480 -9z";

  return (
    <div
      className={cn(
        "pointer-events-none absolute left-0 top-0 z-[1] overflow-hidden",
        className
      )}
      aria-hidden="true"
      style={{ height: "100%", width: "100%" }}
    >
      <svg
        viewBox="0 0 26880 11520"
        // "slice" + xMinYMin: L scales to COVER the container (large, full-width),
        // anchored to the top-left. Bottom overflows and is cropped.
        preserveAspectRatio="xMinYMin slice"
        // Responsive: smaller on mobile, full height on desktop.
        // translateX(-5%) crops ~5% off the left side.
        className="absolute left-0 top-0 h-[55%] w-auto max-w-none select-none sm:h-[65%] md:h-[80%] lg:h-full"
        style={{
          filter: "drop-shadow(0 0 10px rgba(186,0,255,.5))",
          transform: "translateX(-5%)",
        }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d400ff" />
            <stop offset="50%" stopColor="#ba00ff" />
            <stop offset="100%" stopColor="#7a00ff" />
          </linearGradient>
          <linearGradient id={trailId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff33cc" stopOpacity="0" />
            <stop offset="40%" stopColor="#ff33cc" stopOpacity="1" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="60%" stopColor="#ff33cc" stopOpacity="1" />
            <stop offset="100%" stopColor="#ff33cc" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g transform="translate(0,11520) scale(1,-1)">
          {/* Base L — draws in then fades to subtle background */}
          <path
            ref={baseRef}
            style={{
              fill: "transparent",
              stroke: `url(#${gradientId})`,
              strokeWidth: 150,
              opacity: 1,
            }}
            d={path}
          />

          {/* Sweep — glowing comet trail that animates periodically.
              Same path but without the 'z' sub-paths (open path) so the
              dash animation flows smoothly. */}
          <path
            ref={sweepRef}
            style={{
              fill: "none",
              stroke: `url(#${trailId})`,
              strokeWidth: 180,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              opacity: 0,
              filter:
                "drop-shadow(0 0 14px #ff33cc) drop-shadow(0 0 24px #fff)",
            }}
            d={path}
          />
        </g>
      </svg>
    </div>
  );
}
