import assert from 'node:assert/strict';
import {test} from 'node:test';
import {labJourneys,journeyForSlug} from '../src/lib/lab-journeys.ts';
import {farmScenarios,assessFarm} from '../src/lib/autonomous-farm.ts';
import {releaseCases,assessRelease} from '../src/lib/software-factory.ts';
import {normalizeQuery,parseJourneyHash} from '../src/scripts/lab-experience.js';

test('guided story responses retain the existing independent policy models',()=>{
  for(const journey of labJourneys){
    assert.equal(journey.steps.length,5);
    assert.equal(new Set(journey.steps.map(s=>s.key)).size,5);
    for(const step of journey.steps){
      const expected=journey.kind==='farm'?assessFarm(farmScenarios.find(s=>s.key===step.sourceCase)!.facts).decision:assessRelease(releaseCases.find(s=>s.key===step.sourceCase)!.facts).decision;
      assert.equal(step.decision,expected,step.key);
      assert.equal(step.choices.filter(c=>c.decision===expected).length,1,step.key);
      assert.ok(step.notePath.startsWith(journey.notes+'#'));
    }
  }
});

test('counterfactuals teach independent gates rather than treating one repaired fact as universal permission',()=>{
  assert.deepEqual(labJourneys[0].steps.map(s=>s.counter.decision),['hold','run','protect','recorded','hold']);
  assert.deepEqual(labJourneys[1].steps.map(s=>s.counter.decision),['advance','hold','advance','hold','contain']);
  assert.ok(journeyForSlug('autonomous-farm'));
  assert.equal(journeyForSlug('unrelated-piece'),undefined);
});

test('shareable journey state tolerates unknown and malformed fragments without arbitrary selection',()=>{
  const keys=['water','receipt'];
  assert.deepEqual(parseJourneyHash('#scene-receipt',keys),{all:false,key:'receipt'});
  assert.deepEqual(parseJourneyHash('#read-all',keys),{all:true,key:'water'});
  for(const hash of ['', '#missing', '#scene-%E0%A4%A', '#scene-<script>']) assert.deepEqual(parseJourneyHash(hash,keys),{all:false,key:'water'});
  assert.equal(normalizeQuery('  RéCeIPT  '),'receipt');
});
