"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/content/site";

/**
 * Deterministic SVG "screenshot" for each project — abstract UI mockups tinted
 * by the project's accent color. Avoids broken external image links and keeps
 * the page fast.
 *
 * Each slug produces a slightly different abstract layout (window chrome +
 * gradient hero + content blocks).
 */
const ACCENTS: Record<Project["accent"], { from: string; to: string; glow: string }> = {
  violet: { from: "#7c3aed", to: "#a855f7", glow: "rgba(124,58,237,0.25)" },
  blue: { from: "#3b82f6", to: "#60a5fa", glow: "rgba(59,130,246,0.25)" },
  mixed: { from: "#7c3aed", to: "#3b82f6", glow: "rgba(124,58,237,0.18)" },
};

export function ProjectScreenshot({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const accent = ACCENTS[project.accent];
  // Use slug hash to vary the layout slightly
  const seed = project.slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const variant = seed % 3;

  return (
    <div className={className}>
      <div className="relative h-full w-full overflow-hidden">
        {/* Window chrome */}
        <div className="absolute inset-x-0 top-0 flex h-7 items-center gap-1.5 border-b border-border bg-card/80 px-3 backdrop-blur-sm">
          <div className="h-2 w-2 rounded-full bg-red-500/60" />
          <div className="h-2 w-2 rounded-full bg-amber-500/60" />
          <div className="h-2 w-2 rounded-full bg-emerald-500/60" />
          <div className="ml-3 h-3 flex-1 max-w-[40%] rounded-full bg-secondary/60" />
        </div>

        {/* Content area */}
        <div className="absolute inset-0 top-7 p-4">
          <svg
            viewBox="0 0 200 110"
            className="h-full w-full"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`hero-${project.slug}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={accent.from} stopOpacity="0.5" />
                <stop offset="100%" stopColor={accent.to} stopOpacity="0.15" />
              </linearGradient>
              <radialGradient id={`glow-${project.slug}`} cx="50%" cy="0%" r="80%">
                <stop offset="0%" stopColor={accent.from} stopOpacity="0.4" />
                <stop offset="100%" stopColor={accent.from} stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Background wash */}
            <rect width="200" height="110" fill={`url(#glow-${project.slug})`} />

            {variant === 0 && (
              <>
                {/* Variant A: Hero block + grid */}
                <rect x="12" y="14" width="176" height="34" rx="6" fill={`url(#hero-${project.slug})`} stroke={accent.from} strokeOpacity="0.3" strokeWidth="0.5" />
                <rect x="18" y="20" width="60" height="6" rx="2" fill="#ffffff" opacity="0.85" />
                <rect x="18" y="30" width="90" height="3.5" rx="1.5" fill="#ffffff" opacity="0.35" />
                <rect x="18" y="36" width="70" height="3.5" rx="1.5" fill="#ffffff" opacity="0.25" />

                {[12, 70, 128].map((x, i) => (
                  <g key={i}>
                    <rect x={x} y="56" width="54" height="40" rx="4" fill="#ffffff" opacity="0.04" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="0.4" />
                    <rect x={x + 4} y="62" width="20" height="3" rx="1" fill={accent.from} opacity="0.7" />
                    <rect x={x + 4} y="70" width="40" height="2.4" rx="1" fill="#ffffff" opacity="0.3" />
                    <rect x={x + 4} y="76" width="32" height="2.4" rx="1" fill="#ffffff" opacity="0.2" />
                    <rect x={x + 4} y="86" width="16" height="6" rx="2" fill={accent.to} opacity="0.6" />
                  </g>
                ))}
              </>
            )}

            {variant === 1 && (
              <>
                {/* Variant B: Sidebar + main panel */}
                <rect x="12" y="14" width="36" height="82" rx="4" fill="#ffffff" opacity="0.04" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="0.4" />
                {[20, 26, 32, 38, 44].map((y, i) => (
                  <rect key={i} x="18" y={y} width={i === 0 ? 24 : 20} height="2.4" rx="1" fill={i === 0 ? accent.from : "#ffffff"} opacity={i === 0 ? 0.8 : 0.25} />
                ))}

                <rect x="56" y="14" width="132" height="40" rx="6" fill={`url(#hero-${project.slug})`} stroke={accent.from} strokeOpacity="0.3" strokeWidth="0.5" />
                <rect x="62" y="20" width="50" height="5" rx="2" fill="#ffffff" opacity="0.85" />
                <rect x="62" y="30" width="80" height="3" rx="1" fill="#ffffff" opacity="0.3" />

                <rect x="56" y="60" width="64" height="36" rx="4" fill="#ffffff" opacity="0.04" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="0.4" />
                <rect x="124" y="60" width="64" height="36" rx="4" fill="#ffffff" opacity="0.04" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="0.4" />
                <rect x="60" y="66" width="20" height="3" rx="1" fill={accent.to} opacity="0.7" />
                <rect x="128" y="66" width="20" height="3" rx="1" fill={accent.from} opacity="0.7" />
                <rect x="60" y="74" width="50" height="2.4" rx="1" fill="#ffffff" opacity="0.25" />
                <rect x="128" y="74" width="50" height="2.4" rx="1" fill="#ffffff" opacity="0.25" />
              </>
            )}

            {variant === 2 && (
              <>
                {/* Variant C: Centered hero + flow */}
                <rect x="40" y="14" width="120" height="32" rx="6" fill={`url(#hero-${project.slug})`} stroke={accent.from} strokeOpacity="0.3" strokeWidth="0.5" />
                <rect x="70" y="22" width="60" height="5" rx="2" fill="#ffffff" opacity="0.9" />
                <rect x="60" y="32" width="80" height="3" rx="1" fill="#ffffff" opacity="0.35" />

                {/* Connecting lines */}
                <motion.path
                  d="M 60 60 Q 100 70 60 80"
                  fill="none"
                  stroke={accent.from}
                  strokeWidth="0.6"
                  strokeOpacity="0.5"
                  strokeDasharray="2 2"
                />
                <motion.path
                  d="M 140 60 Q 100 70 140 80"
                  fill="none"
                  stroke={accent.to}
                  strokeWidth="0.6"
                  strokeOpacity="0.5"
                  strokeDasharray="2 2"
                />

                {[60, 100, 140].map((x, i) => (
                  <g key={i}>
                    <rect x={x - 18} y={i === 1 ? 70 : 58} width="36" height="14" rx="3" fill="#ffffff" opacity="0.05" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="0.4" />
                    <circle cx={x} cy={i === 1 ? 77 : 65} r="1.5" fill={i === 1 ? accent.from : accent.to} />
                  </g>
                ))}

                <rect x="60" y="92" width="80" height="3" rx="1" fill="#ffffff" opacity="0.2" />
              </>
            )}
          </svg>
        </div>

        {/* Subtle gradient sheen on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </div>
  );
}
