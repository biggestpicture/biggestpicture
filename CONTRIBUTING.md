# Contributing

## Adding or updating a country's questions dataset

This is the easiest way to contribute, and the one most in need of help —
7 of 179+ countries are filled in.

1. Read `data/questions/questions.json` first — it defines the 9 questions
   and, critically, how to grade each one (what counts as "yes" vs
   "partial" vs "no" vs "unclear"). The grading rubric exists specifically
   so two different contributors reach the same answer given the same
   facts — read it even if a question looks self-explanatory, several
   aren't as binary as they read at first ("mandatory schooling" is nearly
   universal, so the actual signal is homeschooling legality — see the
   guidance for each question).
2. Copy `data/questions/countries/EST.json` as a structural template (it's
   a clean, fully-cited example) and create `data/questions/countries/<ISO3>.json`
   for your country, using its ISO 3166-1 alpha-3 code as both the filename
   and the `iso3` field.
3. **Every answer needs at least one real, checkable source URL.** Prefer,
   in this order: (a) primary/official sources — government pages, central
   banks, national statistics offices, actual legislation text; (b)
   specialist research orgs — Freedom House, Human Rights Watch, Amnesty
   International, V-Dem, Merics, HRNK, World Bank, IMF, OECD; (c) major
   wire services and outlets — Reuters, AP, BBC. Avoid unsourced blogs,
   wikis without corroboration, or anything you can't independently verify
   by clicking the link.
4. If you genuinely can't find a solid source, use `"unclear"` and explain
   the gap in the note. **A confident wrong answer is worse than an honest
   "unclear."** This matters especially for closed societies where sources
   are scarce — see `data/questions/countries/PRK.json` (North Korea) for
   an example of marking specific sub-claims as unclear within a note while
   still giving an overall graded answer.
5. Run the validator before opening a PR:
   ```
   node data/questions/validate.js
   ```
   It checks every answer has a value from the fixed scale, a real note
   (not a one-word placeholder), and at least one properly-formed source
   citation. CI runs this automatically on every PR that touches
   `data/questions/` — a PR that fails it won't be merged until fixed.
6. Open a PR. One file per country keeps PRs small and independently
   reviewable — please don't bundle multiple countries into one PR unless
   they're genuinely related changes.

## Disputing an existing answer

Countries change, and so does the evidence about them. If you think an
existing answer is wrong, outdated, or missing context:

- Open an issue first if you're not sure, describing what's wrong and
  what source you think supports a different answer — this gets you a
  second opinion before you spend time on a PR.
- Or open a PR directly with the change and your source, referencing what
  it corrects. Update `last_reviewed` to today's date.
- Substantive disputes (not typo fixes) on axis scoring or grading follow
  the RFC process in `GOVERNANCE.md`, same as the composite index.

## Everything else

Site polish, bug fixes, documentation improvements, build tooling: open a
PR, lazy consensus applies (see `GOVERNANCE.md`), no RFC needed.

## What NOT to do

- Don't submit an answer you can't personally verify by clicking the
  source link and reading it.
- Don't submit country files without running the validator first — it
  takes a few seconds and catches the most common mistakes (missing
  citation, note too short to be useful, malformed date).
- Don't bundle a change to `data/composite/` (the academic-index blend) in
  the same PR as a `data/questions/` change — they're independent datasets
  with independent review needs.
