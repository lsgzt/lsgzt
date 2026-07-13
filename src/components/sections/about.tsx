"use client";

import { motion } from "framer-motion";
import { Sparkles, Rocket, BookOpen, Target } from "lucide-react";
import { TIMELINE } from "@/lib/content/site";
import { SectionHeading } from "@/components/site/section-heading";
import { FadeIn } from "@/components/site/fade-in";
import { LiquidGlassCard } from "@/components/illustrations/liquid-glass-card";

const PILLARS = [
  {
    icon: Sparkles,
    title: "Interest in AI",
    description:
      "I treat AI as a building material, not a buzzword. Models are tools — the interesting work is wiring them into products that earn a spot in someone's daily workflow.",
  },
  {
    icon: Rocket,
    title: "Building products",
    description:
      "I ship. A working product beats a perfect prototype. I'd rather launch something rough and iterate against real usage than polish in private forever.",
  },
  {
    icon: BookOpen,
    title: "Learning continuously",
    description:
      "The field moves weekly. I keep a steady cadence of reading, building, and breaking things — most of what I know came from finishing small projects, not courses.",
  },
  {
    icon: Target,
    title: "Solving real problems",
    description:
      "I look for problems people already pay for, hate doing, or do badly. AI is at its best when it removes drudgery from a workflow that already exists.",
  },
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="About"
          title="A short version of a longer story."
          description="The arc, in four points and four milestones."
        />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Liquid glass card */}
          <div className="lg:col-span-5">
            <FadeIn className="relative">
              <LiquidGlassCard />
              {/* Overlay label below the card */}
              <div className="mt-4 flex items-center justify-between rounded-xl border border-border bg-card/70 px-4 py-3 backdrop-blur-md">
                <div>
                  <div className="text-sm font-semibold text-foreground">Lovepreet Singh</div>
                  <div className="text-xs text-muted-foreground">AI Product Builder · LSGZ</div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-700 ring-1 ring-inset ring-emerald-500/25 dark:text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Available
                </span>
              </div>
            </FadeIn>
          </div>

          {/* Pillars + timeline */}
          <div className="lg:col-span-7">
            <FadeIn className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {PILLARS.map((p) => (
                <div
                  key={p.title}
                  className="surface-elevated group p-5 transition-all hover:border-foreground/15 hover:shadow-[var(--card-shadow-hover)]"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary/60 text-violet-600 dark:text-violet-300">
                    <p.icon className="h-4 w-4" />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                </div>
              ))}
            </FadeIn>

            {/* Timeline */}
            <FadeIn delay={0.1} className="mt-10">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Timeline
              </h3>

              <div className="relative mt-6 pl-6">
                {/* Vertical line */}
                <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-violet-500/50 via-blue-500/30 to-transparent" />

                <div className="space-y-7">
                  {TIMELINE.map((item, i) => (
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="relative"
                    >
                      {/* Dot */}
                      <span className="absolute -left-[18px] top-1.5 flex h-3 w-3 items-center justify-center">
                        <span className="absolute h-3 w-3 rounded-full bg-violet-500/20" />
                        <span className="relative h-1.5 w-1.5 rounded-full bg-violet-400" />
                      </span>

                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-xs text-violet-600 dark:text-violet-300">
                          {item.year}
                        </span>
                        <h4 className="text-sm font-semibold text-foreground">
                          {item.title}
                        </h4>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
