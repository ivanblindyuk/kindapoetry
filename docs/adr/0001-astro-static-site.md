# Astro as a statically generated site, not an Angular app

The **Poet** is an Angular developer by trade, so the expected choice would have been Angular — either plain Angular with `@angular/ssr` prerendering, or Analog.js for Markdown-driven static generation. We chose **Astro**, generating a fully static site, instead.

Nothing on this site is per-**Reader** or per-request: a **Poem** page is fixed text, and the only thing that changes on its own is **Вірш дня**, which changes once a day and is handled by a scheduled nightly rebuild. Angular's value is runtime machinery — DI, change detection, routing, reactive state — and none of it is needed here, so choosing it would mean shipping a framework runtime to a reader who came to read a poem. Astro ships zero JavaScript by default, which matters because `CONTEXT.md` twice requires **Poems** to be discoverable *by their own text*.

The deciding factor beyond that was Astro's **Content Collections**: each domain type (**Poem**, **Translation**, **Cycle**, **Announcement**, **News**, **Event**) becomes a collection with a schema validated at build time, so rules like "every **Poem** belongs to exactly one **Cycle**" fail the build rather than surviving as a convention. The Angular options would have required hand-rolling that layer.

## Considered options

- **Analog.js** — would have kept the **Poet** in familiar Angular idiom and made him productive immediately. Rejected for the runtime cost above, the absence of a typed content layer, and a much smaller ecosystem to lean on when stuck.
- **Angular + `@angular/ssr` prerendering** — same objections, plus a Markdown content pipeline built from scratch.
- **Eleventy / Hugo** — lighter, but no typed content schemas and no upgrade path to a git-backed admin panel.

## Consequences

- The site needs a **scheduled nightly build** on the host; without it, **Вірш дня** would freeze on whatever day the site was last deployed.
- Publishing is a commit, not a save — including operational acts like promoting or un-promoting an item on the **Hot take** page, which go live only after a rebuild.
- The **Poet**'s Angular knowledge largely does not transfer. This was accepted deliberately as a one-off learning cost.
