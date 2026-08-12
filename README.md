# Soufiane Hammagi — Portfolio

Personal portfolio site built with React 19 and Vite. Showcases projects (pulled live from the
GitHub API), an interactive resume, and a contact section, with dark/light theming and
English/German/French/Spanish translations.

## Stack

- **React 19** + **React Router 6** (single route today, `NotFound` code-split via `React.lazy`)
- **Vite 6** for dev/build tooling
- **i18next** / **react-i18next** for translations (`src/i18n/locales`)
- **GSAP** for scroll/hover animations, raw **Three.js** for the resume's language globe
- **Font Awesome** for iconography

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build      # production build to dist/
npm run preview    # preview the production build locally
npm run lint        # run ESLint
```

## Project structure

```
src/
  components/     # one folder per section (1-header, 2-hero, 3-main, 3.5-resume, ...)
  constants/      # centralized personal/profile data (contact info, social links)
  contexts/       # ThemeContext — single source of truth for dark/light mode
  i18n/           # i18next config + locale JSON files
  utils/          # shared helpers (e.g. tech-icon resolution with CDN fallbacks)
```

Theme preference is written to `localStorage` and applied before first paint via
`public/theme-script.js` to avoid a flash of the wrong theme.

## Notes

- The "Projects" section fetches repos live from the GitHub REST API and caches the
  response in `localStorage` for 10 minutes to stay under the unauthenticated rate limit.
- The contact form currently simulates submission client-side; wire it up to a real backend
  (Formspree, EmailJS, or a serverless function) before relying on it in production.
