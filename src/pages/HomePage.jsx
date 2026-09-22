import React, { useEffect, useRef } from 'react';
/*
 * One object carries the whole site: the hero, the practice card and the
 * footer all render this same knot, at different scales and orientations. The
 * hero used to run a bubble clip instead, which read as a separate visual
 * language — the two files are still in assets/ if that direction comes back.
 */
import editorialObject from '../assets/editorial-object.webp';
import { NavMenu } from '../components/NavMenu.jsx';
import { SiteFooter } from '../components/SiteFooter.jsx';
import { attachHeroObject } from '../lib/heroObject.js';
import { attachShotTrail } from '../lib/shotTrail.js';

// Keep the section in code, but hidden until the copy is rewritten.
const SHOW_ACHIEVEMENTS_SECTION = false;

// Client logo band under the hero copy. Assets, data and styles are all still
// in place — flip this back to true to bring the row back.
const SHOW_CLIENT_LOGOS = false;

/*
 * The brand is already on the page it links to, so a plain navigation to "/" is
 * not guaranteed to do anything visible. Reloading is the explicit behaviour —
 * it puts the hero back at the top and restarts the reveal pass. Modified
 * clicks are left alone so the link still opens in a new tab.
 */
function handleBrandClick(event) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
    return;
  }

  event.preventDefault();
  window.location.reload();
}

/*
 * Without the eyebrow the content would be auto-placed into the label's own
 * column, so the modifier collapses the header to one full-width column and the
 * heading starts flush left, on the same line as whatever follows it.
 */
function SectionHeader({ label, title, description }) {
  return (
    <header className={`section-header${label ? '' : ' section-header--no-label'}`} data-reveal>
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
  clients,
  designConceptTeaser,
  achievements,
  experiences,
}) {
  const heroRef = useRef(null);
  const objectRef = useRef(null);

  useEffect(() => attachHeroObject(heroRef.current, objectRef.current), []);

  return (
    <div className="home-page">
      <section className="hero-shell">
        <div className="home-shell hero-panel" ref={heroRef}>
          <div className="hero-panel__top">
            <a className="hero-panel__brand" href="/" onClick={handleBrandClick}>
              {profile.name}
            </a>
            <NavMenu contacts={profile.contacts} />
          </div>

          <div className="hero-panel__grid">
            <div className="hero-panel__copy">
              <h1>
                Product <span className="serif-accent">Designer</span> for
                <br />
                complex digital systems
              </h1>

              <div className="hero-panel__intro">
                <div className="hero-panel__portrait">
                  <img src={profile.photo.src} alt={profile.photo.alt} />
                </div>

                <div className="hero-panel__intro-copy">
                  {profile.summary.map((paragraph) => (
                    <p key={paragraph} className="hero-panel__lead">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="hero-panel__object" aria-hidden="true">
            <img ref={objectRef} src={editorialObject} alt="" />
          </div>

          {SHOW_CLIENT_LOGOS ? (
            <div className="hero-panel__footer">
              <ul className="hero-clients" aria-label="Clients and products">
                {clients.map((client) => (
                  <li key={client.name} className="hero-client">
                    <img
                      src={client.logo}
                      alt={client.name}
                      style={{
                        '--logo-h': `${client.height}px`,
                        '--logo-y': `${client.nudge}px`,
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
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
              Focused on <span className="serif-accent">design systems</span>, AI-assisted
              workflows, and internal tools
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
            <img className="editorial-card__graphic" src={editorialObject} alt="" aria-hidden="true" />
          </article>
        </div>
      </section>

      {SHOW_ACHIEVEMENTS_SECTION ? (
        <section className="section home-shell">
          <SectionHeader
            label="Key Achievements"
            title="A track record of shipping, scaling, validating, and improving the way teams design"
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

      <section className="section home-shell experience-section">
        <SectionHeader title="Product work across in-house teams, agencies, startup environments, and freelance delivery" />

        <div className="experience-table">
          {experiences.map((item) => (
            <article key={item.id} className="experience-row" data-reveal>
              <div className="experience-row__title">
                <h3>{item.company}</h3>
                <p>
                  {item.role}
                  <span className="experience-row__period">{item.period}</span>
                </p>
              </div>

              <div className="experience-row__body">
                <p>{item.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter profile={profile} />
    </div>
  );
}
