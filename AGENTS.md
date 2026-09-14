# AI Monthly Digest — Working Agreement

Canonical instructions for any coding agent working in this repo. Tool-specific files
(`CLAUDE.md`, `.github/copilot-instructions.md`) defer to this document; keep rules here and
reference them from there rather than restating them.

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
2. **Verify** every story against the sourcing rules below before writing a word of markup.
3. **Copy the newest existing deck** to `months/YYYY-MM/` — never the oldest. Older decks carry
   stale markup and drift.
4. Update the deck `<title>`, `<h1>`, and meta description.
5. Write the ten slides.
6. Add a card to `index.html` and update the `Latest: <Month> <Year>` line.
7. Run the checks below.
8. Publish.

## Sourcing rules

This is where the work actually goes wrong. Treat every claim as unverified until it isn't.

- **Aggregators and SEO roundups are leads, not sources.** Follow them to a primary source (the
  lab's own post, the filing, the press release) or a reputable outlet, and cite that.
- **Confirm the date falls inside the digest month.** The most common failure is a story that
  is months old, or a projection being recycled as news. Check the event date, not the
  article's publication date.
- **Distinguish a projection from a confirmed result.** "On track for" and "reported" are
  different slides.
- **Carry the qualifier.** If a figure is "adjusted", "annualized", or internal-documents-only,
  the slide says so.
- **When reputable sources conflict on a number, omit the number.** Do not pick a side.
- **State what is not yet established** — unreviewed results, unreleased models, denied
  allegations.
- **Never invent an image URL.** Harvest it from the article you are citing and confirm it
  loads.

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

- Semantic HTML; ordered headings; no inline styles or inline event handlers.
- Buttons declare an explicit `type`.
- Images carry descriptive `alt` text and `loading="lazy"`.
- Each deck includes a skip link, an ARIA live region, and descriptive `aria-label`s.
- `font-display=swap` on web fonts; meta description on every page.
- All styling in `styles.css` using CSS variables — no unused selectors, no deprecated or
  prefixed features. `:focus-visible` outlines, `prefers-reduced-motion` support, 44px minimum
  touch targets. Two-column on desktop, stacked on mobile.
- All logic in the monthly `script.js` via `addEventListener`, with null checks on every DOM
  query. Keyboard (Arrow/PageUp/PageDown/Home/End), touch/swipe, and `#N` hash navigation
  including `hashchange` must all work.
- If `script.js` changes, apply it to **every** month so the nine copies stay identical.

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

Finally re-check the deck against the content rules: 10 slides, 2–3 sentences each, 2–4
`<strong>` each, 10 images with alt text and credits.

## Publishing

Pushing to `main` triggers `.github/workflows/deploy.yml`, which publishes the repo root to
GitHub Pages. "Publish" means commit and push; confirm the workflow succeeded and the new
pages return 200.
