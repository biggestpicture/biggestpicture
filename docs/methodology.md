# Methodology

The Biggest Picture publishes two independent datasets, deliberately kept
separate rather than blended into one:

1. **The composite index** (`data/composite/`) — three existing academic
   indices blended into one directional score per country. Broad coverage
   (up to 179 countries), but only as current as its 2021–2022 source data,
   and inherits the scope/limits of institutions that built those indices.
2. **Primary Questions** (`data/questions/`) — 9 specific, concrete
   questions per country, each answered with a graded value, a plain-English
   note, and at least one directly-checkable source citation, filled in
   through open contribution rather than borrowed from an existing index.
   Narrow coverage today (7 countries, more will be added by contributors)
   but every claim traces to a source a reader can click and verify
   themselves in under a minute — that traceability, not breadth, is the
   point of this dataset.

Neither is a peer-reviewed index in its own right. Cite the underlying
sources individually for any claim that needs to withstand scrutiny; cite
this project only as an original visualization/compilation built on top of
them.

## Dataset 1: Composite Index

### The three axes

### 1. AI Surveillance Deployment

- **Source:** Carnegie Endowment for International Peace, *AI Global
  Surveillance (AIGS) Index*, 2022 update (Steven Feldstein).
- **Raw data:** `data/composite/biggestpicture-scores-2021-2022.json`, field `aigs_score`.
  Derived from Carnegie's public Mendeley dataset (`AI Global Surveillance
  Index 09Mar2022.xlsx`).
- **Formula:** `score = (documented categories / 4) × 100`, where the four
  tracked categories are safe/smart-city platforms, public facial
  recognition, smart policing, and social media surveillance.
- **Coverage:** 97 of 179 countries. Carnegie's methodology only publishes
  countries with at least one documented category — the remaining 82 show
  `null` ("no data"), which is a coding artifact of their methodology, **not**
  evidence that AI surveillance is absent there.
- **What it does NOT measure:** intent or severity of use against political
  dissent. It scores breadth of deployment, which is why large democracies
  with sizeable commercial tech sectors (USA, Germany, India) score as high
  as authoritarian states. Read this axis as "how much of this technology is
  documented as in use here," not as a freedom score on its own.

### 2. Movement & Regulatory Restriction

- **Source:** Human Freedom Index, 2023 edition (Cato Institute / Fraser
  Institute), reporting 2021 data.
- **Raw data:** field `movement_regulation_score`.
- **Formula:** average of the `pf_movement` (freedom of domestic and
  international movement) and `ef_regulation` (business, credit, and labor
  regulation — captures permitting/licensing burden) sub-indices, each
  originally 0–10 with higher = freer, inverted to `100 − (avg / 10 × 100)`
  so higher = more restricted.
- **Coverage:** 165 of 179 countries.

### 3. Digital Surveillance & Censorship

- **Source:** Feldstein/Carnegie *Digital Repression Index*, 2021, built
  from V-Dem indicators (government social-media surveillance, disinformation
  campaigns, internet filtering, service shutdowns, arrests of online users).
- **Raw data:** field `digital_surveillance_score`.
- **Formula:** min-max normalization of the raw composite index to 0–100;
  the source index is already oriented so higher = more repression.
- **Coverage:** 176 of 179 countries (Somaliland and Zanzibar excluded — no
  ISO 3166-1 alpha-3 code exists for either).

## Composite score

Simple, unweighted mean of whichever axes are available for a country — no
imputation of missing values. 95 of 179 countries have all three axes; the
rest are partial averages. Treat a composite built from 1–2 axes as
lower-confidence, and check the site's table view for per-axis completeness
before citing a specific country's score.

## Known limitations

- **Vintage mismatch:** the three axes span 2021–2022 data collected under
  different windows, not a single synchronized snapshot.
- **Methodological non-comparability:** the three source indices were built
  by different teams with different definitions of "control." Averaging them
  is a modeling choice, not a mathematically principled aggregation.
- **No education/indoctrination axis:** compulsory or ideological-curriculum
  education is not scored — no cross-national quantitative dataset covers it
  consistently. This is a real gap, evidenced only by qualitative
  country-specific case reporting (e.g. Freedom House and Human Rights Watch
  country narratives). It will be added only if a dataset with a public,
  citable methodology becomes available — see `GOVERNANCE.md` for the RFC
  process to propose one.
- **Funding disclosure on source data:** the AIGS and Digital Repression
  indices originate from Carnegie Endowment's Technology and International
  Affairs Program, whose disclosed funders include cloud/AI-adjacent firms
  (Amazon Web Services, Cisco, Accenture) alongside foundations and several
  foreign governments. Carnegie discloses this publicly; it's noted here as a
  standard conflict-of-interest caveat, not as evidence the data itself is
  unreliable. See `FUNDING.md` for how this project handles its own funding
  to avoid the same concern.
- **Data-quality fix applied during ingestion:** the source AIGS workbook
  contained a corrupted find-and-replace artifact that mangled some country
  names (e.g. "United States of America" had substrings replaced by V-Dem
  regime-type labels). This was detected and corrected by reverse
  pattern-matching against known country names before this dataset was
  built. Flagged here so it can be independently re-verified against
  Carnegie's original file.

## Versioning

Data releases are tagged `vYYYY.N` (e.g. `v2024.1`) and are immutable once
tagged — corrections go into a new tagged release with a changelog entry,
never a silent edit to a past release. The file
`data/composite/biggestpicture-scores-2021-2022.json` is named for the source
data's vintage, not the release date; the release tag is the citable version.

## Adding a new axis to the composite

See `GOVERNANCE.md` for the RFC process. In short: a new axis needs a
public, citable source methodology, machine-readable data, and sign-off from
at least two maintainers from different countries/institutions before it's
merged.

## Dataset 2: Primary Questions

A different approach from the composite index: instead of borrowing scores
from existing institutional indices, this dataset asks 9 specific factual
questions directly, per country, each with its own citation — sourced
through open contribution rather than any single organization's
methodology. This is the concrete mechanism behind "decentralized sourcing"
for this project: no single institution decides the answer, anyone can
submit one with a source, anyone can dispute one with a better source, and
the full history of who changed what is public in git.

### The 9 questions

Full question text and grading rubric live in `data/questions/questions.json`
— read it before contributing, several questions aren't as binary as they
look (e.g. "mandatory schooling" is nearly universal, so the real signal
captured is homeschooling legality, not the top-line yes/no). In brief:

1. Is there a digital ID in place? — and is its architecture centralized
   (state-held database) or decentralized (citizen-held credential)?
2. Is it (still) possible to pay in cash?
3. Is there mandatory schooling? — specifically, is homeschooling legal?
4. Is there a social credit system? — a unified, government-operated
   citizen trust score with real consequences, not private credit bureaus
   or fragmented sectoral blacklists.
5. Can I trade in alternative currencies like crypto, gold, etc.?
6. Are there mandatory insurances?
7. Are there travel restrictions?
8. Are there restrictions of internet access?
9. Is there free speech?

### Answer format

Each answer is graded `yes` / `partial` / `no` / `unclear`, with a mandatory
note (specific facts, not a restatement of the question) and at least one
source URL. Schema enforced in `data/questions/schema.json` and checked by
`data/questions/validate.js` in CI on every pull request that touches
`data/questions/`.

### Deliberately not scored

Unlike the composite index, these 9 answers are **not** blended into a
single number. Several are genuinely double-edged rather than simply
good-or-bad — a national digital ID can be citizen-empowering (Estonia's
e-ID: cryptographic credential held on the citizen's own chip, used for
legally-binding digital signatures) or surveillance-enabling (a centralized
biometric database queried by the state) depending entirely on its
architecture, and collapsing that into one number would hide the judgment
call rather than make it honestly. Read the note field; it carries the
actual content, not the value field alone.

### Coverage and seeding

Seeded with 7 countries — United States, Germany, Sweden, Estonia, China,
North Korea, Nigeria — chosen for contrast (federal/mixed systems, a
cashless-leaning democracy, a digital-ID pioneer, an authoritarian
tech-heavy state, the most closed state documented, and a large non-Western,
non-G7 democracy) to prove the format works across very different contexts
before opening it to contributors for the remaining 170+. See
`CONTRIBUTING.md` for how to add or dispute a country entry.

Two grading notes worth flagging explicitly, since both cut against popular
narrative and are easy to get wrong from memory rather than sourced research:

- **China's social credit system** is graded `partial`, not `yes` — current
  research (Merics) finds no unified national personal score exists; the
  system is fragmented, lowly digitalized, and mostly targets businesses.
  Central authorities explicitly rejected personal-penalty scoring pilots by
  2019. Commercial products like Sesame Credit are private and voluntary,
  distinct from any government system. The popular Western "Black Mirror"
  characterization of a single unified citizen score is not what the
  documented evidence shows.
- **North Korea's songbun system** is graded `yes` for social credit — a
  hereditary, state-operated caste classification assigned at birth based on
  family political loyalty, with severe documented real-world consequences
  and no digital scoring involved. Structurally different from a "credit
  score" but squarely meets this project's grading rubric for a
  government-operated system that scores/rates citizens with real
  consequences tied to the rating.
