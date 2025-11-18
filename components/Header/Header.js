import React from 'react';
// This is how we import the component's own CSS!
import styles from './Header.module.css';

/**
 * The application Header component.
 * It receives all its state and functions as props from the parent (index.js).
 */
export default function Header({
  theme,
  setTheme,
  onNewFile,
  showMobileSidebar,
  onToggleMobileSidebar
}) {
  return (
    <header className={styles.header}>
      <span className={styles.logo}>⮜⮞ Codex v2</span>
      
      <div className={styles.actions}>
        {/* Mobile Hamburger/Close Button */}
        <button
          className={`${styles.btn} ${styles.mobileToggle}`}
          onClick={onToggleMobileSidebar}
          aria-label="Toggle file navigation"
        >
          {showMobileSidebar ? "✕" : "☰"}
        </button>

        {/* Theme Toggle Button */}
        <button
          className={`${styles.btn} ${styles.themeBtn}`}
          onClick={() =>
            setTheme(
              theme === "unique"
                ? "light"
                : theme === "light"
                ? "dark"
                : "unique"
            )
          }
          aria-label="Theme"
        >
          {theme === "unique" ? "🌈" : theme === "light" ? "☀️" : "🌙"}
        </button>

        {/* New File Button */}
        <button
          className={`${styles.btn} ${styles.newBtn}`}
          onClick={onNewFile}
        >
          ➕ New
        </button>
      </div>
    </header>
  );
}
