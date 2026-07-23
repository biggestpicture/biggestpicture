# Session Handover

**Date:** 2026-07-24
**Duration:** Single session, continuation of a much longer prior conversation
**Goal:** Complete pivot of biggestpicture.info from an open-source surveillance/state-control index project to a passive-income affiliate content site, on explicit user instruction to "start from scratch, forget what we did so far."

## Summary

This session opened with the user deciding to abandon the entire prior direction of biggestpicture.info — a civic-tech, decentralized-governance surveillance index with real governance docs, a composite data index, and a community-sourced questions dataset — and repurpose the domain for a monetized affiliate content site themed around financial sovereignty, digital privacy, and health-conscious/anti-establishment values. The only thing carried forward was the domain itself and its GitHub Pages hosting.

The work happened in three phases. First, market research: what existing publishers/business models exist in the "freedom lifestyle" and "natural health" affiliate space (Sovereign Man, Mercola, Off The Grid News), what the actual affiliate economics look like across verticals (gold IRA leads pay $165-200 each, VPN affiliate programs pay up to 40% recurring), and — critically — a real cautionary tale (Mercola's $5.3M FTC settlement and FDA warning letter for disease-cure claims) that shaped every subsequent content decision. Second, strategy: a newsletter-plus-comparison-hub model was proposed and refined into a concrete plan — new branding ("See the Biggest Picture"), three specific verticals chosen for a mix of payout and thematic coherence (gold/precious metals, VPN/privacy, health data), and hard content rules to avoid the Mercola trap. Third, execution: the old project was archived (not deleted) as git tag `surveillance-index-v1`, removed from `main`, and a completely new static site was built — three research agents were dispatched in parallel to gather real, cited facts about actual companies in each vertical (not fabricated marketing copy), and that research became the actual page content. Every outbound link was verified to resolve to the correct real company before shipping. The site is live at biggestpicture.info as of this handover, fully deployed and verified, with zero affiliate relationships yet established — that's disclosed honestly on every page rather than glossed over.

The session ends with a real, published, honest site that currently cannot earn money (no affiliate programs joined yet) and has a non-functional newsletter signup form (no ESP connected). Those are the two concrete blockers to actual revenue, and they're both squarely on the user's side to unblock (business/tax details for affiliate applications; choosing and paying for a newsletter platform) — the site-side work for both is ready and waiting.

## What Got Done

- [x] **Archived the old project** — `git tag surveillance-index-v1`, pushed to origin. Fully recoverable via `git checkout surveillance-index-v1`; nothing was destroyed.
- [x] **Removed old project files from `main`** — all governance docs, the composite index, the Primary Questions dataset, the old Node.js build pipeline, and the SolutionWatch page.
- [x] **New brand and homepage** — "See the Biggest Picture," positioned around skepticism of both state financial/surveillance narratives and conventional one-size-fits-all medicine. `site/index.html`.
- [x] **New visual identity** — warm cream/amber editorial palette replacing the old civic-tech blue, full dark mode support, shared via `site/style.css`.
- [x] **Three researched comparison hub pages**, each with real cited facts (not marketing copy), honest "no affiliate relationship yet" disclosure, and explicit disclosure of red flags even for recommended companies:
  - `site/gold-ira/` — 5 companies compared; leads with Augusta/Birch Gold/Goldco, discloses Goldco's complaint pattern and American Hartford Gold's open Kiesel Law inquiry, includes an industry-wide markup/buyback-asymmetry caveat section citing the real Lear Capital $6M NY AG settlement.
  - `site/vpn-privacy/` — splits providers into "actually built for privacy" (Mullvad, IVPN — both refuse affiliate programs on principle, recommended anyway) vs. mainstream (NordVPN/Surfshark's undisclosed shared ownership, ExpressVPN's CIO's documented history building UAE state surveillance tools).
  - `site/health-data/` — anchored in CGMs/lab testing/wearables rather than supplements, specifically to avoid disease-cure-claim legal exposure; explicitly names and excludes Whoop (FDA warning letter for an unapproved-device claim) and Berkey (active class action, CA retail ban) with reasons stated, not silent omission.
- [x] **All 18 outbound company links verified live** — checked via curl, then via actual browser navigation for three that returned 403/429 to curl (bot-protection/rate-limiting false positives, not broken links — confirmed genuine via real browser).
- [x] **Simplified deploy workflow** — removed the old data-injection Node build step (`.github/workflows/deploy.yml` now just checks out and uploads `site/` directly, since there's no longer any generated content).
- [x] **Rewritten README.md** — describes the new site, states the content-integrity rules explicitly (real sources only, honest affiliate disclosure, data-not-diagnosis framing for health content), notes the old project's location at the archive tag.
- [x] **Full local verification before shipping** — local server rooted at `site/` to mimic production URL structure, checked in-browser (no console errors, correct light/dark colors, correct nav wiring) before pushing.
- [x] **Deployed and verified live** — all four pages (home + 3 hubs) return 200 on biggestpicture.info, homepage confirmed rendering correctly with no console errors.

## What's In Progress

Nothing is mid-implementation — the site as built is complete and shipped. What's "in progress" is really "blocked on the user," see Next Steps below.

## What Didn't Get Done (and Why)

- **Real affiliate program applications** — not something I can do; requires the user's own business/tax/banking details. Site-side, everything is ready to receive real tracking links the moment programs are approved.
- **Newsletter platform setup** — same reason; requires the user to choose and sign up for Beehiiv/Substack/etc. The signup forms on every page are currently non-functional placeholders (`onsubmit="return false"`, clearly labeled "not live yet" underneath) — deliberately honest rather than silently broken, but they don't capture anything yet.
- **Analytics** — no Plausible/GA4/etc. wired in. Wasn't blocking to ship the content, but means there's currently no way to know if anyone is visiting.
- **SEO infrastructure** — meta descriptions exist per-page, but no `sitemap.xml`, no `robots.txt`, no Open Graph tags for social sharing. Deprioritized in favor of getting real, honest content live first.
- **A fourth vertical** — deliberately not pursued yet; three was the explicit scope for this session ("go with all three"), and expanding further before the first three have real affiliate links and any traffic data would be premature.

## Architecture & Design Decisions

| Decision | Chosen Approach | Why | Alternatives Considered | Why Rejected |
|---|---|---|---|---|
| Old project handling | Archive via `git tag surveillance-index-v1`, then remove from `main` | Fully recoverable, doesn't clutter the live repo with unused governance docs/data for a project that's no longer the direction | Leave dormant in `main`; delete with no archive | Dormant files would confuse anyone browsing the repo about what it actually is now; no-archive deletion loses easy recoverability even though git history technically retains it |
| Overall model | Newsletter + comparison-hub hybrid | Current research shows pure SEO-content sites with no distinctive angle are struggling, while newsletter-plus-affiliate models show more revenue stability; high-ticket verticals (gold IRA, offshore) convert on trust built over time, which favors an email relationship over a single page visit | Pure SEO content/blog site; YouTube-first | Blog-only: no differentiation in a saturated market. YouTube-first: much higher production overhead, doesn't fit a text/citation-heavy vetting-based differentiator |
| Vertical selection | Gold/precious metals IRA + VPN/privacy + health data (CGM/labs/wearables) | Highest-payout verticals that still cohere thematically with "freedom/sovereignty" positioning, with the health vertical specifically chosen to be the lowest-legal-risk angle available in that space | Supplements/natural-health-cure content for the health vertical; broader "everything" lifestyle blog | Supplements: this is exactly the Mercola FTC/FDA trap — disease-cure claims are the single most common way sites in this niche get legally burned. Broad blog: research explicitly found undifferentiated broad-lifestyle affiliate sites are struggling right now |
| VPN recommendations | Lead with Mullvad/IVPN despite them paying zero affiliate commission | Both refuse affiliate programs on principle (IVPN shut theirs down over non-compliant disclosure); recommending them anyway despite earning nothing is a genuine trust signal for a privacy-focused audience that actively researches "who owns my VPN" | Only feature commission-paying providers (Nord/Surfshark/Express/Proton) | Would make the page a pure monetization vehicle with no credibility differentiation — exactly the "generic affiliate blog" trap the market research warned against |
| Build pipeline | Removed entirely — all pages are static HTML, hand-edited directly | The old Node.js pipeline (`generate_paths.js`/`inject.js`) existed specifically to project GeoJSON country-boundary data and inject a large dataset into a template; the new site has no such data-projection need | Keep the build step for future-proofing | Would be dead, confusing code with no current purpose — simpler to remove and re-add a build step later if a genuine templating need arises |

## Mental Model

**The core discipline this site is built on:** every comparison page follows the same pattern — real research first (via dispatched agents with explicit instructions to find complaints/lawsuits/red flags, not just marketing stats), honest disclosure of what's NOT good about even the recommended options, and an explicit "why we're NOT recommending X" callout for prominent competitors that have real problems (Whoop, Berkey, American Hartford Gold treated cautiously). This is the actual differentiator versus the rest of this content category, which the market research found is mostly recycled affiliate copy with zero real vetting behind it. **If you're adding a fourth vertical or updating an existing one, don't skip the research-agent step and don't skip disclosing red flags** — that discipline is the whole value proposition, not a nice-to-have.

**The health vertical's legal line, specifically:** the FDA's January 2026 "General Wellness" guidance draws a real distinction between products that show you data about your body (low regulatory risk — CGMs, lab tests, wearables) and products/claims that diagnose, treat, mitigate, prevent, or cure a named condition (the Mercola trap — $5.3M FTC settlement, FDA warning letter). Every piece of copy on `site/health-data/index.html` was written to stay on the "shows you data" side of that line — phrases like "helps you track" and "gives you information to discuss with your doctor," never "treats" or "manages" a condition. **Any future health-adjacent content must follow this same rule**, and if a company under consideration has crossed that line (like Whoop's blood-pressure feature did), the right move is to name it and explain why, not quietly omit it — omission without explanation would itself look like an oversight rather than a deliberate standard.

**Site structure, concretely:** `site/index.html` is the homepage; `site/gold-ira/`, `site/vpn-privacy/`, `site/health-data/` are self-contained directories each with their own `index.html`, all sharing `site/style.css`. No build step — edit any `index.html` directly and it's live on next deploy. The GitHub Actions workflow (`.github/workflows/deploy.yml`) just checks out the repo and uploads `site/` as the Pages artifact on every push to `main` — same footgun as before still applies: **only `site/` is published; anything elsewhere in the repo needs a full GitHub URL if linked from the live site, not a relative path.**

**Outbound link verification pattern that worked well and should be reused:** when checking real company URLs, `curl` alone isn't sufficient — several legitimate sites (Augusta Precious Metals, NordVPN, IQAir) returned 403/429 to curl's default request due to bot-protection or rate-limiting, not because the link was wrong. The reliable check is curl first for a fast pass, then an actual browser navigation for anything that fails, since a real browser clears Cloudflare-style challenges that curl can't.

## Known Issues & Risks

- **Newsletter signup forms are non-functional** — Impact: a real visitor who submits their email gets no confirmation and nothing is captured; the note underneath ("not live yet") mitigates this from being deceptive, but it's still a broken-feeling feature on a live site. Fix: wire up a real ESP (Next Steps #1).
- **Zero affiliate relationships exist** — Impact: the site cannot currently earn any revenue regardless of traffic. Fix: Next Steps #2, requires the user's own action.
- **No analytics** — Impact: no visibility into whether the site is getting any traffic at all. Fix: Next Steps #3.
- **Time-sensitive factual claims will age** — Impact: specific claims like "Berkey's class action is unresolved as of early 2026" or "Whoop's FDA warning letter, July 2025" are accurate as of this session's research but will go stale. Likelihood: high, this is a certainty over time, not a maybe. Mitigation: no automated re-verification mechanism exists (unlike the old project's dated data releases) — this needs a manual periodic re-check, ideally before the site gets meaningful traffic.
- **Named companies with disclosed red flags** — `site/health-data/` and `site/gold-ira/` name real companies (Whoop, Berkey, American Hartford Gold) with specific negative claims (FDA warning letter, class action, open investigation). These are accurately sourced and appropriately hedged ("as of this writing," "no lawsuit has been filed," etc.) as of this session's research, but any future editor should re-verify before amplifying this content (e.g., paid promotion) rather than assuming it stays accurate indefinitely.

## What Worked Well

- **Three parallel research agents, one per vertical, with explicit instructions to find red flags/complaints/lawsuits, not just marketing stats** — produced genuinely excellent, nuanced research (correctly surfaced Mullvad/IVPN's no-affiliate-program stance, the real Lear Capital settlement, ExpressVPN's CIO's surveillance history, Whoop's FDA warning letter, Berkey's class action). This is the single most valuable pattern from this session and should be the default approach for any future vertical.
- **Verifying links via curl-then-browser fallback** — caught that "broken-looking" 403/429 responses on Augusta/NordVPN/IQAir were bot-protection false positives, not actual errors, avoiding either wasted time "fixing" correct links or shipping genuinely wrong ones.
- **Asking before a destructive-feeling action** (the archive-vs-delete-vs-dormant question before touching the old project's files) — cheap to ask, and the user had a clear preference (archive) that might not have been the default guess.
- **Testing against a locally-rooted server matching production URL structure before pushing** — same pattern that caught a real bug in the prior project, reused successfully here with no incidents.

## What Didn't Work (Traps to Avoid)

- **The temptation to write comparison content from general knowledge instead of dispatching real research** — never actually done this session (caught before it happened), but worth naming explicitly as the trap: this content category is exactly the one where "generic affiliate copy" is the default failure mode, and skipping the research-agent step to save time would silently recreate that failure mode.
- **Treating curl 403/429 as proof of a broken link** — see Known Issues/Mental Model above; don't repeat this mistake, always browser-verify before concluding a real company's URL is wrong.

## Next Steps (Priority Order)

1. **Decide the newsletter platform and either wire it up or disable the forms.** If the user picks Beehiiv or Substack: they create the account (I can't), get an embed/form-action URL, and I wire it into all four pages' `<form>` elements, replacing the `onsubmit="return false"` placeholder. If this isn't happening soon, consider removing/hiding the forms in the meantime rather than leaving a visibly non-functional feature live.
2. **Apply to real affiliate programs.** Gold IRA: Goldco, Augusta Precious Metals, and Birch Gold Group all have documented affiliate programs (see research in this session's conversation history for commission structures). VPN: Proton VPN's Partner Program (Mullvad/IVPN explicitly have none — don't chase this). Health: Function Health, InsideTracker, Nutrisense, AquaTru, and IQAir all had findable affiliate program info during research. Once approved, send me the tracking links/codes and I'll swap them into the relevant `a.out-link` elements on each page — the current links go directly to each company's main site, no tracking parameters.
3. **Add analytics** — Plausible (privacy-respecting, fits the site's positioning) or GA4. Needs the user to create the account; I can add the tracking snippet to `site/style.css`-adjacent `<head>` includes across all four pages once given the site ID/snippet.
4. **Add SEO basics** — `sitemap.xml`, `robots.txt`, Open Graph meta tags per page for social sharing previews. No blockers, can be done anytime.
5. **Calendar a re-verification pass** on the time-sensitive claims flagged in Known Issues, ideally before the site starts getting meaningful traffic or any paid promotion.
6. **Only after 1-3 are done and there's some traffic data**, consider a fourth vertical — don't expand before validating what's live.

## Rollback Plan

- **Last known good state:** commit `b954bcf` ("Pivot: from surveillance index to freedom/health/privacy affiliate site") — current `HEAD`, matches `origin/main`, fully deployed and verified live at biggestpicture.info.
- **If you need the old surveillance-index project back:** `git checkout surveillance-index-v1` — fully intact, tagged and pushed before any removal happened.
- **Safe reset command (only if a future session makes a mess of the new site):** `git reset --hard b954bcf`.

## Files Changed This Session

- Removed (archived at `surveillance-index-v1`): `GOVERNANCE.md`, `FUNDING.md`, `PARTNERS.md`, `CONTRIBUTING.md`, `HANDOVER.md` (the old one), `docs/`, `data/`, `site/build/`, `site/solutionwatch/`, `.github/workflows/validate-data.yml`
- `README.md` — fully rewritten for the new site and its content rules
- `.github/workflows/deploy.yml` — simplified, removed the data-injection build step
- `site/style.css` — new file, new warm cream/amber design system
- `site/index.html` — new homepage
- `site/gold-ira/index.html`, `site/vpn-privacy/index.html`, `site/health-data/index.html` — new comparison hub pages
- `HANDOVER.md` (this file) — new

## Open Questions

- Does the user still want the Proton Pass Plus email-alias setup discussed in the prior session (originally for SolutionWatch partner inquiries, which no longer exists) — repurposed for something in the new site (e.g. a contact address), or fully abandoned along with that direction? Never explicitly resolved.
- Newsletter platform preference (Beehiiv vs. Substack vs. other) — recommended but never confirmed.
- Confirmed priority order for Next Steps, or does the user want to reorder (e.g. affiliate applications before newsletter)?
- Appetite/timeline for a fourth vertical, or deliberate focus-depth-first on the three that exist?
