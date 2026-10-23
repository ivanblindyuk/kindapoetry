import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { ROLES, type Role } from './roles';

/**
 * Where every Poem stands: its Cycle, its Role there and its neighbours,
 * looked up from the Cycles' lists (ADR-0003). Building it checks the rules
 * the content must keep, and any broken rule fails the build.
 */

type Poem = CollectionEntry<'poems'>;

export interface Cycle {
  id: string;
  name: string;
  catchAll: boolean;
  entries: { poem: Poem; role?: Role }[];
}

// A type rather than an interface, so it can be a page's props.
export type PlacedPoem = {
  poem: Poem;
  cycle: Cycle;
  role?: Role;
  previous?: Poem;
  next?: Poem;
};

export interface Catalogue {
  /** Every Cycle, in the Poet's order. */
  cycles: Cycle[];
  /** Every Poem, in reading order. */
  poems: PlacedPoem[];
}

/** An address is lower-case Latin words joined by hyphens (ADR-0002). */
const ADDRESS = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function getCatalogue(): Promise<Catalogue> {
  const problems: string[] = [];
  const poems = new Map((await getCollection('poems')).map((poem) => [poem.id, poem]));
  const cycleFiles = new Map((await getCollection('cycles')).map((cycle) => [cycle.id, cycle]));
  const order = await getEntry('cycleOrder', 'cycle-order');
  if (!order) throw new Error('src/content/cycle-order.yaml is missing');

  for (const id of poems.keys()) {
    if (!ADDRESS.test(id)) problems.push(`Poem file "${id}" is not a valid address`);
  }
  for (const id of cycleFiles.keys()) {
    if (!ADDRESS.test(id)) problems.push(`Cycle file "${id}" is not a valid address`);
    if (!order.data.cycles.includes(id)) problems.push(`Cycle "${id}" is missing from cycle-order.yaml`);
  }

  const cycles: Cycle[] = [];
  for (const [index, id] of order.data.cycles.entries()) {
    const file = cycleFiles.get(id);
    if (!file) problems.push(`cycle-order.yaml names "${id}", which has no file in src/content/cycles`);
    else if (order.data.cycles.indexOf(id) !== index) problems.push(`cycle-order.yaml names "${id}" twice`);
    else cycles.push(readCycle(file, poems, problems));
  }

  const catchAlls = cycles.filter(({ catchAll }) => catchAll);
  if (catchAlls.length > 1) {
    problems.push(`Only one Cycle may be the catch-all, but ${names(catchAlls)} are marked as one`);
  }

  const cyclesOf = new Map<string, string[]>();
  for (const cycle of cycles) {
    for (const { poem } of cycle.entries) {
      cyclesOf.set(poem.id, [...(cyclesOf.get(poem.id) ?? []), cycle.id]);
    }
  }
  for (const id of poems.keys()) {
    const listed = cyclesOf.get(id) ?? [];
    if (listed.length === 0) problems.push(`Poem "${id}" is in no Cycle`);
    if (listed.length > 1) problems.push(`Poem "${id}" is listed more than once: in ${listed.join(', ')}`);
  }

  if (problems.length > 0) {
    throw new Error(`The content breaks the site's rules:\n- ${problems.join('\n- ')}`);
  }

  return {
    cycles,
    poems: cycles.flatMap((cycle) =>
      cycle.entries.map(({ poem, role }, index) => ({
        poem,
        cycle,
        role,
        previous: cycle.entries[index - 1]?.poem,
        next: cycle.entries[index + 1]?.poem,
      })),
    ),
  };
}

function readCycle(file: CollectionEntry<'cycles'>, poems: Map<string, Poem>, problems: string[]): Cycle {
  const { name, catchAll = false } = file.data;
  const listed = file.data.poems;
  const entries: Cycle['entries'] = [];

  for (const [index, { poem: id, role }] of listed.entries()) {
    const poem = poems.get(id);
    if (!poem) {
      problems.push(`Cycle "${file.id}" lists "${id}", which has no file in src/content/poems`);
      continue;
    }
    entries.push({ poem, role });
    if (!role) continue;
    if (catchAll) {
      problems.push(`Poem "${id}" has the Role ${role}, but the catch-all "${file.id}" allows no Roles`);
    } else if (!ROLES[role].fits(index, listed.length)) {
      problems.push(`Poem "${id}" is the ${role} of "${file.id}", so it must stand ${ROLES[role].place}`);
    }
    if (listed.findIndex((entry) => entry.role === role) !== index) {
      problems.push(`Cycle "${file.id}" has more than one ${role}`);
    }
  }

  return { id: file.id, name, catchAll, entries };
}

function names(cycles: Cycle[]): string {
  return cycles.map(({ id }) => `"${id}"`).join(', ');
}
