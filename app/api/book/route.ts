import { BOOK_EMAIL } from "@/components/contact";

// Emails every "Book a call" form submission to us through Resend's HTTP API.
// Needs RESEND_API_KEY in .env; see .env.example for the other optional settings.

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("book: RESEND_API_KEY is not set");
    return Response.json({ error: "Email is not configured yet." }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // hidden field real visitors never fill in; bots usually do
  if (clean(body.company, 200)) return Response.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const message = clean(body.message, 5000);
  const interests = Array.isArray(body.interests)
    ? body.interests.map((i) => clean(i, 60)).filter(Boolean).slice(0, 10)
    : [];

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please add your name and a valid email." }, { status: 400 });
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Interested in", interests.join(", ") || "Not specified"],
    ["Message", message || "(none)"],
  ];

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.BOOK_FROM_EMAIL || "Takksh Website <onboarding@resend.dev>",
      to: [process.env.BOOK_TO_EMAIL || BOOK_EMAIL],
      reply_to: email,
      subject: `New call request from ${name}`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n\n"),
      html: `<h2>New call request</h2>${rows
        .map(([k, v]) => `<p><strong>${k}</strong><br>${esc(v).replace(/\n/g, "<br>")}</p>`)
        .join("")}`,
    }),
  });

  if (!res.ok) {
    console.error("book: Resend error", res.status, await res.text());
    return Response.json({ error: "Couldn't send right now. Please try again." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
