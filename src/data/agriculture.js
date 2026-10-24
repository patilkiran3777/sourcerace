/**
 * Agriculture Solutions inner page (/agriculture-solutions).
 *
 * COPY RULE: every visible string below is copied verbatim from
 * https://sourcetrace.com/agriculture-solutions/ (captured 23 Oct 2026),
 * including its original wording, casing, punctuation and typos.
 * Do not edit copy here without updating the live page first.
 * Only icons, images and layout are design additions.
 */
import {
  Sprout, Warehouse, Factory, Store,
  Globe, Eye, Route, Activity, PiggyBank, ShieldCheck, Boxes, TrendingUp,
  UserPlus, MapPinned, Package, ScanBarcode, Wallet, Truck, BadgeCheck,
  Megaphone, BarChart3, IdCard, LayoutDashboard, Map,
} from 'lucide-react';
import { asset } from './asset.js';
import { ROUTES } from './content.js';

const img = (p) => asset(`/images/${p}.webp`);

export const agriMeta = {
  // live <title>
  title: 'Agriculture Management System, Remote Sensing Agriculture Application - SourceTrace Systems',
};

export const agriHero = {
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'Solutions', href: ROUTES.solutions },
    { label: 'Agriculture Management Solutions' },
  ],
  titleLines: [['Agriculture', 'Management'], ['Solutions']],
  markFrom: 'Solutions',
  text:
    'From faraway fields to procurement centers, from warehouses to retail stores, tracing produce is a challenge for all stakeholders in an agricultural value chain. A comprehensive agriculture software will be able to meet all your requirements from aggregating farmers to monitoring supply chain to providing traceability to end consumers.',
  primary: { label: 'Request a Demo', href: ROUTES.demo },
  image: img('agri/hero-fields'), // 123RF #176654890 (licensed)
  // Stage names lifted word-for-word from the paragraph above.
  journey: [
    { label: 'faraway fields', icon: Sprout },
    { label: 'procurement centers', icon: Warehouse },
    { label: 'warehouses', icon: Factory },
    { label: 'retail stores', icon: Store },
  ],
};

export const agriIntro = {
  text:
    "The SourceTrace DATAGREEN solution for agriculture and food companies is a one stop sgriculture traceability software that tracks the flow of goods from the source to the central processing facilities even in the world's most remote areas. The agriculture software solution stack includes mobile apps for data collection, web dashboard for powerful and insightful analytic reports and endless opportunities to collaborate with your value chain partners.",
  cta: { label: 'Request a Demo', href: ROUTES.demo },
  image: img('agri/challenge-farmer'), // 123RF #171375406 (licensed)
  imageAlt: 'Agriculture Traceability Software - SourceTrace Systems',
};

export const agriBenefits = {
  title: 'Benefits',
  items: [
    { icon: Globe, title: 'Global visibility of operations and supply chain' },
    { icon: Eye, title: 'Greater transparency' },
    { icon: Route, title: 'Ensure source traceability' },
    { icon: Activity, title: 'Near real-time business intelligence' },
    { icon: PiggyBank, title: 'Reduced operational costs' },
    { icon: ShieldCheck, title: 'Increased internal controls' },
    { icon: Boxes, title: 'Better resource management' },
    { icon: TrendingUp, title: 'Increased capacity to grow' },
  ],
};

/* `short` = the live overview list; `title` = the live heading of each module block. */
export const agriModules = {
  title: 'DATAGREEN (DG) Agri Solution modules',
  text: 'The SourceTrace agriculture software is designed to meet specific requirements of different crop value chains and processes. The core modules of Agri solution are:',
  cta: { label: 'Request a Demo', href: ROUTES.demo },
  items: [
    {
      id: 'farmer-enrollment', short: 'Farmer Enrollment', icon: UserPlus,
      title: 'Farmer Enrollment',
      text: 'The Farmer Enrollment module enables your business to capture information directly from smallholder farmers and other providers on the field.',
      points: [
        'Provides a unified and up-to-date farmer database',
        'GPS technology and photos trace the source of goods',
        'Captures the profile of the smallholder farmer, family group, farms and crops',
      ],
    },
    {
      id: 'geo-plotting', short: 'Geo plotting', icon: MapPinned,
      title: 'Geo plotting of crop area and crop monitoring',
      text: 'Crop Monitoring module is the perfect way to record field visits allowing to capture photos and notes on each visit.',
      points: [
        'Attach visit notes to the farmer profile',
        'Track technical assistance staff activities',
        'Record GPS and photos on each visit',
        'Keep notes on crop evolution',
      ],
    },
    {
      id: 'input-distribution', short: 'Input Distribution', icon: Package,
      title: 'Input Distribution',
      text: 'Input Distribution module enables the efficient distribution of inputs such as Fertilizers, Seeds, Pesticides and other inputs.',
      points: [
        'Warehouse-to-Farm traceability of inputs',
        'Transactions recorded at the source & transmitted in near real time',
        'Monitor stocks in remote warehouses, improve processes and prevent leakages',
        'Type, Quantity and Price of the inputs are recorded',
        'Calculate the production cost',
        'Farmer account management',
      ],
    },
    {
      id: 'traceability', short: 'Traceability', icon: ScanBarcode,
      title: 'Agriculture Traceability Software',
      points: [
        'Farm-to-Fork traceability of produce',
        'At the time of data generation a unique ID is generated which identifies the source (Farmer) of the produce and links it with all the Farmer Centric data, like certifications, farming practices, and other information like GPS co-ordinates.',
        'GLN can be used to extract the details assigned by GS1',
        'labels/SSCC generated with identification of the farmer, farm ,crop etc up to the farm level',
        'Agriculture Traceability Software using bar code/QR Code scanning along with other methods followed',
        'Upstream traceability is unique for each Farmer Organization and SourceTrace DATAGREEN (DG) platform has the flexibility to adapt to each scenario.',
      ],
    },
    {
      id: 'procurement', short: 'Procurement', icon: Wallet,
      title: 'Procurement and Payment',
      text: 'Procurement and Payment module enables the efficient purchase of agricultural produce.',
      points: [
        'Transactions recorded at the source & transmitted in near real time',
        'Quality, quantity and price are recorded',
        'Shorter payment cycles to smallholder farmers',
        'Calculate the production cost',
        'Farmer account management',
        'Payment gateway integration for money transfer directly into the farmer/producer bank account',
        'Transparency in the procurement and payment process',
      ],
    },
    {
      id: 'harvest-planning', short: 'Harvest Planning', icon: Truck,
      title: 'Harvest Planning & Product Transfer',
      points: [
        'Yield estimation of field, cluster, village and planning harvest strategy',
        'Pre-harvest information collection',
        'Post-harvest information like actual yield, grade, quantity dispatched etc.',
        'Visibility of remote stocks and in-transit produce',
        'Accountability between remote gathering points and central processing facilities',
        'Increased control over transport leakages',
        'Transport vehicle tracking including driver information',
        'Multiple product tracking in same vehicle',
        'Inventory tracking',
      ],
    },
    {
      id: 'certification', short: 'Certification (ICS)', icon: BadgeCheck,
      title: 'Certification (ICS)',
      points: [
        'Certification module enables the digitization of Internal Control System (ICS) to support Internal inspection, smallholder farmers training and certification process.',
        'Ready to use certification templates like Fairtrade, GAP, GMP, Organic certifications and other standards can be added upon request',
        'Collect data directly from the field saving transcription time and increasing data integrity and quality',
        'Geo referenced data and pictures of the farm for source traceability',
        'Keep track of non-conformities',
      ],
    },
    {
      id: 'advisory-services', short: 'Advisory services', icon: Megaphone,
      title: 'Advisory services',
      text: 'Voice and Text Based services',
      points: [
        'Disseminate all information about management to the field staff',
        'Messaging details about meeting and other information related to the field activities',
        'Farmer can share his observation using voice messaging, which the farm management can listen and act accordingly.',
      ],
    },
    {
      id: 'real-time-analytics', short: 'Real time Analytics', icon: BarChart3,
      title: 'In-built real time Analytics',
      text: 'Access to insightful business reports on a single farmer level or at a group, regional or global level of:',
      points: [
        'Farmers profile data and account status',
        'Input distribution transactions',
        'Procurement transactions>',
        'Produce and Inputs transport',
        'Certification Status',
        'Crop monitoring activities',
        'Crop Stage monitoring',
      ],
    },
    {
      id: 'farmer-data-management', short: 'Farmer Data Management', icon: IdCard,
      title: 'Farmer Data Management',
      text: 'Access to the Farmer Enrollment data and update the information using the Web application.',
      points: [
        'Create and update farmer profiles in the database',
        'Keep up-to-date the information about family group, farms and crops',
        'Visualize farms location on a digital map',
      ],
    },
    {
      id: 'executive-dashboard', short: 'Executive Dashboard', icon: LayoutDashboard,
      title: 'Executive Dashboard',
      text: 'The Executive Dashboard present real time information of key business indicators in graphical charts.',
      points: [
        'Analyze the current harvest progress and compare it against previous harvest information and expected volumes',
        'Create, enable and disable devices and manage Field Staffs using a centralized Web application',
        'Manage the DATAGREEN (DG) application from a central location and publish updates over-the-air',
        'Customize analytic reports based on requirements',
      ],
    },
    {
      id: 'digital-mapping', short: 'Digital Mapping', icon: Map,
      title: 'Digital Mapping',
      points: [
        'Farm location',
        'Crop area',
        'Nearby farms',
        'Field staff tracking',
        'Traceability',
        'Visualize geo referenced transactions and data to get a completely new view of the business.',
      ],
    },
  ],
};

/* Live sidebar + resource blocks, verbatim. */
export const agriResources = {
  items: [
    { type: 'Media', title: 'This will be the decade of Indian AgriTech', cta: '+ READ MORE', href: '/media', image: img('hero/hero-aerial') },
    { type: 'Whitepaper', title: 'SourceTrace in 2022', cta: '+ DOWNLOAD NOW', href: '/white-paper', image: img('platform/farm-data') },
    { type: 'Case Study', title: 'Here’s the story of how SourceTrace’s solutions, deployed by Fruitmaster Agro Fresh Pvt.Ltd.', cta: '+ READ MORE', href: `${ROUTES.caseStudies}/fruitmaster`, image: img('first-mile/farmers') },
    { type: 'Food and Beverage Technology Review', title: 'Today, at SourceTrace we’re happy to share our moment of pride and fulfillment, having made it as the cover story in the Food and Beverage Tech Review.', cta: 'Read full article', href: '/media', image: img('platform/tablet') },
  ],
};

/* Live whitepaper pop-up, used as the closing banner. */
export const agriCta = {
  text: "Download our new whitepaper 'Traceability in 2020: Global Scenario with a focus on India'",
  primary: { label: 'Download Now', href: '/white-paper' },
  image: img('hero/hero-aerial'),
};
