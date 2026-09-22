import React from 'react';
import editorialObject from '../assets/editorial-object.webp';
import { ContactLink } from './ContactLink.jsx';

/* Closing panel, shared by the home page and every internal page. */
export function SiteFooter({ profile }) {
  return (
    <footer className="home-footer">
      <div className="home-shell home-footer__panel">
        <img className="home-footer__graphic" src={editorialObject} alt="" aria-hidden="true" />

        <div className="home-footer__intro">
          <h2>{profile.availability.title}</h2>
          {profile.availability.paragraphs.map((paragraph) => (
            <p key={paragraph} className="home-footer__lead">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="home-footer__links">
          {profile.contacts.map((contact) => (
            <ContactLink key={contact.label} contact={contact} />
          ))}
        </div>
      </div>
    </footer>
  );
}
