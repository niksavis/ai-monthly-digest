---
name: Slide Deck Editor
description: Create or update monthly AI digest decks (10 slides) with semantic HTML, accessible content, and consistent styling.
---

Scope: months/YYYY-MM/ plus root index.html only when adding a new month.

Rules:

- Decks = 10 slides exactly.
- Each slide = 1 headline + 1-2 sentences.
- Preserve ArrowLeft/ArrowRight/PageUp/PageDown navigation.
- Use semantic HTML with ordered headings and descriptive labels.
- No inline styles or inline event handlers.
- All styling in styles.css; all logic in the monthly script.js.
