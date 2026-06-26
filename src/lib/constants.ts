import type { NavLink, Project, Service } from "@/types";

export const SITE = {
  name: "Kaihatsu Dev",
  kanji: "開発",
  mark: "開",
  tagline: "Built right, the first time.",
  domain: "https://kaihatsu.dev",
  email: "horngyarngtan@gmail.com",
  instagram: "@kaihatsu_dev",
  instagramUrl: "https://instagram.com/kaihatsu_dev",
  description:
    "Precision-built websites, web apps and digital products by a Malaysia-based web developer. Built right, the first time.",
  location: "Malaysia",
  region: "Selangor",
  backendUrl:
    process.env.NEXT_PUBLIC_BACKEND_URL ??
    "https://kaihatsuai-backend.onrender.com",
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "#services", id: "services" },
  { label: "Work", href: "#work", id: "work" },
  { label: "About", href: "#about", id: "about" },
  { label: "Kai", href: "#kai", id: "kai" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const SERVICES: Service[] = [
  {
    number: "01",
    name: "Frontend Development",
    description:
      "Pixel-precise, accessible interfaces in React and Next.js. Fast, responsive, and built to your brand — not a template.",
    keywords: "React developer Malaysia",
  },
  {
    number: "02",
    name: "Backend Systems",
    description:
      "APIs, databases, and server logic engineered for reliability. Clean architecture that scales as your business grows.",
    keywords: "web development Malaysia",
  },
  {
    number: "03",
    name: "Server-Side Support",
    description:
      "Deployment, infrastructure, and ongoing server-side support. Your stack kept secure, monitored, and online.",
    keywords: "web developer Selangor",
  },
  {
    number: "04",
    name: "Website Care Plans",
    description:
      "Retainer-based maintenance: updates, fixes, backups, and improvements. A developer on call, without the full-time cost.",
    keywords: "website maintenance Malaysia",
  },
  {
    number: "05",
    name: "Performance Optimization",
    description:
      "Core Web Vitals, load times, and bundle size — measured and tuned. Faster sites that rank better and convert more.",
    keywords: "website performance Malaysia",
  },
  {
    number: "06",
    name: "Website Migration",
    description:
      "Move off WordPress, Wix, or legacy stacks with zero downtime and no lost SEO. Migrated cleanly to a modern foundation.",
    keywords: "website migration Malaysia",
  },
];

export const WORK: Project[] = [
  {
    name: "Kai — AI Assistant",
    category: "Product / Full-Stack",
    description:
      "A streaming AI assistant that answers questions, qualifies leads, and books work — built on a custom backend with real-time SSE responses.",
    stack: ["Next.js", "TypeScript", "SSE", "Python", "LLM"],
  },
  {
    name: "Studio Commerce",
    category: "Concept / E-Commerce",
    description:
      "A headless storefront concept: sub-second loads, sharp editorial design, and a checkout tuned for conversion on mobile-first traffic.",
    stack: ["Next.js", "Headless CMS", "Stripe", "Edge"],
  },
  {
    name: "Precision Portfolio",
    category: "Concept / Marketing",
    description:
      "An immersive marketing site with 3D motion, scroll-driven storytelling, and a 95+ Lighthouse score — proof that fast and beautiful coexist.",
    stack: ["Three.js", "GSAP", "Framer Motion", "Vercel"],
  },
];
