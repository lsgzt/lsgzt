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
      {/* Top-left — soft indigo glow */}
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
          x: [0, 60, 0],
          y: [0, 40, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 24,
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
          x: [0, -40, 0],
          y: [0, 50, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Center — very subtle navy */}
      <motion.div
        className="aurora-blob"
        style={{
          width: sizeBase * 0.7,
          height: sizeBase * 0.7,
          top: variant === "hero" ? "5%" : "20%",
          left: "50%",
          translateX: "-50%",
          background: "var(--aurora-3)",
          opacity: opacityScale * 0.7,
        }}
        animate={{
          x: ["-50%", "-42%", "-55%", "-50%"],
          y: [0, 30, 10, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Bottom-left — almost black wash */}
      <motion.div
        className="aurora-blob"
        style={{
          width: sizeBase * 0.9,
          height: sizeBase * 0.9,
          bottom: variant === "hero" ? "-25%" : "-40%",
          left: "10%",
          background: "var(--aurora-4)",
          opacity: opacityScale * 0.8,
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -20, 10, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Bottom-right — black, deeper */}
      <motion.div
        className="aurora-blob"
        style={{
          width: sizeBase * 0.8,
          height: sizeBase * 0.8,
          bottom: variant === "hero" ? "-30%" : "-45%",
          right: "5%",
          background: "var(--aurora-4)",
          opacity: opacityScale * 0.9,
        }}
        animate={{
          x: [0, -30, 20, 0],
          y: [0, -10, 15, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{
          duration: 34,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />
    </div>
  );
}
