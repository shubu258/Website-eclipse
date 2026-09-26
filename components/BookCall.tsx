"use client";

import { useState, type FormEvent } from "react";
import { Arrow } from "./Icons";

const interests = ["Blockchain development", "AI development", "Custom software", "SaaS platform", "Not sure yet"];

export default function BookCall() {
  const [sent, setSent] = useState(false);

  // TODO: connect to your backend, form service or calendar tool
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="book" id="book">
      <div className="wrap">
        <div className="book-card">
          <div className="book-eclipse" aria-hidden />
          <div className="book-copy">
            <span className="eyebrow reveal">Book a call</span>
            <h2 className="section-title reveal" style={{ marginTop: 20 }}>
              Let&apos;s build
              <br />
              something that
              <br />
              <span className="serif">outshines.</span>
            </h2>
            <p className="reveal">
              A 30-minute call with a senior engineer, not a salesperson. You&apos;ll leave with a clear next step,
              whether or not it&apos;s us.
            </p>
            <div className="book-contact reveal">
              <a href="mailto:hello@eclipse.studio">hello@eclipse.studio</a>
              <span style={{ color: "var(--muted-dark)" }}>Replies within one business day</span>
            </div>
          </div>

          {sent ? (
            <div className="form form-success" role="status">
              <span className="logo-mark" aria-hidden />
              <h3>You&apos;re on our radar.</h3>
              <p>We&apos;ll be in touch within one business day.</p>
            </div>
          ) : (
            <form className="form reveal" onSubmit={onSubmit}>
              <fieldset>
                <legend>What are you building?</legend>
                <div className="chips">
                  {interests.map((t) => (
                    <label key={t}>
                      <input type="checkbox" name="interest" value={t} />
                      <span>{t}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="form-row">
                <label>
                  <span className="lbl">Name</span>
                  <input type="text" name="name" required autoComplete="name" placeholder="Ada Lovelace" />
                </label>
                <label>
                  <span className="lbl">Work email</span>
                  <input type="email" name="email" required autoComplete="email" placeholder="ada@company.com" />
                </label>
              </div>
              <label>
                <span className="lbl">Tell us a little</span>
                <textarea name="message" rows={3} placeholder="Timeline, team size, what's blocking you…" />
              </label>
              <button type="submit" className="btn">
                Request a call
                <span className="btn-dot">
                  <Arrow />
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
