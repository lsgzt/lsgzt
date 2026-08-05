/**
 * Central content file for the LSGZ portfolio.
 * Keeping copy + project/experiment/skill metadata in one place
 * makes future edits (new project, status change, etc.) trivial.
 */

export const SITE = {
  name: "Lovepreet Singh",
  alias: "LSGZ",
  role: "AI Product Builder",
  email: "lovepreet.singh.dev@gmail.com",
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
  { label: "Monthly Active Users", value: 200, suffix: "+", description: "On EnhanceIt alone" },
  { label: "Registered Users", value: 1000, suffix: "+", description: "Across live products" },
  { label: "Bot Users", value: 1000, suffix: "+", description: "Telegram bot reached organically" },
  { label: "Products Shipped", value: 3, description: "EnhanceIt · StreamPoint · PocketDev" },
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
  // Richer content from myProducts.txt
  detailedHeading: string;
  detailedDescription: string;
  builtList: string[];
  stack: string[];
  quote: string;
  stats?: { label: string; value: string }[];
};

export const PROJECTS: Project[] = [
  {
    slug: "enhanceit",
    name: "EnhanceIt",
    tagline: "Give your photos a second life.",
    description:
      "An AI-powered image enhancement tool that restores clarity and detail in old, blurry, and low-quality photos—with a simple upload-and-enhance experience.",
    longDescription:
      "EnhanceIt started with a simple idea: improving a bad photo shouldn't require knowing anything about image processing. Upload an image, let the enhancement pipeline handle the work, and compare the result.",
    detailedHeading: "EnhanceIt — AI Image Enhancement, Without the Complexity",
    detailedDescription:
      "Behind that simple interaction is an image-processing workflow built around AI restoration models and external inference infrastructure. I worked through deployment limitations, API behavior, image retrieval, processing states, failures, and the UI needed to make all of that feel like one seamless product. Today, EnhanceIt serves 200+ monthly active users with over 1000 registered users.",
    builtList: [
      "AI-powered photo enhancement and restoration",
      "Before/after comparison experience",
      "Image upload and processing workflow",
      "CodeFormer-based restoration",
      "Hugging Face / Gradio integration",
      "Python backend",
      "Error and processing-state handling",
      "Responsive interface",
      "Analytics and SEO",
      "Public deployment on Render",
    ],
    stack: ["Python", "CodeFormer", "Hugging Face", "Gradio", "HTML", "CSS", "JavaScript", "Render"],
    quote: "What began as an image-processing experiment became a tool people actually use.",
    tags: ["AI", "Image Processing", "Web App"],
    liveUrl: "https://enhanceit.onrender.com",
    sourceUrl: "https://github.com/lsgzt",
    status: "live",
    accent: "violet",
    stats: [
      { label: "Monthly Active Users", value: "200+" },
      { label: "Registered Users", value: "1000+" },
      { label: "Status", value: "Live" },
    ],
  },
  {
    slug: "streampoint",
    name: "StreamPoint",
    tagline: "Your starting point for streaming.",
    description:
      "A fast, minimal directory for discovering third-party movie and anime streaming platforms—all organized in one place.",
    longDescription:
      "The internet has plenty of streaming websites. Finding the right one is the annoying part. I built StreamPoint as a lightweight navigation layer that organizes third-party streaming destinations into one simple interface.",
    detailedHeading: "StreamPoint — Finding Where to Watch Shouldn't Be the Hard Part",
    detailedDescription:
      "It doesn't host media itself. Instead, it focuses on discovery—giving users a cleaner starting point before they leave for the service they want. The project became particularly meaningful when people around me stopped calling it \"your streaming website\" and simply started calling it StreamPoint.",
    builtList: [
      "Streaming-platform directory",
      "Movie and anime categories",
      "Fast navigation between sources",
      "Search/discovery-oriented interface",
      "Responsive mobile experience",
      "Dark cinematic visual identity",
      "Custom StreamPoint branding",
      "Public deployment",
    ],
    stack: ["HTML", "CSS", "JavaScript", "Cloudflare Pages"],
    quote: "One place. Many destinations. That's StreamPoint.",
    tags: ["Web", "Discovery", "Entertainment"],
    liveUrl: "https://streampoint.pages.dev",
    sourceUrl: "https://github.com/lsgzt",
    status: "live",
    accent: "blue",
    stats: [
      { label: "Status", value: "Live" },
    ],
  },
  {
    slug: "pocketdev",
    name: "PocketDev AI",
    tagline: "Development shouldn't require a desk.",
    description:
      "A mobile-first AI coding environment designed to make writing, understanding, debugging, and working with code practical directly from an Android device.",
    longDescription:
      "PocketDev AI came from a problem I understand personally: building software without always having access to a traditional desktop development setup. Phones are incredibly capable computers, yet most development tools still assume you're sitting in front of a laptop.",
    detailedHeading: "PocketDev AI — A Development Environment That Fits in Your Pocket",
    detailedDescription:
      "I constantly found myself generating code with AI, copying it, switching to an Android code editor, pasting it, testing it, returning to the AI, and repeating the process. Android had code editors. AI coding tools existed. But I couldn't find an Android editor that combined the two in the way I wanted. So PocketDev became my attempt at building one. Rather than squeezing a desktop IDE onto a small screen, the goal is to make AI part of the editor itself—helping write, understand, debug and work with code in an interface designed around a phone.",
    builtList: [
      "Mobile-first code editing",
      "Smart inline AI suggestions",
      "AI code generation",
      "AI-powered bug detection",
      "Code explanation",
      "Automatic debugging and fixing",
      "AI-assisted autocomplete",
      "Swipe-to-accept suggestions",
      "Partial swipe for multiline completions",
      "Android-focused touch interactions",
      "GitHub-oriented development workflow",
    ],
    stack: ["Android", "AI APIs", "JavaScript", "GitHub Actions"],
    quote: "Some of my own projects were built from a phone. PocketDev asks how much better that experience could become.",
    tags: ["Developer Tools", "AI", "Android"],
    liveUrl: "https://github.com/lsgzt/pocket-codex/actions/runs/25666957796/artifacts/6917131493",
    sourceUrl: "https://github.com/lsgzt/pocket-codex",
    status: "beta",
    accent: "mixed",
    stats: [
      { label: "Status", value: "In Development" },
    ],
  },
];

export type Experiment = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  tags: string[];
  status: "active" | "exploring" | "shipped" | "planned" | "archived";
  progress: number; // 0-100
  link?: string;
  linkLabel?: string;
  exploredList?: string[];
  quote?: string;
  category: "experiment" | "lab";
};

export const EXPERIMENTS: Experiment[] = [
  // --- Experiments (bigger, more detailed) ---
  {
    slug: "personality-clone",
    name: "LSGZ Personality Clone",
    tagline: "What if an AI could sound a little more like me?",
    description:
      "An experimental conversational AI designed to reproduce elements of my communication style, preferences, and personality instead of behaving like a generic assistant.",
    longDescription:
      "Most AI assistants are deliberately generic. I wanted to experiment with something different: whether an AI could maintain a recognizable communication style and personality. I collected conversational data, explored base-model selection, training, epochs and loss, and eventually trained a model around patterns from my own conversations. It wasn't intended to become another general-purpose chatbot. It was an experiment in making interaction itself part of the model experience.",
    tags: ["LLM", "Personality", "Model Training"],
    status: "shipped",
    progress: 100,
    link: "https://huggingface.co/lsgz/lsgz-personality-clone",
    linkLabel: "View Experiment",
    exploredList: [
      "Model training",
      "Conversational datasets",
      "LLM behavior",
      "Persistent conversational characteristics",
      "Persona construction",
      "Customized response style",
      "Hugging Face deployment",
      "Personalized AI interaction",
    ],
    quote: "The experiment wasn't just about what an AI says—it was about whether how it says it could become recognizable.",
    category: "experiment",
  },
  {
    slug: "learn-with-kia",
    name: "Learn With Kia",
    tagline: "An AI learning companion built around asking questions naturally.",
    description:
      "An educational AI assistant exploring conversational learning, multimodal input, voice interaction, and accessible AI for students.",
    longDescription:
      "Learn With Kia grew out of my earlier chatbot experiments and became an exploration of how conversational AI could support students, particularly where access to educational resources may be limited. Instead of limiting interaction to typed questions, the concept explored multiple ways for students to communicate with an assistant. The project also became a testing ground for ideas that later influenced how I approached other AI products.",
    tags: ["AI", "Education", "Multimodal"],
    status: "exploring",
    progress: 60,
    exploredList: [
      "Conversational question answering",
      "Image understanding",
      "Voice input",
      "Multilingual interaction",
      "Educational assistance",
      "Telegram integration",
      "Online and local LLM approaches",
    ],
    quote: "Sometimes a prototype is valuable not because it becomes the final product, but because of everything it teaches you to build next.",
    category: "experiment",
  },

  // --- Lab (smaller, more focused experiments) ---
  {
    slug: "conversational-ai",
    name: "Conversational AI",
    tagline: "Learning how AI conversations work by building them.",
    description:
      "A collection of Telegram-based AI experiments exploring conversation memory, multimodal input, group interactions, custom personas, voice recognition, and different LLM providers.",
    longDescription:
      "A collection of Telegram-based AI experiments exploring conversation memory, multimodal input, group interactions, custom personas, voice recognition, and different LLM providers.",
    tags: ["Telegram Bot API", "Python", "Flask", "Groq", "LLM APIs", "Memory", "Vision", "Speech"],
    status: "shipped",
    progress: 100,
    category: "lab",
  },
  {
    slug: "local-llms",
    name: "Local LLMs",
    tagline: "How much AI can you run on a phone?",
    description:
      "Experiments with running language models locally on Android through Termux, Ollama, llama.cpp, and GGUF models—including Qwen2.5 0.5B—to understand what useful offline AI looks like under tight hardware constraints.",
    longDescription:
      "Experiments with running language models locally on Android through Termux, Ollama, llama.cpp, and GGUF models—including Qwen2.5 0.5B—to understand what useful offline AI looks like under tight hardware constraints.",
    tags: ["Ollama", "llama.cpp", "GGUF", "Qwen", "Termux", "On-device AI"],
    status: "active",
    progress: 70,
    category: "lab",
  },
  {
    slug: "voice-ai-rvc",
    name: "Voice AI / RVC",
    tagline: "Experiments in teaching machines a voice.",
    description:
      "Explored Retrieval-based Voice Conversion, model training, datasets, speech processing, and AI voice pipelines—including training a custom RVC voice model.",
    longDescription:
      "Explored Retrieval-based Voice Conversion, model training, datasets, speech processing, and AI voice pipelines—including training a custom RVC voice model.",
    tags: ["RVC", "Voice Conversion", "Model Training", "Audio Processing"],
    status: "active",
    progress: 55,
    category: "lab",
  },
  {
    slug: "generative-image-lab",
    name: "Generative Image Lab",
    tagline: "Pixels, models, APIs and lots of failed requests.",
    description:
      "Experiments across generative-image and restoration models, Hugging Face Spaces, Stable Diffusion/SDXL workflows, CodeFormer and image-processing APIs. Some of this experimentation eventually evolved into EnhanceIt.",
    longDescription:
      "Experiments across generative-image and restoration models, Hugging Face Spaces, Stable Diffusion/SDXL workflows, CodeFormer and image-processing APIs. Some of this experimentation eventually evolved into EnhanceIt.",
    tags: ["Stable Diffusion", "SDXL", "CodeFormer", "Hugging Face", "Image Processing"],
    status: "shipped",
    progress: 100,
    category: "lab",
  },
  {
    slug: "tos-summarizer",
    name: "Terms of Service Summarizer",
    tagline: "Making the text nobody reads easier to understand.",
    description:
      "An experimental tool for turning lengthy Terms of Service documents into shorter, understandable summaries using AI. Archived after reliability limitations made it unsuitable for the level of accuracy I wanted.",
    longDescription:
      "An experimental tool for turning lengthy Terms of Service documents into shorter, understandable summaries using AI. Archived after reliability limitations made it unsuitable for the level of accuracy I wanted.",
    tags: ["AI", "Text Processing", "Summarization"],
    status: "archived",
    progress: 40,
    category: "lab",
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
  { label: "LinkedIn", href: "https://in.linkedin.com/in/lovepreet-singh-3b3588287", handle: "in/lovepreet-singh-3b3588287" },
  { label: "Hugging Face", href: SITE.huggingface, handle: "@lsgz" },
] as const;
