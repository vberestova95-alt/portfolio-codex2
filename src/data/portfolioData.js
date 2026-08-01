import betboomFeaturedDesktop from '../assets/cases/betboom-featured-desktop.png';
import betboomFeaturedMobile from '../assets/cases/betboom-featured-mobile.png';
import iquotoDesktop from '../assets/cases/iquoto-desktop.png';
import kokocMainDesktop from '../assets/cases/kokoc-main-desktop.png';
import petTrackerCoverScreens from '../assets/cases/pet-tracker-cover-screens.png';
import yandexCoverScreens from '../assets/cases/yandex-cover-screens.png';
import conceptBeauty from '../assets/concepts/beauty-commerce.png';
import conceptEdtechTutorMarketplace from '../assets/concepts/edtech-tutor-marketplace.png';
import conceptEyewearAr from '../assets/concepts/eyewear-ar.png';
import conceptEyewearCheckout from '../assets/concepts/eyewear-checkout.png';
import conceptEyewearProduct from '../assets/concepts/eyewear-product.png';
import conceptFintech from '../assets/concepts/fintech-investments.png';
import conceptFood from '../assets/concepts/food-ordering.png';
import conceptGameStore from '../assets/concepts/game-store.png';
import conceptHrChats from '../assets/concepts/hr-chats.png';
import conceptHrDashboard from '../assets/concepts/hr-dashboard.png';
import conceptHrStats from '../assets/concepts/hr-stats.png';
import conceptHrSystem from '../assets/concepts/hr-system.png';
import conceptKitchen from '../assets/concepts/kitchen-ops.png';
import conceptMedical from '../assets/concepts/medical-booking.png';
import conceptNft from '../assets/concepts/nft-collection.png';
import conceptRoboticsDeck from '../assets/concepts/robotics-deck.png';
import conceptRoboticsLanding from '../assets/concepts/robotics-landing.png';
import conceptRoboticsSolution from '../assets/concepts/robotics-solution.png';
import conceptTravelBooking from '../assets/concepts/travel-booking.png';
import conceptTravelLanding from '../assets/concepts/travel-landing.png';
import conceptTravelPlaces from '../assets/concepts/travel-places.png';
import conceptStayBookingLivingRoof from '../assets/concepts/stay-booking-living-roof.png';
import betboomBannerOverlay from '../assets/betboom-banner-overlay.png';
import betboomBannerVideo from '../assets/betboom-banner.webm';
import betboomCoverImage from '../assets/betboom-cover.png';
import profilePhoto from '../assets/profile-photo.jpg';

export const profile = {
  name: 'Vladislava Berestova',
  title: 'Product Designer',
  summary: [
    'Product Designer with 6+ years of experience designing B2C and B2B digital products across gaming, fintech, proptech, HR Tech, logistics, and SaaS.',
    'I enjoy solving complex product challenges from user research and product discovery to scalable UX, design systems, and feature delivery.',
  ],
  focusAreas: [
    'Design systems',
    'AI-assisted workflows',
    'Scalable UX',
    'Product discovery',
    'Internal tools',
  ],
  highlights: [
    { value: '6+ years', label: 'Designing B2C and B2B products' },
    { value: 'E2E', label: 'From discovery to launch and iteration' },
    { value: 'Global', label: 'Products across gaming, SaaS, fintech, and logistics' },
  ],
  photo: {
    src: profilePhoto,
    alt: 'Portrait of Vladislava Berestova',
  },
  contacts: [
    { label: 'Dribbble', href: 'https://dribbble.com/Meoosh' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/vladislava-berestova-068516361/',
    },
    {
      label: 'CV',
      href: '/Vladislava-Berestova-CV.pdf',
    },
  ],
  clientLine:
    'Worked with clients including Yandex Turkey, Avito, Kokoc Group, and other technology companies through design agencies.',
  availability: {
    title: 'Open to Product Designer roles.',
    paragraphs: [
      'Six years of designing B2C and B2B products across gaming, fintech, proptech, HR Tech, logistics, and SaaS — in-house, in agencies, and with startup teams.',
    ],
  },
};

export const cases = [
  {
    id: 'betboom-pass',
    /*
     * Composite cover: a still export of the interface with the banner clip
     * played back on top. Figma's video export cannot composite video fills,
     * so the two layers are reassembled here instead.
     * Geometry is taken from the Figma frame (1058x967): the banner sits at
     * x -35 / y 46 and is 1113 wide, clipped to 325 tall.
     */
    stage: { width: 1058, height: 967 },
    motion: {
      src: betboomBannerVideo,
      left: '-3.308%',
      top: '4.757%',
      width: '105.198%',
      height: '33.609%',
      /*
       * The banner's Fade rectangle darkens the clip so the headline stays
       * readable. Figma exports it baked into the still, so it is rebuilt here
       * from the original gradient stops (#121212 at 10% -> 100% alpha).
       */
      fade:
        'linear-gradient(to bottom, rgba(18,18,18,0.1) 0%, rgba(18,18,18,0.1) 19.6%, rgba(18,18,18,0.413) 61.4%, rgba(18,18,18,0.696) 73%, rgba(18,18,18,0.862) 81.5%, rgba(18,18,18,1) 91.7%, rgba(18,18,18,1) 100%)',
      // Headline, timer and reward card — sits above the fade, as in the file.
      overlay: betboomBannerOverlay,
    },
    title: 'BetBoom PASS',
    year: '2025–2026',
    category: 'Gamification / Core Product',
    description:
      'Core product redesign for a gamification ecosystem that expanded from esports-first mechanics into a broader sports audience.',
    metrics: ['+60% DAU', '+75% retention'],
    surface: 'ink',
    image: {
      src: betboomCoverImage,
      alt: 'BetBoom PASS interface preview',
    },
    mobileImage: {
      src: betboomFeaturedMobile,
      alt: 'BetBoom PASS mobile interface preview',
    },
    href: '/betboom-pass',
  },
  {
    id: 'yandex-news',
    title: 'Yandex News Turkey',
    year: '2024',
    category: 'MVP / News Product',
    description:
      'A mobile-first MVP for a Turkish news experience built to validate a product opportunity and a new content model.',
    metrics: ['Mobile-first', 'Concept validation'],
    surface: 'paper',
    image: {
      src: yandexCoverScreens,
      alt: 'Three mobile screens from the Yandex News Turkey concept',
    },
    href: '/yandex-turkey',
  },
  {
    id: 'kokoc-group',
    title: 'Kokoc Group',
    year: '2024',
    category: 'Brand Website / Corporate',
    description:
      'A corporate website redesign built around anniversary storytelling, stronger brand framing, and a more modern visual rhythm.',
    metrics: ['Website redesign', 'Brand refresh'],
    surface: 'mint',
    image: {
      src: kokocMainDesktop,
      alt: 'Kokoc Group desktop homepage concept',
    },
    href: '/kokoc-group',
  },
  {
    id: 'cat-app',
    title: 'Pet Diabetes Tracker',
    year: '2025',
    category: 'Pet Health / Side Project',
    description:
      'A calm injection-tracking app concept for pets with diabetes, designed to make treatment routines easier to follow and less stressful for owners.',
    metrics: ['Beta concept', 'Care routine UX'],
    surface: 'pet',
    image: {
      src: petTrackerCoverScreens,
      alt: 'Three mobile screens from the Pet Injection Tracker',
    },
    href: '/cat-app',
  },
  {
    id: 'iquoto',
    title: 'IQuoto',
    year: '2022–2025',
    category: 'Fintech / Registration Flow',
    description:
      'A registration funnel redesign for an online brokerage platform with high friction and a significant drop-off at the personal data step.',
    metrics: ['5 → 3 steps', 'Lower friction'],
    surface: 'graphite',
    image: {
      src: iquotoDesktop,
      alt: 'IQuoto registration redesign screens',
    },
    href: '/iquoto',
  },
];

export const designConceptTeaser = {
  label: 'Design Concepts',
  title: 'Dribbble shots and concept studies.',
  description:
    'A mix of self-initiated studies made in my free time and portfolio concepts created as part of my work at Ronas IT. Together, they are a space to explore art direction, visual systems, and interface craft.',
  footer: 'Independent studies / Ronas IT portfolio work / visual systems',
  linkLabel: 'Open concept archive',
  href: '/design-concepts',
  shots: [
    { src: conceptHrSystem, alt: 'Concept shot of an HR management dashboard' },
    { src: conceptFintech, alt: 'Concept shot of an investment app interface' },
    { src: conceptGameStore, alt: 'Concept shot of a game store interface' },
    { src: conceptBeauty, alt: 'Concept shot of a beauty commerce product page' },
  ],
};

export const designConcepts = {
  intro: {
    eyebrow: 'Concept Archive',
    title: 'Dribbble shots and concept studies.',
    description:
      'This archive brings together two sides of my concept practice: self-initiated studies made in my free time, and portfolio-focused concepts created as part of my work at Ronas IT. The projects gave me room to explore art direction, layout, visual systems, and interface craft beyond the constraints of day-to-day product delivery.',
    meta: 'Independent practice / Ronas IT portfolio work / published on Dribbble',
    href: 'https://dribbble.com/Meoosh',
    hrefLabel: 'dribbble.com/Meoosh',
  },
  shots: [
    { src: conceptHrSystem, label: 'HR platform', title: 'Hiring pipeline and stats', alt: 'HR management system concept with dashboard and hiring pipeline' },
    { src: conceptFintech, label: 'Investment app', title: 'Portfolio and balances', alt: 'Investment app concept with portfolio and balance screens' },
    { src: conceptGameStore, label: 'Game store', title: 'Storefront and library', alt: 'Game store interface concept with storefront and library' },
    { src: conceptTravelBooking, label: 'Stay booking', title: 'Search and date picking', alt: 'Travel booking concept with search and calendar' },
    { src: conceptBeauty, label: 'Beauty commerce', title: 'Editorial product page', alt: 'Beauty commerce concept with editorial product layout' },
    { src: conceptHrDashboard, label: 'HR platform', title: 'Daily overview', alt: 'HR platform concept showing a daily overview dashboard' },
    { src: conceptEyewearAr, label: 'Eyewear retail', title: 'Try-on in AR', alt: 'Eyewear retail concept with an AR try-on flow' },
    { src: conceptTravelPlaces, label: 'Stay booking', title: 'Place collections', alt: 'Travel concept showing curated place collections' },
    { src: conceptKitchen, label: 'Kitchen operations', title: 'Order board', alt: 'Kitchen operations concept with an order board' },
    { src: conceptHrChats, label: 'HR platform', title: 'Candidate messaging', alt: 'HR platform concept with candidate messaging' },
    { src: conceptMedical, label: 'Clinic app', title: 'Booking a doctor', alt: 'Clinic app concept with doctor booking' },
    { src: conceptEyewearProduct, label: 'Eyewear retail', title: 'Product configurator', alt: 'Eyewear retail concept with a product configurator' },
    { src: conceptTravelLanding, label: 'Stay booking', title: 'Landing and availability', alt: 'Travel booking landing concept with availability calendar' },
    { src: conceptEyewearCheckout, label: 'Eyewear retail', title: 'Cart and checkout', alt: 'Eyewear retail concept with cart and checkout' },
    { src: conceptRoboticsLanding, label: 'Agritech', title: 'Landing direction', alt: 'Agritech landing page concept' },
    { src: conceptFood, label: 'Grocery app', title: 'Cart and assistant', alt: 'Grocery ordering app concept with cart and assistant' },
    { src: conceptHrStats, label: 'HR platform', title: 'Job statistics', alt: 'HR platform concept with job statistics' },
    { src: conceptRoboticsDeck, label: 'Agritech', title: 'Presentation layout', alt: 'Agritech presentation layout concept' },
    { src: conceptRoboticsSolution, label: 'Agritech', title: 'Solution storytelling', alt: 'Agritech deck concept explaining the solution' },
    { src: conceptNft, label: 'Collectibles', title: 'Discovery flow', alt: 'Collectibles app concept with a discovery flow' },
    { src: conceptEdtechTutorMarketplace, label: 'EdTech app', title: 'Tutor marketplace', alt: 'EdTech mobile app concept with tutor cards and search', wide: false },
    { src: conceptStayBookingLivingRoof, label: 'Stay booking', title: 'Living Roof mobile flow', alt: 'Stay booking mobile concept with a futuristic house listing', wide: false },
  ],
};

export const selectedProjects = [
  {
    period: '2022–2023',
    title: 'Proactive',
    label: 'Field Service Platform',
    description:
      'Three products in one: a customer app, a technician app, and an operator dashboard. I built the visual language and the design system, mapped the service blueprints, and took every decision through stakeholder review. Funding ran out before launch.',
  },
  {
    period: '2024',
    title: 'Yandex News',
    label: 'Turkey MVP',
    description:
      'A mobile-first MVP for the Turkish market. I made several homepage card concepts so the team had something concrete to test, and worked next to the engineers while it was being built.',
  },
  {
    period: '2024–2025',
    title: 'Revvy',
    label: 'Communication & Reputation Platform',
    description:
      'I reworked the Templates experience — information architecture first, then the flows. After that I moved onto the AI assistant: chat, conversation design, and prompt templates.',
  },
];

export const achievements = [
  'Took a core gamification product from concept to production, working shoulder to shoulder with product managers on what it should become.',
  'Built and validated a new task card that confirmed a key hypothesis and moved engagement.',
  'Shipped a referral program that brought in new users.',
  'Made usability testing a habit rather than an event, and cleaned up how design reaches engineering.',
  'Audited the UI Kit and proposed a component handoff that cut handoff time in half.',
  'Wrote creative brief templates for the graphic designers — fewer rounds, better assets.',
  'Got the design team using AI properly: practical workflows, shared practices, internal talks.',
  'Wrote a Figma plugin with Claude Code that automates token handoff and component version control.',
];

export const additionalAchievements = [
  'Ran a Figma plugins workshop for 12 designers.',
  'Qualitative and quantitative research across logistics, orthodontics, and HR Tech.',
  'UX research for Doubletapp’s internal CRM, which turned into a backlog the team worked through for about six months.',
  'Portfolio concepts for Ronas IT — 70% of them landed Top of the Day on Dribbble.',
];

export const experiences = [
  {
    id: 'betboom',
    period: 'Apr 2025 — Present',
    location: 'Remote',
    company: 'BetBoom',
    role: 'Product Designer',
    summary:
      'BB PASS, the gamification system inside the core product. Experience, new mechanics, experiments, referral growth — plus the process work that makes the team less nervous about shipping.',
    achievements: [
      'Owned the core gamification product end to end and coordinated the other designers on it.',
      'Rebuilt the mechanics so the section could keep growing without collapsing under itself.',
      'Launched a referral program; tightened usability testing and handoff along the way.',
    ],
  },
  {
    id: 'agency-group',
    period: 'May 2022 — Mar 2025',
    location: 'Remote',
    company: 'Ronas IT / Doubletapp / Luch / Revvy',
    role: 'Product Designer',
    summary:
      'Agency and product work side by side — discovery through delivery for Yandex, Avito, Kokoc Group, and a run of B2B platforms.',
    achievements: [
      'Discovery through analytics, usability testing, heatmaps, and first-click tests.',
      'AI product experiences, templates, and conversation flows for customer communication tools.',
      'Presented to stakeholders and turned research into decisions engineers could build from.',
    ],
  },
  {
    id: 'ujin',
    period: 'Jan 2021 — Mar 2022',
    location: 'Remote',
    company: 'Ujin (Unicorn)',
    role: 'Product Designer',
    summary:
      'Smart home and smart building: white-label mobile apps, operator interfaces, and a new design system for the service product.',
    achievements: [
      'Pushed for and led the migration of Ujin Service to a new design system — 15% less dev effort on new features.',
      'Set up shared Figma libraries and plugins so white-label builds stopped starting from zero.',
      'Designed the interface for Ujin Key, a smart access device for remote property management.',
      'Onboarded and mentored two design interns.',
    ],
  },
  {
    id: 'helphub',
    period: 'May 2020 — Jan 2021',
    location: 'Remote',
    company: 'HelpHub',
    role: 'Product Designer',
    summary:
      'A mobile platform for volunteer organizations, plus the coordinator dashboard behind it. I was there for the whole arc: discovery, design, validation, launch.',
    achievements: [
      'Coordinated the designers on the project and shipped the marketing site on Tilda.',
      'Ran user interviews and MVP usability testing, which fed straight back into the roadmap.',
      'Worked with product managers on customer discovery and backlog priorities.',
      '30+ volunteer organizations piloted it and 200+ requests went through before the concept was closed after validation.',
    ],
  },
  {
    id: 'freelance',
    period: 'Sep 2019 — Mar 2020',
    location: 'Remote',
    company: 'Self-employed',
    role: 'Freelance Graphic & UX/UI Designer',
    summary:
      'Construction, automotive, and field service clients. Research through launch, usually as the only designer on the project.',
    achievements: [
      'Rebuilt Avtodop’s website on a no-code platform. Consultation requests went from about one a day to three or four, and drop-off halved.',
      'Redesigned an e-commerce site for a building materials supplier — better IA and navigation, twice the inbound inquiries.',
      'Built a print-ready product catalog on reusable templates, plus branding and marketing assets.',
    ],
  },
];

export const clients = [
  'BetBoom',
  'Yandex Turkey',
  'Avito',
  'Kokoc Group',
  'Revvy',
  'Ujin',
  'HelpHub',
  'IQuoto',
];
