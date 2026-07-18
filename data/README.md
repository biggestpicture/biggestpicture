# Data

## License

All data in this directory is licensed **CC-BY-4.0**, in keeping with the
license terms of the upstream sources it derives from (Carnegie Endowment's
AIGS/Digital Repression indices, the Human Freedom Index). Attribution to
those original sources is required on reuse — see `docs/methodology.md` for
exact citations per axis.

## Contents

- `composite/biggestpicture-scores-2021-2022.json` — the merged, normalized
  dataset (AI surveillance, movement & regulatory restriction, digital
  surveillance) keyed by ISO 3166-1 alpha-3 code. This is **derived** data,
  not a raw upstream file — see `docs/methodology.md` for the exact
  normalization formula applied per axis.
- `geo/world.geojson` — world country boundaries (ISO3-keyed), sourced from
  the `johan/world.geo.json` public-domain-derived repository (itself based
  on Natural Earth data), used only for rendering the choropleth in `site/`.

## Refreshing from primary sources

This repository currently ships the derived composite only. To rebuild from
primary sources instead of trusting the shipped JSON:

1. AI Surveillance + Digital Surveillance: re-download the AIGS workbook
   from Carnegie's Mendeley dataset page and re-derive both sheets.
2. Movement & Regulatory: re-download the current Human Freedom Index
   dataset from Cato/Fraser and re-extract `pf_movement` / `ef_regulation`.
3. Re-run the normalization formulas in `docs/methodology.md`.

A scripted ingestion pipeline (rather than the manual process used to build
v2021-2022) is open work — see the issue tracker.
