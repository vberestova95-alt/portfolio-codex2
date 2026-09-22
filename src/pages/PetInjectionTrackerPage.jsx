import React from 'react';
import { catAppCaseStudy } from '../data/caseStudies.js';
import { CaseStudyPage } from './BetboomPassPage.jsx';

export const petInjectionTrackerCaseStudy = {
  ...catAppCaseStudy,
  slug: 'pet-injection-tracker',
  hero: {
    ...catAppCaseStudy.hero,
    meta: 'Standalone case study / Pet-tech concept',
    description:
      'My cat needs insulin twice a day. Missing one matters, and a notes app is a bad place to track that, so I built the thing I wanted to exist.',
  },
};

export function PetInjectionTrackerPage({ profile }) {
  const standaloneProfile = profile
    ? {
        ...profile,
        name: 'Berestova Vladislava',
        contacts: profile.contacts.filter(
          (contact) => contact.label === 'LinkedIn' || contact.label === 'Dribbble',
        ).sort((left, right) => {
          const order = ['LinkedIn', 'Dribbble'];
          return order.indexOf(left.label) - order.indexOf(right.label);
        }),
        availability: {
          title: 'Looking for users for testing',
          paragraphs: [
            'If your pet has a routine with recurring injections, I would love to talk and see how this flow fits real habits.',
          ],
        },
      }
    : null;

  return (
    <CaseStudyPage
      caseStudy={petInjectionTrackerCaseStudy}
      cases={[]}
      profile={standaloneProfile}
      headerBrandHref="/pet-injection-tracker"
      showReturnHome={false}
      showSectionBackLink={false}
    />
  );
}
