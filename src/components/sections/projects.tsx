"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/content/site";
import { SectionHeading } from "@/components/site/section-heading";
import { FadeIn, StaggerGroup, staggerItem } from "@/components/site/fade-in";
import { Tag, StatusPill } from "@/components/site/tag";
import { ProjectScreenshot } from "@/components/illustrations/project-screenshot";
import { cn } from "@/lib/utils";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isPlaceholder = project.slug.startsWith("future-");

  return (
    <motion.article
      variants={staggerItem}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className={cn(
        "surface-elevated group relative flex flex-col overflow-hidden",
        isPlaceholder && "border-dashed"
      )}
    >
      {/* Screenshot */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
        <ProjectScreenshot project={project} className="h-full w-full" />

        {/* Status pill overlay */}
        <div className="absolute right-3 top-3">
          <StatusPill status={project.status} />
        </div>

        {/* Hover overlay actions */}
        {!isPlaceholder && (
          <div className="absolute inset-0 flex items-end justify-end gap-2 bg-gradient-to-t from-black/60 via-black/0 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-3.5 text-xs font-medium text-black transition-transform hover:scale-105"
              >
                Live Demo <ArrowUpRight className="h-3.5 w-3.5" />
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
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {project.name}
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {project.tagline}
            </p>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Tag key={tag} tone={project.accent === "blue" ? "blue" : project.accent === "violet" ? "violet" : "default"}>
              {tag}
            </Tag>
          ))}
        </div>

        {/* Footer link row */}
        {!isPlaceholder && (
          <div className="mt-5 flex items-center gap-4 border-t border-border pt-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground transition-colors hover:text-violet-600 dark:hover:text-violet-300"
              >
                Live Demo <ArrowUpRight className="h-3.5 w-3.5" />
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
        )}
      </div>
    </motion.article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Featured Work"
          title="Products I've shipped, not just demos."
          description="A selection of AI products and tools I've built and deployed. Each one is live and serving real users — no vaporware."
        />

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </StaggerGroup>

        <FadeIn
          delay={0.1}
          className="mt-10 flex flex-col items-start gap-3 rounded-2xl border border-dashed border-border bg-secondary/20 p-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              More projects on GitHub
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Smaller experiments, demos, and work-in-progress live in my repositories.
            </p>
          </div>
          <a
            href="https://github.com/lsgzt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-medium text-foreground transition-colors hover:border-foreground/20 hover:bg-secondary/60"
          >
            <Github className="h-4 w-4" /> View all repositories
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
