# The Biggest Picture

**biggestpicture.info**

An independent content site covering financial sovereignty, real privacy tools, and personalized health data — for readers skeptical of the state's account of what's safe and conventional medicine's one-size-fits-all account of what's healthy. Monetized via affiliate partnerships once they're established, with every comparison actually researched rather than copied from marketing pages.

## Layout

```
site/
  index.html          homepage
  style.css            shared stylesheet, all pages
  gold-ira/            Gold & Precious Metals IRA comparison
  vpn-privacy/          VPN/privacy tools comparison
  health-data/          health-data tools comparison (deliberately not supplements/cure claims — see the page's own guardrail note)
.github/workflows/deploy.yml   GitHub Pages deploy on push to main
```

No build step — every page is static HTML, edit directly.

## Content rules (keep these — they're why the site is defensible)

- **Every comparative claim about a real company needs a real, checkable source.** No fabricated ratings, no invented complaint counts, no copied marketing copy presented as independent research.
- **Disclose affiliate status honestly, on every page, at all times.** Right now that means saying plainly that no affiliate relationships exist yet — update that language the moment a real partnership goes live, don't leave stale "not yet established" language up once it's false.
- **Health content stays on the "data, not diagnosis" side of the FDA's general-wellness line** — see `site/health-data/index.html`'s own guardrail section for the specific distinction. No treat/cure/prevent language about any named condition, ever.
- **When a company has a real complaint pattern, lawsuit, or regulatory issue, say so on the page** — even the ones being recommended. This is the actual differentiator versus the rest of this content category, which is mostly recycled affiliate copy with no real vetting behind it.

## Deployment

GitHub Pages via Actions (`.github/workflows/deploy.yml`), auto-deploys `site/` on push to `main`. Domain: biggestpicture.info, DNS at IceDNS.

## History

The repo previously hosted an open-source state-surveillance index project. That work is preserved and fully recoverable at the git tag `surveillance-index-v1`, but is no longer the active direction.

## License

MIT (`LICENSE`).
