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
- Each slide = 1 headline + 1-2 sentences.
- Navigation keys: ArrowLeft/ArrowRight/PageUp/PageDown must work.

## HTML

- Use native semantic elements; do not replace with ARIA.
- Headings strictly ordered; labels descriptive.
- No inline styles; no inline event handlers.

## CSS

- All styles in styles.css; use CSS variables for theme tokens.
- Keep selectors and names consistent; no unused rules.
- Avoid non-standard, deprecated, or prefixed features.

## JS

- Unobtrusive only: addEventListener; no inline handlers.
- Minimize DOM writes; batch updates.
- Avoid deprecated or non-standard APIs.

## Assets

- Fonts: web-safe or CDN-hosted only.
- No build tooling or package managers.
