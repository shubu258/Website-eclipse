"use client";

import { useEffect, useRef } from "react";

const TEXT =
  "We're a small, senior team that plugs straight into yours. No six-month hiring cycles, no bloated agency retainers, just engineers who own the outcome from first commit to *production* and stay for what comes after.";

const stats = [
  { value: 120, suffix: "+", label: "Products shipped across four continents" },
  { value: 9, suffix: "d", label: "Median time from first call to first commit" },
  { value: 97, suffix: "%", label: "Of clients extend beyond the first engagement" },
  { value: 40, suffix: "+", label: "Senior engineers, avg. 9 years experience" },
];

export default function Manifesto() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // light up words as the paragraph scrolls through the viewport
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLSpanElement>(".w"));
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(Math.max((vh * 0.85 - r.top) / (r.height + vh * 0.35), 0), 1);
      const lit = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle("on", i < lit));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // count stats up once
  useEffect(() => {
    const root = statsRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        root.querySelectorAll<HTMLElement>("[data-count]").forEach((node) => {
          const end = Number(node.dataset.count);
          const start = performance.now();
          const step = (now: number) => {
            const k = Math.min((now - start) / 1600, 1);
            node.textContent = String(Math.round(end * (1 - Math.pow(1 - k, 4))));
            if (k < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.4 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section className="manifesto" id="why">
      <div className="wrap">
        <div className="manifesto-grid">
          <span className="eyebrow reveal">Why Eclipse</span>
          <p className="manifesto-text" ref={textRef}>
            {TEXT.split(" ").map((word, i) => {
              const accent = word.startsWith("*");
              const clean = word.replace(/\*/g, "");
              return (
                <span key={i} className={`w${accent ? " serif" : ""}`}>
                  {clean}{" "}
                </span>
              );
            })}
          </p>
        </div>

        <div className="stats" ref={statsRef}>
          {stats.map((s, i) => (
            <div className="stat reveal" key={s.label} style={{ "--d": `${i * 0.08}s` } as React.CSSProperties}>
              <div className="stat-num">
                <span data-count={s.value}>{s.value}</span>
                <sup>{s.suffix}</sup>
              </div>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
