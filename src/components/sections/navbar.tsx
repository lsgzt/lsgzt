"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Menu, X, Command } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/content/site";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { cn } from "@/lib/utils";

type NavbarProps = {
  onOpenCommand: () => void;
};

export function Navbar({ onOpenCommand }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is currently in view so the nav can highlight it.
  // Only anchor links (starting with #) are observed; route links are handled
  // separately and highlight based on current pathname.
  useEffect(() => {
    const anchorLinks = NAV_LINKS.filter(
      (l): l is Extract<(typeof NAV_LINKS)[number], { href: string }> =>
        l.href.startsWith("#")
    );
    // If we're not on the home page, don't highlight an in-page section.
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      return;
    }
    const sections = anchorLinks.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: { href: string; route?: boolean }
  ) => {
    const { href } = link;
    // Route links use Next.js navigation — no preventDefault, just close mobile menu.
    if (!href.startsWith("#")) {
      setMobileOpen(false);
      return;
    }
    e.preventDefault();
    const id = href.replace("#", "");
    // If we're not on the home page, go to the home page first.
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      window.location.href = `/${href}`;
      return;
    }
    const el = document.getElementById(id);
    // Close the mobile menu first
    setMobileOpen(false);
    if (el) {
      // Use window.scrollTo with the element's position relative to the document.
      // This is more reliable than scrollIntoView when the layout is changing
      // (e.g., mobile menu closing). The 80px offset accounts for the sticky navbar.
      const top =
        el.getBoundingClientRect().top + window.scrollY - 80;
      setTimeout(() => {
        window.scrollTo({ top, behavior: "smooth" });
      }, 200);
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, { href: "#home" })}
          className="group flex items-center gap-2.5"
          aria-label="LSGZ home"
        >
          {/* Custom logo — abstract line-art mark from craiyon_174614_image.png.
              Dark-on-light logo, so we invert it in dark mode via the invert filter
              so it stays visible on the dark background. */}
          <img
            src="/logo.png"
            alt="LSGZ logo"
            width={28}
            height={28}
            className="h-7 w-7 object-contain dark:invert"
          />
          <span className="text-sm font-semibold tracking-tight text-foreground">
            {SITE.alias}
          </span>
        </a>

        {/* Desktop nav — centered */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isRoute = !link.href.startsWith("#");
            const id = link.href.replace("#", "");
            // Route links are active when the current pathname starts with their href
            const isActive = isRoute
              ? typeof window !== "undefined" && window.location.pathname === link.href
              : activeSection === id;
            const LinkComp: any = isRoute ? Link : "a";
            return (
              <LinkComp
                key={link.href}
                href={link.href}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, link as any)}
                className={cn(
                  "relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-2 -bottom-px h-px bg-foreground"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </LinkComp>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenCommand}
            className="hidden h-8 items-center gap-1.5 rounded-md border border-border bg-secondary/40 px-2.5 text-xs text-muted-foreground transition-colors hover:border-foreground/15 hover:text-foreground sm:flex"
            aria-label="Open command palette"
          >
            <Command className="h-3 w-3" />
            <span className="font-mono text-[10px]">K</span>
          </button>

          <ThemeToggle />

          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
          >
            <Github className="h-4 w-4" />
          </a>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col px-4 py-3 sm:px-6">
              {NAV_LINKS.map((link) => {
                const isRoute = !link.href.startsWith("#");
                const LinkComp: any = isRoute ? Link : "a";
                return (
                  <LinkComp
                    key={link.href}
                    href={link.href}
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, link as any)}
                    className="rounded-md px-2 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
                  >
                    {link.label}
                  </LinkComp>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
