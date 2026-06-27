"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Aurora gradient background — soft drifting color blobs that sit behind
 * the hero. Colors come from the --aurora-* CSS variables so the same
 * component works for both the Apple-light and Vercel-dark themes.
 *
 * Purely decorative — pointer-events:none and aria-hidden.
 */
type AuroraBackgroundProps = {
  className?: string;
  /** Tighten the blobs into a smaller area (used for non-hero placements) */
  compact?: boolean;
};

export function AuroraBackground({
  className,
  compact = false,
}: AuroraBackgroundProps) {
  const sizeBase = compact ? 320 : 520;

  return (
    <div
      className={cn("aurora", className)}
      aria-hidden="true"
    >
      {/* Pink / violet blob — top left */}
      <motion.div
        className="aurora-blob"
        style={{
          width: sizeBase,
          height: sizeBase,
          top: compact ? "-10%" : "-15%",
          left: "-5%",
          background: "var(--aurora-1)",
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, 40, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blue blob — top right */}
      <motion.div
        className="aurora-blob"
        style={{
          width: sizeBase * 0.85,
          height: sizeBase * 0.85,
          top: compact ? "-5%" : "-10%",
          right: "-5%",
          background: "var(--aurora-2)",
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, 60, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Indigo / lavender blob — center */}
      <motion.div
        className="aurora-blob"
        style={{
          width: sizeBase * 0.75,
          height: sizeBase * 0.75,
          top: compact ? "10%" : "5%",
          left: "50%",
          translateX: "-50%",
          background: "var(--aurora-3)",
        }}
        animate={{
          x: ["-50%", "-40%", "-55%", "-50%"],
          y: [0, 30, 10, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Soft wash blob — bottom center */}
      <motion.div
        className="aurora-blob"
        style={{
          width: sizeBase * 0.9,
          height: sizeBase * 0.9,
          bottom: compact ? "-20%" : "-25%",
          left: "30%",
          background: "var(--aurora-4)",
          opacity: 0.7,
        }}
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -20, 10, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
}
