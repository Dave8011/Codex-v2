import { useState, useEffect } from "react";

/**
 * A custom React Hook to manage and persist the theme.
 */
export function useTheme() {
  // 1. Get initial theme from localStorage or default to "unique"
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "unique";
    }
    return localStorage.getItem("theme") || "unique";
  });

  // 2. When theme changes, update <html> and localStorage
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, setTheme];
}
