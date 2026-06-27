"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command as CommandPrimitive } from "cmdk";
import {
  Search,
  Home,
  FolderGit2,
  FlaskConical,
  User,
  Mail,
  Github,
  ArrowUp,
  CornerDownLeft,
} from "lucide-react";
import { NAV_LINKS, PROJECTS, SITE } from "@/lib/content/site";

type Item = {
  id: string;
  label: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  group: "Navigate" | "Projects" | "External";
};

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    onOpenChange(false);
  };

  const navItems: Item[] = NAV_LINKS.map((l) => {
    const id = l.href.replace("#", "");
    const icon =
      id === "home"
        ? Home
        : id === "projects"
        ? FolderGit2
        : id === "lab"
        ? FlaskConical
        : id === "about"
        ? User
        : Mail;
    return {
      id: `nav-${id}`,
      label: l.label,
      hint: `Jump to ${l.label}`,
      icon,
      action: () => scrollTo(id),
      group: "Navigate",
    };
  });

  const projectItems: Item[] = PROJECTS.filter((p) => !p.slug.startsWith("future-")).map((p) => ({
    id: `proj-${p.slug}`,
    label: p.name,
    hint: p.tagline,
    icon: FolderGit2,
    action: () => {
      if (p.liveUrl) {
        window.open(p.liveUrl, "_blank", "noopener");
      } else {
        scrollTo("projects");
      }
    },
    group: "Projects",
  }));

  const externalItems: Item[] = [
    {
      id: "ext-github",
      label: "Open GitHub",
      hint: SITE.github,
      icon: Github,
      action: () => window.open(SITE.github, "_blank", "noopener"),
      group: "External",
    },
    {
      id: "ext-email",
      label: "Send email",
      hint: SITE.email,
      icon: Mail,
      action: () => (window.location.href = `mailto:${SITE.email}`),
      group: "External",
    },
    {
      id: "ext-top",
      label: "Scroll to top",
      hint: "Back to hero",
      icon: ArrowUp,
      action: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        onOpenChange(false);
      },
      group: "External",
    },
  ];

  const all = [...navItems, ...projectItems, ...externalItems];
  const groups: Item["group"][] = ["Navigate", "Projects", "External"];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[12vh]"
          onClick={() => onOpenChange(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card/95 shadow-2xl backdrop-blur-xl"
          >
            <CommandPrimitive className="flex flex-col">
              <div className="flex items-center gap-3 border-b border-border px-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <CommandPrimitive.Input
                  autoFocus
                  placeholder="Search projects, jump to a section, or open GitHub…"
                  className="h-14 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                />
                <kbd className="hidden h-6 items-center rounded-md border border-border bg-secondary/60 px-1.5 font-mono text-[10px] text-muted-foreground sm:inline-flex">
                  ESC
                </kbd>
              </div>

              <CommandPrimitive.List className="max-h-[60vh] overflow-y-auto p-2">
                <CommandPrimitive.Empty>
                  <div className="px-4 py-10 text-center text-sm text-muted-foreground">
                    No results found.
                  </div>
                </CommandPrimitive.Empty>

                {groups.map((group) => {
                  const items = all.filter((i) => i.group === group);
                  if (items.length === 0) return null;
                  return (
                    <CommandPrimitive.Group
                      key={group}
                      heading={group}
                      className="mb-2 last:mb-0"
                    >
                      {items.map((item) => (
                        <CommandPrimitive.Item
                          key={item.id}
                          onSelect={() => item.action()}
                          className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground data-[selected=true]:bg-secondary/60 data-[selected=true]:text-foreground"
                        >
                          <item.icon className="h-4 w-4 shrink-0 text-muted-foreground group-data-[selected=true]:text-violet-300" />
                          <span className="flex-1 truncate">{item.label}</span>
                          {item.hint && (
                            <span className="truncate text-xs text-muted-foreground/60">
                              {item.hint}
                            </span>
                          )}
                          <CornerDownLeft className="h-3.5 w-3.5 text-muted-foreground/0 transition-colors group-data-[selected=true]:text-muted-foreground" />
                        </CommandPrimitive.Item>
                      ))}
                    </CommandPrimitive.Group>
                  );
                })}
              </CommandPrimitive.List>

              <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-[10px] text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-border bg-secondary/60 px-1 font-mono">↑</kbd>
                    <kbd className="rounded border border-border bg-secondary/60 px-1 font-mono">↓</kbd>
                    to navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-border bg-secondary/60 px-1 font-mono">↵</kbd>
                    to select
                  </span>
                </div>
                <span>LSGZ Command</span>
              </div>
            </CommandPrimitive>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
