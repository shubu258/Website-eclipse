"use client";

import Link from "next/link";
import { useRef, type PointerEvent } from "react";
import type { Project } from "./projects";

export default function TiltCard({ p, reveal = true }: { p: Project; reveal?: boolean }) {
  const inner = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse" || !inner.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    inner.current.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    inner.current.querySelectorAll<HTMLElement>("[data-depth]").forEach((l) => {
      const d = Number(l.dataset.depth);
      l.style.transform = `translate3d(${x * d * 0.6}px, ${y * d * 0.6}px, ${d}px)`;
    });
  };

  const onLeave = () => {
    if (!inner.current) return;
    inner.current.style.transform = "";
    inner.current.querySelectorAll<HTMLElement>("[data-depth]").forEach((l) => (l.style.transform = ""));
  };

  return (
    <Link
      href="/portfolio"
      className={`project ${reveal ? "reveal" : "fade-up"}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div className="project-inner" ref={inner}>
        <div style={{ position: "relative" }}>
          <span className="project-chip">{p.chip}</span>
          {p.art}
        </div>
        <div className="project-meta">
          <div>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
          </div>
          <div className="project-result">
            <b>{p.result}</b>
            <span>{p.resultLabel}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
