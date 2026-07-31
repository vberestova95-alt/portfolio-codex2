import React, { useEffect } from 'react';
import {
  betboomPassCaseStudy,
  catAppCaseStudy,
  iquotoCaseStudy,
  kokocCaseStudy,
  yandexTurkeyCaseStudy,
} from './data/caseStudies.js';
import {
  achievements,
  additionalAchievements,
  cases,
  clients,
  experiences,
  designConceptTeaser,
  designConcepts,
  profile,
} from './data/portfolioData.js';
import { observeReveal } from './lib/reveal.js';
import { HomePage } from './pages/HomePage.jsx';
import { CaseStudyPage } from './pages/BetboomPassPage.jsx';
import { DesignConceptsPage } from './pages/DesignConceptsPage.jsx';

const CASE_STUDIES_BY_PATH = {
  '/betboom-pass': betboomPassCaseStudy,
  '/cat-app': catAppCaseStudy,
  '/iquoto': iquotoCaseStudy,
  '/kokoc-group': kokocCaseStudy,
  '/yandex-turkey': yandexTurkeyCaseStudy,
};

function normalizePathname(pathname) {
  const rawPath = pathname || '/';
  const withoutIndex =
    rawPath === '/index.html' || rawPath.endsWith('/index.html')
      ? rawPath.slice(0, -'/index.html'.length) || '/'
      : rawPath;

  if (withoutIndex !== '/' && withoutIndex.endsWith('/')) {
    return withoutIndex.slice(0, -1);
  }

  return withoutIndex;
}

export function App() {
  useEffect(() => observeReveal(), []);

  const pathname =
    typeof window === 'undefined' ? '/' : normalizePathname(window.location.pathname);
  const currentCaseStudy = CASE_STUDIES_BY_PATH[pathname] ?? null;

  if (pathname === '/design-concepts') {
    return <DesignConceptsPage archive={designConcepts} />;
  }

  if (currentCaseStudy) {
    return <CaseStudyPage caseStudy={currentCaseStudy} />;
  }

  return (
    <HomePage
      profile={profile}
      cases={cases}
      designConceptTeaser={designConceptTeaser}
      achievements={achievements}
      additionalAchievements={additionalAchievements}
      experiences={experiences}
      clients={clients}
    />
  );
}
