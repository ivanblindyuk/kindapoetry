# Kinda Poetry

The personal site of one Ukrainian poet: his poems arranged in cycles, his translations, and news and announcements about the events he takes part in. It's a Ukrainian-language static site built with Astro, with content kept as Markdown in this repo, deployed to Cloudflare Pages and rebuilt every night so the poem of the day changes.

Domain language lives in [CONTEXT.md](CONTEXT.md); architectural decisions in [docs/adr/](docs/adr/).

## Environments

There are exactly two environments:

- **Local** — `npm run dev`, Astro's dev server with hot reload. This is where the site's look is checked. The **Вірш дня** picker accepts a date override in dev (e.g. `?date=2026-03-14`) so any day of the year, including the fallback case, can be checked without waiting for it.
- **Production** — Cloudflare Pages, built from `master` only.

Branches:

- `master` is production. Every push to `master` builds and deploys; publishing a poem is a commit to `master`.
- `develop` is the working branch, merged into `master` to go live.
- Any other branch gets a throwaway Cloudflare preview URL automatically. Previews are not an environment — they exist only to check a change on a real phone before it is live.

A scheduled GitHub Actions workflow rebuilds `master` every night at 21:00 UTC (midnight Kyiv in summer, 23:00 in winter), so **Вірш дня** rolls over and expired **Hot take** promotions drop off. All date logic uses `Europe/Kyiv` explicitly, never the build machine's clock.

## Testing

Only logic that would fail silently is tested:

- **Vitest unit tests** for the **Вірш дня** picker, the **Hot take** resolver, and the rule deciding whether a **Share**/**Pin** image shows the full poem or its opening lines. All three are pure functions that take the date and content as arguments, so tests need no clock mocking.
- **Content rules are build failures, not tests** — every **Poem** in exactly one **Cycle**, unique slugs, every **Announcement**/**News** pointing at an existing **Event**. They run on every build, so broken content cannot reach production.
- No end-to-end or visual regression tests; the local dev server is the visual check.

The GitHub Actions workflow runs `astro check`, then Vitest, then the build — on every push to `master` and on the nightly schedule. Cloudflare receives a deploy only if all three pass; otherwise production stays on the last good version.

If the nightly run fails, production is safe but **Вірш дня** freezes on the previous day. GitHub's failure email is the alert — make sure it isn't filtered out.
