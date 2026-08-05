"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Check } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/content/site";
import { SectionHeading } from "@/components/site/section-heading";
import { FadeIn, StaggerGroup, staggerItem } from "@/components/site/fade-in";
import { Tag, StatusPill } from "@/components/site/tag";
import { ProjectScreenshot } from "@/components/illustrations/project-screenshot";
import { cn } from "@/lib/utils";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      variants={staggerItem}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="surface-elevated group relative overflow-hidden"
    >
      {/* Screenshot */}
      <div className="relative aspect-[16/9] overflow-hidden border-b border-border">
        <ProjectScreenshot project={project} className="h-full w-full" />

        {/* Status pill overlay */}
        <div className="absolute right-3 top-3">
          <StatusPill status={project.status} />
        </div>

        {/* Hover overlay actions */}
        <div className="absolute inset-0 flex items-end justify-end gap-2 bg-gradient-to-t from-black/60 via-black/0 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-3.5 text-xs font-medium text-black transition-transform hover:scale-105"
            >
              {project.slug === "pocketdev" ? "View Project" : "Try it"} <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3.5 text-xs font-medium text-white backdrop-blur-sm transition-transform hover:scale-105"
            >
              <Github className="h-3.5 w-3.5" /> Code
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              {project.name}
            </h3>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              {project.tagline}
            </p>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Tag key={tag} tone={project.accent === "blue" ? "blue" : project.accent === "violet" ? "violet" : "default"}>
              {tag}
            </Tag>
          ))}
        </div>

        {/* Stats row (if available) */}
        {project.stats && project.stats.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-4 border-y border-border py-4">
            {project.stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-lg font-semibold tracking-tight text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Detailed heading */}
        <h4 className="mt-6 text-sm font-semibold text-foreground">
          {project.detailedHeading}
        </h4>

        {/* Detailed description */}
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {project.detailedDescription}
        </p>

        {/* What I built list */}
        <div className="mt-6">
          <h5 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            What I built
          </h5>
          <ul className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {project.builtList.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-500 dark:text-violet-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Stack */}
        <div className="mt-6">
          <h5 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            Stack
          </h5>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-secondary/40 px-2 py-0.5 text-xs font-mono text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Quote */}
        <blockquote className="mt-6 border-l-2 border-primary/40 pl-4 text-sm italic text-foreground/80">
          {project.quote}
        </blockquote>

        {/* Footer link row */}
        <div className="mt-6 flex items-center gap-4 border-t border-border pt-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground transition-colors hover:text-violet-600 dark:hover:text-violet-300"
            >
              {project.slug === "pocketdev" ? "View Project" : "Try it"} <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-3.5 w-3.5" /> GitHub
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Products"
          title="Things I've built."
          description="Products people use, experiments that taught me something, and ideas I couldn't resist trying."
        />

        {/* Opening quote */}
        <FadeIn delay={0.05} className="mt-6">
          <blockquote className="border-l-2 border-primary/40 pl-4 text-base italic text-foreground/80">
            I don't build to fill a portfolio. The portfolio exists because I keep building.
          </blockquote>
        </FadeIn>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
