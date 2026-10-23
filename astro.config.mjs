// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import externalLinks from './src/markdown/external-links.mjs';

/**
 * Pages that exist only under `npm run dev`. They live outside `src/pages`
 * and are injected for the dev server alone, so a build never emits them.
 * @type {import('astro').AstroIntegration}
 */
const devOnlyPages = {
  name: 'dev-only-pages',
  hooks: {
    'astro:config:setup': ({ command, injectRoute }) => {
      if (command !== 'dev') return;
      injectRoute({
        pattern: '/dev/stress-marks',
        entrypoint: './src/dev/stress-marks.astro',
      });
    },
  },
};

export default defineConfig({
  // The production address, once it is known. Link cards need it for an
  // absolute image address, and leave the image out until it is set (#26).
  // site: 'https://…',
  integrations: [devOnlyPages],
  // Cycles are listed on Вірші, so trimming a Cycle's address lands there (CONTEXT.md, "Addresses").
  redirects: {
    '/cycles': '/poems',
  },
  markdown: {
    processor: satteri({ hastPlugins: [externalLinks] }),
  },
});
