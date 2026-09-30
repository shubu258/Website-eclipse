import type { ReactNode } from "react";

export type Category = "Blockchain development" | "AI development" | "Custom software" | "SaaS platforms";

export type Project = {
  slug: string;
  categories: Category[];
  chip: string;
  title: string;
  desc: string;
  /** Three short lines on the card so the project reads without opening it. */
  lines: [string, string, string];
  result: string;
  resultLabel: string;
  year: string;
  /** Public URL of the shipped product; omitted for internal tools. */
  url?: string;
  art: ReactNode;
};

export const projects: Project[] = [
  {
    slug: "chainhound",
    categories: ["AI development", "Blockchain development"],
    chip: "AI × Blockchain",
    title: "ChainHound",
    desc: "AI agents that investigate wallets and trace funds across the chain",
    lines: [
      "Give it a wallet address and an investigation goal.",
      "AI agents follow the funds hop by hop across the chain.",
      "You get a risk verdict backed by the real transactions.",
    ],
    result: "Multi-hop",
    resultLabel: "fund tracing",
    year: "2026",
    url: "https://chain-hound-nu.vercel.app/",
    art: (
      <div className="project-art art-chainhound">
        <div className="layer ch-grid" data-depth="8" />
        <svg className="layer ch-trail" data-depth="24" viewBox="0 0 600 400" aria-hidden>
          <path d="M90 250 L230 150 L370 230 L510 120" />
          <path className="dash" d="M230 150 L300 60 M370 230 L450 320" />
          <circle cx="90" cy="250" r="14" />
          <circle cx="230" cy="150" r="10" />
          <circle cx="370" cy="230" r="10" />
          <circle className="risk" cx="510" cy="120" r="16" />
          <circle className="ghost" cx="300" cy="60" r="7" />
          <circle className="ghost" cx="450" cy="320" r="7" />
        </svg>
        <div className="layer ch-console" data-depth="46">
          <div className="ch-console-bar">
            <i />
            <i />
            <i />
            <span>investigation.log</span>
          </div>
          <p>
            <b>✓</b> wallet.analyze
          </p>
          <p>
            <b>✓</b> trace.hop 1 → 0x1a2b…
          </p>
          <p>
            <em>…</em> risk.score
          </p>
        </div>
        <div className="layer ch-badge" data-depth="64">
          riskScore <b>88</b> · High
        </div>
      </div>
    ),
  },
  {
    slug: "the-wire-desk",
    categories: ["AI development", "SaaS platforms"],
    chip: "AI × SaaS",
    title: "The Wire Desk",
    desc: "AI-assisted drafting, scheduling and publishing for social media",
    lines: [
      "Type one idea and AI drafts three ready-to-post versions.",
      "Edit your pick, then publish or schedule to LinkedIn, X and Instagram.",
      "It shows whether each post actually went live, not just “sent”.",
    ],
    result: "3",
    resultLabel: "platforms, one send",
    year: "2026",
    url: "https://the-wire-desk1.vercel.app/",
    art: (
      <div className="project-art art-wire">
        <div className="layer wd-masthead" data-depth="8">
          <span>Front page</span>
          <span>Late edition</span>
        </div>
        <div className="layer wd-headline" data-depth="22">
          Write it once. <em>Wire it</em> everywhere.
        </div>
        {[
          ["in", "LinkedIn", "Var A"],
          ["X", "X", "Var B"],
          ["ig", "Instagram", "Var C"],
        ].map(([icon, name, v], n) => (
          <div key={name} className={`layer wd-card c${n}`} data-depth={34 + n * 12}>
            <span className={`wd-icon ${icon}`}>{icon === "X" ? "𝕏" : icon}</span>
            <b>{name}</b>
            <small>{v}</small>
            <i />
            <i />
          </div>
        ))}
        <div className="layer wd-run" data-depth="70">
          Run the wire <span>↵ 3 variants</span>
        </div>
      </div>
    ),
  },
  {
    slug: "karishava-crm",
    categories: ["Custom software"],
    chip: "Custom CRM",
    title: "Karishava CRM",
    desc: "Custom hospital CRM for managing patient cases end to end",
    lines: [
      "One record per patient, from first referral to billing.",
      "Tracks every case through an 11-stage hospital pipeline.",
      "Separate admin and sales views with role-based access.",
    ],
    result: "11",
    resultLabel: "pipeline stages",
    year: "2026",
    art: (
      <div className="project-art art-karishava">
        <div className="layer kr-pipe" data-depth="14">
          {[1, 1, 1, 2, 0, 0, 0].map((s, i) => (
            <i key={i} className={s === 1 ? "done" : s === 2 ? "now" : ""} />
          ))}
        </div>
        <div className="layer kr-card" data-depth="40">
          <div className="kr-head">
            <span className="kr-avatar" />
            <span className="kr-lines">
              <b />
              <b />
            </span>
            <span className="kr-badge">Treatment plan shared</span>
          </div>
          {[70, 55, 80].map((w) => (
            <div key={w} className="kr-row">
              <i />
              <i style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
        <div className="layer kr-stat" data-depth="62">
          <small>Patient pipeline</small>
          <b>11 stages</b>
        </div>
      </div>
    ),
  },
  {
    slug: "atoz",
    categories: ["Custom software"],
    chip: "PropTech",
    title: "AtoZ",
    desc: "Property platform for listing and managing rentals and sales",
    lines: [
      "Owners list and update rentals and sales from one dashboard.",
      "Visitors search and filter properties by location and price.",
      "Admins moderate listings, and analytics track both sides.",
    ],
    result: "3",
    resultLabel: "apps, one backend",
    year: "2026",
    art: (
      <div className="project-art art-atoz">
        <div className="layer az-glow" data-depth="6" />
        <div className="layer az-bars" data-depth="20">
          {[40, 52, 50, 66, 82, 96].map((h, i) => (
            <span key={i}>
              <i style={{ height: `${h}%` }} />
              <i style={{ height: `${h * 0.38}%` }} />
            </span>
          ))}
        </div>
        <div className="layer az-card" data-depth="48">
          <small>Portfolio</small>
          <svg viewBox="0 0 200 60" aria-hidden>
            <path d="M0 45 C40 38 70 40 100 36 S160 18 200 10 V60 H0Z" className="fill" />
            <path d="M0 45 C40 38 70 40 100 36 S160 18 200 10" className="line" />
          </svg>
          <div className="az-split">
            <span>
              Rentals <b>●</b>
            </span>
            <span>
              Sales <b>●</b>
            </span>
          </div>
        </div>
      </div>
    ),
  },
];
