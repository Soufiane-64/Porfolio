import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext({ isDarkMode: true, toggleTheme: () => {} });

/**
 * ThemeProvider — single source of truth for dark/light mode.
 * Reads initial preference from localStorage and syncs the `light` class on <html>.
 */
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = typeof localStorage !== 'undefined' && localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return true; // default dark
  });

  // Apply class on mount and whenever isDarkMode changes
  useEffect(() => {
    document.documentElement.classList.toggle('light', !isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to consume theme state from any component.
 * @returns {{ isDarkMode: boolean, toggleTheme: () => void }}
 */
export const useTheme = () => useContext(ThemeContext);
