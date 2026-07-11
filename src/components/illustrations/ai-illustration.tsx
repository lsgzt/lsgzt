"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * Abstract AI illustration: a constellation of nodes connected by gradient
 * lines, with a few "data pulses" slowly traveling along the edges.
 *
 * Deliberately NOT a robot, NOT a brain, NOT a terminal. Just elegant
 * geometry that reads as "neural / networked / intelligent" at a glance.
 *
 * All nodes are deterministic (seeded) so the layout is stable across renders.
 */
type Node = { id: number; x: number; y: number; r: number; depth: number };

const NODES: Node[] = [
  { id: 0, x: 50, y: 50, r: 6, depth: 0 },
  { id: 1, x: 22, y: 28, r: 4, depth: 1 },
  { id: 2, x: 78, y: 22, r: 4.5, depth: 1 },
  { id: 3, x: 84, y: 64, r: 3.5, depth: 1 },
  { id: 4, x: 30, y: 76, r: 4, depth: 1 },
  { id: 5, x: 14, y: 54, r: 3, depth: 2 },
  { id: 6, x: 62, y: 14, r: 3, depth: 2 },
  { id: 7, x: 90, y: 42, r: 2.8, depth: 2 },
  { id: 8, x: 52, y: 86, r: 3.2, depth: 2 },
  { id: 9, x: 38, y: 18, r: 2.6, depth: 2 },
  { id: 10, x: 68, y: 88, r: 2.6, depth: 2 },
  { id: 11, x: 18, y: 88, r: 2.4, depth: 2 },
  { id: 12, x: 92, y: 80, r: 2.4, depth: 2 },
  { id: 13, x: 6, y: 36, r: 2.2, depth: 2 },
  { id: 14, x: 44, y: 60, r: 2.8, depth: 2 },
];

// Pairs of node ids that should be connected by an edge.
const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4],
  [1, 5], [1, 9], [1, 6],
  [2, 6], [2, 7],
  [3, 7], [3, 12], [3, 8],
  [4, 8], [4, 5], [4, 11],
  [5, 13], [6, 9], [7, 14],
  [8, 10], [0, 14], [2, 9],
];

const PULSE_EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [1, 6], [3, 12],
];

export function AiIllustration({ className }: { className?: string }) {
  // Pre-compute the path d attribute for each edge
  const edges = useMemo(
    () =>
      EDGES.map(([a, b]) => {
        const na = NODES[a];
        const nb = NODES[b];
        return {
          a, b,
          d: `M ${na.x} ${na.y} L ${nb.x} ${nb.y}`,
          length: Math.hypot(nb.x - na.x, nb.y - na.y),
        };
      }),
    []
  );

  return (
    <div className={className}>
      <div className="relative aspect-square w-full">
        {/* Ambient gradient halo behind the constellation */}
        <div className="absolute inset-[8%] rounded-full bg-radial-fade blur-2xl" />
        <div className="absolute inset-[20%] rounded-full bg-radial-blue blur-3xl opacity-60" />

        <svg
          viewBox="0 0 100 100"
          className="relative h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.1" />
            </linearGradient>

            <radialGradient id="node-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.8" />
            </radialGradient>

            <radialGradient id="node-core-blue" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#dbeafe" stopOpacity="1" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.8" />
            </radialGradient>

            <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="node-glow-blue" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Edges */}
          <g>
            {edges.map((edge, i) => (
              <path
                key={`edge-${i}`}
                d={edge.d}
                stroke="url(#edge-gradient)"
                strokeWidth={0.35}
                fill="none"
                strokeLinecap="round"
                opacity={0.7}
              />
            ))}
          </g>

          {/* Flowing pulse dashes on select edges */}
          <g>
            {PULSE_EDGES.map(([a, b], i) => {
              const na = NODES[a];
              const nb = NODES[b];
              return (
                <motion.line
                  key={`pulse-${i}`}
                  x1={na.x}
                  y1={na.y}
                  x2={nb.x}
                  y2={nb.y}
                  stroke="#c4b5fd"
                  strokeWidth={0.5}
                  strokeLinecap="round"
                  strokeDasharray="2 14"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: [-16, 0] }}
                  transition={{
                    duration: 4 + (i % 3),
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  opacity={0.8}
                />
              );
            })}
          </g>

          {/* Nodes */}
          <g>
            {NODES.map((node) => {
              const isCenter = node.depth === 0;
              const isInner = node.depth === 1;
              const isBlue = node.id % 3 === 1 && !isCenter;
              const glowId = isBlue ? "node-glow-blue" : "node-glow";
              const coreId = isBlue ? "node-core-blue" : "node-core";

              return (
                <motion.g
                  key={node.id}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.15 * node.depth + node.id * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* Soft outer glow */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.r * 2.6}
                    fill={`url(#${glowId})`}
                  />

                  {/* Pulsing ring on the center node only */}
                  {isCenter && (
                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      r={node.r + 2}
                      fill="none"
                      stroke="#7c3aed"
                      strokeWidth={0.3}
                      initial={{ opacity: 0.6, scale: 1 }}
                      animate={{ opacity: 0, scale: 2.6 }}
                      transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                      style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                    />
                  )}

                  {/* Core dot */}
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={node.r}
                    fill={`url(#${coreId})`}
                    animate={{
                      opacity: isInner ? [0.85, 1, 0.85] : [0.6, 0.85, 0.6],
                    }}
                    transition={{
                      duration: 3.5 + (node.id % 4),
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Hairline ring on inner ring nodes */}
                  {(isCenter || isInner) && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.r + 1.2}
                      fill="none"
                      stroke="#ffffff"
                      strokeOpacity={isCenter ? 0.4 : 0.15}
                      strokeWidth={0.2}
                    />
                  )}
                </motion.g>
              );
            })}
          </g>

          {/* Floating accent dots for atmosphere */}
          <g>
            {[
              { x: 8, y: 12, r: 0.6 },
              { x: 94, y: 14, r: 0.5 },
              { x: 12, y: 70, r: 0.4 },
              { x: 88, y: 88, r: 0.5 },
              { x: 50, y: 6, r: 0.4 },
              { x: 6, y: 50, r: 0.5 },
            ].map((dot, i) => (
              <motion.circle
                key={`dust-${i}`}
                cx={dot.x}
                cy={dot.y}
                r={dot.r}
                fill="#ffffff"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.1, 0.5, 0.1] }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
