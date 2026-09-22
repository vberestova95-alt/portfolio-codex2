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
import {
  PetInjectionTrackerPage,
  petInjectionTrackerCaseStudy,
} from './pages/PetInjectionTrackerPage.jsx';

const CASE_ONLY_MODE = import.meta.env.VITE_CASE_ONLY === 'true';
const CASE_STUDIES_BY_PATH = {
  '/betboom-pass': betboomPassCaseStudy,
  '/cat-app': catAppCaseStudy,
  '/iquoto': iquotoCaseStudy,
  '/kokoc-group': kokocCaseStudy,
  '/yandex-turkey': yandexTurkeyCaseStudy,
};

const DETAIL_PATHS = new Set([...Object.keys(CASE_STUDIES_BY_PATH), '/design-concepts']);
const PET_INJECTION_TRACKER_PATH = '/pet-injection-tracker';

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

  if (pathname === PET_INJECTION_TRACKER_PATH) {
    return {
      title: `${petInjectionTrackerCaseStudy.hero.title} - Vladislava Berestova`,
      description: petInjectionTrackerCaseStudy.hero.description,
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
  const currentBrowserPathname =
    typeof window === 'undefined' ? '/' : normalizePathname(window.location.pathname);
  const pathname = CASE_ONLY_MODE ? PET_INJECTION_TRACKER_PATH : currentBrowserPathname;
  const currentCaseStudy = CASE_STUDIES_BY_PATH[pathname] ?? null;
  const metadata = getPageMetadata(pathname, currentCaseStudy);

  useEffect(() => observeReveal(), []);

  useEffect(() => {
    if (CASE_ONLY_MODE) {
      return undefined;
    }

    return attachReturnNavigation({
      pathname,
      detailPaths: DETAIL_PATHS,
      normalizePathname,
    });
  }, [pathname]);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !CASE_ONLY_MODE ||
      currentBrowserPathname === PET_INJECTION_TRACKER_PATH
    ) {
      return;
    }

    window.history.replaceState(
      window.history.state,
      '',
      `${PET_INJECTION_TRACKER_PATH}${window.location.search}${window.location.hash}`,
    );
  }, [currentBrowserPathname]);

  useEffect(() => {
    if (!metadata) {
      return;
    }

    const description = document.querySelector('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]');
    const openGraphTitle = document.querySelector('meta[property="og:title"]');
    const openGraphDescription = document.querySelector('meta[property="og:description"]');
    const openGraphUrl = document.querySelector('meta[property="og:url"]');
    const siteOrigin =
      typeof window === 'undefined' ? 'https://vberestova.com' : window.location.origin;
    const canonicalUrl = `${siteOrigin}${pathname === '/' ? '/' : pathname}`;

    document.title = metadata.title;
    description?.setAttribute('content', metadata.description);
    canonical?.setAttribute('href', canonicalUrl);
    openGraphTitle?.setAttribute('content', metadata.title);
    openGraphDescription?.setAttribute('content', metadata.description);
    openGraphUrl?.setAttribute('content', canonicalUrl);
  }, [metadata, pathname]);

  if (pathname === '/design-concepts') {
    return <DesignConceptsPage archive={designConcepts} profile={profile} />;
  }

  if (pathname === PET_INJECTION_TRACKER_PATH) {
    return <PetInjectionTrackerPage profile={profile} />;
  }

  if (currentCaseStudy) {
    return <CaseStudyPage caseStudy={currentCaseStudy} cases={cases} profile={profile} />;
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
