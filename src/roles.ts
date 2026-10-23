/**
 * The parts a Poem may play in its Cycle (CONTEXT.md, "Role"). Each Role is
 * named here once, with how it reads on a page and where it may stand, so a
 * new Role is one more entry and a misplaced one fails the build (ADR-0003).
 */
export const ROLES = {
  prologue: {
    /** How a list of the Cycle's Poems names it. */
    label: 'Пролог',
    /** How the Poem's own page names its place. */
    line: (cycle: string) => `Пролог до циклу «${cycle}»`,
    place: 'first',
    fits: (index: number) => index === 0,
  },
  epilogue: {
    label: 'Епілог',
    line: (cycle: string) => `Епілог до циклу «${cycle}»`,
    place: 'last',
    fits: (index: number, count: number) => index === count - 1,
  },
} as const;

export type Role = keyof typeof ROLES;

export const ROLE_NAMES = Object.keys(ROLES) as [Role, ...Role[]];
