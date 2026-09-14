# AI Monthly Digest

A static, accessible slide deck collection with one 10-slide deck per month. Each deck showcases AI news and trends with images, credits, and presentation-ready formatting.

Live site: <https://niksavis.github.io/ai-monthly-digest/>

## Structure

- index.html: landing page
- styles.css: shared styles
- months/YYYY-MM/index.html: monthly deck
- months/YYYY-MM/script.js: monthly deck behavior (identical in every month; copied rather than shared)

## Usage

Open index.html in a modern browser and select a month. Navigate with keyboard, touch gestures, or buttons. Share specific slides using URL hashes (#1, #2, etc.).

No build step and no package manager: the site is served exactly as it appears in the repository.

## Add a Month

1. Copy the most recent month (for example months/2026-09) to months/YYYY-MM. Always copy the newest deck, not the oldest, so you inherit the current markup and script.
2. Add a card link to index.html and update the `Latest: <Month> <Year>` line in the header.
3. Update the deck title, the meta description, and the `<h1>` for the new month.
4. Replace the 10 slide headlines, descriptions, images, and credits.
5. Update source links to article pages.
6. Run the checks below before committing, including the claim-to-source audit:
   re-read each slide against the article it links to and cut anything that source
   does not support.

## Checks

All markup must pass djLint using the committed .djlintrc (`profile: html`, ignoring only H006 and H031). Every other rule must be satisfied.

```sh
# lint rules
djlint index.html months/*/index.html

# formatting (use --reformat to apply)
djlint --check index.html months/*/index.html
```

Both commands must report zero errors and zero files to update.

`.github/workflows/checks.yml` runs these plus instruction-file alignment, deck script
consistency, and the content rules. It runs on every pull request, and the deploy workflow
requires it to pass before publishing.

Before publishing a deck, confirm every image and source URL still resolves — external images are hotlinked, so a dead URL leaves a broken slide.

## Deploy

Pushing to `main` triggers .github/workflows/deploy.yml, which runs the checks and then publishes the repository root to GitHub Pages. A push that fails checks is not deployed. There is nothing to build; the deployed site is the committed files.

## Features

**Navigation:**

- Arrow keys (Left/Right), Page Up/Down, Home/End
- Touch/swipe gestures on mobile
- URL hash navigation for deep linking (#1, #2, etc.), including response to hash changes
- Previous/Next buttons

**Accessibility:**

- Skip link for keyboard users
- ARIA live announcements for screen readers
- Descriptive aria-labels on all controls
- :focus-visible indicators
- Prefers-reduced-motion support
- 44px minimum touch targets

**Layout:**

- Two-column grid on desktop (1320px max width)
- Stacked layout on mobile
- Centered canvas for consistent experience
- Responsive typography and images

## Content Rules

- Each deck has exactly 10 slides.
- Each slide has 1 headline + 2-3 sentences.
- Each slide includes 1 image with visible credit (original URL + author/host).
- Emphasize 2-4 key phrases per slide using `<strong>`.
- Source links open in new tab with rel="noopener".
- No eyebrow labels (no Week/Date tags).
- Include "All digests" link back to index.html in deck header.

## Technical Rules

- Semantic HTML only; no inline styles or handlers.
- All styling in styles.css with CSS variables.
- All logic in monthly script.js with addEventListener.
- Buttons declare an explicit type attribute.
- Font-display=swap for web fonts.
- Meta description for each deck.
- Images with loading="lazy" and descriptive alt text.

## Agent Files

Agent instructions live in three **byte-identical** copies, because each tool auto-loads a
different filename and each copy must be complete on its own:

- AGENTS.md — read by Codex and most coding agents
- CLAUDE.md — read by Claude Code
- .github/copilot-instructions.md — read by GitHub Copilot

Edit all three together. Verify alignment with:

```sh
cmp AGENTS.md CLAUDE.md && cmp AGENTS.md .github/copilot-instructions.md && echo aligned
```
