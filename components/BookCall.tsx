"use client";

import { useState, type FormEvent } from "react";
import { BOOK_EMAIL } from "./contact";
import { Arrow } from "./Icons";

const interests = ["Blockchain development", "AI development", "Custom software", "SaaS platform", "Not sure yet"];

export default function BookCall() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  // sends the request to /api/book, which emails it to us
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          interests: data.getAll("interest"),
          company: data.get("company"),
        }),
      });
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: "" }));
        throw new Error(error || "Couldn't send right now. Please try again.");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't send right now. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="book" id="book">
      <div className="wrap">
        <div className="book-card">
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
              <a href={`mailto:${BOOK_EMAIL}`}>{BOOK_EMAIL}</a>
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
              {/* honeypot: hidden from people, tempting to bots */}
              <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hp" aria-hidden />
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              <button type="submit" className="btn" disabled={sending}>
                {sending ? "Sending…" : "Request a call"}
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
