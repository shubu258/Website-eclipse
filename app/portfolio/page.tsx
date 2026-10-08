import type { Metadata } from "next";
import { BOOK_CALL_HREF } from "@/components/contact";
import Footer from "@/components/Footer";
import { Arrow } from "@/components/Icons";
import Nav from "@/components/Nav";
import PageHero from "@/components/PageHero";
import PortfolioGrid from "@/components/PortfolioGrid";
import RevealObserver from "@/components/RevealObserver";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Blockchain, AI, custom software and SaaS products built by Takksh Technologies.",
};

export default function PortfolioPage() {
  return (
    <>
      <Nav />
      <main className="pf-page">
        <PageHero
          light
          eyebrow="Portfolio"
          line1="Work that"
          line2={<span className="serif">outshines.</span>}
          lede="A selection of blockchain, AI, custom software and SaaS products we've designed, built and shipped with our clients."
        />

        <PortfolioGrid />

        <section className="pf-cta">
          <div className="wrap">
            <div className="pf-cta-inner reveal">
              <h2 className="section-title">
                Your project <span className="serif">next?</span>
              </h2>
              <a href={BOOK_CALL_HREF} className="btn">
                Book a call
                <span className="btn-dot">
                  <Arrow />
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
