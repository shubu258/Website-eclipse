import { Fragment } from "react";
import { Spark } from "./Icons";

const items = [
  "Blockchain development",
  "Solidity",
  "Smart contracts",
  "Rust",
  "Zero-knowledge",
  "AI development",
  "LLM agents",
  "Python",
  "RAG pipelines",
  "Custom software",
  "Next.js",
  "SaaS platforms",
  "Stripe",
];

export default function Marquee() {
  const row = (hidden: boolean) =>
    items.map((t, i) => (
      <Fragment key={`${hidden}-${i}`}>
        <span aria-hidden={hidden || undefined}>
          {t}
          <Spark />
        </span>
      </Fragment>
    ));

  return (
    <div className="marquee" role="region" aria-label="Technologies we work with">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
