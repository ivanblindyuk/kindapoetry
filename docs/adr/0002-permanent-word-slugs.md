# Permanent hand-chosen word slugs, flat, transliterated

Every published thing is addressed by a flat, transliterated Latin slug — `/poems/veresnevyi-doshch` — written explicitly in the item's frontmatter when it is first published and never changed afterwards. Slugs are not derived from titles, and a **Poem**'s address does not include its **Cycle**.

Three properties drove this. Slugs are **not generated from titles**, because a **Poem** may be retitled, and an untitled one is represented by a hand-picked opening fragment that the **Poet** may later revise — a derived slug would silently move the page and break every link already **Shared**. Addresses are **flat rather than nested under a Cycle**, because `CONTEXT.md` defines a **Cycle** as a grouping the **Poet** rearranges at will, including a catch-all for poems that don't yet fit; a poem moving out of the catch-all would otherwise change its permanent URL. Slugs are **transliterated Latin, not Cyrillic**, because **Share** is a first-class action here and percent-encoded Cyrillic degrades into unreadable `%D0%B2…` in messengers, mail clients and analytics — precisely where shared links are read.

## Considered options

- **`/poems/123`** — numeric IDs, the **Poet**'s initial preference. Rejected as the URL-level equivalent of the "***" placeholder that `CONTEXT.md` already forbids for untitled poems: a shared link would carry no hint of the work, and with no database there is no ID authority, leaving a hand-maintained counter whose collisions fail silently.
- **`/poems/123-veresnevyi-doshch`** — ID routes, text decorative. Genuinely robust, but buys protection against title revisions that a never-changed explicit slug already provides, at the cost of a counter and catch-all redirect rules.
- **Cyrillic slugs** — most honest to the audience, rejected for the percent-encoding behaviour above.

## Consequences

- Choosing a slug is a manual step when publishing. It is deliberately a decision, not a derivation.
- Slugs must be unique across each collection; the build should fail on a duplicate rather than silently overwrite a page.
- Should an address ever have to change, a redirect from the old one is mandatory, not optional.
