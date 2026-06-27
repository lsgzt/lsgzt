"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/site/animated-counter";
import { FadeIn } from "@/components/site/fade-in";
import { STATS } from "@/lib/content/site";

export function Stats() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="surface-elevated group relative overflow-hidden p-5 sm:p-6"
            >
              {/* Hover wash */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/0 via-violet-500/0 to-blue-500/0 opacity-0 transition-opacity duration-300 group-hover:from-violet-500/[0.06] group-hover:to-blue-500/[0.06] group-hover:opacity-100" />

              <div className="relative">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    <AnimatedCounter value={stat.value} />
                  </span>
                  {stat.suffix ? (
                    <span className="text-xl text-muted-foreground">
                      {stat.suffix}
                    </span>
                  ) : null}
                </div>
                <div className="mt-2 text-sm font-medium text-foreground">
                  {stat.label}
                </div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  {stat.description}
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
