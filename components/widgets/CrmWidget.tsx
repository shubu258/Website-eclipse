"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useInView, useInterval } from "../hooks";

type Deal = { id: number; name: string; value: number; stage: 0 | 1 | 2 };

// Demo of a live sprint board: tickets flow Backlog → Doing → Shipped
const names = [
  "SSO & roles",
  "Admin dashboard",
  "Offline mode",
  "Payments API",
  "Push notifications",
  "CSV import",
  "Audit log",
  "Search & filters",
  "Mobile onboarding",
  "Webhooks",
];

const stages = ["Backlog", "Doing", "Shipped"];

const initial: Deal[] = [
  { id: 1, name: names[0], value: 8, stage: 0 },
  { id: 2, name: names[1], value: 5, stage: 0 },
  { id: 3, name: names[2], value: 13, stage: 1 },
  { id: 4, name: names[3], value: 3, stage: 1 },
  { id: 5, name: names[4], value: 8, stage: 2 },
];

export default function CrmWidget() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [deals, setDeals] = useState<Deal[]>(initial);
  const [closed, setClosed] = useState(486);
  const nextId = useRef(6);
  const rects = useRef(new Map<number, DOMRect>());
  const board = useRef<HTMLDivElement>(null);

  useInterval(
    () => {
      // snapshot positions for FLIP
      board.current?.querySelectorAll<HTMLElement>("[data-id]").forEach((el) => {
        rects.current.set(Number(el.dataset.id), el.getBoundingClientRect());
      });

      const movable = deals.filter((d) => d.stage < 2);
      if (!movable.length) return;
      const pick = movable[Math.floor(Math.random() * movable.length)];
      let next = deals.map((d) => (d.id === pick.id ? { ...d, stage: (d.stage + 1) as Deal["stage"] } : d));
      if (pick.stage === 1) setClosed((c) => c + pick.value);

      // keep Won column short, keep leads flowing in
      const won = next.filter((d) => d.stage === 2);
      if (won.length > 2) next = next.filter((d) => d.id !== won[0].id);
      if (next.filter((d) => d.stage === 0).length < 2) {
        const id = nextId.current++;
        next = [...next, { id, name: names[id % names.length], value: [2, 3, 5, 8, 13][Math.floor(Math.random() * 5)], stage: 0 }];
      }
      setDeals(next);
    },
    1900,
    inView,
  );

  // FLIP: animate cards from their previous position
  useLayoutEffect(() => {
    const prev = rects.current;
    if (!prev.size) return;
    board.current?.querySelectorAll<HTMLElement>("[data-id]").forEach((el) => {
      const before = prev.get(Number(el.dataset.id));
      if (!before) return;
      const now = el.getBoundingClientRect();
      const dx = before.left - now.left;
      const dy = before.top - now.top;
      if (dx || dy) {
        el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }], {
          duration: 650,
          easing: "cubic-bezier(.2,.8,.2,1)",
        });
      }
    });
    prev.clear();
  }, [deals]);

  const total = (stage: number) => deals.filter((d) => d.stage === stage).reduce((s, d) => s + d.value, 0);

  return (
    <div className="widget" ref={ref}>
      <div className="crm-summary">
        <span className="mono">Story points shipped</span>
        <span className="crm-value">{closed.toLocaleString("en-US")}</span>
      </div>
      <div className="crm-board" ref={board}>
        {stages.map((label, s) => (
          <div className="crm-col" key={label}>
            <h4>
              {label}
              <span>{total(s)} pts</span>
            </h4>
            {deals
              .filter((d) => d.stage === s)
              .map((d) => (
                <div className="deal" key={d.id} data-id={d.id}>
                  <b>{d.name}</b>
                  <span>{d.value} pts</span>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
