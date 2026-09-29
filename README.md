# Omar Montaser - Portfolio

A static, responsive portfolio. Open `index.html` directly, or serve the folder with `python -m http.server 5173` and visit `http://localhost:5173`.

## Content and design

- `index.html`: profile, projects, experience, skills, credentials, and contact details.
- `style.css`: black, burgundy, coral, and pink theme; responsive layouts and reduced-motion support.
- `script.js`: mobile navigation, active section tracking, and progressive scroll reveals.
- `resume.html`, `resume.css`, `resume.js`: current printable résumé, with a browser Print / Save as PDF action.
- `fonts/`: locally served DM Sans and Space Grotesk, including SIL Open Font Licenses.

The September 2026 résumé supplied for this redesign is the source for updated experience, education, credentials, skills, and the three selected projects. Four additional projects from the previous portfolio are retained under Other projects. RSA Security is described as graduation project sponsorship. Project throughput and failure-rate figures are from the supplied résumé.

Update both `index.html` and `resume.html` when résumé content changes. The earlier `images/CV.pdf` is retained but is no longer linked because it predates the supplied résumé. Fonts and all display assets are local; external links only open when selected.

## Browser checks

Checked in Chromium at 320, 390, 768, 1024, and 1440 pixels: layout overflow, local images, section anchors, JavaScript errors, mobile menu and Escape dismissal, active navigation, project expansion, and reduced motion. No build step or third-party JavaScript is required.

## Logo assets

Official logos and credential badges are served locally from `images/logos/`. Source URLs are documented in `images/logos/SOURCES.md`. RSA, AWS, and ITI use SVGs; the remaining marks use high-resolution originals.
