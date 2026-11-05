import assert from 'node:assert/strict';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, test } from 'node:test';
import { createSiteFixture, buildSite as build } from './helpers/site-fixture.mjs';

const fixtures = [];
afterEach(() => { for (const path of fixtures.splice(0)) rmSync(path, { recursive: true, force: true }); });

function fixture() {
  const root = createSiteFixture();
  fixtures.push(root);
  return root;
}

const narrative = `## Question
How does the publishing pipeline behave?

## Approach
Build a disposable fixture.

\`\`\`html
<script>alert('inert fixture')</script>
\`\`\`

## Takeaways
This is a rendering test fixture.

## Limits
No real experiment or client result is claimed.

## Next steps
Discard the fixture after checking it.
`;

function writePiece(root, slug, { status = 'published', authors = ['elie', 'hadi'], body = narrative, media = [], resources = [], publicationDate = '2025-01-02' } = {}) {
  const data = {
    schema_version: 1, slug, title: 'Pipeline fixture <b>literal</b>', kind: 'technical-note', status,
    authors, created: '2025-01-01', published: status === 'published' ? publicationDate : null,
    updated: publicationDate, summary: 'A disposable pipeline test, not company evidence.',
    resources, media, snippets: [],
  };
  const frontmatter = Object.entries(data).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join('\n');
  writeFileSync(join(root, 'lab/pieces', `${slug}.md`), `---\n${frontmatter}\n---\n\n${body}`);
}

test('actual Astro builds publish only complete pieces with ordered credit and safe rendering; withdrawal removes output', () => {
  const root = fixture();
  mkdirSync(join(root, 'public/lab-assets'), { recursive: true });
  writeFileSync(join(root, 'public/lab-assets/pipeline-fixture.svg'), '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8"><rect width="8" height="8"/></svg>');
  writePiece(root, 'published-fixture', {
    resources: [{ label: 'Independent reference', url: 'https://example.com/reference' }],
    body: `${narrative}\n## Piece resources\nAuthored heading tests shared ID space.\n\n## Resources title\nAnother authored heading.\n\n![Markdown fixture image](/lab-assets/pipeline-fixture.svg)\n`,
    media: [{ src: '/lab-assets/pipeline-fixture.svg', alt: 'Structured fixture image', caption: 'Disposable test image.', width: 8, height: 8 }],
  });
  writePiece(root, 'private-draft', { status: 'draft', body: '## Question\n' });
  let result = build(root);
  assert.equal(result.status, 0, result.output);
  const article = readFileSync(join(root, 'website/lab/published-fixture/index.html'), 'utf8');
  const listing = readFileSync(join(root, 'website/lab/index.html'), 'utf8');
  const sitemap = readFileSync(join(root, 'website/sitemap.xml'), 'utf8');
  const signal = readFileSync(join(root, 'website/explorations/signal-freshness/index.html'), 'utf8');
  assert.doesNotMatch(signal, /<script(?! type="application\/ld\+json")(?:\s|>)/i);
  // Historical numbers stay visible without being offered as current readings.
  for (const [key, historical, available] of [
    ['fresh', 21, 21], ['expired', 21, 'Withheld'], ['delayed', 21, 'Withheld'],
    ['recovering', 23, 'Withheld'], ['recovered', 24, 24],
  ]) {
    const panel = new RegExp(`<section[^>]*id="snapshot-${key}"[^>]*>([\\s\\S]*?)</section>`).exec(signal)?.[1];
    assert.ok(panel, `Recorded moment ${key} remains in initial HTML`);
    const text = panel.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
    assert.ok(text.includes(`Last accepted number ${historical} synthetic units`), key);
    assert.ok(text.includes(`Value available to use ${available}`), key);
    assert.ok(signal.includes(`aria-controls="snapshot-${key}"`), key);
  }
  assert.match(article, /&lt;b&gt;literal&lt;\/b&gt;/);
  assert.match(article, /(?:&lt;|&#x3c;)script(?:&gt;|>)/i);
  assert.match(article, /src="\/lab-assets\/pipeline-fixture.svg"/);
  assert.match(article, /width="8"/);
  const articleIds = [...article.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(articleIds).size, articleIds.length, 'Authored headings cannot collide with template anchors');
  for (const [, target] of article.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(articleIds.includes(target), `Article navigation must resolve: ${target}`);
  }
  assert.doesNotMatch(article, /<script(?! type="application\/ld\+json")(?:\s|>)/i);
  assert.ok(article.indexOf('Elie Azoury') < article.indexOf('Hadi Abou Daya'));
  assert.match(article, /https:\/\/fidret\.com\/lab\/published-fixture\//);
  assert.match(listing, /published-fixture/);
  assert.match(readFileSync(join(root, 'website/llms.txt'), 'utf8'), /published-fixture/);
  assert.doesNotMatch(readFileSync(join(root, 'website/llms.txt'), 'utf8'), /private-draft/);
  const schema = JSON.parse(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(article)[1]);
  assert.ok(schema['@graph'].some(node => node['@type'] === 'Article' && node.url.endsWith('/published-fixture/')));
  assert.equal(existsSync(join(root, 'website/lab/published-fixture/sources/index.html')), true);
  assert.equal(existsSync(join(root, 'website/lab/private-draft/sources/index.html')), false);
  assert.match(sitemap, /<loc>https:\/\/fidret\.com\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/fidret\.com\/lab\/<\/loc>/);
  assert.match(sitemap, /published-fixture/);
  assert.doesNotMatch(listing + sitemap, /private-draft/);
  assert.equal(existsSync(join(root, 'website/lab/private-draft')), false);
  assert.equal(existsSync(join(root, 'website/lab/authors.json')), false);
  assert.equal(existsSync(join(root, 'website/AGENTS.md')), false);

  writePiece(root, 'published-fixture', { status: 'draft', body: '## Question\n' });
  result = build(root);
  assert.equal(result.status, 0, result.output);
  assert.equal(existsSync(join(root, 'website/lab/published-fixture')), false);
  assert.doesNotMatch(readFileSync(join(root, 'website/llms.txt'), 'utf8'), /published-fixture/);
  assert.equal(existsSync(join(root, 'website/lab/published-fixture/sources')), false);
  assert.doesNotMatch(readFileSync(join(root, 'website/sitemap.xml'), 'utf8'), /published-fixture/);
});

test('workflow companion, download and entry points follow parent publication and withdrawal', () => {
  const root = fixture();
  const slug = 'agentic-company-harness';
  const guidePath = `/lab/${slug}/workflow-brief/`;
  const downloadPath = `/lab/${slug}/workflow-brief.md`;
  writePiece(root, slug, {authors: ['hadi']});
  writePiece(root, 'published-fixture');
  let result = build(root);
  assert.equal(result.status, 0, result.output);
  const guide = readFileSync(join(root, 'website', guidePath, 'index.html'), 'utf8');
  const download = readFileSync(join(root, 'website', downloadPath), 'utf8');
  assert.match(guide, /download="fidret-agent-workflow-brief.md"/);
  assert.match(guide, /type="checkbox"/);
  const explanation = readFileSync(join(root, `website/lab/${slug}/index.html`), 'utf8');
  for (const [key, result] of [['investigate', 'Allowed within scope'], ['reply', 'Review required'], ['deploy', 'Denied']]) {
    assert.ok(explanation.includes(`aria-controls="agentic-boundary-${key}-panel"`));
    const panel = new RegExp(`<section[^>]*id="agentic-boundary-${key}-panel"[^>]*>([\\s\\S]*?)</section>`).exec(explanation)?.[1];
    assert.ok(panel?.includes(result), `Keep the ${key} permission boundary in initial HTML`);
  }
  assert.match(explanation, /does not yet permit sending/);
  assert.doesNotMatch(explanation, /<script(?! type="application\/ld\+json")(?:\s|>)/i);
  assert.doesNotMatch(guide, /<(?:script(?! type="application\/ld\+json")|form)(?:\s|>)/i);
  assert.match(download, /^# Agent workflow brief\n/);
  assert.match(download, /\[not yet tested\]/);
  assert.match(download, /Human launch decision/);
  for (const section of ['Purpose', 'Context', 'Authority', 'Evidence', 'Recovery']) {
    assert.ok(download.includes(`## ${section}\n`), `${section} must be in the actual download`);
  }
  for (const route of [`lab/${slug}/index.html`, 'approach/index.html', 'sitemap.xml']) {
    assert.ok(readFileSync(join(root, 'website', route), 'utf8').includes(guidePath), `${route} must expose the companion`);
  }
  assert.ok(guide.includes(downloadPath));
  assert.equal(existsSync(join(root, 'website/lab/published-fixture/workflow-brief')), false);
  assert.equal(existsSync(join(root, `website/work/${slug}/index.html`)), true);
  assert.ok(readFileSync(join(root,'website/work/index.html'),'utf8').includes(`/work/${slug}/`));

  writePiece(root, slug, {status: 'draft', body: '## Question\n'});
  result = build(root);
  assert.equal(result.status, 0, result.output);
  assert.equal(existsSync(join(root, 'website', guidePath)), false);
  assert.equal(existsSync(join(root, `website/work/${slug}/index.html`)), false);
  for(const route of ['work/index.html','sitemap.xml','llms.txt']) assert.ok(!readFileSync(join(root,'website',route),'utf8').includes(`/work/${slug}/`));
  assert.equal(existsSync(join(root, 'website', downloadPath)), false);
  for (const route of ['approach/index.html', 'sitemap.xml', 'lab/index.html']) {
    assert.ok(!readFileSync(join(root, 'website', route), 'utf8').includes(guidePath), `${route} must withdraw the entry point`);
  }
});

test('actual Astro build rejects incomplete published narrative', () => {
  const root = fixture();
  writePiece(root, 'incomplete', { body: '## Question\n\n## Approach\n\n## Takeaways\n\n## Limits\n\n## Next steps\n' });
  const result = build(root);
  assert.notEqual(result.status, 0, 'Build must fail for blank published sections');
  writePiece(root, 'incomplete');
  const repaired = build(root);
  assert.equal(repaired.status, 0, repaired.output);
});

test('factory guided story, complete notes, situation library and download follow publication and withdrawal', () => {
  const root = fixture();
  rmSync(join(root, 'lab/pieces'), {recursive: true});
  mkdirSync(join(root, 'lab/pieces'));
  const slug = 'ai-software-factory';
  const downloadPath = `lab/${slug}/operating-brief.md`;
  writePiece(root, slug, {authors: ['hadi'], publicationDate: '2025-01-03', body: `${narrative}\n### Factory journey\nAuthored heading remains reachable.\n\n### Factory case title stale\nA shared namespace.\n`});
  writePiece(root, 'published-fixture', {authors: ['hadi']});
  writePiece(root, 'autonomous-farm', {authors: ['hadi']});
  let result = build(root);
  assert.equal(result.status, 0, result.output);
  const article = readFileSync(join(root, `website/lab/${slug}/index.html`), 'utf8');
  assert.match(article, /class="experience-other" href="\/lab\/autonomous-farm\/"/);
  assert.match(readFileSync(join(root, 'website/lab/autonomous-farm/index.html'), 'utf8'), /class="experience-other" href="\/lab\/ai-software-factory\/"/);
  assert.match(article, /data-lab-journey/);
  assert.equal([...article.matchAll(/data-scene(?:\s|>)/g)].length, 5);
  assert.match(article, /<script type="module" src="\/_astro\/lab-experience\.[A-Za-z0-9_-]+\.js"><\/script>/);
  assert.match(article, /data-model=/);
  assert.match(article, /What the model would do/);
  assert.doesNotMatch(article, /Start the story|data-choice=/);
  assert.doesNotMatch(article, /<form(?:\s|>)/i);
  for (const route of ['engineering-notes', 'scenarios']) {
    const html = readFileSync(join(root, `website/lab/${slug}/${route}/index.html`), 'utf8');
    assert.ok(html.includes(`/lab/${slug}/`));
    assert.ok(readFileSync(join(root, 'website/sitemap.xml'), 'utf8').includes(`/lab/${slug}/${route}/`));
    assert.equal(existsSync(join(root, `website/lab/published-fixture/${route}`)), false);
  }
  const notes = readFileSync(join(root, `website/lab/${slug}/engineering-notes/index.html`), 'utf8');
  assert.match(notes, /Authored heading remains reachable/);
  assert.match(notes, /id="factory-journey"/);
  assert.match(readFileSync(join(root, 'website', downloadPath), 'utf8'), /^# AI software factory: operating brief/);
  assert.doesNotMatch(readFileSync(join(root, 'website/lab/published-fixture/index.html'), 'utf8'), /data-lab-journey|<script(?! type="application\/ld\+json")(?:\s|>)/);
  const ids = [...article.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const [, target] of article.matchAll(/(?:href="#|aria-controls=")([^"]+)"/g)) assert.ok(ids.includes(target), target);
  writePiece(root, slug, {status: 'draft', body: '## Question\n'});
  result = build(root);
  assert.equal(result.status, 0, result.output);
  assert.equal(existsSync(join(root, `website/lab/${slug}`)), false);
  assert.equal(existsSync(join(root, `website/work/${slug}/index.html`)), false);
  for(const route of ['work/index.html','sitemap.xml','llms.txt']) assert.ok(!readFileSync(join(root,'website',route),'utf8').includes(`/work/${slug}/`));
  assert.ok(!readFileSync(join(root, 'website/sitemap.xml'), 'utf8').includes(`/lab/${slug}/`));
  assert.doesNotMatch(readFileSync(join(root, 'website/lab/autonomous-farm/index.html'), 'utf8'), /href="\/lab\/ai-software-factory\//);
});

test('actual Astro build rejects raw HTML through the configured Markdown pipeline', () => {
  const root = fixture();
  writePiece(root, 'injected', { body: `${narrative}\n<script>alert('blocked')</script>\n` });
  const result = build(root);
  assert.notEqual(result.status, 0, 'Build must reject active authored HTML');
  writePiece(root, 'injected');
  const repaired = build(root);
  assert.equal(repaired.status, 0, repaired.output);
});

test('actual Astro collection rejects an unregistered author', () => {
  const root = fixture();
  writePiece(root, 'wrong-author', { authors: ['unregistered'] });
  const result = build(root);
  assert.notEqual(result.status, 0, 'Build must reject unregistered authors');
  writePiece(root, 'wrong-author', { authors: ['hadi'] });
  const repaired = build(root);
  assert.equal(repaired.status, 0, repaired.output);
});

test('farm simple/deep routes, control references and brief follow publication and withdrawal',()=>{
  const root=fixture();
  rmSync(join(root,'lab/pieces'),{recursive:true});
  mkdirSync(join(root,'lab/pieces'));
  const slug='autonomous-farm';
  writePiece(root,'published-fixture',{authors:['hadi']});
  writePiece(root,'ai-software-factory',{authors:['hadi']});
  // Only the withdrawn parent credits Elie; registry/profile stay available.
  writePiece(root,slug,{authors:['hadi','elie'],publicationDate:'2025-01-03'});
  let result=build(root);
  assert.equal(result.status,0,result.output);
  const article=readFileSync(join(root,`website/lab/${slug}/index.html`),'utf8');
  assert.ok(article.includes(`/lab/${slug}/scenario-desk/`));
  assert.ok(article.includes(`/lab/${slug}/blueprint/`));
  assert.match(article,/class="experience-other" href="\/lab\/ai-software-factory\/"/);
  assert.match(readFileSync(join(root,'website/lab/index.html'),'utf8'),/href="\/people\/elie\/"/);
  const blueprint=readFileSync(join(root,`website/lab/${slug}/blueprint/index.html`),'utf8');
  const blueprintIds=[...blueprint.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
  const map = /<svg\b[^>]*aria-labelledby="farm-map-title"[^>]*>[\s\S]*?<\/svg>/.exec(blueprint)?.[0];
  assert.ok(map, 'The clickable farm plan must be present');
  assert.match(map, /role="group"/);
  assert.doesNotMatch(map, /role="img"/);
  const mapLinks = [...map.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)];
  assert.equal(mapLinks.length, 6, 'Keep the six useful visual destinations');
  for (const [, attributes, content] of mapLinks) {
    assert.doesNotMatch(attributes, /aria-label/, 'Visible SVG text supplies each link name');
    assert.match(content, /<text\b[^>]*>[^<]+<\/text>/);
  }
  for (const [, label] of blueprint.matchAll(/<pre\b[^>]*tabindex="0"[^>]*role="region"[^>]*aria-labelledby="([^"]+)"/g)) {
    assert.ok(blueprintIds.includes(label), `Code region heading exists: ${label}`);
  }
  assert.equal([...blueprint.matchAll(/<pre\b[^>]*tabindex="0"/g)].length, 2);
  for(const route of ['scenario-desk','blueprint']){
    const html=readFileSync(join(root,`website/lab/${slug}/${route}/index.html`),'utf8');
    const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
    assert.equal(new Set(ids).size,ids.length,route);
    assert.doesNotMatch(html,/<(?:form|iframe)(?:\s|>)/i);
    assert.equal([...html.matchAll(/<script (?!type="application\/ld\+json")/g)].length,1);
    assert.match(html, /<script type="module" src="\/_astro\/lab-experience\.[A-Za-z0-9_-]+\.js"><\/script>/);
    for(const [,target]of html.matchAll(/(?:href="#|aria-controls="|for=")([^"]+)"/g)) assert.ok(ids.includes(target),`${route}: ${target}`);
    for(const [,target]of html.matchAll(/href="\/lab\/autonomous-farm\/blueprint\/#([^"]+)"/g)) assert.ok(blueprintIds.includes(target),`deep link: ${target}`);
    assert.ok(readFileSync(join(root,'website/sitemap.xml'),'utf8').includes(`/lab/${slug}/${route}/`));
    assert.equal(existsSync(join(root,`website/lab/published-fixture/${route}`)),false);
  }
  const desk=readFileSync(join(root,`website/lab/${slug}/scenario-desk/index.html`),'utf8');
  assert.equal([...desk.matchAll(/class="reference-situation"/g)].length,28);
  assert.match(desk,/data-topic-finder/);
  assert.equal([...article.matchAll(/data-scene(?:\s|>)/g)].length,5);
  const brief=readFileSync(join(root,`website/lab/${slug}/operating-brief.md`),'utf8');
  assert.match(brief,/^# Autonomous mixed farm: operating brief/);
  assert.match(brief,/\[not yet tested\]/);
  for(const route of ['index.html','work/index.html','lab/index.html','project/index.html','people/hadi/index.html','sitemap.xml']) assert.ok(readFileSync(join(root,'website',route),'utf8').includes(route==='index.html'||route==='work/index.html'?`/work/${slug}/`:`/lab/${slug}/`),route);
  assert.equal(existsSync(join(root,`website/work/${slug}/index.html`)),true);
  writePiece(root,slug,{status:'draft',body:'## Question\n'});
  result=build(root);
  assert.equal(result.status,0,result.output);
  assert.equal(existsSync(join(root,`website/lab/${slug}`)),false);
  for(const route of ['index.html','work/index.html','lab/index.html','project/index.html','people/hadi/index.html','sitemap.xml','llms.txt']) {
    const output=readFileSync(join(root,'website',route),'utf8');
    assert.ok(!output.includes(`/lab/${slug}/`)&&!output.includes(`/work/${slug}/`),route);
  }
  assert.equal(existsSync(join(root,`website/work/${slug}/index.html`)),false);
  assert.doesNotMatch(readFileSync(join(root,'website/lab/ai-software-factory/index.html'),'utf8'),/href="\/lab\/autonomous-farm\//);
  assert.doesNotMatch(readFileSync(join(root,'website/lab/index.html'),'utf8'),/href="\/people\/elie\/"/);
  assert.equal(existsSync(join(root,'website/people/elie/index.html')),true);
});
