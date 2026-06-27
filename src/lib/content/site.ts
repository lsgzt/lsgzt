/**
 * Central content file for the LSGZ portfolio.
 * Keeping copy + project/experiment/skill metadata in one place
 * makes future edits (new project, status change, etc.) trivial.
 */

export const SITE = {
  name: "Lovepreet Singh",
  alias: "LSGZ",
  role: "AI Product Builder",
  email: "lovepreet@lsgz.dev",
  github: "https://github.com/lsgzt",
  githubHandle: "lsgzt",
  huggingface: "https://huggingface.co/lsgz/lsgz-personality-clone",
  tagline: "Building AI products that people actually use.",
  description:
    "I'm Lovepreet Singh, an AI-focused developer who enjoys transforming ideas into real products using modern web technologies, APIs, and artificial intelligence.",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Lab", href: "#lab" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export type Stat = {
  label: string;
  value: number;
  suffix?: string;
  description: string;
};

export const STATS: Stat[] = [
  { label: "Projects Built", value: 12, description: "Shipped products & side-projects" },
  { label: "Live Applications", value: 4, description: "Currently deployed and serving users" },
  { label: "AI Experiments", value: 9, description: "Active prototypes in the lab" },
  { label: "Technologies Used", value: 18, description: "Across web, ML, and infra" },
];

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  tags: string[];
  liveUrl?: string;
  sourceUrl?: string;
  status: "live" | "beta" | "concept";
  accent: "violet" | "blue" | "mixed";
};

export const PROJECTS: Project[] = [
  {
    slug: "enhanceit",
    name: "EnhanceIt",
    tagline: "AI-powered image enhancement",
    description:
      "A web app that restores and upscales low-resolution images using diffusion-based models, with a clean pipeline from upload to download.",
    longDescription:
      "EnhanceIt pairs a custom inference pipeline with a focused product UX. Drop in a blurry or low-light photo and get back a sharper, denoised, higher-resolution version in seconds — no GPU, no setup.",
    tags: ["Python", "TensorFlow", "REST APIs", "Render"],
    liveUrl: "https://enhanceit.onrender.com",
    sourceUrl: "https://github.com/lsgzt",
    status: "live",
    accent: "violet",
  },
  {
    slug: "streampoint",
    name: "StreamPoint",
    tagline: "Gateway to free streaming websites",
    description:
      "A curated, fast, and minimal directory of streaming websites with smart search and clean categorization — built for people who hate cluttered indexes.",
    longDescription:
      "StreamPoint indexes and categorizes streaming sources, exposes a snappy search interface, and ships as a static-first site on Cloudflare Pages for instant loads anywhere.",
    tags: ["HTML", "CSS", "JavaScript", "Cloudflare"],
    liveUrl: "https://streampoint.pages.dev",
    sourceUrl: "https://github.com/lsgzt",
    status: "live",
    accent: "blue",
  },
  {
    slug: "pocketdev",
    name: "PocketDev",
    tagline: "AI-powered code editor for Android",
    description:
      "A lightweight, on-device code editor for Android that pairs an LLM assistant with a real local dev environment — built for builders who want to ship from their phone.",
    longDescription:
      "PocketDev packages a mobile-optimized editor, terminal, and AI assistant into a single APK. Builds are distributed via GitHub Actions artifacts so the latest model improvements ship continuously.",
    tags: ["JavaScript", "Node.js", "AI APIs", "GitHub Actions"],
    liveUrl: "https://github.com/lsgzt/pocket-codex/actions/runs/25666957796/artifacts/6917131493",
    sourceUrl: "https://github.com/lsgzt/pocket-codex",
    status: "beta",
    accent: "mixed",
  },
  {
    slug: "ai-clone",
    name: "Personal AI Clone",
    tagline: "AI trained to imitate my communication style",
    description:
      "A fine-tuned language model hosted on Hugging Face that mirrors my writing voice, vocabulary, and reasoning patterns across chat and long-form text.",
    longDescription:
      "Trained on curated samples of my own writing and chat history, the clone is exposed through a clean inference endpoint so it can be plugged into assistants, demos, and experiments.",
    tags: ["Python", "TensorFlow", "AI APIs", "Hugging Face"],
    liveUrl: "https://huggingface.co/lsgz/lsgz-personality-clone",
    sourceUrl: "https://github.com/lsgzt",
    status: "live",
    accent: "violet",
  },
  {
    slug: "tos-summarizer",
    name: "ToS Summarizer",
    tagline: "Summarizes Terms of Service using AI",
    description:
      "Paste any Terms of Service document and get a plain-English breakdown of the clauses that actually matter — data sharing, arbitration, cancellation, liability.",
    longDescription:
      "A focused utility that turns 40-page legal documents into 8 actionable bullet points. Uses retrieval-aware summarization so citations back to the original text stay trustworthy.",
    tags: ["Python", "Node.js", "AI APIs", "Express"],
    sourceUrl: "https://github.com/lsgzt",
    status: "concept",
    accent: "blue",
  },
  {
    slug: "future-1",
    name: "More on the way",
    tagline: "Reserved for the next idea",
    description:
      "I ship faster than I document. This slot is reserved for the next product — likely something at the intersection of agents, retrieval, and a real workflow people hate doing manually.",
    longDescription:
      "Reserved for future work. Placeholder kept intentionally — better to ship something real than to fill this card with vaporware.",
    tags: ["Coming soon"],
    status: "concept",
    accent: "mixed",
  },
];

export type Experiment = {
  slug: string;
  name: string;
  description: string;
  status: "active" | "exploring" | "shipped" | "planned";
  progress: number; // 0-100
};

export const EXPERIMENTS: Experiment[] = [
  {
    slug: "ai-clone",
    name: "AI Clone",
    description: "Fine-tuned model that mirrors my writing style, deployed behind a clean inference endpoint.",
    status: "shipped",
    progress: 100,
  },
  {
    slug: "voice-model",
    name: "Voice Model",
    description: "Experimenting with voice cloning for short-form narration and accessibility use cases.",
    status: "active",
    progress: 65,
  },
  {
    slug: "prompt-engineering",
    name: "Prompt Engineering",
    description: "A library of reusable, version-controlled prompt templates evaluated against real tasks.",
    status: "active",
    progress: 78,
  },
  {
    slug: "image-enhancement",
    name: "Image Enhancement",
    description: "Diffusion-based upscaling and restoration pipeline powering EnhanceIt.",
    status: "shipped",
    progress: 100,
  },
  {
    slug: "rag-experiments",
    name: "RAG Experiments",
    description: "Comparing retrieval strategies, chunking, and reranking for grounded LLM answers.",
    status: "exploring",
    progress: 42,
  },
  {
    slug: "future-ideas",
    name: "Future Ideas",
    description: "Agent workflows, on-device inference, and a few products I'm not ready to talk about yet.",
    status: "planned",
    progress: 10,
  },
];

export type Skill = {
  name: string;
  category: "Language" | "Backend" | "Frontend" | "AI / ML" | "Infra" | "Tooling";
};

export const SKILLS: Skill[] = [
  { name: "Python", category: "Language" },
  { name: "JavaScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: "Express", category: "Backend" },
  { name: "Git", category: "Tooling" },
  { name: "GitHub", category: "Tooling" },
  { name: "Cloudflare", category: "Infra" },
  { name: "Render", category: "Infra" },
  { name: "HTML", category: "Frontend" },
  { name: "CSS", category: "Frontend" },
  { name: "AI APIs", category: "AI / ML" },
  { name: "REST APIs", category: "Backend" },
  { name: "TensorFlow", category: "AI / ML" },
  { name: "MongoDB", category: "Backend" },
  { name: "Supabase", category: "Backend" },
  { name: "Docker", category: "Infra" },
  { name: "TypeScript", category: "Language" },
  { name: "Next.js", category: "Frontend" },
];

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

export const TIMELINE: TimelineItem[] = [
  {
    year: "2019",
    title: "Started programming",
    description:
      "Picked up Python out of curiosity, fell in love with the feeling of turning a blank file into something that actually does something.",
  },
  {
    year: "2021",
    title: "Built first public project",
    description:
      "Released StreamPoint as my first publicly available product. Learned the difference between code that runs on my machine and a product real people can use.",
  },
  {
    year: "2023",
    title: "Released AI applications",
    description:
      "Shipped EnhanceIt and the Personal AI Clone. Started treating models as building blocks for products rather than academic exercises.",
  },
  {
    year: "2025",
    title: "Exploring AI agents & ML",
    description:
      "Currently going deep on autonomous agents, retrieval pipelines, and on-device inference — building toward a product that does real work, not just demos.",
  },
];

export type Repo = {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
};

export const REPOS: Repo[] = [
  {
    name: "pocket-codex",
    description: "AI-powered code editor for Android with on-device assistant.",
    language: "JavaScript",
    stars: 42,
    forks: 8,
    url: "https://github.com/lsgzt/pocket-codex",
  },
  {
    name: "lsgz-personality-clone",
    description: "Fine-tuned LLM that mirrors a personal writing style.",
    language: "Python",
    stars: 27,
    forks: 5,
    url: "https://huggingface.co/lsgz/lsgz-personality-clone",
  },
  {
    name: "enhanceit",
    description: "Diffusion-based image enhancement web app.",
    language: "Python",
    stars: 35,
    forks: 6,
    url: "https://github.com/lsgzt",
  },
  {
    name: "streampoint",
    description: "Minimal directory of free streaming websites.",
    language: "HTML",
    stars: 18,
    forks: 3,
    url: "https://streampoint.pages.dev",
  },
];

export const SOCIALS = [
  { label: "GitHub", href: SITE.github, handle: "@lsgzt" },
  { label: "Email", href: `mailto:${SITE.email}`, handle: SITE.email },
  { label: "LinkedIn", href: "#", handle: "in/lovepreet-singh" },
  { label: "Hugging Face", href: SITE.huggingface, handle: "@lsgz" },
] as const;
