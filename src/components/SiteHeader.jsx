import React from 'react';
import { ContactLink } from './ContactLink.jsx';

/*
 * Top bar for the internal pages. The home page carries the same information
 * inside its hero panel, so it does not use this. Deliberately static — it
 * scrolls away with the page instead of following it down.
 */
export function SiteHeader({ profile }) {
  return (
    <header className="site-topbar">
      <a className="site-topbar__brand" href="/" data-return-home>
        {profile.name}
      </a>

      <div className="site-topbar__contacts" aria-label="Contact links">
        {profile.contacts.map((contact) => (
          <ContactLink key={contact.label} contact={contact} className="contact-link" />
        ))}
      </div>
    </header>
  );
}
