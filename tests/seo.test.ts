import assert from 'node:assert/strict';
import {test} from 'node:test';
import {searchGraph,serializeGraph,socialPreview,SOCIAL_IMAGE} from '../src/lib/seo.ts';

test('structured metadata cannot terminate an inert script even with hostile authored titles',()=>{
  const text='A </script><script>alert(1)</script> title';
  const graph=searchGraph('https://fidret.com/lab/fixture/',text,'A fixture.',{headline:text,authors:['hadi'],published:'2025-01-01',updated:'2025-01-02'});
  const serialized=serializeGraph(graph);
  assert.doesNotMatch(serialized,/<\/script|<script/);
  assert.deepEqual(JSON.parse(serialized),graph);
  assert.equal(graph['@graph'].find(n=>n['@type']==='Article')?.headline,text);
});

test('author identities come from the real registry and missing author IDs cannot invent credit',()=>{
  assert.throws(()=>searchGraph('https://fidret.com/lab/fixture/','Fixture','Description',{headline:'Fixture',authors:['invented'],published:'2025-01-01',updated:'2025-01-02'}));
  const graph=searchGraph('https://fidret.com/people/hadi/','Hadi Abou Daya | Fidret Lab','Published work.');
  assert.equal(graph['@graph'].find(n=>n['@type']==='ProfilePage')?.url,'https://fidret.com/people/hadi/');
});


test('work previews stay specific across overview, experiment and engineering references',()=>{
  for(const path of ['/work/ai-software-factory/','/lab/ai-software-factory/','/lab/ai-software-factory/engineering-notes/']) {
    assert.equal(socialPreview(`https://fidret.com${path}`).url,'https://fidret.com/social/ai-software-factory.png');
  }
  assert.equal(socialPreview('https://fidret.com/explorations/signal-freshness/method/').url,'https://fidret.com/social/signal-freshness.png');
  assert.equal(socialPreview('https://fidret.com/lab/').url,SOCIAL_IMAGE);
  assert.equal(socialPreview('https://fidret.com/contact/').url,SOCIAL_IMAGE);
});
