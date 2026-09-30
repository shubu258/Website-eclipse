import apiTrace from "@/public/work/chainhound/api-trace.png";
import apiWallet from "@/public/work/chainhound/api-wallet.png";
import hero from "@/public/work/chainhound/hero.png";
import workflow from "@/public/work/chainhound/workflow.png";
import type { CaseStudy } from "./types";

export const chainhound: CaseStudy = {
  slug: "chainhound",
  accent: "#c15a28",
  tagline: "AI agents that investigate crypto wallets and trace where the money went.",
  summary:
    "ChainHound is an AI-powered blockchain investigation platform. You enter a wallet address and a goal. Its agents read the wallet's history, follow the funds from wallet to wallet, and return a risk report backed by real transactions.",
  facts: [
    { k: "Industry", v: "Blockchain intelligence" },
    { k: "What we did", v: "Product design, AI agents, full-stack build" },
    { k: "Stack", v: "Next.js, FastAPI, The Graph" },
    { k: "Year", v: "2026" },
  ],
  hero: { src: hero, alt: "ChainHound home screen with a wallet address input and Investigate button" },
  sections: [
    {
      label: "The challenge",
      title: "Blockchain data is public, but investigating it is slow.",
      body: [
        "When a suspicious wallet turns up, investigators open transactions one at a time, follow addresses by hand, and try to connect evidence spread across explorers and datasets. Once a case reaches a few hundred transactions, doing this by hand stops being practical.",
      ],
      items: [
        { t: "Manual work", d: "Hours spent clicking through transactions and wallet histories." },
        { t: "Scattered data", d: "Evidence lives across explorers, indexed datasets and token transfers." },
        { t: "Hard to read", d: "A hash or an address means little without its relationships and risk." },
      ],
    },
    {
      label: "Our solution",
      title: "An investigator, not another block explorer.",
      body: [
        "You set the goal and the AI agent works out the steps. It decides which data it needs, which wallets to follow and when to stop, then turns what it found into a clear report. The agent does the reasoning, but the blockchain data is the only source for every fact in the report.",
      ],
      quote: "“Find this transaction” becomes “Investigate this wallet and explain where its funds came from.”",
    },
    {
      label: "How it works",
      title: "The agent follows the trail hop by hop.",
      steps: [
        "Analyse the target wallet",
        "Pull its transaction history",
        "Spot significant incoming and outgoing transfers",
        "Trace the connected wallets, one hop at a time",
        "Check for links to known risky addresses",
        "Summarise the trail, the evidence and the risk",
      ],
      shots: [{ src: workflow, alt: "Live workflow console and pipeline overview", caption: "Every step streams into a live console while the investigation runs." }],
    },
    {
      label: "Key features",
      title: "What we delivered",
      items: [
        { t: "Agentic investigation", d: "Multi-step investigations from a single high-level goal." },
        { t: "Multi-hop tracing", d: "Reconstruct how funds moved across many wallets." },
        { t: "Wallet risk scoring", d: "A 0–100 risk score tied to the transactions behind it." },
        { t: "Relationship mapping", d: "Wallets and transactions shown as one connected trail." },
        { t: "AI reports", d: "Plain-language findings on what moved, where, and why it matters." },
        { t: "Live chain data", d: "Current on-chain activity through indexing and RPC infrastructure." },
      ],
    },
    {
      label: "Verification API",
      title: "Risk checks other platforms can call.",
      body: [
        "Two endpoints let exchanges and apps check a wallet before approving a deposit, withdrawal or sign-up. One is fast and checks only the wallet itself. The other also checks the wallets it recently sent funds to. Both return the same risk score, and the caller decides the threshold.",
      ],
      shots: [
        { src: apiWallet, alt: "Documentation for POST /api/agent/wallet", caption: "Single-wallet check: fast, for everyday gates." },
        { src: apiTrace, alt: "Documentation for POST /api/agent/trace", caption: "Trail check: a wallet is only as clean as its riskiest link." },
      ],
    },
    {
      label: "Tech stack",
      title: "Built with",
      stack: [
        ["Frontend", "Next.js, React, TypeScript, Tailwind CSS"],
        ["Backend", "Python, FastAPI"],
        ["AI", "Agentic workflows, LLM reasoning, tool-based investigation"],
        ["Chain data", "The Graph, Subgraphs, RPC infrastructure"],
        ["Storage", "Supabase, PostgreSQL"],
        ["Networks", "Ethereum and EVM chains"],
      ],
    },
    {
      label: "Impact",
      title: "From blockchain data to blockchain intelligence.",
      body: [
        "ChainHound puts data retrieval, fund tracing and AI analysis into one workflow. Exchanges, DeFi protocols, payment platforms and compliance teams can start from a single wallet and let the agent gather the context, while people still make the decisions.",
      ],
    },
  ],
};
