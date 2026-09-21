# Kinda Poetry

The personal site of one poet. It exists so that he can publish his own poems and keep readers informed about where his work appears in the world. There is exactly one author; readers only read.

## Language

### People

**Poet**:
The single author of everything on the site — the site's owner and only publisher.
_Avoid_: Admin, user, author account

**Reader**:
Anyone who visits the site. Has no account and creates nothing. The site counts visits only in aggregate (how often a page is read, and where **Readers** arrived from) and never tracks an individual **Reader** or asks them to accept cookies.
_Avoid_: User, visitor account, member

### Published things

**Poem**:
A work of poetry by the **Poet**, published for its own sake rather than as news about anything. Every **Poem** has its own dedicated, permanent page with a stable URL, discoverable by search engines and by the text it contains. A **Poem** may be untitled; when it is, the **Poet** hand-picks a short opening fragment (ending in "…") to stand in for a title — never a placeholder like "***", since that would make the poem undiscoverable by its own text.
_Avoid_: Post, article, entry

**Translation**:
The **Poet**'s rendering of another poet's poem into a different language (Ukrainian↔English, either direction) — a distinct published thing, not a **Poem**. Its page shows the **Poet**'s translation — with a translated title, body, and the date translated — followed by the original poem's title, body, original author, and optional year of publication, stored and displayed in full on the same page rather than linked out. Lives in its own dedicated list, not a **Cycle** — though the **Poet** may introduce Translation-specific cycles in the future. When a **Translation** is **Shared** or **Pinned**, its image carries only the **Poet**'s translation, always credited to the original author by name; the original text stays on the page.
_Avoid_: Post, article, entry, Poem

**Cycle**:
A named grouping of **Poems** chosen by the **Poet**, in a manual reading order the **Poet** controls (not automatically chronological). Every **Poem** belongs to exactly one **Cycle** — poems that don't fit a thematic group go into a catch-all **Cycle** ("Інші" / "Поза циклом") rather than having no **Cycle** at all. **Translations** do not belong to a **Cycle** (for now). A **Cycle** can be marked **Finished** by the **Poet** — a display label only ("not actively growing"), not a lock; the **Poet** can still add a **Poem** to a **Finished** **Cycle** later.
_Avoid_: Category, collection, series

**Announcement**:
Notice of an event the **Poet** will take part in, published before the event happens, carrying a promotional image. Has its own dedicated, permanent page, like a **Poem**.
_Avoid_: Upcoming post, teaser

**News**:
An account of an event that has already happened, published after the fact, carrying photographs and video. Has its own dedicated, permanent page, like a **Poem**.
_Avoid_: Blog post, report, update

**Event**:
A real-world occasion the **Poet** takes part in — a reading, a festival, a launch — stored as its own minimal record (name, date, location) so its **Announcements** and **News** share one source of truth instead of duplicating that metadata. Media and links live on the **Announcement**/**News** items themselves, not on the **Event**. An **Event** may have multiple **Announcements**.

### Addresses

Every published thing lives at a flat, permanent address made from words, not numbers: `/poems/veresnevyi-doshch`, `/news/…`, `/translations/…`. The address is chosen once, by hand, when the thing is first published, and never changes afterwards — revising a **Poem**'s title, or the opening fragment standing in for an untitled one, leaves its address alone. A **Poem**'s address does not mention its **Cycle**, so moving a **Poem** between **Cycles** never breaks a link a **Reader** has already **Shared**.

### Media

**Photograph**:
An image published on a **News** item, or the promotional image on an **Announcement**. Always the **Poet**'s own to publish, and stored with the site itself rather than on an outside service.

**Video**:
A video shown on a **News** item. Always a **YouTube** video, embedded and played on the page — it makes no difference whether the **Poet** filmed it or someone else did, and no credit is shown either way.

Nothing else is embedded. A recording on Facebook, a television segment, a news portal's player or a press article is written as an ordinary link in the **News** item's own body text — not modelled as a **Video**, and never hung on the **Event**.

### The site's language

The site speaks **Ukrainian**. Navigation, section headings, the **news page**, **Announcements**, **News**, the About-me page and every other piece of chrome are written in Ukrainian only; there is no English version of the site and no parallel translated pages.

Language is instead an attribute of an individual published text. A **Poem** is usually Ukrainian; a **Translation** is Ukrainian or English depending on which direction the **Poet** rendered it, and its page carries both a translated text and an original text that may be in different languages from each other. English appearing on the site is therefore the language of *some content*, never the language of the site.

### Dates and time

Every date on the site is a **Kyiv** date. A **Poem**'s written date is the day the **Poet** finished it in Kyiv; **Announcements**, **News** and **Events** are dated the same way; **Вірш дня** rolls over at midnight Kyiv, not at midnight anywhere else. There is no per-**Reader** local time anywhere on the site — a **Reader** in another country sees Kyiv dates.

### The news page

Lists **Announcements** and **News** together in one feed, newest published first, each labeled with its kind so a **Reader** can tell them apart at a glance. A filter lets the **Reader** narrow the feed to just **Announcements** or just **News**.

### The home page

**Вірш дня** ("Poem of the day"):
The default content of the **Hot take** page, picked automatically with no input from the **Poet**: a random **Poem** or **Translation** written/translated on today's calendar date in an earlier year; if none exists, a random one written/translated 3–9 months ago (by calendar date, any year). The pick is **stable for the whole calendar day** — every **Reader** sees the same one all day, and refreshing does not re-roll it. It is a poem *of the day*, not a shuffle.

**Hot take**:
The site's home page. Shows exactly one item at a time — never several side by side. By default that item is **Вірш дня**. The **Poet** may explicitly promote a specific **Announcement** or **News** item to the **Hot take** page, which then takes over from **Вірш дня**. Promotion ends automatically — for an **Announcement**, once its **Event** has passed; for **News**, seven days after it was published — but the **Poet** can also un-promote either one manually at any time before that.

### Actions

**Share**:
A **Reader** sending a link to a published page (**Poem**, **Translation**, **Announcement**, or **News**) to their own social media or privately to another person, via a share action on the page (e.g. native share sheet). Not counted or tracked by the site — it is only the act of invoking that action, nothing more.

What arrives is a link with a preview. For a **Poem** or **Translation**, the preview shows the whole poem when it fits legibly, otherwise its opening lines. For an **Announcement** or **News** item, it is an ordinary link card with the item's own image, because there the point is getting the **Reader** to follow the link for the details.

A **Share** always carries the **permanent page** of the item itself, never the page the **Reader** happened to be looking at. Sharing from the **Hot take** page shares the **Poem**, **Translation**, **Announcement** or **News** currently shown there — with its own stable URL — not the site's home address. The **Hot take** page is a window onto an item, not a home for it.
_Avoid_: Pin (a different action)

**Follow**:
A **Reader** subscribing to the site's feed in a feed reader (or a tool built on one), to learn about new things without revisiting. There is one feed carrying everything the **Poet** publishes — **Poems**, **Translations**, **Announcements** and **News** — newest first. Following needs no account and gives the site nothing about the **Reader**; there is no newsletter.
_Avoid_: Subscribe (implies an account or an email address)

**Pin**:
A **Reader** saving an image of a **Poem** or **Translation** to Pinterest, linking back to its permanent page. Unlike a **Share** preview, the image shows the **full** poem — unless the poem is too long to stay legible in a Pinterest-shaped image, in which case it falls back to the opening lines, like a **Share**. Only **Poems** and **Translations** can be **Pinned**; **Announcements** and **News** can only be **Shared**. Not counted or tracked by the site.
_Avoid_: Share (a different action)

## Relationships

- The **Poet** publishes **Poems**, **Translations**, **Announcements** and **News**
- A **Poem** belongs to exactly one **Cycle**, in a manual order the **Poet** sets; **Cycles** themselves also appear in a manual order the **Poet** sets
- An **Announcement** looks forward to exactly one **Event**; an **Event** may have many **Announcements**
- A **News** item looks back on exactly one **Event**; an **Event** may have many **News** items
- A **Reader** may **Share** a **Poem**, **Translation**, **Announcement**, or **News** item, and may **Pin** a **Poem** or **Translation**, but cannot publish anything
- The **Poet** may promote one **Announcement** or **News** item to the **Hot take** page at a time, overriding **Вірш дня**

## Example dialogue

> **Dev:** "The festival was last night. The **Announcement** for it is still on the front page — should it disappear?"
> **Poet:** "No, it should stay, but it's not news yet. I'll write about how it went in a day or two, with the photos."
> **Dev:** "So the **Announcement** and the **News** are two separate things about the same **Event**, both permanent?"

## Footer

Every page shows the fixed text "Авторські права застережено" plus a copyright notice with the current year only (e.g., "© 2026") — no "since" year, just whatever year it is now.

## Flagged ambiguities

- **The About-me page's shape isn't settled.** It will hold photo(s), a bio, and social links at minimum, but the **Poet** also wants room for things like links to marketplaces selling his books, band lyrics, a Wikipedia page — an open-ended, growing set of sections rather than a fixed list of fields. *Revisit once the actual content it needs to hold is clearer; don't force a rigid schema now.*
