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
