/**
 * All homepage copy, extracted verbatim from the Figma file
 * (frame "sourcetrace-mockup-v6"). Edit text here, not in components.
 *
 * Items marked `placeholder: true` were lorem ipsum or missing in the
 * Figma source and need real copy before launch.
 */

import { asset } from './asset.js';

const img = (p) => asset(`/images/${p}.webp`);

/* Links: destinations were not supplied in the design. Every link points at
   a route-style path so it can be wired to React Router or real URLs later. */
export const ROUTES = {
  demo: '/request-a-demo',
  eudr: '/eudr-readiness',
  contact: '/contact',
  solutions: '/solutions',
  traceability: '/solutions/farm-traceability',
  carbon: '/solutions/carbon-trace',
  farmData: '/solutions/farm-management',
  locations: '/locations',
  about: '/about',
  caseStudies: '/case-studies',
  agriculture: '/agriculture-solutions',
};

export const navigation = [
  { label: 'Home', href: '/' },
  {
    label: 'Solutions',
    href: '/solutions',
    children: [
      { label: 'Agriculture Solutions', href: '/agriculture-solutions' },
      { label: 'Farm Traceability', href: '/solutions/farm-traceability' },
      { label: 'Carbon Trace', href: '/solutions/carbon-trace' },
      { label: 'Farm Management', href: '/solutions/farm-management' },
    ],
  },
  { label: 'Verticals', href: '/verticals' },
  { label: 'Regulations & Certifications', href: '/regulations-certifications' },
  {
    label: 'Blog',
    href: '/blog',
    // Dropdown items reuse the "Resources" list from the Figma footer.
    children: [
      { label: 'Blog', href: '/blog' },
      { label: 'Media', href: '/media' },
      { label: 'White Paper', href: '/white-paper' },
      { label: 'Tomorrow Talks', href: '/tomorrow-talks' },
      { label: 'Webinars', href: '/webinars' },
    ],
  },
  {
    label: 'About us',
    href: '/about',
    // Dropdown items reuse the "Company" list from the Figma footer.
    children: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  { label: 'Global Partners', href: '/global-partners' },
];

export const hero = {
  titleLines: [
    ['Connect', 'Every', 'Step', 'Of', 'Your'],
    ['Agri-Food', 'Value', 'Chain.'],
  ],
  underlineFromWord: 'Value', // green hand-drawn underline sits under "Value Chain."
  text:
    'SourceTrace’s DataGreen platform registers farmers, maps plots and traces every purchase from smallholder to export. Prove compliance with EUDR and buyer standards, and run a more efficient supply chain.',
  primary: { label: 'Book a demo', href: ROUTES.demo },
  secondary: { label: 'Check your EUDR readiness', href: ROUTES.eudr },
  video: asset('/videos/hero.mp4'),
};

const LOREM_SHORT =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's";
const LOREM_LONG =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets.";

/* Bento stats. `count` drives the GSAP counter; prefix/suffix keep the exact
   Figma formatting (e.g. "2 Million +"). */
export const stats = [
  {
    id: 'farmers', variant: 'mint', height: 'xl',
    count: 2, suffix: ' Million +', label: 'farmers livelihoods improved',
    text: LOREM_LONG, placeholder: true,
    cta: { label: 'Explore More', href: ROUTES.about },
  },
  {
    id: 'countries', variant: 'photo-dark', height: 'lg', image: img('stats/countries'),
    count: 37, suffix: ' Countries & Counting', label: 'covered across 4 continents',
    text: LOREM_SHORT + ' standard dummy text ever since 1966.', placeholder: true,
  },
  { id: 'social', variant: 'social', height: 'md', image: img('stats/social'), title: 'Connect With Us On Social Media' },
  {
    id: 'hectares', variant: 'photo-fade', height: 'lg', image: img('stats/hectares'),
    count: 3, suffix: ' Million', label: 'Hectares of land managed',
    text: LOREM_SHORT, placeholder: true,
  },
  {
    id: 'crops', variant: 'lime', height: 'xl',
    count: 350, suffix: ' +', label: 'crops handled',
    text: LOREM_LONG, placeholder: true,
    cta: { label: 'Explore More', href: ROUTES.solutions },
  },
];

/* Social URLs were not in the design — replace with the real profiles. */
export const social = [
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/' },
  { id: 'x', label: 'x.com', href: 'https://x.com/' },
  { id: 'youtube', label: 'Youtube', href: 'https://www.youtube.com/' },
];

export const trustedBrands = {
  title: 'Trusted by Global Industry Leaders',
  logos: [
    ['ifc', 'International Finance Corporation'],
    ['cargill', 'Cargill'],
    ['chetna-organic', 'Chetna Organic'],
    ['grain-marketing-board', 'Grain Marketing Board'],
    ['crs', 'Catholic Relief Services'],
    ['haryana-horticulture', 'Haryana Horticulture Department'],
    ['sfach', 'Small Farmers Agri-business Consortium Haryana'],
    ['goldtree', 'Goldtree'],
    ['laudes-foundation', 'Laudes Foundation'],
    ['nei', 'Natural Extracts Industries'],
    ['cabi', 'CABI'],
    ['worldfish', 'WorldFish'],
    ['wilmar', 'Wilmar'],
    ['brac', 'BRAC'],
    ['tnpl', 'TNPL'],
  ].map(([id, name]) => ({ id, name, src: img(`logos/${id}`) })),
};

export const firstMile = {
  title: 'Built For The First Mile, Where Supply Chain Data Begins.',
  text:
    'Most supply chain software starts at the warehouse. SourceTrace starts with the farmer. Field teams register farmers, map plots and record every transaction where it happens, even offline. That data flows through procurement, processing and export, giving you one verified record from farm to buyer.',
  image: img('first-mile/farmers'),
  imageAlt: 'Two farmers handing over a crate of fresh tomatoes',
  readMore: { label: 'Read More', href: ROUTES.about },
  demo: { label: 'Request a Demo', href: ROUTES.demo },
  benefits: [
    {
      icon: img('icons/smallholder'),
      title: 'Smallholder-ready.',
      text: 'Offline mobile apps in French, Spanish, Swahili, Malagasy, Hindi, Telugu, Tamil, etc., and built for low-connectivity regions.',
    },
    {
      icon: img('icons/compliance'),
      title: 'Compliance-ready',
      text: 'Plot mapping, deforestation checks and audit trails for EUDR, organic and fair-trade standards.',
    },
    {
      icon: img('icons/sectors'),
      title: 'Proven across sectors',
      text: 'Trusted by global agribusinesses, NGOs, developmental and finance institutions.',
    },
  ],
};

export const platform = {
  title: 'One Platform For Traceability, Compliance And Farm Operations.',
  // Cards stack on scroll (sticky deck). Carbon + farm-data images were cropped
  // from a low-res mockup; swap in full-resolution exports when available.
  cards: [{
    title: 'Farm Produce Traceability',
    href: ROUTES.traceability,
    text: "SourceTrace's food traceability system provides unparalleled visibility and transparency to your value chain. Our agri trace software has touchpoints across every stage – from farm to retail.",
    image: img('platform/tablet'),
    imageAlt: 'Tablet showing a farm irrigation and soil moisture dashboard in a field',
    kicker: 'One platform to do it all',
    features: [
      { title: 'Customizable for every commodity', text: 'Can handle any level of complexity in the value chain.' },
      { title: 'Monitor every stage', text: 'Procurement, storage, logistics to retail – track every detail with ease.' },
      { title: 'Automated quality testing', text: 'Computer imaging and spectrometer based testing on trade and safety parameters.' },
      { title: 'Asset light model', text: 'Do it all with a mobile app and dashboard. Easy training and fast deployment' },
      { title: 'In depth farm level insights', text: 'Farmer profiling, GIS, Certification info and more.' },
    ],
  }, {
    title: 'Carbon Trace',
    href: ROUTES.carbon,
    text: 'Data is the biggest challenge when it comes to connecting farmers with carbon markets. SourceTrace brings experience of nearly a decade in building solutions to meet the data gap in agriculture to carbon farming.',
    image: img('platform/carbon'),
    imageAlt: 'Terraced green crop rows on a hillside with floating CO2 bubbles',
    kicker: 'Bring all stakeholders on one platform',
    features: [
      { title: 'Transparent and auditable program management', text: 'Farmer contracts, payments, credit generation - all verifiable' },
      { title: 'Capture verifiable data from the ground at every stage', text: 'Combination of ground and satellite data to leave no gaps' },
      { title: 'Bring all stakeholders on one platform', text: 'Farmers, inspectors, traders, funders and more' },
      { title: 'Easy impact assessment to build scalable programs', text: 'Helps build scale by meeting concerns and requirements' },
    ],
  }, {
    title: 'Farm Data Management Software',
    href: ROUTES.farmData,
    text: 'SourceTrace’s farm management software enables large agribusinesses to have complete control over their farming processes and visibility across different stakeholders.',
    image: img('platform/farm-data'),
    imageAlt: 'Farm management app on a phone, laptop and tablet',
    kicker: 'Unleashing the potential of Farm Management Apps',
    features: [
      { title: 'Intuitive interface', text: 'So easy that your staff will be uploading data within the week.' },
      { title: 'Works everywhere', text: 'Offline mode makes sure that you stay connected.' },
      { title: 'Extensive modules', text: 'Farmer profiling to training to certification, it’s all here.' },
      { title: 'Customizable for unique needs', text: 'Got an ask that no solution can meet? We can.' },
    ],
  }],
};

export const solutions = {
  title: "SourceTrace's Software Solutions",
  cta: { label: 'Explore More', href: ROUTES.solutions },
  items: [
    {
      id: 'monitoring', size: 'sm', image: img('solutions/npk-widget'),
      title: 'Real-Time Monitoring',
      text: 'Carbon farming is all about accurate, prove-able data. Our Digital Mapping System works with farmer, soil, crop, supply chain and ecosystem levels',
    },
    {
      id: 'fieldminder', size: 'lg', image: img('solutions/fieldminder'),
      title: 'Introducing The Various Features Of The FieldMinder Applications',
      text: 'Discover our powerful features to boost your farmland',
    },
    { id: 'analysis', size: 'sm', image: img('solutions/npk-widget'), title: 'Analysis & Health Prediction', text: 'Early detection of soil and crop conditions using AI' },
    { id: 'sensors', size: 'sm', image: img('solutions/npk-widget'), title: 'Sensor Device Integration', text: 'Connect with IoT devices to collect live data' },
    { id: 'dataviz', size: 'sm', image: img('solutions/npk-widget'), title: 'Data Visualization', text: 'Dashboard that displays interactive graphs and maps' },
  ],
};

/* Only the Corporate HQ details exist in Figma; every other office repeats
   them. Other offices use clearly marked placeholders. */
const PLACEHOLDER_CONTACT = {
  phone: '+00 000 000 0000',
  email: 'info@sourcetrace.com',
  address: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  placeholder: true,
};

/* Map data: `iso` is the ISO 3166-1 numeric id used by world-atlas, `flag` the
   alpha-2 code for country-flag-icons, `coords` [lon, lat] for the map pin.
   Every location has its own colour: offices in green shades, partners in a
   separate non-green palette, so a country never reads the same in both views. */
export const locations = {
  title: 'Our Business Location',
  offices: [
    {
      id: 'usa', name: 'USA', note: 'Corporate Headquarters', iso: '840', flag: 'US', coords: [-71.1, 42.37], color: '#1e6b34',
      href: `${ROUTES.locations}/usa`,
      phone: '+1-469-450-6904', email: 'info@sourcetrace.com',
      address: '245 First St. Suite 1800, Cambridge, Massachusetts 02142, USA',
    },
    { id: 'india', name: 'India', note: 'Global Development Centre', iso: '356', flag: 'IN', coords: [76.96, 11.0], color: '#37c737', href: `${ROUTES.locations}/india`, ...PLACEHOLDER_CONTACT },
    { id: 'bangladesh', name: 'Bangladesh', note: 'Regional Office', iso: '050', flag: 'BD', coords: [90.3, 23.7], color: '#98b81d', href: `${ROUTES.locations}/bangladesh`, ...PLACEHOLDER_CONTACT },
    { id: 'kenya', name: 'Kenya', note: 'Regional Office', iso: '404', flag: 'KE', coords: [37.9, 0.2], color: '#2fa58a', href: `${ROUTES.locations}/kenya`, ...PLACEHOLDER_CONTACT },
  ],
  partners: [
    { id: 'uae', name: 'UAE', iso: '784', flag: 'AE', coords: [54.4, 24.2], color: '#f2994a' },
    { id: 'bangladesh-p', name: 'Bangladesh', iso: '050', flag: 'BD', coords: [90.3, 23.7], color: '#e5577a' },
    { id: 'canada', name: 'Canada', iso: '124', flag: 'CA', coords: [-106, 56], color: '#d64545' },
    { id: 'usa-p', name: 'USA', iso: '840', flag: 'US', coords: [-98, 39], color: '#4c7ce0' },
    { id: 'netherlands', name: 'The Netherlands', iso: '528', flag: 'NL', coords: [5.3, 52.1], color: '#e8b923' },
    { id: 'thailand', name: 'Thailand', iso: '764', flag: 'TH', coords: [101, 15], color: '#8e5cd9' },
    { id: 'ethiopia', name: 'Ethiopia', iso: '231', flag: 'ET', coords: [39.5, 9], color: '#25a9c4' },
    { id: 'nepal', name: 'Nepal', iso: '524', flag: 'NP', coords: [84, 28.3], color: '#c2410c' },
    { id: 'uganda', name: 'Uganda', iso: '800', flag: 'UG', coords: [32.3, 1.4], color: '#b5468a' },
    { id: 'zimbabwe', name: 'Zimbabwe', iso: '716', flag: 'ZW', coords: [29.8, -19], color: '#a47148' },
  ],
};

export const experience = {
  title: '13 Years Of Digitising The First Mile.',
  text:
    "SourceTrace's software solutions have been deployed across 37 countries and 4 continents already. We are on a mission to make agriculture and food systems more sustainable. Get in touch and we will extend our expertise and commitment to you.",
  points: ['Farming More Sustainable', 'Supply Chains More Efficient', 'Food Systems More Traceable'],
  cta: { label: 'Explore More', href: ROUTES.about },
  video: {
    thumbnail: img('experience/video-thumb'),
    // Integration point: paste the YouTube video ID to enable playback.
    youtubeId: '',
    title: 'SourceTrace platform overview',
  },
};

export const certifications = {
  title: 'Certifications & Accreditations',
  logos: [
    ['globalgap', 'GLOBALG.A.P.'],
    ['rainforest-alliance', 'Rainforest Alliance'],
    ['fairtrade', 'Fairtrade International'],
    ['eudr', 'EUDR – EU Deforestation Regulation'],
    ['eu-organic', 'EU Organic'],
    ['us-organic', 'USDA Organic'],
    ['india-organic', 'India Organic'],
  ].map(([id, name]) => ({ id, name, src: img(`certs/${id}`) })),
};

export const caseStudies = {
  title: 'Case Studies',
  items: [
    {
      id: 'sfach',
      title: 'Small Farmers Agri-Business Consortium – Haryana',
      text: 'SourceTrace is collaborating with Small Farmers Agri-business consortium (SFACH) and Haryana Horticulture Department, deploying its digital solutions to support the horticulture farmers of Haryana.',
      logo: img('cases/sfach'), logoAlt: 'SFACH – enabling farmers',
      href: `${ROUTES.caseStudies}/sfach-haryana`,
    },
    {
      id: 'cargill',
      title: 'Cargill Cocoa And Chocolate – Cote d’Ivoire, Cameroon,',
      text: 'Cargill Cocoa and Chocolate supports hundreds of thousands of farmers across five countries in Africa. SourceTrace solution was used to digitize 240,000 cocoa farmers to grow cocoa certified under UTZ, Rainforest Alliance and Fair Trade.',
      logo: img('cases/cargill'), logoAlt: 'Cargill',
      href: `${ROUTES.caseStudies}/cargill-cocoa`,
    },
  ],
};

export const testimonials = {
  title: 'What Our Customers Are Talking About',
  items: [
    {
      quote: 'The SourceTrace platform enables us to digitally collect and link data from cocoa farmers, farms and the communities allowing us to formulate plans for coaching farmers based on their needs.',
      name: 'Suzanne Uittenbogaard',
      role: 'Sustainable Value Chain Manager, Cargill Cocoa & Chocolate, Netherlands',
      logo: img('logos/cargill'), logoAlt: 'Cargill',
    },
    {
      quote: 'SourceTrace solutions played an instrumental role in real time monitoring of JIBIKA project to develop Village Development Entrepreneurs in agriculture sub sectors such as vegetables, goat rearing, beef fattening and duck rearing and establishing the end-to-end value chain.',
      name: 'ASM Sofrul Islam',
      role: 'Programme Coordinator, BRAC, Bangladesh',
      logo: img('testimonials/brac'), logoAlt: 'BRAC',
    },
    {
      quote: 'It Doesn’t Matter Whether We Are Dealing With A Single Orchard Or Hundreds Of Them, Data Is Required At Every Step – To Make Policy Decisions, To Integrate With Banks, To Provide Feedback And Explanations To The Farmers, Or To Share With Government Agencies. We Need Numbers, Which We Did Not Have Till Date',
      name: 'Uzair Javeed',
      role: 'Chief Operating Officer, Fruitmaster Agro Fresh Pvt.Ltd., India',
      logo: img('testimonials/fruitmaster'), logoAlt: 'Fruitmaster',
    },
    {
      // The 4th Figma card duplicates Uzair Javeed; replaced with a placeholder.
      quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      name: 'Lorem Ipsum',
      role: 'Placeholder Title, Company Name, Country',
      logo: img('logos/sfach'), logoAlt: 'Placeholder logo',
      placeholder: true,
    },
  ],
};

export const footer = {
  about: [
    'SourceTrace is a SaaS (Software As A Service) company that focuses on sustainable agriculture and empowerment of farmers.',
    "SourceTrace's advanced technology platform DATAGREEN provides comprehensive solutions to manage all aspects of the agricultural value chain.",
  ],
  contact: { label: 'Contact Us', href: ROUTES.contact },
  columns: [
    {
      title: 'Solutions',
      links: ['Agriculture Solutions', 'Agricultural Value Chain', 'Carbon Farming', 'Compliance & Regulations (EUDR)', 'Farm Traceability', 'Farm Management', 'Farming System', 'Food Safety Management', 'Monitoring & Evaluation', 'Supply Chain Management'],
    },
    { title: 'Resources', links: ['Media', 'Case Studies', 'White Paper', 'Tomorrow Talks', 'Webinars'] },
    { title: 'Company', links: ['Home', 'About', 'Careers', 'Contact', 'Request a demo', 'Blog', 'Privacy policy', 'Terms of use'] },
  ].map((c) => ({
    ...c,
    links: c.links.map((label) => ({
      label,
      href: label === 'Home' ? '/' : '/' + label.toLowerCase().replace(/[()&]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-'),
    })),
  })),
  copyright: '© 2026 sourcetrace.com, All rights reserved',
};
