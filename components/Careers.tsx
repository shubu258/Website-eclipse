import { Arrow } from "./Icons";

const roles = [
  { title: "Senior Smart Contract Engineer", meta: "Solidity · Rust", where: "Remote · Full-time" },
  { title: "Applied ML Engineer, LLMs", meta: "Python · Evals · RAG", where: "Remote · Full-time" },
  { title: "Senior Full-stack Engineer", meta: "TypeScript · Go · SaaS", where: "Remote · Full-time" },
  { title: "Mobile Engineer", meta: "React Native · Swift", where: "Remote · Contract" },
];

export default function Careers() {
  return (
    <section className="careers" id="careers">
      <div className="wrap careers-grid">
        <div className="careers-intro">
          <span className="eyebrow reveal">Join us</span>
          <h2 className="section-title reveal" style={{ marginTop: 20 }}>
            Open <span className="serif">roles.</span>
          </h2>
          <p className="reveal">
            We hire engineers who&apos;ve shipped, and then give them hard problems, good clients and the time to
            do it properly.
          </p>
          <ul className="perks reveal">
            <li>Fully remote, async-first</li>
            <li>Senior peers only, no layers of management</li>
            <li>Learning budget and conference travel</li>
            <li>Work across blockchain, AI, custom software and SaaS</li>
          </ul>
        </div>

        <ul className="roles">
          {roles.map((r, i) => (
            <li className="role reveal" key={r.title} style={{ "--d": `${i * 0.06}s` } as React.CSSProperties}>
              <a href="mailto:careers@eclipse.studio">
                <div>
                  <h4>{r.title}</h4>
                  <p>{r.meta}</p>
                </div>
                <span className="mono">{r.where}</span>
                <span className="arrow">
                  <Arrow />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
