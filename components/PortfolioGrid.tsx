"use client";

import { useState } from "react";
import { projects, type Category } from "./projects";
import TiltCard from "./TiltCard";

const allCategories: Category[] = ["Blockchain development", "AI development", "Custom software", "SaaS platforms"];
// only offer filters that have work behind them
const filters: ("All" | Category)[] = ["All", ...allCategories.filter((c) => projects.some((p) => p.categories.includes(c)))];

export default function PortfolioGrid() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <section className="work pf-work">
      <div className="wrap">
        <div className="pf-bar">
          <div className="pf-filters" role="tablist" aria-label="Filter projects">
            {filters.map((f) => {
              const count = f === "All" ? projects.length : projects.filter((p) => p.categories.includes(f)).length;
              return (
                <button key={f} role="tab" aria-selected={filter === f} className={filter === f ? "on" : ""} onClick={() => setFilter(f)}>
                  {f}
                  <sup>{count}</sup>
                </button>
              );
            })}
          </div>
          <span className="mono pf-count">
            Showing {shown.length} of {projects.length}
          </span>
        </div>

        <div className="work-grid" key={filter}>
          {shown.map((p) => (
            <TiltCard key={p.slug} p={p} reveal={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
