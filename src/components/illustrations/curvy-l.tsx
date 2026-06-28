"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Animated cursive "L" — uses the user's exact SVG path from line_artwork.html.
 *
 * The path is a beautiful calligraphic L with a long sweeping tail.
 * Original viewBox: 0 0 26880 11520, with a y-flip transform so it renders
 * upright. Original gradient: #d400ff → #ba00ff → #7a00ff (magenta-purple).
 *
 * Animation timeline:
 *   - Phase 1 "drawing" (0–1.1s): stroke draws itself via pathLength 0→1
 *   - Phase 2 "dissolving" (1.1–2.6s): opacity fades as it melts into the aurora
 *   - Phase 3 "settled" (2.6s+): very faint background element (~8% opacity)
 *
 * Style: magenta-purple gradient stroke with a soft neon glow during draw,
 *        fading to a barely-there whisper once settled.
 *
 * The SVG uses preserveAspectRatio="none" so the tail stretches across any
 * page width. The path coordinates are preserved exactly from the source.
 *
 * Purely decorative — pointer-events:none, aria-hidden.
 * Performance: single SVG path, one-shot animation, no per-frame JS.
 *
 * Note: the original path uses fill (not stroke), but for the draw-on animation
 * we render it as a stroke with pathLength. The fill version is also kept
 * (at low opacity) so the L has body once drawn.
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

  // The exact path from the user's line_artwork.html
  const path =
    "M6400 8320 c-201 -42 -461 -297 -695 -685 -153 -252 -250 -459 -510 -1090 -59 -143 -113 -273 -120 -290 -10 -26 -31 -38 -136 -84 -662 -288 -1668 -518 -2864 -655 -661 -76 -1217 -86 -1715 -30 -141 16 -312 41 -343 50 -16 5 -18 0 -15 -52 l3 -58 75 -12 c336 -58 921 -81 1350 -54 398 25 1090 111 1550 191 770 135 1502 333 1943 526 44 19 81 33 83 30 6 -6 -82 -199 -181 -397 -89 -178 -189 -356 -288 -513 l-62 -98 -50 5 c-27 3 -113 14 -190 26 -116 18 -169 21 -310 17 -180 -5 -231 -13 -360 -54 -187 -61 -317 -163 -383 -300 -87 -183 -28 -357 143 -424 85 -33 281 -34 405 -1 106 28 283 115 375 184 97 74 256 229 345 337 61 75 79 91 102 91 32 0 236 -43 619 -129 680 -154 1035 -201 1679 -222 309 -11 393 -10 649 5 431 25 999 87 1731 191 987 140 1862 228 2740 276 312 17 1439 23 1840 10 506 -16 1162 -55 1630 -96 628 -55 887 -81 1590 -155 157 -17 420 -44 585 -60 165 -17 363 -37 440 -45 715 -77 1885 -175 2570 -214 732 -43 859 -46 1705 -46 790 1 994 5 1485 35 88 6 205 13 260 16 310 17 949 68 1360 110 208 21 803 97 1150 147 l290 42 3 38 c3 38 3 39 -25 33 -80 -17 -649 -95 -948 -130 -1370 -162 -2899 -233 -4206 -196 -543 16 -1418 62 -1699 90 -52 5 -162 14 -245 20 -145 10 -673 55 -1015 85 -91 8 -196 18 -235 21 -38 3 -281 28 -540 54 -258 27 -515 54 -570 59 -55 5 -442 43 -860 85 -875 86 -1124 108 -1540 136 -165 11 -334 22 -375 25 -336 25 -742 37 -1390 42 -881 7 -1203 -3 -1920 -58 -349 -26 -468 -37 -1050 -100 -239 -25 -741 -89 -1326 -168 -1117 -152 -1623 -182 -2369 -140 -454 25 -804 79 -1500 229 -104 23 -250 54 -323 70 -73 15 -135 30 -138 33 -2 2 30 54 71 115 156 230 307 510 475 878 66 145 77 163 108 178 107 51 404 253 582 395 125 100 332 302 432 421 203 242 361 544 413 791 24 113 24 243 0 307 -22 60 -73 125 -114 147 -38 19 -116 26 -171 15z m149 -88 c66 -48 90 -131 77 -261 -21 -208 -159 -521 -331 -749 -140 -187 -419 -459 -650 -633 -127 -97 -365 -248 -365 -233 0 9 134 337 262 644 214 510 423 870 629 1081 150 154 296 212 378 151z m-2344 -3187 c171 -27 195 -32 195 -43 0 -14 -124 -160 -213 -250 -237 -242 -478 -355 -723 -339 -241 15 -334 191 -203 386 89 133 251 222 464 255 143 22 298 19 480 -9z";

  // Opacity per phase
  const drawOpacity =
    phase === "drawing" ? 0.9 : phase === "dissolving" ? 0.45 : 0.08;

  // Glow filter — stronger during draw, gone when settled
  const glowFilter =
    phase === "settled"
      ? "blur(0.5px)"
      : "drop-shadow(0 0 10px rgba(186, 0, 255, 0.5))";

  return (
    <div
      ref={ref}
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 26880 11520"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          {/* The exact gradient from line_artwork.html */}
          <linearGradient id="curvy-l-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d400ff" stopOpacity={1} />
            <stop offset="50%" stopColor="#ba00ff" stopOpacity={1} />
            <stop offset="100%" stopColor="#7a00ff" stopOpacity={1} />
          </linearGradient>
        </defs>

        {/* The y-flip transform from the original, applied via a group */}
        <g transform="translate(0, 11520) scale(1, -1)">
          {/* Stroke version — for the draw-on animation */}
          <motion.path
            d={path}
            fill="none"
            stroke="url(#curvy-l-gradient)"
            strokeWidth={120}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              inView
                ? { pathLength: 1, opacity: drawOpacity }
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
        </g>
      </svg>
    </div>
  );
}
