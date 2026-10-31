import { useCallback, useEffect } from 'react';
import { STORAGE_KEYS, THEMES } from '../config/constants';
import { useLocalStorage } from './useLocalStorage';

const getPreferredTheme = () => {
  if (typeof window === 'undefined') return THEMES.LIGHT;

  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? THEMES.DARK
    : THEMES.LIGHT;
};

export function useTheme() {
  const [storedTheme, setTheme] = useLocalStorage(
    STORAGE_KEYS.THEME,
    getPreferredTheme,
  );

  const theme = Object.values(THEMES).includes(storedTheme)
    ? storedTheme
    : getPreferredTheme();

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    const isDark = theme === THEMES.DARK;

    root.classList.toggle(THEMES.DARK, isDark);
    root.style.colorScheme = theme;

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', isDark ? '#020617' : '#f8fafc');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) =>
      current === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK,
    );
  }, [setTheme]);

  return {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === THEMES.DARK,
  };
}
