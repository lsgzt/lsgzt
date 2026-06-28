"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Aurora gradient background — soft drifting color blobs.
 *
 * Colors come from the --aurora-* CSS variables so the same component works
 * for both the Apple-light and Vercel-dark themes. The blob positions follow
 * the user's spec:
 *   - top-left     → soft indigo glow (aurora-1)
 *   - top-right    → tiny purple glow (aurora-2)
 *   - bottom-left  → almost black    (aurora-4)
 *   - bottom-right → black            (aurora-4, deeper)
 *   - center       → very subtle navy (aurora-3)
 *
 * Variants:
 *   - "hero"    — full intensity, large blobs (default)
 *   - "bottom"  — very subtle, used at the page footer area
 *
 * Purely decorative — pointer-events:none and aria-hidden.
 */
type AuroraBackgroundProps = {
  className?: string;
  variant?: "hero" | "bottom";
};

export function AuroraBackground({
  className,
  variant = "hero",
}: AuroraBackgroundProps) {
  // Hero = full size, bright. Bottom = smaller, faded — just a gentle wash.
  const sizeBase = variant === "hero" ? 520 : 380;
  const opacityScale = variant === "hero" ? 1 : 0.5;

  return (
    <div className={cn("aurora", className)} aria-hidden="true">
      {/* Top-left — soft indigo glow (largest, anchors the hero) */}
      <motion.div
        className="aurora-blob"
        style={{
          width: sizeBase,
          height: sizeBase,
          top: variant === "hero" ? "-15%" : "-30%",
          left: "-8%",
          background: "var(--aurora-1)",
          opacity: opacityScale,
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Top-right — tiny purple glow (smaller + dimmer) */}
      <motion.div
        className="aurora-blob"
        style={{
          width: sizeBase * 0.55,
          height: sizeBase * 0.55,
          top: variant === "hero" ? "-10%" : "-25%",
          right: "-5%",
          background: "var(--aurora-2)",
          opacity: opacityScale * 0.85,
        }}
        animate={{
          x: [0, -30, 0],
          y: [0, 35, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Center/bottom — subtle navy + near-black wash (single combined blob) */}
      <motion.div
        className="aurora-blob"
        style={{
          width: sizeBase * 0.85,
          height: sizeBase * 0.85,
          bottom: variant === "hero" ? "-30%" : "-45%",
          left: "30%",
          background: "var(--aurora-3)",
          opacity: opacityScale * 0.7,
        }}
        animate={{
          x: [0, 25, -15, 0],
          y: [0, -15, 10, 0],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  );
}
