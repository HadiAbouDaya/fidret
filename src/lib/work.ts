/** Curated contributions. Lab-dependent entries exist only with their published parent. */
export type Work = {
  slug: string; title: string; kind: string; question: string; contribution: string;
  finding: string; relevance: string; limit: string; artifact: string; artifactLabel: string;
  method: string; methodLabel: string; sourceSlug?: string; featured?: boolean;
  nextEvidence: string; preview: string; invitation: string;
};

export const workCatalogue: readonly Work[] = [
  {
    slug: 'signal-freshness', title: 'When a reading stops being current', kind: 'Synthetic software experiment',
    question: 'Can a reading still be used when packets arrive late or stop arriving?',
    contribution: 'A small freshness guard, replay scenarios and an interactive explanation, compared with a simple last-arrival baseline.',
    finding: 'The checked software rule withholds expired values, preserves timestamp order and requires distinct fresh observations before recovery.',
    relevance: 'Useful when a decision depends on observations that may be delayed, duplicated or interrupted.',
    limit: 'Synthetic inputs and a shared illustrative clock. No hardware was tested; the three-second limit is not an operating recommendation.',
    artifact: '/explorations/signal-freshness/', artifactLabel: 'Inspect the walkthrough',
    method: '/explorations/signal-freshness/method/', methodLabel: 'Read the method and results',
    nextEvidence: 'Representative source clocks, delays and failure conditions, plus an agreed physical response when evidence is unavailable.',
    invitation: 'Which decision relies on the reading? Describe the delays you see, how long the value can remain useful and what should happen when no current data is available.',
    featured: true, preview: 'signal-freshness',
  },
  {
    slug: 'autonomous-farm', title: 'From a cloud proposal to a physical action', kind: 'Architecture and teaching model',
    question: 'What must agree before an automated system can act on a farm?',
    contribution: 'A fictional mixed-farm architecture, an editable decision workspace and a library of operating situations.',
    finding: 'The model makes independent requirements visible: evidence, reserved resources, local checks and responsibilities that continue during an outage.',
    relevance: 'Useful for examining shared resources, local control and recovery in systems that combine cloud planning with physical operations.',
    limit: 'An architecture exploration and working educational interface. No farm, equipment or operational twin is connected.',
    artifact: '/lab/autonomous-farm/', artifactLabel: 'Explore the farm workspace',
    method: '/lab/autonomous-farm/blueprint/', methodLabel: 'Inspect the architecture',
    sourceSlug: 'autonomous-farm', featured: true, preview: 'autonomous-farm',
    nextEvidence: 'A specific site and workflow, competent domain review, representative data and an independently validated local operating design.',
    invitation: 'Describe one workflow, the people and equipment involved, and the water, power or other resources it shares. What must keep working when the plan or connection changes?',
  },
  {
    slug: 'publishing-system', title: 'The publishing system behind this site', kind: 'Implemented publishing system',
    question: 'How can technical work stay readable, attributable and consistent as a website grows?',
    contribution: 'A working static publishing system connecting authored content, validated metadata, interactive explanations and a checked release workflow.',
    finding: 'Published content generates its own pages and discovery. Build tests exercise rejection, withdrawal and the boundary between public output and internal records.',
    relevance: 'Useful when a small team needs a maintainable technical publication, evidence showcase or knowledge interface that others can continue.',
    limit: 'Built for Fidret’s own website. This demonstrates this implementation and its checks, not a client delivery record or enterprise security certification.',
    artifact: '/lab/', artifactLabel: 'Explore the published result',
    method: '/work/publishing-system/#verification', methodLabel: 'Inspect the verification',
    nextEvidence: 'Reader feedback, real inquiry outcomes and field performance under the audience’s devices and networks.',
    invitation: 'Who contributes and reviews the material? Bring an example of the pages, downloads or listings that need to change together when something is published, corrected or withdrawn.',
    featured: true, preview: 'publishing-system',
  },
  {
    slug: 'ai-software-factory', title: 'Evidence before a software release', kind: 'Architecture and teaching model',
    question: 'What makes an AI-built change ready for the next release stage?',
    contribution: 'A proposed delivery architecture and an editable workspace connecting a candidate to evidence, permission and recovery conditions.',
    finding: 'Tests on one artifact do not establish another artifact’s readiness. Current authority and reconciliation of uncertain effects remain separate requirements.',
    relevance: 'Useful when reviewing how AI-assisted software work moves from a proposed change to a responsible release.',
    limit: 'A working educational interface around a proposed architecture. It is not an operating autonomous delivery pipeline.',
    artifact: '/lab/ai-software-factory/', artifactLabel: 'Explore the release workspace',
    method: '/lab/ai-software-factory/engineering-notes/', methodLabel: 'Read the engineering notes',
    sourceSlug: 'ai-software-factory', preview: 'ai-software-factory',
    nextEvidence: 'One implemented workflow, exact artifact and outcome records, representative failure tests and accountable operational ownership.',
    invitation: 'Bring one path from a proposed change to release. How do you establish what was checked, what was approved and what was actually deployed when the candidate changes?',
  },
  {
    slug: 'agentic-company-harness', title: 'Define one agent workflow', kind: 'Research and planning brief',
    question: 'What does a company need around an agent before it can rely on the work?',
    contribution: 'A researched technical note and an editable brief organized around purpose, context, authority, evidence and recovery.',
    finding: 'The brief turns a broad automation ambition into explicit questions about a bounded task, its owner, permissions, evidence and uncertain outcomes.',
    relevance: 'Useful before connecting an agent to company knowledge, tools or consequential actions.',
    limit: 'Research synthesis and an original planning structure, not a deployed enterprise control system or a security standard.',
    artifact: '/lab/agentic-company-harness/workflow-brief/', artifactLabel: 'Plan one agent workflow',
    method: '/lab/agentic-company-harness/', methodLabel: 'Read the technical note',
    sourceSlug: 'agentic-company-harness', preview: 'agentic-company-harness',
    nextEvidence: 'A completed workflow brief, enforceable boundaries and end-to-end evaluation in the intended environment.',
    invitation: 'Name one task you would delegate, the information it needs and the actions it may take. Where should it stop, ask for review or hand the work back to a person?',
  },
];

export function visibleWork(publishedSlugs: readonly string[]): Work[] {
  const published = new Set(publishedSlugs);
  return workCatalogue.filter(work => !work.sourceSlug || published.has(work.sourceSlug));
}

export const workPath = (work: Pick<Work, 'slug'>) => `/work/${work.slug}/`;
export const workForSource = (slug: string) => workCatalogue.find(work => work.sourceSlug === slug);
