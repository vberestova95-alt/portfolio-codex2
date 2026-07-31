import React from 'react';
import { Header } from '../components/Header.jsx';
import { MaintenanceScreen } from '../components/MaintenanceScreen.jsx';
import { ThemePill } from '../components/ThemePill.jsx';
import { CaseButton } from '../components/cases/CaseButton.jsx';
import { CasesSection } from '../sections/CasesSection.jsx';
import { ExperienceSection } from '../sections/ExperienceSection.jsx';
import { HeroSection } from '../sections/HeroSection.jsx';

const previewThemes = [
  { id: 'light', label: 'Светлая тема' },
  { id: 'dark', label: 'Темная тема' },
];

function PreviewCard({ title, theme, description, className = '', children }) {
  return (
    <article className={`component-preview-card${className ? ` ${className}` : ''}`}>
      <div className="component-preview-card__meta">
        <div>
          <span className="component-preview-card__eyebrow">{title}</span>
          <strong>{previewThemes.find((item) => item.id === theme)?.label}</strong>
        </div>
      </div>
      <div className={`component-preview-surface theme-${theme}`}>{children}</div>
      {description ? <p className="component-preview-card__description">{description}</p> : null}
    </article>
  );
}

function AtomPreview({ theme, onThemeToggle }) {
  return (
    <div className="component-atom-grid">
      <div className="component-atom-card">
        <span className="component-atom-card__label">ThemePill</span>
        <ThemePill theme={theme} onToggle={onThemeToggle} />
      </div>
      <div className="component-atom-card component-atom-card--wide">
        <span className="component-atom-card__label">CaseButton</span>
        <div className="component-case-button-preview">
          <CaseButton href="#catalog-top" />
        </div>
      </div>
      <div className="component-atom-card component-atom-card--wide">
        <span className="component-atom-card__label">Back Link</span>
        <a className="case-back-link" href="#catalog-top">
          <span aria-hidden="true">←</span>
          <span>Назад</span>
        </a>
      </div>
    </div>
  );
}

export function ComponentCatalogPage({ profile, cases, experiences }) {
  const noop = () => {};

  return (
    <div id="catalog-top" className="component-catalog-page section-shell">
      <header className="component-catalog-page__intro">
        <span className="component-catalog-page__eyebrow">UI Inventory</span>
        <h1>Компоненты проекта</h1>
        <p>
          На этой странице собраны живые компоненты из проекта: навигация, атомы,
          секции главной страницы, карточки кейсов и сервисная заглушка. Такой
          формат удобно переносить в Figma как актуальную библиотеку экранов и
          состояний без ручной пересборки.
        </p>
      </header>

      <section className="component-catalog-section" aria-labelledby="catalog-nav-title">
        <div className="component-catalog-section__head">
          <h2 id="catalog-nav-title">Навигация и атомы</h2>
          <p>
            Хедер, переключатель темы, кнопка перехода в кейс и ссылка назад собраны
            в обеих темах.
          </p>
        </div>
        <div className="component-preview-grid">
          {previewThemes.map((previewTheme) => (
            <PreviewCard
              key={`header-${previewTheme.id}`}
              title="Header"
              theme={previewTheme.id}
              description="Хедер с брендом, контактами, бургером и переключателем темы."
            >
              <Header
                contacts={profile.contacts}
                brandHref="#catalog-top"
                name={profile.name}
                theme={previewTheme.id}
                onThemeToggle={noop}
              />
            </PreviewCard>
          ))}
          {previewThemes.map((previewTheme) => (
            <PreviewCard
              key={`atoms-${previewTheme.id}`}
              title="Atoms"
              theme={previewTheme.id}
              description="Минимальные интерактивные элементы, которые повторяются по всему сайту."
            >
              <AtomPreview theme={previewTheme.id} onThemeToggle={noop} />
            </PreviewCard>
          ))}
        </div>
      </section>

      <section className="component-catalog-section" aria-labelledby="catalog-sections-title">
        <div className="component-catalog-section__head">
          <h2 id="catalog-sections-title">Секции главной страницы</h2>
          <p>
            Герой-блок и секция опыта показаны как готовые композиции для лендинга.
          </p>
        </div>
        <div className="component-preview-grid">
          {previewThemes.map((previewTheme) => (
            <PreviewCard
              key={`hero-${previewTheme.id}`}
              title="HeroSection"
              theme={previewTheme.id}
              description="Первый экран с фотографией, представлением и основным позиционированием."
            >
              <HeroSection profile={profile} />
            </PreviewCard>
          ))}
          {previewThemes.map((previewTheme) => (
            <PreviewCard
              key={`experience-${previewTheme.id}`}
              title="ExperienceSection"
              theme={previewTheme.id}
              description="Блок с опытом работы и паттерном раскрывающегося списка."
            >
              <ExperienceSection items={experiences} />
            </PreviewCard>
          ))}
        </div>
      </section>

      <section className="component-catalog-section" aria-labelledby="catalog-cases-title">
        <div className="component-catalog-section__head">
          <h2 id="catalog-cases-title">Карточки кейсов</h2>
          <p>
            В этой секции собран контейнер `CasesSection`, а внутри него все варианты
            `CaseCard` с подкомпонентами `CaseDescription`, `CaseButton` и
            `CaseVisual`.
          </p>
        </div>
        <div className="component-preview-grid">
          {previewThemes.map((previewTheme) => (
            <PreviewCard
              key={`cases-${previewTheme.id}`}
              title="CasesSection + CaseCard"
              theme={previewTheme.id}
              className="component-preview-card--full"
              description="Полная витрина карточек кейсов со всеми текущими вариантами, изображениями и CTA."
            >
              <CasesSection items={cases} />
            </PreviewCard>
          ))}
        </div>
      </section>

      <section className="component-catalog-section" aria-labelledby="catalog-service-title">
        <div className="component-catalog-section__head">
          <h2 id="catalog-service-title">Сервисные состояния</h2>
          <p>
            Заглушка собрана отдельно, чтобы в Figma было удобно использовать ее как
            системный экран.
          </p>
        </div>
        <div className="component-preview-grid">
          {previewThemes.map((previewTheme) => (
            <PreviewCard
              key={`maintenance-${previewTheme.id}`}
              title="MaintenanceScreen"
              theme={previewTheme.id}
              description="Экран временной паузы сайта в светлой и темной темах."
            >
              <MaintenanceScreen />
            </PreviewCard>
          ))}
        </div>
      </section>
    </div>
  );
}
