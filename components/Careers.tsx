import { CAREERS_HREF } from "./contact";
import { Arrow } from "./Icons";

export default function Careers() {
  return (
    <section className="careers" id="careers">
      <div className="wrap careers-grid">
        <div className="careers-intro">
          <span className="eyebrow reveal">Join us</span>
          <h2 className="section-title reveal" style={{ marginTop: 20 }}>
            Work with <span className="serif">us.</span>
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

        <div className="roles-empty reveal">
          <h3>No open roles right now</h3>
          <p>
            We aren&apos;t hiring at the moment. If you&apos;d like to hear when a role opens, send us a note with
            what you&apos;ve built.
          </p>
          <a href={CAREERS_HREF} className="btn">
            Get in touch
            <span className="btn-dot">
              <Arrow />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
