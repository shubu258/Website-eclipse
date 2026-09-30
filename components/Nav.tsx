"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Chevron } from "./Icons";

const joinLinks = [
  { href: "/careers", title: "Careers", desc: "Full-time roles on the core team" },
  { href: "/careers", title: "Talent network", desc: "Contract work for senior specialists" },
  { href: "/#book", title: "Partner program", desc: "Agencies and consultancies we build with" },
];

const mobileLinks = [
  { href: "/#why", label: "Why Us" },
  { href: "/#services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/careers", label: "Join Us" },
  { href: "/#book", label: "Book a call" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // turn solid once past the dark header of the current page
      const header = document.querySelector<HTMLElement>(".hero, .page-hero, .cs-hero");
      // light headers (data-nav="solid") need the solid nav from the very top
      setScrolled(!header ? y > 0 : header.dataset.nav === "solid" || y > header.offsetHeight - 80);
      setHidden(y > 400 && y > lastY.current + 4);
      if (y < lastY.current - 4) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setDropOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const cls = ["nav", scrolled && !menuOpen && "scrolled", hidden && !menuOpen && "hidden", menuOpen && "menu-open"]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={cls}>
      <div className="wrap nav-inner">
        <Link href="/" className="logo" aria-label="Eclipse home" style={{ position: "relative", zIndex: 2 }}>
          <span className="logo-mark" aria-hidden />
          ECLIPSE
        </Link>

        <nav aria-label="Main">
          <ul className="nav-links">
            <li>
              <Link href="/#why">Why Us</Link>
            </li>
            <li
              className={`dropdown${dropOpen ? " open" : ""}`}
              onMouseLeave={() => setDropOpen(false)}
            >
              <button aria-expanded={dropOpen} aria-haspopup="true" onClick={() => setDropOpen((o) => !o)}>
                Join Us <Chevron />
              </button>
              <div className="dropdown-menu">
                {joinLinks.map((l) => (
                  <Link key={l.title} href={l.href} onClick={() => setDropOpen(false)}>
                    <strong>{l.title}</strong>
                    <span>{l.desc}</span>
                  </Link>
                ))}
              </div>
            </li>
            <li>
              <Link href="/#services">Services</Link>
            </li>
            <li>
              <Link href="/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link href="/#book" className="nav-cta">
                Book a call
              </Link>
            </li>
          </ul>
        </nav>

        <button
          className="burger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
        </button>

        <div className="mobile-menu" aria-hidden={!menuOpen} inert={!menuOpen}>
          <ul>
            {mobileLinks.map((l, i) => (
              <li key={l.label}>
                <Link href={l.href} onClick={() => setMenuOpen(false)}>
                  <em>0{i + 1}</em>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mono" style={{ fontSize: 13, color: "var(--muted-dark)" }}>
            hello@eclipse.studio
          </p>
        </div>
      </div>
    </header>
  );
}
