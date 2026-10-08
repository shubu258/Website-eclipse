import Link from "next/link";
import { BOOK_CALL_HREF } from "./contact";
import Logo from "./Logo";
const cols = [
  {
    title: "Practices",
    links: [
      { label: "Blockchain development", href: "/#blockchain" },
      { label: "AI development", href: "/#ai" },
      { label: "Custom software", href: "/#custom" },
      { label: "SaaS platforms", href: "/#saas" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Why Us", href: "/#why" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Careers", href: "/careers" },
      { label: "Book a call", href: BOOK_CALL_HREF },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Link href="/" className="logo" aria-label="Takksh Technologies home">
              <Logo />
            </Link>
            <p>Senior engineering for blockchain, AI, custom software and SaaS. Remote-first, worldwide.</p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h5>{c.title}</h5>
              <ul>
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Takksh Technologies. All rights reserved.</span>
          <span>Made in the dark, shipped in the light.</span>
        </div>
      </div>
    </footer>
  );
}
