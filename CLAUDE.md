# Sombreros Mexican Restaurant — Claude Instructions

## Code Specificity
Write every selector, variable, function name, and label specific to Sombreros Mexican Restaurant.
Never use generic placeholders like `#hero`, `.card`, `menuItem`, or "Restaurant Name".
Use names like `#sombreros-hero-banner`, `.sombreros-menu-card`, `sombrerосOpenHours`, etc.
This prevents ambiguity as the codebase grows and reduces the need for extra documentation.

## Mobile-First Development
Always design and write every new feature mobile-first, then layer desktop styles on top via `min-width` media queries.
Define the mobile layout, spacing, and font sizes as the base styles.
Add `@media (min-width: 768px)` for tablet adjustments and `@media (min-width: 1024px)` for desktop.

## SEO & Accessibility Vetting
Every new feature or page added to this site must be vetted for SEO and accessibility before it is considered done.

**SEO checklist:**
- Use semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) instead of generic `<div>` soup.
- Every page has a unique, descriptive `<title>` and `<meta name="description">` relevant to Sombreros Mexican Restaurant.
- Images use descriptive, keyword-relevant `alt` text (e.g. `alt="Sombreros Mexican Restaurant carne asada tacos plate"`), never `alt=""` on content images.
- Heading hierarchy is logical (one `<h1>` per page, no skipped levels).
- Local business info (name, address, phone, hours) is marked up consistently and, where practical, includes structured data (`schema.org/Restaurant` JSON-LD).
- Links use descriptive text, not "click here."

**Accessibility checklist:**
- All interactive elements (buttons, links, menu toggles, forms) are reachable and operable via keyboard alone.
- Color contrast meets WCAG AA (4.5:1 for normal text, 3:1 for large text) — check this against the Sombreros brand palette.
- Form inputs have associated `<label>` elements; icon-only buttons have `aria-label`.
- Focus states are visible, never removed with `outline: none` unless replaced with an equally visible alternative.
- Interactive/dynamic components (modals, carousels, accordions, nav menus) use correct ARIA roles/attributes and manage focus properly.
- Motion/animation respects `prefers-reduced-motion`.

Treat this as a required step alongside mobile-first styling and specific naming — not an optional pass at the end.
