"use client";

import { useEffect, useState } from "react";
import { randHex, useInView, useInterval } from "../hooks";

type Block = { height: number; hash: string; txs: number; mining: boolean; leaving?: boolean };

const make = (height: number, mining = false): Block => ({
  height,
  hash: `0x${randHex(4)}…${randHex(4)}`,
  txs: 40 + Math.floor(Math.random() * 180),
  mining,
});

// Deterministic first render so server and client HTML match
const seed: Block[] = [
  { height: 18402, hash: "0x3fa1…9c0e", txs: 142, mining: false },
  { height: 18403, hash: "0x07bd…41aa", txs: 98, mining: false },
  { height: 18404, hash: "0xe2c9…d713", txs: 187, mining: false },
  { height: 18405, hash: "", txs: 0, mining: true },
];

export default function ChainWidget() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [blocks, setBlocks] = useState<Block[]>(seed);
  const [nonce, setNonce] = useState("0x000000");
  const [gas, setGas] = useState(14);

  // nonce search ticker
  useInterval(() => setNonce(`0x${randHex(6)}`), 70, inView);

  // seal the pending block, start the next one, drop the oldest
  useInterval(
    () => {
      setBlocks((prev) => {
        const live = prev.filter((b) => !b.leaving);
        const sealed = live.map((b) => (b.mining ? { ...make(b.height), mining: false } : b));
        const next = [...sealed, make(sealed[sealed.length - 1].height + 1, true)];
        if (next.length > 4) next[0] = { ...next[0], leaving: true };
        return next;
      });
      setGas(9 + Math.floor(Math.random() * 12));
    },
    2600,
    inView,
  );

  // remove collapsed blocks after their exit transition
  useEffect(() => {
    if (!blocks.some((b) => b.leaving)) return;
    const id = setTimeout(() => setBlocks((prev) => prev.filter((b) => !b.leaving)), 650);
    return () => clearTimeout(id);
  }, [blocks]);

  const pending = blocks.find((b) => b.mining);

  return (
    <div className="widget" ref={ref}>
      <div className="chain-status">
        <span>
          <span className="live-dot" />
          mainnet · block <b>#{pending?.height.toLocaleString("en-US")}</b>
        </span>
        <span>
          nonce <b>{nonce}</b> · gas {gas} gwei
        </span>
      </div>
      <div className="chain" aria-label="Live block explorer demo">
        {blocks.map((b) => (
          <div key={b.height} className={`block${b.mining ? " mining" : ""}${b.leaving ? " leaving" : ""}`}>
            <strong>#{b.height.toLocaleString("en-US")}</strong>
            {b.mining ? (
              <>
                mining…
                <br />
                {nonce.slice(0, 8)}
              </>
            ) : (
              <>
                {b.hash}
                <br />
                {b.txs} tx · finalized
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
