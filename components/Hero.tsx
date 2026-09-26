import Link from "next/link";
import EclipseScene from "./EclipseScene";
import { Arrow } from "./Icons";

const practices = [
  { n: "01", label: "Blockchain development", href: "#blockchain" },
  { n: "02", label: "AI development", href: "#ai" },
  { n: "03", label: "Custom software", href: "#custom" },
  { n: "04", label: "SaaS platforms", href: "#saas" },
];

const boxes = [
  { n: "01", title: "Blockchain", desc: "Smart contracts, dApps, L2", href: "#blockchain" },
  { n: "02", title: "AI", desc: "Agents, RAG, automation", href: "#ai" },
  { n: "03", title: "Custom software", desc: "Web, mobile, internal tools", href: "#custom" },
  { n: "04", title: "SaaS", desc: "Multi-tenant, billing, scale", href: "#saas" },
];

export default function Hero() {
  return (
    <section className="hero" id="top">
      <EclipseScene />
      <div className="hero-vignette" />

      <div className="hero-meta" aria-hidden>
        Totality <b>—</b> 00:00:00
        <br />
        Obscuration <b>99.8%</b>
        <br />
        Engagements open · Q4 2026
      </div>

      <div className="wrap hero-content">
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

        <nav className="hero-boxes" aria-label="What we build">
          {boxes.map((b, i) => (
            <a key={b.n} href={b.href} className="hero-box" style={{ "--i": i } as React.CSSProperties}>
              <span className="hero-box-n">{b.n}</span>
              <strong>{b.title}</strong>
              <span>{b.desc}</span>
            </a>
          ))}
        </nav>
        <div className="hero-row">
          <div className="hero-lede">
            Blockchain, AI, custom software and SaaS, built by senior engineers who join your team in days,
            not quarters. No hiring delays, no agency overhead.
            <div className="hero-actions">
              <a href="#book" className="btn">
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

          <nav className="hero-practices" aria-label="Practices">
            {practices.map((p) => (
              <a key={p.n} href={p.href}>
                <i>{p.n}</i>
                {p.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div className="scroll-cue" aria-hidden />
    </section>
  );
}
