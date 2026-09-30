import hero from "@/public/work/the-wire-desk/hero.png";
import sections from "@/public/work/the-wire-desk/sections.png";
import tryTheDesk from "@/public/work/the-wire-desk/try-the-desk.png";
import type { CaseStudy } from "./types";

export const wiredesk: CaseStudy = {
  slug: "the-wire-desk",
  accent: "#0e5a36",
  tagline: "Write one post idea, get three AI drafts, and publish to LinkedIn, X and Instagram.",
  summary:
    "The Wire Desk is a social media workspace for writing, scheduling and publishing posts. An AI copilot turns one idea into three drafts. You pick one and edit it, then publish it now or schedule it for later, all in one place.",
  facts: [
    { k: "Industry", v: "Social media · Creator tools" },
    { k: "What we did", v: "Product design, AI workflow, full-stack build" },
    { k: "Stack", v: "Next.js, Express, MongoDB, Mistral" },
    { k: "Year", v: "2026" },
  ],
  hero: { src: hero, alt: "The Wire Desk home page: Write it once. Wire it everywhere." },
  sections: [
    {
      label: "The challenge",
      title: "Writing the post is the easy part.",
      body: [
        "Posting regularly means finding a topic, writing it, adapting it, scheduling it, connecting accounts and checking it actually went out, usually across several tools. AI speeds up the writing, but it can also fail: providers go down or credits run out.",
        "A quieter problem is that an app processing a post doesn't prove the platform published it.",
      ],
      items: [
        { t: "Too many tools", d: "Drafts, schedules and accounts spread across different apps." },
        { t: "AI can fail", d: "An outage or empty credit balance shouldn't block the work." },
        { t: "“Sent” isn't “live”", d: "Users need to know if the platform really accepted the post." },
      ],
    },
    {
      label: "Our solution",
      title: "An AI assistant, not an autopilot.",
      body: [
        "The Wire Desk puts writing, scheduling and publishing in one workflow. The AI gets a structured brief (topic, platform, tone and audience) and returns three options. Nothing is published until a person has reviewed and approved it.",
      ],
      quote: "AI writes the options. A person always decides what goes out.",
    },
    {
      label: "How it works",
      title: "From idea to published in five steps.",
      steps: [
        "Brief it: topic, platform, tone and audience",
        "Pick one of three AI-written drafts",
        "Edit it in your own voice and add media",
        "Publish now or schedule it for later",
        "See whether each platform accepted the post",
      ],
      shots: [{ src: tryTheDesk, alt: "The brief form with tone options and three generated variants with platform character meters", caption: "Change the brief, pick a tone and run. Meters track each platform's character limit live." }],
    },
    {
      label: "Reliability",
      title: "Built to handle failure out in the open.",
      items: [
        { t: "Credit checks first", d: "Each AI request checks the user's monthly credits before calling the model." },
        { t: "Refund on failure", d: "If the provider fails after charging, the credit is refunded automatically." },
        { t: "Template fallback", d: "With no credits left, a labelled template draft keeps the workflow moving." },
        { t: "Real delivery status", d: "Each post stores the app's status and the platform's answer separately." },
      ],
    },
    {
      label: "Scheduling",
      title: "Set the date and forget it.",
      body: [
        "A background scheduler checks for due posts every 60 seconds and publishes them through the same service as instant posts. An optional auto-refresh writes fresh copy just before a post goes live. Each of LinkedIn, X and Instagram has its own service, because each has different login and content rules.",
      ],
      shots: [{ src: sections, alt: "Product sections: drafting, scheduling, publishing, credits and the outbound queue", caption: "Drafting, scheduling, publishing and credits, with a live outbound queue." }],
    },
    {
      label: "Security",
      title: "Account secrets stay on the server.",
      items: [
        { t: "Encrypted tokens", d: "Social access and refresh tokens are encrypted with AES-256-GCM." },
        { t: "Never exposed", d: "API responses never include token values." },
        { t: "Hashed passwords", d: "Passwords are hashed with bcrypt, and routes are protected with JWT." },
        { t: "User-scoped", d: "Every post operation is limited to the signed-in user." },
      ],
    },
    {
      label: "Tech stack",
      title: "Built with",
      stack: [
        ["Frontend", "Next.js, React, TypeScript, Tailwind CSS"],
        ["Backend", "Node.js, Express"],
        ["Database", "MongoDB, Mongoose"],
        ["AI", "Mistral API"],
        ["Security", "JWT, bcrypt, AES-256-GCM"],
        ["Integrations", "LinkedIn, X (OAuth 2.0 + PKCE), Meta / Instagram"],
      ],
    },
    {
      label: "What's next",
      title: "Honest trade-offs and the next edition.",
      body: [
        "The 60-second scheduler is simple and suits the current scale. Larger deployments would need a job queue with retries. Posts sent to several platforms currently share the same copy, and media is added by URL. Next up are per-platform AI drafts, media uploads, publishing analytics and team approvals.",
      ],
    },
  ],
};
