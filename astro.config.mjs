// @ts-check
import { defineConfig } from 'astro/config';

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
  integrations: [devOnlyPages],
});
