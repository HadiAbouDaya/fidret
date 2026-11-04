/** Local model lookup and reading controls. No network or persistent state. */
export function normalizeQuery(value) {
  return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}
export function parseJourneyHash(hash, keys) {
  let value;
  try { value = decodeURIComponent(hash.replace(/^#/, '')).split('~')[0]; } catch { value = ''; }
  if (value === 'read-all') return {all:true,key:keys[0]};
  return {all:false,key:keys.find(key => value === `scene-${key}`) || keys[0]};
}
export function parseWorkspaceToken(hash) {
  const match = /^#scene-[a-z][a-z0-9-]*~v1-([0-9]{2,3})$/.exec(hash);
  return match ? match[1] : null;
}
const traceLabels = {clear:'Established',blocked:'Unresolved',priority:'Priority response',deferred:'Not evaluated here'};
function renderWorkspace(scene, table, key) {
  const state = table[key];
  if (!Object.hasOwn(table, key) || !state) throw new Error('Unknown model state');
  const controls = [...scene.querySelectorAll('[data-model-input]')];
  controls.forEach((control,i) => {
    control.value = key[i];
    control.closest('label').dataset.modified = String(key[i] !== scene.dataset.initial[i]);
    scene.querySelectorAll('[data-static-answer] dd')[i].textContent = control.selectedOptions[0].textContent;
  });
  scene.dataset.state = key;
  scene.dataset.response = state.decision;
  scene.dataset.cloud = state.values.cloud || '';
  scene.querySelectorAll('[data-artifact-node]').forEach(node => {node.dataset.deciding=String(node.dataset.artifactNode===state.values.focus);});
  scene.querySelector('[data-response-label]').textContent = state.label;
  scene.querySelectorAll('[data-reason]').forEach((line,i) => { line.hidden = i >= state.reasons.length; line.textContent = state.reasons[i] || ''; });
  scene.querySelectorAll('[data-artifact-value]').forEach(value => { value.textContent = state.values[value.dataset.artifactValue]; });
  scene.querySelectorAll('[data-match-symbol]').forEach(value => { value.textContent = state.values.proof === state.values.candidate ? '=' : '≠'; });
  scene.querySelectorAll('[data-trace-status]').forEach((line,i) => {
    line.dataset.traceStatus = state.trace[i].status;
    line.querySelector('[data-trace-value]').textContent = state.trace[i].value;
    line.querySelector('[data-trace-label]').textContent = traceLabels[state.trace[i].status];
  });
  const changed = key !== scene.dataset.initial;
  scene.querySelector('[data-custom]').hidden = !changed;
  scene.querySelector('[data-baseline]').hidden = !changed;
  scene.querySelector('[data-priority-note]').hidden = !['protect','reconcile','recorded','contain'].includes(state.decision);
  const fragment = `#scene-${scene.dataset.key}~v1-${key}`;
  scene.querySelector('[data-share]').href = fragment;
  scene.querySelector('[data-state-description]').textContent = changed ? 'These settings are included in the link.' : 'Starting conditions';
  const note = scene.querySelector('[data-workspace-note]');
  const target = new URL(note.href);
  target.searchParams.set('conditions', `v1-${key}`);
  note.href = target.href;
  return state;
}
function enhanceJourney(root) {
  const scenes = [...root.querySelectorAll('[data-scene]')];
  const keys = scenes.map(scene => scene.dataset.key);
  const tables = new Map(scenes.map(scene => {
    const table = JSON.parse(scene.dataset.model);
    const controls = [...scene.querySelectorAll('[data-model-input]')];
    if (!scene.querySelector('h2') || !Object.hasOwn(table,scene.dataset.initial) || Object.keys(table).length !== controls.reduce((n,c) => n*c.options.length,1)) throw new Error('Incomplete model');
    for (const [key,state] of Object.entries(table)) {
      if (key.length !== controls.length || controls.some((c,i) => ![...c.options].some(o => o.value === key[i])) || !Array.isArray(state.reasons) || state.reasons.length > 10 || state.trace.length !== 4) throw new Error('Invalid model');
    }
    return [scene,table];
  }));
  const navigation = [...root.querySelectorAll('.journey-progress a')];
  let printing = false;
  const render = (hash, focus = false) => {
    const complete = hash === '#story-complete';
    root.querySelector('#story-complete').hidden = !complete && hash !== '#read-all';
    const state = parseJourneyHash(hash,keys);
    root.dataset.reading = complete ? 'complete' : state.all ? 'all' : 'scene';
    scenes.forEach(scene => { scene.hidden = complete || (!state.all && scene.dataset.key !== state.key); });
    navigation.forEach(link => {
      if (!state.all && !complete && link.hash === `#scene-${state.key}`) link.setAttribute('aria-current','step');
      else link.removeAttribute('aria-current');
    });
    const picker=root.querySelector('[data-scene-select]');
    if(picker) picker.value=state.key;
    const scene = scenes.find(scene => scene.dataset.key === state.key);
    if (!state.all && !complete) {
      const token = hash.startsWith(`#scene-${state.key}~`) ? parseWorkspaceToken(hash) : null;
      const key = token && Object.hasOwn(tables.get(scene),token) ? token : scene.dataset.initial;
      renderWorkspace(scene,tables.get(scene),key);
    }
    if (focus) {
      const target = complete ? root.querySelector('#story-complete') : state.all ? root.querySelector('#read-all') : scene.querySelector('h2');
      target.tabIndex = -1;
      target.focus({preventScroll:true});
      (target.closest('[data-scene]') || target).scrollIntoView({block:'start',behavior:'instant'});
    }
  };
  const navigate = (hash,focus=true) => {
    if (location.hash !== hash) history.pushState(null,'',hash);
    render(hash,focus);
  };
  root.addEventListener('change',event => {
    if (root.dataset.enhanced !== 'true' || !(event.target instanceof HTMLSelectElement)) return;
    if(event.target.matches('[data-scene-select]')) { navigate(`#scene-${event.target.value}`); return; }
    if(!event.target.matches('[data-model-input]')) return;
    const scene = event.target.closest('[data-scene]');
    const key = [...scene.querySelectorAll('[data-model-input]')].map(c => c.value).join('');
    const state = renderWorkspace(scene,tables.get(scene),key);
    history.replaceState(null,'',`#scene-${scene.dataset.key}~v1-${key}`);
    root.querySelector('[data-announce]').textContent = `${state.label}. ${state.reasons.join(' ')}`;
  });
  root.addEventListener('click',event => {
    if (root.dataset.enhanced !== 'true' || !(event.target instanceof Element)) return;
    const target = event.target;
    const link = target.closest('a[href^="#scene-"],a[href="#read-all"],a[href="#story-complete"]');
    if (link && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) { event.preventDefault(); navigate(link.hash); return; }
    const button = target.closest('button');
    if (!button) return;
    if (button.hasAttribute('data-reset-case')) {
      const scene = button.closest('[data-scene]');
      renderWorkspace(scene,tables.get(scene),scene.dataset.initial);
      history.replaceState(null,'',`#scene-${scene.dataset.key}`);
      root.querySelector('[data-announce]').textContent = 'Starting conditions restored.';
    }
    if (button.hasAttribute('data-reset')) {
      scenes.forEach(scene => { renderWorkspace(scene,tables.get(scene),scene.dataset.initial); scene.querySelectorAll('details').forEach(d => { d.open = false; }); });
      const target = new URL(location.href); target.searchParams.delete('explain'); target.hash = `scene-${keys[0]}`;
      history.pushState(null,'',target); render(target.hash,true);
      root.querySelector('[data-announce]').textContent = 'All starting conditions restored.';
    }
  });
  const syncLocation = () => {
    if (printing || root.dataset.enhanced !== 'true') return;
    if (!location.hash || location.hash === '#read-all' || location.hash === '#story-complete' || keys.some(key => location.hash === `#scene-${key}` || location.hash.startsWith(`#scene-${key}~`))) render(location.hash,Boolean(location.hash));
  };
  window.addEventListener('hashchange',syncLocation);
  window.addEventListener('popstate',syncLocation);
  const printed = new Map();
  window.addEventListener('beforeprint',() => { printing=true; scenes.forEach(scene => { scene.hidden=false; scene.querySelectorAll('details').forEach(d => { printed.set(d,d.open); d.open=true; }); }); });
  window.addEventListener('afterprint',() => { printed.forEach((open,d) => { d.open=open; }); printed.clear(); printing=false; if(root.dataset.enhanced==='true') render(location.hash); });
  scenes.forEach(scene => renderWorkspace(scene,tables.get(scene),scene.dataset.initial));
  render(location.hash);
  root.querySelectorAll('[data-only-enhanced]').forEach(control => { control.hidden=false; });
  root.querySelectorAll('[data-static-answer]').forEach(answer => { answer.hidden=true; });
  root.dataset.enhanced='true';
  if (location.hash.startsWith('#scene-')) render(location.hash,true);
  const explanation = new URLSearchParams(location.search).get('explain');
  const active = scenes.find(scene => !scene.hidden && scene.dataset.key===explanation);
  if (active) active.querySelector('details').open=true;
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
  const parameters = new URLSearchParams(location.search);
  const scene = parameters.get('scene');
  if (scene) document.querySelectorAll('[data-story-return]').forEach(link => {
    const keys = link.dataset.returnScenes.split(' '), index = keys.indexOf(scene);
    if (index < 0) return;
    const labels = link.dataset.returnLabels.split('|'), target = new URL(link.href);
    const token = parameters.get('conditions');
    target.hash = `scene-${scene}${/^v1-[0-9]{2,3}$/.test(token || '') ? '~'+token : ''}`;
    target.searchParams.set('explain',scene);
    link.href=target.href; link.textContent=`Return to: ${labels[index]}`;
  });
  for (const root of document.querySelectorAll('[data-lab-journey]')) {
    try { enhanceJourney(root); } catch {
      root.querySelectorAll('[data-scene]').forEach(scene => {
        try { renderWorkspace(scene,JSON.parse(scene.dataset.model),scene.dataset.initial); } catch {}
        scene.hidden=false;
      });
      root.querySelectorAll('[data-static-answer]').forEach(node => { node.hidden=false; });
      root.querySelectorAll('[data-only-enhanced]').forEach(node => { node.hidden=true; });
      root.querySelector('#story-complete').hidden=false;
      delete root.dataset.reading; delete root.dataset.enhanced;
    }
  }
  for (const root of document.querySelectorAll('[data-topic-finder]')) {
    try { enhanceFinder(root); } catch {
      root.querySelectorAll('[data-find-item],[data-find-group]').forEach(item => { item.hidden=false; });
      root.querySelectorAll('[data-only-enhanced],[data-find-empty]').forEach(item => { item.hidden=true; });
      delete root.dataset.enhanced;
    }
  }
}
