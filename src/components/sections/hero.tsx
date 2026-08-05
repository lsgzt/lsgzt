"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/site/button";
import { AuroraBackground } from "@/components/site/aurora-background";
import { CurvyL } from "@/components/illustrations/curvy-l";
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

      {/* Animated cursive L — draws on load, then dissolves into the aurora
          and stays as a very faint background element. */}
      <CurvyL className="!z-[1] opacity-100" />

      {/* Subtle grid overlay on top of the aurora */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,#000_30%,transparent_75%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Centered hero — no illustration on the right anymore */}
        <div className="mx-auto max-w-3xl text-center">
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
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {SITE.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
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
        </div>

        {/* Mini metric strip — full width below */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-border pt-6"
        >
          {[
            { k: "1000+", v: "Users served" },
            { k: "3", v: "Products shipped" },
            { k: "7", v: "AI experiments" },
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
    </section>
  );
}
