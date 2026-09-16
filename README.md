# Marsharine A. Simpson — Software Developer Portfolio

A responsive, multi-page portfolio presenting deployed software projects, engineering case studies, technical skills, and professional background. The experience is designed for fast recruiter scanning while preserving deeper technical evidence for engineering reviewers.

## Portfolio structure

- `index.html` — developer-focused homepage and three flagship projects
- `projects.html` — featured, additional, and technical-education work
- `about.html` — developer background, working approach, and credentials
- `case-studies/` — engineering stories for Student Progress Tracker, AI Development Field Guide, and Luma One
- `api/portfolio-chat.js` — optional server-side OpenAI Responses API endpoint for the grounded Portfolio Guide
- `sitemap.xml`, `robots.txt`, and structured metadata — search and social-sharing support

## Recruiter-focused features

- 30-second recruiter summary with direct links to the strongest case study, GitHub, and résumé
- Grounded Portfolio Guide with cited answers and a no-key on-site fallback
- Engineering-proof panels and accessible architecture diagrams
- Consistent, fully visible project imagery with explicit dimensions and lazy loading
- Open Graph, Twitter Card, canonical, JSON-LD, sitemap, manifest, and favicon metadata
- Responsive and keyboard-accessible dialogs, navigation, and reduced-motion support

## Featured engineering work

1. Student Progress Tracker — React, TypeScript, Supabase, PostgreSQL, Vitest
2. AI Development Field Guide — JavaScript, responsive documentation, search, accessibility
3. Luma One — JavaScript state, product interaction, responsive and accessible UI

## Run locally

The portfolio uses static HTML, CSS, and JavaScript. Open `index.html` directly or serve the repository with any local static server.

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

The verified Portfolio Guide fallback works in any static server. To activate live generated answers on Vercel, add `OPENAI_API_KEY` as a server-side environment variable. You may optionally set `OPENAI_MODEL`; otherwise the endpoint uses `gpt-5-mini`. The API key is never sent to the browser.

## Links

- [Live portfolio](https://projectsportfolio-nine.vercel.app/)
- [GitHub profile](https://github.com/marsharine-cs)
