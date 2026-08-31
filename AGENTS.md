# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Durable Portfolio Direction

- The portfolio is now an original "Swiss field notes" system. Do not use Aayush Soni's portfolio or any other live portfolio as a structural source.
- The supplied hero image is the source of truth only for hero anatomy: left statement, central portrait, right proof points, and a capability strip below.
- Use compact editorial grids, rules, ledgers, warm bone, near-black, and one signal-red accent. Avoid the previous identity reveal gate, circular skill field, and stacked-paper research treatment.
- Use the local Gloock, Hanken Grotesk, and IBM Plex Mono font system. Keep display type compact and readable.
- Mobile layouts must be intentionally reflowed with no accidental horizontal overflow or cropped content.
- Do not publish Aayush Soni's portrait, achievements, project claims, education, or contact details as Jobanpreet Singh's.
- Skills must use a rectangular capability ledger that matches the broader design language.
- The milestone chapter is the only desktop pinned horizontal sequence; vertical scrolling must resume after it. On smaller screens, use native scrolling without pinning.
- Use performance-safe staged motion and restrained image parallax. Avoid random particles, decorative 3D clutter, continuous pointer loops, and document-level scroll hijacking.
