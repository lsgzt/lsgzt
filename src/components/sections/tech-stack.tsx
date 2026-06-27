"use client";

import { motion } from "framer-motion";
import { SKILLS, type Skill } from "@/lib/content/site";
import { SectionHeading } from "@/components/site/section-heading";
import { StaggerGroup, staggerItem } from "@/components/site/fade-in";
import { cn } from "@/lib/utils";

const CATEGORY_ORDER: Skill["category"][] = [
  "Language",
  "Frontend",
  "Backend",
  "AI / ML",
  "Infra",
  "Tooling",
];

const CATEGORY_TONE: Record<Skill["category"], string> = {
  Language: "hover:border-violet-500/40 hover:text-violet-200 hover:bg-violet-500/[0.06]",
  Frontend: "hover:border-blue-500/40 hover:text-blue-200 hover:bg-blue-500/[0.06]",
  Backend: "hover:border-emerald-500/40 hover:text-emerald-200 hover:bg-emerald-500/[0.06]",
  "AI / ML": "hover:border-fuchsia-500/40 hover:text-fuchsia-200 hover:bg-fuchsia-500/[0.06]",
  Infra: "hover:border-amber-500/40 hover:text-amber-200 hover:bg-amber-500/[0.06]",
  Tooling: "hover:border-zinc-400/40 hover:text-zinc-100 hover:bg-zinc-400/[0.06]",
};

function Chip({ skill }: { skill: Skill }) {
  return (
    <motion.button
      variants={staggerItem}
      whileHover={{ y: -2, scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 450, damping: 22 }}
      className={cn(
        "gpu inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors duration-300",
        CATEGORY_TONE[skill.category]
      )}
      type="button"
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{
          background:
            skill.category === "Language"
              ? "#a78bfa"
              : skill.category === "Frontend"
              ? "#60a5fa"
              : skill.category === "Backend"
              ? "#34d399"
              : skill.category === "AI / ML"
              ? "#f0abfc"
              : skill.category === "Infra"
              ? "#fbbf24"
              : "#d4d4d8",
        }}
      />
      {skill.name}
    </motion.button>
  );
}

export function TechStack() {
  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    items: SKILLS.filter((s) => s.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <section id="stack" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Tools I reach for first."
          description="The stack changes as the field does. These are the tools I've shipped with recently — grouped by what they're actually for."
        />

        <div className="mt-12 space-y-8">
          {grouped.map((group, gi) => (
            <div key={group.category}>
              <div className="mb-3 flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {group.category}
                </span>
                <span className="h-px flex-1 bg-border" />
                <span className="font-mono text-[10px] text-muted-foreground/60">
                  {String(gi + 1).padStart(2, "0")} / {String(grouped.length).padStart(2, "0")}
                </span>
              </div>
              <StaggerGroup
                stagger={0.04}
                className="flex flex-wrap gap-2"
              >
                {group.items.map((skill) => (
                  <Chip key={skill.name} skill={skill} />
                ))}
              </StaggerGroup>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
