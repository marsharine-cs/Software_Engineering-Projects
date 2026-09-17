# AI Development Field Guide

An interactive technical reference for AI fundamentals, machine learning, generative AI, evaluation, and responsible use, built with vanilla JavaScript, HTML, and CSS.

**[Live demo](https://ai-development-field-guide.vercel.app/)** · **[Case study](https://projectsportfolio-nine.vercel.app/case-studies/ai-development-field-guide.html)**

![AI Development Field Guide interface](https://projectsportfolio-nine.vercel.app/assets/ai-field-guide-project.webp)

## Tech stack

- HTML5, CSS3, JavaScript (no framework, no build step)
- Browser APIs: Local Storage, Clipboard API
- Deployed on Vercel

## Features

- Client-side search across section titles, keywords, and visible content
- `/` keyboard shortcut to focus search, with Escape to exit
- Active section highlighting in a sticky sidebar
- Light and dark themes, with the choice saved between visits
- Reading-progress bar based on scroll position
- Expandable concept cards and copy-to-clipboard code examples
- Glossary with live filtering and a visible match count
- Slide-out sidebar navigation on small screens

## Technical highlights

- **Search index.** Each section exposes its title and keywords through `data-` attributes. The script builds an index from those and the section's visible text, so a query matches content, not just headings.
- **Keyboard behavior.** A global `keydown` handler moves focus to search on `/` (ignored while typing in a field), and Escape closes search results and the mobile navigation.
- **Persisted preference.** The theme is read from `localStorage` on load and written on toggle, so the page respects the user's choice without an account or server.
- **Clipboard with fallback.** Copy buttons use `navigator.clipboard.writeText` and fall back to `document.execCommand("copy")` where the modern API is unavailable.
- **Accessibility.** Semantic landmarks, a skip link, `aria-expanded` on disclosure and navigation controls, visible focus states, and `prefers-reduced-motion` support.

## Project structure

```text
├── index.html   # Content and semantic structure
├── styles.css   # Layout, themes, responsive and reduced-motion styles
├── script.js    # Search, navigation, theme, progress, clipboard, glossary
└── LICENSE
```

## Run locally

This project lives on the `AI_Dev-Technical_Doc_Web_Project` branch of the `Software_Engineering-Projects` repository.

```bash
git clone --branch AI_Dev-Technical_Doc_Web_Project https://github.com/marsharine-cs/Software_Engineering-Projects.git ai-development-field-guide
cd ai-development-field-guide
npx http-server .
```

Then open the local URL it prints. Opening `index.html` directly in a browser also works.

## Author

Marsharine A. Simpson, Software Developer · [Portfolio](https://projectsportfolio-nine.vercel.app/) · [GitHub](https://github.com/marsharine-cs)

## License

MIT. See [LICENSE](LICENSE).
