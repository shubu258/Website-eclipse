import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  line1: ReactNode;
  line2: ReactNode;
  lede: ReactNode;
  stats?: { label: string; value: string }[];
};

/** Dark header used by inner pages (portfolio, careers). */
export default function PageHero({ eyebrow, line1, line2, lede, stats }: Props) {
  return (
    <section className="page-hero">
      <div className="page-hero-eclipse" aria-hidden />
      <div className="wrap">
        <span className="eyebrow hero-eyebrow">{eyebrow}</span>
        <h1>
          <span className="line">
            <span style={{ "--i": 0 } as React.CSSProperties}>{line1}</span>
          </span>
          <span className="line">
            <span style={{ "--i": 1 } as React.CSSProperties}>{line2}</span>
          </span>
        </h1>
        <div className="page-hero-row">
          <p className="hero-lede">{lede}</p>
          {stats && (
            <dl className="page-hero-stats">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}
