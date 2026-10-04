# Kinda Poetry

The personal site of one Ukrainian poet: his poems arranged in cycles, his translations, and news and announcements about the events he takes part in. It's a Ukrainian-language static site built with Astro, with content kept as Markdown in this repo, deployed to Cloudflare Pages and rebuilt every night so the poem of the day changes.

Domain language lives in [CONTEXT.md](CONTEXT.md); architectural decisions in [docs/adr/](docs/adr/); how the site looks — palette, fonts, type scale, layout rules — in [docs/design.md](docs/design.md).

## Environments

There are exactly two environments:

- **Local** — `npm run dev`, Astro's dev server with hot reload. This is where the site's look is checked. The **Вірш дня** picker accepts a date override in dev (e.g. `?date=2026-03-14`) so any day of the year, including the fallback case, can be checked without waiting for it.
- **Production** — Cloudflare Pages, built from `master` only.

Branches:

- `master` is production. Every push to `master` builds and deploys.
- **Content goes straight to `master`.** Publishing a poem, revising the bio or replacing the portrait is a commit to `master` — from a local clone, or from GitHub's web editor when away from the computer. Content can't break the frame, and the build rejects broken content before it deploys, so there is nothing for `develop` to stage.
- **Code goes through `develop`**, the working branch, merged into `master` to go live. Because content commits land on `master` alone, merge `master` into `develop` before starting code work, so the two never drift into conflicts.
- Any other branch gets a throwaway Cloudflare preview URL automatically. Previews are not an environment — they exist only to check a change on a real phone before it is live, including a content edit worth seeing before it goes up.

**Deferred: a git-backed admin panel.** A web form that edits the same content files and makes the same commits to `master`, with an upload button for photographs, is possible on top of this setup (ADR-0001 chose Astro partly to keep that door open). It has not been decided on and is not planned work. Revisit it only when editing content on GitHub becomes a real pain, for example when uploading a **News** item's photographs one by one becomes tedious, or when hand-editing a **Cycle**'s list of poems starts producing mistakes. Content stays in plain files with schemas either way, so nothing built before then needs undoing.

A scheduled GitHub Actions workflow rebuilds `master` every night at 21:00 UTC (midnight Kyiv in summer, 23:00 in winter), so **Вірш дня** rolls over and expired **Hot take** promotions drop off. All date logic uses `Europe/Kyiv` explicitly, never the build machine's clock.

## Testing

Only logic that would fail silently is tested:

- **Vitest unit tests** for the **Вірш дня** picker, the **Hot take** resolver, the rule deciding whether a **Share**/**Pin** image shows the full poem or its opening lines, and the news feed's ordering — which **Announcements** count as upcoming on a given Kyiv date, and where a **Bumped** one lands among the **News**. All three are pure functions that take the date and content as arguments, so tests need no clock mocking.
- **Content rules are build failures, not tests** — every **Poem** in exactly one **Cycle**, unique slugs, every **Announcement**/**News** pointing at an existing **Event**, no Latin look-alike letters inside a Cyrillic word (a stress mark is always a Cyrillic vowel followed by U+0301), no **Bump** date earlier than the **Announcement**'s own publication date. They run on every build, so broken content cannot reach production.
- No end-to-end or visual regression tests; the local dev server is the visual check.

- **Stylelint** rejects a colour literal anywhere outside the theme file, so every colour goes through a theme variable (see [docs/design.md](docs/design.md#theme)).

The GitHub Actions workflow runs `astro check` and Stylelint, then Vitest, then the build — on every push to `master` and on the nightly schedule. Cloudflare receives a deploy only if every step passes; otherwise production stays on the last good version.

If the nightly run fails, production is safe but **Вірш дня** freezes on the previous day. GitHub's failure email is the alert — make sure it isn't filtered out.
