"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Github } from "lucide-react";
import { Button } from "@/components/site/button";
import { SITE } from "@/lib/content/site";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_30%,transparent_75%)]" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial-fade blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center text-center"
      >
        <div className="relative">
          <h1 className="text-[120px] font-bold leading-none tracking-tighter text-foreground sm:text-[180px]">
            <span className="text-gradient">4</span>
            <motion.span
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block text-gradient-accent"
            >
              0
            </motion.span>
            <span className="text-gradient">4</span>
          </h1>
        </div>

        <p className="mt-2 text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Lost in the constellation
        </p>

        <h2 className="mt-6 max-w-md text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          This page drifted off the map.
        </h2>

        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          The URL you tried doesn't lead anywhere — yet. Head back home and pick
          a different constellation to explore.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="h-4 w-4" /> Back to home
            </Link>
          </Button>
          <Button asChild size="lg" variant="glass">
            <a href={SITE.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" /> GitHub
            </a>
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
