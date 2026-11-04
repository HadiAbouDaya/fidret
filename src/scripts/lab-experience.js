/** Local reading enhancement. No network, storage, dynamic HTML or model execution. */
export function normalizeQuery(value) {
  return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}
export function parseJourneyHash(hash, keys) {
  let value;
  try { value = decodeURIComponent(hash.replace(/^#/, '')); } catch { value = ''; }
  if (value === 'read-all') return {all: true, key: keys[0]};
  return {all: false, key: keys.find(key => value === `scene-${key}`) || keys[0]};
}

function enhanceJourney(root) {
  const scenes = [...root.querySelectorAll('[data-scene]')];
  const keys = scenes.map(scene => scene.dataset.key);
  if (!scenes.length || scenes.some(scene => !scene.querySelector('h2') || !scene.querySelector('[data-result]'))) return;
  const navigation = [...root.querySelectorAll('.journey-progress a')];
  let printing = false;
  const render = (hash, focus = false) => {
    root.querySelector('#story-complete').hidden = hash !== '#story-complete' && hash !== '#read-all';
    if (hash === '#story-complete') {
      scenes.forEach(scene => { scene.hidden = true; });
      navigation.forEach(link => link.removeAttribute('aria-current'));
      root.dataset.reading = 'complete';
      if (focus) { const end = root.querySelector('#story-complete'); end.focus({preventScroll:true}); end.scrollIntoView({block:'start',behavior:'instant'}); }
      return;
    }
    const state = parseJourneyHash(hash, keys);
    root.dataset.reading = state.all ? 'all' : 'scene';
    scenes.forEach(scene => { scene.hidden = !state.all && scene.dataset.key !== state.key; });
    navigation.forEach(link => {
      if (!state.all && link.hash === `#scene-${state.key}`) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    });
    if (focus) {
      const target = state.all ? root.querySelector('#read-all') : scenes.find(scene => scene.dataset.key === state.key).querySelector('h2');
      if (target instanceof HTMLElement) {
        if (state.all) target.tabIndex = -1;
        target.focus({preventScroll: true});
        (target.closest('[data-scene]') || target).scrollIntoView({block: 'start', behavior: 'instant'});
      }
    }
  };
  const updateDiagram = (scene, changed) => {
    scene.querySelectorAll('[data-signal-value]').forEach(value => { value.textContent = changed ? value.dataset.changed : value.dataset.original; });
    scene.querySelector('[data-scene-caption]').textContent = changed ? 'The changed condition' : 'The starting evidence';
    const relation = scene.querySelector('[data-proof-relation]');
    const symbol = scene.querySelector('[data-proof-symbol]');
    if (relation) relation.textContent = changed ? 'Matches' : relation.dataset.original;
    if (symbol) symbol.textContent = changed ? '=' : symbol.dataset.original;
  };
  const resetComparison = scene => {
    scene.dataset.comparing = 'false';
    updateDiagram(scene, false);
    scene.querySelector('[data-compare]').setAttribute('aria-pressed', 'false');
    scene.querySelector('[data-compare]').textContent = 'Try the changed condition';
    scene.querySelector('[data-comparison]').hidden = true;
    scene.querySelector('[data-changed-caption]').hidden = true;
    scene.querySelector('[data-response-label]').textContent = scene.dataset.primaryLabel;
    const proof = scene.querySelector('[data-proof-value]');
    if (proof) proof.textContent = proof.dataset.original;
  };
  const reveal = (scene, button) => {
    resetComparison(scene);
    scene.querySelectorAll('[data-choice]').forEach(choice => choice.setAttribute('aria-pressed', String(choice === button)));
    scene.querySelector('[data-result]').hidden = false;
    scene.querySelector('[data-quick-result]').hidden = false;
    scene.querySelector('[data-visual-result]').hidden = false;
    scene.dataset.answered = 'true';
    scene.dataset.response = scene.dataset.primary;
    scene.querySelector('[data-live]').textContent = button?.dataset.feedback || `Illustrated response: ${scene.dataset.primaryLabel}.`;
    root.querySelector('[data-announce]').textContent = scene.querySelector('[data-live]').textContent;
  };
  root.addEventListener('click', event => {
    if (root.dataset.enhanced !== 'true') return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    const link = target.closest('a[href^="#scene-"],a[href="#read-all"]');
    if (link && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) {
      event.preventDefault();
      if (location.hash !== link.hash) history.pushState(null, '', link.hash);
      render(link.hash, true);
      return;
    }
    const scene = target.closest('[data-scene]');
    const button = target.closest('button');
    if (!button) return;
    if (button.hasAttribute('data-choice') && scene) reveal(scene, button);
    if (button.hasAttribute('data-reveal') && scene) reveal(scene, null);
    if (button.hasAttribute('data-compare') && scene) {
      const changed = button.getAttribute('aria-pressed') !== 'true';
      button.setAttribute('aria-pressed', String(changed));
      button.textContent = changed ? 'Return to the original condition' : 'Try the changed condition';
      scene.dataset.comparing = String(changed);
      updateDiagram(scene, changed);
      scene.dataset.response = changed ? scene.dataset.alternate : scene.dataset.primary;
      scene.querySelector('[data-comparison]').hidden = !changed;
      scene.querySelector('[data-changed-caption]').hidden = !changed;
      scene.querySelector('[data-response-label]').textContent = changed ? scene.dataset.alternateLabel : scene.dataset.primaryLabel;
      const proof = scene.querySelector('[data-proof-value]');
      if (proof) proof.textContent = changed ? proof.dataset.changed : proof.dataset.original;
      scene.querySelector('[data-live]').textContent = `${changed ? 'Comparing a changed condition' : 'Original condition'}: ${changed ? scene.dataset.alternateLabel : scene.dataset.primaryLabel}.`;
      root.querySelector('[data-announce]').textContent = scene.querySelector('[data-live]').textContent;
    }
    if (button.hasAttribute('data-reset')) {
      scenes.forEach(item => {
        resetComparison(item);
        item.querySelectorAll('details').forEach(detail => { detail.open = false; });
        item.querySelectorAll('[data-choice]').forEach(choice => choice.setAttribute('aria-pressed', 'false'));
        item.querySelector('[data-result]').hidden = true;
        item.querySelector('[data-quick-result]').hidden = true;
        item.querySelector('[data-visual-result]').hidden = true;
        item.querySelector('[data-live]').textContent = '';
        delete item.dataset.answered;
        delete item.dataset.response;
      });
      root.querySelector('[data-announce]').textContent = '';
      const target = new URL(location.href);
      target.searchParams.delete('explain');
      const hash = `#scene-${keys[0]}`;
      target.hash = hash;
      history.pushState(null, '', target);
      render(hash, true);
    }
  });
  const syncLocation = () => {
    if (printing || root.dataset.enhanced !== 'true') return;
    const hash = location.hash;
    if (hash === '#read-all' || hash === '#story-complete' || keys.some(key => hash === `#scene-${key}`)) render(hash, true);
    else if (!hash) render('', false);
  };
  window.addEventListener('hashchange', syncLocation);
  window.addEventListener('popstate', syncLocation);
  window.addEventListener('beforeprint', () => { printing = true; scenes.forEach(scene => { scene.hidden = false; }); });
  window.addEventListener('afterprint', () => { printing = false; if (root.dataset.enhanced === 'true') render(location.hash); });
  render(location.hash);
  root.querySelectorAll('[data-only-enhanced]').forEach(control => { control.hidden = false; });
  root.querySelectorAll('[data-static-answer]').forEach(answer => { answer.hidden = true; });
  root.dataset.enhanced = 'true';
  if (location.hash.startsWith('#scene-')) render(location.hash, true);
  const explanation = new URLSearchParams(location.search).get('explain');
  const active = scenes.find(scene => !scene.hidden && scene.dataset.key === explanation);
  if (active) reveal(active, null);
}

function enhanceFinder(root) {
  const input = root.querySelector('input[type="search"]');
  const items = [...root.querySelectorAll('[data-find-item]')];
  const status = root.querySelector('[data-find-status]');
  const empty = root.querySelector('[data-find-empty]');
  if (!input || !items.length || !status) return;
  const filters = [...root.querySelectorAll('[data-filter]')];
  const index = new Map(items.map(item => [item, normalizeQuery(item.dataset.findText || item.textContent)]));
  let group = 'all';
  const apply = () => {
    const words = normalizeQuery(input.value).split(/\s+/).filter(Boolean);
    let count = 0;
    items.forEach(item => {
      const visible = (group === 'all' || item.dataset.group === group) && words.every(word => index.get(item).includes(word));
      item.hidden = !visible;
      if (visible) count++;
    });
    filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter.dataset.filter === group)));
    const noun = root.dataset.findNoun || 'topics';
    status.textContent = `${count} ${count === 1 ? noun.replace(/s$/, '') : noun} shown`;
    root.querySelectorAll('[data-find-group]').forEach(section => { section.hidden = ![...section.querySelectorAll('[data-find-item]')].some(item => !item.hidden); });
    if (empty) empty.hidden = count !== 0;
  };
  const followHash = () => {
    let key;
    try { key = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const item = items.find(item => item.id === key);
    if (!item) return;
    input.value = ''; group = 'all'; apply();
    if (item instanceof HTMLDetailsElement) item.open = true;
  };
  input.addEventListener('input', apply);
  root.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;
    const filter = event.target.closest('[data-filter]');
    if (filter) { group = filter.dataset.filter; apply(); }
    if (event.target.closest('[data-clear]')) { input.value = ''; group = 'all'; apply(); input.focus(); }
  });
  window.addEventListener('hashchange', () => { if (root.dataset.enhanced === 'true') followHash(); });
  const printedDetails = new Map();
  window.addEventListener('beforeprint', () => { items.forEach(item => { if (item instanceof HTMLDetailsElement) { printedDetails.set(item, item.open); item.open = true; } }); });
  window.addEventListener('afterprint', () => { printedDetails.forEach((open, item) => { item.open = open; }); printedDetails.clear(); });
  root.querySelectorAll('[data-only-enhanced]').forEach(control => { control.hidden = false; });
  apply(); followHash();
  root.dataset.enhanced = 'true';
}

if (typeof document !== 'undefined') {
  const scene = new URLSearchParams(location.search).get('scene');
  if (scene) document.querySelectorAll('[data-story-return]').forEach(link => {
    const keys = link.dataset.returnScenes.split(' ');
    const index = keys.indexOf(scene);
    if (index < 0) return;
    const labels = link.dataset.returnLabels.split('|');
    const target = new URL(link.href);
    target.hash = `scene-${scene}`;
    target.searchParams.set('explain', scene);
    link.href = target.href;
    link.textContent = `Return to: ${labels[index]}`;
  });
  for (const root of document.querySelectorAll('[data-lab-journey]')) {
    try { enhanceJourney(root); } catch {
      root.querySelectorAll('[data-scene],[data-static-answer]').forEach(node => { node.hidden = false; });
      root.querySelectorAll('[data-only-enhanced],[data-result],[data-visual-result],[data-quick-result]').forEach(node => { node.hidden = true; });
      const completion = root.querySelector('#story-complete');
      if (completion) completion.hidden = false;
      delete root.dataset.reading;
      delete root.dataset.enhanced;
    }
  }
  for (const root of document.querySelectorAll('[data-topic-finder]')) {
    try { enhanceFinder(root); } catch {
      root.querySelectorAll('[data-find-item],[data-find-group]').forEach(item => { item.hidden = false; });
      root.querySelectorAll('[data-only-enhanced],[data-find-empty]').forEach(item => { item.hidden = true; });
      delete root.dataset.enhanced;
    }
  }
}
