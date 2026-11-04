# Patrick Gannon — Portfolio

A static portfolio built with HTML, CSS, and JavaScript. The current redesign is a local first draft on `redesignNov26`.

## Preview locally

From this directory, run:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000 in your browser. Stop the server with Ctrl+C. No dependency installation or build is required.

## Pages

- `index.html`: introduction, About Me, skills, and contact links.
- `work.html`: featured React projects, additional projects, and filters.
- `certifications.html`: Education & Training. The existing URL is retained for incoming links.
- `css/styles.css`: shared responsive layout and light/dark colors.
- `js/darkMode.js`: system theme preference and optional saved theme choice.
- `js/filterProjects.js`: project visibility, pressed states, and announced result counts.

All project summaries and links remain available without JavaScript. Filters and the theme button appear when their scripts initialize. Existing project and certificate destinations were retained; the Full Stack certificate is available by request rather than linking to an issuer homepage as if it were a certificate.

## First-draft verification

Headless Chrome checks passed for:

- Local navigation, assets, media paths, and section anchors across all three pages.
- No horizontal overflow at 320, 375, 768, and 1280 pixels in both themes.
- Project filters activated with Enter, including visible counts and pressed states.
- Keyboard skip link and theme switching with Space.
- Theme persistence between pages and operation when storage is unavailable.
- All eight projects remaining visible with JavaScript disabled.
- No uncaught JavaScript errors during these checks.

Desktop and mobile screenshots were reviewed. External demos and certificate services were not verified for current availability; authentication and backend availability depend on their respective hosts. Screen reader testing was not performed.
