import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { existingLabImage, repositoryRoot, safeUrl } from '../lib/lab-schema.ts';

export const requiredSections = ['question', 'approach', 'takeaways', 'limits', 'next steps'];

function children(node) { return Array.isArray(node.children) ? node.children : []; }
function text(node) { return typeof node.value === 'string' ? node.value : children(node).map(text).join(''); }
function identifier(value) { return String(value).toLowerCase().replace(/\s+/g, ' ').trim(); }
function substantive(node) {
  if (node.type === 'heading' || node.type === 'thematicBreak' || node.type === 'definition') return false;
  return Boolean((typeof node.value === 'string' && node.value.trim())
    || (node.type === 'image' && node.alt?.trim()) || children(node).some(substantive));
}

/** Validate Markdown syntax before HTML generation; code fences remain inert text. */
export function validateLabTree(tree, { frontmatter = {}, root = repositoryRoot, filePath = 'Lab piece' } = {}) {
  function fail(message) { throw new Error(`${filePath}: ${message}`); }
  const definitions = new Map();
  function collect(node) {
    if (node.type === 'definition') {
      const key = identifier(node.identifier);
      if (definitions.has(key)) fail(`Duplicate Markdown reference definition: ${key}`);
      definitions.set(key, node);
    }
    for (const child of children(node)) collect(child);
  }
  collect(tree);
  function image(node, url) {
    if (!node.alt?.trim()) fail('Markdown images need nonempty alt text');
    if (!existingLabImage(url, root)) fail('Markdown images must use an existing image under public/lab-assets/');
  }
  function visit(node) {
    if (node.type === 'html' || node.type.startsWith('mdx')) fail('Raw HTML and MDX are not permitted in Lab Markdown');
    if (node.type === 'heading' && node.depth === 1) fail('The page supplies the H1; start article sections at H2');
    if (['link', 'image', 'definition'].includes(node.type) && !safeUrl(node.url)) {
      fail('Markdown links must use HTTPS without credentials or a root-local URL');
    }
    if (node.type === 'image') image(node, node.url);
    if (node.type === 'imageReference') {
      const definition = definitions.get(identifier(node.identifier));
      if (!definition) fail('Markdown image reference has no definition');
      image(node, definition.url);
    }
    for (const child of children(node)) visit(child);
  }
  visit(tree);
  if (frontmatter.status !== 'published') return;
  const content = children(tree);
  const sections = new Map();
  let current;
  for (const node of content) {
    if (node.type === 'heading' && node.depth === 2) {
      current = identifier(text(node));
      if (sections.has(current)) fail(`Duplicate article section: ${text(node)}`);
      sections.set(current, []);
    } else if (current) {
      sections.get(current).push(node);
    }
  }
  for (const name of requiredSections) {
    if (!sections.get(name)?.some(substantive)) fail(`Complete the ${name} section before publishing`);
  }
}

export default function remarkLabPolicy(options = {}) {
  return (tree, file) => validateLabTree(tree, {
    ...options,
    frontmatter: file.data.astro?.frontmatter ?? {},
    filePath: file.path ?? 'Lab piece',
  });
}

/** Also validate unrendered drafts, and make the actual Markdown pipeline testable. */
export async function renderLabMarkdown(source, frontmatter, { root = repositoryRoot } = {}) {
  const renderer = await createMarkdownProcessor({
    syntaxHighlight: false,
    smartypants: false,
    remarkPlugins: [[remarkLabPolicy, { root }]],
  });
  return renderer.render(source, { frontmatter });
}
