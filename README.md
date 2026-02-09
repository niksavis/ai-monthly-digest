# AI Monthly Digest

A static, browser-ready slide deck collection with one 10-slide deck per month.

## Structure

- index.html: landing page
- styles.css: shared styles
- months/YYYY-MM/index.html: monthly deck
- months/YYYY-MM/script.js: monthly deck behavior

## Usage

Open index.html in a modern browser and select a month.

## Add a Month

1. Copy months/2026-01 to months/YYYY-MM.
2. Update index.html with a new card link.
3. Replace the 10 slide headlines and descriptions.

## Rules

- Each deck has exactly 10 slides.
- Each slide has 1 headline and 1-2 sentences.
- ArrowLeft/ArrowRight/PageUp/PageDown must navigate.
- No inline styles or inline event handlers.
- All styling in styles.css; all logic in the monthly script.js.

## Agent Files

- .github/copilot-instructions.md
- .github/agents/slide-deck.agent.md
- .github/skills/web-presentation/SKILL.md
