"use client";

import { motion } from "framer-motion";
import { FlaskConical, Sparkles, Cpu, Mic, FileText, Image as ImageIcon, Lightbulb } from "lucide-react";
import { EXPERIMENTS, type Experiment } from "@/lib/content/site";
import { SectionHeading } from "@/components/site/section-heading";
import { FadeIn, StaggerGroup, staggerItem } from "@/components/site/fade-in";
import { StatusPill } from "@/components/site/tag";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "ai-clone": Sparkles,
  "voice-model": Mic,
  "prompt-engineering": FileText,
  "image-enhancement": ImageIcon,
  "rag-experiments": Cpu,
  "future-ideas": Lightbulb,
};

function ExperimentCard({ experiment }: { experiment: Experiment }) {
  const Icon = ICONS[experiment.slug] ?? FlaskConical;
  const progressColor =
    experiment.status === "shipped"
      ? "from-emerald-500 to-teal-400"
      : experiment.status === "active"
      ? "from-violet-500 to-blue-400"
      : experiment.status === "exploring"
      ? "from-amber-500 to-orange-400"
      : "from-zinc-500 to-zinc-400";

  return (
    <motion.article
      variants={staggerItem}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      className="surface-elevated group relative overflow-hidden p-5 sm:p-6"
    >
      {/* Decorative corner glow */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary/60 text-violet-300">
          <Icon className="h-5 w-5" />
        </div>
        <StatusPill status={experiment.status} />
      </div>

      <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
        {experiment.name}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        {experiment.description}
      </p>

      {/* Progress */}
      <div className="mt-5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-mono text-foreground/80">{experiment.progress}%</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary/80">
          <motion.div
            className={cn("h-full rounded-full bg-gradient-to-r", progressColor)}
            initial={{ width: 0 }}
            whileInView={{ width: `${experiment.progress}%` }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          />
        </div>
      </div>
    </motion.article>
  );
}

export function Lab() {
  return (
    <section id="lab" className="relative scroll-mt-24 py-20 sm:py-28">
      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/4 h-[420px] w-[420px] rounded-full bg-radial-fade blur-3xl opacity-50" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="AI Lab"
          title="A place where I experiment with machine learning, language models, APIs, and new product ideas."
          description="Not every experiment becomes a product. Some are research, some are toys, some teach me something I'll use six months from now. All of them are tracked here."
        />

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERIMENTS.map((exp) => (
            <ExperimentCard key={exp.slug} experiment={exp} />
          ))}
        </StaggerGroup>

        <FadeIn
          delay={0.1}
          className="mt-8 flex items-center gap-3 rounded-2xl border border-border bg-secondary/20 p-4 text-sm text-muted-foreground"
        >
          <FlaskConical className="h-4 w-4 shrink-0 text-violet-400" />
          <span>
            Experiments update in real time as I make progress. The ones marked
            <span className="text-foreground"> Shipped</span> usually become featured projects.
          </span>
        </FadeIn>
      </div>
    </section>
  );
}
