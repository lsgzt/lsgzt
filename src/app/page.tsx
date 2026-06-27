"use client";

import { useState } from "react";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { Projects } from "@/components/sections/projects";
import { Lab } from "@/components/sections/lab";
import { About } from "@/components/sections/about";
import { TechStack } from "@/components/sections/tech-stack";
import { GitHubSection } from "@/components/sections/github";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { CommandPalette } from "@/components/site/command-palette";
import { LoadingScreen } from "@/components/site/loading-screen";

export default function Home() {
  // Command palette is opened from the navbar trigger or via Ctrl+K.
  // We lift state here so both inputs control the same instance.
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <>
      <LoadingScreen />
      <Navbar onOpenCommand={() => setCommandOpen(true)} />

      <main className="relative min-h-screen">
        <Hero />
        <Stats />
        <Projects />
        <Lab />
        <About />
        <TechStack />
        <GitHubSection />
        <Contact />
      </main>

      <Footer />
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}
