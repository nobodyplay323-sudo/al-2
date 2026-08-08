# Vantera — Product Requirements (PRD)

## Original problem statement
"Crează un site despre o firma inventata" — build a website about an invented company.
User choices: Technology/software company · multi-page site · functional contact form that saves messages · modern & minimalist style · no name provided (invented **Vantera**, a software studio).

Directive: Awwwards-level, bold cohesive art direction, kinetic hero, editorial motion.

## Architecture
- **Frontend**: React 19 (CRA/craco), Tailwind, framer-motion (hover/parallax), Lenis smooth scroll, react-fast-marquee. Routes: `/`, `/services`, `/about`, `/contact`.
- **Backend**: FastAPI, MongoDB (motor). Endpoints (all `/api` prefixed): `POST /api/contact`, `GET /api/contact`, `GET /api/`.
- **DB**: collection `contact_messages` (uuid id, name, email, company, message, created_at ISO).
- Design system in `/app/design_guidelines.json`: Swiss/high-contrast dark — Deep Obsidian bg, Bone White type, Kinetic Vermilion accent; Cabinet Grotesk + IBM Plex Sans/Mono.

## User personas
- Founders / product teams evaluating a software studio.
- Talent/press browsing the studio's work and point of view.

## Core requirements (static)
- Multi-page marketing site, minimalist, dark, editorial.
- Working contact form that persists submissions server-side.
- Premium motion: masked hero reveal, scroll reveals, marquee, parallax.

## Implemented (2026-06)
- Kinetic hero with masked line reveal + subtle parallax; global smooth scroll.
- Home: editorial marquee, stats strip, asymmetrical Selected Work grid (clip-reveal images), numbered Manifesto, CTA.
- Services: interactive service rows with cursor-follow image, process grid.
- About: editorial two-column premise, studio image, values, team list.
- Contact: split-screen functional form (validation + success state) → saves to MongoDB.
- Robust reveal system (IntersectionObserver + CSS transitions; visible-by-default; respects reduced-motion; Lenis auto-falls back to native scroll when rAF is unavailable).
- Verified: backend 100% (pytest), frontend 100% (e2e) — see `/app/test_reports/iteration_1.json`.

## Backlog (prioritized)
- **P1**: Contact submissions admin view / email notification (Resend) instead of DB-only.
- **P2**: Individual case-study pages for Selected Work cards (currently non-navigating).
- **P2**: Add `data-active` attribute on active nav link; CMS-driven content.
- **P2**: Blog/journal section; SEO metadata + OG images per route.

## Next tasks
- Await user feedback on brand direction / copy, then iterate.
