"use client";

import Link from "next/link";
import { useState } from "react";
import { Arrow } from "./Icons";
import { projects, type Category } from "./projects";

const allCategories: Category[] = ["Blockchain development", "AI development", "Custom software", "SaaS platforms"];
// only offer filters that have work behind them
const filters: ("All" | Category)[] = ["All", ...allCategories.filter((c) => projects.some((p) => p.categories.includes(c)))];

export default function PortfolioGrid() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <section className="pf-work">
      <div className="wrap">
        <div className="pf-bar">
          <div className="pf-filters" role="group" aria-label="Filter projects">
            {filters.map((f) => {
              const count = f === "All" ? projects.length : projects.filter((p) => p.categories.includes(f)).length;
              return (
                <button key={f} aria-pressed={filter === f} className={filter === f ? "on" : ""} onClick={() => setFilter(f)}>
                  {f}
                  <sup>{count}</sup>
                </button>
              );
            })}
          </div>
          <span className="mono pf-count" aria-live="polite">
            Showing {shown.length} of {projects.length}
          </span>
        </div>

        <ul className="pf-list" key={filter}>
          {shown.map((p) => (
            <li key={p.slug} className="fade-up">
              <Link href={`/portfolio/${p.slug}`} className="pf-item">
                {/* the art is drawn on a fixed canvas and scaled into the thumbnail */}
                <div className="pf-thumb" aria-hidden>
                  {p.art}
                </div>

                <div className="pf-body">
                  <div className="pf-tags mono">
                    <span>{p.chip}</span>
                    <span>{p.year}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p className="pf-desc">{p.desc}</p>
                  <ol className="project-lines">
                    {p.lines.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ol>
                </div>

                <div className="pf-side">
                  <div className="pf-result">
                    <b>{p.result}</b>
                    <span>{p.resultLabel}</span>
                  </div>
                  <span className="pf-open">
                    View case study
                    <Arrow size={14} />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
