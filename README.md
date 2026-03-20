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
2.1 OAuth 2.0 and the Human Assumption
OAuth 2.0 is the most widely deployed authentication protocol on the internet. It powers "Sign in with Google", "Connect with Facebook", and virtually every delegated access flow across modern web applications. It is well-designed, well-documented, and well-understood. It is also structurally incompatible with autonomous AI agents.
OAuth was designed in 2006 to solve a specific problem: how to allow a third-party application to access a user's resources without requiring the user to share their password. The solution was elegant — redirect the user to the identity provider, ask for explicit consent, issue a token. The entire protocol is built around one assumption: a human being is present at the moment of authentication, capable of reading a consent screen and clicking approve.
An autonomous agent operating at three in the morning has no human available to complete this flow. It cannot open a browser. It cannot read a consent screen. It cannot click approve. When a receiving system initiates an OAuth flow, the agent has no mechanism to respond. The authentication fails — not because of a bug, not because of a misconfiguration, but because the protocol was never designed for this use case.
This is not a criticism of OAuth. It is a precise description of its scope. OAuth solved the problem it was designed to solve. Autonomous agents represent a new problem that requires a new solution.

2.2 API Keys and Service Accounts
When engineers need two systems to communicate without a human in the loop, they typically reach for one of two tools: API keys or service accounts.
An API key is a static secret — a long string of characters that one system presents to another to identify itself. A service account is a non-human identity created specifically for software processes, used by platforms like AWS, Google Cloud, and Azure to allow programs to access resources without a human logged in.
Both approaches work for their intended purpose. Neither is sufficient for autonomous AI agents operating in high-stakes environments.
The fundamental limitation is that API keys and service accounts answer only one question: who are you. They do not answer who authorized you to act right now, what you are permitted to do in this specific context, what your spending limits are, or when your authorization expires. A stolen API key grants permanent access until someone manually revokes it. There is no built-in mechanism to express bounded mandates — an agent authorized to spend up to €5,000 on cloud infrastructure from approved vendors cannot encode that constraint in an API key. The receiving system has no way to know whether the agent presenting the key is acting within its authorized scope or has been compromised and redirected.
For a world of billions of autonomous agents operating continuously across sensitive systems, static credentials without context are not a security model. They are an assumption of trust with no mechanism for verification.

2.3 Proprietary Solutions and the Fragmentation Problem
The industry has recognized the authentication gap. Responses are emerging — Mastercard has announced Agent Pay, Visa is developing its own agentic commerce framework, NVIDIA has built NemoClaw as a security layer for OpenClaw deployments.
Each of these solutions works within its own ecosystem. None of them works universally.
An autonomous agent operating in the real world does not interact with a single platform. It interacts with dozens — a payment processor, a procurement system, a healthcare records provider, a logistics API, a legal document repository. If each of these systems requires a different proprietary authentication protocol, the agent must support all of them simultaneously. The organization deploying the agent must implement a separate integration for each platform it wants its agents to access. Every new system adds a new integration, a new credential to manage, a new failure point to monitor.
This is the fragmentation problem. And it compounds over time. As the number of agentic systems grows, the number of proprietary protocols multiplies. Organizations that want to deploy agents across multiple domains face an integration burden that scales with the number of platforms — not with the number of agents.
History has solved this problem before. HTTP eliminated the fragmentation of competing network protocols. OAuth eliminated the fragmentation of competing authentication flows for human users. In both cases, the solution was not a better proprietary system — it was an open standard that all platforms could adopt without ceding control to a competitor.
AgentPass proposes the same approach for the agentic economy. Not a proprietary solution that works within one ecosystem. An open standard that works across all of them — so that an agent needs to speak one protocol, not thirty.

## 3. The AgentPass Solution
3.1 The Core Concept
AgentPass solves the authentication gap with a principle borrowed from a familiar human institution: the legal proxy.
When a person reaches adulthood and needs to authorize someone else to act on their behalf — signing a contract, collecting a document, completing a financial transaction — they issue a formal delegation. The delegation specifies who is authorized to act, on whose behalf, for what specific purpose, and within what limits. The receiving party verifies the delegation without contacting the original issuer. If the document is valid and the scope matches the requested action, the operation proceeds.
AgentPass applies this principle to autonomous AI agents — with one critical difference. A paper proxy can be forged. An AgentPass Token cannot. It is signed with a private cryptographic key that exists only within the issuing infrastructure. The receiving system verifies the signature using a public key — confirming authenticity instantly, without contacting any external server, and without any possibility of replication by a third party.
Every organization that deploys an autonomous agent issues it an AgentPass Token — a cryptographically signed digital credential that answers the three questions no receiving system can currently answer: who are you, who authorized you, and what are you permitted to do.

3.2 How It Works
The flow has three steps.
An organization decides to deploy an autonomous agent. Before the agent begins operating, the organization registers it with AgentPass and defines its mandate — what the agent is authorized to do, on which systems, within what spending limits, and for what purpose. AgentPass issues the agent a signed credential encoding this mandate.
When the agent arrives at a receiving system — a supplier portal, a payment processor, a medical records database — it presents its credential. The receiving system verifies it instantly, without contacting any external server. It checks that the credential is authentic, that it has not expired, and that the requested action falls within the authorized scope. If all conditions are met, access is granted. If any condition fails, access is denied.
The credential is short-lived by design. It expires automatically and is renewed silently by the issuing infrastructure before expiry. At each renewal, AgentPass verifies that the agent is still operating within its authorized mandate. If something appears wrong, renewal is denied and the agent stops functioning — without any human intervention required.
The receiving system never needs to know who built the agent, which platform it runs on, or how it was trained. It needs to know only three things: that the agent is who it claims to be, that it is authorized to perform the requested action, and that its authorization is current. AgentPass provides all three answers in under one millisecond.

3.3 What AgentPass Does Not Do
Intellectual honesty requires stating explicitly what AgentPass does not solve.
AgentPass verifies that an agent is who it claims to be and that it is authorized to perform the actions it requests. It does not verify that the agent is behaving correctly once access is granted. A legitimate agent that has been compromised through prompt injection — manipulated by malicious instructions embedded in data it processes — will present a valid token and receive access. The damage it causes will be attributable and auditable, but not prevented at the point of entry.
AgentPass does not replace endpoint security, behavioral monitoring, or anomaly detection systems. It complements them. By establishing a verifiable identity layer, AgentPass transforms an opaque traffic problem into an auditable one — every agent interaction is attributable to a specific organization, every action is traceable to a specific mandate, every unauthorized access attempt is rejectable before any damage occurs.
The ten-minute renewal window and the behavioral check at renewal represent AgentPass's contribution to the broader security stack — a structural bound on the damage window of any compromised credential, combined with a mandatory checkpoint at which anomalous behavior can be detected and access terminated.


## 4. Technical Architecture

### 4.1 The AgentPass Token
### 4.2 Short-lived Tokenization
### 4.3 Agent-Gate

## 5. Governance Model

## 6. The Regulatory Lever

## 7. Security Considerations

## 8. Open Questions

## 9. References
