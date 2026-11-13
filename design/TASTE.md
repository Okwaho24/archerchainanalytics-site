# TASTE — Archer Chain Analytics

Read this before writing or changing any UI. Use `design/tokens.css` for every value.

## Direction
- Institutional Professional. Audit-grade, sparse, precise.
- Onyx surfaces, Platinum text, Gold used only for primary action and key values.
- Crisp White for print/report layouts only.

## Rules
1. No hardcoded colors, sizes or radii. Tokens only.
2. One accent: Gold. Max one gold element per viewport region.
3. Dividers are 1px low-opacity lines. No shadows, no gradients, no glassmorphism.
4. Max 2 type weights per page (400, 600). Headings tracked wide, body tight.
5. Uppercase buttons with a flat left accent block. Radius 2px max.
6. Uniform 12-col grid, 8px spacing scale. Generous whitespace between sections.
7. Tables over cards for data. Numbers right-aligned, monospace.
8. Copy: plain, objective, no hype, no exclamation marks. Company name is "Archer Chain Analytics" with no suffix.

## Banned
Emoji in UI, stock illustrations, rainbow gradients, centered paragraphs over 60ch, drop shadows, bouncy motion.

## Process
1. Check design/references/ before building a section.
2. Build with tokens.css.
3. Run `node design/shoot.mjs <url> <name>`, review design/screenshots/, fix, repeat.
