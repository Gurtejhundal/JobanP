# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Durable Portfolio Direction

- Preserve the reference site's editorial cream/charcoal structure, identity reveal, portrait-led intro, circular skill field, project studies, research papers, horizontal milestone rail, and contact finish.
- Keep display type materially smaller and more readable than the reference.
- Use the local Gloock, Hanken Grotesk, and IBM Plex Mono font system; do not revert to the reference site's common serif treatment.
- Mobile layouts must be intentionally reflowed with no accidental horizontal overflow or cropped content.
- Do not publish Aayush Soni's portrait, achievements, project claims, education, or contact details as Jobanpreet Singh's.
- Use cinematic, performance-safe spatial motion inspired by the reference portfolios: layered portrait depth, paper/card perspective, and deliberate section transitions. Avoid random particles, decorative 3D clutter, and scroll hijacking.
