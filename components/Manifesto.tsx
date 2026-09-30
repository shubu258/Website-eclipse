"use client";

import { useEffect, useRef } from "react";

const TEXT =
  "We're a small, senior team that plugs straight into yours. No six-month hiring cycles, no bloated agency retainers, just engineers who own the outcome from first commit to *production* and stay for what comes after.";

export default function Manifesto() {
  const textRef = useRef<HTMLParagraphElement>(null);

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
      </div>
    </section>
  );
}
