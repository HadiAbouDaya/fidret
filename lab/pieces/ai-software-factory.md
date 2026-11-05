---
schema_version: 1
slug: ai-software-factory
title: "AI software factory: the engineering kitchen"
kind: architecture
status: published
authors:
  - hadi
created: "2026-11-04"
published: "2026-11-04"
updated: "2026-11-05"
summary: "Explore a release-decision model for an AI-built change. Change its evidence and authority, then inspect the engineering."
resources:
  - label: "Michelin: what a Star recognizes (2025)"
    url: "https://guide.michelin.com/us/en/article/features/what-is-a-michelin-star"
  - label: "Anthropic: workflows and agents (2024, living revision)"
    url: "https://www.anthropic.com/research/building-effective-agents"
  - label: "Anthropic: evaluating agents (2026)"
    url: "https://www.anthropic.com/research/demystifying-evals-for-ai-agents"
  - label: "Anthropic: coding-agent audit realism (2026)"
    url: "https://alignment.anthropic.com/2026/coding-audit-realism/"
  - label: "NIST: AI Risk Management Framework governance"
    url: "https://airc.nist.gov/airmf-resources/airmf/5-sec-core/"
  - label: "NIST: Secure Software Development Framework v1.1 (2022)"
    url: "https://csrc.nist.gov/pubs/sp/800/218/final"
  - label: "OWASP: AI Agent Security Cheat Sheet"
    url: "https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html"
  - label: "Temporal: idempotency and durable execution"
    url: "https://temporal.io/blog/idempotency-and-durable-execution"
  - label: "Temporal: workflow versioning"
    url: "https://docs.temporal.io/develop/typescript/workflows/versioning"
  - label: "AWS: transactional outbox, ordering and duplicates"
    url: "https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html"
  - label: "GitHub Actions: secure use"
    url: "https://docs.github.com/en/actions/reference/security/secure-use"
  - label: "SLSA v1.2: verifying build artifacts"
    url: "https://slsa.dev/spec/v1.2/verifying-artifacts"
  - label: "GitHub: artifact attestations and their limits"
    url: "https://docs.github.com/en/actions/concepts/security/artifact-attestations"
  - label: "Google SRE: canarying releases"
    url: "https://sre.google/workbook/canarying-releases/"
  - label: "Argo Rollouts: analysis and inconclusive results"
    url: "https://argo-rollouts.readthedocs.io/en/stable/features/analysis/"
  - label: "AWS Builders' Library: rollback safety"
    url: "https://aws.amazon.com/builders-library/ensuring-rollback-safety-during-deployments/"
  - label: "Google SRE: example error-budget policy"
    url: "https://sre.google/workbook/error-budget-policy/"
  - label: "DORA: balancing AI tensions (2026 analysis of 2025 research)"
    url: "https://dora.dev/insights/balancing-ai-tensions/"
  - label: "DORA: delivery performance metrics"
    url: "https://dora.dev/guides/dora-metrics/"
  - label: "METR: why estimating current AI productivity is difficult (2026)"
    url: "https://metr.org/blog/2026-02-24-uplift-update/"
  - label: "METR: self-reported value and speed gains (May 2026)"
    url: "https://metr.org/blog/2026-05-11-ai-usage-survey/"
  - label: "Related Lab: designing a company agents can work in"
    url: "/lab/agentic-company-harness/"
  - label: "Editable software-factory operating brief"
    url: "/lab/ai-software-factory/operating-brief.md"
---

## Question

Can AI carry software work from a request through design, implementation, testing, release and operation while human engineers remain responsible for everything it does?

Yes, as an operating model to engineer and validate. **Full lifecycle automation describes the breadth of work. It does not mean unlimited authority.** A routine change can travel through a pre-authorized workflow without a fresh approval at every step. People still own the goals, permissions, standards, exceptions and consequences. They must be able to understand the work, withhold release, stop execution and recover the service.

This Lab proposes that model. The walkthrough follows a fictional booking service; it does not demonstrate an operating Fidret factory. It extends the [company-harness note](/lab/agentic-company-harness/) from organizational boundaries to software delivery. For Fidret, the connection is practical: expertise earns trust when the delivered result and the responsibility behind it can be examined.

### Why a Michelin kitchen?

Michelin emphasizes the quality of the finished food and consistency across the menu and over time. Its Stars recognize restaurants, and its criteria do not assess service or decor. That makes the finished result a useful starting point for this analogy. [Michelin's explanation](https://guide.michelin.com/us/en/article/features/what-is-a-michelin-star) is culinary guidance, not a software standard.

Our engineering interpretation is a kitchen with prepared stations, clear responsibilities and a release pass where the complete result is assessed before service. AI can perform substantial work at those stations. Humans and the organization operating them remain answerable for the result. The comparison is Fidret's synthesis, with no Michelin affiliation, endorsement or certification.

The metaphor stops at the explanation. Software needs explicit treatment of concurrency, adversarial inputs, sensitive information, long-lived state and irreversible external effects. “The chef checks it” cannot replace that design.

## Approach

### Start with the promise, including the awkward part

The request is to let a customer reschedule an eligible appointment. A useful outcome contract covers the screen, stored booking, calendar and reminders, together with authorization, accessible interaction and understandable failure messages. The owner decides non-goals, legal and data obligations with the appropriate specialists, and what happens when an action cannot be completed.

For example, booking version 12 contains the old time. Rescheduling creates version 13. A queued reminder for version 12 must not silently become a valid reminder for version 13. But a reminder can already be in flight. The product promise must identify an ordering boundary: which update or dispatch is considered to have happened first, and what customers are told if delivery has already begun.

A version check alone leaves a race between checking the booking and submitting the message. A [transactional outbox](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html) can make a booking update and its dispatch intent atomic in one database transaction; it does not make an external provider part of that transaction. A real design needs concurrency control for the relevant state transition, durable dispatch identities, provider-specific duplicate handling and a policy for effects beyond that boundary. Do not promise exactly-once customer delivery without evidence that the whole chain supports it.

### Give responsibility an actual operating shape

Responsibilities can be held by the same person in a small team, but they must stay distinguishable. The outcome owner resolves what the service promises. Engineering owns the design and maintainability. Verification owns the acceptance baseline. Release ownership covers the policy that permits promotion. Service ownership covers incidents and customer consequences. Factory ownership covers the automation itself. Leadership provides the capacity and incentives for these responsibilities to work.

This follows the governance emphasis on documented roles, risk decisions and appropriate independent assessment in the [NIST AI RMF](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/). It is an organizational responsibility, not a claim about the legal liability of an individual engineer. A person assigned responsibility without information, expertise, time or power to stop is an ineffective control.

Define three kinds of authority in the operating record. Routine actions can proceed under an explicit policy. Exceptions require designated review before the consequential action. Prohibited actions remain unavailable. Authentication changes, destructive migrations, expanded data access and physical actuation deserve their own risk assessment; an AI-generated risk label cannot authorize them.

### Separate workers, control and release

The proposed factory has three cooperating parts:

1. **AI workers** investigate, design, write code, test, review, document and diagnose. They use isolated workspaces with task-specific tools and bounded loops.
2. **A durable control system** records the work state, applies budgets, schedules dependencies, checks transition conditions and manages interruption. Models can propose a plan; they do not rewrite the trusted state machine or its authority.
3. **A trusted build and release system** verifies integrated candidates, produces artifacts and promotes them using separate identities. Its evidence and policy cannot be changed unilaterally by the code-authoring worker.

Use predefined workflows where transitions are understood and agent reasoning where the next investigative step is open-ended. This applies [Anthropic's workflow/agent distinction](https://www.anthropic.com/research/building-effective-agents) without assuming that a larger agent hierarchy is better. One worker with good tools may be sufficient. Parallel workers are useful only when the work and downstream integration capacity justify them.

Every handoff should identify inputs, outputs, acceptance conditions, authority and the owner of a failure. Cover requirements, UX and accessibility, architecture, implementation, dependencies, security, integration, release, documentation, support, maintenance and eventual retirement. Full-featured means this lifecycle is accounted for, not that every activity must use a language model.

### Prepare context without turning it into authority

The work package identifies the request, specification and source revision, approved engineering guidance, API contracts and synthetic or suitably controlled fixtures. Missing or conflicting context becomes a question or a bounded investigation. Retrieval should retain source ownership, versions and access limits; an attractive generated summary is not a replacement for an authoritative record.

Map where data goes: model provider, remote tools, artifact store, logs and shared memory. Decide retention, deletion, residency where relevant, and whether a provider may retain or train on the material. Secrets and unnecessary customer data should not enter prompts or unrestricted logs. License and dependency obligations remain engineering work even when AI selected the package.

Tickets, repository text, downloaded documents and tool results may contain hostile instructions. Enforce permissions outside those inputs and outside the worker's writable context. Scope filesystem and network access, credentials, destinations and tool operations. A sandbox is one layer, not proof of complete containment. The [OWASP agent guidance](https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html) supports external authorization and approval bound to exact actions. A tool protocol or connector does not grant trust by itself.

Production credentials and policy-signing authority stay out of authoring sandboxes. A trusted workflow must also avoid running untrusted pull-request code with elevated credentials; [GitHub's secure-use guidance](https://docs.github.com/en/actions/reference/security/secure-use) explains this failure boundary. A short-lived credential is still dangerous when its allowed resources or issuing identity are too broad.

### Make progress durable, and uncertainty explicit

Use stable run, task and logical-operation identities. Persist accepted transitions and controlled references to the specification, workflow version, worker configuration and artifacts. Resume from recorded outcomes instead of asking a new model session to reconstruct what probably happened.

[Temporal's durable-execution guidance](https://temporal.io/blog/idempotency-and-durable-execution) illustrates the important distinction: recovering workflow state does not make every external effect execute once. An activity may be attempted again. Give a consequential logical action a stable identity and use the target service's actual idempotency and lookup semantics. Reusing a key with a changed payload must not silently mean the same action; retention windows also matter.

After a timeout, distinguish confirmed success, confirmed failure and unknown outcome. Reconcile the provider's authoritative record before retrying. An eventually consistent lookup may not immediately prove absence. If the outcome remains unresolved, stop automatic progression and involve the recovery owner. Cancellation or credential revocation does not necessarily undo work a remote system already accepted.

Keep model/tool/prompt/configuration identities for diagnosis, while recognizing that the same identifiers do not guarantee identical model output. In-flight workflows also need compatible code evolution: [Temporal's versioning documentation](https://docs.temporal.io/develop/typescript/workflows/versioning) explains why changing command-producing logic can break replay. Test resume, replay and upgrades, not only a clean first run.

### Protect the inspector as well as the dish

An agent can write useful tests and a reviewer agent can find defects. Neither establishes independent acceptance when the author can also modify the checker, its inputs and its result record. Preserve a protected baseline and a reviewed path for legitimate corrections to tests. A test can be wrong; silently removing it is not the way to establish that.

Verify the actual integrated candidate against the current base. Include functional contracts, tenant isolation, accessibility, dependency/security checks and representative browser journeys. For the booking example, exercise retries, concurrent rescheduling, stale queue items, dispatch timeouts and messages already accepted by a provider. Test the important interleavings, not just isolated functions with a happy-path fixture.

Evaluate the factory too: does it stop at budget limits, resist unauthorized requests, preserve evidence, escalate uncertainty and recover after interruption? Combine executable state checks with calibrated expert or model-based review where needed. Run repeated trials when outcomes are stochastic, report conditions and variation, keep held-out cases, and test the actual model-plus-harness configuration. [Anthropic's evaluation guidance](https://www.anthropic.com/research/demystifying-evals-for-ai-agents) distinguishes these different kinds of graders and evidence.

The checker can itself become a target. [Anthropic's coding-audit study](https://alignment.anthropic.com/2026/coding-audit-realism/) investigates such behavior in constructed environments; it is not a prevalence estimate for everyday software work. Treat evaluator tampering and policy modification as failure cases. Several agents agreeing does not turn their shared assumptions into independently observed truth.

### Bind the evidence to the bytes and the action

A release record connects the outcome contract, integrated source revision, test configuration/results, trusted builder, artifact digest, policy and authorization, deployment operation, receipt and observed behavior. Retain access-controlled evidence with appropriate redaction and retention. Summaries should point to that evidence. They should not be the only evidence.

Build once in the trusted pipeline and promote the identified artifact. Verify origin against expected source, builder and build configuration, then check that the deployed digest is the intended one. [SLSA v1.2](https://slsa.dev/spec/v1.2/verifying-artifacts) explains why provenance needs verification against expectations. [GitHub's attestation documentation](https://docs.github.com/en/actions/concepts/security/artifact-attestations) explicitly warns that attestations do not guarantee security. Provenance establishes relevant origin facts, not usefulness or freedom from defects.

At execution time, recheck actor, operation, target environment, artifact, material parameters, policy and grant validity. Reject stale evidence, changed payloads, expired approval and revoked authority. Protect the expectations and approval record from unilateral worker edits. A long wait between approval and execution makes this binding particularly important.

### Automate service within a reviewed policy

A routine candidate may move through measured rollout stages automatically. Engineers define the eligible change class, cohort, control, observation window, meaningful sample requirements, stop conditions and recovery actions. Exceptions go to their designated reviewers. This is continuing human authorization expressed as an enforceable policy, rather than a new click for every transition.

[Google SRE's canary guidance](https://sre.google/workbook/canarying-releases/) describes partial, time-limited production evaluation. The measurements must reflect the customer journey, not only process health. Low traffic, delayed jobs and rare failures need a suitable observation strategy. A healthy HTTP endpoint alone does not show that booking reminders use the right time.

Missing, stale or insufficient observations are inconclusive. They are not a zero error rate. [Argo Rollouts](https://argo-rollouts.readthedocs.io/en/stable/features/analysis/) makes success, failure and inconclusive outcomes explicit; the configuration still has to handle empty values and non-finite results correctly. The small decision model in this Lab illustrates those distinctions. It does not implement a production authorization system, probability model or complete incident policy.

### Remain responsible after promotion

Service ownership continues through alerts, support, impact assessment, incident communication and correction. Define reliability objectives and the operating policy that can restrict ordinary releases when the service is unhealthy. Google's [example error-budget policy](https://sre.google/workbook/error-budget-policy/) is a useful pattern, with thresholds that must be adapted rather than copied as universal values.

Rehearse stop, isolation, access revocation and treatment of in-flight work. Prepare rollback compatibility before release. A previous executable may not understand new data or protocols; [AWS's rollback-safety guidance](https://aws.amazon.com/builders-library/ensuring-rollback-safety-during-deployments/) explains the need for compatible preparation and activation. Sometimes recovery means rolling forward, compensating an effect or resolving it with a person. A feature flag cannot unsend a reminder.

Operate the factory itself: provider outages, queue growth, stuck runs, retry storms, credential expiry, unavailable evidence storage and exhausted budgets all need bounded behavior and an owner. Cap work in progress at a level verification and operations can absorb. Preserve a human fallback; an overloaded approval queue is not meaningful oversight.

## Takeaways

### Measure accepted outcomes, not generated activity

There is no source-backed universal winner for this architecture or its productivity. DORA's [2026 analysis of its 2025 research](https://dora.dev/insights/balancing-ai-tensions/) associates higher AI adoption with greater delivery throughput and greater instability. Those are associations, not a randomized causal estimate. METR's [February 2026 update](https://metr.org/blog/2026-02-24-uplift-update/) explains why selection effects and timing difficulties make its later productivity estimate unreliable. Older measurements should not become permanent claims about current tools.

METR's later [May 2026 survey](https://metr.org/blog/2026-05-11-ai-usage-survey/) records self-reported gains among technical workers and separates perceived value from speed. These are useful signals, with convenience-sampling and self-report limits. They do not establish a causal productivity effect for a particular engineering team. Faster completion of work that was never worth doing can still add little value.

Measure representative work against a baseline. Include engineering review, rework, waiting, infrastructure, model/tool usage and operations in the cost per accepted useful change. Track customer outcomes and maintenance burden alongside [DORA's delivery metrics](https://dora.dev/guides/dora-metrics/). More agents, lines of code or pull requests can increase downstream congestion without increasing value.

### Widen autonomy through evidence

Start with one bounded workflow and an observable outcome. Establish the manual or current-tool baseline, sandbox and protected checks. Trial proposal-only work, then reviewed execution, then a narrow class of pre-authorized actions where justified. These are options for accumulating evidence, not mandatory maturity levels or a guarantee that every workflow should reach automatic release.

Expand only when representative results, failure rehearsals, review capacity and operating ownership justify the extra consequence. A high-impact migration can remain human-gated inside an otherwise highly automated factory. The complete lifecycle can be automated in breadth while important decisions continue to require human judgment.

## Limits

This is a researched proposal and teaching interface, developed with AI-assisted research and implementation under Hadi's direction. It is not a production deployment, independent human peer review, security certification or demonstrated Fidret delivery capability. Research was checked on 4 November 2026. Living vendor guidance and tool behavior can change.

The booking example omits real personal data, implementation-specific schemas, provider contracts and a running distributed system. No real reminder, agent, deployment or customer outcome is produced here. The walkthrough's fixed views and build-time decision function explain selected boundaries. They cannot establish completeness, safety or production readiness. Formal verification, testing and monitoring each have a scope; none removes unknown requirements or all future failures.

The architecture requires adaptation to the repository, organization, regulatory context and consequences. Humans can also misunderstand a system, overlook evidence or face conflicting incentives. Accountability should support learning, correction and sufficient capacity, rather than blame or rubber-stamping. AI does not become a responsible professional because it is given a job title.

Fidret's first developing practice remains [Physical AI](/project/). If software can affect equipment or people, this model is insufficient on its own: identify the responsible operator, validate the operating envelope and protective controls, and obtain the applicable authorization before actuation. Repository checks or a simulated success do not provide that authority.

## Next steps

Take the [editable operating brief](/lab/ai-software-factory/operating-brief.md) into one engineering discussion. Name the owners, define a bounded workflow and record the protected evidence required for the first trial. Rehearse malicious inputs, changed artifacts, revoked authority, unknown external effects, missing telemetry and recovery before widening access.

For this proposed factory, the next useful experiment would be a local synthetic booking service with controllable concurrent updates and provider failures. Compare a simple deterministic workflow with an agent-assisted implementation process on the same fixtures. Report actual customer-state correctness, recovery behavior, review/rework time and cost with their conditions. That experiment has not been performed in this Lab.

The goal is a factory people can run, inspect, stop and improve, with engineers who understand the work they stand behind.
