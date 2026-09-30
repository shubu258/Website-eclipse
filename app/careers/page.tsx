import type { Metadata } from "next";
import Careers from "@/components/Careers";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import PageHero from "@/components/PageHero";
import RevealObserver from "@/components/RevealObserver";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Eclipse: remote, senior-only engineering across blockchain, AI, custom software and SaaS.",
};

const steps = [
  { title: "Intro call", body: "30 minutes with an engineer, not a recruiter. We talk about what you've built." },
  { title: "Paid take-home", body: "A small, real-world task. Around four hours, and we pay you for it." },
  { title: "Deep dive", body: "Walk us through your solution and a system you're proud of." },
  { title: "Offer", body: "A decision within a week of your first call. No endless rounds." },
];

export default function CareersPage() {
  return (
    <>
      <Nav />
      <main className="careers-page">
        <PageHero
          light
          eyebrow="Careers"
          line1="Join the"
          line2={<span className="serif">orbit.</span>}
          lede="A small, senior, fully remote team building blockchain, AI, custom software and SaaS products for clients worldwide."
        />

        <Careers />

        <section className="hiring">
          <div className="wrap">
            <h2 className="section-title reveal">
              How we <span className="serif">hire.</span>
            </h2>
            <p className="hiring-lede reveal">When a role opens, this is the whole process. Four steps, about a week.</p>
            <ol className="hiring-steps">
              {steps.map((s, i) => (
                <li key={s.title} className="reveal" style={{ "--d": `${i * 0.08}s` } as React.CSSProperties}>
                  <span className="phase-label">0{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
