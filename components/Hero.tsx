import Link from "next/link";
import { BOOK_CALL_HREF } from "./contact";
import { Arrow } from "./Icons";

const icon = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6 };

// how many pieces each card's live animation is drawn with (see .viz-* in globals.css)
const vizParts = { chain: 4, chat: 3, code: 3, bars: 6 };

const boxes: {
  n: string;
  title: string;
  desc: string;
  href: string;
  viz: keyof typeof vizParts;
  icon: React.ReactNode;
}[] = [
  {
    n: "01",
    title: "Blockchain",
    desc: "Smart contracts, dApps, L2",
    href: "#blockchain",
    viz: "chain",
    icon: (
      <svg {...icon} strokeLinejoin="round">
        <path d="M12 3 20 7.5v9L12 21l-8-4.5v-9z" />
        <path d="M4 7.5 12 12l8-4.5M12 12v9" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "AI",
    desc: "Agents, RAG, automation",
    href: "#ai",
    viz: "chat",
    icon: (
      <svg {...icon} strokeLinejoin="round">
        <path d="M12 3c.8 4.6 2.4 6.2 7 7-4.6.8-6.2 2.4-7 7-.8-4.6-2.4-6.2-7-7 4.6-.8 6.2-2.4 7-7z" />
        <path d="M19 15.5c.3 1.6.9 2.2 2.5 2.5-1.6.3-2.2.9-2.5 2.5-.3-1.6-.9-2.2-2.5-2.5 1.6-.3 2.2-.9 2.5-2.5z" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Custom software",
    desc: "Web, mobile, internal tools",
    href: "#custom",
    viz: "code",
    icon: (
      <svg {...icon} strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />
      </svg>
    ),
  },
  {
    n: "04",
    title: "SaaS",
    desc: "Multi-tenant, billing, scale",
    href: "#saas",
    viz: "bars",
    icon: (
      <svg {...icon} strokeLinejoin="round">
        <path d="M12 4 21 8.5 12 13 3 8.5z" />
        <path d="m3 12.5 9 4.5 9-4.5M3 16.5 12 21l9-4.5" />
      </svg>
    ),
  },
];

export default function Hero() {
  return (
    <section className="hero" id="top" data-nav="solid">
      <div className="hero-glow" aria-hidden />

      <div className="wrap hero-content">
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow">Senior engineering studio</span>
          <h1>
            <span className="line">
              <span style={{ "--i": 0 } as React.CSSProperties}>The only</span>
            </span>
            <span className="line">
              <span style={{ "--i": 1 } as React.CSSProperties}>
                <span className="serif">copilot</span> you will
              </span>
            </span>
            <span className="line">
              <span style={{ "--i": 2 } as React.CSSProperties}>ever need.</span>
            </span>
          </h1>

          <div className="hero-lede">
            Blockchain, AI, custom software and SaaS, built by senior engineers who join your team in days,
            not quarters. No hiring delays, no agency overhead.
            <div className="hero-actions">
              <a href={BOOK_CALL_HREF} className="btn">
                Book a call
                <span className="btn-dot">
                  <Arrow />
                </span>
              </a>
              <Link href="/portfolio" className="btn btn-ghost">
                See our work
              </Link>
            </div>
          </div>
        </div>

        <nav className="hero-boxes" aria-label="What we build">
          {boxes.map((b, i) => (
            <a key={b.n} href={b.href} className="hero-box" style={{ "--i": i } as React.CSSProperties}>
              <span className="hero-box-top">
                <span className="hero-box-icon" aria-hidden>
                  {b.icon}
                </span>
                <span className={`viz viz-${b.viz}`} aria-hidden>
                  {Array.from({ length: vizParts[b.viz] }, (_, k) => (
                    <i key={k} style={{ "--k": k } as React.CSSProperties} />
                  ))}
                </span>
              </span>
              <strong>{b.title}</strong>
              <span className="hero-box-desc">{b.desc}</span>
              <span className="hero-box-go" aria-hidden>
                <Arrow size={14} />
              </span>
            </a>
          ))}
        </nav>
      </div>
      <div className="scroll-cue" aria-hidden />
    </section>
  );
}
