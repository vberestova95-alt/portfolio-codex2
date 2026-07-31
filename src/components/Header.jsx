import React, { useEffect, useRef, useState } from 'react';
import { ThemePill } from './ThemePill.jsx';

export function Header({ contacts, name, theme, onThemeToggle, brandHref = '#top' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);

  const handleToggleMenu = () => {
    setIsMenuOpen((current) => !current);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [isMenuOpen]);

  return (
    <header
      ref={headerRef}
      className={`site-header section-shell${isMenuOpen ? ' is-menu-open' : ''}`}
    >
      <a className="brand" href={brandHref}>
        {name}
      </a>
      <div className="header-actions">
        <nav className="header-nav header-nav--desktop" aria-label="Основная навигация">
          {contacts.map((contact) => {
            const isExternal = contact.href.startsWith('http');

            return (
              <a
                key={contact.label}
                href={contact.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer' : undefined}
              >
                {contact.label}
              </a>
            );
          })}
        </nav>
        <ThemePill
          className="theme-pill--desktop"
          theme={theme}
          onToggle={onThemeToggle}
        />
        <button
          className="header-burger"
          type="button"
          aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={isMenuOpen}
          aria-controls="header-mobile-menu"
          onClick={handleToggleMenu}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <nav
        id="header-mobile-menu"
        className={`header-nav header-nav--mobile${isMenuOpen ? ' is-open' : ''}`}
        aria-label="Мобильная навигация"
      >
        {contacts.map((contact) => {
          const isExternal = contact.href.startsWith('http');

          return (
            <a
              key={contact.label}
              href={contact.href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noreferrer' : undefined}
              onClick={handleCloseMenu}
            >
              {contact.label}
            </a>
          );
        })}
        <div className="header-mobile-divider" aria-hidden="true" />
        <div className="header-mobile-toggle-row">
          <span className="header-mobile-toggle-label">Тема</span>
          <ThemePill
            className="theme-pill--mobile"
            theme={theme}
            onToggle={onThemeToggle}
          />
        </div>
      </nav>
    </header>
  );
}
