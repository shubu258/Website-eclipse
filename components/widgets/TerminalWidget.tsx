"use client";

import { useState } from "react";
import { useInView, useInterval } from "../hooks";

type Line = { text: string; cls?: string };

const script: Line[] = [
  { text: "$ eclipse release v2.14 --env production", cls: "t-acc" },
  { text: "› type-check ............... ok", cls: "t-dim" },
  { text: "› 1,284 tests passed  (0 failed)", cls: "t-ok" },
  { text: "› building web, api, billing-worker", cls: "t-dim" },
  { text: "› migrating 2,140 tenants  0 errors", cls: "t-dim" },
  { text: "› stripe webhooks verified", cls: "t-dim" },
  { text: "› canary 10% … 50% … 100%", cls: "t-dim" },
  { text: "› p95 latency 84ms  error rate 0.00%", cls: "t-dim" },
  { text: "› 18,402 active users, zero downtime", cls: "t-dim" },
  { text: "✓ v2.14 live in 41s", cls: "t-ok" },
  { text: "" },
];

export default function TerminalWidget() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [lines, setLines] = useState<Line[]>(script.slice(0, 3));
  const [pos, setPos] = useState(3);

  useInterval(
    () => {
      const line = script[pos % script.length];
      setLines((l) => [...l.slice(-8), line]);
      setPos((p) => p + 1);
    },
    620,
    inView,
  );

  return (
    <div className="widget" ref={ref}>
      <div className="terminal">
        <div className="terminal-bar">
          <i />
          <i />
          <i />
          <span>~/yourco-saas — zsh</span>
        </div>
        <div className="terminal-body" aria-label="Live SaaS release demo">
          {lines.map((l, i) => (
            <div className={`t-line ${l.cls ?? ""}`} key={`${pos}-${i}`}>
              {l.text || " "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
