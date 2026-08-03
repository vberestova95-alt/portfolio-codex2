import React from 'react';

export function ContactLink({ contact, className }) {
  const isExternal = contact.href.startsWith('http');
  const isCv = contact.label === 'CV';

  return (
    <a
      className={className}
      href={contact.href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      download={isCv ? 'Vladislava-Berestova-CV.pdf' : undefined}
    >
      {contact.label}
    </a>
  );
}
