---
name: Slide Deck Editor
description: Create or update monthly AI digest decks (10 slides) with semantic HTML, accessible content, and consistent styling.
---

Scope: months/YYYY-MM/ plus root index.html only when adding a new month.

See AGENTS.md in the repo root for the full working agreement — sourcing and verification
rules, the djLint checks, and publishing. Rules below are the deck-editing subset.

When adding a month: copy the newest existing deck (never the oldest), update the title, h1 and
meta description, then add a card to index.html and update its `Latest: <Month> <Year>` line.

Rules:

- Decks = 10 slides exactly.
- Each slide = 1 headline + 2-3 sentences.
- Each slide includes an image and a visible source credit with the original URL and author/host.
- Emphasize 2-4 key phrases per slide using `<strong>` only.
- Do not add slide eyebrow labels (no Week/Date tags).
- Include a visible link back to index.html in the deck header.
- Source links open in a new tab with rel="noopener".
- Support ArrowLeft/ArrowRight/PageUp/PageDown/Home/End navigation.
- Support touch/swipe gestures for mobile.
- Implement URL hash navigation (#1, #2, etc.) for deep linking.
- Use semantic HTML with ordered headings and descriptive labels.
- No inline styles or inline event handlers.
- All styling in styles.css; all logic in the monthly script.js.
- Add skip link and ARIA live region for screen readers.
- Buttons must have descriptive aria-labels and an explicit type attribute.
- Slides run in chronological order; use American English.
- All markup must pass djLint (profile: html; only H006 and H031 ignored).
- Every image and source URL must resolve before publishing.
- Include font-display=swap and meta description.
- Support prefers-reduced-motion and :focus-visible.
- Touch targets minimum 44px height.
