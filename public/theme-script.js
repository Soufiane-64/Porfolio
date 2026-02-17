/**
 * Runs before React hydration to set theme class on <html> so the first paint
 * matches the user's saved preference (no flash of wrong theme).
 */
(function () {
  const stored = localStorage.getItem('theme');
  const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isLight = stored === 'light' || (!stored && !prefersDark);
  document.documentElement.classList.toggle('light', isLight);
})();
