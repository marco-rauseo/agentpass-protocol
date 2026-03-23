# AgentPass-protocol
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
These figures reflect attacks that still involved significant human coordination.According to ThreatDown's 2026 State of Malware Report, 2025 delivered the first confirmed cases of AI-orchestrated attacks at scale. In August 2025, Anthropic documented a cybercriminal using Claude Code to conduct large-scale extortion across at least 17 organizations — including healthcare, emergency services, and government institutions — automating reconnaissance, credential harvesting, network penetration, and the generation of targeted ransom notes demanding up to $500,000. In September 2025, Anthropic disclosed a separate state-sponsored campaign in which a Chinese threat actor manipulated Claude Code to execute 80-90% of a cyberattack autonomously against 30 global targets, representing the first documented case of a large-scale cyberattack largely executed without human intervention.
Autonomous AI agents operate without human cognitive limitations — no fatigue, no hesitation, no operational errors. They can run multiple simultaneous intrusions autonomously, create exploits from patches in minutes, and operate continuously across every system they are authorized to touch.

This does not mean AgentPass eliminates all attack vectors in agentic systems. It eliminates the most fundamental and most scalable one: the ability of unauthorized agents to impersonate legitimate ones. A receiving system that cannot verify who sent an agent, whether that agent is authorized, and what it is permitted to do, cannot distinguish a legitimate request from a fraudulent one — regardless of how sophisticated its downstream defenses are. AgentPass addresses the problem at the point of entry, before any action is permitted, not after damage has occurred.
The future of financial fraud will not arrive wearing a mask and carrying a weapon. It will arrive as a well-formed API request from an agent that no receiving system can distinguish from a legitimate one.
AgentPass does not claim to eliminate this threat entirely. It eliminates one of its most scalable vectors — the impersonation of legitimate agents by unauthorized systems. A stolen token remains a stolen token. The ten-minute expiration window and behavioral verification at renewal bound the damage window and create detection opportunities that do not exist with static credentials. But the fundamental security of the agentic economy requires layers of defense beyond authentication — and AgentPass is one layer, not the last line.
Proprietary responses are emerging — Mastercard has announced Agent Pay, Visa is developing its own agentic commerce framework, NVIDIA is building NemoClaw as a security layer for OpenClaw deployments. Each solution addresses the problem within its own ecosystem. None addsiresses it universally. Fragmentation is not a future risk. It has already begun.
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
The AgentPass architecture consists of three components: the AgentPass Token — an open standard implementable by any party — the AgentPass Identity Provider — the enterprise service operated by AgentPass Inc. that issues and renews tokens — and Agent-Gate — the network-layer plugin that enforces token verification at the point of entry. The governance structure that defines the relationship between the open protocol and the commercial infrastructure is described in Section 5.

4.1 The AgentPass Token
The AgentPass Token is a JSON Web Token — a standard format for cryptographically signed digital credentials defined in RFC 7519. It consists of three components: a header declaring the signing algorithm and token type, a payload containing the agent's verified claims, and a cryptographic signature that makes the entire structure tamper-proof. Any modification to either the header or the payload — even a single character — invalidates the signature and causes the token to be rejected by any compliant receiving system.
A complete AgentPass Token is structured as follows:
```json
// Header
{
  "alg": "ES256",
  "typ": "JWT"
}
// Payload
{
  "agent_id": "ag_9f2b3c4d",
  "org": "Acme SpA",
  "org_verified": true,
  "scope": ["purchase", "read_catalog"],
  "max_spend": 5000,
  "currency": "EUR",
  "issued_at": 1710000000,
  "expires_in": 600,
  "jti": "a7f3c2d1-9b4e-4f8a-b2c6-1d3e5f7a9b0c"
}
```
The header declares the signing algorithm and token type. The payload contains the agent's verified claims. Both are base64url-encoded and concatenated with the cryptographic signature to form the complete token string transmitted by the agent at the point of entry.
Each payload field serves a precise purpose.
agent_id identifies this specific agent uniquely across the entire AgentPass network. It is assigned at registration and cannot be transferred to a different agent.
org and org_verified identify the organization that deployed the agent and confirm that the organization has completed AgentPass identity verification. A token with org_verified set to false will be rejected by Agent-Gate compliant systems.
scope defines the exact set of actions the agent is authorized to perform. Receiving systems are expected to enforce scope — an agent presenting a token with scope limited to read_catalog cannot execute a purchase, regardless of what it requests.
max_spend and currency encode the spending limit directly into the token. This limit is enforced at the protocol level. A receiving system that processes a transaction exceeding max_spend in violation of the token scope generates cryptographic evidence of the mandate violation — simplifying dispute resolution and audit without requiring AgentPass to make legal determinations.
issued_at records the exact timestamp of token issuance in Unix time. Receiving systems should reject tokens with issued_at values in the future or more than sixty seconds in the past, preventing clock-skew attacks.
expires_in defines the token lifetime in seconds. The standard AgentPass token lifetime is 600 seconds — ten minutes. The rationale for this duration is described in Section 4.2.
jti is a globally unique identifier for this specific token instance. Receiving systems that cache used jti values can reject replay attacks — attempts to reuse a previously presented token — even within the validity window. No two AgentPass tokens share the same jti value.
The signing algorithm declared in the header is ES256 — ECDSA with P-256 curve and SHA-256 hash — the same standard used by Apple Pay, modern TLS certificates, and the majority of high-security authentication systems deployed at scale.
Verification is performed locally by the receiving system using the AgentPass public key. No network call is required. No central server is queried. Verification completes in under one millisecond. If the AgentPass Identity Provider is temporarily unavailable, previously issued tokens remain verifiable until their expiration — there is no single point of failure in the verification path.

4.2 Short-lived Tokenization
The ten-minute token lifetime is not an arbitrary choice. It is the result of a deliberate tradeoff between three competing requirements: security, network overhead, and operational continuity.
Traditional credential systems address compromised credentials through revocation — maintaining a Certificate Revocation List or an Online Certificate Status Protocol endpoint that receiving systems query in real time to check whether a credential has been invalidated. This approach has two structural problems. First, it introduces latency — every verification requires a network round-trip to the revocation server. Second, it creates a single point of failure — if the revocation server is unavailable, receiving systems must choose between failing open (accepting potentially revoked credentials) or failing closed (rejecting all credentials). Neither option is acceptable in high-stakes agentic environments.
AgentPass eliminates the need for revocation infrastructure by making credentials short-lived enough that revocation becomes unnecessary for most threat scenarios. A stolen token expires within ten minutes. A compromised agent stops functioning within ten minutes of its last successful renewal. The damage window is mathematically bounded without requiring any real-time infrastructure.
Ten minutes represents the boundary point at which this tradeoff is optimal. Shorter lifetimes — one minute, thirty seconds — would reduce the damage window further but increase renewal frequency to a level that creates measurable network overhead at scale. Longer lifetimes — one hour, one day — would reduce renewal overhead but reintroduce meaningful damage windows that approach those of traditional static credentials.
Renewal is silent and proactive. At minute eight of each ten-minute window, the AgentPass Identity Provider generates a new token and delivers it to the agent before the current token expires. The agent never experiences an interruption in service. From the perspective of receiving systems, the agent presents a continuously valid credential.
The renewal moment is the primary security checkpoint in the AgentPass architecture. Behavioral verification at renewal is performed by the AgentPass Identity Provider — not by the deploying organization. This design choice is deliberate: an organization cannot objectively monitor its own agents for compliance with the same rigor that an independent third party can apply. By placing the renewal decision with a neutral infrastructure operator, AgentPass ensures that the monitoring function is structurally independent of the entity that benefits from the agent's operation.
To address privacy and decentralization concerns, the behavioral verification process operates on anonymized telemetry signals — aggregate behavioral metadata transmitted by Agent-Gate at the network layer. The Identity Provider receives pattern signals: request volume, action type distribution, scope consistency, and anomaly indicators. It does not receive the content of agent requests, the data exchanged between agent and receiving system, or any information that would allow reconstruction of individual transactions. AgentPass is not a point of interception. It is a point of pattern verification.
Anonymization is enforced through differential privacy — a mathematical technique that adds calibrated noise to aggregated behavioral data, making it computationally infeasible to reconstruct individual transactions even for the Identity Provider itself. This is the same technique used by Apple for iPhone usage analytics and by Google for Chrome browsing data.
At each renewal, the AgentPass Identity Provider evaluates the agent's activity over the preceding ten minutes against its declared mandate. Anomaly indicators include action volume outside expected parameters, requests for resources outside the declared scope, geographic or network origin inconsistencies, and interaction patterns consistent with prompt injection. If the behavioral profile exceeds the anomaly threshold, renewal is denied. The current token expires at its scheduled time and the agent ceases to function without requiring any manual intervention.

4.3 Agent-Gate
Agent-Gate is the distribution mechanism that transforms AgentPass from a protocol into a network effect.
The adoption problem for any authentication standard is bilateral: both the entities issuing credentials and the entities verifying them must adopt the protocol for it to have value. Historically, this chicken-and-egg problem has been solved either by regulatory mandate — forcing adoption through compliance requirements — or by platform leverage — a dominant platform requiring adoption as a condition of access.
Agent-Gate addresses the adoption problem from the receiving side through integration with existing network infrastructure. It is implemented as a plugin for major Content Delivery Networks and Web Application Firewalls — Cloudflare Workers, AWS WAF, Akamai Edge — that already process a significant fraction of global internet traffic. A system operator that deploys Agent-Gate does not modify their backend infrastructure. They add a rule to their existing network layer.
Agent-Gate classifies all incoming traffic into two categories based on the presence and validity of an AgentPass Token.
Traffic presenting a valid AgentPass Token receives preferential treatment: direct API access, structured data responses, reduced rate limiting, and priority routing. This is the fast lane — optimized for legitimate autonomous agents operating within verified mandates.
Traffic that does not present a valid AgentPass Token — or presents an invalid, expired, or unrecognized token — is routed to the slow lane: aggressive rate limiting, CAPTCHA challenges, degraded data responses, and increased latency. This traffic is not blocked. It is penalized.
The distinction between blocking and penalizing is architecturally significant. Blocking unauthenticated agent traffic would create friction for legitimate use cases that have not yet adopted AgentPass and would invite legal challenges in jurisdictions with open access requirements. Penalizing unauthenticated traffic creates an economic incentive — an agent operating in the slow lane incurs a cost in time and computational resources that makes AgentPass adoption the rational choice for any organization deploying agents at scale.
The deployment path for Agent-Gate is a single partnership rather than thousands of individual sales. Cloudflare serves approximately 20% of global internet traffic. A technical partnership that makes Agent-Gate available as a native Cloudflare Worker reduces the adoption barrier for receiving systems from a custom integration project to a configuration toggle. This distribution model is the primary mechanism by which AgentPass can achieve network-scale adoption within the 18-to-24-month window before proprietary alternatives reach comparable distribution. Anomaly detection thresholds in Agent-Gate are configurable per deployment context. A high-frequency financial agent operating thousands of transactions per minute requires different behavioral parameters than a procurement agent placing weekly orders. AgentPass Inc. provides sector-specific threshold templates as part of the enterprise service layer.

## 5. Governance Model
5.1 The Separation Principle
The history of internet infrastructure offers a consistent lesson: protocols that are owned by commercial entities eventually serve commercial interests. Protocols that are governed by neutral foundations become universal infrastructure.
HTTP is not owned by anyone. OAuth is not owned by anyone. JWT is not owned by anyone. This is not accidental — it is the precondition for universal adoption. An organization will not build critical infrastructure on a protocol that a competitor can modify, restrict, or monetize unilaterally.
AgentPass is designed from its first version with this principle embedded in its governance structure. The protocol and the commercial services built on top of it are structurally separated into two distinct entities with distinct mandates.

5.2 AgentPass Foundation
The AgentPass Foundation is an independent non-profit organization that owns and governs the AgentPass protocol specification.
Its mandate is narrow and permanent: maintain the open specification, publish updates through a transparent RFC process, ensure that the protocol remains implementable by any party without royalty or restriction, and prevent any single entity — including AgentPass Inc. — from modifying the protocol in ways that serve commercial interests at the expense of interoperability.
The Foundation owns the token format specification, the verification algorithm requirements, the Agent-Gate interface standard, and the conformance testing suite. Any implementation that passes the conformance tests is a valid AgentPass implementation — regardless of who built it or whether they have any commercial relationship with AgentPass Inc.
The governance model follows the precedent established by the Linux Foundation, the Apache Software Foundation, and the Internet Engineering Task Force. Technical decisions are made through a public process. Specification changes require review periods and community comment. No single organization holds veto power over the protocol's direction.
The Foundation's operating budget comes from membership fees paid by organizations that benefit from the protocol's existence — technology companies, financial institutions, healthcare systems, and others that deploy agents or operate receiving systems. Membership confers no special rights over the protocol — only participation in the governance process.
The open-source nature of the Agent-Gate plugin and the public availability of the token verification specification ensure business continuity independent of AgentPass Inc.'s operational status. If AgentPass Inc. were to cease operations, receiving systems would continue to verify tokens using the Foundation's public keys, Agent-Gate deployments on Cloudflare and AWS would continue to function, and any organization could deploy its own Identity Provider implementation using the open specification. The protocol's operation does not depend on the commercial entity's survival.

5.3 AgentPass Inc.
AgentPass Inc. is the venture-backed commercial entity that builds and operates the enterprise services layer above the open protocol.
Its mandate is distinct from the Foundation's: provide the infrastructure, tooling, and support that organizations require to deploy AgentPass at production scale, and generate the revenue that sustains the protocol's commercial ecosystem.
AgentPass Inc. operates three commercial services.
The AgentPass Identity Provider is the enterprise service that issues and renews AgentPass Tokens for organizations that require production-grade SLA guarantees, compliance reporting, and dedicated support. Any organization can implement its own token issuance infrastructure using the open specification — but organizations that require contractual guarantees, audit trails for regulators, and 99.99% uptime SLAs purchase these from AgentPass Inc.
Agent-Gate Enterprise is the commercial distribution of the Agent-Gate plugin for organizations that require advanced policy management, custom anomaly detection thresholds, integration with existing SIEM systems, and dedicated support contracts. The open-source version of Agent-Gate is freely available and covers the core fast-lane and slow-lane classification functionality. The enterprise version adds the operational tooling that regulated industries require.
Compliance Reporting is the service that generates the documentation required by regulated organizations to demonstrate due diligence under the EU AI Act and equivalent frameworks. It translates the cryptographic audit trail generated by AgentPass Token interactions into human-readable compliance reports suitable for submission to regulatory authorities. As autonomous agents become subject to increasing regulatory scrutiny, the ability to produce a verifiable, timestamped record of every agent interaction — who acted, under what mandate, on which system, at what time — becomes a compliance requirement rather than an optional feature.
AgentPass Inc. derives no revenue from the protocol specification itself. It cannot charge for token verification, which is performed locally by receiving systems using the public specification. Verification is performed using public keys distributed by the Foundation's trusted root — ensuring that the trust anchor remains independent of any commercial entity and cannot be revoked or restricted by AgentPass Inc. or any future acquirer. Its revenue comes entirely from the value-added services that require operational infrastructure, contractual guarantees, and ongoing support — services that a foundation cannot provide and that the open protocol does not mandate.

5.4 The HashiCorp Lesson
The governance structure described above is designed explicitly to avoid the failure mode that ended HashiCorp's status as a neutral open-source steward.
HashiCorp created Terraform — the dominant infrastructure-as-code tool — as open-source software. For years, Terraform's open license made it the default choice for infrastructure teams globally. In 2023, HashiCorp changed Terraform's license from the Mozilla Public License to the Business Source License — a change that restricted commercial use by competitors. The decision was commercially rational for HashiCorp. It was structurally damaging to the ecosystem that had grown around Terraform's open governance promise.
The community responded by forking Terraform into OpenTofu, now maintained by the Linux Foundation. IBM acquired HashiCorp for $6.4 billion — announced in April 2024 and completed in February 2025 — validating the commercial value of the enterprise services layer — but the governance damage was done.
AgentPass avoids this outcome by transferring the protocol specification to the Foundation at inception — before commercial pressures make such a transfer costly or controversial. The Foundation's ownership of the specification is permanent and irrevocable. AgentPass Inc. can be acquired, can change strategy, or can cease to exist — the protocol continues under Foundation governance regardless.

## 6. The Regulatory Lever
6.1 The EU AI Act and Agentic Systems
The EU AI Act entered into force on 1 August 2024 and will be fully applicable on 2 August 2026. It is the world's first comprehensive legal framework for artificial intelligence — and it applies to any organization whose AI systems affect people within the EU, regardless of where the company is headquartered.
Non-compliance with prohibited AI practices is subject to administrative fines of up to €35 million or 7% of a company's total worldwide annual turnover for the preceding financial year, whichever is higher. Non-compliance with obligations related to high-risk AI systems carries fines of up to €15 million or 3% of global annual turnover.
The Act classifies AI systems into four risk tiers. Autonomous agents operating in financial services, healthcare, and enterprise procurement — the three sectors where AgentPass is most immediately relevant — fall into the high-risk category under Annex III. High-risk AI systems require data protection impact assessments, internal monitoring, and the maintenance of a complete inventory of AI systems with risk classification. Deployers must guarantee competent human oversight, monitor operations continuously, maintain logs for a minimum of six months, and report any risk or incident to competent authorities.
The obligation that creates direct urgency for AgentPass is Article 26 — the deployer obligation. Organizations that deploy high-risk AI systems must be able to demonstrate that they know what AI systems are operating within their processes, who controls them, and that appropriate human oversight mechanisms are in place. An organization that accepts connections from autonomous agents without verified identity cannot satisfy this obligation. It cannot demonstrate that it knows who sent the agent, whether the agent is authorized, or what the agent is permitted to do.
The AgentPass Token's scope field provides machine-verifiable evidence that an agent is operating exclusively on data and systems for which it has received an explicit mandate — directly addressing the Article 26 requirement that deployers ensure their AI systems operate within defined parameters.
This is not a theoretical risk. EU member states have designated enforcement authorities with powers to investigate violations, conduct audits, and impose penalties. These authorities coordinate through the European AI Board to ensure consistent interpretation across jurisdictions. The enforcement infrastructure is operational. The question is not whether these obligations will be enforced — it is whether organizations will be able to demonstrate compliance when they are.

6.2 Compliance-as-a-Code
AgentPass transforms the EU AI Act's due diligence obligation from a legal problem into a technical solution.
Today, an organization that wants to demonstrate compliance with Article 26 must rely on manual processes — contracts with agent deployers, internal audits, policy documentation. These processes are slow, expensive, and produce evidence that is difficult to verify. A regulator asking "can you prove that the agents interacting with your systems were authorized?" receives a folder of documents instead of a cryptographic proof.
With AgentPass, the answer is immediate and machine-verifiable. Every agent interaction generates a cryptographically signed record — who the agent was, which organization deployed it, what it was authorized to do, what it actually did, and when. This record cannot be falsified. It is produced automatically as a byproduct of the authentication process, without additional compliance effort.
AgentPass Compliance Reporting translates this cryptographic audit trail into human-readable documentation suitable for submission to national regulatory authorities. The compliance report is not produced retroactively — it is generated continuously as agents operate. When a regulator requests evidence of due diligence, the organization produces a timestamped, cryptographically verifiable record of every agent interaction. Not a policy document. A proof.
The European AI Office — established by European Commission Decision of 24 January 2024 and operating under Chapter VII of the AI Act — published its first General-Purpose AI Code of Practice on July 10, 2025, with Amazon, Google, Microsoft, OpenAI, and Anthropic among the early signatories. This precedent demonstrates that the Code of Practice mechanism is operational and that major AI players are willing to adopt formal compliance frameworks when the regulatory incentive is sufficient. A formal proposal to include AgentPass token verification as a recommended technical measure within a future Code of Practice specific to autonomous agentic systems would elevate the protocol from a market solution to a regulatory reference standard. This is a strategic objective for AgentPass Foundation in the 24 months following the protocol's public release.
This is what we call Compliance-as-a-Code — the transformation of a regulatory obligation into an automated technical output that requires no additional human effort once the infrastructure is in place.

6.3 The Adoption Sequence
The regulatory lever operates through a specific sequence that does not require AgentPass to convince the large AI platforms directly.
The sequence begins with regulated European enterprises — banks, insurance companies, healthcare systems, critical infrastructure operators. These organizations face the August 2026 deadline with a concrete problem: they are already receiving connections from autonomous agents and they cannot demonstrate the due diligence that Article 26 requires. AgentPass solves this problem immediately and completely.
When a European bank installs Agent-Gate and configures it to require AgentPass tokens from all incoming agent traffic, it does two things simultaneously. It satisfies its own compliance obligation under the EU AI Act. And it creates a commercial requirement for every organization that wants its agents to interact with that bank.
A financial institution that deploys agents to interact with European banks must now ensure its agents carry AgentPass tokens — not because it has been persuaded that AgentPass is technically superior, but because its clients require it as a condition of access. The requirement propagates through commercial relationships, not through technical evangelism.
OpenAI, Anthropic, and Google do not adopt AgentPass because they find it technically compelling. They adopt it because their enterprise European clients — the banks, the insurance companies, the healthcare systems — insert AgentPass token requirements into their vendor contracts. An AI platform that cannot deliver AgentPass-compliant agents loses access to the European enterprise market.
This is the adoption sequence that makes AgentPass structurally different from a technology looking for users. It is a compliance solution looking for a deadline — and the deadline is August 2, 2026.


## 7. Security Considerations
7.1 Token Theft and the Ten-Minute Window
An AgentPass Token is a bearer credential — any system that possesses a valid token can present it to a receiving system and receive access. If a token is stolen, the attacker possesses a temporarily valid credential.
The primary mitigation is the ten-minute expiration window. A stolen token is valid for a maximum of ten minutes from its last renewal. This does not eliminate the risk of token theft — it bounds the damage window mathematically. An attacker with a stolen token has less than ten minutes to exploit it before it expires and cannot be renewed without access to the agent's issuing infrastructure. Accurate expiration enforcement requires that receiving systems maintain time synchronization via Network Time Protocol. AgentPass specifies a maximum clock skew tolerance of sixty seconds — slightly more permissive than the 5-30 second range recommended by most JWT implementations — to accommodate heterogeneous enterprise environments where strict NTP synchronization may not always be achievable. A clock skew exceeding sixty seconds between the issuing infrastructure and the receiving system may cause tokens to be rejected prematurely or accepted after expiration. AgentPass-compliant receiving systems must implement NTP synchronization as a baseline operational requirement.
The secondary mitigation is the jti — the unique token identifier. Receiving systems that cache used jti values can detect and reject replay attacks — attempts to reuse a token that has already been presented — even within the ten-minute validity window. This requires receiving systems to maintain a short-lived cache of used token identifiers, which is a standard implementation pattern in high-security environments.
The tertiary mitigation is behavioral verification at renewal. If a stolen token is used to conduct anomalous activity, the behavioral profile at the next renewal checkpoint will diverge from the agent's established pattern. Renewal will be denied and the agent will cease to function at expiration. This does not prevent damage within the current ten-minute window — but it limits the attack to a single renewal cycle.
Token theft in the AgentPass model is analogous to physical document theft. If someone steals your passport, the issuing authority is not responsible for how it is used. The deploying organization is responsible for securing the agent's operating environment and the credentials it holds. AgentPass provides the credential format and the expiration mechanism. The security of the environment in which the credential is stored is the deployer's responsibility.

7.2 Prompt Injection and Mandate Integrity
AgentPass verifies that an agent is who it claims to be and that it is authorized to perform the actions it requests. It does not verify that the agent's internal reasoning has not been manipulated.
Prompt injection is an attack in which malicious instructions are embedded in data that the agent processes — a document, a web page, an API response — causing the agent to act in ways that were not intended by the deploying organization but that remain within the technical scope of its mandate. An agent authorized to spend up to €5,000 on cloud infrastructure that has been manipulated to spend €5,000 on an attacker-controlled service will present a valid token and receive access. AgentPass will not block this transaction.
This is a known and declared limitation. AgentPass is an authentication and authorization layer — it verifies identity and mandate boundaries. It is not a behavioral integrity layer. Organizations deploying agents in high-risk environments should combine AgentPass with runtime monitoring systems capable of detecting behavioral anomalies that fall within mandate boundaries but deviate from expected operational patterns.
The cryptographic audit trail generated by AgentPass Token interactions provides post-hoc evidence of what occurred — which agent acted, under which mandate, on which system, at what time. This evidence is valuable for incident response and regulatory reporting even when it cannot prevent the incident itself.

7.3 Environment Cloning and Hardware Attestation
An AgentPass Token proves the identity of an agent as registered with the AgentPass Identity Provider. It does not prove that the agent is running in a secure, unmodified execution environment.
A sophisticated attacker who gains access to an agent's execution environment — the container or virtual machine in which the agent operates — may be able to extract the agent's private keys and clone the environment. A cloned environment possesses the same cryptographic identity as the original agent and will receive valid tokens that are indistinguishable from legitimate ones.
The mitigation for high-risk deployments is hardware attestation through Trusted Execution Environments — TEE. Technologies such as Intel TDX and AMD SEV-SNP allow an agent to cryptographically prove that it is running on specific physical hardware in an unmodified environment. Confidential computing infrastructure is now available as a standard option across all three major cloud providers. An AgentPass Token can optionally include a TEE attestation field for deployments that require this level of assurance.
TEE attestation is not required for all AgentPass deployments. It is recommended for agents operating in critical infrastructure, financial systems processing high-value transactions, and healthcare environments handling sensitive patient data. The AgentPass Foundation maintains a conformance profile for high-assurance deployments that specifies when TEE attestation is required.

7.4 Legal Liability
AgentPass is a notary, not a guarantor. It certifies that a credential is authentic and that the agent presenting it has been registered by a verified organization. It does not certify that the agent will behave correctly or that the deploying organization is trustworthy.
The legal responsibility for an agent's actions rests with the organization that deployed it — regardless of whether the agent carries a valid AgentPass Token. An AgentPass Token does not transfer liability from the deploying organization to AgentPass Inc. or to the AgentPass Foundation.
What AgentPass provides is evidence — a cryptographically verifiable, timestamped record of every agent interaction that can be used in dispute resolution, regulatory proceedings, and incident investigations. This evidence simplifies the attribution of responsibility without determining it. A receiving system that suffers damage from an authenticated agent can use the AgentPass audit trail to identify the deploying organization, document the scope of the agent's mandate, and demonstrate that the agent operated outside or within its authorized parameters.
This model is analogous to the legal status of Certificate Authorities in the HTTPS ecosystem. A CA that issues an SSL certificate to a website is not liable for the content of that website or for any fraud conducted through it. The CA certifies the identity of the domain holder. Liability for the use of that identity rests with the domain holder. AgentPass operates under the same principle.

7.5 Resilience and Availability Strategy
The availability of the Identity Provider is guaranteed through a three-tier model designed to eliminate the single point of failure without compromising the security properties of the protocol.
Tier 1 — Global Federation
The base infrastructure consists of geographically distributed IdP nodes operated across independent cloud providers. If an entire AWS region becomes unavailable, renewal requests are instantly routed to nodes running on Azure or Google Cloud in other regions. This resolves localized infrastructure failures without any interruption to agent operations. The initial AgentPass Inc. deployment operates with geographically redundant nodes across at least three independent availability zones. Full federation with independent regional operators is a target for the 18-to-36-month window following the protocol's public release.
Tier 2 — Emergency Grace Period
In the event of total network renewal unavailability, the AgentPass protocol includes an Emergency Extension clause. Agent-Gate, upon detecting that it cannot contact the trust root for renewal verification, may extend the validity of the current token for a maximum of 60 minutes. This extension is logged locally and transmitted to the Identity Provider as soon as connectivity is restored. The tradeoff is explicit: the damage window temporarily widens from ten minutes to sixty minutes. This tradeoff is acceptable for most enterprise deployments, where operational continuity — particularly in healthcare environments — takes precedence over the marginal increase in exposure during an infrastructure emergency. Organizations with zero-tolerance security requirements may disable the Emergency Extension clause in their Agent-Gate configuration.
Tier 3 — On-Premise Certified Issuers
For national critical infrastructure and large financial institutions, AgentPass Foundation permits the deployment of Local Issuers — on-premise Identity Provider nodes that issue tokens autonomously within the organizational perimeter without dependency on any external infrastructure. This tier provides the strongest availability guarantee and the strongest sovereignty argument: an organization operating a certified Local Issuer can truthfully state that its agent authentication infrastructure does not depend on any foreign commercial entity.
Local Issuers must complete an annual certification process administered by AgentPass Foundation and must transmit anonymized telemetry logs to the Foundation to maintain the validity of their signing key. Failure to complete annual recertification results in the revocation of the Local Issuer's signing authority.
Deployment maturity path
The three tiers map to deployment maturity. Startups and SMEs use Tier 1 — the standard federated infrastructure operated by AgentPass Inc. Enterprise organizations add Tier 2 — the Emergency Extension clause for operational resilience. Critical infrastructure operators implement Tier 3 — the on-premise Local Issuer for full operational sovereignty.



## 8. Open Questions
8.1 — Federated Node Governance
The three-tier availability model described in Section 7.5 proposes federation as the solution to the Identity Provider single point of failure. Federation introduces its own governance challenge: who has the authority to certify a new IdP node as a legitimate participant in the AgentPass network? How is a compromised regional node revoked instantly without isolating the legitimate agents that depend on it for renewal? A node revocation mechanism that operates faster than the ten-minute token expiration window is required — but no such mechanism is specified in this version of the protocol. This is a priority item for AgentPass v2.
8.2 — Bootstrap Risk in Phase One
The full three-tier availability architecture — Global Federation, Emergency Grace Period, and On-Premise Certified Issuers — requires significant engineering investment to implement. In the period between the protocol's public release and the full deployment of Tier 2 and Tier 3 infrastructure, AgentPass operates on a partially centralized architecture. A significant downtime event during this bootstrap window could damage the protocol's reputation before it has achieved sufficient adoption to survive the disruption. Mitigating bootstrap risk requires an explicit commitment to a deployment timeline for Tier 2 and Tier 3 infrastructure, communicated transparently to early enterprise adopters.
8.3 — Behavioral Verification at Scale
The renewal-time behavioral verification described in Section 4.2 requires the AgentPass Identity Provider to analyze telemetry signals from potentially millions of agents simultaneously, every ten minutes. The computational cost of this analysis at global scale is not yet quantified. It is possible that the differential privacy noise required to protect telemetry anonymization reduces the accuracy of anomaly detection to a level that makes behavioral verification operationally ineffective. The tradeoff between privacy preservation and detection accuracy at scale is an open engineering problem that requires empirical measurement rather than theoretical analysis.
8.4 — Identity Inflation and Authentication DDoS
If the cost of registering an AgentPass identity is too low — in time, money, or verification effort — an attacker could generate millions of technically authenticated but disposable agent identities. These agents would carry valid tokens, pass Agent-Gate's fast lane, and saturate receiving systems with legitimate-looking but malicious traffic. The current protocol does not specify minimum requirements for identity registration friction. Defining a registration cost model that is low enough for legitimate adopters but high enough to make large-scale identity inflation economically unviable is an open problem.

Advanced Security
8.5 — Agent-in-the-Middle
An authenticated agent with a valid AgentPass Token could act as a proxy — forwarding requests from thousands of unauthenticated agents to receiving systems under the cover of its own valid credential. From AgentPass's perspective, only one authenticated agent is present. From the receiving system's perspective, only one authenticated agent is present. The actual traffic volume and behavioral pattern would reveal the proxy — but only if behavioral anomaly detection is sensitive enough to detect it. This attack vector is not addressed by the current protocol and represents a significant gap in the security model for high-value receiving systems.
8.6 — Semantic Drift of Mandates
AgentPass Tokens encode mandates in structured fields — scope, max_spend, permitted systems. These fields are defined with the semantics of today's AI capabilities. As large language models become more capable, the actions that fall within a given scope definition may expand significantly. An agent authorized today to "read and summarize documents" may, in two years, be capable of extracting, correlating, and exfiltrating sensitive information through actions that technically comply with the original scope definition. The protocol does not currently address how mandate semantics are versioned or how organizations are notified when capability evolution causes scope definitions to become inadequate. This is a fundamental challenge for any mandate-based authorization system operating in a rapidly evolving capability landscape.
8.7 — Recursive Delegation and Chain of Custody
Complex agentic workflows involve chains of delegation — Agent A, operating under a mandate from Organization X, delegates a subtask to Agent B operated by Organization Y, which in turn delegates to Agent C. The current protocol is designed for point-to-point authentication between a single agent and a receiving system. It does not specify how mandates are transferred, scoped, or attenuated through delegation chains. It does not specify how legal responsibility is attributed when damage occurs three steps down a delegation chain. Recursive delegation is already occurring in production agentic systems. The protocol's silence on this topic is a gap that will become increasingly significant as multi-agent workflows become the norm.

Global Governance
8.8 — Cross-Certification and Sovereign Fragmentation
Section 7.5 describes On-Premise Certified Issuers as a solution for organizations that require operational sovereignty. The same logic applies at the national level — governments may require that agent authentication for systems operating within their jurisdiction uses a nationally controlled root key rather than a Foundation-managed one. If multiple national AgentPass instances operate with incompatible root keys, an agent authenticated by the EU instance cannot be verified by a system that trusts only the US instance. A cross-certification mechanism — analogous to the international mutual recognition agreements used in the HTTPS certificate ecosystem — is required to prevent the fragmentation of the agentic economy along geopolitical lines. No such mechanism is specified in this version of the protocol.
8.9 — The Competing Standard Risk
The window between AgentPass's public release and the point at which it achieves sufficient adoption to be self-sustaining is the period of maximum vulnerability. During this window, a coordinated effort by major AI platforms — OpenAI, Microsoft, Google, Amazon — to launch a competing standard integrated into their existing identity infrastructure could prevent AgentPass from reaching critical mass. The regulatory lever described in Section 6 is the primary mitigation — European enterprise adoption driven by EU AI Act compliance requirements creates commercial pressure that the large platforms cannot ignore. However, the effectiveness of this mitigation depends on the speed of EU AI Act enforcement and the willingness of European enterprises to require AgentPass tokens as a contractual condition of agent access. Neither is guaranteed. This risk is acknowledged as the primary existential threat to AgentPass adoption and is not fully resolved by the current protocol or go-to-market strategy.
8.10 — Financial Independence of the Foundation
The AgentPass Foundation's neutrality depends on its financial independence from the entities it governs. If the Foundation's operating budget is funded primarily by membership fees from large technology companies, those companies gain disproportionate influence over the governance process — a dynamic known as regulatory capture. A Foundation that depends on Google's membership fee cannot credibly resist Google's influence over protocol development. Alternative funding models — including transaction-based micro-fees on enterprise AgentPass Inc. revenue, public research grants, and government contributions from jurisdictions that benefit from the standard — should be explored to ensure that the Foundation's financial structure is consistent with its governance mandate. This question is unresolved in the current governance model.

## 9. References
Standards and Specifications

[1] RFC 6749 — The OAuth 2.0 Authorization Framework
    Hardt, D. (Ed.), Internet Engineering Task Force, October 2012
    https://datatracker.ietf.org/doc/html/rfc6749

[2] RFC 6750 — The OAuth 2.0 Authorization Framework: Bearer Token Usage
    Jones, M., Hardt, D., Internet Engineering Task Force, October 2012
    https://datatracker.ietf.org/doc/html/rfc6750

[3] RFC 7519 — JSON Web Token (JWT)
    Jones, M., Bradley, J., Sakimura, N., Internet Engineering Task Force, May 2015
    https://datatracker.ietf.org/doc/html/rfc7519

[4] RFC 7515 — JSON Web Signature (JWS)
    Jones, M., Bradley, J., Sakimura, N., Internet Engineering Task Force, May 2015
    https://datatracker.ietf.org/doc/html/rfc7515

Regulatory and Legal Frameworks

[5] Regulation (EU) 2024/1689 — Artificial Intelligence Act
    European Parliament and Council, 12 July 2024
    https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689

[6] EU AI Act — Article 26: Obligations of Deployers of High-Risk AI Systems
    European Parliament and Council, 2024
    https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689

[7] General-Purpose AI Code of Practice — Final Version
    European AI Office, European Commission, 10 July 2025
    https://digital-strategy.ec.europa.eu/en/policies/ai-code-practice

[8] European AI Office — Establishment Decision
    European Commission DG CONNECT, 24 January 2024
    https://digital-strategy.ec.europa.eu/en/policies/ai-office

Security Research and Industry Reports

[9] Cost of a Data Breach Report 2025
    IBM Security, 2025
    https://www.ibm.com/reports/data-breach

[10] 2026 Global Threat Report
     CrowdStrike, 2026
     https://www.crowdstrike.com/global-threat-report

[11] 2026 State of Malware Report
     ThreatDown by Malwarebytes, 2026
     https://www.threatdown.com/state-of-malware

[12] Unit 42 Incident Response Report 2025
     Palo Alto Networks Unit 42, 2025
     https://unit42.paloaltonetworks.com/incident-response-report

[13] Claude Usage Policy — Misuse Documentation
     Anthropic, August 2025
     https://www.anthropic.com/usage-policy

Market Research

[14] AI Agents in Financial Services: Market Growth Projection
     Aggregate estimate based on multiple independent market research
     publications including MarketsandMarkets, Grand View Research,
     and Workday Research, 2025. Individual projections vary between
     600% and 900% growth between 2025 and 2030. The 815% figure
     cited in Section 1.1 represents the median of available estimates
     at time of writing. Readers should verify current projections
     against primary sources.

[15] Confidential Computing Market Report 2025
     Market research aggregators, 2025
     Projected market size: $5.8 billion, 38% CAGR

Industry Announcements and Precedents

[16] Mastercard Agent Pay — Agentic Commerce Framework
     Mastercard Newsroom, 2025
     https://www.mastercard.com/news

[17] NVIDIA NemoClaw — Security Layer for OpenClaw
     NVIDIA Developer Blog, 2025
     https://developer.nvidia.com

[18] HashiCorp License Change — Mozilla Public License to Business Source License
     HashiCorp Blog, 10 August 2023
     https://www.hashicorp.com/blog/hashicorp-adopts-business-source-license

[19] OpenTofu — Linux Foundation Acceptance
     Linux Foundation, 20 September 2023
     https://opentofu.org

[20] IBM Acquisition of HashiCorp
     IBM Press Release, announced April 2024, completed February 2025
     https://www.ibm.com/investor/att/pdf/hashicorp-acquisition.pdf

[21] OpenClaw — Autonomous AI Agent
     Peter Steinberger, 2025
     https://openclaw.ai
