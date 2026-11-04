import assert from 'node:assert/strict';
import {test} from 'node:test';
import {farmWorkspaces,factoryWorkspaces} from '../src/lib/lab-workspaces.ts';
import {assessFarm,type FarmFacts} from '../src/lib/autonomous-farm.ts';
import {assessRelease,type ReleaseFacts} from '../src/lib/software-factory.ts';
import {parseJourneyHash,parseWorkspaceToken} from '../src/scripts/lab-experience.js';

test('the complete declared workspace space agrees with the canonical policies',()=>{
  let count=0;
  for(const [kind,cases] of [['farm',farmWorkspaces],['factory',factoryWorkspaces]] as const){
    assert.equal(cases.length,5);
    for(const model of cases){
      assert.ok(model.controls.length>=2&&model.controls.length<=3);
      assert.equal(Object.keys(model.states).length,model.controls.reduce((n,c)=>n*c.options.length,1));
      assert.equal(Object.keys(model.facts).length,Object.keys(model.states).length);
      assert.ok(model.states[model.initial]);
      for(const [key,state] of Object.entries(model.states)){
        count++;
        const expected=kind==='farm'?assessFarm(model.facts[key] as FarmFacts):assessRelease(model.facts[key] as ReleaseFacts);
        assert.equal(state.decision,expected.decision,`${kind}/${model.key}/${key}`);
        assert.deepEqual(state.reasons,expected.reasons);
        assert.equal(state.trace.length,4);
        assert.ok(state.reasons.length>0&&state.reasons.length<=10);
        key.split('').forEach((value,i)=>assert.ok(model.controls[i]!.options[Number(value)]));
      }
    }
  }
  assert.equal(count,69);
});

test('combined blockers survive individual repairs and priority does not imply lower gates passed',()=>{
  const water=farmWorkspaces[0]!.states;
  assert.equal(water['000']!.decision,'run');
  assert.equal(water['110']!.reasons.length,2);
  assert.equal(water['010']!.decision,'hold');
  const evidence=factoryWorkspaces[0]!.states;
  assert.equal(evidence['100']!.decision,'advance');
  assert.equal(evidence['101']!.decision,'hold');
  assert.equal(evidence['111']!.reasons.length,2);
  const care=farmWorkspaces[2]!.states;
  assert.equal(care['01']!.decision,'protect');
  assert.deepEqual(care['01']!.trace.slice(1).map(t=>t.status),['deferred','deferred','deferred']);
  assert.equal(care['11']!.decision,'hold');
  const pump=farmWorkspaces[3]!.states;
  assert.equal(pump['11']!.decision,'recorded');
  assert.equal(pump['01']!.decision,'reconcile');
  assert.equal(pump['21']!.decision,'hold');
  const receipt=factoryWorkspaces[1]!.states;
  assert.equal(receipt['10']!.decision,'hold');
  assert.equal(receipt['11']!.decision,'advance');
  assert.equal(receipt['02']!.decision,'contain');
});

test('workspace fragments are versioned categorical state and keep old scene links valid',()=>{
  assert.deepEqual(parseJourneyHash('#scene-receipt~v1-11',['water','receipt']),{all:false,key:'receipt'});
  assert.equal(parseWorkspaceToken('#scene-receipt~v1-11'),'11');
  for(const hash of ['#scene-water','#scene-water~v2-010','#scene-water~v1-01x','#scene-water~v1-0000','#scene-water~v1-__proto__']) assert.equal(parseWorkspaceToken(hash),null);
});
