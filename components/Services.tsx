import AiWidget from "./widgets/AiWidget";
import ChainWidget from "./widgets/ChainWidget";
import CrmWidget from "./widgets/CrmWidget";
import TerminalWidget from "./widgets/TerminalWidget";

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="wrap">
        <div className="services-head">
          <h2 className="section-title reveal">
            AI-powered development <span className="serif">partner.</span>
          </h2>
          <p className="reveal" style={{ "--d": "0.1s" } as React.CSSProperties}>
            Blockchain, AI, custom software and SaaS platforms, built end to end by one senior team. Every
            card below is running live.
          </p>
        </div>

        <div className="bento">
          <article className="card card-dark card-7 reveal" id="blockchain">
            <div className="card-top">
              <div>
                <span className="card-index">01 / Service</span>
                <h3>
                  Blockchain
                  <br />
                  <span className="serif">development</span>
                </h3>
              </div>
              <div className="cube-scene" aria-hidden>
                <div className="cube">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>
            <p className="card-tagline">On-chain, audited and actually used.</p>
            <p className="card-desc">
              Smart contracts, tokenization, L2 infrastructure, wallets and dApps, built to survive audits and
              real users from day one.
            </p>
            <div className="tags">
              <span className="tag">Solidity</span>
              <span className="tag">Rust</span>
              <span className="tag">EVM · Solana</span>
              <span className="tag">Zero-knowledge</span>
            </div>
            <ChainWidget />
          </article>

          <article className="card card-orange card-5 reveal" id="ai" style={{ "--d": "0.08s" } as React.CSSProperties}>
            <span className="card-index">02 / Service</span>
            <h3>
              AI
              <br />
              <span className="serif">development</span>
            </h3>
            <p className="card-tagline">AI that does real work.</p>
            <p className="card-desc">
              LLM agents, RAG, automation and fine-tuned models wired into your data. Evaluated, observable and
              cost-controlled.
            </p>
            <AiWidget />
          </article>

          <article className="card card-white card-5 reveal" id="custom">
            <span className="card-index">03 / Service</span>
            <h3>
              Custom
              <br />
              <span className="serif">software</span>
            </h3>
            <p className="card-tagline">Built for you, not for everyone.</p>
            <p className="card-desc">
              Web apps, mobile apps, internal tools and the APIs between them, shaped around how your business
              actually works.
            </p>
            <CrmWidget />
          </article>

          <article className="card card-cream card-7 reveal" id="saas" style={{ "--d": "0.08s" } as React.CSSProperties}>
            <span className="card-index">04 / Service</span>
            <h3>
              SaaS
              <br />
              <span className="serif">platforms</span>
            </h3>
            <p className="card-tagline">From first idea to thousands of paying users.</p>
            <p className="card-desc">
              Multi-tenant products with auth, billing, analytics and admin built in, and the infrastructure to
              scale them.
            </p>
            <div className="tags">
              <span className="tag">Next.js</span>
              <span className="tag">Node · Go</span>
              <span className="tag">Stripe</span>
              <span className="tag">AWS · GCP</span>
            </div>
            <TerminalWidget />
          </article>
        </div>
      </div>
    </section>
  );
}
