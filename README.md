# AI Monthly Digest

A static, accessible slide deck collection with one 10-slide deck per month. Each deck showcases AI news and trends with images, credits, and presentation-ready formatting.

## Structure

- index.html: landing page
- styles.css: shared styles
- months/YYYY-MM/index.html: monthly deck
- months/YYYY-MM/script.js: monthly deck behavior

## Usage

Open index.html in a modern browser and select a month. Navigate with keyboard, touch gestures, or buttons. Share specific slides using URL hashes (#1, #2, etc.).

## Add a Month

1. Copy months/2026-01 to months/YYYY-MM.
2. Update index.html with a new card link.
3. Replace the 10 slide headlines, descriptions, images, and credits.
4. Update source links to article pages.

## Features

**Navigation:**

- Arrow keys (Left/Right), Page Up/Down, Home/End
- Touch/swipe gestures on mobile
- URL hash navigation for deep linking (#1, #2, etc.)
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
- Font-display=swap for web fonts.
- Meta description for each deck.
- Images with loading="lazy".

## Agent Files

- .github/copilot-instructions.md: core agent rules
- .github/agents/slide-deck.agent.md: specialized deck editor agent
- .github/skills/web-presentation/SKILL.md: reusable presentation skill
