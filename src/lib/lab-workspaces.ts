import {assessFarm, farmScenarios, farmDecisionLabels, type FarmFacts} from './autonomous-farm.ts';
import {assessRelease, releaseCases, decisionLabels, type ReleaseFacts} from './software-factory.ts';

type Option<F> = {label:string; patch:Partial<F>};
type Dimension<F> = {label:string; options:Option<F>[]};
export type ModelTrace = {label:string; value:string; status:'clear'|'blocked'|'priority'|'deferred'};
export type WorkspaceState = {decision:string; label:string; reasons:string[]; trace:ModelTrace[]; values:Record<string,string>};
export type WorkspaceCase = {key:string; title:string; context:string; challenge:string; fixed:string; controls:{label:string; options:string[]}[]; initial:string; states:Record<string,WorkspaceState>; facts:Record<string,FarmFacts|ReleaseFacts>};
const dimension=<F>(label:string, options:[string,Partial<F>][]):Dimension<F>=>({label,options:options.map(([label,patch])=>({label,patch}))});
const trace=(label:string,value:string,status:ModelTrace['status']):ModelTrace=>({label,value,status});

function farmState(f:FarmFacts):WorkspaceState {
  const result=assessFarm(f);
  const priority=f.hazard||f.effect!=='none';
  const grant=f.identity&&f.authority==='current'&&f.planMatches&&(f.cloud||f.offlineGrant);
  const ready=f.evidence==='current'&&f.envelope&&f.localReady&&f.dataAllowed&&f.resourcesReserved;
  return {...result,label:farmDecisionLabels[result.decision],trace:[
    trace('Local protection',f.hazard?'Respond now':'No urgent event',f.hazard?'priority':'clear'),
    trace('Earlier operation',f.hazard?'Reconcile in parallel':f.effect==='unknown'?'Establish the effect':f.effect==='completed'?'Suppress repeat action':'No pending effect',f.hazard?'deferred':f.effect!=='none'?'priority':'clear'),
    trace('Authority',priority?'Recheck before new work':grant?'Covers this action':'Not established',priority?'deferred':grant?'clear':'blocked'),
    trace('Action conditions',priority?'Recheck before new work':ready?'Established':'Not established',priority?'deferred':ready?'clear':'blocked'),
  ],values:{focus:f.hazard?'care':f.effect!=='none'?'effect':f.evidence!=='current'?'field':!grant?'grant':!f.resourcesReserved?'water':'local',boundary:f.hazard?'Independent local care':f.effect!=='none'?'Earlier physical effect':f.evidence!=='current'?'Field evidence':!grant?'Execution authority':!f.resourcesReserved?'Shared water':!ready?'Local action conditions':'Local execution check',cloud:f.cloud?'Connected':'Disconnected',field:f.evidence==='current'?'Current evidence':f.evidence==='stale'?'Stale evidence':'Probes disagree',water:f.resourcesReserved?'Allocation reserved':'No reservation',local:f.localReady?'Local checks ready':'Local checks missing',care:f.hazard?'Urgent local response':'Independent care plan',effect:f.effect==='unknown'?'Effect unknown':f.effect==='completed'?'Completion confirmed':'No pending effect',grant:f.authority==='current'?(f.offlineGrant?'Bounded local grant':'Current action grant'):'Grant revoked'}};
}
function factoryState(f:ReleaseFacts):WorkspaceState {
  const result=assessRelease(f), breach=f.observation==='breach', unknown=f.externalEffect==='unknown';
  const match=f.candidate===f.testedCandidate&&f.artifact===f.testedArtifact;
  const grant=f.authority==='current'&&(f.changeClass==='routine'||f.exceptionReview);
  const evidence=match&&f.checks==='pass'&&f.provenance==='verified'&&f.externalEffect==='confirmed'&&f.observation==='healthy'&&f.recoveryReady;
  return {...result,label:decisionLabels[result.decision],trace:[
    trace('Customer impact',breach?'Contain the incident':f.observation==='healthy'?'Within policy':'Not established',breach?'priority':f.observation==='healthy'?'clear':'blocked'),
    trace('Earlier operation',breach?'Reconcile in incident plan':unknown?'Establish the effect':f.externalEffect==='confirmed'?'Deployment confirmed':'Deployment unconfirmed',breach?'deferred':unknown?'priority':f.externalEffect==='confirmed'?'clear':'blocked'),
    trace('Authority',breach||unknown?'Recheck before promotion':grant?'Covers this stage':'Not established',breach||unknown?'deferred':grant?'clear':'blocked'),
    trace('Promotion evidence',breach||unknown?'Recheck before promotion':evidence?'Established':'Not established',breach||unknown?'deferred':evidence?'clear':'blocked'),
  ],values:{focus:breach?'observation':unknown?'receipt':!match||f.checks!=='pass'?'proof':!grant?(f.authority!=='current'?'grant':'review'):f.externalEffect!=='confirmed'?'receipt':f.observation!=='healthy'?'observation':!f.recoveryReady?'recovery':'grant',boundary:breach?'Customer impact':unknown?'Uncertain external effect':!match?'Exact-candidate evidence':f.checks!=='pass'?'Acceptance checks':!grant?'Execution authority':f.externalEffect!=='confirmed'?'Deployment confirmation':f.observation!=='healthy'?'Observation requirement':!f.recoveryReady?'Recovery readiness':'Authorized next stage',candidate:'13',proof:match?'13':'12',match:match?'Same candidate':'Different candidate',receipt:f.externalEffect==='unknown'?'Outcome unknown':f.externalEffect==='confirmed'?'Deployment confirmed':'Not confirmed',observation:f.observation==='breach'?'Promise breached':f.observation==='healthy'?'Required window healthy':'No usable window',grant:f.authority==='current'?'Current grant':'Revoked grant',review:f.changeClass==='routine'?'Routine change':f.exceptionReview?'Exception reviewed':'Exception review missing',recovery:f.recoveryReady?'Recovery prepared':'Recovery unprepared',checks:f.checks==='pass'?'Checks passed':'Checks failed'}};
}

// Enumerate the whole declared input space at build time. The browser selects a
// result; it neither reimplements the policy nor invents a physical simulation.
export function enumerateWorkspace<F>(base:F, dimensions:Dimension<F>[], evaluate:(facts:F)=>WorkspaceState, audit:Record<string,F>={}):Record<string,WorkspaceState> {
  const states:Record<string,WorkspaceState>={};
  function visit(index:number, key:string, facts:F){
    if(index===dimensions.length){states[key]=evaluate(facts);audit[key]=facts;return;}
    dimensions[index]!.options.forEach((option,i)=>visit(index+1,key+i,{...facts,...option.patch}));
  }
  visit(0,'',base);return states;
}
function farm(key:string,source:string,copy:Omit<WorkspaceCase,'key'|'controls'|'initial'|'states'|'facts'>,dimensions:Dimension<FarmFacts>[]):WorkspaceCase{
  const base=farmScenarios.find(s=>s.key===source)!.facts;
  const facts:Record<string,FarmFacts>={};
  return {key,...copy,controls:dimensions.map(d=>({label:d.label,options:d.options.map(o=>o.label)})),initial:'0'.repeat(dimensions.length),states:enumerateWorkspace(base,dimensions,farmState,facts),facts};
}
function factory(key:string,source:string,copy:Omit<WorkspaceCase,'key'|'controls'|'initial'|'states'|'facts'>,dimensions:Dimension<ReleaseFacts>[]):WorkspaceCase{
  const base=releaseCases.find(s=>s.key===source)!.facts;
  const facts:Record<string,ReleaseFacts>={};
  return {key,...copy,controls:dimensions.map(d=>({label:d.label,options:d.options.map(o=>o.label)})),initial:'0'.repeat(dimensions.length),states:enumerateWorkspace(base,dimensions,factoryState,facts),facts};
}
export const farmWorkspaces:WorkspaceCase[]=[
  farm('water','morning',{title:'Can this watering cycle run?',context:'One irrigation proposal, checked at the local controller.',challenge:'Remove the water reservation. Can better evidence make up for it?',fixed:'The exact plan, identity, current action grant, operating envelope, approved data path and local protection remain valid. No earlier operation is pending.'},[
    dimension<FarmFacts>('Field evidence',[['Current',{evidence:'current'}],['Probes disagree',{evidence:'conflicting'}]]),
    dimension<FarmFacts>('Shared water',[['Reserved',{resourcesReserved:true}],['Not reserved',{resourcesReserved:false}]]),
    dimension<FarmFacts>('Local checks',[['Ready',{localReady:true}],['Missing',{localReady:false}]]),
  ]),
  farm('probe','dry-probe',{title:'Which observation can the plan rely on?',context:'An extra cycle depends on field observations. Inspection and authority are separate conditions.',challenge:'Restore the evidence, then revoke the grant. Watch which boundary still holds.',fixed:'Resource reservation, identity, exact plan, local readiness, data path and operating envelope remain valid. There is no urgent event or pending earlier effect.'},[
    dimension<FarmFacts>('Field evidence',[['Probes disagree',{evidence:'conflicting'}],['Corroborated',{evidence:'current'}],['Stale',{evidence:'stale'}]]),
    dimension<FarmFacts>('Action grant',[['Current',{authority:'current'}],['Revoked',{authority:'revoked'}]]),
  ]),
  farm('care','heat',{title:'Who responds when care becomes urgent?',context:'A local care event and a cloud scheduling decision have different responsibilities.',challenge:'Revoke the cloud grant while the care risk is present. Does local protection disappear?',fixed:'The qualified local care plan and responder remain available. The routine proposal otherwise meets its evidence, resource, identity, local-readiness and operating requirements.'},[
    dimension<FarmFacts>('Local care event',[['Urgent risk',{hazard:true}],['No urgent event',{hazard:false}]]),
    dimension<FarmFacts>('Cloud action grant',[['Current',{authority:'current'}],['Revoked',{authority:'revoked'}]]),
  ]),
  farm('receipt','lost-dose',{title:'Did the pump already act?',context:'One accepted nutrient operation has a stable reference. A lost message does not establish its physical result.',challenge:'Find a completed result. Notice why the model does not run the pump again.',fixed:'There is no urgent local event. The evidence, reservation, exact plan, local checks, identity and operating envelope for a bounded attempt are otherwise established. A confirmed non-execution still needs the same operation contract.'},[
    dimension<FarmFacts>('Earlier operation',[['Outcome unknown',{effect:'unknown'}],['Confirmed complete',{effect:'completed'}],['Confirmed not executed',{effect:'none'}]]),
    dimension<FarmFacts>('Action grant',[['Current',{authority:'current'}],['Revoked',{authority:'revoked'}]]),
  ]),
  farm('offline','offline',{title:'What can continue without the cloud?',context:'This proposed local routine has its own bounded delegation. Unrelated new cloud work has no such permission.',challenge:'Keep the cloud disconnected. Find the conditions the proposed routine still needs.',fixed:'The action grant is current, with valid identity, plan, evidence, resource reservation and operating envelope. Independent essential-care protection and its human response plan are separate from this proposal.'},[
    dimension<FarmFacts>('Cloud connection',[['Disconnected',{cloud:false}],['Connected',{cloud:true}]]),
    dimension<FarmFacts>('Offline delegation',[['Covers this routine',{offlineGrant:true}],['Not available',{offlineGrant:false}]]),
    dimension<FarmFacts>('Local checks',[['Ready',{localReady:true}],['Missing',{localReady:false}]]),
  ]),
];
export const factoryWorkspaces:WorkspaceCase[]=[
  factory('evidence','stale',{title:'Does the evidence cover these bytes?',context:'Candidate 13 is ready for a release decision. Its evidence and permission can change independently.',challenge:'Verify candidate 13, then revoke the grant. Green tests alone cannot release it.',fixed:'Build provenance is verified, the routine limited rollout is confirmed, the required observation window is healthy and recovery is prepared. This models the next stage, not the first deployment.'},[
    dimension<ReleaseFacts>('Evidence covers',[['Candidate 12',{testedCandidate:'candidate-12',testedArtifact:'artifact-12'}],['Candidate 13',{testedCandidate:'candidate-13',testedArtifact:'artifact-13'}]]),
    dimension<ReleaseFacts>('Acceptance checks',[['Passed',{checks:'pass'}],['Failed',{checks:'fail'}]]),
    dimension<ReleaseFacts>('Execution grant',[['Current',{authority:'current'}],['Revoked',{authority:'revoked'}]]),
  ]),
  factory('receipt','timeout',{title:'What does a missing receipt establish?',context:'The release request used one stable operation reference. Model what the provider and observation evidence actually establish.',challenge:'Confirm the deployment. What else is needed before the next rollout stage?',fixed:'Exact-candidate checks, provenance, a current routine grant and recovery readiness are established. A healthy observation window only counts when deployment is also confirmed.'},[
    dimension<ReleaseFacts>('Provider result',[['Outcome unknown',{externalEffect:'unknown'}],['Deployment confirmed',{externalEffect:'confirmed'}],['Not confirmed',{externalEffect:'none'}]]),
    dimension<ReleaseFacts>('Customer observation',[['Inconclusive',{observation:'inconclusive'}],['Healthy window',{observation:'healthy'}],['Operating limit breached',{observation:'breach'}]]),
  ]),
  factory('observe','blind',{title:'Is the trial ready to grow?',context:'A confirmed limited rollout still needs meaningful customer observations and prepared recovery.',challenge:'Establish healthy observations while leaving recovery unprepared. Find the remaining blocker.',fixed:'The exact artifact, protected checks, build provenance, routine current authority and deployment receipt are established.'},[
    dimension<ReleaseFacts>('Customer observation',[['Inconclusive',{observation:'inconclusive'}],['Healthy window',{observation:'healthy'}],['Operating limit breached',{observation:'breach'}]]),
    dimension<ReleaseFacts>('Recovery plan',[['Prepared',{recoveryReady:true}],['Missing',{recoveryReady:false}]]),
  ]),
  factory('authority','healthy',{title:'What does the grant actually cover?',context:'Routine progression can be pre-authorized. A different change class may need its own designated review.',challenge:'Make this an exception. Does a current grant remove the review requirement?',fixed:'Evidence covers the exact artifact, checks and provenance are accepted, deployment is confirmed, the required observations are healthy and recovery is prepared.'},[
    dimension<ReleaseFacts>('Execution grant',[['Current',{authority:'current'}],['Revoked',{authority:'revoked'}]]),
    dimension<ReleaseFacts>('Change class',[['Routine',{changeClass:'routine'}],['Exception',{changeClass:'exception'}]]),
    dimension<ReleaseFacts>('Exception review',[['Not established',{exceptionReview:false}],['Established',{exceptionReview:true}]]),
  ]),
  factory('recovery','incident',{title:'Who stays responsible after release?',context:'Model customer observations and the recovery position. A rollback cannot unsend a message that already left the service.',challenge:'Remove recovery readiness while an operating limit is breached. Containment still comes first.',fixed:'The deployment is confirmed, the exact artifact is verified, authority is current and no earlier operation has an unknown outcome. This model does not simulate rollback or reverse external effects.'},[
    dimension<ReleaseFacts>('Customer observation',[['Operating limit breached',{observation:'breach'}],['Healthy window',{observation:'healthy'}],['Inconclusive',{observation:'inconclusive'}]]),
    dimension<ReleaseFacts>('Recovery plan',[['Prepared',{recoveryReady:true}],['Missing',{recoveryReady:false}]]),
  ]),
];
export function workspacesFor(kind:'farm'|'factory'){return kind==='farm'?farmWorkspaces:factoryWorkspaces;}
