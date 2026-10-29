---
schema_version: 1
slug: "agentic-company-harness"
title: "Designing a company agents can work in"
kind: "technical-note"
status: "published"
authors: ["hadi"]
created: "2026-10-28"
published: "2026-10-29"
updated: "2026-10-29"
summary: "A current guide to harness engineering: make company knowledge usable, bound an agent’s authority, preserve evidence and design recovery before widening autonomy."
resources: [{"label": "LangChain — The five components of building a company harness (24 October 2026)", "url": "https://www.langchain.com/blog/components-building-company-harness"}, {"label": "OpenAI — Codex as a platform (19 August 2026)", "url": "https://developers.openai.com/blog/codex-as-a-platform"}, {"label": "Anthropic — Scaling Managed Agents (8 April 2026)", "url": "https://www.anthropic.com/research/managed-agents"}, {"label": "Anthropic — How we contain Claude across products (25 May 2026)", "url": "https://www.anthropic.com/research/how-we-contain-claude"}, {"label": "OpenAI — Sandbox security (living documentation)", "url": "https://developers.openai.com/api/docs/guides/agents-api/environments/security"}, {"label": "MCP — Authorization, specification 2026-07-28", "url": "https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization"}, {"label": "MCP — Security best practices, 2026-07-28", "url": "https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices"}, {"label": "NIST — Why Agentic AI Needs a Strong Identity Foundation (27 August 2026)", "url": "https://www.nist.gov/blogs/cybersecurity-insights/back-future-why-agentic-ai-needs-strong-identity-foundation"}, {"label": "NIST — Agentic identity concept-paper comments (29 September 2026)", "url": "https://www.nist.gov/news-events/news/2026/09/comments-software-and-agentic-ai-identity-concept-paper"}, {"label": "OWASP — Top 10 for Agentic Applications for 2026 (9 December 2025)", "url": "https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/"}, {"label": "OWASP — Agent Control Standard (1 September 2026)", "url": "https://genai.owasp.org/resource/agent-control-standard-acs/"}, {"label": "OWASP — GenAI Red Teaming Manual v1.0 (20 October 2026)", "url": "https://genai.owasp.org/resource/genai-red-teaming-manual-version-1-0/"}, {"label": "OpenAI and deepsense.ai — Harness-aware evaluation of plugins (23 September 2026)", "url": "https://developers.openai.com/cookbook/examples/partners/harness_aware_plugin_evals/harness_aware_plugin_evals"}, {"label": "OpenAI — Agent improvement loop with traces and evals (12 May 2026)", "url": "https://developers.openai.com/cookbook/examples/agents_sdk/agent_improvement_loop"}, {"label": "Anthropic — Harness design for long-running application development (24 March 2026)", "url": "https://www.anthropic.com/research/harness-design-long-running-apps"}]
media: [{"src": "/lab-assets/agentic-company-harness/control-boundary.svg", "alt": "A model-writable workspace proposes actions through a separate policy gate. Trusted policy and identity constrain granted tools, and decisions and outcomes leave an evidence trail.", "caption": "A proposed separation of responsibilities: the agent works inside a bounded environment; trusted services govern authority and retain evidence. Conceptual architecture, not a deployed Fidret security system.", "width": 1200, "height": 500}]
snippets: []
---

## Question

Consider a support agent investigating a failed deployment. It reads a ticket, inspects logs, writes a patch and prepares a customer reply.

Four ordinary verbs. Four different questions: what may it see, where may it work, what may it change, and who can commit the result?

A company has to answer those questions in a form the agent can use and the surrounding systems can enforce. A note saying “be careful with customer data” gives useful direction. The tool serving that data still needs to check who is asking, which records they may access and where the result can go.

That is the practical question behind this article: **what must a company put around an agent before it can rely on the work?**

The support workflow here is illustrative. The recommendations below are a synthesis of current primary sources and engineering judgment. They describe a direction for building and evaluating systems, rather than a claim that Fidret has deployed an autonomous enterprise.

## Approach

### The harness is becoming part of the organization

A harness is the execution system around a model: the loop that supplies context, routes tools, maintains state, exposes progress and handles interruptions. OpenAI’s [August 2026 platform account](https://developers.openai.com/blog/codex-as-a-platform) makes that surrounding system available through several integration surfaces, while leaving business context, tools and operational boundaries with the application.

That division is useful. The model can propose a next action; a company still owns the meaning and authority of that action.

On **24 October 2026**, LangChain published an account of [building a company harness](https://www.langchain.com/blog/components-building-company-harness). Its example brings agents into existing workplace interfaces and connects identity, memory, tools and recurring work. The authors distinguish acting on behalf of a person from using an agent’s own identity, and describe concrete restrictions around email and publishing. This is an internal implementation report, with acknowledged open questions around memory. It is a timely example of the problem expanding from one task loop to the organization supplying its context.

Anthropic’s [April architecture report](https://www.anthropic.com/research/managed-agents) separates durable session state, the harness and the execution environment. It also describes a useful reversal: context-reset machinery that helped an earlier model became unnecessary with another. Durable contracts deserve care; model-specific workarounds deserve retesting.

The practical choice is therefore about fit: reuse a managed or open harness when it meets the workflow, and retain explicit ownership of business policy. A larger framework, a longer prompt or another evaluator agent is not evidence that a workflow is ready.

### Read the evidence at its actual scope

The recent material spans different kinds of evidence. Engineering reports describe particular systems. Product documentation describes supported mechanisms. Risk taxonomies identify failure classes. Emerging standards projects explore common control surfaces.

For example, OWASP’s [Agent Control Standard](https://genai.owasp.org/resource/agent-control-standard-acs/) is project work around runtime controls. NIST’s [September identity update](https://www.nist.gov/news-events/news/2026/09/comments-software-and-agentic-ai-identity-concept-paper) describes comments and intended demonstrations. Neither establishes that a company has passed an agent-security certification.

For preparing a company, I find five contracts useful: **purpose, context, authority, evidence and recovery**. This is the organizing proposal of this article, rather than a named standard from the sources.

## Takeaways

### Give the work a purpose and an owner

The support agent should receive a bounded job: investigate this incident, produce a proposed fix and prepare a response. Give the work a human owner, an acceptance test and a point at which it must stop or hand over.

Make the durable company context easy to find: purpose, terminology, decisions, responsibilities and the current system map. Put task-specific facts in the task record. An agent returning tomorrow should be able to distinguish a decision from a suggestion and a completed action from an intended one.

This is part of [Fidret’s own foundation](/project/): a company charter, explicit task ownership, documented choices and checked publication. It is useful preparation. Broader company access and representative operational evaluation remain work to do.

### Treat context as an input with provenance

A legitimate connector can retrieve a malicious document. A ticket may contain a sentence telling the agent to ignore its instructions or send data elsewhere. The document’s delivery path does not give its author permission to change company policy.

Anthropic’s [containment report](https://www.anthropic.com/research/how-we-contain-claude) describes why environment boundaries matter alongside model defenses, including failures at trust boundaries. OWASP’s [2026 agentic risk taxonomy](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/) includes goal hijacking and memory/context poisoning. Its edition was published in December 2025; the year in its title is not its release date.

Keep retrieved content separate from governing instructions. Record its source, owner, version and access restrictions. Review what is promoted into shared memory. Expired policy, a speculative note and a current approved procedure should not become interchangeable because retrieval found similar words.

Persistent memory also needs a data policy: what can be stored, who can read it, when it expires and how it can be corrected or deleted. Sending context to a model or a remote tool is itself a data flow to account for.

### Keep authority outside the agent’s editable workspace

A useful boundary separates the place where the agent can write code from the services that decide what that code may do.

OpenAI’s [sandbox security guidance](https://developers.openai.com/api/docs/guides/agents-api/environments/security) recommends isolating workloads, restricting outbound access and keeping application and third-party credentials outside generated-code execution. A broker can supply narrowly scoped access for approved destinations. Putting a stored secret into the environment still makes it available to code running there.

Secret handling is only part of the design. A proxy can keep a token hidden and still accept a harmful request. The service receiving a tool call must check the requested operation, identity, resource and business scope.

NIST’s [identity discussion](https://www.nist.gov/blogs/cybersecurity-insights/back-future-why-agentic-ai-needs-strong-identity-foundation) connects agent accountability to established identity and access-management problems. For a company, that means choosing deliberately whether an agent acts for a person or as a distinct workload, and granting only the authority needed for the task.

The current [MCP authorization specification](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization) and [security guidance](https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices) address protocol boundaries such as scopes, token audiences and confused-deputy risks. The July 2026 release is the relevant version for this research. OAuth authorizes access to a protected resource; a grant does not establish approval for each business transaction. MCP’s HTTP authorization model also has a different scope from local STDIO integrations.

For the illustrative support workflow, the distinction can be concrete:

| Requested work | Proposed boundary |
| --- | --- |
| Inspect this ticket | Read the authorized ticket and redacted logs |
| Prepare a fix | Write in an isolated workspace and produce a reviewable artifact |
| Send the reply | Check the exact recipient, message version and approval at execution |
| Deploy the change | Use a separately authorized release workflow |

An approval should describe the action it authorizes. Our proposed contract binds it to the actor, target, payload or artifact version, and validity window. If the recipient or patch changes, reconsider that action. This is a design recommendation to implement and test, not a guarantee supplied by an approval dialog.

There is a useful connection to [signal freshness](/explorations/signal-freshness/): something accepted earlier can stop being current. A permission check needs the state that exists when the consequence occurs.

### Keep evidence that can explain an outcome

A useful record connects the request, acting identity, applicable policy version, tool arguments, decision, resulting artifact and observed outcome. It should make an interrupted task understandable to the next person or agent.

Keep that record outside the agent’s unrestricted editing rights. Redact secrets and unnecessary personal data; restrict access and set a retention policy. A trace is valuable because it can support investigation, not because it indiscriminately stores everything the model saw.

The business system’s outcome matters. “I sent the reply” in a summary is different evidence from a confirmed send recorded by the messaging service. Checkpoints should link to authoritative results and say what still needs verification.

Evaluation needs the same discipline. A [September 2026 OpenAI/deepsense.ai walkthrough](https://developers.openai.com/cookbook/examples/partners/harness_aware_plugin_evals/harness_aware_plugin_evals) compares direct tool tests, a controlled model loop and the product harness. Its findings illustrate how behavior changes with the surrounding setup. The reported results concern that plugin and evaluation corpus, rather than a universal ranking of models.

Test the tool’s own contract, then the agent’s choice of tools, then representative end-to-end work in the configuration you intend to deploy. Preserve a baseline. Test permission failures, poisoned retrieved content, stale approvals, interrupted sessions and ambiguous outcomes alongside normal tasks.

OWASP’s [October 2026 red-teaming manual](https://genai.owasp.org/resource/genai-red-teaming-manual-version-1-0/) supports scoped adversarial testing with reproducible findings and regression work. Those tests establish evidence within their coverage; they do not establish that every attack has been eliminated.

### Design the next attempt before enabling the first write

Suppose the reply tool times out. The message may have been sent even though the agent did not receive confirmation. Retrying immediately can send it twice.

Classify a tool result as succeeded, failed or unknown. For an unknown result, reconcile with the external system before repeating the action. Use idempotency keys or duplicate detection where the service supports them. Some consequences can be reverted; others need compensation or a person to resolve them.

The task should specify retry limits, time and spending budgets, a cancellation path and a recovery owner. Revoking a credential can prevent later requests; already accepted jobs may need separate cancellation and reconciliation. Delegating work to another agent should preserve these boundaries.

> Wider autonomy should be earned through evidence about the whole workflow.

Feed observed failures back into the harness. OpenAI’s [May improvement-loop example](https://developers.openai.com/cookbook/examples/agents_sdk/agent_improvement_loop) connects traces, human and model feedback, evals and a reviewable change proposal. Anthropic’s [March application-building experiments](https://www.anthropic.com/research/harness-design-long-running-apps) likewise make verification and evaluator behavior part of the engineering problem. Neither means that adding a second agent produces a reliable independent reviewer by default.

The useful loop is specific: find a recurring failure, propose a change, rerun the relevant cases and inspect what improved or regressed. Keep the result and its limits with the next decision.

## Limits

This is a researched architecture proposal, with a late-October 2026 snapshot of a moving field. Vendor documentation, experiments and project work support different claims. Product behavior and specifications should be checked again when implementing a system.

Fidret currently demonstrates its public website, repository working conventions and a local synthetic sensor-freshness exploration. We have not used this article to perform an enterprise security assessment or validate autonomous business operations. The boundary exercise on this page illustrates fixed policy choices; it executes no actions and produces no company-readiness score.

The right controls depend on data sensitivity, consequences, the actual execution environment and the people accountable for the workflow. Model defenses, sandboxing, identity, review and evaluation each cover part of that problem. Systems affecting physical equipment need additional operating limits, responsible supervision and a separately validated stop/recovery plan.

## Next steps

Start with one useful workflow whose consequences are easy to inspect and reverse. Write its five contracts before connecting broad permissions.

1. Name the outcome, owner and acceptance conditions.
2. Map the data, identities, tools and trust boundaries involved.
3. Begin with investigation and draft artifacts; test representative and adversarial cases.
4. Add narrowly scoped actions with enforced checks, outcome records and a rehearsed recovery path.
5. Revisit autonomy after reviewing failures, costs and actual results in the deployed harness.

A company becomes easier for agents to work in when its purpose is legible, its authority is bounded and its work leaves evidence another person can use. That is the direction we intend to develop at Fidret.
