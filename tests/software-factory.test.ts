import assert from 'node:assert/strict';
import {test} from 'node:test';
import {assessRelease, referenceFacts, releaseCases, renderFactoryBrief, stations, type ReleaseFacts} from '../src/lib/software-factory.ts';

test('the illustrative release policy never advances when any required gate is absent', () => {
  let combinations = 0;
  for (const checks of ['pass', 'fail', 'unknown'] as const)
  for (const provenance of ['verified', 'mismatch', 'unknown'] as const)
  for (const authority of ['current', 'expired', 'revoked'] as const)
  for (const externalEffect of ['none', 'confirmed', 'unknown'] as const)
  for (const observation of ['healthy', 'inconclusive', 'breach'] as const)
  for (const recoveryReady of [true, false])
  for (const evidenceMatches of [true, false]) {
    const facts: ReleaseFacts = {...referenceFacts, checks, provenance, authority, externalEffect, observation, recoveryReady,
      testedCandidate: evidenceMatches ? referenceFacts.candidate : 'earlier-candidate'};
    const expected = checks === 'pass' && provenance === 'verified' && authority === 'current'
      && externalEffect === 'confirmed' && observation === 'healthy' && recoveryReady && evidenceMatches;
    assert.equal(assessRelease(facts).decision === 'advance', expected, JSON.stringify(facts));
    combinations += 1;
  }
  assert.equal(combinations, 972);
});

test('late edits, artifact substitutions, missing evidence and revoked grants invalidate progression', () => {
  for (const change of [
    {candidate: 'new-candidate'}, {artifact: 'substituted-artifact'}, {testedCandidate: null}, {testedArtifact: null},
    {candidate: ''}, {artifact: ''}, {authority: 'expired'}, {authority: 'revoked'},
  ] satisfies Partial<ReleaseFacts>[]) {
    assert.equal(assessRelease({...referenceFacts, ...change}).decision, 'hold');
  }
});

test('exception review is required independently of otherwise successful evidence', () => {
  const exception = {...referenceFacts, changeClass: 'exception' as const};
  assert.equal(assessRelease(exception).decision, 'hold');
  assert.equal(assessRelease({...exception, exceptionReview: true}).decision, 'advance');
  assert.equal(assessRelease({...exception, exceptionReview: true, authority: 'revoked'}).decision, 'hold');
});

test('uncertain external effects require reconciliation and observed harm requires containment', () => {
  const unknown = {...referenceFacts, externalEffect: 'unknown' as const};
  assert.equal(assessRelease(unknown).decision, 'reconcile');
  assert.equal(assessRelease({...unknown, authority: 'revoked'}).decision, 'reconcile');
  assert.equal(assessRelease({...unknown, observation: 'breach'}).decision, 'contain');
  assert.equal(assessRelease({...referenceFacts, observation: 'inconclusive'}).decision, 'hold');
});

test('all displayed decision cases are backed by the policy and the brief labels unperformed work', () => {
  assert.deepEqual(releaseCases.map(scenario => assessRelease(scenario.facts).decision), ['hold', 'reconcile', 'hold', 'advance', 'contain']);
  assert.equal(new Set(stations.map(station => station.key)).size, stations.length);
  const brief = renderFactoryBrief();
  assert.match(brief, /Observed results.*\[not yet tested\]/);
  assert.match(brief, /unknown-outcome reconciliation/);
  assert.match(brief, /not complete coverage/);
  assert.doesNotMatch(brief, /\u2014|&mdash;|&#8212;/);
});
