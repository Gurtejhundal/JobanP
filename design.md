# Jobanpreet Portfolio Design System

## Direction

**Swiss field notes**: a compact, editorial portfolio that feels authored, technical, and warm. The hero borrows only the supplied reference image's anatomy: statement on the left, portrait in the centre, proof points on the right, and a capability strip below. The rest of the site is original.

The experience must never return to the previous reference-derived reveal gate, circular skill field, stacked research papers, or generic portfolio cards.

## Principles

1. **Truth before theatre.** Use verified content, neutral study labels, and explicit placeholders for missing biographical facts.
2. **Dense, not cramped.** Prefer useful editorial groupings, short lines, and measured white space over oversized headings.
3. **One motion idea per chapter.** Entrance motion supports hierarchy; the milestone chapter is the only pinned horizontal sequence.
4. **Rectangles create rhythm.** Rules, ledgers, rails, and image crops define the interface. Avoid decorative circles and gratuitous rounding.
5. **Responsive by composition.** Recompose the layout for tablets and phones; never crop a desktop layout into a mobile viewport.

## Tokens

### Colour

- `--bone: #ebe8df` — primary warm canvas
- `--paper: #f5f2ea` — raised editorial surface
- `--ink: #11120f` — primary text and dark chapters
- `--muted: #686a63` — secondary copy
- `--signal: #e14b31` — sole accent for state, progress, and emphasis
- `--line: rgba(17, 18, 15, 0.2)` — borders and rules

No gradients. The signal colour should occupy less than ten percent of a screen.

### Typography

- Hanken Grotesk: interface, body, bold display lines
- Gloock: italic editorial accent only
- IBM Plex Mono: navigation, labels, indices, metadata

Display text uses `clamp()` and stays below 104px on large screens. Body copy is 16–19px with line-height 1.55–1.7.

### Spacing

- Base unit: 8px
- Page gutter: `clamp(20px, 4vw, 64px)`
- Section block space: `clamp(88px, 12vw, 176px)`
- Borders: 1px solid `--line`
- Radius: 0–16px, reserved mainly for the portrait crop and dialog

## Layout

- Desktop: 12-column grid, maximum readable width 1600px
- Tablet: 8-column grid
- Mobile: single-column flow with deliberate horizontal scrollers only where labelled
- Sticky header: compact index bar, no more than five section links
- Hero: left statement (4 cols), portrait (4 cols), proof column (4 cols), then four-column capability strip
- Skills: three ledger rows, never floating bubbles
- Projects: one featured study plus two secondary studies
- Milestones: desktop pin with vertical-to-horizontal progress; tablet and mobile use native horizontal snap and keep vertical page flow

## Components

- `SectionHeader`: mono index and eyebrow paired with a compact display title
- `RuleLink`: text action with Lucide arrow and visible focus state
- `CapabilityLedger`: numbered rows with grouped tools and disciplines
- `StudyCard`: real image, truthful study label, concise description, functional details action
- `MilestoneCard`: large image/text split with sequence number and honest portfolio-system milestone
- `ProjectDialog`: accessible modal with close, backdrop, and Escape support

## Motion

- Hero: staged copy, portrait, and proof entrance; 0.6–1.0 seconds
- Section reveals: 24–40px travel with restrained stagger
- Project imagery: subtle vertical parallax only
- Milestones: one GSAP ScrollTrigger pin on desktop; progress is deterministic and normal vertical scrolling resumes after the final card
- Reduced motion: all content is immediately visible, no pinning, no parallax

## Accessibility and Performance

- Skip link and visible keyboard focus on every interactive control
- Minimum 44px touch targets where practical
- Semantic headings and landmark regions
- No document-level horizontal overflow
- Hero image loads eagerly; below-fold images lazy-load with stable aspect ratios
- No WebGL, particle systems, continuous pointer loops, or scroll-jacking
- Modal locks document scroll and restores it on close

## Content Guardrails

- Never invent Jobanpreet Singh's employment, education, location, metrics, certifications, or links.
- Describe the existing three pieces as starter studies or concepts until verified project details are supplied.
- Keep missing background and contact information explicit rather than filling it with plausible-looking claims.
