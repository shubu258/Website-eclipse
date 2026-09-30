# AgentRail — Agentic Authorization Infrastructure for Autonomous AI Agents

AgentRail is an on-chain authorization infrastructure designed to solve a fundamental problem with autonomous AI agents: an agent may be capable of taking actions, but capability does not mean it should have unrestricted authority.

The platform introduces programmable mandates that define exactly what an agent is allowed to do — including which programs or destinations it can interact with, how much it can spend, and how long its authority remains active. These permissions are published through ENS and enforced directly on-chain, so an AI agent cannot bypass the constraints simply because its reasoning or instructions change. 

## The Challenge

AI agents are becoming increasingly capable of interacting with financial systems, blockchain protocols, APIs, and autonomous services. But giving an agent the ability to act also creates a security problem: how do you allow an agent to perform useful actions without giving it unrestricted control over funds?

Existing blockchain authorization primitives are largely based on ownership or spending allowances. For example, Solana's SPL `approve` can limit the amount a delegate can spend, but it does not specify what the delegate is actually allowed to do. The same problem exists with ERC-20 allowances on EVM networks. 

This creates an uncomfortable choice for autonomous systems. Developers can hand an agent a private key, provide a broad token allowance, move assets into a custodial system, or depend on an off-chain policy server.

None of these approaches provides a native, verifiable answer to a simple question:

**"What exactly is this agent authorized to do?"**

## Our Solution

We built AgentRail as a programmable authorization layer for AI agents.

Instead of giving an agent unrestricted access to a wallet, the owner creates a mandate that defines its authority. The mandate can specify the permitted programs or destinations, allowed instructions, spending limits, and expiration conditions.

The agent does not own the user's funds. It requests actions within the scope of its mandate, while the on-chain authorization layer determines whether those actions are permitted.

The result is a separation between **agent intelligence and financial authority**.

The AI agent can reason, discover opportunities, and decide what action it wants to take. AgentRail determines whether that action is actually allowed to reach the blockchain.

## Agentic Architecture

The core of AgentRail is designed around the idea that AI agents should be able to operate autonomously without becoming trusted financial principals.

An agent can discover services, inspect its permissions, retrieve information, analyze a user's portfolio, and decide that a protective or financial action is required. However, its decision is still constrained by the mandate.

This creates a workflow where:

**AI decides what it wants to do → AgentRail checks what it is allowed to do → Blockchain enforces the decision.**

The distinction is important because the AI model itself is not part of the security boundary. The model can make mistakes or even be manipulated, but its output cannot expand the authority granted by the owner. 

## Instruction-Level Authorization on Solana

The most powerful part of AgentRail's authorization model is implemented on Solana.

The Solana program uses a mandate PDA derived from the owner and agent. The mandate stores permission slots that define the operations the agent can perform. 

AgentRail separates authorization into two different gates.

The first is the payment gate. The agent can execute an approved payment using the mandate PDA as the delegate, while the user's tokens remain in the user's own token account. There is no separate custody vault holding the user's assets. 

The second is the instruction gate.

Before an instruction executes, AgentRail reads the actual sibling instruction from Solana's instruction sysvar and compares its program ID and discriminator against the mandate. This means the authorization check evaluates what is actually being executed rather than relying only on what the agent claims it intends to execute. 

For example, a mandate can allow an SPL Token `Transfer` while rejecting `SetAuthority`. It can also reject an unapproved destination or a payment exceeding the per-transaction limit. 

## ENS-Based Agent Identity & Mandates

AgentRail uses ENSv2 to give mandates a human-readable identity and lifecycle.

An agent can have a name such as:

**databot.agentrail.eth**

Under that identity, AgentRail publishes records describing the agent's supported chains, services, allowed destinations, payment configuration, and on-chain identity. 

The mandate itself also has a lifecycle. It can expire automatically, be revoked by the owner, and is designed to be non-transferable.

Importantly, the agent owns its subname token but does not receive administrative roles over the name. This prevents the agent from modifying or extending its own authority. 

## The Graph — Giving Agents Blockchain Awareness

The Graph provides the data and discovery layer for AgentRail's agents.

Instead of hardcoding a particular subgraph, the agent can search available subgraphs, inspect their schemas, and query the information relevant to an investigation or task.

This allows the agent to interact with blockchain data through natural-language objectives while still retrieving structured information from indexed on-chain sources. 

AgentRail also uses a shared GraphQL schema across its supported chains. Mandates, permissions, payments, and refused actions can be queried through the same conceptual data model, making cross-chain activity easier for the agent and dashboard to consume. 

## Autonomous Service Payments with x402

AgentRail demonstrates autonomous machine-to-machine payments through an x402-powered data service on Hedera.

The agent acts as the customer of a real price-feed service. Instead of using a flat payment, the service calculates the amount based on the number of requested symbols and returns the exact amount through the HTTP 402 payment challenge. 

Before the agent pays, AgentRail verifies the payment against its mandate:

Is the payee allowed?

Is the payment within the per-transaction limit?

Is the lifetime spending limit still available?

Is the mandate active and unexpired?

Only when these checks pass does the payment proceed. 

This creates a practical example of autonomous agents purchasing services while remaining constrained by explicit financial permissions.

## The Reference AI Agent

AgentRail's reference implementation is an autonomous theft and portfolio-risk monitoring agent.

The agent's objective is to determine whether a user's assets may be at risk. It can discover which protocols a wallet is exposed to, investigate those positions, purchase the market data required for analysis, and combine the findings into a single risk assessment. 

The system uses deterministic rules for security-critical decisions.

For example, a newly discovered unlimited approval can trigger a critical risk, significant balance outflows can trigger a high-risk condition, and a lending position approaching liquidation can trigger a medium-risk condition.

The severity of the finding determines what the agent can attempt. A critical event can lead the agent to attempt a protective action, but that action remains subject to the same mandate restrictions as any other transaction. 

## Security Against Prompt Injection

One of AgentRail's most important demonstrations addresses a fundamental problem with AI agents: they can be manipulated.

The project includes an attack scenario where malicious instructions are injected into data that the agent legitimately purchased from an external service. The model receives the malicious content and attempts to follow it.

AgentRail does not try to solve this by making the model perfectly resistant to manipulation.

Instead, it assumes the agent can be fooled and places the security boundary somewhere stronger: the blockchain authorization layer.

The manipulated agent attempts three unauthorized actions:

**Divert funds → DestinationNotAllowed**

**Seize authority → InstructionNotAllowed**

**Exceed the spending limit → PerTxLimitExceeded**

All three attempts are rejected on-chain, with no funds moved. 

This demonstrates the core philosophy behind AgentRail:

**The agent does not need to be trusted to be perfect. Its authority needs to be constrained.**

## Unified Investigation & Monitoring Dashboard

The AgentRail web application provides a central interface for inspecting an agent's permissions and activity.

Users can enter an agent's name and view what the agent is allowed to do, the actions it has performed, and actions that were refused. Transaction hashes are linked to the relevant blockchain explorers, allowing the underlying activity to be independently verified.

Owners can also create, fund, and revoke mandates from the dashboard while keeping owner-side signing operations isolated from public browser actions. 

## MCP Integration

AgentRail also exposes its authorization infrastructure to other AI agents through an MCP server.

The MCP interface provides read-only tools for retrieving mandates, checking permissions, discovering available services, and reviewing historical activity.

This allows another agent to integrate AgentRail as an authorization and policy layer without giving the MCP interface the ability to sign transactions itself. 

## Key Features Delivered

### Programmable Agent Mandates

Define exactly what an autonomous agent can access, spend, and interact with.

### Instruction-Level Authorization

On Solana, permissions can distinguish between individual instructions such as `Transfer` and `SetAuthority`.

### Destination & Spending Controls

Restrict where an agent can send assets and how much it can spend per transaction or across its mandate lifetime.

### Expiring & Revocable Permissions

Mandates can automatically expire or be revoked by their owner.

### ENS Agent Identity

Human-readable ENS identities connect agents with their authorization configuration and service discovery records.

### Cross-Chain Data Layer

The Graph Subgraphs and Substreams provide indexed blockchain data across Solana, Sepolia, and Base.

### Autonomous x402 Payments

Agents can discover services, calculate payment requirements, verify their authorization, and settle payments autonomously.

### AI Risk Monitoring

The reference agent continuously evaluates portfolio activity and determines whether protective action may be required.

### Prompt-Injection Defense

Even when an agent is manipulated into attempting an unauthorized action, the on-chain mandate prevents the transaction from exceeding its authority.

### MCP Integration

Other AI agents can query AgentRail's authorization state through read-only MCP tools.

## Technology Stack

**Blockchain:** Solana, Ethereum/EVM, Hedera

**Smart Contracts:** Anchor, Solidity, Foundry

**Identity & Authorization:** ENSv2, ERC-8004

**Blockchain Data:** The Graph, Subgraphs, Substreams

**Agent Infrastructure:** AI agents, MCP, TypeScript

**Payments:** x402, Blocky402, HTS USDC

**Frontend:** Next.js, React, TypeScript, Tailwind CSS

**Backend & Services:** Node.js, API services, GraphQL

## Business & Technical Impact

AgentRail establishes a security model for autonomous blockchain agents where intelligence and authority are separated.

The AI agent can explore data, interact with services, make decisions, and initiate transactions, but it cannot silently expand the permissions granted to it.

For applications involving autonomous trading, treasury management, DeFi automation, machine-to-machine payments, and AI-powered financial services, this provides a foundation for giving agents useful capabilities without giving them unrestricted control over assets.

The project also demonstrates that authorization can become part of the agent's infrastructure rather than remaining an off-chain policy enforced by application code.

## The Future of Autonomous Agents Is Constrained Autonomy

AgentRail was built around a simple observation: making an AI agent more capable also makes the consequences of a mistake more significant.

The answer is not necessarily to prevent agents from acting. It is to give them clearly defined boundaries.

With programmable on-chain mandates, ENS-based identity, agentic blockchain discovery, autonomous x402 payments, and deterministic enforcement, AgentRail provides a framework where agents can act independently while their authority remains explicit, auditable, revocable, and enforced by the blockchain.
