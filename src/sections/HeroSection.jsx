import React from 'react';

export function HeroSection({ profile }) {
  return (
    <section className="hero section-shell" aria-labelledby="hero-title">
      <div className="hero-photo-wrap">
        <img className="hero-photo" src={profile.photo.src} alt={profile.photo.alt} />
      </div>
      <div className="hero-copy">
        <h1 id="hero-title">
          Привет!✌️ <span className="hero-title-break">Я Владислава</span>
        </h1>
        <p>{profile.roleDescription}</p>
      </div>
    </section>
  );
}
