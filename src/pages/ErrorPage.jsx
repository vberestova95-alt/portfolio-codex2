import React, { useEffect } from 'react';
import knotGraphic from '../assets/editorial-knot.png';

export function ErrorPage({
  code,
  label,
  titleStart,
  titleAccent,
  titleEnd,
  description,
  primaryLabel,
  primaryHref = '/',
  onPrimaryAction,
}) {
  useEffect(() => {
    const previousTitle = document.title;
    const robotsMeta = document.querySelector('meta[name="robots"]');
    const previousRobots = robotsMeta?.getAttribute('content');

    document.title = `${code} - Vladislava Berestova`;
    robotsMeta?.setAttribute('content', 'noindex, nofollow');

    return () => {
      document.title = previousTitle;

      if (previousRobots) {
        robotsMeta?.setAttribute('content', previousRobots);
      }
    };
  }, [code]);

  return (
    <div className="error-page">
      <main className="error-page__panel">
        <div className="error-page__topline">
          <a href="/">Vladislava Berestova</a>
          <span>{code} / Product portfolio</span>
        </div>

        <div className="error-page__copy">
          <p className="error-page__eyebrow">{label}</p>
          <h1>
            {titleStart}{' '}
            <span className="serif-accent">{titleAccent}</span>
            {titleEnd}
          </h1>
          <p className="error-page__description">{description}</p>

          <div className="error-page__actions">
            {onPrimaryAction ? (
              <button type="button" onClick={onPrimaryAction}>
                {primaryLabel}
                <span aria-hidden="true">&#8599;</span>
              </button>
            ) : (
              <a href={primaryHref}>
                {primaryLabel}
                <span aria-hidden="true">&#8599;</span>
              </a>
            )}
            <a href="mailto:vberestova95@gmail.com">Report an issue</a>
          </div>
        </div>

        <div className="error-page__visual" aria-hidden="true">
          <span>{code}</span>
          <img src={knotGraphic} alt="" />
        </div>

        <div className="error-page__footer">
          <span>Designing complex digital systems</span>
          <span>Armenia / 2026</span>
        </div>
      </main>
    </div>
  );
}

export function NotFoundPage() {
  return (
    <ErrorPage
      code="404"
      label="Page not found"
      titleStart="This page slipped"
      titleAccent="out of"
      titleEnd=" the system."
      description="The link may be outdated, or the page may have moved. The selected work is still exactly where it should be."
      primaryLabel="Back to selected work"
    />
  );
}

export function RuntimeErrorPage() {
  return (
    <ErrorPage
      code="500"
      label="Unexpected interface error"
      titleStart="Something went"
      titleAccent="off-grid"
      titleEnd="."
      description="The interface hit an unexpected error. Reloading usually puts everything back in place."
      primaryLabel="Reload the page"
      onPrimaryAction={() => window.location.reload()}
    />
  );
}
