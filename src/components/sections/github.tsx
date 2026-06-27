"use client";

import { motion } from "framer-motion";
import { Github, Star, GitFork, ArrowUpRight } from "lucide-react";
import { REPOS, SITE } from "@/lib/content/site";
import { SectionHeading } from "@/components/site/section-heading";
import { FadeIn, StaggerGroup, staggerItem } from "@/components/site/fade-in";
import { Button } from "@/components/site/button";
import { cn } from "@/lib/utils";

const LANG_COLOR: Record<string, string> = {
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
  TypeScript: "#3178c6",
};

// Deterministic placeholder contribution graph (52 weeks x 7 days)
function ContributionGraph() {
  const weeks = 52;
  const days = 7;

  // Pre-seed a stable pattern
  const cells = Array.from({ length: weeks * days }, (_, i) => {
    const w = Math.floor(i / days);
    const seed = (i * 9301 + 49297) % 233280;
    const rand = seed / 233280;
    // Lower activity in older weeks, recent surge
    const recencyBoost = w / weeks;
    const v = rand * recencyBoost;
    if (v > 0.85) return 4;
    if (v > 0.65) return 3;
    if (v > 0.45) return 2;
    if (v > 0.25) return 1;
    return 0;
  });

  const LEVELS = [
    "bg-secondary/60",
    "bg-violet-500/30",
    "bg-violet-500/55",
    "bg-violet-500/80",
    "bg-violet-400",
  ];

  return (
    <div className="overflow-x-auto">
      <div
        className="grid gap-[3px]"
        style={{
          gridTemplateColumns: `repeat(${weeks}, 1fr)`,
          gridTemplateRows: `repeat(${days}, 1fr)`,
          gridAutoFlow: "column",
          minWidth: "440px",
        }}
      >
        {cells.map((level, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.25,
              delay: (i / cells.length) * 0.6,
              ease: "easeOut",
            }}
            className={cn("h-2.5 w-2.5 rounded-[2px]", LEVELS[level])}
          />
        ))}
      </div>
    </div>
  );
}

function RepoCard({ repo }: { repo: (typeof REPOS)[number] }) {
  return (
    <motion.a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={staggerItem}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      className="surface-elevated group block p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <Github className="h-4 w-4 shrink-0 text-muted-foreground" />
          <h3 className="truncate text-sm font-semibold text-foreground">
            {repo.name}
          </h3>
        </div>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground/60 transition-all group-hover:text-violet-600 dark:group-hover:text-violet-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>

      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
        {repo.description}
      </p>

      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: LANG_COLOR[repo.language] ?? "#a1a1aa" }}
          />
          {repo.language}
        </span>
        <span className="inline-flex items-center gap-1">
          <Star className="h-3.5 w-3.5" />
          {repo.stars}
        </span>
        <span className="inline-flex items-center gap-1">
          <GitFork className="h-3.5 w-3.5" />
          {repo.forks}
        </span>
      </div>
    </motion.a>
  );
}

export function GitHubSection() {
  return (
    <section id="github" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Open Source"
            title="Activity on GitHub."
            description="A snapshot of recent repositories and a placeholder contribution graph. The real one loads from the GitHub API in production."
            className="md:max-w-2xl"
          />
          <Button asChild variant="glass" size="md" className="shrink-0">
            <a href={SITE.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" /> @{SITE.githubHandle}
            </a>
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Contribution graph */}
          <FadeIn className="lg:col-span-7">
            <div className="surface-elevated p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    Contribution activity
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Last 12 months · 1,248 contributions
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <span>Less</span>
                  {["bg-secondary/60", "bg-violet-500/30", "bg-violet-500/55", "bg-violet-500/80", "bg-violet-400"].map((c, i) => (
                    <span key={i} className={cn("h-2.5 w-2.5 rounded-[2px]", c)} />
                  ))}
                  <span>More</span>
                </div>
              </div>
              <div className="mt-5">
                <ContributionGraph />
              </div>
              <div className="mt-5 grid grid-cols-3 gap-4 border-t border-border pt-5">
                {[
                  { k: "1,248", v: "Contributions" },
                  { k: "23", v: "Public repos" },
                  { k: "12", v: "Followers" },
                ].map((s) => (
                  <div key={s.v}>
                    <div className="text-xl font-semibold tracking-tight text-foreground">
                      {s.k}
                    </div>
                    <div className="text-xs text-muted-foreground">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Repos */}
          <div className="lg:col-span-5">
            <StaggerGroup className="grid grid-cols-1 gap-3">
              {REPOS.map((repo) => (
                <RepoCard key={repo.name} repo={repo} />
              ))}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
