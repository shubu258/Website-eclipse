import { Check, Cross } from "./Icons";

const cols = ["Speed", "Flexibility", "Quality", "Scalability", "Cost-effectiveness"];

const rows = [
  {
    name: "In-house team",
    desc: "Slow hiring (3–6 months), limited skill diversity and high fixed costs, but good quality control and easy scaling within the existing team.",
    marks: [0, 0, 1, 1, 0],
  },
  {
    name: "Development agencies",
    desc: "Long timelines (6–12 months), rigid contracts and premium pricing, but high-quality work and teams that can scale.",
    marks: [0, 0, 1, 1, 0],
  },
  {
    name: "Freelancers",
    desc: "Unpredictable availability, limited to individual skill sets and inconsistent quality standards, at affordable rates.",
    marks: [0, 0, 1, 1, 1],
  },
  {
    name: "Self-service tools",
    desc: "Limited to simple, template-based solutions with slow customization, but affordable and easy to scale for basic tasks.",
    marks: [0, 0, 1, 1, 0],
  },
];

export default function Compare() {
  return (
    <section className="compare" id="compare">
      <div className="wrap">
        <div className="compare-head reveal">
          <h2 className="section-title">
            Hiring or traditional outsourcing?
            <br />
            <span className="serif">Neither.</span>
          </h2>
          <p>Here&apos;s how the usual options compare to a senior team that&apos;s ready on day one.</p>
        </div>

        <div className="compare-scroll">
          <div className="ctable" role="table" aria-label="Eclipse compared with alternatives">
            <div className="crow crow-head" role="row">
              <div role="columnheader">Option</div>
              {cols.map((c) => (
                <div key={c} role="columnheader">
                  {c}
                </div>
              ))}
            </div>

            <div className="crow crow-ours reveal" role="row">
              <div role="cell">
                <h4>
                  <span className="logo-mark" style={{ width: 22, height: 22, color: "var(--orange-2)" }} aria-hidden />
                  Eclipse
                </h4>
                <p>
                  Senior engineers ready to deploy, with instant scalability, premium quality and competitive
                  pricing. No hiring delays, no overheads.
                </p>
              </div>
              {cols.map((c, i) => (
                <div key={c} role="cell" className="mark" style={{ "--d": `${0.2 + i * 0.08}s` } as React.CSSProperties}>
                  <span>
                    <Check />
                  </span>
                </div>
              ))}
            </div>

            {rows.map((r, ri) => (
              <div className="crow reveal" role="row" key={r.name} style={{ "--d": `${ri * 0.06}s` } as React.CSSProperties}>
                <div role="cell">
                  <h4>{r.name}</h4>
                  <p>{r.desc}</p>
                </div>
                {r.marks.map((m, i) => (
                  <div key={i} role="cell" className={`mark${m ? "" : " mark-no"}`}>
                    {m ? <Check /> : <Cross />}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
