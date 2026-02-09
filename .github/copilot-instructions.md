# AI Monthly Digest: Agent Rules

## Project

- Static site; runs in any modern browser; no build step.
- External libraries: CDN only.

## Structure

- Landing: index.html
- Shared styles: styles.css
- Month deck: months/YYYY-MM/index.html + months/YYYY-MM/script.js

## Slides

- Each deck = 10 slides exactly.
- Each slide = 1 headline + 2-3 sentences.
- Each slide includes exactly 1 image and a visible credit with original URL + author/host.
- Emphasize 2-4 key phrases per slide using <strong> only.
- No eyebrow labels (no Week/Date tags).
- Provide a visible link back to index.html on each deck.
- Source links open in a new tab with rel="noopener".
- Navigation keys: ArrowLeft/ArrowRight/PageUp/PageDown/Home/End must work.
- Touch/swipe navigation must work on mobile devices.
- URL hash navigation: slides must be linkable via #1, #2, etc.

## HTML

- Use native semantic elements; do not replace with ARIA.
- Headings strictly ordered; labels descriptive.
- No inline styles; no inline event handlers.
- Include skip link for keyboard users.
- Add ARIA live region for slide announcements.
- Buttons must have descriptive aria-labels.
- Add font-display=swap to web fonts.
- Include meta description for each deck.

## CSS

- All styles in styles.css; use CSS variables for theme tokens.
- Keep selectors and names consistent; no unused rules.
- Avoid non-standard, deprecated, or prefixed features.
- Deck layout: two-column on desktop, stacked on mobile.
- Include :focus-visible styles with clear outlines.
- Support prefers-reduced-motion for accessibility.
- Touch targets minimum 44px height.

## JS

- Unobtrusive only: addEventListener; no inline handlers.
- Minimize DOM writes; batch updates.
- Avoid deprecated or non-standard APIs.
- Support touch/swipe gestures for navigation.
- Implement URL hash navigation for deep linking.
- Update ARIA live region on slide changes.
- Include null checks for all DOM queries.

## Assets

- Fonts: web-safe or CDN-hosted only.
- No build tooling or package managers.
