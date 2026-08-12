/**
 * Unified icon-candidate builder. Given a technology name and a dark-mode flag,
 * returns an ordered list of image URLs to try (first hit wins; use with onError cascade).
 *
 * @param {string} name  – technology / tool name (e.g. "React", "Flask", "Jinja")
 * @param {boolean} isDark – true when the UI is in dark mode
 * @returns {string[]} ordered candidate URLs
 */
export function buildIconCandidates(name, isDark = true) {
  const lower = String(name || '').toLowerCase();
  const c = [];

  // ── Theme-aware overrides ──────────────────────────────────────
  if (isDark) {
    if (/(^|\b)github(\b|$)/.test(lower)) c.push('https://cdn.simpleicons.org/github/FFFFFF');
    if (/(^|\b)flask(\b|$)/.test(lower)) c.push('/icons/flask_white.webp');
    if (/(^|\b)symfony(\b|$)/.test(lower)) c.push('https://cdn.simpleicons.org/symfony/FFFFFF');
    if (/(^|\b)jinja(\b|$)/.test(lower)) c.push('/icons/jinja_white.webp');
  } else {
    if (/(^|\b)flask(\b|$)/.test(lower)) c.push('/icons/flask_black.webp');
    // No separate light-mode jinja asset exists; the default jinja icon below reads fine on light backgrounds.
  }

  // ── Absolute-URL candidates ────────────────────────────────────
  if (/(openai|chatgpt)/.test(lower))
    c.push('https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg');

  if (/cursor/.test(lower))
    c.push('/icons/cursor.jpg', '/icons/cursor.png', '/icons/cursor.svg', '/icons/cursor.webp',
      'https://raw.githubusercontent.com/getcursor/cursor/main/public/icon.png');

  if (/tailwind/.test(lower))
    c.push('/icons/tailwind.svg', '/icons/tailwind.png', '/icons/tailwind.jpg', '/icons/tailwind.webp',
      'https://cdn.simpleicons.org/tailwindcss/38BDF8');

  // No local assets for docker/html/css/angular — the devicon CDN entries below
  // (confirmed reachable) cover them; skipping straight to those avoids several
  // guaranteed-404 requests per icon (no local file, and simpleicons.org doesn't
  // serve a few of these slugs either).

  if (/(webix)/.test(lower))
    c.push('/icons/webix.png', '/icons/webix.jpg', '/icons/webix.webp', '/icons/webix.svg');

  if (/(ext\s?js|extjs|sencha)/.test(lower))
    c.push('/icons/extjs.png', '/icons/extjs.jpg', '/icons/extjs.webp', '/icons/extjs.svg');

  if (/(scrum)/.test(lower))
    c.push('/icons/scrum.png', '/icons/scrum.jpg', '/icons/scrum.webp', '/icons/scrum.svg');

  if (/(merise)/.test(lower))
    c.push('/icons/merise.png', '/icons/merise.jpg', '/icons/merise.webp', '/icons/merise.svg');

  if (/(uml)/.test(lower))
    c.push('/icons/uml.webp', '/icons/uml.png', '/icons/uml.jpg', '/icons/uml.svg');

  if (/(jinja)/.test(lower))
    c.push('/icons/jinja.webp', '/icons/jinja.png', '/icons/jinja.jpg', '/icons/jinja.svg');

  // ── Devicon CDN ────────────────────────────────────────────────
  const deviconMap = {
    javascript: 'javascript/javascript-original',
    typescript: 'typescript/typescript-original',
    php: 'php/php-original',
    'c#': 'csharp/csharp-original',
    csharp: 'csharp/csharp-original',
    python: 'python/python-original',
    react: 'react/react-original',
    angular: 'angular/angular-original',
    html: 'html5/html5-original',
    html5: 'html5/html5-original',
    css: 'css3/css3-original',
    css3: 'css3/css3-original',
    redux: 'redux/redux-original',
    'next.js': 'nextjs/nextjs-original',
    nextjs: 'nextjs/nextjs-original',
    laravel: 'laravel/laravel-original',
    symfony: 'symfony/symfony-original',
    graphql: 'graphql/graphql-plain',
    mysql: 'mysql/mysql-original',
    'sql server': 'microsoftsqlserver/microsoftsqlserver-plain',
    docker: 'docker/docker-original',
    git: 'git/git-original',
    github: 'github/github-original',
    svn: 'subversion/subversion-original',
    tailwind: 'tailwindcss/tailwindcss-plain',
    flask: 'flask/flask-original',
    jinja: 'jinja/jinja-original',
    vscode: 'vscode/vscode-original'
  };

  const di = deviconMap[lower];
  if (di) c.push(`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${di}.svg`);

  // Laravel extra variants
  if (/laravel/.test(lower) && c.length === 0) {
    c.push(
      ...['laravel/laravel-original', 'laravel/laravel-plain', 'laravel/laravel-original-wordmark', 'laravel/laravel-plain-wordmark']
        .map(p => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${p}.svg`)
    );
  }

  return c;
}

/**
 * Generic onError handler for images using buildIconCandidates.
 * Attach to `<img>` with `data-idx` and `data-candidates` attributes.
 */
export function handleIconError(e) {
  const el = e.currentTarget;
  const list = (el.getAttribute('data-candidates') || '').split(',').filter(Boolean);
  const i = parseInt(el.getAttribute('data-idx') || '0', 10) + 1;
  if (i < list.length) {
    el.setAttribute('data-idx', String(i));
    el.src = list[i];
  }
}
