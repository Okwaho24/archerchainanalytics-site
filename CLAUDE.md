
## Design system
- Before any UI work, read `design/TASTE.md` and `design/tokens.css`.
- Use only tokens from `design/tokens.css`. No hardcoded colors, sizes or radii.
- Check `design/references/` for visual targets before building a section.
- `vercel-DESIGN.md` and `apple-DESIGN.md` are references for structure and craft only. Do not copy their colors or fonts. `TASTE.md` and `tokens.css` override them.
- After building, run `node design/shoot.mjs <url> <name>`, view `design/screenshots/`, and fix mismatches against TASTE.md before reporting done.
- Never edit `design/screenshots/` by hand.
