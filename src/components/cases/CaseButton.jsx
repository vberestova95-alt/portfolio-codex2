import React from 'react';

export function CaseButton({ href, interactive = true }) {
  if (!interactive || !href || href === '#') {
    return <span className="case-button">Смотреть кейс</span>;
  }

  return (
    <a className="case-button" href={href}>
      Смотреть кейс
    </a>
  );
}
