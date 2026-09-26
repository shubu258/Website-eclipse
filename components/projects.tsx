import type { ReactNode } from "react";

export type Category = "Blockchain development" | "AI development" | "Custom software" | "SaaS platforms";

export type Project = {
  slug: string;
  category: Category;
  chip: string;
  title: string;
  desc: string;
  result: string;
  resultLabel: string;
  year: string;
  art: ReactNode;
};

// Placeholder case studies — replace with real client work.
export const projects: Project[] = [
  {
    slug: "ledgerline",
    category: "Blockchain development",
    chip: "Blockchain development",
    title: "Ledgerline",
    desc: "Tokenized invoice settlement on an EVM L2",
    result: "$2.1B",
    resultLabel: "settled",
    year: "2026",
    art: (
      <div className="project-art art-ledger">
        <div className="layer grid" data-depth="10" />
        <div className="layer ring" data-depth="20" />
        <div className="layer ring r2" data-depth="40" />
        <div className="layer ring r3" data-depth="60" />
      </div>
    ),
  },
  {
    slug: "halo",
    category: "SaaS platforms",
    chip: "SaaS platforms",
    title: "Halo",
    desc: "Revenue analytics SaaS for B2B sales teams",
    result: "+38%",
    resultLabel: "win rate",
    year: "2025",
    art: (
      <div className="project-art art-halo">
        <div className="layer panel p1" data-depth="25">
          <div className="bar o" style={{ width: "40%" }} />
          <div className="bar" style={{ width: "80%" }} />
          <div className="bar" style={{ width: "65%" }} />
          <div className="chart">
            {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
              <i key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="layer panel p2" data-depth="55">
          <div className="bar o" style={{ width: "60%" }} />
          <div className="bar" />
          <div className="bar" style={{ width: "70%" }} />
          <div className="bar" style={{ width: "50%" }} />
        </div>
      </div>
    ),
  },
  {
    slug: "penumbra",
    category: "AI development",
    chip: "AI development",
    title: "Penumbra",
    desc: "Contract intelligence for in-house legal teams",
    result: "11×",
    resultLabel: "faster review",
    year: "2025",
    art: (
      <div className="project-art art-penumbra">
        {["d1", "d2", "d3"].map((d, n) => (
          <div key={d} className={`layer doc ${d}`} data-depth={20 + n * 18}>
            <i />
            <i style={{ width: "80%" }} />
            <i className={n === 1 ? "hl" : ""} />
            <i style={{ width: "60%" }} />
            <i />
            <i className={n === 2 ? "hl" : ""} style={{ width: "75%" }} />
          </div>
        ))}
      </div>
    ),
  },
  {
    slug: "corona-health",
    category: "Custom software",
    chip: "Custom software",
    title: "Corona Health",
    desc: "Patient scheduling app across 60 clinics",
    result: "1.4M",
    resultLabel: "bookings / yr",
    year: "2024",
    art: (
      <div className="project-art art-corona">
        <div className="layer orb" data-depth="15" />
        <div className="layer phone" data-depth="45">
          <i />
          <i />
          <i />
          <i style={{ height: "12%" }} />
        </div>
      </div>
    ),
  },
  {
    slug: "vesper",
    category: "AI development",
    chip: "AI development",
    title: "Vesper",
    desc: "Voice agent handling inbound support calls",
    result: "72%",
    resultLabel: "calls resolved",
    year: "2024",
    art: (
      <div className="project-art art-vesper">
        <div className="layer wave" data-depth="35">
          {[18, 34, 52, 70, 88, 64, 96, 72, 50, 80, 58, 36, 22].map((h, i) => (
            <i key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="layer badge" data-depth="60">
          <span className="live-dot" /> live call · 00:42
        </div>
      </div>
    ),
  },
  {
    slug: "meridian",
    category: "Blockchain development",
    chip: "Blockchain development",
    title: "Meridian",
    desc: "Cross-chain bridge with zero-knowledge proofs",
    result: "0",
    resultLabel: "exploits to date",
    year: "2023",
    art: (
      <div className="project-art art-meridian">
        {[0, 1, 2, 3].map((n) => (
          <div key={n} className={`layer cube-tile t${n}`} data-depth={15 + n * 14} />
        ))}
      </div>
    ),
  },
];
