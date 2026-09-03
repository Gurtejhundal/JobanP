# Design System Master File — Portfolio System

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Portfolio  
**Design Philosophy:** Swiss Field Notes (Monochrome / High Contrast / Technical Editorial)  
**Persona:** Mohabbatpal Singh Chahal — Computer Science Student & Software Developer  

---

## Global Rules

### Color Palette

| Role | Hex / Value | CSS Variable | Usage |
|:---|:---|:---|:---|
| Primary Surface | `#ebe8df` | `--bone` | Base warm canvas |
| Raised Paper | `#f5f2ea` | `--paper` | Elevated card surfaces, dialog background |
| Primary Ink | `#11120f` | `--ink` | High-contrast typography & dark chapter backgrounds |
| Muted Ink | `#666960` | `--muted` | Secondary copy, descriptors, footnotes |
| Signal Red | `#e14b31` | `--signal` | Sole accent (<10% surface) for active state, progress & focus |
| Hairline Rule | `rgba(17, 18, 15, 0.2)` | `--line` | Structural dividing borders |
| Light Rule | `rgba(245, 242, 234, 0.22)` | `--line-light`| Borders on dark ink sections |

### Typography

- **Display & Interface:** Hanken Grotesk (`/fonts/hanken-grotesk-latin.woff2`)
- **Editorial Accent:** Gloock Italic (`/fonts/gloock-latin.woff2`)
- **Technical & Metadata:** IBM Plex Mono 400 & 500 (`/fonts/ibm-plex-mono-400-latin.woff2`, `/fonts/ibm-plex-mono-500-latin.woff2`)

---

## Motion System

- **Hero Entrance:** GSAP staged staggered reveal (`power3.out`).
- **Parallax:** Restrained vertical image travel (`data-parallax`).
- **Milestone Chapter:** Desktop-only pinned horizontal scrub (`anticipatePin: 1`, `scrub: 0.72`).
- **Mobile Fallback:** CSS touch `scroll-snap-type: inline mandatory`, no pinning.
- **Accessibility:** Immediate static display under `prefers-reduced-motion: reduce`.

---

## Content Guardrails

1. Truthful credentials only: Mohabbatpal Singh Chahal's verified Python Essentials 1 (Cisco / Python Institute), Introduction to Generative AI (IBM / edX), and LPU B.Tech CSE education.
2. Verified project repositories: Direct links to Mohabbatpal's projects (`LedgerX`, `Chahal Restro`, `Smart Dairy Tool`, `Chess Game`).
3. Direct contact channels: GitHub (`mohabbat-chahal`), LinkedIn (`mohabbatpal-singh-chahal`), email (`Mohabbatpalsinghchahal@gmail.com`), and mobile (`+91 8078740004`).
