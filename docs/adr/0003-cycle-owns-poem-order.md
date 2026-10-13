# The Cycle owns the order of its Poems

A **Cycle**'s file holds the ordered list of the slugs of its **Poems**; a single manifest file holds the ordered list of **Cycle** slugs. A **Poem**'s own file says nothing about which **Cycle** it belongs to or where it sits — that is looked up at build time from the **Cycle** lists.

The obvious alternative was `cycle:` and `order:` fields on each **Poem**. We rejected it because the reading order of a **Cycle** is part of the work and is edited as a whole: inserting a poem between positions 3 and 4 would mean renumbering every later file, and two poems both claiming position 3 would be ambiguous with no way for the build to know which was meant. With the order held in one list, reordering is editing one list, and membership and order come from a single source.

That single source is what makes the rule "every **Poem** belongs to exactly one **Cycle**" enforceable: the build fails if a **Poem** appears in no list or in more than one, so the catch-all **Cycle** stops being a convention and becomes a check. It is also the shape a git-backed admin panel expects, which renders an array of references as a drag-to-reorder list.

A **Poem**'s **Role** in its **Cycle** (**Prologue**, **Epilogue**, or any defined later) is recorded on its entry in that same list, for the same reason: the **Role** is a fact about a place in the order, and its placement rule (a **Prologue** first, an **Epilogue** last) can only be checked against the order. The **Roles** are a fixed set kept in the code. Each one names how it reads on a page and where it may stand, so a new **Role** is one added definition and a misplaced one fails the build.

**Cycles** themselves use the same shape (one manifest list) rather than an `order:` number per **Cycle**, so ordering works identically at both levels.
