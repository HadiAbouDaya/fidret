import assert from 'node:assert/strict';
import test from 'node:test';
import { contracts, renderWorkflowBrief, reviewCases } from '../src/lib/workflow-brief.ts';

test('workflow brief keeps human scope, authority and recovery decisions editable', () => {
  const brief = renderWorkflowBrief();
  assert.match(brief, /Accountable human owner: \[name and responsibility\]/);
  assert.match(brief, /Current manual baseline:/);
  assert.match(brief, /Human launch decision/);
  assert.match(brief, /hold \/ narrower trial \/ proceed within the recorded scope/);
  // A filled checklist must not read as a grant, a passed assessment or a live result.
  assert.match(brief, /neither grants permissions nor assesses security or compliance/);
  assert.match(brief, /Observed result \/ evidence reference: \[not yet tested\]/);
  assert.doesNotMatch(brief, /<script|<form|github\.com/i);
});

test('workflow review covers action binding and ambiguous writes without inventing access', () => {
  const authority = contracts.find((contract) => contract.id === 'authority');
  const recovery = contracts.find((contract) => contract.id === 'recovery');
  assert.ok(authority);
  assert.ok(recovery);
  const authorityText = authority.prompts.join(' ');
  for (const binding of ['actor', 'operation', 'target', 'payload', 'version', 'expiry']) {
    assert.ok(authorityText.includes(binding), `missing approval binding: ${binding}`);
  }
  assert.match(authority.example, /no customer-send or deployment operation/);
  assert.match(recovery.prompts.join(' '), /reconcile an unknown result before retrying a write/);
  assert.match(renderWorkflowBrief(), /draft-only scope, verify that send and deploy operations are unavailable or denied/);
  const unknownCase = reviewCases.find((reviewCase) => reviewCase.title.includes('unknown outcome'));
  assert.ok(unknownCase);
  assert.match(unknownCase.expected, /before retrying/);
  assert.match(unknownCase.expected, /stop for the recovery owner/);
});
