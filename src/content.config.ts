import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * The About page: one Markdown document by the Poet. The front matter holds
 * the portrait and the link card's description; the body is whatever
 * sections he chooses, in his order. See CONTEXT.md, "The About page".
 */
const about = defineCollection({
  loader: glob({ pattern: 'about.md', base: './src/content/about' }),
  schema: ({ image }) =>
    z.object({
      portrait: image(),
      /** What the portrait shows, for Readers who cannot see it. */
      portraitAlt: z.string().min(1),
      /** Whoever took the portrait. Nothing is shown when it is absent. */
      portraitCredit: z.string().min(1).optional(),
      /** Where the credit links to, such as the photographer's profile. */
      portraitCreditUrl: z.url().optional(),
      /** One line about the Poet, written by hand: the link card and the meta description. */
      description: z.string().min(1),
    }),
});

export const collections = { about };
