import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkLabPolicy from './src/plugins/lab-policy.mjs';

export default defineConfig({
  site: 'https://fidret.com',
  output: 'static',
  outDir: './website',
  trailingSlash: 'always',
  compressHTML: false,
  build: { inlineStylesheets: 'never' },
  devToolbar: { enabled: false },
  markdown: {
    syntaxHighlight: false,
    processor: unified({
      smartypants: false,
      remarkPlugins: [remarkLabPolicy],
    }),
  },
});
