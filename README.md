# agentpass-protocol
## A proposed authentication standard for autonomous AI agents

**Author:** Marco Rauseo
**Date:** March 2026
**Status:** Draft RFC — open for feedback
**Version:** 0.1

---

## Abstract 
Autonomous AI agents are no longer a research concept. Systems like OpenClaw are already operating autonomously across finance, enterprise procurement, and healthcare — monitoring markets, executing predefined strategies, processing claims, and accessing sensitive records — with the boundary between assisted and fully autonomous action eroding rapidly. This shift introduces a critical infrastructure gap: no standardized protocol exists to answer the three fundamental questions that receiving systems must resolve before granting access to an autonomous agent — who are you, who authorized you, and what are you permitted to do.
Existing authentication standards, including OAuth 2.0 and OpenID Connect, were designed for human-in-the-loop interactions. They presuppose a human present to approve access at the moment of authentication — typically through a browser redirect and explicit user consent. Autonomous agents operate continuously and independently, with no human available to complete an interactive authentication flow. This is not a limitation of implementation. It is a structural incompatibility.
AgentPass proposes an open-core authentication and authorization protocol designed specifically for non-interactive autonomous agents. Each agent is issued a cryptographically signed JWT — an AgentPass Token — containing verified identity, organizational ownership, permitted action scope, and spending limits. Tokens expire every ten minutes and are silently renewed by the issuing infrastructure before expiry. This duration is not arbitrary: it represents a deliberate balance between security and network overhead, bounding the damage window of any compromised credential while avoiding the latency cost of per-request remote validation. Verification is performed locally by the receiving system using the issuer's public key — no round-trip to a central server, no single point of failure.
The protocol is designed to be infrastructure-neutral and governance-neutral. The core standard is open-source and free to implement. A foundation governs the protocol. A separate commercial entity provides enterprise-grade identity services, audit tooling, and compliance reporting — following the governance model established by Linux, Terraform, and OAuth itself.
The problem is urgent across finance, enterprise procurement, and healthcare, where the consequences of unauthenticated agentic access range from financial fraud to regulatory violation to irreversible harm to patients. Proprietary solutions are already emerging — Mastercard has announced a framework for agentic commerce, NVIDIA is building NemoClaw as a proprietary security layer for OpenClaw. Fragmentation is beginning. The window to establish a neutral open standard is open now and will not remain open indefinitely.
AgentPass is proposed as the OAuth 2.0 of the agentic economy.

## 1. The Problem
1.1 The Agentic Shift
The nature of software is changing. For three decades, digital systems operated on a simple assumption: a human being initiates every consequential action. A person logs in, a person approves the transaction, a person clicks confirm. Authentication systems, access controls, and audit frameworks were all built on this assumption.
That assumption is no longer valid.
Autonomous AI agents are already operating in production environments across the world's most sensitive industries. In financial services, agents are executing payment authorization decisions in under 200 milliseconds and managing end-to-end lending workflows from application to disbursement without human review. In healthcare, agents are accessing electronic health records, processing insurance claims, and coordinating patient data across institutional systems continuously and independently. In enterprise procurement, agents are identifying suppliers, negotiating terms, and placing orders on behalf of organizations — interacting with external vendor systems that have no way to verify the agent's legitimacy.
This is not a projection. It is the current state of deployment, accelerating rapidly. The AI agent market in financial services alone is projected to grow 815% between 2025 and 2030.

1.2 The Authentication Gap
Every time an autonomous agent interacts with an external system, that system faces three questions it cannot currently answer.
Who are you? Is this agent legitimately deployed by the organization it claims to represent, or is it a malicious system impersonating a trusted counterparty?
Who authorized you? Did the account holder or organization actually instruct this agent to perform this action, or has the agent been compromised, manipulated, or redirected by a malicious actor?
What are you permitted to do? Does this agent have a bounded mandate — spend up to €5,000, access only this patient's records, order only from approved suppliers — or does it have unconstrained authority?
Existing authentication standards cannot answer these questions. OAuth 2.0 and OpenID Connect — the protocols that govern authentication across most of the modern internet — were designed for a world where a human being is present at the moment of authentication, available to complete a browser redirect, read a consent screen, and click approve. An autonomous agent operating at three in the morning, executing a predefined strategy, has no human available to complete this flow. The incompatibility is not a matter of implementation. It is structural.
The result is a forced binary choice that no receiving system should have to make: trust all agent traffic blindly and accept the fraud risk, or block all agent traffic and forfeit the operational efficiency that autonomous systems provide. Neither option is acceptable at scale.

1.3 The Cost of Inaction
The broader cybersecurity context in which autonomous agents operate is already under extreme pressure. According to IBM's 2025 Cost of a Data Breach Report, the average cost of a healthcare breach has exceeded $7.4 million — the highest of any industry for fourteen consecutive years. Of organizations that reported AI-related security incidents, 97% lacked proper AI access controls at the time of the breach. Healthcare breaches take an average of 279 days to identify and contain. According to CrowdStrike's 2026 Global Threat Report, AI-enabled adversarial operations increased 89% year-over-year, with the average breakout time — the window between initial system access and lateral movement to critical assets — falling to 29 minutes in 2025, 65% faster than the previous year.

According to Unit 42, the mean time to exfiltrate data has already fallen from nine days in 2021 to 30 minutes in 2025.

These figures reflect attacks that still involved significant human coordination.According to ThreatDown's 2026 State of Malware Report, 2025 delivered the first confirmed cases of AI-orchestrated attacks at scale. In August 2025, Anthropic documented a threat actor using an autonomous AI agent to conduct reconnaissance across thousands of VPN endpoints, harvest credentials, penetrate networks, and generate tailored ransom notes — targeting healthcare and defense organizations simultaneously, without human intervention at each step. Autonomous AI agents operate without human cognitive limitations — no fatigue, no hesitation, no operational errors. They can run multiple simultaneous intrusions autonomously, create exploits from patches in minutes, and operate continuously across every system they are authorized to touch.

This does not mean AgentPass eliminates all attack vectors in agentic systems. It eliminates the most fundamental and most scalable one: the ability of unauthorized agents to impersonate legitimate ones. A receiving system that cannot verify who sent an agent, whether that agent is authorized, and what it is permitted to do, cannot distinguish a legitimate request from a fraudulent one — regardless of how sophisticated its downstream defenses are. AgentPass addresses the problem at the point of entry, before any action is permitted, not after damage has occurred.
The future of financial fraud will not arrive wearing a mask and carrying a weapon. It will arrive as a well-formed API request from an agent that no receiving system can distinguish from a legitimate one.
Proprietary responses are emerging — Mastercard has announced Agent Pay, Visa is developing its own agentic commerce framework, NVIDIA is building NemoClaw as a security layer for OpenClaw deployments. Each solution addresses the problem within its own ecosystem. None addresses it universally. Fragmentation is not a future risk. It has already begun.
The window to establish a neutral, open standard is open now. The question is whether that standard will be defined by a neutral protocol or by the commercial interests of the platforms that build it first.

## 2. Why Existing Solutions Don't Work

## 3. The AgentPass Solution

## 4. Technical Architecture

### 4.1 The AgentPass Token
### 4.2 Short-lived Tokenization
### 4.3 Agent-Gate

## 5. Governance Model

## 6. The Regulatory Lever

## 7. Security Considerations

## 8. Open Questions

## 9. References
