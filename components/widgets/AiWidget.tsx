"use client";

import { useState } from "react";
import { useInView, useInterval } from "../hooks";

const script = [
  {
    q: "Why did churn spike in Q3?",
    a: "63% of churned accounts never connected an integration in their first 14 days. Onboarding emails 3 and 4 have a 9% open rate. I'd start there.",
  },
  {
    q: "Summarise this 80-page vendor contract.",
    a: "Auto-renews for 24 months unless cancelled 90 days prior. Liability is capped at fees paid. Clause 14.2 allows unilateral price changes, so flag that.",
  },
  {
    q: "Route this ticket to the right team.",
    a: "Billing → Enterprise tier. Customer mentions a duplicate invoice (#44821) and an upcoming renewal. Priority: high. Draft reply attached.",
  },
];

export default function AiWidget() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState(0);
  const [hold, setHold] = useState(0);

  const words = script[idx].a.split(" ");
  const done = shown >= words.length;

  useInterval(
    () => {
      if (!done) {
        setShown((s) => s + 1);
      } else if (hold < 30) {
        setHold((h) => h + 1);
      } else {
        setHold(0);
        setShown(0);
        setIdx((i) => (i + 1) % script.length);
      }
    },
    70,
    inView,
  );

  return (
    <div className="widget" ref={ref}>
      <div className="ai-window" aria-live="off">
        <div className="ai-head">
          <span>eclipse-agent · v4</span>
          <span style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {done ? "done" : `${38 + (shown % 7)} tok/s`}
            <span className="ai-meter" aria-hidden>
              <i />
              <i />
              <i />
              <i />
            </span>
          </span>
        </div>
        <div className="ai-prompt">{script[idx].q}</div>
        <p className="ai-answer">
          {words.slice(0, shown).join(" ")}
          {!done && <span className="caret" />}
        </p>
      </div>
    </div>
  );
}
