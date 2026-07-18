# Methodology

The Biggest Picture is a composite heat map combining three independently
published, independently maintained datasets into one directional score per
country. It is **not** a peer-reviewed index in its own right — the blend,
the equal weighting, and the 0–100 normalization are choices made for this
project. Cite the three underlying sources individually for any claim that
needs to withstand scrutiny; cite this composite only as an original
visualization built on top of them.

## The three axes

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

## Adding a new axis

See `GOVERNANCE.md` for the RFC process. In short: a new axis needs a
public, citable source methodology, machine-readable data, and sign-off from
at least two maintainers from different countries/institutions before it's
merged.
