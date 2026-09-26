import Link from "next/link";
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
      { label: "Book a call", href: "/#book" },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { label: "LinkedIn", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "X / Twitter", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Link href="/" className="logo">
              <span className="logo-mark" style={{ color: "var(--cream)" }} aria-hidden />
              ECLIPSE
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

        <div className="wordmark" aria-hidden>
          {"eclipse".split("").map((ch, i) => (
            <span key={i}>{ch}</span>
          ))}
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Eclipse. All rights reserved.</span>
          <span>Made in the dark, shipped in the light.</span>
        </div>
      </div>
    </footer>
  );
}
