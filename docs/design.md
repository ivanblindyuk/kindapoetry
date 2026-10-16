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

The files come from the `@fontsource` npm packages: copies of the Google Fonts files, installed with npm and served from the site's own domain, with the version pinned so a font changes only on a deliberate upgrade. Only the Cyrillic and Latin subsets are loaded. The weights are Gentium Book Plus regular, italic and bold, and Montserrat 400 and 600, the only two the type scale uses. A dev-only page renders every stressed vowel in both cases, in both faces, regular and italic, so a font upgrade is checked the same way the fonts were chosen. It never ships to production.

## Measure and width

- **Prose** — **News**, a **Translation**'s original text — sits in a column of about 65 characters. Provisional for **News**: it is settled when the **News** page is built.
- **The About page** is as wide as the header. It is composed rather than running prose: the bio sits beside the portrait, which takes about 30% of the width, so the bio's lines come to about 75 characters (see below).
- **A Poem's block is as wide as its own longest line**, not a fixed column. The block is centred on the page while the lines inside it stay left-aligned, the way a poetry book sets a short-lined poem in the middle of the page rather than against the left margin. Pages therefore do not all share one column edge — the **Poem** sets its own width, and that is intended.
- **A line too long for the screen wraps with a hanging indent**, the printed convention, so a **Reader** can see the continuation is not a new line. Line breaks belong to the **Poet**: the site never shrinks the text to make a line fit, and never lets a line run off the side.

## Adaptive layout

The layout is **fluid**, not a set of fixed layouts switching at breakpoints: sizes are relative and text scales smoothly between phone and desktop, so there is no width at which the page looks wrong. There is almost nothing to rearrange — one column of text, a one-line header, a footer — so breakpoints have little to do, and a **Poem**'s content-driven width is fluid by nature.

Two things change shape: the header, and the portrait on the About page (see below). On a wide screen it is a single line: **Іван Блиндюк** on the left, the four links on the right. On a phone it becomes **two lines** — the name, then the four links in one row beneath it, all of which fit at 360px. They are never hidden behind a button: with four destinations the menu is the site map, and it costs one line to show it. A stacked list, one link per line, was considered and rejected for taking about a fifth of a phone screen before the poem begins.

Every page works from a narrow phone up to a wide desktop screen. Phones are the common case, not the fallback: a **Shared** link is usually opened in a messenger on a phone, and a **Pin** leads back from Pinterest the same way. A change is checked at phone width before it is considered done.

## Type scale and spacing

A starting point, to be adjusted once real **Poems** are on the site. Seven sizes, each fluid between phone and desktop, and nothing outside this set:

| Role | Phone → desktop | Face |
| --- | --- | --- |
| Poem text | 17 → 20px, line height 1.65 | Gentium Book Plus |
| Prose (**News**, About, a **Translation**'s original) | 16 → 18px, 1.6 | Gentium Book Plus |
| Poem / page title | 26 → 38px, 1.15 | Montserrat 600 |
| List item title (a **Poem** in the **Вірші** list, a feed entry) | 19 → 23px, 1.25 | Montserrat 600 |
| Chrome (navigation, dates, **Cycle** names) | 14 → 15px | Montserrat 400 |
| Caption (a **Photograph**'s credit) | 12 → 13px | Montserrat 400 |
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

**A link to another site opens in a new tab**, so a **Reader** following a profile link or a press article still has the page they were reading. Links within the site open in the same tab.

**Links keep their underline.** Colour alone is not enough for a **Reader** who cannot separate teal from blue-black ink, and an underline is how print has always marked a reference.

**A visited link fades** — faded ink `#5C5E6A` (5.2:1), the same ink at lower strength rather than a new colour. It applies to links pointing at a published item in a list (**Poems** in the **Вірші** list and on a **Cycle** page, **Translations**, entries in the news feed) and not to links inside body text. A **Reader** working through a **Cycle** poem by poem, going back and forth, can otherwise lose track of what they have already read; a read **Poem** should look settled, not disabled. Nothing about this reaches the site: visited state lives in the **Reader**'s own browser, which is also why the signal must be a colour — browsers allow `:visited` to change only colours, never weight, opacity or an added mark.

A **Poem**'s title in a list stays ink rather than accent: every title there is a link, and colouring them would turn the **Вірші** page almost entirely teal and spend the accent that the site keeps rare.

## The About page

The portrait comes first, directly under the page heading, **set to the right at about 30% of the page's width, with the bio wrapping down its left side**. The page runs the full width of the header, so beside the portrait the bio keeps a comfortable line of about 75 characters; at 40% the portrait dominated the page. Text that runs on past the bottom of the portrait gets long lines of about 110, so the bio is best kept no longer than the portrait is tall; if it grows past that, widening the portrait is the first remedy. An upright photo centred on its own would stand in a strip of empty paper on either side; wrapped, it reads the way a book jacket sets an author note. It is on the right rather than the left so that every line of the bio starts at the same left edge. The books and the links begin below the photo, never beside it.

**On a phone the portrait stacks** above the bio at the column's full width, with no wrapping: beside a photo at that size a line would hold three or four words.

The photo is shown in its own proportions, uncropped, with square corners and no frame or shadow; a circular crop would read as a social-media avatar. Its credit, when there is one, sits beneath it in the faded secondary ink. An upright or square photo is the convention, since a wide one would make the face small. Like the links below, the placement is accepted subject to approval by eye on the built page.

The links to the **Poet** elsewhere are **words, not icons**: a plain list in which each link names the place it leads to ("Instagram", "Facebook"), styled as any other link in body text. A row of brand logos would be the loudest thing on the site, on its quietest page, and would need image files kept in step with each platform's rebranding. Official follow buttons and embedded profile widgets are ruled out whatever the links look like, since they report every **Reader**'s visit to the platform.

This is accepted subject to seeing it: the word list must be approved by eye on the built page. If it does not work, the alternative is small ink icons, optionally redrawn to suit the site, behaving like **Share** and **Pin**.

## The Poem page

Top to bottom: the title, the **Dedication**, the **Epigraph** with its source, the text, the written date, then **Share** and **Pin**. Below a quiet divider comes the **Poem**'s place in its **Cycle**, "З циклу «…»" (or its **Role**: "Пролог до циклу «…»", "Епілог до циклу «…»"), linking to the **Cycle**, and the way to the neighbouring **Poems**. The poem comes first, so a **Reader** arriving from a **Share** meets it before anything about where it belongs. **Share** and **Pin** sit where the reading ends, which is when a **Reader** wants to pass the poem on. The page carries no author name, since the header already gives it. An **untitled Poem** shows no heading: its text starts where a title would stand, with the same space above it. The opening fragment remains the page's heading for screen readers and search engines, just not drawn above the identical first line.

The **Dedication**, the **Epigraph** and the written date are all **set to the right edge of the poem's block**, in the faded secondary ink, as a book sets them. The **Dedication** and **Epigraph** are small italic. The written date is at chrome size and comes after the last stanza, never as a byline above the poem. The way to the neighbouring **Poems** follows the **Cycle**'s reading order and **stops at the Cycle's edges**: the first **Poem** has no previous link and the last has no next, and a **Cycle** of one has neither. At the edges, the link to the **Cycle** is the way onward. Finishing a **Cycle** should feel like closing a section of a book, not drifting into the next one. Each link **names the neighbouring Poem by its title** (or opening fragment), wrapping rather than truncating, and a visited neighbour fades like any read **Poem** in a list.

**Share** opens the device's own share sheet, which on a phone is where the messengers are. A browser without one, as most desktop browsers are, **copies the link** instead, and the icon confirms with "Посилання скопійовано". **Pin** is not on the page yet: a **Pin** *is* its image, and it arrives together with the **Pin** image rather than as a button pinning nothing. When it comes, it is a plain link to Pinterest, never Pinterest's own button, which reports every visit. Until the **Share** image is designed, a **Shared** **Poem** arrives as a text card: its title, with its opening lines as the description.

As plain text, which is the card's description and the page's meta description, a **Poem**'s **opening lines** are its first stanza, at most four lines. The lines are joined by " / ", the way verse is quoted inline, and the text ends in "…" when anything was left out. The cut always falls between lines, never inside a word. A platform that shortens the text further does so on its own. The **Share** and **Pin** images have their own rule for what fits.

A **Poem** rarely has both a **Dedication** and an **Epigraph**, so they are not designed to sit together. The block's width comes from the poem's lines alone. An **Epigraph** wider than that runs past the block's left edge rather than widening the poem.

## Вірші and the Cycle page

**A Poem's row in a list**, on **Вірші** and on a **Cycle**'s page alike, is its title (or opening fragment) and nothing else, plus its **Role** when it has one: "Пролог" or "Епілог", a small faded label in the chrome face after the title. A row carries **no written date**: a **Cycle**'s order is the **Poet**'s and not chronological, and a date on every row would invite reading the list as a timeline while doubling its height on a phone.

**The Cycle page** shows the **Cycle**'s name as its title; a **Finished** **Cycle** has "Завершено" beneath it, a plain faded line at chrome size, never a tag, which is reserved for "Анонс". Then comes its **Dedication** set to the right in faded small italic as on a **Poem** page, then its **Description** as prose in the 65-character column, then its **Poems**. **Вірші** shows only each **Cycle**'s name, linking to its page, with its **Poems** beneath; **Finished** is not marked there.

**Вірші is set like a book's contents page.** Each **Cycle**'s name is a small heading at chrome size, uppercase and letter-spaced, in ink, at the column's left edge; hover underlines it. Its **Poems**' titles sit beneath it at list-item size, **indented 32px**, and a title that wraps continues at the indent, never back under the **Cycle**'s name. The **Poem** titles are the largest thing in the list, since they are what a **Reader** chooses between; the indent, not size, says which **Cycle** they belong to. Rows within a **Cycle** are 12px apart and **Cycles** 52px apart. The list is left-aligned in the 65-character column, centred on the page, rather than taking its width from its contents as a **Poem** does. A **Cycle**'s page indents its list the same way under its title, so a list looks alike wherever it appears.

**A Cycle page has no way to the previous or next Cycle**, and no breadcrumb. Moving between **Cycles** is what **Вірші** is for, and a "next **Cycle**" link would bring back, one level up, the drift the **Poem** page's neighbour links deliberately stop. **Вірші** is the current item in the header on **Вірші** itself, on every **Cycle** page and on every **Poem** page, since all of them belong to that section.

The link card and meta description of a **Cycle** carry the first paragraph of its **Description**, stress marks stripped, cut at the last sentence end before about 160 characters (or, with none, at the last word, ending in "…"); or the fixed phrase "Цикл віршів Івана Блиндюка" when there is none. A list of its **Poem** titles was considered and left out: the titles are already on the page, which is what search engines index, and the meta description does not affect ranking. A **Cycle** that wants a better card gets a **Description**. **Вірші** has no introduction on the page, only its heading and the list; its link card and meta description are one fixed line written by the **Poet**.

## Motion

**Nothing on the site moves.** Every state change is instant: a hover underline appears at once, and so does the thickening and the colour change on **Share** and **Pin**. Nothing on a printed page animates either. This is a decision, not an omission, and it holds everywhere: one component that eases while the rest snap would look like a mistake. If an instant change ever feels abrupt, a short transition on hover states is a one-line change in the theme file, and it must then be switched off under `prefers-reduced-motion`.

## Script

The site ships **almost no JavaScript**. A script is allowed only for an action the browser cannot do without one, such as **Share**. It is small and inline, loads no library and nothing from another server, and the page reads in full when it does not run. **Share** is the first such script.

## Theme

Every colour and every font is defined once, as a named theme variable, and used everywhere through that name — never as a literal value in a component. The first choices are expected to be revisited; changing the ink colour or the body font must be a one-line edit.

The styles are plain CSS, with no preprocessor. The theme variables are CSS custom properties in one theme file, and each component styles itself in its own scoped style block, only ever through those variables. The fluid sizes are `clamp()` values computed once, each with a comment giving its phone and desktop sizes so it can be re-derived. SCSS was considered and left out. Native CSS nesting covers most of what it adds, and its compile-time variables could not be redefined for a dark mode. The one rule that matters is enforced rather than trusted: Stylelint rejects a colour literal anywhere outside the theme file.

**No dark mode, deliberately deferred.** The site's identity is paper, and a second palette would mean choosing and testing four more colours before the first one has been seen in use. Because nothing hard-codes a colour, adding one later means redefining the four variables inside a `prefers-color-scheme` block, with no component touched. A manual light/dark switch is ruled out for a different reason: it needs a control, JavaScript and per-**Reader** browser storage on a site that otherwise ships none of the three.

## Favicon

The site's icon is the letters **ІБ** in Montserrat 600, ink on paper, as an SVG. A favicon cannot load the site's fonts or its theme file, so the letters are drawn as shapes and the two colours repeat the theme's ink and paper.

## Open

Decisions not yet made. Anything here that turns out to be *work* belongs in the issue tracker; what is listed is the decision still owed.

- **Print.** A **Reader** printing a **Poem** or saving it as a PDF is likelier here than on most sites. With no print stylesheet they get the navigation and footer wrapped around the poem.
- **The type scale is provisional** — see above. Revisit once real **Poems** are on the site and the poem text can be judged at its real size.
- **Stress marks and search.** After launch, check once that a search for an unaccented phrase finds a **Poem** whose text carries stress marks. If it doesn't, revisit how marks reach search engines.
- **Dark mode** — deferred, not rejected. Revisit if **Readers** turn out to read at night, which the site cannot itself measure.
- **The catch-all's redirect.** While the catch-all has no **Poems** it has no page, and `/cycles/poza-tsyklamy` should redirect to **Вірші**. Not built until it first happens after launch; before production nobody can have **Shared** it.
- **Renaming and addresses** — whether a renamed **Poem** or **Cycle** gets a new address with a redirect, reversing ADR-0002, is owed its own session (#29).
- **Per-page layout** — the **News** and **Announcement** pages; how a **Photograph** and an embedded **Video** are sized and captioned; the visual design of the **Share** and **Pin** images (their content is settled in `CONTEXT.md`: text, **Dedication**, the **Poet**'s name as a signature; no title, date or **Epigraph**). The image renderer must pass the stress-mark test before it is adopted: such renderers need TTF/OTF rather than the web font files, and they place diacritics their own way. What signs a **Translation**'s image, given that it must credit the original author, is still owed. Each is its own session, and each is constrained by everything above.
