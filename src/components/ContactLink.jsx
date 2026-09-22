import React from 'react';

export function ContactLink({ contact, className, onClick }) {
  const isExternal = contact.href.startsWith('http');
  const isCv = contact.label === 'CV';

  return (
    <a
      className={className}
      href={contact.href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      download={isCv ? 'Vladislava-Berestova-CV.pdf' : undefined}
      onClick={onClick}
    >
      {contact.label}
    </a>
  );
}
