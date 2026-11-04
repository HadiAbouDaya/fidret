import assert from 'node:assert/strict';
import {test} from 'node:test';
import {assessFarm, normalFarmFacts, farmDomains, farmScenarios, type FarmFacts} from '../src/lib/autonomous-farm.ts';
import {farmChapters,farmReferences,renderFarmBrief} from '../src/lib/farm-blueprint.ts';

test('farm actuation needs every independent gate, current evidence and bounded review',()=>{
  let combinations=0;
  for(const evidence of ['current','stale','conflicting'] as const)
  for(const authority of ['current','expired','revoked'] as const)
  for(let bits=0;bits<1024;bits++){
    const bool=(n:number)=>Boolean(bits&(1<<n));
    const f:FarmFacts={...normalFarmFacts,evidence,authority,identity:bool(0),planMatches:bool(1),envelope:bool(2),localReady:bool(3),dataAllowed:bool(4),resourcesReserved:bool(5),cloud:bool(6),offlineGrant:bool(7),specialistRequired:bool(8),approvalBound:bool(9)};
    const permitted=evidence==='current'&&authority==='current'&&f.identity&&f.planMatches&&f.envelope&&f.localReady&&f.dataAllowed&&f.resourcesReserved&&(f.cloud||f.offlineGrant)&&(!f.specialistRequired||f.approvalBound);
    assert.equal(assessFarm(f).decision==='run',permitted,JSON.stringify(f));
    combinations++;
  }
  assert.equal(combinations,9216);
});

test('protection and reconciliation cannot turn into new actuation and completed commands never repeat',()=>{
  for(const authority of ['current','expired','revoked'] as const)
  for(const evidence of ['current','stale','conflicting'] as const)
  for(const approvalBound of [false,true]){
    const f={...normalFarmFacts,authority,evidence,approvalBound,specialistRequired:true};
    assert.equal(assessFarm({...f,effect:'unknown'}).decision,'reconcile');
    assert.equal(assessFarm({...f,effect:'completed'}).decision,'recorded');
    for(const effect of ['none','unknown','completed'] as const) assert.equal(assessFarm({...f,effect,hazard:true}).decision,'protect');
  }
});

test('human review is exact and cannot repair stale evidence, unsafe conditions or an unapproved destination',()=>{
  const pending={...normalFarmFacts,specialistRequired:true};
  assert.equal(assessFarm(pending).decision,'review');
  assert.equal(assessFarm({...pending,approvalBound:true}).decision,'run');
  for(const change of [{planMatches:false},{envelope:false},{evidence:'stale'},{localReady:false},{dataAllowed:false},{authority:'revoked'}] satisfies Partial<FarmFacts>[]){
    assert.equal(assessFarm({...pending,approvalBound:true,...change}).decision,'hold');
  }
  assert.equal(assessFarm({...normalFarmFacts,cloud:false}).decision,'hold');
  assert.equal(assessFarm({...normalFarmFacts,cloud:false,offlineGrant:true}).decision,'run');
});

test('all 28 authored cases have stable, explicitly reviewed teaching answers',()=>{
  const expected={leak:'protect',birth:'protect','egg-jam':'protect',duplicate:'recorded',morning:'run','dry-probe':'hold',salts:'hold',storm:'hold','water-conflict':'hold',pest:'review',heat:'protect',cow:'review','sheep-feed':'hold',flock:'protect',grazing:'hold',slurry:'protect',milk:'hold',eggs:'run',meat:'review',harvest:'protect',recall:'protect','compost-route':'hold',offline:'run','lost-dose':'reconcile',injection:'hold',region:'hold','split-leader':'hold',budget:'hold'};
  assert.equal(farmScenarios.length,28);
  assert.equal(new Set(farmScenarios.map(s=>s.key)).size,28);
  for(const s of farmScenarios){
    assert.equal(assessFarm(s.facts).decision,expected[s.key as keyof typeof expected],s.key);
    assert.ok(farmChapters.some(c=>c.id===s.deep),`${s.key} has a deep destination`);
  }
  for(const d of farmDomains) assert.equal(farmScenarios.filter(s=>s.domain===d.key).length,7);
});

test('blueprint evidence and portable brief preserve scope and explicit unperformed checks',()=>{
  const ids=farmReferences.map(r=>r.id);
  assert.equal(new Set(ids).size,ids.length);
  for(const c of farmChapters) for(const source of c.sources) assert.ok(ids.includes(source as typeof ids[number]),source);
  const brief=renderFarmBrief();
  for(const c of farmChapters) assert.ok(brief.includes(`## ${c.title}\n`));
  assert.match(brief,/Actual result: \[not yet tested\]/);
  assert.match(brief,/Physical validation.*\[not established\]/);
  assert.match(brief,/grants no equipment authority/);
  assert.doesNotMatch(brief,/\u2014|&mdash;|&#8212;/);
});
