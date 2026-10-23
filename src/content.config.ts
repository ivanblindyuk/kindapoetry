import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { asDateText, kyivToday, parseDate } from './dates';
import { ROLE_NAMES } from './roles';

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

/** An item's address is its file name exactly as typed, never reworked (ADR-0002). */
const fileName = ({ entry }: { entry: string }) => entry.replace(/\.[^.]+$/, '');

const partialDate = z.preprocess(
  asDateText,
  z.string().refine((text) => parseDate(text) !== undefined, {
    message: 'Expected a day (2012-03-14), a month (2012-03) or a year (2012)',
  }),
);

const day = z.preprocess(
  asDateText,
  z
    .string()
    .refine((text) => parseDate(text)?.day !== undefined, { message: 'Expected a day (2026-10-16)' })
    .refine((text) => text <= kyivToday(), { message: 'A publication date is never in the future' }),
);

/**
 * The Poems: one file each, whose name is the Poem's address. The body is the
 * text as verse (see src/verse.ts). Which Cycle a Poem is in is not said here
 * but in the Cycle's own list (ADR-0003).
 */
const poems = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/poems', generateId: fileName }),
  schema: z.object({
      /** The title, or for an untitled Poem the opening fragment standing in for it. */
      title: z.string().min(1),
      /** Marks `title` as the hand-picked opening fragment of an untitled Poem. */
      untitled: z.literal(true).optional(),
      /** The day the Poet finished it, or only the month or the year when that is all he knows. */
      written: partialDate,
      /** The Kyiv day it went on the site, typed by hand. Never shown on the page. */
      published: day,
      /** A line under the title saying what the poem is part of, such as one half of a diptych. */
      subtitle: z.string().min(1).optional(),
      dedication: z.string().min(1).optional(),
      epigraph: z
        .object({
          text: z.string().min(1),
          /** Whom or what it quotes. */
          source: z.string().min(1).optional(),
        })
        .optional(),
    }),
});

/**
 * The Cycles: one file each, whose name is the Cycle's address, holding its
 * Poems in reading order. A Poem's entry is its file name, or its file name
 * with the Role it plays there.
 */
const cycles = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/cycles', generateId: fileName }),
  schema: z.object({
    name: z.string().min(1),
    /** Marks the one Cycle for Poems that fit no other: Поза циклами. */
    catchAll: z.literal(true).optional(),
    poems: z
      .array(
        z.union([
          z.string().transform((poem) => ({ poem, role: undefined })),
          z.object({ poem: z.string(), role: z.enum(ROLE_NAMES).optional() }),
        ]),
      )
      .min(1),
  }),
});

/** The order of the Cycles: one list of their file names. */
const cycleOrder = defineCollection({
  loader: glob({ pattern: 'cycle-order.yaml', base: './src/content' }),
  schema: z.object({
    cycles: z.array(z.string()).min(1),
  }),
});

export const collections = { about, poems, cycles, cycleOrder };
