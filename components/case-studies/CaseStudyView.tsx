import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { Arrow } from "../Icons";
import type { Project } from "../projects";
import type { CaseStudy, Shot } from "./types";
import "./case-study.css";

const host = (url: string) => new URL(url).host;

function Screenshot({ shot, priority }: { shot: Shot; priority?: boolean }) {
  return (
    <figure className={`cs-shot reveal${shot.narrow ? " narrow" : ""}`}>
      <div className="cs-frame">
        <div className="cs-frame-bar" aria-hidden>
          <i />
          <i />
          <i />
        </div>
        <Image src={shot.src} alt={shot.alt} priority={priority} sizes={shot.narrow ? "420px" : "(max-width: 1200px) 100vw, 1100px"} />
      </div>
      {shot.caption && <figcaption>{shot.caption}</figcaption>}
    </figure>
  );
}

export default function CaseStudyView({ project, study, next }: { project: Project; study: CaseStudy; next?: Project }) {
  return (
    <article className="cs" style={{ "--cs-accent": study.accent } as CSSProperties}>
      <header className="cs-hero" data-nav="solid">
        <div className="wrap cs-narrow">
          <Link href="/portfolio" className="cs-back">
            ← All work
          </Link>
          <span className="cs-chip">{project.chip}</span>
          <h1>{project.title}</h1>
          <p className="cs-tagline">{study.tagline}</p>
          <p className="cs-summary">{study.summary}</p>
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn cs-visit">
              Visit {host(project.url)}
              <span className="btn-dot">
                <Arrow />
              </span>
            </a>
          )}
          <dl className="cs-facts">
            {study.facts.map((f) => (
              <div key={f.k}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="wrap cs-wide">
          <Screenshot shot={study.hero} priority />
        </div>
      </header>

      {study.sections.map((s, i) => (
        <section key={s.label} className="cs-sec">
          <div className="wrap cs-narrow">
            <div className="cs-sec-head reveal">
              <span className="cs-label">
                {String(i + 1).padStart(2, "0")} · {s.label}
              </span>
              <h2>{s.title}</h2>
            </div>
            {s.body?.map((p) => (
              <p key={p} className="cs-body reveal">
                {p}
              </p>
            ))}
            {s.quote && <blockquote className="cs-quote reveal">{s.quote}</blockquote>}
            {s.steps && (
              <ol className="cs-steps reveal">
                {s.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            )}
            {s.items && (
              <ul className="cs-items">
                {s.items.map((it) => (
                  <li key={it.t} className="reveal">
                    <h3>{it.t}</h3>
                    <p>{it.d}</p>
                  </li>
                ))}
              </ul>
            )}
            {s.stack && (
              <dl className="cs-stack reveal">
                {s.stack.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
          {s.shots && (
            <div className="wrap cs-wide cs-shots">
              {s.shots.map((shot) => (
                <Screenshot key={shot.alt} shot={shot} />
              ))}
            </div>
          )}
        </section>
      ))}

      <section className="cs-end">
        <div className="wrap cs-narrow">
          <h2>{project.url ? `See ${project.title} live.` : "Need a system built around your workflow?"}</h2>
          <div className="cs-end-actions">
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn">
                Visit {host(project.url)}
                <span className="btn-dot">
                  <Arrow />
                </span>
              </a>
            )}
            <Link href="/#book" className="btn btn-ghost">
              Build yours with us
            </Link>
          </div>
          {next && (
            <Link href={`/portfolio/${next.slug}`} className="cs-next">
              <span className="cs-label">Next project</span>
              <b>{next.title}</b>
              <span>{next.desc}</span>
            </Link>
          )}
        </div>
      </section>
    </article>
  );
}
