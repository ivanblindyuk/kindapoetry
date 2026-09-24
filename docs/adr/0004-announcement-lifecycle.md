# A past Announcement leaves the feed but keeps its page; a Bump moves it without rewriting its date

An **Announcement** is **upcoming** while its **Event** lies ahead by Kyiv date and **past** afterwards, derived at build time from the **Event** rather than set by hand, and flipping on its own at the nightly rebuild. Only **upcoming Announcements** are listed on the **news page**; a **past** one drops out of the feed but keeps its permanent page forever, which then states that the **Event** has happened and links to the **News** about it when that exists. Separately, the **Poet** can **Bump** an **upcoming Announcement** to remind **Readers** about an **Event** announced months ago: the item carries a second date, the feed orders it by the later of publication and **Bump**, and nothing else changes.

Both halves exist for the same reason — the feed should show only what is still worth a **Reader**'s attention — while the permanent page exists because a **Reader** may already have **Shared** it. Keeping past **Announcements** listed would fill the feed with notices for events long finished and would make the "Анонс" tag meaningless as a "coming soon" signal, since most tagged items would be in the past. Deleting them instead would break every **Shared** link and every search result, which [ADR-0002](0002-permanent-word-slugs.md) rules out.

## Considered options

- **Rewrite the publication date on a Bump** — one field instead of two, and the feed sorts naturally. Rejected because the publication date is displayed and permanent: a notice written in March would claim it was published in September, on a page that can be **Shared** and is never taken down.
- **Let News be Bumped too** — the same field on both. Rejected as meaningless: an account of something that already happened has no reason to resurface.
- **Order the whole feed by the date that matters** (the **Event**'s date for **Announcements**, publication for **News**) so upcoming events float up without any manual act. Rejected because the **Poet** wants to choose *when* to remind — an event announced six months ahead should sink and be raised deliberately, not sit at the top for half a year.
- **A "Незабаром" group pinned above the feed** instead of the tag. Rejected because the **Hot take** page shows a referenced item with no group around it: what identifies an item has to travel with the item, not with the list it happens to sit in.

## Consequences

- The **Follow** feed deliberately ignores **Bumps** and always orders by true publication date, so subscribers are never delivered the same **Announcement** twice. **Bumping** is a website act, not a publishing one.
- Which **Announcements** are listed changes without anyone committing anything, so the nightly rebuild is now load-bearing for the news page as well as for **Вірш дня**. A failed nightly run leaves a finished event advertised as upcoming.
- The date rules are pure functions of the content and the Kyiv date, and are unit-tested: silently showing the wrong set of items would otherwise still build and still look right.
- A **Bump** date earlier than the item's publication date does nothing and is almost certainly a typo, so the build rejects it.
