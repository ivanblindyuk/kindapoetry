// Every date on the site is a Kyiv date (CONTEXT.md, "Dates and time").

const DATE = /^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/;

const MONTHS = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
const MONTHS_OF = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];

/** A date as exact as the Poet knows it: a day, a month or only a year. */
export interface PartialDate {
  year: number;
  month?: number;
  day?: number;
}

/**
 * YAML reads `2012-03-14` as a Date and `2012` as a number. Both are turned
 * back into the text the Poet typed, so every date is checked the same way.
 */
export function asDateText(value: unknown): unknown {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === 'number') return String(value);
  return value;
}

/** Reads `2012-03-14`, `2012-03` or `2012`; anything else, or a day that does not exist, is undefined. */
export function parseDate(text: string): PartialDate | undefined {
  const match = DATE.exec(text);
  if (!match) return undefined;
  const year = Number(match[1]);
  const month = match[2] === undefined ? undefined : Number(match[2]);
  const day = match[3] === undefined ? undefined : Number(match[3]);
  if (month !== undefined && (month < 1 || month > 12)) return undefined;
  if (month !== undefined && day !== undefined) {
    const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
    if (day < 1 || day > daysInMonth) return undefined;
  }
  return { year, month, day };
}

/** The date at its own precision: "14 березня 2012", "Березень 2012" or "2012". */
export function formatDate({ year, month, day }: PartialDate): string {
  if (month === undefined) return String(year);
  if (day === undefined) return `${MONTHS[month - 1]} ${year}`;
  return `${day} ${MONTHS_OF[month - 1]} ${year}`;
}

/** Today in Kyiv as `YYYY-MM-DD`, whatever the build machine's clock zone. */
export function kyivToday(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Kyiv' }).format(new Date());
}
