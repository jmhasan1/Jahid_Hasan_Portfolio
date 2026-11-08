# Jahid Hasan — Portfolio

A responsive, static portfolio for **Jahid Hasan**, focused on AI/ML engineering, generative AI, computer vision, and MLOps.

## Run locally

No build step or package manager is required.

```bash
python -m http.server 8000
```

Open <http://localhost:8000>.

## Deploy to GitHub Pages

1. Extract the ZIP contents into the root of `jmhasan1/Jahid_Hasan_Portfolio`.
2. Ensure `index.html`, `style.css`, and `script.js` are in the repository root.
3. In repository Settings → Pages, publish from `main` / root.
4. Keep the legacy repository `Jahid_Portfolio` unchanged until you have reviewed the new live site and are ready to switch your primary portfolio URL.

## Features

- Responsive navigation with active section state
- Rotating AI engineering positioning statement
- Scroll reveal enhancements with reduced-motion support
- Interactive project filters
- Accessible project detail modal with keyboard focus handling
- Responsive project, education, learning, writing, and contact sections
- SEO and social sharing metadata

## Content and accuracy notes

- Education details and CGPAs follow the existing portfolio and information supplied by Jahid.
- Selected projects link to their corresponding GitHub repositories.
- The experience section intentionally avoids invented years of employment, client counts, or fabricated employers.
- Courses and independent study are labelled as learning rather than formal degrees.
- The résumé button points to the PDF currently hosted in the legacy portfolio repository. Move the latest approved résumé into this repository at `assets/resume_jahid.pdf` and update the link in `index.html` when that file is ready.
- Contact email and public profile links follow the current portfolio.

## Customization

Project data for modal windows is maintained in the `projects` object in `script.js`. Project card markup and category filters are in `index.html`. Theme variables and responsive rules are in `style.css`.
