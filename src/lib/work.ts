/** Curated contributions. Lab-dependent entries exist only with their published parent. */
export type Work = {
  slug: string; title: string; kind: string; question: string; contribution: string;
  finding: string; relevance: string; limit: string; artifact: string; artifactLabel: string;
  method: string; methodLabel: string; sourceSlug?: string; featured?: boolean;
  nextEvidence: string; preview: string; invitation: string;
  scope: string; overviewLabel: string; explore: string;
};

export const workCatalogue: readonly Work[] = [
  {
    scope: 'Invented inputs. No equipment tested.', overviewLabel: 'Explore the sensor experiment',
    explore: 'Choose a recorded moment and see why the same reading can stop being useful.',
    slug: 'signal-freshness', title: 'What happens when a machine trusts old information?', kind: 'Software experiment',
    question: 'A reading can look ordinary even after updates stop. A decision based on it may no longer fit what is happening.',
    contribution: 'A small software rule that stops presenting old readings as current, with repeatable test scenarios and an interactive walkthrough.',
    finding: 'The checked software rule withholds expired values, preserves timestamp order and requires distinct fresh observations before recovery.',
    relevance: 'A useful starting point when a decision depends on information that can arrive late or stop arriving.',
    limit: 'Synthetic inputs and a shared illustrative clock. No hardware was tested; the three-second limit is not an operating recommendation.',
    artifact: '/explorations/signal-freshness/', artifactLabel: 'Try the sensor walkthrough',
    method: '/explorations/signal-freshness/method/', methodLabel: 'Read the method and results',
    nextEvidence: 'Representative source clocks, delays and failure conditions, plus an agreed physical response when evidence is unavailable.',
    invitation: 'Which decision relies on the reading? Describe the delays you see, how long the value can remain useful and what should happen when no current data is available.',
    featured: true, preview: 'signal-freshness',
  },
  {
    scope: 'Fictional design and teaching model. No farm or equipment connected.', overviewLabel: 'Explore the farm model',
    explore: 'Remove a water reservation, question a sensor reading or lose a connection. See which checks still matter.',
    slug: 'autonomous-farm', title: 'What if two farm jobs need the same water?', kind: 'Fictional farm model',
    question: 'A field needs watering. Animals need drinking water too. A sensible plan must account for both.',
    contribution: 'A fictional farm design and a working teaching interface for exploring the checks before a proposed action.',
    finding: 'The model makes independent requirements visible: evidence, reserved resources, local checks and responsibilities that continue during an outage.',
    relevance: 'Explore a difficulty that appears wherever several activities share equipment or resources: a good plan for one job can get in the way of another.',
    limit: 'An architecture exploration and working educational interface. No farm, equipment or operational twin is connected.',
    artifact: '/lab/autonomous-farm/', artifactLabel: 'Explore the farm workspace',
    method: '/lab/autonomous-farm/blueprint/', methodLabel: 'Inspect the architecture',
    sourceSlug: 'autonomous-farm', featured: true, preview: 'autonomous-farm',
    nextEvidence: 'A specific site and workflow, competent domain review, representative data and an independently validated local operating design.',
    invitation: 'Describe one workflow, the people and equipment involved, and the water, power or other resources it shares. What must keep working when the plan or connection changes?',
  },
  {
    scope: 'Working software for Fidret’s own website, not a client case study.', overviewLabel: 'See how this site is built',
    explore: 'Follow one article through publication and withdrawal, including its related pages and downloads.',
    slug: 'publishing-system', title: 'How do you keep a growing website consistent?', kind: 'Implemented publishing system',
    question: 'One article can appear in several places. Changing it should not leave those pages telling different stories.',
    contribution: 'The working publishing system behind Fidret, connecting authored material, generated pages and automated release checks.',
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
    scope: 'Proposed architecture and teaching model. No autonomous delivery pipeline runs here.', overviewLabel: 'Explore the release example',
    explore: 'Compare a proposed version with the version its tests cover. Then change the permission for the next step.',
    slug: 'ai-software-factory', title: 'The tests passed. Is this version ready?', kind: 'Software-delivery teaching model',
    question: 'AI helps change a booking system. The tests pass, then one more edit lands. Do those results still apply?',
    contribution: 'A proposed software-delivery design and an interactive teaching workspace about checks, permission and recovery.',
    finding: 'Checks must match the software being considered. A matching result does not replace current permission or the need to establish what an earlier operation actually did.',
    relevance: 'Useful when reviewing how AI-assisted software work moves from a proposed change to a responsible release.',
    limit: 'A working educational interface around a proposed architecture. It is not an operating autonomous delivery pipeline.',
    artifact: '/lab/ai-software-factory/', artifactLabel: 'Explore the release workspace',
    method: '/lab/ai-software-factory/engineering-notes/', methodLabel: 'Read the engineering notes',
    sourceSlug: 'ai-software-factory', preview: 'ai-software-factory',
    nextEvidence: 'One implemented workflow, exact artifact and outcome records, representative failure tests and accountable operational ownership.',
    invitation: 'Bring one path from a proposed change to release. How do you establish what was checked, what was approved and what was actually deployed when the candidate changes?',
  },
  {
    scope: 'Research and planning tool. Completing the brief does not implement controls.', overviewLabel: 'Explore the agent planning brief',
    explore: 'Follow a fictional support-ticket example, then use the prompts to describe your own task.',
    slug: 'agentic-company-harness', title: 'Which parts of a task should an AI agent handle?', kind: 'Research and planning brief',
    question: 'Being allowed to draft a reply should not automatically mean being allowed to send it.',
    contribution: 'A researched explanation and an editable planning brief for one agent workflow, from its purpose to the point where a person takes over.',
    finding: 'Useful automation starts with a clear task, the information it needs, what it may do and who takes responsibility when something goes wrong.',
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
