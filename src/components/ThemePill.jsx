import React from 'react';

export function ThemePill({ className = '', theme, onToggle }) {
  const isDark = theme === 'dark';
  const nextThemeLabel = isDark ? 'светлую' : 'темную';

  return (
    <button
      className={`theme-pill theme-pill--${theme}${className ? ` ${className}` : ''}`}
      type="button"
      aria-label={`Переключить на ${nextThemeLabel} тему`}
      title={`Переключить на ${nextThemeLabel} тему`}
      aria-pressed={isDark}
      onClick={onToggle}
    >
      <span className="theme-pill__emoji" aria-hidden="true">
        {isDark ? '🌚' : '🌝'}
      </span>
    </button>
  );
}
