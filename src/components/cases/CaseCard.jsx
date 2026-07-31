import React from 'react';
import { CaseButton } from './CaseButton.jsx';
import { CaseDescription } from './CaseDescription.jsx';
import { CaseVisual } from './CaseVisual.jsx';

const classNamesByVariant = {
  featured: 'case-card case-card-featured case-dark case-featured',
  wide: 'case-card case-card-wide case-light case-news',
  kokoc: 'case-card case-light case-card-kokoc case-kokoc',
  iquoto: 'case-card case-light case-card-iquoto case-iquoto',
};

const copyClassNamesByVariant = {
  featured: 'case-copy',
  wide: 'case-copy case-copy-tight',
  kokoc: 'case-copy case-copy-tight case-copy-narrow',
  iquoto: 'case-copy case-copy-tight',
};

export function CaseCard({ caseItem }) {
  const isClickable = caseItem.href && caseItem.href !== '#';

  return (
    <article className={classNamesByVariant[caseItem.variant]}>
      {isClickable ? (
        <a
          className="case-card-hitarea"
          href={caseItem.href}
          aria-label={`Открыть кейс ${caseItem.title}`}
        />
      ) : null}
      <div className={copyClassNamesByVariant[caseItem.variant]}>
        <h2>{caseItem.title}</h2>
        <CaseDescription caseItem={caseItem} />
      </div>
      <CaseButton href={caseItem.href} interactive={false} />
      <CaseVisual caseItem={caseItem} isClickable={false} />
    </article>
  );
}
