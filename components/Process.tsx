"use client";

import { useEffect, useRef } from "react";

const phases = [
  {
    label: "First contact",
    title: "Discover",
    body: "We map the problem, the users and the constraints, then hand you a scoped plan with a fixed estimate.",
    dur: "Week 1",
    from: "-110%",
    to: "-62%",
  },
  {
    label: "Second contact",
    title: "Architect",
    body: "System design, stack choices and a clickable prototype, reviewed with your team before we write code.",
    dur: "Week 2–3",
    from: "-62%",
    to: "-28%",
  },
  {
    label: "Totality",
    title: "Build",
    body: "Two-week sprints, demos every Friday and production-grade code from day one. You see every commit.",
    dur: "Week 3+",
    from: "-28%",
    to: "0%",
    totality: true,
  },
  {
    label: "Third contact",
    title: "Launch & scale",
    body: "Hardened release, monitoring and handover. Or we stay on and scale the team as you grow.",
    dur: "Ongoing",
    from: "0%",
    to: "55%",
  },
];

export default function Process() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>(".phase"));
    const track = el.querySelector<HTMLElement>(".timeline-track");
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(Math.max((vh * 0.75 - r.top) / (r.height * 0.9), 0), 1);
      track?.style.setProperty("--p", String(p));
      items.forEach((it) => {
        const top = it.getBoundingClientRect().top;
        const narrow = window.innerWidth <= 1080;
        const threshold = narrow ? top < vh * 0.7 : p > Number(it.dataset.i) / items.length + 0.02;
        it.classList.toggle("active", threshold);
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="process" id="process">
      <div className="wrap">
        <div className="process-head">
          <h2 className="section-title reveal">
            How an engagement
            <br />
            <span className="serif">unfolds.</span>
          </h2>
          <p className="reveal">
            Every eclipse has four contacts. So does every Eclipse project, with the same precision and nothing
            left to chance.
          </p>
        </div>

        <div className="timeline" ref={root}>
          <div className="timeline-track" aria-hidden>
            <i />
          </div>
          {phases.map((ph, i) => (
            <div
              key={ph.title}
              data-i={i}
              className={`phase${ph.totality ? " totality" : ""}`}
              style={{ "--from": ph.from, "--to": ph.to } as React.CSSProperties}
            >
              <div className="phase-icon" aria-hidden>
                <div className="sun">
                  <div className="moon" />
                </div>
              </div>
              <span className="phase-label">
                0{i + 1} · {ph.label}
              </span>
              <h3>{ph.title}</h3>
              <p>{ph.body}</p>
              <span className="dur">{ph.dur}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
