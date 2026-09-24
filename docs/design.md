# Visual design

Decisions about how the site looks. Domain language stays in [CONTEXT.md](../CONTEXT.md); this file only records look-and-feel choices as they are settled.

## Character

A printed poetry book, with a little room for the modern. The poem is the only thing on its page and nothing competes with the text, but the site is not a literal imitation of a book: plain black-on-white that could pass for a scanned page is explicitly not the goal.

## Colour

The site is simple and has minimal functionality, so its palette is deliberately small. Four colours, each with one job:

- **Paper** — the background, `#E6E6E9`.
- **Ink** — all text: blue-black `#1F2230` (12.7:1 on the paper). Dark enough to read as print, tinted enough not to be plain black. Secondary text (dates, the original author on a **Translation**, the footer) is the same ink at lower strength, not a separate colour.
- **Accent** — deep teal `#0F5E63` (6.0:1). Links in body text, hover and focus on anything clickable, and the current page in the navigation. Nothing else: it keeps its force only by being rare. Not on titles, not on **Share**/**Pin** controls, not on the **Finished** marker of a **Cycle**.
- **Signal** — terracotta `#9C4A22` (4.9:1), the site's one raised voice, used for the "Анонс" tag and nothing else. Since only **upcoming Announcements** are listed, it always means "this is still to come". The tag's border is the lighter terracotta `#BE6E46`, which needs only 3:1 as a graphic element rather than text.

Every one of these is coloured *text*, so each clears 4.5:1 on the paper. That floor is why terracotta is deepened: `#BE6E46` as text is 3.1:1 and genuinely hard to read at tag size.

## Poem titles

A **Poem**'s title is set apart the way a book does it — by size, surrounding space and typeface — in ink. It never uses the accent colour or its own background: titles appear everywhere, and an accent spent on all of them would stop meaning anything.

The opening fragment standing in for an untitled **Poem**'s title is styled exactly as a title. It *is* the poem's name.

## Fonts

Every font must render Ukrainian correctly — including **ґ, є, і, ї** — and must render **stress marks** on vowels (а́, е́, є́, и́, і́, ї́, о́, у́, ю́, я́) in both lower and upper case: the accent sits centred over its letter, clears capitals, and replaces the dot on і rather than colliding with it. A font that fails this is out, however good it looks otherwise.

Two typefaces, each a theme variable:

- **Text** — a **serif**, for the body of **Poems** and **Translations**. This is what makes a page read as a book.
- **Display** — a **sans-serif**, for titles and the site's chrome (navigation, labels, dates, footer). This is where the modern touch lives, and it gives titles their contrast with the poem.

Chosen after rendering every candidate against the stress-mark test (all vowels, both cases, stressed words, italic):

- **Text:** Gentium Book Plus (SIL), a face designed for correct diacritic placement.
- **Display:** Montserrat. It was the only one of eight sans candidates (Onest, Inter, Manrope, Golos Text, IBM Plex Sans, Commissioner, Geologica, Montserrat) that rendered every stressed letter correctly.

A "supports Cyrillic" label proved nearly worthless for this test. Any replacement font must be checked visually against the same stressed test strings before it is adopted.

Fonts are **self-hosted**, served with the site, never loaded from Google Fonts or any other third party. Fetching them from an outside server would hand every **Reader**'s address to that server on every visit, which contradicts the site's promise never to track an individual **Reader**. Self-hosting also keeps control of which characters the font files contain. The combining stress mark (U+0301) must ship in the same file as the Cyrillic letters, or accents fall back to another font.

## Measure and width

- **Prose** — **News**, the About page, a **Translation**'s original text — sits in a column of about 65 characters.
- **A Poem's block is as wide as its own longest line**, not a fixed column. The block is centred on the page while the lines inside it stay left-aligned, the way a poetry book sets a short-lined poem in the middle of the page rather than against the left margin. Pages therefore do not all share one column edge — the **Poem** sets its own width, and that is intended.
- **A line too long for the screen wraps with a hanging indent**, the printed convention, so a **Reader** can see the continuation is not a new line. Line breaks belong to the **Poet**: the site never shrinks the text to make a line fit, and never lets a line run off the side.

## Adaptive layout

The layout is **fluid**, not a set of fixed layouts switching at breakpoints: sizes are relative and text scales smoothly between phone and desktop, so there is no width at which the page looks wrong. There is almost nothing to rearrange — one column of text, a one-line header, a footer — so breakpoints have little to do, and a **Poem**'s content-driven width is fluid by nature.

The header is the one place that changes shape. On a wide screen it is a single line: **Іван Блиндюк** on the left, the four links on the right. On a phone it becomes **two lines** — the name, then the four links in one row beneath it, all of which fit at 360px. They are never hidden behind a button: with four destinations the menu is the site map, and it costs one line to show it. A stacked list, one link per line, was considered and rejected for taking about a fifth of a phone screen before the poem begins.

Every page works from a narrow phone up to a wide desktop screen. Phones are the common case, not the fallback: a **Shared** link is usually opened in a messenger on a phone, and a **Pin** leads back from Pinterest the same way. A change is checked at phone width before it is considered done.

## Type scale and spacing

A starting point, to be adjusted once real **Poems** are on the site. Six sizes, each fluid between phone and desktop, and nothing outside this set:

| Role | Phone → desktop | Face |
| --- | --- | --- |
| Poem text | 17 → 20px, line height 1.65 | Gentium Book Plus |
| Prose (**News**, About, a **Translation**'s original) | 16 → 18px, 1.6 | Gentium Book Plus |
| Poem / page title | 26 → 38px, 1.15 | Montserrat 600 |
| List item title (a **Poem** in the **Вірші** list, a feed entry) | 19 → 23px, 1.25 | Montserrat 600 |
| Chrome (navigation, dates, **Cycle** names) | 14 → 15px | Montserrat 400 |
| Tag and label | 11px fixed, uppercase, letter-spaced | Montserrat 600 |

The **poem text is the anchor** — every other size is chosen against it, not against a heading scale — and it is larger than a typical website's body text because a poem is read slowly in short lines. Its 1.65 line height is looser than prose for the same reason; a stanza break is about one and a half line heights, so stanzas read as units without drifting apart. The space between a title and the poem's first line is generous (about 52px on a desktop), the way a book sets it.

**Spacing steps: 4, 8, 12, 20, 32, 52, 84px**, each roughly one and a half times the last. Every gap on the site is one of these; no component invents its own. The consistent vertical rhythm is most of what makes a page feel calm.

## Links and states

| State | Appearance |
| --- | --- |
| Link in body text | Accent, permanently underlined, the underline offset clear of descenders |
| Hover | The underline thickens, 1px → 2px; the colour does not change |
| Keyboard focus | A visible 2px accent outline, on every focusable thing, never removed |
| Visited (lists only) | Faded ink `#5C5E6A` |
| Navigation link | Ink, so the header stays quiet; hover underlines it |
| Current page in navigation | Accent, with a 2px underline beneath |
| A **Poem**'s title in a list | Ink, no underline; hover underlines it; the whole row is clickable |
| **Share** / **Pin** | Small ink icons; hover and focus turn them accent |

**Links keep their underline.** Colour alone is not enough for a **Reader** who cannot separate teal from blue-black ink, and an underline is how print has always marked a reference.

**A visited link fades** — faded ink `#5C5E6A` (5.2:1), the same ink at lower strength rather than a new colour. It applies to links pointing at a published item in a list (**Poems** in the **Вірші** list and on a **Cycle** page, **Translations**, entries in the news feed) and not to links inside body text. A **Reader** working through a **Cycle** poem by poem, going back and forth, can otherwise lose track of what they have already read; a read **Poem** should look settled, not disabled. Nothing about this reaches the site: visited state lives in the **Reader**'s own browser, which is also why the signal must be a colour — browsers allow `:visited` to change only colours, never weight, opacity or an added mark.

A **Poem**'s title in a list stays ink rather than accent: every title there is a link, and colouring them would turn the **Вірші** page almost entirely teal and spend the accent that the site keeps rare.

## Theme

Every colour and every font is defined once, as a named theme variable, and used everywhere through that name — never as a literal value in a component. The first choices are expected to be revisited; changing the ink colour or the body font must be a one-line edit.

**No dark mode, deliberately deferred.** The site's identity is paper, and a second palette would mean choosing and testing four more colours before the first one has been seen in use. Because nothing hard-codes a colour, adding one later means redefining the four variables inside a `prefers-color-scheme` block, with no component touched. A manual light/dark switch is ruled out for a different reason: it needs a control, JavaScript and per-**Reader** browser storage on a site that otherwise ships none of the three.

## Open

Decisions not yet made. Anything here that turns out to be *work* belongs in the issue tracker; what is listed is the decision still owed.

- **Motion.** Nothing on the site animates, not even a hover transition, and that may well be right for a book. But it should be a stated choice rather than an omission, or a hover underline that snaps will read as unfinished. Any motion added later needs a `prefers-reduced-motion` guard.
- **Favicon and browser tab.** Undecided, and something has to be there. A letter or a small mark is the usual answer for a site like this.
- **Print.** A **Reader** printing a **Poem** or saving it as a PDF is likelier here than on most sites. With no print stylesheet they get the navigation and footer wrapped around the poem.
- **The type scale is provisional** — see above. Revisit once real **Poems** are on the site and the poem text can be judged at its real size.
- **Dark mode** — deferred, not rejected. Revisit if **Readers** turn out to read at night, which the site cannot itself measure.
- **Per-page layout** — the **Poem**, **Cycle**, **News**, **Announcement** and About pages; how a **Photograph** and an embedded **Video** are sized and captioned; the design of the **Share** and **Pin** images. Each is its own session, and each is constrained by everything above.
