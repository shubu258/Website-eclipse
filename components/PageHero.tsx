import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  line1: ReactNode;
  line2: ReactNode;
  lede: ReactNode;
  /** White header for pages that sit on a white background. */
  light?: boolean;
};

/** Header used by inner pages (portfolio, careers). Dark unless `light`. */
export default function PageHero({ eyebrow, line1, line2, lede, light }: Props) {
  return (
    <section className={light ? "page-hero light" : "page-hero"} data-nav={light ? "solid" : undefined}>
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
        </div>
      </div>
    </section>
  );
}
