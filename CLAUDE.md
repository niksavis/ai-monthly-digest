# CLAUDE.md

**Read `AGENTS.md` first — it is the authoritative working agreement for this repo** (what the
site is, how to build a month, sourcing rules, content rules, checks, publishing). This file
adds only Claude Code operational notes. Do not restate `AGENTS.md` rules here; fix them there.

## Before you say a month is missing

`git fetch` first. Months are pushed from more than one place, and a stale clone will make you
report a gap that does not exist. Check `origin/main`, not just the working tree.

## Tooling in this environment

- **djLint is not installed and the system Python is externally managed** (PEP 668). Create a
  venv in the scratchpad rather than fighting `pip install --user`:

  ```sh
  python3 -m venv /tmp/<scratch>/djlint-venv
  /tmp/<scratch>/djlint-venv/bin/pip install djlint
  /tmp/<scratch>/djlint-venv/bin/djlint index.html months/*/index.html
  ```

- **`djlint --reformat` rewrites whitespace across a whole file.** After running it, prove
  nothing semantic changed — parse before/after and diff the rendered text plus every element
  attribute. Do not eyeball a 300-line diff.

## Research tooling

- **`WebFetch` is blocked (403) by several outlets** that serve fine to readers — Axios, CNBC,
  the Washington Post, `senate.gov`, TechXplore. Two consequences: pick a `Source` link from an
  outlet you could actually read and verify, and never conclude a URL is dead because WebFetch
  failed. Confirm link health with `curl -L -A 'Mozilla/5.0'` instead.
- **Verify URLs in bulk before committing**, not after. Every `src` and `href` in the new deck
  should return 200 — see the check in `AGENTS.md`.
- **Do not reuse an Unsplash URL by inferring its subject from existing `alt` text.** The same
  photo ID is described differently in different decks, so the alt text is not reliable
  evidence of what the image shows. Harvest images from the article you are citing.

## Scope

Stay inside `months/YYYY-MM/` plus `index.html` when adding a month. Changing `styles.css` or
`script.js` affects all nine decks — if you do, say so explicitly and apply `script.js` to
every month so the copies stay identical.
