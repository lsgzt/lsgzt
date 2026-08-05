"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check, FlaskConical } from "lucide-react";
import { EXPERIMENTS, type Experiment } from "@/lib/content/site";
import { SectionHeading } from "@/components/site/section-heading";
import { FadeIn, StaggerGroup, staggerItem } from "@/components/site/fade-in";
import { StatusPill, Tag } from "@/components/site/tag";
import { cn } from "@/lib/utils";

const progressColor = (status: string) =>
  status === "shipped"
    ? "from-emerald-500 to-teal-400"
    : status === "active"
    ? "from-violet-500 to-blue-400"
    : status === "exploring"
    ? "from-amber-500 to-orange-400"
    : status === "archived"
    ? "from-red-500 to-red-400"
    : "from-zinc-500 to-zinc-400";

// Detailed experiment card (for Experiments group)
function ExperimentCard({ experiment }: { experiment: Experiment }) {
  return (
    <motion.article
      variants={staggerItem}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="surface-elevated group relative overflow-hidden p-6 sm:p-8"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            {experiment.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            {experiment.tagline}
          </p>
        </div>
        <StatusPill status={experiment.status} />
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {experiment.longDescription}
      </p>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {experiment.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      {/* Explored list */}
      {experiment.exploredList && experiment.exploredList.length > 0 && (
        <div className="mt-6">
          <h5 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            Explored
          </h5>
          <ul className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {experiment.exploredList.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-500 dark:text-violet-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Quote */}
      {experiment.quote && (
        <blockquote className="mt-6 border-l-2 border-primary/40 pl-4 text-sm italic text-foreground/80">
          {experiment.quote}
        </blockquote>
      )}

      {/* Link */}
      {experiment.link && (
        <div className="mt-6 border-t border-border pt-4">
          <a
            href={experiment.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground transition-colors hover:text-violet-600 dark:hover:text-violet-300"
          >
            {experiment.linkLabel || "View"} <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      )}
    </motion.article>
  );
}

// Compact lab card (for Lab group)
function LabCard({ experiment }: { experiment: Experiment }) {
  return (
    <motion.article
      variants={staggerItem}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="surface-elevated group relative overflow-hidden p-5 sm:p-6"
    >
      <div className="flex items-start justify-between">
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          {experiment.name}
        </h3>
        <StatusPill status={experiment.status} />
      </div>

      <p className="mt-1.5 text-sm font-medium text-muted-foreground">
        {experiment.tagline}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {experiment.description}
      </p>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {experiment.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      {/* Progress */}
      {experiment.status !== "archived" && (
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-mono text-foreground/80">{experiment.progress}%</span>
          </div>
          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-secondary/80">
            <motion.div
              className={cn("h-full rounded-full bg-gradient-to-r", progressColor(experiment.status))}
              initial={{ width: 0 }}
              whileInView={{ width: `${experiment.progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            />
          </div>
        </div>
      )}
    </motion.article>
  );
}

export function Lab() {
  const experiments = EXPERIMENTS.filter((e) => e.category === "experiment");
  const labItems = EXPERIMENTS.filter((e) => e.category === "lab");

  return (
    <section id="lab" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/4 h-[420px] w-[420px] rounded-full bg-radial-fade blur-3xl opacity-50" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Experiments & Lab"
          title="Not everything needs to become a product."
          description="Some things I build simply because I want to know what happens when I try. These aren't failed products — they're things I built because I wanted to understand something."
        />

        {/* Experiments (detailed) */}
        {experiments.length > 0 && (
          <>
            <FadeIn className="mt-12 mb-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Experiments
              </h3>
            </FadeIn>
            <StaggerGroup className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {experiments.map((exp) => (
                <ExperimentCard key={exp.slug} experiment={exp} />
              ))}
            </StaggerGroup>
          </>
        )}

        {/* Lab (compact) */}
        {labItems.length > 0 && (
          <>
            <FadeIn className="mt-16 mb-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Lab
              </h3>
            </FadeIn>
            <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {labItems.map((exp) => (
                <LabCard key={exp.slug} experiment={exp} />
              ))}
            </StaggerGroup>
          </>
        )}

        {/* This website card */}
        <FadeIn
          delay={0.1}
          className="mt-12 rounded-2xl border border-border bg-gradient-to-br from-violet-500/[0.05] to-blue-500/[0.05] p-6 sm:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                And this website?
              </h3>
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                That's a project too.
              </p>
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-violet-500 dark:text-violet-400">
              LSGZ.dev
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">The website behind the builder.</strong>{" "}
            My personal corner of the internet—a custom-designed home for the products I ship,
            experiments I try, and things I learn along the way.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            <em>This website wasn't generated from a template or created from one giant prompt.</em>{" "}
            It evolved section by section through dozens of iterations. I used different AI systems
            throughout the process for ideation, code, debugging, critique, and refinement—then
            brought those pieces together into one coherent product. And much of that process
            happened from an Android phone.
          </p>
          <div className="mt-5 border-t border-border pt-4">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("about");
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top, behavior: "smooth" });
                }
              }}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground transition-colors hover:text-violet-600 dark:hover:text-violet-300"
            >
              Read My Story <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </FadeIn>

        <FadeIn
          delay={0.1}
          className="mt-8 flex items-center gap-3 rounded-2xl border border-border bg-secondary/20 p-4 text-sm text-muted-foreground"
        >
          <FlaskConical className="h-4 w-4 shrink-0 text-violet-600 dark:text-violet-400" />
          <span>
            A portfolio where apparently every idea became an amazing successful product feels fake.
            <span className="text-foreground"> "I built it. It wasn't reliable enough. I archived it."</span> shows judgment.
          </span>
        </FadeIn>
      </div>
    </section>
  );
}
