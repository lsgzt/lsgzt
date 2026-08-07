"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  Smartphone,
  Terminal,
  CloudCog,
  Bot,
  Send,
  Image as ImageIcon,
  Users,
  Sparkles,
  Mic2,
  Brain,
  Tv,
  Code2,
  RefreshCw,
  PenTool,
  Globe,
  ArrowRight,
  Compass,
} from "lucide-react";
import { AuroraBackground } from "@/components/site/aurora-background";
import { CurvyL } from "@/components/illustrations/curvy-l";
import { FadeIn } from "@/components/site/fade-in";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { Button } from "@/components/site/button";
import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
   Story sections (titles match the `---` breaks in myStory.txt).
   Every word of the original story is preserved verbatim in the
   body of each section — we only wrap it and add visuals around
   the edges, never inside a paragraph.
   ───────────────────────────────────────────────────────────── */

type Section = {
  id: string;
  chapter: string;
  kicker: string;
  title?: string;
  visual?: React.ReactNode;
  paragraphs: (string | React.ReactNode)[];
};

/* ── Reusable visual primitives ──────────────────────────── */

/**
 * Inline link used for product / experiment names inside body copy.
 * Opens in a new tab, shows a subtle accent color, and a tiny arrow
 * so readers know it leads off the page. Never alters the wrapped text.
 */
const PRODUCTS = {
  EnhanceIt: "https://enhanceit.onrender.com",
  "image enhancer": "https://enhanceit.onrender.com",
  StreamPoint: "https://streampoint.pages.dev",
  PocketDev: "https://github.com/lsgzt/pocket-codex",
  "LSGZ Personality Clone": "https://huggingface.co/lsgz/lsgz-personality-clone",
} as const;

function P({ name, href }: { name: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-baseline gap-0.5 font-medium text-violet-600 underline decoration-violet-500/30 underline-offset-[3px] transition-colors hover:text-violet-500 hover:decoration-violet-500 dark:text-violet-300 dark:hover:text-violet-200"
    >
      <span>{name}</span>
      <ArrowUpRight className="mb-0.5 inline h-3 w-3 -translate-y-px opacity-60 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
    </a>
  );
}

function Tag({ children, accent = "violet" }: { children: React.ReactNode; accent?: "violet" | "blue" | "mixed" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm",
        accent === "violet" && "text-violet-600 dark:text-violet-300",
        accent === "blue" && "text-blue-600 dark:text-blue-300",
        accent === "mixed" && "text-gradient-accent"
      )}
    >
      {children}
    </span>
  );
}

function ChipRow({ items }: { items: { label: string; icon?: React.ReactNode; accent?: "violet" | "blue" }[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it, i) => (
        <motion.span
          key={it.label}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
            "border-border bg-card text-foreground shadow-sm"
          )}
        >
          {it.icon}
          {it.label}
        </motion.span>
      ))}
    </div>
  );
}

/* ── Individual visual cards ─────────────────────────────── */

function PhoneStartVisual() {
  return (
    <div className="relative mx-auto my-10 w-full max-w-md">
      <div className="surface-elevated gradient-border p-6 sm:p-8">
        <div className="flex items-center justify-center gap-6">
          {/* Phone mockup */}
          <motion.div
            initial={{ rotate: -6, y: 10, opacity: 0 }}
            whileInView={{ rotate: -6, y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-40 w-24 shrink-0 rounded-[1.2rem] border-[3px] border-foreground/80 bg-background dark:border-foreground/90"
          >
            <div className="absolute left-1/2 top-1.5 h-1 w-8 -translate-x-1/2 rounded-full bg-foreground/20" />
            <div className="mx-2 mt-4 flex h-[108px] flex-col gap-1 rounded-md bg-gradient-to-br from-violet-500/15 via-blue-500/10 to-transparent p-1.5">
              <div className="h-1.5 w-3/4 rounded-sm bg-foreground/50" />
              <div className="h-1 w-1/2 rounded-sm bg-foreground/30" />
              <div className="mt-1 h-1 w-full rounded-sm bg-foreground/20" />
              <div className="h-1 w-5/6 rounded-sm bg-foreground/20" />
              <div className="h-1 w-2/3 rounded-sm bg-foreground/20" />
              <div className="mt-auto flex items-center justify-center gap-1 text-[7px] font-bold text-violet-500">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-500" />
                <span>&lt;/&gt; HTML</span>
              </div>
            </div>
          </motion.div>

          {/* Floating tags */}
          <div className="flex flex-col gap-2">
            {[
              { txt: "<html>", c: "text-violet-500" },
              { txt: "<p>hello</p>", c: "text-blue-500" },
              { txt: "hosted online", c: "text-emerald-500" },
            ].map((t, i) => (
              <motion.div
                key={t.txt}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={cn("font-mono text-lg font-semibold sm:text-xl", t.c)}
              >
                {t.txt}
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-1 text-2xl"
              aria-hidden
            >
              🌐
            </motion.div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 text-center text-xs text-muted-foreground"
        >
          A phone, some HTML, and a question — <em>what else could I build?</em>
        </motion.p>
      </div>
    </div>
  );
}

function WorkaroundToolsVisual() {
  const tools = [
    { label: "Termux", icon: <Terminal className="h-3.5 w-3.5" />, accent: "violet" as const },
    { label: "Google Colab", icon: <CloudCog className="h-3.5 w-3.5" />, accent: "blue" as const },
    { label: "Kaggle", icon: <Sparkles className="h-3.5 w-3.5" />, accent: "violet" as const },
    { label: "AI Agents", icon: <Bot className="h-3.5 w-3.5" />, accent: "blue" as const },
    { label: "GitHub Actions", icon: <RefreshCw className="h-3.5 w-3.5" />, accent: "violet" as const },
  ];
  return (
    <div className="my-10">
      <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        When the phone couldn't do it — I found a workaround
      </p>
      <div className="surface p-5">
        <ChipRow items={tools} />
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">No ideal dev environment?</span> I built my own, one
          internet service at a time.
        </p>
      </div>
    </div>
  );
}

function ChatbotVisual() {
  return (
    <div className="relative mx-auto my-10 w-full max-w-md">
      <div className="surface-elevated p-5">
        <div className="mb-3 flex items-center gap-2 border-b border-border pb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/15 text-violet-500">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold">Groq Chatbot</p>
            <p className="text-[11px] text-muted-foreground">teaching an API to remember</p>
          </div>
          <span className="ml-auto flex h-2 w-2 rounded-full bg-emerald-500" />
        </div>

        <div className="space-y-2.5">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="max-w-[80%] rounded-2xl rounded-br-sm bg-secondary px-3 py-2 text-sm"
          >
            Hi! Remember when I told you about my project?
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="ml-auto max-w-[80%] rounded-2xl rounded-bl-sm bg-violet-500 px-3 py-2 text-sm text-white"
          >
            I'm sorry — I don't have memory of previous turns.
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="max-w-[85%] rounded-2xl rounded-br-sm bg-secondary px-3 py-2 text-xs font-mono text-muted-foreground"
          >
            <span className="text-violet-500">// build the memory layer myself</span>
            <br />
            messages.append(&#123;role: "user", content&#125;)
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="ml-auto flex max-w-[80%] items-center gap-1.5 rounded-2xl rounded-bl-sm bg-violet-500 px-3 py-2 text-sm text-white"
          >
            <Send className="h-3 w-3" /> Telegram?
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function DreamKiaVisual() {
  return (
    <div className="relative mx-auto my-10 w-full max-w-lg">
      <div className="surface-elevated overflow-hidden rounded-3xl p-2">
        <img src="/dreamkia_visual.png" alt="DreamKia" className="w-full rounded-2xl object-cover shadow-lg" />
        <div className="mt-3 px-1 flex items-center justify-between">
          <p className="text-xs font-mono text-muted-foreground">system prompt → SDXL → context → image</p>
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function PipelineVisual() {
  const steps = ["Upload", "Enhance", "Remove BG", "White", "Print Sheet"];
  return (
    <div className="my-10">
      <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        The passport-photo pipeline
      </p>
      <div className="surface p-5">
        <div className="flex flex-wrap items-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.09 }}
                className={cn(
                  "rounded-lg px-3 py-2 text-xs font-semibold",
                  i === steps.length - 1
                    ? "bg-gradient-to-r from-violet-500 to-blue-500 text-white"
                    : "bg-secondary text-foreground"
                )}
              >
                {s}
              </motion.div>
              {i < steps.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />}
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Dad's shop used an AI tool that became paid — so I built the pipeline instead.
        </p>
      </div>
    </div>
  );
}

function GrowthVisual() {
  // A simple SVG sparkline growing from flat to 1000+
  const points = [0, 2, 5, 8, 14, 22, 34, 55, 82, 130, 220, 340, 480, 640, 820, 1000];
  const max = 1000;
  const w = 360;
  const h = 120;
  const step = w / (points.length - 1);
  const path = points
    .map((v, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - (v / max) * h}`)
    .join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  return (
    <div className="mx-auto my-10 w-full max-w-md">
      <div className="surface-elevated p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-violet-500" />
            <span className="text-sm font-semibold">Telegram Bot Users</span>
          </div>
          <span className="text-gradient-accent text-sm font-bold">1000+</span>
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} className="h-28 w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={area}
            fill="url(#grad)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
          <motion.path
            d={path}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>No ads</span>
          <span>No launch</span>
          <span>Just… people</span>
        </div>
      </div>
    </div>
  );
}

function EvolutionVisual() {
  return (
    <div className="my-10 flex items-center justify-center">
      <div className="surface-elevated inline-flex flex-wrap items-center gap-3 px-5 py-4">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1 text-xs font-mono">
          dad's problem
        </span>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
        <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1 text-xs font-mono">
          Telegram bot
        </span>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
        <span className="inline-flex items-center gap-1.5 rounded-md bg-gradient-to-r from-violet-500/20 to-blue-500/20 px-2.5 py-1 text-xs font-semibold text-gradient-accent">
          public web tool
        </span>
      </div>
    </div>
  );
}

function VoiceVisual() {
  return (
    <div className="mx-auto my-10 w-full max-w-sm">
      <div className="surface p-5">
        <div className="mb-3 flex items-center gap-2">
          <Mic2 className="h-4 w-4 text-violet-500" />
          <span className="text-sm font-semibold">Voice conversion experiments</span>
        </div>
        <div className="flex h-16 items-center justify-center gap-[3px]">
          {Array.from({ length: 42 }).map((_, i) => {
            const h = 10 + Math.abs(Math.sin(i * 0.6)) * 48;
            return (
              <motion.span
                key={i}
                initial={{ scaleY: 0.2 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.015,
                  repeat: Infinity,
                  repeatType: "mirror",
                  repeatDelay: 1.2,
                }}
                className={cn(
                  "w-[3px] rounded-full origin-center",
                  i % 2 === 0 ? "bg-violet-500" : "bg-blue-500"
                )}
                style={{ height: `${h}px` }}
              />
            );
          })}
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">Not useful. Extremely fun.</p>
      </div>
    </div>
  );
}

function BrainVisual() {
  return (
    <div className="mx-auto my-10 w-full max-w-sm">
      <div className="surface-elevated gradient-border p-6">
        <div className="flex items-center justify-center gap-5">
          <motion.div
            initial={{ rotate: -8, opacity: 0 }}
            whileInView={{ rotate: -8, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary text-4xl"
          >
            🧑
          </motion.div>
          <Brain className="h-6 w-6 text-violet-500" />
          <motion.div
            initial={{ rotate: 8, opacity: 0 }}
            whileInView={{ rotate: 8, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-500"
          >
            <Bot className="h-8 w-8" />
          </motion.div>
        </div>
        <div className="mt-4 text-center">
          <p className="font-mono text-xs text-muted-foreground">collect conversations → train model → publish on 🤗</p>
        </div>
      </div>
    </div>
  );
}

function StreamPointVisual() {
  return (
    <div className="my-10 grid gap-4 sm:grid-cols-[auto,1fr]">
      {/* TV remote */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto flex h-40 w-16 flex-col items-center gap-1.5 rounded-2xl border-[3px] border-foreground/80 bg-background p-2 dark:border-foreground/90"
      >
        <div className="mt-1 h-1.5 w-6 rounded-full bg-red-500/80" />
        <div className="mt-1 grid grid-cols-3 gap-1">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-foreground/20" />
          ))}
        </div>
        <div className="mt-1 h-6 w-10 rounded-md bg-foreground/10" />
        <div className="mt-auto mb-1 flex h-2 w-8 items-center justify-center rounded-full bg-foreground/10 text-[6px] font-bold text-foreground/40">
          OK
        </div>
      </motion.div>

      <div className="surface flex flex-col justify-center p-5">
        <div className="mb-3 flex items-center gap-2">
          <Tv className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-semibold">StreamPoint</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Typing URLs with a TV remote was miserable. So instead of continuing to type them…
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {["Movies", "Anime", "Series", "Action", "Comedy", "More →"].map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={cn(
                "rounded-md border border-border px-2 py-1.5 text-center text-xs font-medium",
                c === "More →" && "bg-violet-500 text-white border-violet-500"
              )}
            >
              {c}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PocketDevVisual() {
  return (
    <div className="relative mx-auto my-10 w-full max-w-md">
      <div className="surface-elevated gradient-border p-5">
        <div className="flex items-start gap-4">
          {/* Phone with code */}
          <motion.div
            initial={{ rotate: -4, opacity: 0, y: 10 }}
            whileInView={{ rotate: -4, opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-52 w-28 shrink-0 rounded-[1.2rem] border-[3px] border-foreground/80 bg-background p-2 dark:border-foreground/90"
          >
            <div className="absolute left-1/2 top-1.5 h-1 w-6 -translate-x-1/2 rounded-full bg-foreground/20" />
            <div className="mt-3 h-[168px] space-y-1.5 overflow-hidden rounded-md bg-[#0b0b10] p-2 font-mono text-[7px] leading-tight">
              <div><span className="text-pink-400">const</span> <span className="text-sky-300">fixBug</span> = <span className="text-pink-400">async</span> () =&gt; &#123;</div>
              <div className="pl-2"><span className="text-pink-400">const</span> err = <span className="text-amber-300">await</span> run()</div>
              <div className="pl-2"><span className="text-muted-foreground/60">// AI suggests</span></div>
              <div className="pl-2 text-violet-300/90">  <span className="line-through">console.log(err)</span></div>
              <div className="pl-2 text-emerald-300">+ return handle(err)</div>
              <div>&#125;</div>
              <div className="mt-1 h-px bg-white/10" />
              <div className="text-muted-foreground">swipe → accept</div>
            </div>
          </motion.div>

          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center gap-2">
              <Code2 className="h-4 w-4 text-violet-500" />
              <p className="text-sm font-semibold">PocketDev</p>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              AI integrated directly into the editor — not bolted on as a separate chat.
            </p>
            <ul className="mt-3 space-y-1.5 text-xs">
              {[
                "Smart next-line suggestions",
                "Swipe right to accept",
                "Partial swipe = one line only",
                "Auto-debug → rerun loop",
              ].map((f, i) => (
                <motion.li
                  key={f}
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.07 }}
                  className="flex items-center gap-2"
                >
                  <span className="inline-block h-1 w-1 rounded-full bg-violet-500" />
                  <span>{f}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function BuildCycleVisual() {
  const steps = ["change", "push", "compile (CI)", "install", "inspect"];
  return (
    <div className="my-10">
      <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        The PocketDev development loop
      </p>
      <div className="surface p-5">
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className={cn(
                  "rounded-md px-2.5 py-1.5",
                  i === 2
                    ? "bg-violet-500 text-white"
                    : "bg-secondary text-foreground"
                )}
              >
                {s}
              </motion.span>
              <RefreshCw
                className={cn(
                  "h-3 w-3",
                  i === steps.length - 1 ? "text-violet-500" : "text-muted-foreground"
                )}
              />
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-sm italic text-muted-foreground">
          An entire APK compiled — just to check a 5px → 10px padding change.
        </p>
      </div>
    </div>
  );
}

function ContextWindowVisual() {
  return (
    <div className="mx-auto my-10 w-full max-w-md">
      <div className="surface-elevated p-5">
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-500" />
          The context window is a dev environment
        </p>
        <div className="relative overflow-hidden rounded-lg border border-border bg-secondary/60 p-3">
          <motion.div
            initial={{ x: -40 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex gap-2 font-mono text-[10px]"
          >
            {["…feature spec", "past bugs", "structure", "earlier decisions", "new request →"].map((t, i) => (
              <span
                key={t}
                className={cn(
                  "whitespace-nowrap rounded px-2 py-1",
                  i === 4 ? "bg-violet-500 text-white" : "bg-card text-foreground"
                )}
              >
                {t}
              </span>
            ))}
          </motion.div>
          {/* "forgotten" region */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-background to-transparent"
          />
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          Fill it with explanations of things I don't currently need, and the
          earlier context starts to disappear. So I learn things when I actually
          need to change them.
        </p>
      </div>
    </div>
  );
}

function LogoStoryVisual() {
  return (
    <div className="my-10 flex items-center justify-center gap-4">
      <motion.div
        initial={{ rotate: -6, opacity: 0 }}
        whileInView={{ rotate: -6, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="surface flex h-24 w-24 items-center justify-center"
      >
        <PenTool className="h-8 w-8 text-foreground/60" />
      </motion.div>
      <ArrowRight className="h-5 w-5 text-muted-foreground" />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="surface-elevated gradient-border flex h-24 w-24 items-center justify-center"
      >
        <Logo size={56} className="h-14 w-14" />
      </motion.div>
    </div>
  );
}

function PortfolioVisual() {
  return (
    <div className="mx-auto my-10 w-full max-w-lg">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="surface overflow-hidden"
      >
        <div className="flex items-center gap-1.5 border-b border-border bg-secondary/60 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
          <span className="ml-3 rounded-md bg-background/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
            lsgz.dev
          </span>
        </div>
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-violet-500/10 via-transparent to-blue-500/10 px-5 py-6">
          <div className="mb-4 h-2 w-24 rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />
          <div className="h-6 w-4/5 rounded bg-foreground/80" />
          <div className="mt-2 h-6 w-3/5 rounded bg-foreground/60" />
          <div className="mt-4 h-3 w-2/3 rounded bg-foreground/20" />
          <div className="mt-2 flex gap-2">
            <div className="h-8 w-24 rounded-full bg-violet-500" />
            <div className="h-8 w-20 rounded-full border border-border bg-secondary/60" />
          </div>
          {/* Little aurora hint */}
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-violet-400/25 blur-2xl" />
          <div className="absolute -left-6 -bottom-6 h-24 w-24 rounded-full bg-blue-400/25 blur-2xl" />
        </div>
      </motion.div>
    </div>
  );
}

function ClosingVisual() {
  const items = [
    { icon: <Smartphone className="h-4 w-4" />, label: "Can't run locally?" },
    { icon: <CloudCog className="h-4 w-4" />, label: "Need a GPU?" },
    { icon: <RefreshCw className="h-4 w-4" />, label: "No Android Studio?" },
    { icon: <ImageIcon className="h-4 w-4" />, label: "API became paid?" },
    { icon: <Code2 className="h-4 w-4" />, label: "Tool doesn't exist?" },
  ];
  return (
    <div className="my-10">
      <div className="surface-elevated gradient-border p-6">
        <div className="mb-4 flex items-center justify-center gap-2 text-sm font-semibold">
          <Compass className="h-4 w-4 text-violet-500" />
          Finding another way
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {items.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="flex items-center gap-2 rounded-lg border border-border bg-card/70 px-3 py-2 text-sm"
            >
              <span className="text-violet-500">{it.icon}</span>
              <span className="text-muted-foreground">{it.label}</span>
              <span className="ml-auto text-xs font-mono text-foreground/60">
                {
                  ["find somewhere", "Colab / Kaggle", "remote CI", "new approach", "build it"][i]
                }
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Pull-quote — used for the quote-style lines in the story */
function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="my-8 border-l-2 border-violet-500 pl-5 text-lg font-medium italic leading-relaxed text-foreground/90"
    >
      {children}
    </motion.blockquote>
  );
}

/* ── Story content (every paragraph preserved verbatim) ─── */

const SECTIONS: Section[] = [
  {
    id: "start",
    chapter: "01",
    kicker: "Where it began",
    visual: <PhoneStartVisual />,
    paragraphs: [
      "It started with a phone.",
      "I didn't begin with a computer science roadmap, a powerful development setup, or even a clear idea of what I wanted to build.",
      "I started by making small static HTML websites and hosting them from my phone. Seeing something I'd made become accessible on the internet for the first time was enough to make me curious:",
      <PullQuote key="q1">What else could I build?</PullQuote>,
      "That curiosity eventually led me to Python.",
      "I didn't know the whole language—and I still wasn't writing everything from scratch. I used AI heavily, understood enough of the code to experiment with it, broke things constantly, and gradually learned by trying to make ideas actually work.",
      "And that's where things started getting interesting. ",
      "There was another part of this that shaped almost everything I built afterwards:",
      <PullQuote key="q2">I was doing it all from my phone.</PullQuote>,
      "And it wasn't some unusually powerful phone either. I was using an OPPO A15, a fairly average Android phone.",
      "I just didn't want to give myself the excuse that I needed a laptop before I could start coding or making projects.",
      "So whenever my phone couldn't do something, I looked for a workaround.",
    ],
  },
  {
    id: "workarounds",
    chapter: "02",
    kicker: "Building my own environment",
    visual: <WorkaroundToolsVisual />,
    paragraphs: [
      "For simple scripts, I used Termux.",
      "For things that needed a GPU, I used Google Colab or Kaggle.",
      "If I couldn't comfortably manage and run a modern web project locally, I used AI agents that had their own computers.",
      "Later, when I started working on Android apps and couldn't use Android Studio on my phone, I used GitHub Actions to compile the APK remotely.",
      "I didn't have the ideal development environment.",
      "So I slowly built my own development environment out of whatever was available on the internet.",
    ],
  },
  {
    id: "chatbot",
    chapter: "03",
    title: "My first real AI project",
    kicker: "APIs, memory, Telegram",
    visual: <ChatbotVisual />,
    paragraphs: [
      "I discovered APIs, then found Groq, and decided to build a chatbot.",
      "I called it Kia.",
      "Its system prompt was almost embarrassingly simple:",
      <PullQuote key="sys-prompt">"Your name is Kia. You are a friendly virtual assistant."</PullQuote>,
      "That was basically it.",
      "But seeing a chatbot I'd made respond to me for the first time was enough.",
      "Then I noticed something annoying.",
      "Kia had the memory of a goldfish.",
      "I could tell it something, send another message, and it behaved like the previous conversation had never happened.",
      "At first, I thought this was something the AI or API was supposed to handle automatically.",
      "It wasn't.",
      "While trying to fix it, I learned that my own program had to keep the previous messages and send that conversation history back to the model whenever I wanted it to remember what we'd been talking about.",
      "That was my introduction to conversation memory.",
      "It was one of the first times a bug taught me more than a tutorial could.",
      "Eventually Kia could actually hold a conversation.",
      "Naturally, my next thought was:",
      <PullQuote key="q3">Can I put this on Telegram?</PullQuote>,
      "That sent me down another rabbit hole—Telegram's Bot API, hosting platforms, PythonAnywhere, webhooks and increasingly complicated bot logic.",
      "Generating correct working code with AI was a headache, but eventually Kia escaped Termux on my phone and became an actual Telegram bot I could message from anywhere.",
    ],
  },
  {
    id: "dreamkia",
    chapter: "03-B",
    title: "DreamKia",
    kicker: "System prompts, SDXL, context",
    visual: <DreamKiaVisual />,
    paragraphs: [
      "And while messing around with it, I discovered something that changed the direction of my experiments completely:",
      <strong>system prompts.</strong>,
      "And then my mind immediately went somewhere it probably shouldn't have.",
      "Until then, Kia's system prompt basically said:",
      "\"You're Kia. You're friendly.\"",
      "But the more I experimented, the more I realized that a system prompt could shape much more than a chatbot's name.",
      "I could tell the AI who it was supposed to be, how it should behave, and what kind of conversation it was supposed to have.",
      "And, naturally, the first question that came into my head was:",
      <PullQuote key="nsfw-q">Wait... what happens if I tell it to become an NSFW chatbot?</PullQuote>,
      "There was only one reasonable way to answer that.",
      "I built one.",
      "I called it DreamKia.",
      "Instead of Kia's tiny \"friendly virtual assistant\" instruction, DreamKia had a much stronger character and roleplay-oriented prompt.",
      "Same basic idea of talking to an AI.",
      "Completely different experience.",
      "And it worked surprisingly well.",
      "That fascinated me.",
      "I hadn't trained anything.",
      "I hadn't modified the underlying model.",
      "I'd mostly changed the instructions surrounding it, yet it behaved like an entirely different character.",
      "For a while, I just experimented with that.",
      "Then, as usually happens with my projects, I got another idea.",
      "Text was starting to feel boring.",
      "What if DreamKia could actually generate what was happening?",
      "Around that time, I discovered SDXL.",
      "It could generate images from text.",
      "So the obvious thing would have been to add an image command to DreamKia:",
      <code className="font-mono text-sm text-violet-500">/image [describe whatever you want]</code>,
      "But I didn't like that.",
      "Imagine you've already been talking to a character for several messages.",
      "The conversation already contains the setting and what's currently happening.",
      "Then suddenly the bot asks you:",
      <PullQuote key="img-q">"Please describe the image you want."</PullQuote>,
      "Why?",
      "We literally just spent ten messages describing it.",
      "So I tried something else.",
      "When DreamKia needed to generate an image, my script would take some of the recent messages from the conversation—both what the user had said and what DreamKia had replied.",
      "That gave it the recent context.",
      "From that context, the system could figure out what kind of scene matched the conversation and turn it into a prompt that SDXL could understand.",
      "Then SDXL generated the image.",
      "And the bot sent it straight back into the same Telegram chat.",
      "So from the user's perspective, there wasn't really:",
      "a chatbot",
      "and",
      "an image generator.",
      "You just talked to DreamKia.",
      "And when an image was generated, it actually matched the context of the conversation instead of making you explain everything again from scratch.",
      "And somehow...",
      "it worked ridiculously well.",
      "I shared DreamKia with some friends.",
      "They loved messing around with it too.",
      <em>The funny thing is, DreamKia started as a completely unserious experiment.</em>,
      "I wasn't thinking:",
      "\"Today I will study multimodal AI architecture.\"",
      "💀",
      "I basically thought:",
      "\"Can I make an AI do spicy roleplay?\"",
      <em>And somehow that stupid question led me from a chatbot with one tiny system prompt to thinking about:</em>,
      "conversation memory,",
      "character behavior,",
      "system prompts,",
      "image-generation models,",
      "passing context between different AI systems,",
      "and making multiple models feel like one product.",
      "My first chatbot was basically:",
      <code className="font-mono text-xs">Send message → get AI response.</code>,
      "DreamKia was the first time I started stitching different pieces together to create an experience that none of those pieces could provide alone.",
    ],
  },
  {
    id: "dad-problem",
    chapter: "04",
    kicker: "A problem worth solving",
    title: "Then I found a problem actually worth solving.",
    visual: <PipelineVisual />,
    paragraphs: [
      "My father runs a shop where one of the things he does is prepare and print passport-size photographs.",
      "He used an AI tool to improve faces in photos.",
      "Then it became paid.",
      "So I thought:",
      <PullQuote key="q4">Why don't I build our own?</PullQuote>,
      "That question became one of the most important projects I've made.",
      "I found CodeFormer and started experimenting with image-restoration APIs. But simply enhancing an image wasn't enough.",
      "I wanted to automate more of the workflow.",
      "So I built a Telegram bot that could take an uploaded photograph and process it through a pipeline:",
      "Upload → Enhance → Remove background → Make it white → Generate a print-ready sheet of passport photos",
      "The interesting part was how I built it.",
      "Different pieces were generated and debugged with different AI systems. I worked on each part separately and eventually connected everything into a single working pipeline.",
      "And it worked.",
      <PullQuote key="q5">My father actually used it. </PullQuote>,
    ],
  },
  {
    id: "growth",
    chapter: "05",
    kicker: "When the credits ran out",
    visual: <GrowthVisual />,
    paragraphs: [
      "Then the API credits ran out.",
      "That could have been the end of it.",
      "Instead, I started looking for another way.",
      "I discovered that the model had a Hugging Face Space that, at the time, could be used freely. Getting my own program to reliably interact with it became an unexpectedly difficult problem.",
      "It took weeks of experimenting with AI-generated code, debugging and trying different approaches before I finally had a working solution.",
      "And suddenly I had something I'd originally built for one person that could process images without the API limitation I'd started with.",
      "Then something unexpected happened.",
      "Other people found the Telegram bot.",
      "No advertising.",
      "No subscription.",
      "No launch campaign.",
      "According to my bot's usage data, it eventually reached 1000+ users outside my father's use.",
      "That was probably the first time one of my experiments stopped feeling like an experiment. ",
    ],
  },
  {
    id: "product",
    chapter: "06",
    kicker: "From bot to product",
    visual: <EvolutionVisual />,
    paragraphs: [
      "Eventually I wondered:",
      <PullQuote key="q6">Why should this only exist inside Telegram?</PullQuote>,
      "I used Manus AI to help create a web version and continued developing it from there.",
      <>That became the <P name="image enhancer" href={PRODUCTS.EnhanceIt} /> I maintain today.</>,
      "It's free, publicly accessible, and still being used by real people. ",
      "What started as:",
      <PullQuote key="q7">"Dad's photo enhancer became paid."</PullQuote>,
      "eventually became:",
      <PullQuote key="q8">A tool used by people I'd never met.</PullQuote>,
      "That's probably the best explanation of why I like building things.",
    ],
  },
  {
    id: "experiments",
    chapter: "07",
    kicker: "Fun for its own sake",
    visual: <VoiceVisual />,
    paragraphs: [
      "Then I kept experimenting.",
      "Not everything needed to become a startup.",
      "Sometimes I built things simply because the technology sounded fun.",
      "After discovering AI voice conversion through YouTube, I started experimenting in Google Colab with converting voices and generating songs using my own and my friends' voices.",
      "It wasn't particularly useful.",
      "It was extremely fun.",
      "And it introduced me to another completely different area of AI. ",
    ],
  },
  {
    id: "personality",
    chapter: "08",
    kicker: "An AI that sounds like me",
    title: "Could I train an AI to behave like me?",
    visual: <BrainVisual />,
    paragraphs: [
      "And after spending so much time making existing models behave differently, another question eventually appeared:",
      "What if I stopped changing someone else's model with prompts...",
      "...and actually trained one myself?",
      "That question led to one of the strangest things I've built.",
      <PullQuote key="train">Could I train an AI to behave like me?</PullQuote>,
      "Eventually, after stitching memory, system prompts, and image generation into DreamKia, another question appeared:",
      <PullQuote key="q9">Could I create a model that reflected my own personality?</PullQuote>,
      "I started learning about model training, choosing a base model, preparing conversational data and concepts such as epochs and training loss.",
      "For the dataset, I collected examples from my own conversations and experimented with training a model around those communication patterns.",
      <>The final result worked well enough that I published <a href="https://huggingface.co/lsgz/lsgz-personality-clone" target="_blank" rel="noopener noreferrer" className="group inline-flex items-baseline gap-0.5 font-medium text-violet-600 underline decoration-violet-500/30 underline-offset-[3px] transition-colors hover:text-violet-500 hover:decoration-violet-500 dark:text-violet-300 dark:hover:text-violet-200">the model<span className="sr-only"> LSGZ Personality Clone</span> on my Hugging Face account<ArrowUpRight className="mb-0.5 inline h-3 w-3 -translate-y-px opacity-60 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" /></a>.</>,
      "It wasn't something I needed.",
      "I built it because I wanted to know whether I could. ",
      "And that describes quite a few things I've made.",
    ],
  },
  {
    id: "streampoint",
    chapter: "09",
    kicker: "Origin of StreamPoint",
    title: "StreamPoint happened because typing with a TV remote sucks.",
    visual: <StreamPointVisual />,
    paragraphs: [
      "After we got a smart set-top box, I ran into an incredibly ordinary problem.",
      "I had found various websites for discovering movies and anime, but repeatedly typing URLs with a television remote was miserable.",
      "So instead of continuing to type them...",
      <>I made <P name="StreamPoint" href={PRODUCTS.StreamPoint} />.</>,
      "A simple website that organized the destinations I wanted into one place.",
      "Open StreamPoint → choose where I want to go → done.",
      "I shared it with friends who watch movies and anime, and they started using it too. ",
      "Later, one of them casually told me:",
      <PullQuote key="q10">"I watch movies through StreamPoint."</PullQuote>,
      "That tiny sentence meant more to me than a page-view counter.",
      "He didn't call it \"that website you made.\"",
      "He called it by its name.",
      "It had become a product in someone else's mind.",
    ],
  },
  {
    id: "pocketdev-intro",
    chapter: "10",
    kicker: "A problem I understood personally",
    visual: <PocketDevVisual />,
    paragraphs: [
      "Then I tried to fix one of my own biggest problems.",
      "By this point, AI had made it possible for me to build things that would have been far beyond my coding knowledge otherwise.",
      "But developing from a phone still had an annoying workflow.",
      "I could ask an AI to generate some code, but then I'd have to copy it, move to an editor, paste it, test it, return to the AI, explain what happened, get another version and repeat.",
      "There were plenty of code editors for Android.",
      "There were plenty of AI coding tools.",
      "But I couldn't find an Android code editor that had the kind of deep AI integration I wanted—especially smart inline suggestions and the ability to actually write and work with code directly inside the editor.",
      "So eventually I thought:",
      <PullQuote key="q11">Why don't I build that too?</PullQuote>,
      <>That became <P name="PocketDev" href={PRODUCTS.PocketDev} />.</>,
    ],
  },
  {
    id: "pocketdev",
    chapter: "11",
    kicker: "PocketDev",
    title: "PocketDev",
    paragraphs: [
      <>PocketDev is an AI-powered code editor for Android built around the way I wished I could code on my phone.</>,
      "Instead of having AI as a separate chatbot that happens to know programming, I wanted it integrated directly into the editor.",
      "So PocketDev gradually gained things like:",
      "smart next-line AI suggestions,",
      "writing code with AI,",
      "finding bugs with AI,",
      "explaining code,",
      "automatic debugging,",
      "and a system that could attempt to fix code, run it again, inspect what went wrong and continue trying until it ran successfully.",
      "",
      "One of my favorite parts became the autocomplete interaction.",
      <>When PocketDev shows a suggestion, I can swipe right to accept it.</>,
      "If I simply continue typing, the suggestion disappears.",
      "And for multiline suggestions, I can partially swipe to accept only one line and continue from there.",
      "I can't claim that interaction as an original idea.",
      "I first saw something similar while writing an email in Gmail. It predicted the rest of a sentence and told me to swipe right to accept it.",
      "I liked the interaction so much that I thought:",
      <PullQuote key="q12">Why shouldn't code completion work like that on a phone?</PullQuote>,
      <>So I adapted the idea for PocketDev.</>,
      "I think being honest about where an idea came from is much more interesting than pretending I invented everything myself.",
    ],
  },
  {
    id: "pocketdev-limits",
    chapter: "12",
    kicker: "Building the tool, with the tool",
    visual: <BuildCycleVisual />,
    paragraphs: [
      <>PocketDev also showed me the limits of the way I build.</>,
      <>PocketDev works.</>,
      "But it's not perfect.",
      "Larger files can still cause performance problems. The editor itself needs optimization. The way project files and context are provided to AI could be much better.",
      "I've considered using an open-source editor such as Sora Editor, but integrating it into what I'd already built while preserving the AI features and autocomplete turned out to be much harder than simply replacing one component.",
      "My current implementation is closer to a heavily extended text editor than the Android equivalent of a full desktop IDE.",
      <>And ironically, improving it is made harder by the exact problem PocketDev is trying to solve:</>,
      <PullQuote key="q13">I'm developing an Android development tool from an Android phone.</PullQuote>,
      "I can't open Android Studio, modify something and immediately look at the result.",
      "Sometimes I know exactly what tiny change I want.",
      "Maybe I just want:",
      "5px of padding → 10px.",
      "I could make that change myself.",
      "But I can't conveniently load, edit, compile and preview the Android project locally.",
      "So the workflow can become:",
      "change code → push to GitHub → GitHub Actions compiles APK → download/install build → open it → inspect the change → repeat",
      "Sometimes an entire APK has to be compiled just so I can find out whether a tiny UI adjustment looks right.",
      "It's frustrating.",
      "But there's something strangely appropriate about it too.",
      <>PocketDev exists because developing from a phone is difficult—and PocketDev itself is being built through those same difficulties.</>,
      "It still has a lot to improve.",
      "That's part of why I'm still interested in it.",
    ],
  },
  {
    id: "ai-usage",
    chapter: "13",
    kicker: "How I actually use AI",
    visual: <ContextWindowVisual />,
    paragraphs: [
      "There's another thing about the way I build that probably sounds strange at first.",
      "If AI gives me a piece of code, I test it, and it works correctly, I don't necessarily start asking:",
      "\"Explain this function.\"",
      "\"Explain that class.\"",
      "\"Explain exactly how every part works.\"",
      "It's not because I think understanding code is unimportant.",
      "It's because when I'm actively building something, the AI's context window is part of my development environment.",
      "Sometimes I've spent a long conversation getting the model to understand exactly what a feature is supposed to do, how the existing code is structured and what problems we've already solved.",
      "If I then fill that conversation with explanations of things I don't currently need, eventually the earlier context starts disappearing.",
      "And if I later need to change the feature, the AI may no longer remember why the code was written that way in the first place.",
      "So I tend to learn things when they become relevant to what I'm changing or debugging.",
      "It's certainly not a perfect workflow.",
      "It also means there are times when I'm dependent on AI for modifications I could probably make much faster myself if I had a normal development setup and deeper knowledge of the codebase.",
      "I don't really want to hide that.",
      <PullQuote key="q14">
        AI is simultaneously the thing that has allowed me to build far beyond what I could otherwise build right now—and something that constantly shows me what I still need to learn.
      </PullQuote>,
    ],
  },
  {
    id: "logo",
    chapter: "14",
    kicker: "Even the logo has a story",
    visual: <LogoStoryVisual />,
    paragraphs: [
      "Eventually, if I was going to put all these things under one identity, I needed something that represented me.",
      "So I made the LSGZ logo.",
      "It didn't start with an AI image generator.",
      "It started with pen and paper.",
      "I drew the original idea myself, then later used AI to help polish and refine it digitally while keeping the identity of the original drawing.",
      "I like that little detail because, in a way, it's exactly how I've built most of my projects.",
      "The idea starts with me.",
      "The first version is usually imperfect.",
      "AI helps me push it much further.",
      "Then I keep changing things until they feel like mine.",
    ],
  },
  {
    id: "portfolio",
    chapter: "15",
    kicker: "Building this site",
    visual: <PortfolioVisual />,
    paragraphs: [
      "And eventually, I needed somewhere to put all of this.",
      "After finishing Class 12 and preparing to begin B.Tech IT, I decided it was finally time to build a proper portfolio. ",
      "Not a page containing my name, three progress bars and a list of programming languages.",
      "I wanted somewhere that actually represented the things I'd been making.",
      "So, like most of my projects, I kept iterating.",
      "Different AI systems helped with different pieces. I changed layouts, threw things away, rebuilt sections, obsessed over tiny details and kept polishing until the website started feeling like mine.",
      "There wasn't one prompt that produced it.",
      "There wasn't one AI that built it.",
      "It slowly came together through different tools, different models, experiments, mistakes and a lot of tiny decisions.",
      "Even my logo—the symbol sitting above all of it—started as something I drew on a piece of paper.",
      "And that's the website you're reading now.",
    ],
  },
  {
    id: "closing",
    chapter: "16",
    kicker: "How I work",
    visual: <ClosingVisual />,
    paragraphs: [
      "I don't really have a traditional development story.",
      "I didn't learn everything first and then start building.",
      "I did almost the opposite.",
      "I wanted something → tried to build it → got stuck → learned what I needed → got it working → found another problem.",
      "AI has been part of that process from the beginning.",
      "I don't pretend I manually wrote every line of code. I use AI aggressively—as a coding tool, debugger, researcher, designer and sometimes as a way of understanding technology I haven't encountered before.",
      "But deciding what should exist, connecting the pieces, dealing with things when they don't work, refining the experience and deciding when something is finally worth shipping—that part is mine.",
      "And doing all of this from a phone has forced me to get comfortable with another part of building:",
      <PullQuote key="q15">finding another way.</PullQuote>,
      "Can't run something locally?",
      "Find somewhere that can.",
      "Need a GPU?",
      "Use Colab or Kaggle.",
      "Can't use Android Studio?",
      "Compile remotely with GitHub Actions.",
      "An API becomes paid?",
      "Find another approach.",
      "The tool I want doesn't exist on Android?",
      "Try building it.",
      "I didn't decide at the beginning that this would be some kind of philosophy.",
      "It just became the way I worked.",
      "And somehow, a journey that started with a few static HTML pages hosted from a phone turned into bots, AI experiments, trained models, an Android code editor and products used by people I've never met. ",
      <PullQuote key="q16">I'm still at the beginning.</PullQuote>,
    ],
  },
];

/* ── Page ────────────────────────────────────────────────── */

export default function MyStoryPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  // Active chapter for side nav
  const [active, setActive] = useState(SECTIONS[0].id);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTION_SENTINELS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Reading progress bar */}
      <motion.div
        aria-hidden
        className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-violet-500 via-blue-500 to-violet-500"
        style={{ scaleX }}
      />

      {/* Top navbar (minimal, story-specific) */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-transparent bg-background/70 backdrop-blur-md transition-colors">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to portfolio
          </Link>
          <div className="flex items-center gap-2">
            <span className="hidden text-sm font-semibold tracking-tight sm:inline">My Story</span>
            <ThemeToggle />
            <a
              href="https://github.com/lsgzt"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Side chapter nav (desktop only) */}
      <nav className="pointer-events-none fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
        <ul className="pointer-events-auto space-y-2">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="group flex items-center gap-2"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                <span
                  className={cn(
                    "h-[2px] w-4 transition-all",
                    active === s.id ? "w-8 bg-foreground" : "bg-border group-hover:bg-muted-foreground"
                  )}
                />
                <span
                  className={cn(
                    "text-[10px] font-mono uppercase tracking-widest transition-colors",
                    active === s.id ? "text-foreground" : "text-muted-foreground/70 group-hover:text-muted-foreground"
                  )}
                >
                  {s.chapter}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main className="relative">
        {/* ── Hero ─────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-36 md:pt-40 md:pb-28">
          <AuroraBackground className="!z-0" />
          <CurvyL className="!z-[1] !top-20 sm:!top-24 md:!top-28" />
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,#000_30%,transparent_75%)]" />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center justify-center"
            >
              <Tag accent="violet">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-500" />
                </span>
                My Story
              </Tag>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-center text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
            >
              <span className="text-gradient">It started</span>{" "}
              <span className="text-foreground">with a</span>{" "}
              <span className="text-gradient-accent">phone.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-6 max-w-xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              How building from an OPPO A15, one workaround at a time, led to
              bots, AI products, and tools used by people I've never met.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex items-center justify-center"
            >
              <div className="inline-flex items-center gap-3 text-xs text-muted-foreground">
                <span className="h-px w-8 bg-border" />
                scroll to read
                <span className="h-px w-8 bg-border" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Story body ───────────────────────────────── */}
        <div className="relative">
          {/* Subtle top fade */}
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-violet-500/5 to-transparent" />

          <article className="mx-auto max-w-2xl px-4 pb-24 sm:px-6">
            {SECTIONS.map((section) => (
              <StorySection key={section.id} section={section} />
            ))}

            {/* Ending CTA */}
            <FadeIn className="mt-20">
              <div className="surface-elevated gradient-border flex flex-col items-center gap-4 p-8 text-center">
                <p className="text-sm text-muted-foreground">Thanks for reading.</p>
                <p className="text-balance text-xl font-semibold tracking-tight">
                  Now go see <span className="text-gradient-accent">what I've built</span>.
                </p>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                  <Button asChild>
                    <Link href="/">
                      <Globe className="h-4 w-4" /> Back to portfolio
                    </Link>
                  </Button>
                  <Button asChild variant="glass">
                    <a href="https://github.com/lsgzt" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" /> GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </article>
        </div>
      </main>
    </div>
  );
}

/* Used to make the IntersectionObserver effect hook stable */
const SECTION_SENTINELS = SECTIONS.map((s) => s.id);

/* ── Section renderer ────────────────────────────────────── */

function StorySection({ section }: { section: Section }) {
  return (
    <section id={section.id} className="scroll-mt-24 py-10 sm:py-14">
      {/* Section marker / kicker */}
      <FadeIn>
        <div className="mb-8 flex items-baseline gap-3">
          <span className="font-mono text-[11px] tracking-[0.3em] text-muted-foreground">
            {section.chapter}
          </span>
          <span className="h-px flex-1 bg-border" />
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {section.kicker}
          </span>
        </div>
        {section.title && (
          <h2 className="mb-6 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            {section.title}
          </h2>
        )}
      </FadeIn>

      <FadeIn>
        <StoryParagraphs paragraphs={section.paragraphs} />
      </FadeIn>
      {section.visual}
    </section>
  );
}

function StoryParagraphs({ paragraphs }: { paragraphs: (string | React.ReactNode)[] }) {
  // We insert the visual AFTER the block of text. Empty strings become spacers.
  return (
    <div className="story-prose">
      {paragraphs.map((p, i) => {
        if (p === "") return <div key={i} className="h-3" />;
        if (typeof p !== "string") return <div key={i}>{p}</div>;
        return (
          <p
            key={i}
            className="my-5 text-[17px] leading-[1.8] text-foreground/90 sm:text-lg"
          >
            {p}
          </p>
        );
      })}
    </div>
  );
}
