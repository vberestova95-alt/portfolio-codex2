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
import { attachReturnNavigation } from './lib/returnNavigation.js';
import { HomePage } from './pages/HomePage.jsx';
import { CaseStudyPage } from './pages/BetboomPassPage.jsx';
import { DesignConceptsPage } from './pages/DesignConceptsPage.jsx';
import { NotFoundPage } from './pages/ErrorPage.jsx';

const CASE_STUDIES_BY_PATH = {
  '/betboom-pass': betboomPassCaseStudy,
  '/cat-app': catAppCaseStudy,
  '/iquoto': iquotoCaseStudy,
  '/kokoc-group': kokocCaseStudy,
  '/yandex-turkey': yandexTurkeyCaseStudy,
};

const DETAIL_PATHS = new Set([...Object.keys(CASE_STUDIES_BY_PATH), '/design-concepts']);

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

function getPageMetadata(pathname, currentCaseStudy) {
  if (pathname === '/') {
    return {
      title: 'Vladislava Berestova - Product Designer',
      description:
        'Portfolio of Vladislava Berestova, a product designer focused on complex digital systems, design systems, and product-led UX.',
    };
  }

  if (pathname === '/design-concepts') {
    return {
      title: 'Design Concepts - Vladislava Berestova',
      description:
        'Independent interface studies and portfolio concepts exploring art direction, visual systems, and interface craft.',
    };
  }

  if (currentCaseStudy) {
    return {
      title: `${currentCaseStudy.hero.title} - Vladislava Berestova`,
      description: currentCaseStudy.hero.description,
    };
  }

  return null;
}

export function App() {
  const pathname =
    typeof window === 'undefined' ? '/' : normalizePathname(window.location.pathname);
  const currentCaseStudy = CASE_STUDIES_BY_PATH[pathname] ?? null;
  const metadata = getPageMetadata(pathname, currentCaseStudy);

  useEffect(() => observeReveal(), []);

  useEffect(
    () =>
      attachReturnNavigation({
        pathname,
        detailPaths: DETAIL_PATHS,
        normalizePathname,
      }),
    [pathname],
  );

  useEffect(() => {
    if (!metadata) {
      return;
    }

    const description = document.querySelector('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]');
    const openGraphTitle = document.querySelector('meta[property="og:title"]');
    const openGraphDescription = document.querySelector('meta[property="og:description"]');
    const openGraphUrl = document.querySelector('meta[property="og:url"]');
    const canonicalUrl = `https://vberestova.com${pathname === '/' ? '/' : pathname}`;

    document.title = metadata.title;
    description?.setAttribute('content', metadata.description);
    canonical?.setAttribute('href', canonicalUrl);
    openGraphTitle?.setAttribute('content', metadata.title);
    openGraphDescription?.setAttribute('content', metadata.description);
    openGraphUrl?.setAttribute('content', canonicalUrl);
  }, [metadata, pathname]);

  if (pathname === '/design-concepts') {
    return <DesignConceptsPage archive={designConcepts} />;
  }

  if (currentCaseStudy) {
    return <CaseStudyPage caseStudy={currentCaseStudy} cases={cases} />;
  }

  if (pathname !== '/') {
    return <NotFoundPage />;
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
