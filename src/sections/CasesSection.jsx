import React from 'react';
import { CaseCard } from '../components/cases/CaseCard.jsx';

export function CasesSection({ items }) {
  const [featuredCase, wideCase, ...gridCases] = items;

  return (
    <section className="cases section-shell" aria-label="Кейсы">
      <CaseCard caseItem={featuredCase} />
      <CaseCard caseItem={wideCase} />
      <div className="cases-grid">
        {gridCases.map((caseItem) => (
          <CaseCard key={caseItem.id} caseItem={caseItem} />
        ))}
      </div>
    </section>
  );
}
