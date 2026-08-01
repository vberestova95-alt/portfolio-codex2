import React, { useEffect, useRef } from 'react';
import knotGraphic from '../assets/editorial-knot.png';
import orbitGraphic from '../assets/editorial-orbit.png';
import { attachPointerObject } from '../lib/pointerObject.js';
import { attachShotTrail } from '../lib/shotTrail.js';

// Keep the section in code, but hidden until the copy is rewritten.
const SHOW_ACHIEVEMENTS_SECTION = false;

function ContactLink({ contact, className }) {
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

function SectionHeader({ label, title, description }) {
  return (
    <header className="section-header" data-reveal>
      {label ? <p className="section-label">{label}</p> : null}
      <div className="section-header__content">
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
    </header>
  );
}

/*
 * React sets `muted` as a property after mount, which is too late for Safari's
 * autoplay check — it sees an unmuted video on first paint and blocks playback.
 * Setting it on the element itself, then calling play(), makes it reliable.
 */
function CoverMotion({ motion }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    node.muted = true;
    node.defaultMuted = true;

    const start = () => {
      const attempt = node.play();

      if (attempt && typeof attempt.catch === 'function') {
        attempt.catch(() => {});
      }
    };

    if (node.readyState >= 2) {
      start();
    } else {
      node.addEventListener('loadeddata', start, { once: true });
    }

    return () => node.removeEventListener('loadeddata', start);
  }, []);

  return (
    <div
      className="cover-stage__motion"
      aria-hidden="true"
      style={{
        left: motion.left,
        top: motion.top,
        width: motion.width,
        height: motion.height,
      }}
    >
      <video ref={ref} src={motion.src} autoPlay muted loop playsInline preload="auto" />
      {motion.fade ? (
        <span className="cover-stage__fade" style={{ backgroundImage: motion.fade }} />
      ) : null}
      {motion.overlay ? (
        <img className="cover-stage__overlay" src={motion.overlay} alt="" />
      ) : null}
    </div>
  );
}

function WorkCard({ item, index, total }) {
  return (
    <article
      className={`work-card work-card--${item.surface} work-card--${item.id}`}
      style={{
        '--stack-index': index,
        '--stack-total': total,
      }}
    >
      <a className="work-card__hit" href={item.href}>
        <span className="visually-hidden">{`Open case study: ${item.title}`}</span>
      </a>

      <div className="work-card__meta">
        <span>{item.year}</span>
      </div>
      <div className="work-card__body">
        <div className="work-card__copy">
          <p className="work-card__kicker">{item.category}</p>
          <h3>{item.title}</h3>
          <p className="work-card__description">{item.description}</p>
          <ul className="work-card__stats">
            {item.metrics.map((metric) => (
              <li key={metric}>{metric}</li>
            ))}
          </ul>
        </div>
        <div className={`work-card__visual${item.motion ? ' work-card__visual--stage' : ''}`}>
          {item.motion ? (
            <div
              className="cover-stage"
              style={{ '--stage-w': item.stage.width, '--stage-h': item.stage.height }}
            >
              <img className="cover-stage__base" src={item.image.src} alt={item.image.alt} />
              <CoverMotion motion={item.motion} />
            </div>
          ) : (
            <img
              src={item.image.src}
              alt={item.image.alt}
              style={
                item.focus
                  ? {
                      '--zoom': item.focus.zoom,
                      '--fx': item.focus.fx,
                      '--fy': item.focus.fy,
                    }
                  : undefined
              }
            />
          )}
          {item.mobileImage && !item.motion ? (
            <div className="work-card__mobile">
              <img src={item.mobileImage.src} alt={item.mobileImage.alt} />
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function ConceptTeaser({ teaser }) {
  const trailRef = useRef(null);

  useEffect(() => attachShotTrail(trailRef.current), []);

  return (
    <article className="editorial-card concept-teaser" ref={trailRef} data-reveal>
      <a className="concept-teaser__hit" href={teaser.href}>
        <span className="visually-hidden">{teaser.linkLabel}</span>
      </a>

      <div className="concept-teaser__shots" aria-hidden="true">
        {teaser.shots.map((shot) => (
          <div key={shot.src} className="concept-shot" data-shot>
            <img src={shot.src} alt="" />
          </div>
        ))}
      </div>

      <div className="concept-teaser__copy">
        <h3 className="editorial-card__title">{teaser.title}</h3>
        <p className="editorial-card__copy">{teaser.description}</p>
      </div>

      <div className="concept-teaser__footer">
        <span>{teaser.footer}</span>
        <span className="concept-teaser__cta">
          {teaser.linkLabel}
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </article>
  );
}

export function HomePage({
  profile,
  cases,
  designConceptTeaser,
  achievements,
  experiences,
}) {
  const heroRef = useRef(null);
  const objectRef = useRef(null);

  useEffect(() => attachPointerObject(heroRef.current, objectRef.current), []);

  return (
    <div className="home-page">
      <section className="hero-shell">
        <div className="home-shell hero-panel" ref={heroRef}>
          <div className="hero-panel__top">
            <span>{profile.name}</span>
            <div className="hero-panel__top-contacts" aria-label="Contact links">
              {profile.contacts.map((contact) => (
                <ContactLink
                  key={contact.label}
                  contact={contact}
                  className="contact-link"
                />
              ))}
            </div>
          </div>

          <div className="hero-panel__grid">
            <div className="hero-panel__copy">
              <h1>
                Product <span className="serif-accent">Designer</span> for
                <br />
                complex digital systems.
              </h1>

              {profile.summary.map((paragraph) => (
                <p key={paragraph} className="hero-panel__lead">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="hero-panel__object" aria-hidden="true">
            <div className="hero-panel__object-float">
              <img ref={objectRef} src={knotGraphic} alt="" />
            </div>
          </div>

          <div className="hero-panel__footer">
            <div className="hero-panel__portrait">
              <img src={profile.photo.src} alt={profile.photo.alt} />
            </div>
            <p>{profile.clientLine}</p>
          </div>
        </div>
      </section>

      <section className="section home-shell" id="work">
        <div className="work-stack">
          {cases.map((item, index) => (
            <WorkCard key={item.id} item={item} index={index} total={cases.length} />
          ))}
        </div>
      </section>

      <section className="section home-shell practice-section">
        <div className="two-column-section">
          <ConceptTeaser teaser={designConceptTeaser} />

          <article className="editorial-card editorial-card--blue editorial-card--practice" data-reveal>
            <h3 className="editorial-card__title">
              Recently focused on <span className="serif-accent">design systems</span>,
              AI-assisted workflows, and internal tools.
            </h3>
            <p className="editorial-card__copy">
              I enjoy solving complex product challenges from discovery to delivery, working
              closely with product managers, engineers, researchers, and stakeholders to turn
              ambiguity into a coherent product direction.
            </p>
            <ul className="editorial-card__tools" aria-label="AI tools">
              <li>Claude Code</li>
              <li>Codex</li>
              <li>Figma AI</li>
            </ul>
            <img className="editorial-card__graphic" src={orbitGraphic} alt="" aria-hidden="true" />
          </article>
        </div>
      </section>

      {SHOW_ACHIEVEMENTS_SECTION ? (
        <section className="section home-shell">
          <SectionHeader
            label="Key Achievements"
            title="A track record of shipping, scaling, validating, and improving the way teams design."
          />

          <div className="achievement-grid">
            {achievements.map((item, index) => (
              <article key={item} className="achievement-card" data-reveal>
                <span className="achievement-card__index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section home-shell">
        <SectionHeader
          label="Experience"
          title="Product work across in-house teams, agencies, startup environments, and freelance delivery."
        />

        <div className="experience-table">
          {experiences.map((item) => (
            <article key={item.id} className="experience-row" data-reveal>
              <div className="experience-row__meta">
                <span>{item.period}</span>
                <span>{item.location}</span>
              </div>

              <div className="experience-row__title">
                <h3>{item.company}</h3>
                <p>{item.role}</p>
              </div>

              <div className="experience-row__body">
                <p>{item.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="home-footer">
        <div className="home-shell home-footer__panel">
          <img
            className="home-footer__graphic"
            src={knotGraphic}
            alt=""
            aria-hidden="true"
          />

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
    </div>
  );
}
