# AI Monthly Digest — Agent Instructions

Canonical instructions for any coding agent working in this repo.

**This file is maintained as three byte-identical copies:** `AGENTS.md`, `CLAUDE.md`, and
`.github/copilot-instructions.md`. Each tool auto-loads a different one, so each must be
complete on its own. **Edit all three together or they will drift.** Verify with:

```sh
cmp AGENTS.md CLAUDE.md && cmp AGENTS.md .github/copilot-instructions.md && echo aligned
```

## What this repo is

A static site published to GitHub Pages: one 10-slide deck per month covering that month's AI
news. No build step, no package manager, no dependencies. The deployed site is the committed
files.

- `index.html` — landing page (cards + `Latest: <Month> <Year>` line)
- `styles.css` — all styling, shared by every deck
- `months/YYYY-MM/index.html` — one month's deck
- `months/YYYY-MM/script.js` — deck behavior; **identical in every month**, copied not shared

## Building a month

1. **Research** the calendar month. Gather more candidates than needed and let the requester
   choose; do not pick the ten yourself unless asked.
2. **Verify** every story against the sourcing rules below before writing any markup.
3. **Copy the newest existing deck** to `months/YYYY-MM/` — never the oldest. Older decks carry
   stale markup and drift.
4. Update the deck `<title>`, `<h1>`, and meta description.
5. Write the ten slides.
6. Add a card to `index.html` and update the `Latest: <Month> <Year>` line.
7. Run the checks below.
8. Publish.

## Sourcing rules

This is where the work actually goes wrong. Treat every claim as unverified until it isn't.

- **Every claim on a slide must be supported by the source that slide links to** — not by
  something else you read along the way. If a detail comes from elsewhere, either cite that
  source instead or cut the detail. Blending one fetched article with half-remembered search
  summaries is how a slide ends up asserting things its own citation does not contain. This is
  the most common defect found in review, and it is invisible until someone clicks through.
- **Prefer a source you can actually retrieve.** If the outlet blocks you, you cannot check
  what it says, so do not cite it — find one you can read.
- **Check attribution, not just facts.** Who said, published, or proposed something is as easy
  to get wrong as a number and much harder to spot later.
- **Tie every figure to its moment.** A peak and a close, a projection and a result, a quarter
  and a run rate are different numbers; never let one stand in for another.
- **Aggregators and SEO roundups are leads, not sources.** Follow them to a primary source (the
  lab's own post, the filing, the press release) or a reputable outlet, and cite that.
- **Confirm the event date falls inside the digest month.** Watch for a story that is months
  old, or a projection recycled as news. Check the event date, not the article's publication
  date.
- **Distinguish a projection from a confirmed result.** "On track for" and "reported" are
  different slides.
- **Carry the qualifier.** If a figure is "adjusted", "annualized", or from internal documents
  only, the slide says so.
- **When reputable sources conflict on a number, omit the number.** Do not pick a side.
- **State what is not yet established** — unreviewed results, unreleased models, denied
  allegations.
- **Never invent an image URL.** Harvest it from the article you are citing and confirm it
  loads.
- **Do not identify a reused stock image from existing `alt` text.** The same photo ID is
  described differently in different decks, so that text is not evidence of what the image
  shows.

## Content rules

- Exactly 10 slides per deck.
- Each slide: 1 headline + 2–3 sentences.
- Emphasize 2–4 key phrases per slide with `<strong>` — no more, no fewer.
- Each slide has exactly 1 image with a visible credit: image host + author/host, plus a
  `Source` link to the article.
- Source links open in a new tab with `rel="noopener"`.
- No eyebrow labels (no Week/Date tags).
- Every deck links back to `index.html` ("All digests") in its header.
- Slides run in chronological order within the month.
- American English (`behavior`, `program`, `license`, `modeled`).

## Markup, styling, behavior

- Semantic HTML with ordered headings; use native elements rather than replacing them with
  ARIA. No inline styles or inline event handlers.
- Buttons declare an explicit `type` and a descriptive `aria-label`.
- Images carry descriptive `alt` text and `loading="lazy"`.
- Each deck includes a skip link, an ARIA live region updated on slide change, and a meta
  description.
- Web fonts are CDN-hosted with `font-display=swap`. External libraries: CDN only. No build
  tooling or package managers.
- All styling in `styles.css` using CSS variables. Consistent selector names, no unused rules,
  no deprecated or prefixed features. `:focus-visible` outlines, `prefers-reduced-motion`
  support, 44px minimum touch targets. Two-column on desktop, stacked on mobile.
- All logic in the monthly `script.js` via `addEventListener`, with null checks on every DOM
  query and batched DOM writes. No deprecated or non-standard APIs. Keyboard
  (Arrow/PageUp/PageDown/Home/End), touch/swipe, and `#N` hash navigation including
  `hashchange` must all work, and keyboard navigation must stay intact.
- If `script.js` changes, apply it to **every** month so the copies stay identical.

## Checks

All markup must pass djLint with the committed `.djlintrc` (`profile: html`, ignoring only
H006 and H031). Every other rule must be satisfied.

```sh
djlint index.html months/*/index.html                 # rules — must report 0 errors
djlint --check index.html months/*/index.html         # format — must report 0 files to update
```

Then confirm **every image and source URL resolves**. External images are hotlinked, so a dead
URL is a broken slide:

```sh
curl -s -o /dev/null -w '%{http_code}' -L -A 'Mozilla/5.0' "$URL"
```

Then re-check the deck against the content rules: 10 slides, 2–3 sentences each, 2–4
`<strong>` each, 10 images with alt text and credits.

### Claim-to-source audit — required, and not automatable

Finally, take each slide one at a time and re-read the article it links to. For every factual
claim on that slide — number, date, quote, name, attribution — confirm it appears in that
source. Cut or re-source anything that does not.

Nothing automated can do this. djLint validates markup, the content check counts sentences and
tags, and the URL check only proves a link resolves — none of them read. Do this **after the
deck is written**, not only while researching: the defect appears during writing, when
material from several sources gets compressed into three sentences carrying one citation.

`.github/workflows/checks.yml` enforces the mechanical checks — instruction-file alignment,
identical deck scripts, both djLint passes, and the content rules. It runs on every pull
request, and `deploy.yml` calls it as a required gate, so **a push that fails checks does not
reach the live site.** It does **not** check external URLs (rate limits and bot
blocks make that too flaky for CI) and it cannot check whether a slide matches its source, so
link verification and the claim-to-source audit both stay manual steps before publishing.

## Environment notes

- **Run `git fetch` before reporting that a month is missing.** Months are pushed from more
  than one machine; a stale clone will make you report a gap that does not exist. Check
  `origin/main`, not just the working tree.
- **djLint is usually not installed**, and system Python may be externally managed (PEP 668).
  Use a throwaway virtualenv rather than fighting `pip install --user`.
- **`djlint --reformat` rewrites whitespace across a whole file.** Afterward, prove nothing
  semantic changed — parse before/after and diff the rendered text plus every element
  attribute. Do not eyeball a 300-line diff.
- **Automated page fetchers are blocked (403) by outlets that serve readers fine** — Axios,
  CNBC, the Washington Post, `senate.gov`, TechXplore. So: choose a `Source` link you could
  actually retrieve and verify, and never conclude a URL is dead because a fetch tool failed.
  Confirm link health with `curl -L -A 'Mozilla/5.0'`.

## Scope

Stay inside `months/YYYY-MM/` plus `index.html` when adding a month. Changing `styles.css` or
`script.js` affects every deck — if you do, say so explicitly.

## Publishing

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs the checks first and
publishes the repo root to GitHub Pages only if they pass. If checks fail the deploy is
skipped and the live site stays on the last good commit. "Publish" means commit and push;
confirm both workflows succeeded and the new pages return 200.
