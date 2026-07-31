import React from 'react';

const pawPrints = [
  { left: '11%', top: '60%', rotate: '-18deg', delay: '0s' },
  { left: '24%', top: '70%', rotate: '12deg', delay: '1.7s' },
  { left: '38%', top: '58%', rotate: '-12deg', delay: '3.4s' },
  { left: '54%', top: '71%', rotate: '10deg', delay: '5.1s' },
  { left: '69%', top: '59%', rotate: '-16deg', delay: '6.8s' },
  { left: '84%', top: '69%', rotate: '8deg', delay: '8.5s' },
];

function PawPrint({ left, top, rotate, delay }) {
  return (
    <span
      className="cat-case__paw"
      style={{
        left,
        top,
        '--paw-rotate': rotate,
        '--paw-delay': delay,
      }}
      aria-hidden="true"
    >
      <span className="cat-case__paw-toe cat-case__paw-toe--1" />
      <span className="cat-case__paw-toe cat-case__paw-toe--2" />
      <span className="cat-case__paw-toe cat-case__paw-toe--3" />
      <span className="cat-case__paw-toe cat-case__paw-toe--4" />
      <span className="cat-case__paw-pad" />
    </span>
  );
}

function CatFigure() {
  return (
    <div className="cat-case__cat" aria-hidden="true">
      <span className="cat-case__shadow" />
      <span className="cat-case__tail" />
      <span className="cat-case__body" />
      <span className="cat-case__leg cat-case__leg--back" />
      <span className="cat-case__leg cat-case__leg--back-alt" />
      <span className="cat-case__leg cat-case__leg--front" />
      <span className="cat-case__leg cat-case__leg--front-alt" />
      <span className="cat-case__head">
        <span className="cat-case__ear cat-case__ear--left" />
        <span className="cat-case__ear cat-case__ear--right" />
        <span className="cat-case__eye cat-case__eye--left" />
        <span className="cat-case__eye cat-case__eye--right" />
        <span className="cat-case__nose" />
        <span className="cat-case__whiskers cat-case__whiskers--left" />
        <span className="cat-case__whiskers cat-case__whiskers--right" />
      </span>
    </div>
  );
}

export function CatCaseTeaserSection() {
  return (
    <section className="cat-case section-shell" aria-label="Дополнительный кейс">
      <div className="cat-case__intro">
        <p>В самом низу прячется еще один кейс</p>
      </div>

      <a
        className="cat-case__track"
        href="/cat-app"
        aria-label="Открыть кейс про приложение для кота"
      >
        <span className="cat-case__track-label">Открыть кейс</span>

        <div className="cat-case__scene">
          {pawPrints.map((paw) => (
            <PawPrint
              key={`${paw.left}-${paw.top}`}
              left={paw.left}
              top={paw.top}
              rotate={paw.rotate}
              delay={paw.delay}
            />
          ))}

          <div className="cat-case__walker">
            <div className="cat-case__bubble">навайбкодила приложение для кота</div>
            <CatFigure />
          </div>
        </div>
      </a>
    </section>
  );
}
