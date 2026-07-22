# The Biggest Picture

**biggestpicture.info**

An open-data, open-source project tracking state control and surveillance
by country, across two independent datasets:

- **Composite Index** — three published academic indices (AI surveillance
  deployment, movement & regulatory restriction, digital surveillance)
  blended into one directional score. Broad coverage, borrowed methodology.
- **Primary Questions** — 9 concrete, plain-language questions per country
  (digital ID, cash, mandatory schooling, social credit, alternative
  currencies, mandatory insurance, travel restrictions, internet
  restrictions, free speech), each answer cited to a source anyone can
  check. Narrow coverage today, built entirely through open contribution —
  no single institution decides the answer.

Named for the fable of the frog in slowly heating water: each individual
measure looks survivable up close. The point of this project is to step
back far enough to see the whole pot — across every country, all at once.

Not a published, peer-reviewed index. An original visualization and
compilation built on top of cited sources. Read
[`docs/methodology.md`](docs/methodology.md) before citing a specific
country's score or answer.

## Layout

```
data/
  composite/    the 3-axis blended index (CC-BY-4.0)
  questions/    the 9-question primary dataset (CC-BY-4.0) — see below
site/
  index.html       the data site (Composite Index + Primary Questions)
  solutionwatch/    SolutionWatch — structurally separate, see below
  style.css         shared stylesheet for both
  build/            generator for site/index.html — see below
docs/       methodology and project documentation
GOVERNANCE.md    how decisions get made, and why capture is structurally hard
FUNDING.md       funding rules, caps, and exclusions
CONTRIBUTING.md  how to add or dispute a country's Primary Questions entry
```

### SolutionWatch

A second, separate section (`site/solutionwatch/`) for vetted
services/tools that help reduce exposure to state control — the
"now what do I do about it" counterpart to the data. Deliberately kept at
its own URL with no automatic links to or from country score pages, so a
future affiliate relationship can never look like it's shaping the data.
No partners are listed yet — the public vetting policy is being written
before any listing goes live. See the page itself for the current
disclosure and separation policy, and open a `partner-inquiry`-tagged
issue to be considered once the policy is published.

## Building the site locally

No dependencies — plain Node.js.

```
cd site/build
node generate_paths.js   # projects data/geo + data/composite into SVG paths
node inject.js            # writes site/index.html
```

Then open `site/index.html` directly, or serve the repo root with any
static file server. `site/CNAME` is set for GitHub Pages to serve at
**biggestpicture.info** once the repo is pushed and Pages is enabled.

## Contributing

- **Adding or correcting a country's Primary Questions entry** — the
  highest-impact way to help right now (7 of 179+ countries done). See
  [`CONTRIBUTING.md`](CONTRIBUTING.md).
- Changes to the composite index's scoring/axes: RFC process in
  [`GOVERNANCE.md`](GOVERNANCE.md).
- Everything else (site polish, bug fixes, docs): open a PR — lazy
  consensus, no RFC needed.

Every country file in `data/questions/countries/` is validated in CI
(`node data/questions/validate.js`) — a PR that removes a citation or
leaves a placeholder note won't merge.

## Mirrors

This project is designed to survive any single host disappearing. The
canonical git history is mirrored, not hosted in one place:

- Homepage: https://biggestpicture.info
- GitHub: https://github.com/biggestpicture/biggestpicture
- Codeberg: (add org URL once created)
- IPFS: (add latest pinned CID once first release is cut)

## License

Code: MIT (`LICENSE`). Data: CC-BY-4.0 (`data/README.md`). Docs: CC-BY-SA-4.0.
