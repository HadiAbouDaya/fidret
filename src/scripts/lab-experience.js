const one = (root, selector) => root.querySelector(selector);
const all = (root, selector) => root.querySelectorAll(selector);
/** Local controls. No network or persistent state. */
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
  const controls = [...all(scene,'[data-model-input]')];
  controls.forEach((control,i) => {
    control.value = key[i];
    control.closest('label').dataset.modified = String(key[i] !== scene.dataset.initial[i]);
    all(scene,'[data-static-answer] dd')[i].textContent = control.selectedOptions[0].textContent;
  });
  scene.dataset.state = key;
  scene.dataset.response = state.decision;
  scene.dataset.cloud = state.values.cloud || '';
  all(scene,'[data-artifact-node]').forEach(node => {node.dataset.deciding=String(node.dataset.artifactNode===state.values.focus);});
  one(scene,'[data-response-label]').textContent = state.label;
  all(scene,'[data-reason]').forEach((line,i) => { line.hidden = i >= state.reasons.length; line.textContent = state.reasons[i] || ''; });
  all(scene,'[data-artifact-value]').forEach(value => { value.textContent = state.values[value.dataset.artifactValue]; });
  all(scene,'[data-match-symbol]').forEach(value => { value.textContent = state.values.proof === state.values.candidate ? '=' : '≠'; });
  all(scene,'[data-trace-status]').forEach((line,i) => {
    line.dataset.traceStatus = state.trace[i].status;
    one(line,'[data-trace-value]').textContent = state.trace[i].value;
    one(line,'[data-trace-label]').textContent = traceLabels[state.trace[i].status];
  });
  const changed = key !== scene.dataset.initial;
  one(scene,'[data-baseline]').hidden = !changed || state.label===table[scene.dataset.initial].label;
  one(scene,'[data-priority-note]').hidden = !['protect','reconcile','recorded','contain'].includes(state.decision);
  const fragment = `#scene-${scene.dataset.key}~v1-${key}`;
  one(scene,'[data-share]').href = fragment;
  one(scene,'[data-state-description]').textContent = changed ? 'These settings are included in the link.' : 'Starting conditions';
  const note = one(scene,'[data-workspace-note]');
  const target = new URL(note.href);
  target.searchParams.set('conditions', `v1-${key}`);
  note.href = target.href;
  return state;
}
function setHidden(root, selector, hidden) {
  all(root,selector).forEach(node => { node.hidden=hidden; });
}
function printState(nodes, property, value) {
  const states = new Map();
  addEventListener('beforeprint',() => { nodes.forEach(node => { states.set(node,node[property]); node[property]=value; }); });
  addEventListener('afterprint',() => { states.forEach((value,node) => { node[property]=value; }); states.clear(); });
}
function inView(node) {
  const {top,bottom} = node.getBoundingClientRect();
  return bottom > 0 && top < innerHeight;
}
function preserveReading(anchor) {
  if (!anchor || !inView(anchor)) return () => {};
  const top = anchor.getBoundingClientRect().top, focus = document.activeElement, url = location.href;
  return () => {
    const controller = new AbortController(), signal = controller.signal;
    const cancel = () => controller.abort();
    const restore = () => {
      if (signal.aborted || location.href !== url || !anchor.getClientRects().length || ![focus,document.body].includes(document.activeElement)) return;
      if (anchor.contains(focus)) focus.focus({preventScroll:true});
      scrollBy({top:anchor.getBoundingClientRect().top-top,behavior:'instant'});
    };
    restore();
    if (!location.hash || document.readyState === 'complete') return;
    // Respect new intent.
    for (const type of ['keydown','pointerdown','wheel','touchstart','hashchange','popstate','beforeprint','pagehide']) addEventListener(type,cancel,{capture:true,once:true,signal});
    const settle = () => requestAnimationFrame(() => requestAnimationFrame(() => { restore(); if (document.readyState === 'complete') cancel(); }));
    settle(); addEventListener('load',settle,{once:true,signal});
  };
}
function enhanceJourney(root) {
  const scenes = [...all(root,'[data-scene]')];
  const keys = scenes.map(scene => scene.dataset.key);
  // Keep active reading.
  const reader = [document.activeElement, ...all(root,'[data-scene] details[open]')].find(node => root.contains(node) && node.closest('[data-scene],.journey-progress,#story-complete') && inView(node));
  const keepReading = Boolean(reader || one(root,'[data-scene] details[open]') || (!location.hash && scenes[0].getBoundingClientRect().top < 0));
  const readingAnchor = keepReading ? (reader || document.elementFromPoint(innerWidth/2,innerHeight/2)?.closest('p,h2,h3,summary,li,figure,details,.workspace-stage')) : null;
  const restoreReading = preserveReading(root.contains(readingAnchor) ? readingAnchor : null);
  const tables = new Map(scenes.map(scene => {
    const table = JSON.parse(scene.dataset.model);
    const controls = [...all(scene,'[data-model-input]')];
    if (!one(scene,'h2') || !Object.hasOwn(table,scene.dataset.initial) || Object.keys(table).length !== controls.reduce((n,c) => n*c.options.length,1)) throw new Error('Incomplete model');
    for (const [key,state] of Object.entries(table)) {
      if (key.length !== controls.length || controls.some((c,i) => ![...c.options].some(o => o.value === key[i])) || !Array.isArray(state.reasons) || state.reasons.length > 10 || state.trace.length !== 4) throw new Error('Invalid model');
    }
    return [scene,table];
  }));
  const resetScene = scene => renderWorkspace(scene,tables.get(scene),scene.dataset.initial);
  const navigation = [...all(root,'.journey-progress a')];
  const announcement = one(root,'[data-announce]');
  let printing = false;
  const render = (hash, focus = false, keepAll = false) => {
    const previousFocus = root.contains(document.activeElement) ? document.activeElement : null;
    const complete = hash === '#story-complete' && !keepAll;
    const state = parseJourneyHash(hash,keys);
    const readAll = state.all || keepAll;
    one(root,'#story-complete').hidden = !complete && !readAll;
    root.dataset.reading = complete ? 'complete' : readAll ? 'all' : 'scene';
    scenes.forEach(scene => { scene.hidden = complete || (!readAll && scene.dataset.key !== state.key); });
    navigation.forEach(link => {
      if (!readAll && !complete && link.hash === `#scene-${state.key}`) link.setAttribute('aria-current','step');
      else link.removeAttribute('aria-current');
    });
    const picker=one(root,'[data-scene-select]');
    if(picker) picker.value=state.key;
    const scene = scenes[keys.indexOf(state.key)];
    if (!state.all && !complete) {
      const token = hash.startsWith(`#scene-${state.key}~`) ? parseWorkspaceToken(hash) : null;
      const key = token && Object.hasOwn(tables.get(scene),token) ? token : scene.dataset.initial;
      renderWorkspace(scene,tables.get(scene),key);
    }
    if (focus || (previousFocus && !previousFocus.getClientRects().length)) {
      const target = complete ? one(root,'#story-complete') : readAll ? one(root,'#read-all') : one(scene,'h2');
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
    if(event.target.matches('[data-scene-select]')) { navigate(`#scene-${event.target.value}`,false); announcement.textContent = event.target.selectedOptions[0].textContent; return; }
    if(!event.target.matches('[data-model-input]')) return;
    const scene = event.target.closest('[data-scene]');
    const key = [...all(scene,'[data-model-input]')].map(c => c.value).join('');
    const state = renderWorkspace(scene,tables.get(scene),key);
    history.replaceState(null,'',`#scene-${scene.dataset.key}~v1-${key}`);
    announcement.textContent = `${state.label}. ${state.reasons.join(' ')}`;
  });
  const handleJourneyClick = event => {
    if (root.dataset.enhanced !== 'true') return;
    const target = event.currentTarget;
    if (target instanceof HTMLAnchorElement && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0) { event.preventDefault(); navigate(target.hash); return; }
    if (target.hasAttribute('data-reset-case')) {
      const scene = target.closest('[data-scene]');
      resetScene(scene);
      const baseline = `#scene-${scene.dataset.key}`;
      if (location.hash !== baseline) history.pushState(null,'',baseline);
      announcement.textContent = 'Starting conditions restored.';
    }
    if (target.hasAttribute('data-reset')) {
      scenes.forEach(scene => { resetScene(scene); all(scene,'details').forEach(d => { d.open = false; }); });
      const target = new URL(location.href); target.searchParams.delete('explain'); target.hash = `scene-${keys[0]}`;
      history.pushState(null,'',target); render(target.hash,true);
      announcement.textContent = 'All starting conditions restored.';
    }
  };
  // Bind controls so headings are not announced as clickable.
  all(root,'a[href^="#scene-"],a[href="#read-all"],a[href="#story-complete"],[data-reset-case],[data-reset]').forEach(control => control.addEventListener('click',handleJourneyClick));
  let locationFrame = 0;
  const syncLocation = () => {
    cancelAnimationFrame(locationFrame);
    // Follow native history scroll restoration.
    locationFrame = requestAnimationFrame(() => {
      if (printing || root.dataset.enhanced !== 'true') return;
      if (!location.hash || location.hash === '#read-all' || location.hash === '#story-complete' || keys.some(key => location.hash === `#scene-${key}` || location.hash.startsWith(`#scene-${key}~`))) render(location.hash,Boolean(location.hash));
    });
  };
  addEventListener('hashchange',syncLocation);
  addEventListener('popstate',syncLocation);
  printState(all(root,'[data-scene] details'),'open',true);
  printState(scenes,'hidden',false);
  addEventListener('beforeprint',() => { printing=true; });
  addEventListener('afterprint',() => { printing=false; });
  scenes.forEach(resetScene);
  render(location.hash,false,keepReading);
  setHidden(root,'[data-only-enhanced]',false);
  setHidden(root,'[data-static-answer],[data-static-context]',true);
  root.dataset.enhanced='true';
  if (!keepReading && location.hash.startsWith('#scene-')) render(location.hash,true);
  const explanation = new URLSearchParams(location.search).get('explain');
  const active = scenes.find(scene => !scene.hidden && scene.dataset.key===explanation);
  if (active) one(active,'details').open=true;
  restoreReading();
}

function enhanceFinder(root) {
  const reader = [document.activeElement.closest('[data-find-item]'), ...all(root,'[data-find-item][open]')].find(item => root.contains(item) && inView(item));
  const restoreReading = preserveReading(reader);
  const input = one(root,'input[type="search"]');
  const items = [...all(root,'[data-find-item]')];
  const status = one(root,'[data-find-status]');
  const empty = one(root,'[data-find-empty]');
  if (!input || !items.length || !status) return;
  const filters = [...all(root,'[data-filter]')];
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
    all(root,'[data-find-group]').forEach(section => { section.hidden = ![...all(section,'[data-find-item]')].some(item => !item.hidden); });
    if (empty) empty.hidden = count !== 0;
  };
  const followHash = (move = false) => {
    let key;
    try { key = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const item = items.find(item => item.id === key);
    if (!item) return;
    input.value = ''; group = 'all'; apply();
    if (item instanceof HTMLDetailsElement) {
      item.open = true;
      if (move) {
        const hash = location.hash;
        // Follow native fragment scrolling.
        requestAnimationFrame(() => {
          if (location.hash !== hash) return;
          one(item,'summary')?.focus({preventScroll:true});
          item.scrollIntoView({behavior:'instant',block:'start'});
        });
      }
    }
  };
  input.addEventListener('input', apply);
  const handleFinderClick = event => {
    const control = event.currentTarget;
    if (control.hasAttribute('data-filter')) { group = control.dataset.filter; apply(); }
    if (control.hasAttribute('data-clear')) { input.value = ''; group = 'all'; apply(); input.focus(); }
  };
  all(root,'[data-filter],[data-clear]').forEach(control => control.addEventListener('click',handleFinderClick));
  addEventListener('hashchange', () => { if (root.dataset.enhanced === 'true') followHash(true); });
  printState(items.filter(item => item instanceof HTMLDetailsElement),'open',true);
  setHidden(root,'[data-only-enhanced]',false);
  apply(); if (!reader) followHash();
  root.dataset.enhanced = 'true';
  restoreReading();
}


if (typeof document !== 'undefined') {
  const parameters = new URLSearchParams(location.search);
  const scene = parameters.get('scene');
  if (scene) all(document,'[data-story-return]').forEach(link => {
    const keys = link.dataset.returnScenes.split(' '), index = keys.indexOf(scene);
    if (index < 0) return;
    const labels = link.dataset.returnLabels.split('|'), target = new URL(link.href);
    const token = parameters.get('conditions');
    target.hash = `scene-${scene}${/^v1-[0-9]{2,3}$/.test(token || '') ? '~'+token : ''}`;
    target.searchParams.set('explain',scene);
    link.href=target.href; link.textContent=`Return to: ${labels[index]}`;
  });
  for (const root of all(document,'[data-lab-journey]')) {
    try { enhanceJourney(root); } catch {
      all(root,'[data-scene]').forEach(scene => {
        try { renderWorkspace(scene,JSON.parse(scene.dataset.model),scene.dataset.initial); } catch {}
        scene.hidden=false;
      });
      setHidden(root,'[data-static-answer],[data-static-context]',false);
      setHidden(root,'[data-only-enhanced]',true);
      one(root,'#story-complete').hidden=false;
      delete root.dataset.reading; delete root.dataset.enhanced;
    }
  }
  for (const root of all(document,'[data-topic-finder]')) {
    try { enhanceFinder(root); } catch {
      setHidden(root,'[data-find-item],[data-find-group]',false);
      setHidden(root,'[data-only-enhanced],[data-find-empty]',true);
      delete root.dataset.enhanced;
    }
  }
}
