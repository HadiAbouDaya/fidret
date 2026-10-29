export const HARNESS_SLUG = 'agentic-company-harness';
export const GUIDE_PATH = '/lab/agentic-company-harness/workflow-brief/';
export const DOWNLOAD_PATH = '/lab/agentic-company-harness/workflow-brief.md';

type WorkflowContract = {
  id: string;
  title: string;
  question: string;
  prompts: readonly string[];
  example: string;
  evidence: string;
};

// Original planning synthesis from the accompanying article, not a control standard.
// Every worked example describes the same fictional, draft-only support workflow.
export const contracts: readonly WorkflowContract[] = [
  {
    id: 'purpose',
    title: 'Purpose',
    question: 'What result is worth delegating?',
    prompts: [
      'Name the workflow, accountable human owner, affected people and intended outcome.',
      'Describe the current manual baseline and the acceptance conditions for a useful result.',
      'Define the first bounded trial, excluded work and the point at which a person takes over.',
    ],
    example: 'Investigate one synthetic support ticket and prepare a draft reply for the support lead. Compare the draft with manual triage of the same fixture: supported facts, useful next steps and unresolved questions. Sending a reply and deploying a change are outside this trial.',
    evidence: 'A named owner, a baseline and an inspectable definition of a useful draft.',
  },
  {
    id: 'context',
    title: 'Context',
    question: 'What may enter the work, and where may it go?',
    prompts: [
      'List permitted data sources, record scope, source owners and versions; identify what remains untrusted input.',
      'Map where context travels, including model providers, remote tools and shared memory; state access, retention and deletion rules.',
      'Define how missing, conflicting or stale information is handled without inventing an answer or widening access.',
    ],
    example: 'Limit the investigation to the synthetic ticket, a redacted log fixture and a selected runbook version. A sentence in the ticket cannot change policy. Missing evidence becomes an explicit question for the support lead; it does not authorize reading another customer’s records.',
    evidence: 'A small data-flow map and a versioned list of allowed sources, destinations and restrictions.',
  },
  {
    id: 'authority',
    title: 'Authority',
    question: 'Which consequences may the workflow cause?',
    prompts: [
      'Identify the acting identity, allowed operations, resources and destinations; explicitly list denied actions.',
      'Name the service that enforces each boundary outside the agent’s editable workspace, including credential and network restrictions.',
      'For any proposed consequential action, bind approval to the actor, operation, target, exact payload or artifact version and expiry; reject changed or expired requests.',
      'State who can approve a scope change and how the resulting policy and tool permissions are reviewed before use.',
    ],
    example: 'The agent may read the scoped fixtures and save a draft in an isolated review workspace. It has no customer-send or deployment operation. Adding a send step would require a separately reviewed scope and an execution-time check of the approved actor, recipient, message version and validity window.',
    evidence: 'An operation-to-policy map with enforceable allow, review and deny decisions.',
  },
  {
    id: 'evidence',
    title: 'Evidence',
    question: 'What would let another person establish what happened?',
    prompts: [
      'Connect the request, acting identity, policy version, tool decision, artifact version and externally observed outcome with stable references.',
      'Identify the authoritative outcome record and where protected evidence is kept outside unrestricted agent editing; define access, redaction and retention.',
      'Specify representative end-to-end and failure cases, the comparison baseline and who reviews results in the intended harness configuration.',
    ],
    example: 'Keep controlled references to the ticket fixture, runbook version, tool decisions and saved draft. The artifact store’s result establishes whether a draft was saved; an agent summary alone does not. The support lead reviews source support, omissions and the draft against manual triage.',
    evidence: 'A reviewable trace and test results with conditions, failures and remaining uncertainty.',
  },
  {
    id: 'recovery',
    title: 'Recovery',
    question: 'What happens after a timeout, interruption or mistake?',
    prompts: [
      'Distinguish succeeded, failed and unknown outcomes; name the system and owner used to reconcile an unknown result before retrying a write.',
      'Set retry, time and spending limits; document idempotency or duplicate detection where supported.',
      'Define cancellation, revocation and treatment of work already accepted by another system; separate rollback from compensation or human resolution.',
      'Name the stop conditions, recovery owner and evidence required to resume; rehearse them before widening autonomy.',
    ],
    example: 'If saving the draft times out, reconcile its operation reference with the artifact store before trying again. If the outcome cannot be established, stop and hand over to the support lead. A cancellation also needs to account for work the store has already accepted.',
    evidence: 'A rehearsed interruption and recovery record, with a named person able to stop the workflow.',
  },
];

export const reviewCases: readonly { title: string; expected: string }[] = [
  {
    title: 'A ticket tries to change the rules',
    expected: 'Treat embedded instructions as untrusted content. Keep the assigned scope, deny unauthorized tool operations and preserve a redacted record for review.',
  },
  {
    title: 'A tool request names the wrong resource',
    expected: 'Reject a record, customer, destination or operation outside the assigned scope, even when the request comes through an otherwise legitimate connector.',
  },
  {
    title: 'An approval expires or the artifact changes',
    expected: 'Reject execution against changed approval details or an expired grant. Require fresh approval for the exact action if that action is in scope; draft-only work still cannot send or deploy.',
  },
  {
    title: 'A write returns an unknown outcome',
    expected: 'Reconcile with the authoritative system before retrying. Use supported idempotency or duplicate detection; stop for the recovery owner when the result remains unknown.',
  },
  {
    title: 'The evidence record is unavailable',
    expected: 'Do not claim verified completion or widen autonomy. Follow the defined stop policy and ask the owner to restore or reconcile the missing evidence.',
  },
];

export function renderWorkflowBrief(): string {
  const sections = contracts.map((contract) => [
    `## ${contract.title}`,
    '',
    contract.question,
    '',
    ...contract.prompts.map((prompt) => `- ${prompt}\n  Response: [complete locally]`),
    '',
    `Evidence to attach: ${contract.evidence}`,
  ].join('\n')).join('\n\n');
  const cases = reviewCases.map((reviewCase) => [
    `### ${reviewCase.title}`,
    `Expected: ${reviewCase.expected}`,
    'Observed result / evidence reference: [not yet tested]',
  ].join('\n')).join('\n\n');

  return `# Agent workflow brief

Fidret planning aid: purpose, context, authority, evidence and recovery.
Source: https://fidret.com${GUIDE_PATH}

Keep the completed brief in your approved workspace. Use controlled references rather than secrets or unnecessary personal data. This template neither grants permissions nor assesses security or compliance.

## Workflow record

- Workflow / version / date: [complete locally]
- Accountable human owner: [name and responsibility]
- Operator and reviewer: [name and responsibility]
- Intended environment and harness configuration: [reference]
- Current manual baseline: [reference or planned measurement]
- Proposed trial boundary and affected people: [complete locally]
- Review evidence location and access owner: [controlled reference]

${sections}

## Review cases

Run these in an authorized test environment with representative fixtures. Adapt and extend them to the workflow; these cases are a starting point, not complete coverage. For a draft-only scope, verify that send and deploy operations are unavailable or denied.

${cases}

## Human launch decision

- Decision: [hold / narrower trial / proceed within the recorded scope]
- Accountable decision owner and date: [complete locally]
- Accepted scope, supporting evidence and unresolved risks: [references]
- Conditions that require stopping or a new review: [complete locally]
- Next review date or trigger: [complete locally]

Unanswered questions remain open work. Completing this brief is not proof that controls are implemented, a security certification or authorization to operate equipment. Validate the actual workflow and its consequences before expanding access.
`;
}
