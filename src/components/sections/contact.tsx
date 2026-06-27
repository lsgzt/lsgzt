"use client";

import { useState } from "react";
import { Mail, Github, Linkedin, Send, Check, Loader2 } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { FadeIn } from "@/components/site/fade-in";
import { Button } from "@/components/site/button";
import { SOCIALS } from "@/lib/content/site";
import { useToast } from "@/hooks/use-toast";

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: Github,
  Email: Mail,
  LinkedIn: Linkedin,
  "Hugging Face": Github,
};

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const { toast } = useToast();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate async submit — wire to real endpoint later
    await new Promise((r) => setTimeout(r, 1100));
    setStatus("sent");
    toast({
      title: "Message sent",
      description: "Thanks — I'll get back to you within a day or two.",
    });
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-1/4 top-0 h-[400px] w-[600px] rounded-full bg-radial-fade blur-3xl opacity-40" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Have an idea worth building?"
          description="I'm currently open to AI product work, collaborations, and the occasional interesting side-project. Drop me a line."
          align="center"
          className="mx-auto"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Form */}
          <FadeIn className="lg:col-span-7">
            <form
              onSubmit={onSubmit}
              className="surface-elevated flex flex-col gap-5 p-6 sm:p-8"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Name" htmlFor="name">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="h-11 w-full rounded-lg border border-border bg-background/50 px-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                  />
                </Field>
                <Field label="Email" htmlFor="email">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="h-11 w-full rounded-lg border border-border bg-background/50 px-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                  />
                </Field>
              </div>

              <Field label="Subject" htmlFor="subject">
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="What's this about?"
                  className="h-11 w-full rounded-lg border border-border bg-background/50 px-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                />
              </Field>

              <Field label="Message" htmlFor="message">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me a bit about the project, timeline, and what success looks like."
                  className="w-full resize-none rounded-lg border border-border bg-background/50 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                />
              </Field>

              <div className="flex items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">
                  Typical reply time: 1–2 days.
                </p>
                <Button
                  type="submit"
                  disabled={status !== "idle"}
                  className="min-w-[140px]"
                >
                  {status === "idle" && (
                    <>
                      Send message <Send className="h-4 w-4" />
                    </>
                  )}
                  {status === "sending" && (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                    </>
                  )}
                  {status === "sent" && (
                    <>
                      Sent <Check className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </FadeIn>

          {/* Socials */}
          <FadeIn delay={0.1} className="lg:col-span-5">
            <div className="flex h-full flex-col gap-3">
              {SOCIALS.map((social) => {
                const Icon = SOCIAL_ICONS[social.label] ?? Mail;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="surface-elevated group flex items-center justify-between p-5 transition-colors hover:border-white/15"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary/60 text-muted-foreground transition-colors group-hover:text-violet-300">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">
                          {social.label}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {social.handle}
                        </div>
                      </div>
                    </div>
                    <Send className="h-4 w-4 text-muted-foreground/40 transition-all group-hover:text-violet-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                );
              })}

              <div className="surface-elevated mt-auto flex items-center gap-3 bg-gradient-to-br from-violet-500/[0.05] to-blue-500/[0.05] p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    Currently available
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Open to AI product work and collaborations.
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

    </section>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
