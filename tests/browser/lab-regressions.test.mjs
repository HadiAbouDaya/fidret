import assert from 'node:assert/strict';
import {after, before, test} from 'node:test';
import {assertFocusVisible, holdModule, inViewport, isModule, layoutReady, ready, sceneSnapshot, startBrowser, startSite, withPage} from './helpers.mjs';

let site, browser;
before(async () => {
  site = await startSite();
  browser = await startBrowser();
  console.info(`Browser regressions: Chromium ${browser.version()} on an ephemeral loopback port`);
}, {timeout: 30_000});
after(async () => {
  try { await browser?.close(); } finally { await site?.close(); }
}, {timeout: 30_000});

const workspaces = ['/lab/autonomous-farm/', '/lab/ai-software-factory/'];
const phone = {width: 390, height: 844};
const options = {timeout: 60_000};

const delayedInitialLinks = [
  {path: workspaces[0], hash: '#scene-water', items: '[data-scene]', index: 3},
  {path: workspaces[1], hash: '#scene-evidence', items: '[data-scene]', index: 3},
  {path: '/lab/autonomous-farm/scenario-desk/', hash: '#case-leak', items: '[data-find-item]', index: 4},
  {path: '/lab/ai-software-factory/scenarios/', hash: '#case-stale', items: '[data-find-item]', index: 4},
];

for (const {path, hash, items, index} of delayedInitialLinks) {
  for (const viewport of [{width: 1280, height: 900}, phone]) {
    for (const reading of ['keyboard summary', 'pointer text']) {
      test(`${path} old initial fragment does not take over ${reading} reading at ${viewport.width}px`, options, async () => {
        await withPage(browser, site, {viewport}, async page => {
          const held = await holdModule(page, site.origin);
          try {
            await page.goto(site.origin + path + hash, {waitUntil: 'commit'});
            await layoutReady(page);
            assert.equal(await page.locator(hash).count(), 1, 'the published initial fragment still has one target');
            const summary = page.locator(items).nth(index).locator('summary').first();
            const details = summary.locator('..');
            let anchor = summary;
            if (reading === 'keyboard summary') {
              await activate(summary);
              await assertFocusVisible(summary, 'reader reaches a later native explanation by keyboard');
            } else {
              await summary.click();
              anchor = details.locator('p').first();
              await anchor.click();
            }
            const top = await anchor.evaluate(element => element.getBoundingClientRect().top);
            held.release();
            await page.waitForLoadState('load');
            // Observe native fragment completion without setting focus,
            // scrolling the page or inserting a fixed delay.
            await page.waitForFunction(({items, index, reading, top}) => {
              const summary = document.querySelectorAll(items)[index]?.querySelector('summary');
              const anchor = reading === 'keyboard summary' ? summary : summary.closest('details').querySelector('p');
              return (reading !== 'keyboard summary' || summary === document.activeElement) && Math.abs(anchor.getBoundingClientRect().top - top) <= 2;
            }, {items, index, reading, top});
            await inViewport(anchor);
            if (reading === 'keyboard summary') await assertFocusVisible(summary, 'the same summary retains visible keyboard focus');
            assert.equal(await details.evaluate(element => element.open), true, 'the explanation stays open');
            assert.equal(new URL(page.url()).hash, hash, 'preserving reading does not rewrite the shared URL');
            assert.equal(await page.locator(hash).count(), 1, 'the initial target remains available');
          } finally { await held.close(); }
        });
      });
    }
  }
}

for (const {path, items, index} of delayedInitialLinks) {
  for (const viewport of [{width: 1280, height: 900}, phone]) {
    for (const navigation of ['header click', 'scroll only']) {
      test(`${path} late enhancement respects a ${navigation} return to the header at ${viewport.width}px`, options, async () => {
        await withPage(browser, site, {viewport}, async page => {
          const held = await holdModule(page, site.origin);
          try {
            await page.goto(site.origin + path, {waitUntil: 'commit'});
            await layoutReady(page);
            const summary = page.locator(items).nth(index).locator('summary').first();
            await activate(summary);
            await page.mouse.move(viewport.width / 2, 100);
            await page.mouse.wheel(0, -100000);
            await page.waitForFunction(() => scrollY === 0);
            if (navigation === 'header click') await page.locator('header.site-header').click({position: {x: 4, y: 4}});
            else assert.equal(await summary.evaluate(element => document.activeElement === element && element.getBoundingClientRect().top > innerHeight), true, 'old keyboard focus remains below the viewport after scrolling away');
            const before = await page.evaluate(() => scrollY);
            assert.equal(before, 0, 'the reader deliberately returned to the header');
            held.release();
            await page.waitForLoadState('load');
            await ready(page, items === '[data-scene]' ? '[data-lab-journey]' : '[data-topic-finder]');
            assert.equal(await page.evaluate(() => scrollY), before, 'an old offscreen explanation does not pull the reader back');
            assert.equal(await summary.evaluate(element => element.closest('details').open), true, 'the earlier explanation remains open');
          } finally { await held.close(); }
        });
      });
    }
  }
}

for (const {path, hash, index} of delayedInitialLinks.filter(link => link.items === '[data-scene]')) {
  test(`${path} late enhancement preserves near-top text inside an open explanation`, options, async () => {
    await withPage(browser, site, {viewport: phone}, async page => {
      const held = await holdModule(page, site.origin);
      try {
        await page.goto(site.origin + path + hash, {waitUntil: 'commit'});
        await layoutReady(page);
        const details = page.locator('[data-scene]').nth(index).locator('details').first();
        const summary = details.locator('summary');
        await activate(summary);
        const passage = details.locator('p').last();
        const delta = await passage.evaluate(element => element.getBoundingClientRect().top - 140);
        await page.mouse.move(phone.width / 2, 100);
        await page.mouse.wheel(0, delta);
        await page.waitForFunction(index => {
          const details = document.querySelectorAll('[data-scene]')[index].querySelector('details');
          const top = [...details.querySelectorAll('p')].at(-1).getBoundingClientRect().top;
          return top >= 120 && top <= 160 && details.getBoundingClientRect().bottom < innerHeight / 2;
        }, index);
        assert.equal(await summary.evaluate(element => document.activeElement === element && element.getBoundingClientRect().bottom < 0), true, 'summary focus remains offscreen while the reader scrolls through its explanation');
        const top = await passage.evaluate(element => element.getBoundingClientRect().top);
        held.release();
        await page.waitForLoadState('load');
        await page.waitForFunction(({index, top}) => {
          const details = document.querySelectorAll('[data-scene]')[index].querySelector('details');
          return Math.abs([...details.querySelectorAll('p')].at(-1).getBoundingClientRect().top - top) <= 2;
        }, {index, top});
        await inViewport(passage);
        assert.equal(await details.evaluate(element => element.open), true, 'the text remains in its open explanation');
      } finally { await held.close(); }
    });
  });
}

async function activate(link) {
  await link.focus();
  await link.press('Enter');
}

async function assertOnlyScene(page, scene) {
  await scene.waitFor({state: 'visible'});
  assert.equal(await page.locator('[data-scene]:visible').count(), 1, 'exactly the selected situation is visible');
}

for (const path of workspaces) {
  for (const viewport of [{width: 1280, height: 900}, phone]) {
    test(`${path} delayed module preserves a later explanation at ${viewport.width}px`, options, async () => {
      await withPage(browser, site, {viewport}, async page => {
        const held = await holdModule(page, site.origin);
        try {
          await Promise.all([
            page.waitForRequest(request => isModule(request.url())),
            page.goto(site.origin + path, {waitUntil: 'commit'}),
          ]);
          await layoutReady(page);
          const root = page.locator('[data-lab-journey]');
          assert.notEqual(await root.getAttribute('data-enhanced'), 'true', 'module is still held');
          const scene = page.locator('[data-scene]').nth(2);
          const summary = scene.locator('summary').first();
          await summary.scrollIntoViewIfNeeded();
          await activate(summary);
          const top = await summary.evaluate(element => element.getBoundingClientRect().top);
          assert.equal(await scene.locator('details').first().getAttribute('open'), '', 'reader opened a later static explanation');
          await assertFocusVisible(summary, 'static explanation has visible keyboard focus before enhancement');
          held.release();
          await ready(page);
          assert.equal(await root.getAttribute('data-reading'), 'all', 'late enhancement retains the reading view');
          assert.equal(await scene.isVisible(), true, 'the situation being read remains visible');
          assert.equal(await scene.locator('details').first().getAttribute('open'), '', 'the disclosure remains open');
          await assertFocusVisible(summary, 'enhancement preserves focus on the same visible summary');
          const afterTop = await summary.evaluate(element => element.getBoundingClientRect().top);
          assert.ok(Math.abs(afterTop - top) <= 2, `reading anchor stays within 2 CSS pixels (${top} -> ${afterTop})`);
        } finally {
          await held.close(); // Release even when an assertion or readiness check fails.
        }
      });
    });
  }

  test(`${path} Next then Back restores the bare URL and visible focus`, options, async () => {
    await withPage(browser, site, {}, async page => {
      await page.goto(site.origin + path);
      await ready(page);
      const scenes = page.locator('[data-scene]');
      assert.equal(new URL(page.url()).hash, '', 'start at the genuinely bare URL');
      await activate(scenes.first().locator('[data-direction="next"]'));
      await assertOnlyScene(page, scenes.nth(1));
      await assertFocusVisible(scenes.nth(1).locator('h2'), 'Next focuses the second situation heading');
      await page.goBack({waitUntil: 'commit'});
      await page.waitForURL(url => url.hash === '');
      await assertOnlyScene(page, scenes.first());
      await assertFocusVisible(scenes.first().locator('h2'), 'Back repairs focus hidden with the second situation');
    });
  });

  test(`${path} leaving mobile read-all repairs CSS-hidden navigation focus`, options, async () => {
    await withPage(browser, site, {viewport: phone}, async page => {
      await page.goto(site.origin + path);
      await ready(page);
      await activate(page.locator('.journey-tools a[href="#read-all"]'));
      const nav = page.locator('.journey-progress');
      await nav.waitFor({state: 'visible'});
      const link = nav.locator('a').nth(2);
      // Leave keyboard focus on this link while Back hides its ancestor using
      // CSS, not [hidden]. The destination heading must receive visible focus.
      await link.focus();
      await assertFocusVisible(link, 'mobile read-all navigation starts focused and visible');
      await page.goBack({waitUntil: 'commit'});
      await page.waitForURL(url => url.hash === '');
      await nav.waitFor({state: 'hidden'});
      assert.equal(await nav.evaluate(element => element.hidden), false, 'navigation is hidden by CSS, not a hidden attribute');
      await assertOnlyScene(page, page.locator('[data-scene]').first());
      await assertFocusVisible(page.locator('[data-scene]').first().locator('h2'), 'Back repairs focus inside CSS-hidden navigation');
    });
  });

  test(`${path} engineering-note return preserves exact changed conditions and explanation`, options, async () => {
    await withPage(browser, site, {}, async page => {
      await page.goto(site.origin + path);
      await ready(page);
      const scene = page.locator('[data-scene]').first();
      const controls = scene.locator('[data-model-input]');
      // Pick a real noninitial state from the existing table. A changed input
      // need not change its label: no independent model policy is asserted here.
      const chosen = await scene.evaluate(element => {
        const table = JSON.parse(element.dataset.model);
        const key = Object.keys(table).find(key => key !== element.dataset.initial);
        return {key, expected: table[key]};
      });
      assert.ok(chosen.key, 'the first situation offers a changed condition');
      for (let index = 0; index < chosen.key.length; index++) await controls.nth(index).selectOption(chosen.key[index]);
      await activate(scene.locator('summary').first());
      const before = await sceneSnapshot(scene);
      assert.equal(before.controls.join(''), chosen.key, 'selected controls match the requested state');
      assert.equal(before.state, chosen.key, 'rendered state matches the controls');
      assert.equal(before.response, chosen.expected.decision, 'decision comes from the existing outcome table');
      assert.equal(before.label, chosen.expected.label, 'response label matches the existing outcome table');
      assert.deepEqual(before.reasons, chosen.expected.reasons, 'reasons match the selected table entry');
      const hash = new URL(page.url()).hash;
      assert.equal(hash, `#scene-${before.key}~v1-${chosen.key}`, 'exact conditions are represented in the URL');
      await activate(scene.locator('[data-workspace-note]'));
      await ready(page, '[data-topic-finder]');
      const notesURL = new URL(page.url());
      assert.equal(notesURL.searchParams.get('scene'), before.key, 'notes retain the situation context');
      assert.equal(notesURL.searchParams.get('conditions'), `v1-${chosen.key}`, 'notes retain the exact condition token');
      const back = page.locator('[data-story-return]').first();
      assert.match(await back.textContent(), /^Return to: /, 'notes expose a contextual return');
      await activate(back);
      await ready(page);
      assert.equal(new URL(page.url()).hash, hash, 'return restores the exact versioned fragment');
      assert.equal(new URL(page.url()).searchParams.get('explain'), before.key, 'return requests the same explanation');
      await assertOnlyScene(page, scene);
      assert.deepEqual(await sceneSnapshot(scene), before, 'controls, response, reasons, trace and open explanation survive the round trip');
    });
  });

  for (const mode of ['disabled JavaScript', 'failed module']) {
    test(`${path} ${mode} retains five explicit starting examples for a changed shared link`, options, async () => {
      await withPage(browser, site, {javaScriptEnabled: mode !== 'disabled JavaScript'}, async page => {
        if (mode === 'failed module') await page.route(url => url.origin === site.origin && isModule(url.href), route => route.abort('failed'));
        // Read the actual static model to form a valid noninitial shared link.
        await page.goto(site.origin + path);
        const shared = await page.locator('[data-scene]').nth(1).evaluate(element => ({
          scene: element.dataset.key,
          key: Object.keys(JSON.parse(element.dataset.model)).find(key => key !== element.dataset.initial),
        }));
        assert.ok(shared.key, 'fallback is tested with valid changed conditions, not a malformed token');
        await page.goto(`${site.origin}${path}#scene-${shared.scene}~v1-${shared.key}`);
        await layoutReady(page);
        assert.notEqual(await page.locator('[data-lab-journey]').getAttribute('data-enhanced'), 'true', 'fallback remains unenhanced');
        assert.equal(await page.locator('[data-scene]:visible').count(), 5, 'all five starting examples remain readable');
        const context = page.locator('[data-static-context]');
        assert.equal(await context.isVisible(), true, 'shared-link fallback explanation is visible');
        assert.match(await context.textContent(), /five starting examples.*changed conditions in a shared link are not shown here/s, 'fallback explicitly distinguishes starting conditions from shared changes');
        for (const scene of await page.locator('[data-scene]').all()) {
          const actual = await scene.evaluate(element => ({
            expected: JSON.parse(element.dataset.model)[element.dataset.initial],
            label: element.querySelector('[data-response-label]').textContent,
            reasons: [...element.querySelectorAll('[data-reason]')].filter(line => !line.hidden).map(line => line.textContent),
          }));
          assert.equal(actual.label, actual.expected.label, 'static response matches its starting table entry');
          assert.deepEqual(actual.reasons, actual.expected.reasons, 'static reasons match the starting conditions');
          assert.equal(await scene.locator('[data-static-answer]').isVisible(), true, 'starting assumptions are visible');
          assert.equal(await scene.locator('[data-model-input]').first().isVisible(), false, 'inactive model controls are hidden');
        }
        const summary = page.locator('[data-scene]').nth(1).locator('summary').first();
        await activate(summary);
        assert.equal(await page.locator('[data-scene]').nth(1).locator('details').first().getAttribute('open'), '', 'native explanation still opens without the module');
      });
    });
  }

  test(`${path} last situation opens the next-step hub and Back restores it`, options, async () => {
    await withPage(browser, site, {}, async page => {
      await page.goto(site.origin + path);
      await ready(page);
      const last = page.locator('[data-scene]').last();
      const key = await last.getAttribute('data-key');
      await activate(page.locator(`.journey-progress a[href="#scene-${key}"]`));
      await assertOnlyScene(page, last);
      await activate(last.locator('[data-complete]'));
      const hub = page.locator('#story-complete');
      await hub.waitFor({state: 'visible'});
      assert.equal(new URL(page.url()).hash, '#story-complete', 'the next-step hub has its own history entry');
      assert.equal(await page.locator('[data-scene]:visible').count(), 0, 'hub replaces the situations');
      await assertFocusVisible(hub, 'completion hub receives visible keyboard focus');
      assert.equal(await hub.locator('.experience-next-links a:visible').count(), 3, 'next-step destinations are available');
      await page.goBack({waitUntil: 'commit'});
      await page.waitForURL(url => url.hash === `#scene-${key}`);
      await assertOnlyScene(page, last);
      assert.equal(await hub.isVisible(), false, 'Back hides the completion hub');
      await assertFocusVisible(last.locator('h2'), 'Back restores visible focus in the last situation');
    });
  });
}

const finders = [
  {path: '/lab/autonomous-farm/scenario-desk/', library: true},
  {path: '/lab/ai-software-factory/scenarios/', library: true},
  {path: '/lab/autonomous-farm/blueprint/', library: false},
  {path: '/lab/ai-software-factory/engineering-notes/', library: false},
];
for (const {path, library} of finders) {
  test(`${path} empty search, keyboard Clear and filtered deep-link recovery`, options, async () => {
    await withPage(browser, site, {viewport: phone}, async page => {
      await page.goto(site.origin + path);
      await ready(page, '[data-topic-finder]');
      const finder = page.locator('[data-topic-finder]');
      const input = finder.locator('input[type="search"]');
      const items = finder.locator('[data-find-item]');
      const count = await items.count();
      const initialStatus = await finder.locator('[data-find-status]').textContent();
      assert.ok(count > 1, 'finder contains a useful collection');
      await input.fill('zzzz-no-such-fidret-example');
      await finder.locator('[data-find-empty]').waitFor({state: 'visible'});
      assert.equal(await finder.locator('[data-find-item]:visible').count(), 0, 'unmatched search hides every indexed item');
      assert.match(await finder.locator('[data-find-status]').textContent(), /^0 .* shown$/, 'empty count is explicit');
      await input.press('Tab');
      const clear = finder.getByRole('button', {name: 'Clear', exact: true});
      await assertFocusVisible(clear, 'Clear is the next visible keyboard control after search');
      await clear.press('Enter');
      assert.equal(await input.inputValue(), '', 'keyboard Clear empties search');
      await assertFocusVisible(input, 'Clear returns visible focus to the search field');
      assert.equal(await finder.locator('[data-find-item]:visible').count(), count, 'Clear restores every indexed item');
      assert.equal(await finder.locator('[data-find-status]').textContent(), initialStatus, 'Clear restores the original count');
      assert.equal(await finder.locator('[data-find-empty]').isVisible(), false, 'empty message is removed');

      const item = items.last();
      const hash = library ? `#${await item.getAttribute('id')}` : await item.locator('a').getAttribute('href');
      // Farm libraries also have category filters. Exercise a category that
      // excludes the linked item, so hash recovery must reset both filters.
      if (library) {
        const group = await item.getAttribute('data-group');
        const other = finder.locator(`[data-filter]:not([data-filter="all"]):not([data-filter="${group}"])`).first();
        if (await other.count()) await activate(other);
      }
      await input.fill('zzzz-no-such-fidret-example');
      assert.equal(await item.isVisible(), false, 'the deep-link index entry is currently filtered out');
      // Same-document navigation fires the browser's real hashchange; it must
      // not reset the page/context and accidentally erase the filter first.
      await page.goto(site.origin + path + hash, {waitUntil: 'commit'});
      const target = page.locator(hash);
      await target.waitFor({state: 'visible'});
      if (library) {
        await page.waitForFunction(id => document.getElementById(id)?.open, hash.slice(1));
        assert.equal(await input.inputValue(), '', 'situation deep link clears the conflicting search');
        assert.equal(await finder.locator('[data-filter="all"]').getAttribute('aria-pressed'), 'true', 'situation deep link resets category');
        assert.equal(await finder.locator('[data-find-item]:visible').count(), count, 'situation deep link restores the collection');
        // Opening happens before deferred focus repairs native scroll restoration.
        await page.waitForFunction(id => document.activeElement === document.getElementById(id)?.querySelector('summary'), hash.slice(1));
        await assertFocusVisible(target.locator('summary'), 'the requested situation receives visible keyboard focus');
      } else {
        // Engineering notes filter only the index, never the actual prose.
        assert.equal(await input.inputValue(), 'zzzz-no-such-fidret-example', 'same-document navigation retains the active index filter');
        await page.waitForFunction(id => {
          const box = document.getElementById(id).getBoundingClientRect();
          return box.top >= -1 && box.top < innerHeight;
        }, hash.slice(1));
        assert.equal(await target.evaluate(element => {
          const box = element.getBoundingClientRect();
          return box.top >= -1 && box.top < innerHeight;
        }), true, 'filtered engineering topic remains reachable at its anchor');
      }
      assert.equal(new URL(page.url()).hash, hash, 'the requested deep link is retained');
    });
  });
}


// These were actual href destinations before the guided workspace migration.
// Keep a useful native onward link, even when the module is absent or late.
for (const path of workspaces) {
  const destinations = [
    ['piece-resources', `${path}sources/#references-title`],
    ['resources-title', `${path}sources/#references-title`],
    ...(path.includes('software-factory') ? [
      ['factory-journey', `${path}engineering-notes/#lifecycle`],
      ['factory-handoffs', `${path}engineering-notes/#lifecycle`],
      ['factory-release', `${path}scenarios/`],
    ] : []),
  ];
  for (const mode of ['enhanced', 'no JavaScript', 'delayed module']) {
    test(`${path} former article links remain useful with ${mode}`, options, async () => {
      await withPage(browser, site, {viewport: phone, javaScriptEnabled: mode !== 'no JavaScript'}, async page => {
        for (const [id, destination] of destinations) {
          const held = mode === 'delayed module' ? await holdModule(page, site.origin) : null;
          try {
            await page.goto(`${site.origin}${path}#${id}`, {waitUntil: held ? 'commit' : 'load'});
            await layoutReady(page);
            const target = page.locator(`#${id}`);
            assert.equal(await target.count(), 1, 'the old destination exists in initial HTML');
            // The browser applies an initial :target after deferred modules
            // finish, so release before expecting its native fragment scroll.
            held?.release();
            if (mode !== 'no JavaScript') await ready(page);
            await target.waitFor({state: 'visible'});
            await inViewport(page.locator(`#${id}:focus`));
            // Native fragment navigation should make this the next tab stop.
            await page.keyboard.press('Tab');
            const link = target.locator('a');
            assert.equal(await link.getAttribute('href'), destination);
            await assertFocusVisible(link, 'old fragment leads to a visible keyboard-operable onward link');
            await link.press('Enter');
            await page.waitForURL(site.origin + destination);
            await layoutReady(page);
            const fragment = new URL(page.url()).hash;
            if (fragment) await inViewport(page.locator(fragment));
            else await page.locator('.reference-situation').first().waitFor({state: 'visible'});
          } finally { await held?.close(); }
        }
      });
    });
  }
}

for (const javaScriptEnabled of [true, false]) {
  test(`farm plan has a visible native keyboard path with JavaScript ${javaScriptEnabled}`, options, async () => {
    await withPage(browser, site, {viewport: {width: 320, height: 844}, javaScriptEnabled}, async page => {
      await page.goto(`${site.origin}/lab/autonomous-farm/blueprint/`);
      if (javaScriptEnabled) await ready(page, '[data-topic-finder]');
      else await layoutReady(page);
      const region = page.locator('.farm-map-scroll');
      const links = page.locator('.farm-map-links a');
      assert.equal(await links.count(), 6);
      // Start at the named diagram scroll region, then use native sequential
      // navigation without scrolling or focusing the expected destinations.
      await region.focus();
      for (let index = 0; index < 6; index++) {
        await page.keyboard.press('Tab');
        await assertFocusVisible(links.nth(index), 'each diagram destination has visible HTML-link focus');
      }
      for (let index = 4; index >= 0; index--) {
        await page.keyboard.press('Shift+Tab');
        await assertFocusVisible(links.nth(index), 'reverse navigation follows the same visible links');
      }
      await page.keyboard.press('Shift+Tab');
      await assertFocusVisible(region, 'reverse navigation returns to the keyboard-scrollable plan');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForURL(`${site.origin}/lab/autonomous-farm/blueprint/#water`);
      await inViewport(page.locator('#water'));
    });
  });

  test(`former farm scenario selector is a native collection anchor with JavaScript ${javaScriptEnabled}`, options, async () => {
    await withPage(browser, site, {viewport: phone, javaScriptEnabled}, async page => {
      await page.goto(`${site.origin}/lab/autonomous-farm/scenario-desk/#scenario-selector`);
      if (javaScriptEnabled) await ready(page, '[data-topic-finder]');
      else await layoutReady(page);
      // Native fragment focus can finish after load while smooth scrolling.
      await inViewport(page.locator('#scenario-selector:focus'));
      await page.keyboard.press('Tab');
      const first = page.locator('#scenario-selector .reference-situation').first();
      await assertFocusVisible(first.locator('summary'), 'old selector link reaches the first situation by keyboard');
      await first.locator('summary').press('Enter');
      assert.equal(await first.getAttribute('open'), '', 'native situation remains openable');
    });
  });
}
