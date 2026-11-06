import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {readFile, realpath, stat} from 'node:fs/promises';
import {extname, isAbsolute, relative, resolve, sep} from 'node:path';
import {fileURLToPath} from 'node:url';

const repository = fileURLToPath(new URL('../../', import.meta.url));
// Playwright reads this during import. CI/users may explicitly choose another cache.
process.env.PLAYWRIGHT_BROWSERS_PATH ??= resolve(repository, '.local/playwright');
const {chromium} = await import('playwright');

export const timeout = 10_000;
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
  '.woff': 'font/woff', '.md': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml',
};
const inside = (root, path) => {
  const local = relative(root, path);
  return local !== '..' && !local.startsWith(`..${sep}`) && !isAbsolute(local);
};

export async function startSite() {
  const root = await realpath(resolve(repository, 'website'));
  await stat(resolve(root, 'index.html')); // Fail clearly if the build is missing.
  // Reuse the built site's global CSP/security policy, not a permissive test policy.
  const headersFile = await readFile(resolve(root, '_headers'), 'utf8');
  const globalBlock = headersFile.split(/\r?\n\s*\r?\n/).find(block => block.startsWith('/*\n'));
  assert.ok(globalBlock, 'built _headers contains the global response policy');
  const policy = Object.fromEntries(globalBlock.split('\n').slice(1).filter(line => line.trim()).map(line => {
    const colon = line.indexOf(':');
    return [line.slice(0, colon).trim(), line.slice(colon + 1).trim()];
  }));
  const server = createServer(async (request, response) => {
    try {
      if (!['GET', 'HEAD'].includes(request.method)) {
        response.writeHead(405, {Allow: 'GET, HEAD'}).end();
        return;
      }
      // Decode before resolving: reject traversal, Windows separators and NULs.
      const path = decodeURIComponent(request.url.split('?')[0]);
      if (!path.startsWith('/') || path.includes('\\') || path.includes('\0') || path.split('/').includes('..')) {
        response.writeHead(403).end();
        return;
      }
      let file = resolve(root, `.${path}`);
      if (!inside(root, file)) { response.writeHead(403).end(); return; }
      if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
      file = await realpath(file);
      if (!inside(root, file)) { response.writeHead(403).end(); return; }
      const body = await readFile(file);
      response.writeHead(200, {...policy, 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Content-Length': body.length});
      response.end(request.method === 'HEAD' ? undefined : body);
    } catch (error) {
      response.writeHead(error instanceof URIError ? 400 : ['ENOENT', 'ENOTDIR'].includes(error.code) ? 404 : 500).end();
    }
  });
  await new Promise((resolveListen, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolveListen);
  });
  return {
    origin: `http://127.0.0.1:${server.address().port}`,
    close: () => new Promise((resolveClose, reject) => {
      server.close(error => error ? reject(error) : resolveClose());
      server.closeAllConnections();
    }),
  };
}

export async function startBrowser() {
  return chromium.launch({headless: true, timeout: 20_000});
}

export async function withPage(browser, site, options, run) {
  const context = await browser.newContext({viewport: {width: 1280, height: 900}, serviceWorkers: 'block', ...options});
  const external = [], errors = [];
  try {
    context.setDefaultTimeout(timeout);
    context.setDefaultNavigationTimeout(timeout);
    await context.route('**/*', async route => {
      if (new URL(route.request().url()).origin === site.origin) await route.continue();
      else { external.push(route.request().url()); await route.abort('blockedbyclient'); }
    });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    await run(page);
    assert.deepEqual(external, [], 'all browser requests stay on the isolated built site');
    assert.deepEqual(errors, [], 'no unexpected browser JavaScript errors');
  } finally {
    await context.close();
  }
}

export const isModule = url => /\/_astro\/lab-experience[.-][^/]+\.js$/.test(new URL(url).pathname);

export async function holdModule(page, origin) {
  let release;
  const gate = new Promise(resolveGate => { release = resolveGate; });
  const match = url => url.origin === origin && isModule(url.href);
  await page.route(match, async route => { await gate; await route.continue(); });
  return {
    release,
    async close() {
      release();
      await page.unrouteAll({behavior: 'wait'});
    },
  };
}

export async function ready(page, selector = '[data-lab-journey]') {
  await page.locator(`${selector}[data-enhanced="true"]`).waitFor();
  await layoutReady(page);
}

export async function layoutReady(page) {
  // DOMContentLoaded/fonts.ready can wait on a held module. Wait for the actual
  // HTML, linked sheets and Manrope FontFace used by this page instead.
  await page.waitForFunction(() => document.querySelector('footer.site-footer') &&
    [...document.querySelectorAll('link[rel="stylesheet"]')].length > 0 &&
    [...document.querySelectorAll('link[rel="stylesheet"]')].every(link => link.sheet) &&
    [...document.fonts].some(face => face.family.replace(/["']/g, '') === 'Manrope' && face.status === 'loaded'));
}

export async function assertFocusVisible(locator, message) {
  assert.equal(await locator.evaluate(element => document.activeElement === element), true, `${message}: focus target`);
  // Native keyboard/fragment navigation can scroll smoothly. Await the target
  // entering the viewport, without disabling motion or sleeping a fixed time.
  const handle = await locator.elementHandle();
  try {
    await locator.page().waitForFunction(element => {
      const box = element.getBoundingClientRect();
      return box.bottom > 0 && box.top < innerHeight && box.right > 0 && box.left < innerWidth;
    }, handle);
  } catch (error) {
    assert.fail(`${message}: focus never entered the viewport (${error.message})`);
  } finally { await handle.dispose(); }
  const state = await locator.evaluate(element => {
    const box = element.getBoundingClientRect(), style = getComputedStyle(element);
    return {
      focused: document.activeElement === element,
      visible: element.getClientRects().length > 0 && style.visibility === 'visible' && box.width > 0 && box.height > 0,
      inViewport: box.bottom > 0 && box.top < innerHeight && box.right > 0 && box.left < innerWidth,
      indicator: style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0,
    };
  });
  assert.deepEqual(state, {focused: true, visible: true, inViewport: true, indicator: true}, message);
}

export async function sceneSnapshot(scene) {
  return scene.evaluate(element => ({
    key: element.dataset.key,
    state: element.dataset.state,
    controls: [...element.querySelectorAll('[data-model-input]')].map(input => input.value),
    response: element.dataset.response,
    label: element.querySelector('[data-response-label]').textContent,
    reasons: [...element.querySelectorAll('[data-reason]')].filter(line => !line.hidden).map(line => line.textContent),
    trace: [...element.querySelectorAll('[data-trace-status]')].map(line => ({status: line.dataset.traceStatus, value: line.querySelector('[data-trace-value]').textContent})),
    explanation: element.querySelector('details').textContent,
    open: element.querySelector('details').open,
  }));
}
