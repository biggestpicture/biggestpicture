# The Biggest Picture

**biggestpicture.info**

A composite, open-data heat map of state control and surveillance intensity
by country — AI surveillance deployment, movement & regulatory restriction,
and digital surveillance & censorship, blended into one directional score.

Named for the fable of the frog in slowly heating water: each individual
measure looks survivable up close. The point of this project is to step
back far enough to see the whole pot — across every country, all at once.

Not a published, peer-reviewed index. An original visualization built on
top of three published ones. Read [`docs/methodology.md`](docs/methodology.md)
before citing a specific country's score.

## Layout

```
data/       versioned datasets (CC-BY-4.0) — see data/README.md
site/       the static site (MIT) — see site/build/ for the generator
docs/       methodology and project documentation
GOVERNANCE.md   how decisions get made, and why capture is structurally hard
FUNDING.md      funding rules, caps, and exclusions
```

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

- Data or methodology changes: see the RFC process in
  [`GOVERNANCE.md`](GOVERNANCE.md).
- Everything else (site polish, bug fixes, docs): open a PR — lazy
  consensus, no RFC needed.

## Mirrors

This project is designed to survive any single host disappearing. The
canonical git history is mirrored, not hosted in one place:

- Homepage: https://biggestpicture.info
- GitHub: (add org URL once created — `biggestpicture` is unclaimed)
- Codeberg: (add org URL once created)
- IPFS: (add latest pinned CID once first release is cut)

## License

Code: MIT (`LICENSE`). Data: CC-BY-4.0 (`data/README.md`). Docs: CC-BY-SA-4.0.
