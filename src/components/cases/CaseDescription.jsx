import React from 'react';

export function CaseDescription({ caseItem }) {
  if (caseItem.descriptionLines) {
    return (
      <div className="case-description case-description-list">
        {caseItem.descriptionLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <ul>
          {caseItem.achievements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }

  if (caseItem.variant === 'kokoc') {
    const lines = caseItem.description.split('\n');

    return (
      <p className="case-description">
        {lines.map((line, index) => (
          <span key={line}>
            {index > 0 ? <br /> : null}
            {line}
          </span>
        ))}
      </p>
    );
  }

  return <p className="case-description">{caseItem.description}</p>;
}
