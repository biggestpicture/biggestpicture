# Session Handover

**Date:** 2026-07-19
**Duration:** Long session (single continuous conversation, many sub-phases)
**Goal:** Started as an exploratory question about global surveillance/control indices; evolved into building, deploying, and iterating on an actual open-source project — biggestpicture.info.

## Summary

This session took "is there a heat map of state surveillance by country" all the way to a live, deployed, git-based open-source project with real governance. We researched existing indices (Freedom House, Carnegie's AIGS, Human Freedom Index), built a composite score from three of them, generated an interactive choropleth site, registered/verified a domain the user already owned (biggestpicture.info), stood up GitHub Pages + Actions CI, and wrote real governance/funding docs designed to make single-actor capture structurally hard rather than just discouraged in prose.

From there we added a second, harder dataset: "Primary Questions" — 9 concrete factual questions per country (digital ID, cash, mandatory schooling, social credit, alt currencies, mandatory insurance, travel restrictions, internet restrictions, free speech), each answer independently researched and cited rather than borrowed from an institution, seeded for 7 contrasting countries (USA, Germany, Sweden, Estonia, China, North Korea, Nigeria) via two research agents, then spot-checked by hand against primary sources before shipping. We rewrote the landing page copy per the user's draft. Then we started on "SolutionWatch" — an affiliate/partner recommendations section — and got as far as structural separation (own URL, no cross-links to/from the data pages) and a full Partner & Affiliate Policy (`PARTNERS.md`) before any partner exists, mirroring `GOVERNANCE.md`'s anti-capture RFC mechanism.

The session ends mid-flight on the last piece: a non-technical contact mechanism for potential partners. We ruled out free email forwarding (ImprovMX free tier can't send-as, only receive), ruled out simply adding biggestpicture.info as a second Proton Mail custom domain (blocked by the Mail Plus plan's 1-domain limit), researched Proton alternatives on privacy grounds (Tuta comes out ahead on encryption but behind on jurisdiction — not a clean win either way), and landed on **Proton Pass Plus's SimpleLogin alias system** as the actual fix — a separate subscription/domain-slot system from Mail Plus that supports full send+receive on a custom domain alias, much cheaper than upgrading to Proton Unlimited. Walked the user through the setup steps; the very last message was troubleshooting why "Aliases" wasn't showing in their settings (answer: they were looking in Mail settings, not Pass settings, and needed to confirm the Pass Plus subscription actually went through).

## What Got Done

- [x] **Composite Index** — AIGS + Human Freedom Index + Digital Repression Index blended into one 0-100 score per country, 179 countries, choropleth map + sortable table view. `data/composite/`, `docs/methodology.md`.
- [x] **Live deployment** — biggestpicture.info, GitHub Pages via Actions, HTTPS enforced, DNS at IceDNS (A records + www CNAME), auto-rebuilds on push to `main`.
- [x] **Governance/funding docs** — `GOVERNANCE.md` (no-single-sphere-of-influence rule, RFC process), `FUNDING.md` (20% funder cap, excluded funder categories, public ledger).
- [x] **Primary Questions dataset** — 9-question rubric (`data/questions/questions.json`), schema + CI validation (`data/questions/schema.json`, `validate.js`, `.github/workflows/validate-data.yml`), 7 countries fully researched and cited, `CONTRIBUTING.md` for community additions.
- [x] **Site: Primary Questions view** — table with per-cell citation detail panel, wired into `site/index.html`.
- [x] **Landing page copy rewrite** — per user's draft, typos fixed, redundant frog-metaphor explanation collapsed to one pass.
- [x] **SolutionWatch: structural separation** — `site/solutionwatch/index.html`, own URL, shared stylesheet extracted to `site/style.css`, disclosure banner, honest empty state, no cross-links to/from the data pages.
- [x] **SolutionWatch: Partner & Affiliate Policy** — `PARTNERS.md`, published before any partner exists. Vetting criteria, exclusions, commercial terms (30% revenue cap per partner, mandatory affiliate labeling), 14-day comment + two-maintainer sign-off review process, annual re-review.
- [x] **Email provider research** — confirmed Proton Mail Plus's 1-custom-domain limit is the actual blocker; confirmed ImprovMX free tier is receive-only; researched and compared Tuta/Mailbox.org/Mailfence/Posteo as Proton alternatives; identified Proton Pass Plus/SimpleLogin as the correct low-cost path that stays inside the user's existing Proton account.

## What's In Progress

- [ ] **Non-technical contact mechanism (email)** — **State:** user has been walked through the Pass Plus/SimpleLogin setup steps (subscribe → pass.proton.me → Settings → Aliases → add domain → verify via TXT → get MX/SPF/DKIM → verify → create `partners@biggestpicture.info` alias → test). Last message was troubleshooting: user didn't see "Aliases" in settings because they were looking in Mail settings instead of Pass settings, and it's unconfirmed whether the Pass Plus subscription itself is actually active. **Remaining:** (1) user confirms Pass Plus is active at account.proton.me → Settings → Subscription, (2) user goes to pass.proton.me → Settings → Aliases → adds the domain, (3) user pastes me the TXT verification record, (4) I add it to IceDNS, (5) repeat for MX/SPF/DKIM once the domain verifies, (6) user creates the `partners@biggestpicture.info` alias, (7) test both receiving and sending. None of the DNS records have been added yet — we haven't gotten that far.
- [ ] **Wiring the finished email address into the SolutionWatch page** — once the email works, `site/solutionwatch/index.html`'s empty-state currently only offers "open a GitHub issue tagged partner-inquiry" — needs a decision (not yet made) on whether to add the email as an additional option or replace the GitHub issue path with it as primary.

## What Didn't Get Done (and Why)

- **Codeberg mirror** — discussed early (part of the original decentralization pitch, README.md's Mirrors section still says "add org URL once created") but never executed. Deprioritized in favor of getting the core site live first, then SolutionWatch took over.
- **IPFS pinning** — same story, README.md placeholder still unfilled ("add latest pinned CID once first release is cut").
- **MAINTAINERS.md** — `GOVERNANCE.md` explicitly references this file ("Every maintainer... discloses, in `MAINTAINERS.md`...") but it was never created. Doc/reality gap — low urgency while there's only one maintainer, but worth closing.
- **CODEOWNERS file** — `GOVERNANCE.md` references "own that axis's `CODEOWNERS` entry" but the file doesn't exist. Same category of gap.
- **Second maintainer recruitment** — `GOVERNANCE.md`'s core anti-capture rule (no more than one core-council seat per country/employer) is currently untested/aspirational since there's a bus factor of exactly one person on this project.
- **Growing Primary Questions past 7 countries** — was explicitly scoped as a "seed set to prove the format, then open to contributors" from the start; no additional countries were added after the initial 7. Not a gap so much as the next natural phase.
- **Partner vetting rubric as a standalone deliverable (item 3 of the original SolutionWatch plan)** — largely absorbed into `PARTNERS.md` already when it was written; whether the user wants more depth than what's there was left as an open question, never explicitly revisited.

## Architecture & Design Decisions

| Decision | Chosen Approach | Why | Alternatives Considered | Why Rejected |
|---|---|---|---|---|
| Composite scoring | Simple unweighted mean of available axes, no imputation | Transparent, defensible, doesn't fabricate missing data | Weighted composite; imputing missing values | Both would embed unstated judgment calls into a single number |
| Primary Questions scoring | NOT blended into a number, kept as 4-state graded answers with mandatory notes | Several questions (e.g. digital ID) are genuinely double-edged depending on implementation; forcing a single score would hide that judgment call | Score and fold into composite | Rejected explicitly — see `docs/methodology.md` "Deliberately not scored" |
| Site hosting | GitHub Pages via Actions workflow, `site/` folder only | Free, already using GitHub, Actions lets the build (data → HTML) run automatically on push | Deploy-from-branch Pages; separate hosting | Deploy-from-branch doesn't run the build step; separate hosting adds cost/complexity for no benefit yet |
| SolutionWatch structure | Fully separate page (`site/solutionwatch/`), own URL, zero cross-links to/from data pages | Prevents the "scores are tuned to drive affiliate clicks" credibility attack — separation needs to be structural, not just a verbal promise | A tab within the existing single-page site (like Composite/Questions) | A same-page tab is still one shared JS/data context — weaker signal of independence, easier to accidentally couple later |
| Partner review process | Mirrors `GOVERNANCE.md`'s RFC: 14-day public comment + two-maintainer sign-off from different countries/institutions | Reuses an anti-capture mechanism that's already justified and understood, applied to commercial listings instead of data | A simpler unilateral maintainer-approval process | Would recreate the exact single-actor-capture risk the rest of the project's governance exists to prevent |
| Contact mechanism (email) | Proton Pass Plus / SimpleLogin custom-domain alias | Full send+receive, ~$2-3/mo, stays inside the user's existing Proton account/login, doesn't touch the Mail Plus domain-slot limit | (a) ImprovMX free forwarding, (b) upgrade Proton Mail to Unlimited for a 2nd Mail custom domain, (c) switch to Tuta entirely | (a) free tier can't send-as, only receive; (b) works but notably more expensive just to get one more domain slot; (c) real option but a bigger move (migrating the user's whole email identity) than the ask warranted |

## Mental Model

**The core tension this whole project is built around:** a site that scores countries on "how much control does the state exert" needs to itself be structurally resistant to the same failure mode — a single funder, government, or company quietly shaping what gets published. Every governance document (`GOVERNANCE.md`, `FUNDING.md`, `PARTNERS.md`) is answering some version of "how do we prove we're not doing what we're measuring other institutions for doing." That's why funding has a hard 20% cap and an exclusion list, why axis changes need sign-off from maintainers in *different* countries, and why SolutionWatch — the one part of the project that will eventually make money — is kept on a completely separate URL with a policy published *before* any revenue exists rather than after. If you're extending this project, ask "does this change let one actor quietly shape the output" before building it — that's the actual design constraint, more than any specific rule already written down.

**Build pipeline, concretely:** `site/index.html` is *generated*, never hand-edit it — edit `site/build/template.html`, then from `site/build/` run `node generate_paths.js && node inject.js`. `generate_paths.js` projects `data/geo/world.geojson` into SVG paths and joins them against `data/composite/*.json`; `inject.js` splices those paths plus `data/questions/**` into the template and writes `site/index.html`. `site/style.css` and `site/solutionwatch/index.html` are hand-authored static files with no build step — editing them directly is correct.

**The GitHub Pages footgun already hit once:** the Actions workflow uploads only the `site/` folder as the Pages artifact. Anything outside `site/` (docs/, root `.md` files, `data/`) is in the git repo but **not on the live website**. A relative link like `../docs/methodology.md` from within `site/` works when testing locally (where the sibling folder actually exists on disk) but 404s in production (where only `site/`'s contents exist at the domain root). Every link from the live site to a project doc has to be a full `github.com/biggestpicture/biggestpicture/blob/main/...` URL, not a relative path. This bit us once already (footer links) — don't repeat it.

**Local testing pattern that worked well:** spin up a throwaway Node `http.createServer` rooted at `site/` (not the repo root) so absolute paths like `/solutionwatch/` resolve exactly like they will on the real domain, then drive it with the Browser pane tools before pushing. The `computer` tool's coordinate-based clicks were unreliable in this environment (see Known Issues) — prefer `read_page` → ref-based clicks, and fall back to dispatching `.click()` via `javascript_tool` on a matched element to isolate whether a failure is the app or the automation tooling.

## Known Issues & Risks

- **Browser pane `computer` tool flakiness** — Impact: coordinate-based clicks and `screenshot` actions repeatedly timed out or silently failed to register in this environment, even when coordinates matched the target element's actual bounding rect. Workaround: use `read_page`'s `ref_N` handles for clicks where possible; for verification, dispatch `.click()` directly via `javascript_tool` on a `querySelector`-matched element to confirm the underlying app logic works, independent of the automation layer. Fix: none needed on the project side — this is an environment/tooling quirk, not an app bug, but worth remembering so it's not mistaken for a real regression next time.
- **SolutionWatch has no working non-technical contact method yet** — Impact: the only current path (GitHub issue) is exactly what the user explicitly asked to move away from. Workaround: none yet. Fix: finish the Pass Plus alias setup (see Next Steps #1).
- **Doc/reality gaps** — `GOVERNANCE.md` references `MAINTAINERS.md` and `CODEOWNERS`, neither exists yet. Low risk today (single maintainer), becomes a real problem the moment a second maintainer joins and there's no disclosure file to point them to.
- **Bus factor of one** — the entire anti-capture governance model assumes multiple maintainers from different countries/institutions; right now that's aspirational, not real. Not urgent to fix, but worth being honest about if anyone asks "so is this actually decentralized yet."

## What Worked Well

- **Delegating heavy research to agents with very explicit prompts, then spot-checking a sample by hand** — used for both the composite dataset sourcing and the Primary Questions country research. Both times the agents produced well-cited, appropriately-hedged output (flagging their own low-confidence answers), and hand spot-checks against primary sources (Merics, HRNK, RSF, government pages) confirmed the claims rather than finding errors. This is the pattern to reuse for growing Primary Questions coverage past 7 countries.
- **WebSearch before answering fast-changing factual questions** — caught the Mail Plus 1-domain limit, the ImprovMX free-tier gap, and correctly distinguished Pass Plus/SimpleLogin aliases from Mail's own custom-domain feature. See `feedback_verify-before-answering` in persistent memory — this paid off enough times in one session that it's now saved as a standing default for this user.
- **RDAP/API checks for name availability** (domains via `rdap.org`, GitHub/Codeberg org names via their public APIs) instead of guessing or trusting a single search result — fast, authoritative, cheap.
- **Testing against a locally-rooted server that mimics production URL structure** before pushing — caught the footer-link 404 bug before it would have otherwise gone unnoticed for a while.

## What Didn't Work (Traps to Avoid)

- **Assuming a free-tier product feature exists without checking** — the original plan (before the user asked "can I also answer with this mail?") would have shipped ImprovMX's free tier as the contact mechanism, which can't actually send mail as the alias. Caught only because the question got asked and then researched. Don't assume — check.
- **Assuming "more private than X" has a clean answer** — investigated whether any provider is simply "more private than Proton" and found it's a genuine multi-axis tradeoff (jurisdiction vs. encryption completeness vs. legal track record), not a strict ranking. Presented honestly rather than picking a winner to seem decisive; this was the right call — don't oversimplify contested comparisons into a fake clean answer.
- **`computer` tool coordinate clicks in this environment** — see Known Issues. Don't burn time re-trying the same coordinate click after one failure; switch to ref-based or JS-dispatched clicks immediately.

## Next Steps (Priority Order)

1. **Finish the Proton Pass Plus alias setup.** First, get the user to confirm at account.proton.me → Settings → Subscription whether Pass Plus is actually active (this was the exact open question when the session ended). If not active, they need to subscribe first. Once active: guide them to pass.proton.me → Settings → Aliases → add `biggestpicture.info` as a custom domain → they paste the TXT verification record here → add it to IceDNS → wait for verification → they get MX/SPF/DKIM records → add those to IceDNS too → verify → they create the `partners@biggestpicture.info` alias → test both receiving (send a test email to it) and sending (compose from the alias in Pass, confirm the recipient sees the right From address).
2. **Wire the working email into `site/solutionwatch/index.html`.** Once step 1 is confirmed working, decide with the user whether the email supplements or replaces the "open a GitHub issue" contact path in the empty-state block, then edit the file, rebuild is not needed (this file has no build step, hand-edit directly), test locally, commit, push, verify live.
3. **Create `MAINTAINERS.md`** with at minimum the current sole maintainer's disclosure entry (per `GOVERNANCE.md`'s existing requirement that this file exists) — closes a doc/reality gap that's currently just an unlinked reference.
4. **Create `CODEOWNERS`** mapping the composite index's three axes to stewardship (currently just the one maintainer, but the file should exist and be structured so it's ready when a second maintainer joins).
5. **Codeberg mirror + IPFS pinning** — both were part of the original decentralization pitch and are still just placeholder text in README.md's Mirrors section. Codeberg: user needs to create the account/org (same account-creation constraint as GitHub earlier), then `git remote add codeberg ...` + push. IPFS: needs a pinning approach decided (a pinning service account, or a local node) — this was flagged as future work early in the session and never revisited.
6. **Grow Primary Questions past 7 countries** — reuse the research-agent-then-spot-check pattern that worked well; the `CONTRIBUTING.md` process is also ready for outside contributors if the user wants to publicize the repo for that purpose.

## Rollback Plan

- **Last known good state:** commit `edb1cc1` ("Add PARTNERS.md: the vetting and commercial policy for SolutionWatch") — this is also the current `HEAD`, matches `origin/main` exactly, and is fully deployed and verified live at biggestpicture.info. There is nothing to roll back; the repo is in a clean, stable, shippable state as of this handover.
- **If the email/DNS work goes wrong:** IceDNS record changes are independently and immediately reversible (edit or remove the record) — no site code is touched by the email setup, so a DNS mistake can't break the live site.
- **Safe reset command (only if ever needed):** `git reset --hard edb1cc1` — not expected to be necessary, documented for completeness.

## Files Changed This Session

Full session, roughly in order — see `git log --oneline` for exact commits:

- `data/composite/`, `docs/methodology.md`, `site/*` (initial build) — composite index + site + deployment scaffolding
- `README.md`, `LICENSE`, `GOVERNANCE.md`, `FUNDING.md`, `.gitignore` — governance scaffolding
- `.github/workflows/deploy.yml` — Pages deploy automation
- Footer link fix (relative → absolute GitHub URLs) after production 404s were found
- `data/questions/*`, `CONTRIBUTING.md`, `.github/workflows/validate-data.yml`, `site/index.html` (Primary Questions tab) — second dataset
- `site/build/template.html` (landing copy rewrite)
- `site/style.css` (extracted from inline), `site/solutionwatch/index.html`, nav changes across pages — SolutionWatch separation
- `PARTNERS.md`, cross-references added to `GOVERNANCE.md`/`FUNDING.md`/`README.md` — partner policy
- `HANDOVER.md` (this file, new)

## Open Questions

- Is Pass Plus actually active on the user's account yet? (Blocking next step — first thing to check.)
- Once email works: does it supplement or replace the GitHub-issue contact path on SolutionWatch?
- Does the user want more depth in `PARTNERS.md`'s vetting rubric than what's already there, or is the current level sufficient (original "item 3" of the plan was never explicitly closed out)?
- Timeline/appetite for Codeberg + IPFS mirroring — genuinely deferred, not clear if/when the user wants to prioritize it over growing the Primary Questions dataset or finishing SolutionWatch.
- Does the user have a plan for recruiting a second maintainer, or is that not a near-term concern?
