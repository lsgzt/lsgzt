"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Sparkles } from "lucide-react";
import { Button } from "@/components/site/button";
import { AiIllustration } from "@/components/illustrations/ai-illustration";
import { AuroraBackground } from "@/components/site/aurora-background";
import { SITE } from "@/lib/content/site";

export function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-36 md:pt-40 md:pb-28"
    >
      {/* Aurora gradient background — soft drifting color blobs */}
      <AuroraBackground className="!z-0" />

      {/* Subtle grid overlay on top of the aurora */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,#000_30%,transparent_75%)]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 md:grid-cols-12 md:gap-8">
        {/* Left: copy */}
        <div className="md:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Available for AI product work
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="text-gradient">Building AI products</span>
            <br />
            <span className="text-foreground">that people </span>
            <span className="text-gradient-accent">actually use.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {SITE.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button size="lg" onClick={() => scrollTo("projects")}>
              View Projects
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button asChild size="lg" variant="glass">
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
          </motion.div>

          {/* Mini metric strip */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border pt-6"
          >
            {[
              { k: "4+", v: "Live products" },
              { k: "9", v: "AI experiments" },
              { k: "18", v: "Technologies" },
            ].map((m) => (
              <div key={m.v} className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold tracking-tight text-foreground">
                  {m.k}
                </span>
                <span className="text-sm text-muted-foreground">{m.v}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: AI illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative md:col-span-5"
        >
          <div className="relative mx-auto max-w-md md:max-w-none">
            <div className="gradient-border surface-elevated relative overflow-hidden rounded-3xl p-4">
              <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
                <Sparkles className="h-3 w-3 text-violet-500 dark:text-violet-400" />
                Neural Constellation
              </div>
              <AiIllustration className="w-full" />
            </div>

            {/* Floating accent badges */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-3 top-1/3 hidden rounded-2xl border border-border bg-card/80 px-3 py-2 text-xs text-muted-foreground shadow-xl backdrop-blur-md sm:block"
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500 dark:bg-violet-400" />
                <span className="text-foreground/90">Inference live</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -right-3 bottom-1/4 hidden rounded-2xl border border-border bg-card/80 px-3 py-2 text-xs text-muted-foreground shadow-xl backdrop-blur-md sm:block"
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
                <span className="text-foreground/90">Latency 142ms</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
