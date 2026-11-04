import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFileSync,readdirSync,writeFileSync,rmSync} from 'node:fs';
import {join} from 'node:path';
import {createSiteFixture,buildSite} from './helpers/site-fixture.mjs';

test('one fingerprinted source-parity runtime is confined to six Lab surfaces and changes identity on edit',()=>{
 const root=createSiteFixture();
 try{
  let result=buildSite(root);assert.equal(result.status,0,result.output);
  const routes=['lab/autonomous-farm/index.html','lab/ai-software-factory/index.html','lab/autonomous-farm/scenario-desk/index.html','lab/autonomous-farm/blueprint/index.html','lab/ai-software-factory/scenarios/index.html','lab/ai-software-factory/engineering-notes/index.html'];
  const scripts=[];
  for(const route of routes){
   const html=readFileSync(join(root,'website',route),'utf8');
   const tags=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)];
   assert.equal(tags.length,1,route);assert.equal(tags[0][1],'');
   const src=/src="([^\"]+)"/.exec(tags[0][0])[1];
   assert.match(src,/^\/_astro\/lab-experience\.[A-Za-z0-9_-]+\.js$/);scripts.push(src);
   assert.doesNotMatch(html,/\son\w+=|\sstyle=/i);
  }
  assert.equal(new Set(scripts).size,1);
  const source=readFileSync(join(root,'src/scripts/lab-experience.js'));
  assert.deepEqual(readFileSync(join(root,'website',scripts[0])),source);
  assert.ok(source.length<=16000);
  assert.doesNotMatch(source.toString(),/\b(?:fetch|XMLHttpRequest|WebSocket|EventSource|localStorage|sessionStorage|indexedDB|eval)\b|\.(?:innerHTML|outerHTML)\s*=/);
  for(const route of ['index.html','lab/index.html','project/index.html','people/hadi/index.html','404.html','lab/agentic-company-harness/index.html']) assert.doesNotMatch(readFileSync(join(root,'website',route),'utf8'),/<script\b/);
  assert.deepEqual(readdirSync(join(root,'website/_astro')).filter(f=>f.endsWith('.js')).sort(),[scripts[0].split('/').pop()]);
  writeFileSync(join(root,'src/scripts/lab-experience.js'),source+'\n// Deliberate fixture-only runtime revision.\n');
  result=buildSite(root);assert.equal(result.status,0,result.output);
  const next=/src="([^\"]+\.js)"/.exec(readFileSync(join(root,'website',routes[0]),'utf8'))[1];
  assert.notEqual(next,scripts[0]);
  assert.deepEqual(readFileSync(join(root,'website',next)),readFileSync(join(root,'src/scripts/lab-experience.js')));
 }finally{rmSync(root,{recursive:true,force:true});}
});
