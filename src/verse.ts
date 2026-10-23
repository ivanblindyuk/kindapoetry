/**
 * A Poem's text is verse, not Markdown (CONTEXT.md, "Poem"): every line break
 * is the Poet's, a blank line separates stanzas, leading spaces are kept as
 * indentation, and `*…*` marks italics, the only formatting there is.
 */

export interface Segment {
  text: string;
  italic: boolean;
}

export type Line = Segment[];
export type Stanza = Line[];

/** At most this many lines of the first stanza make a Poem's opening lines. */
const OPENING_LINE_COUNT = 4;

const STRESS_MARK = /́/g;

/** Splits a Poem's text into stanzas of lines. `poem` names it in an error. */
export function parseVerse(text: string, poem: string): Stanza[] {
  const stanzas: Stanza[] = [];
  let stanza: Stanza = [];
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trimEnd();
    if (line !== '') {
      stanza.push(parseLine(line, poem));
    } else if (stanza.length > 0) {
      stanzas.push(stanza);
      stanza = [];
    }
  }
  if (stanza.length > 0) stanzas.push(stanza);
  if (stanzas.length === 0) throw new Error(`Poem "${poem}" has no text`);
  return stanzas;
}

function parseLine(line: string, poem: string): Line {
  const parts = line.split('*');
  if (parts.length % 2 === 0) {
    throw new Error(`Poem "${poem}": an italic opened with * is never closed in "${line}"`);
  }
  return parts
    .map((text, index) => ({ text, italic: index % 2 === 1 }))
    .filter(({ text }) => text !== '');
}

/**
 * The first stanza, at most four lines, joined by " / ", ending in "…" when
 * anything was left out (docs/design.md, "The Poem page").
 */
export function openingLines(stanzas: Stanza[]): string {
  const [first = []] = stanzas;
  const lines = first.slice(0, OPENING_LINE_COUNT).map(plainLine).join(' / ');
  const cut = first.length > OPENING_LINE_COUNT || stanzas.length > 1;
  return cut ? `${lines.replace(/[\s.,;:–—-]+$/, '')}…` : lines;
}

function plainLine(line: Line): string {
  return line
    .map(({ text }) => text)
    .join('')
    .trim();
}

/** Text handed to others to draw in fonts the site does not control carries no stress marks. */
export function stripStressMarks(text: string): string {
  return text.replace(STRESS_MARK, '');
}
