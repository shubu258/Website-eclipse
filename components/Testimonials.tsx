"use client";

import { useState } from "react";
import { Arrow } from "./Icons";

// Placeholder feedback — replace with real client quotes.
const quotes = [
  {
    quote:
      "Takksh shipped our settlement contracts in eleven weeks, and they cleared two external audits with zero critical findings. It felt like they'd been on our team for years.",
    name: "Maya Richter",
    role: "CTO",
    company: "Ledgerline",
    service: "Blockchain development",
  },
  {
    quote:
      "We'd burned six months with an agency. Takksh had an AI agent triaging our support queue in three weeks, and it's still the most reliable system we run.",
    name: "Daniel Okafor",
    role: "VP Operations",
    company: "Brightline Retail",
    service: "AI development",
  },
  {
    quote:
      "What stood out was the honesty. They told us which parts didn't need AI at all, and the parts that did now save our legal team thirty hours a week.",
    name: "Priya Nair",
    role: "General Counsel",
    company: "Penumbra",
    service: "AI development",
  },
  {
    quote:
      "Senior people, weekly demos and no surprises on the invoice. Our booking app launched on time and we've extended the engagement twice since.",
    name: "Tom Castellanos",
    role: "Founder",
    company: "Corona Health",
    service: "Custom software",
  },
];

const initials = (n: string) =>
  n
    .split(" ")
    .map((w) => w[0])
    .join("");

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const q = quotes[active];

  const go = (i: number) => setActive((i + quotes.length) % quotes.length);

  // progress bar's animationend drives auto-advance; skipped under reduced motion
  const onProgressEnd = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    go(active + 1);
  };

  return (
    <section className="testimonials" id="feedback">
      <div className="wrap">
        <div className="t-head">
          <span className="eyebrow reveal">Client feedback</span>
          <h2 className="section-title reveal" style={{ marginTop: 20 }}>
            Don&apos;t take <span className="serif">our</span>
            <br />
            word for it.
          </h2>
        </div>

        <div
          className="t-grid reveal"
          data-paused={paused}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <figure className="t-card">
            <div className="t-ring" aria-hidden />
            <span className="t-mark" aria-hidden>
              &ldquo;
            </span>
            <blockquote key={active} className="t-quote">
              {q.quote}
            </blockquote>
            <figcaption key={`c-${active}`} className="t-caption">
              <span className="t-avatar" aria-hidden>
                {initials(q.name)}
              </span>
              <span>
                <b>{q.name}</b>
                {q.role}, {q.company}
              </span>
              <span className="tag">{q.service}</span>
            </figcaption>
            <div className="t-controls">
              <button aria-label="Previous testimonial" onClick={() => go(active - 1)} style={{ rotate: "180deg" }}>
                <Arrow />
              </button>
              <span className="mono">
                0{active + 1} / 0{quotes.length}
              </span>
              <button aria-label="Next testimonial" onClick={() => go(active + 1)}>
                <Arrow />
              </button>
            </div>
          </figure>

          <ul className="t-list" aria-label="Clients">
            {quotes.map((c, i) => (
              <li key={c.name}>
                <button className={i === active ? "on" : ""} onClick={() => go(i)} aria-pressed={i === active}>
                  <span className="t-avatar" aria-hidden>
                    {initials(c.name)}
                  </span>
                  <span className="t-who">
                    <b>{c.company}</b>
                    {c.name} · {c.role}
                  </span>
                  <span className="t-progress" aria-hidden>
                    {i === active && <i key={active} onAnimationEnd={onProgressEnd} />}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
