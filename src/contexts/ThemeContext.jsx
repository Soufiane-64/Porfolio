import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const ThemeContext = createContext(null);

/**
 * Reads initial theme from the DOM (set by theme-script.js before first paint).
 */
function getInitialTheme() {
  if (typeof document === 'undefined') return true;
  return !document.documentElement.classList.contains('light');
}

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  const toggleTheme = useCallback(() => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    const themeValue = next ? 'dark' : 'light';
    localStorage.setItem('theme', themeValue);
    document.documentElement.classList.toggle('light', !next);
  }, [isDarkMode]);

  const value = useMemo(
    () => ({ isDarkMode, toggleTheme }),
    [isDarkMode, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}
