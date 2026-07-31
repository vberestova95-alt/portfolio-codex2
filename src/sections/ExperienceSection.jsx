import React, { useState, useRef, useEffect } from 'react';
import experienceArrowIcon from '../assets/experience-arrow.svg';

function ExperienceItem({ company, period, description, tone }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    if (open) {
      el.style.height = el.scrollHeight + 'px';
    } else {
      el.style.height = el.scrollHeight + 'px';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.height = '0px';
        });
      });
    }
  }, [open]);

  const handleTransitionEnd = () => {
    if (open && bodyRef.current) {
      bodyRef.current.style.height = 'auto';
    }
  };

  return (
    <article className={`experience-item${tone ? ` ${tone}` : ''}${open ? ' is-open' : ''}`}>
      <button
        className="experience-toggle"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
      >
        <div className="experience-text-group">
          <span className="experience-period">{period}</span>
          <span className="experience-company">{company}</span>
        </div>
        <span className="experience-icon" aria-hidden="true">
          <img src={experienceArrowIcon} alt="" />
        </span>
      </button>
      {description && (
        <div
          ref={bodyRef}
          className="experience-body"
          style={{ height: 0 }}
          onTransitionEnd={handleTransitionEnd}
        >
          <p className="experience-description">{description}</p>
        </div>
      )}
    </article>
  );
}

export function ExperienceSection({ items }) {
  return (
    <section id="experience" className="experience section-shell" aria-labelledby="experience-title">
      <div className="experience-title-wrap">
        <h2 id="experience-title">Опыт работы</h2>
      </div>
      <div className="experience-list">
        {items.map((item, index) => (
          <ExperienceItem
            key={item.id}
            period={item.period}
            company={item.company}
            description={item.description}
            tone={index === 1 ? 'experience-item-alt' : ''}
          />
        ))}
      </div>
    </section>
  );
}
