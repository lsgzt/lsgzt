"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Smartphone, Sparkles, Compass } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { FadeIn } from "@/components/site/fade-in";
import { LiquidGlassCard } from "@/components/illustrations/liquid-glass-card";
import { Button } from "@/components/site/button";
import { cn } from "@/lib/utils";

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-medium text-foreground">{children}</span>
  );
}

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="My Story"
          title="It started with a phone."
          description="I didn't begin with a CS roadmap, a powerful dev setup, or even a clear idea of what I wanted to build."
        />

        {/* Liquid glass card */}
        <FadeIn className="mt-12 flex justify-center">
          <div className="w-full max-w-sm">
            <LiquidGlassCard />
          </div>
        </FadeIn>

        {/* Teaser copy — short, punchy, invites them to read more */}
        <div className="mt-12 space-y-5 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          <FadeIn>
            <p>
              I started by making small static HTML websites and hosting them from an <Highlight>OPPO A15</Highlight> —
              a fairly average Android phone. I had no laptop, so whenever the phone couldn't do something,
              I learned to <Highlight>find another way</Highlight>.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <p>
              Termux for scripts. Colab and Kaggle when I needed a GPU. GitHub Actions to compile Android APKs
              I couldn't build locally. Slowly, I built my own dev environment out of whatever was freely
              available on the internet.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p>
              That approach led to a Groq-powered Telegram chatbot, a passport-photo pipeline my dad
              actually used in his shop, and eventually to <Highlight>EnhanceIt</Highlight> — a free image
              enhancer that quietly grew to <Highlight>1000+ users</Highlight> without a launch, ad, or
              subscription.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p>
              Voice-conversion experiments for fun. A fine-tuned model that talks a little more like me.
              <Highlight> StreamPoint</Highlight>, a streaming directory a friend called by name instead of
              "that website you made." And <Highlight>PocketDev</Highlight>, an AI-powered Android code editor
              — built on an Android phone, compiled through the same GitHub-Actions loop it was designed to
              escape.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p>
              I don't pretend I wrote every line of code myself. I use AI aggressively — as a coding tool,
              debugger, researcher, designer — but <Highlight>deciding what should exist, connecting the
              pieces, and shipping it</Highlight> is mine.
            </p>
          </FadeIn>
        </div>

        {/* Quick-hit chips */}
        <FadeIn delay={0.25} className="mt-8">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { icon: <Smartphone className="h-3.5 w-3.5" />, label: "Built from a phone" },
              { icon: <Sparkles className="h-3.5 w-3.5" />, label: "AI as a tool, not a crutch" },
              { icon: <Compass className="h-3.5 w-3.5" />, label: "Always finding another way" },
            ].map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground"
              >
                <span className="text-violet-500">{chip.icon}</span>
                {chip.label}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* Read full story CTA */}
        <FadeIn delay={0.3} className="mt-12">
          <Link
            href="/myStory"
            className="group relative block overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-foreground/15 hover:shadow-[0_0_0_1px_rgba(124,58,237,0.28),0_16px_40px_-12px_rgba(124,58,237,0.35)] sm:p-8"
          >
            <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  <BookOpen className="h-3.5 w-3.5" />
                  The long version
                </div>
                <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  Read my full story
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  Every chapter — from the first HTML page hosted on a phone to the bugs, the 5px padding
                  loops, the logo drawn on paper, and why I think context windows are part of a dev
                  environment. Same story, more room to breathe, with visuals along the way.
                </p>
              </div>
              <Button size="lg" className="shrink-0">
                Read full story
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </div>

            {/* Subtle aurora glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-violet-500/25 via-fuchsia-500/20 to-blue-500/20 blur-3xl transition-opacity group-hover:opacity-100"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/15 blur-3xl transition-opacity group-hover:opacity-100"
            />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
