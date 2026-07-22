# Governance

The Biggest Picture exists to measure state control and surveillance
without becoming captured by any single state, company, or ideology. That
requirement shapes governance more than usual — the rules below exist
specifically to make capture structurally hard, not just discouraged.

## Roles

- **Contributors** — anyone opening issues or pull requests. No approval
  needed to contribute; this is the largest and most important group.
- **Axis stewards** — maintainers responsible for one data axis (AI
  Surveillance, Movement & Regulatory, Digital Surveillance, and any future
  axis). Own that axis's `CODEOWNERS` entry. A steward's approval is
  required to merge a change to their axis's scoring formula or source data.
- **Core council** — 3–7 people with repo-wide merge rights, covering
  cross-cutting changes (site, composite calculation, governance itself).

## The rule that matters most: no single sphere of influence

- No more than **one core council seat per country of citizenship/residence**
  and no more than **one per employer**. A project scoring state control
  loses credibility immediately if its decision-makers cluster in one
  country or one company.
- Every maintainer (axis steward or core council) discloses, in
  `MAINTAINERS.md`, any current or past-2-years employment, funding, or
  contractual relationship with a government, intelligence-adjacent body,
  or surveillance-technology vendor. This is a disclosure requirement, not
  an automatic disqualification — undisclosed conflicts are the actual
  problem.

## Decision-making

- **Routine PRs** (typos, site polish, dependency bumps): lazy consensus —
  one maintainer approval, merge after 48 hours if no objection.
- **Changes to an axis's scoring formula or source**: requires that axis
  steward's approval plus one core council member from a different
  country/employer than the steward.
- **Changes to composite weighting, or adding/removing an axis**: full RFC
  process (below) — this is the highest-stakes category of change, since it
  changes what every country's headline number means.
- **Governance changes** (this document): RFC process + supermajority
  (two-thirds) of core council.
- **SolutionWatch partner additions/removals**: governed by `PARTNERS.md`,
  not this document — same underlying principles (public review period,
  sign-off from maintainers in different countries/institutions), applied
  to commercial listings rather than data.

## RFC process (for methodology and axis changes)

1. Open an issue tagged `rfc` describing the proposed change, the source
   data/methodology backing it, and why it belongs.
2. Minimum 14-day public comment period.
3. Requires sign-off from at least **two maintainers from different
   countries or institutions** (see the no-single-sphere rule above).
4. Merged with a changelog entry in `docs/methodology.md` and, if it changes
   published scores, a new tagged data release — never a silent edit to a
   past release.

## Removing a maintainer

For cause (undisclosed conflict of interest, sustained bad-faith edits,
sockpuppeting to bypass the one-seat-per-country rule): a two-thirds
supermajority of the remaining core council, in a public issue thread with
the reasoning recorded.

## The actual safety valve: the right to fork

Governance can fail. That's why the code (MIT) and data (CC-BY-4.0) licenses
exist — anyone can fork the full history and data at any time, no
permission needed. If governance is ever captured or deadlocked, forking
with the existing dataset intact is an explicit, intended escape hatch, not
a hostile act. See `README.md` for the mirrors (GitHub, Codeberg, IPFS) that
make this practical, not just theoretical.
