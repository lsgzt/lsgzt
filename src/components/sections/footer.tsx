"use client";

import { Github, Mail, ArrowUp } from "lucide-react";
import { NAV_LINKS, SITE, SOCIALS } from "@/lib/content/site";
import { AuroraBackground } from "@/components/site/aurora-background";

export function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="relative mt-20 overflow-hidden border-t border-border bg-card/30">
      {/* Very subtle aurora wash at the bottom of the page */}
      <AuroraBackground variant="bottom" className="!z-0 opacity-60" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt="LSGZ logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain dark:invert"
              />
              <span className="text-sm font-semibold tracking-tight">
                {SITE.alias}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {SITE.name} — {SITE.role}. Building AI products that people actually use,
              one shipped experiment at a time.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {SOCIALS.filter((s) => s.label === "GitHub" || s.label === "Email").map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary/40 text-muted-foreground transition-colors hover:border-foreground/15 hover:text-foreground"
                >
                  {s.label === "GitHub" ? (
                    <Github className="h-4 w-4" />
                  ) : (
                    <Mail className="h-4 w-4" />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Navigate
            </h4>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href.replace("#", ""))}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Elsewhere
            </h4>
            <ul className="mt-4 space-y-2.5">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span>{social.label}</span>
                    <span className="text-muted-foreground/50 transition-colors group-hover:text-muted-foreground">
                      {social.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            Designed &amp; Built by{" "}
            <span className="font-medium text-foreground">LSGZ</span> · {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-muted-foreground/70">
              Built with Next.js, Tailwind, and Framer Motion.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-3 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/15 hover:text-foreground"
            >
              Back to top <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
