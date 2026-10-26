/**
 * Agriculture Solutions — Option 2 (light editorial), route /agriculture-solutions (also /agriculture-solutions/option-2).
 * Mirrors the Figma frame "agriculture-solutions-v1 · option 2 (light editorial)".
 * Copy = v1 design copy. All numbers / names inside the app screens are SAMPLE DATA
 * for the mockups — replace with approved figures before launch.
 */
import {
  Sprout, Warehouse, Factory, Store, Smartphone, Monitor, Handshake,
  Globe, Eye, Route, Activity, PiggyBank, ShieldCheck, Boxes, TrendingUp,
  UserPlus, IdCard, MapPinned, Map, Package, Megaphone, Truck,
  Wallet, ScanBarcode, BadgeCheck, BarChart3, LayoutDashboard,
} from 'lucide-react';
import { asset } from './asset.js';
import { ROUTES } from './content.js';

const img = (p) => asset(`/images/${p}.webp`);

export const o2Meta = { title: 'Agriculture Management Solutions | SourceTrace DATAGREEN' };

export const o2Hero = {
  breadcrumb: [{ label: 'Home', href: '/' }, { label: 'Solutions', href: ROUTES.solutions }, { label: 'Agriculture Solutions' }],
  eyebrow: 'DATAGREEN · Agriculture Solutions',
  title: 'Agriculture Management Solutions, From Field To',
  mark: 'Retail.',
  accentFrom: 'Field',
  text: 'Tracing produce from remote fields to the retail shelf is hard. SourceTrace DATAGREEN is a single traceability solution that follows your goods from source to central processing, even in the most remote regions.',
  primary: { label: 'Request a Demo', href: ROUTES.demo },
  secondary: { label: 'Explore the modules', href: '#modules' },
  proof: [{ value: '2M+', label: 'farmers' }, { value: '37', label: 'countries' }, { value: '350+', label: 'crops' }],
  image: img('agri/hero-fields'),
  chip: 'Captured offline · syncs on connect',
  journeyKicker: 'From field to retail',
  journey: [
    { icon: Sprout, label: 'Farm', note: 'Enrol & map' },
    { icon: Warehouse, label: 'Collection', note: 'Procure & pay' },
    { icon: Factory, label: 'Processing', note: 'Transfer & stock' },
    { icon: Store, label: 'Market', note: 'Trace & certify' },
  ],
};

export const o2Challenge = {
  eyebrow: 'The challenge',
  title: "Every Shipment Starts In A Field You Can't See.",
  accentFrom: 'Field',
  text: 'Smallholder supply is spread across thousands of farms, agents and collection points, often with no connectivity. DATAGREEN captures every touchpoint at the source and connects it to your processing, certification and sales teams.',
  stack: [
    { icon: Smartphone, title: 'Mobile data-collection apps', text: 'Offline capture for field staff, agents and farmers.' },
    { icon: Monitor, title: 'Web analytics dashboard', text: 'Reports, controls and maps for managers.' },
    { icon: Handshake, title: 'Value-chain collaboration', text: 'Share verified data with buyers, certifiers and partners.' },
  ],
  image: img('agri/challenge-farmer'),
  imageAlt: 'Farmer in a wheat field photographing his crop with a smartphone',
  record: { kicker: 'Sample farmer record', id: 'FR-20481 · Smallholder', items: ['Profile & family group', 'Plot mapped · 2.4 ha', 'GPS & photo verified'] },
};

export const o2Bento = {
  eyebrow: 'Outcomes',
  title: 'What Changes When Your Supply Chain Runs On DATAGREEN.',
  accentFrom: 'Runs On',
  text: 'One shared record from farm to buyer gives every team the same picture, and removes the paperwork that slows it down.',
  items: [
    { icon: Globe, title: 'Global visibility', text: 'See operations and supply across every region in one view.', tone: 'dark' },
    { icon: Eye, title: 'Greater transparency', text: 'Every transaction carries who, where and when.' },
    { icon: Route, title: 'Source traceability', text: 'Follow each lot back to the farm and plot it came from.' },
    { icon: Activity, title: 'Near real-time BI', text: 'Field data reaches dashboards as soon as devices sync.' },
    { icon: PiggyBank, title: 'Lower operational costs', text: 'Replace paper registers and repeat field visits.' },
    { icon: ShieldCheck, title: 'Stronger internal controls', text: 'Audit trails and approvals at every step.', tone: 'lime' },
    { icon: Boxes, title: 'Better resource management', text: 'Put inputs, staff and transport where they are needed.' },
    { icon: TrendingUp, title: 'Capacity to grow', text: 'Add farmers, crops and regions on the same platform.' },
  ],
};

/* ---------- Modules showcase ----------
 * screen.visual: 'map' | 'bars' | 'timeline' | 'checklist'
 * phone.card:    'map' | 'qr'  | 'bars'     | 'checklist' | 'voice' | 'stock'
 * rows: [name, sub, status, tone]  tone: ok | warn | info
 * kpis: [label, value, suffix, delta]
 */
export const o2Nav = ['Dashboard', 'Farmers', 'Plots', 'Inputs', 'Procurement', 'Traceability', 'Certification', 'Reports'];

export const o2Modules = {
  eyebrow: 'DATAGREEN agri solution modules',
  title: 'Twelve Modules. One Record From Farm To Buyer.',
  accentFrom: 'One Record',
  text: 'Use the modules your operation needs. Every one writes to the same farmer, plot and lot record, so nothing is keyed in twice.',
  primary: { label: 'Request a Demo', href: ROUTES.demo },
  secondary: { label: 'See all modules', href: ROUTES.solutions },
  autoplayMs: 7000,
  mapImage: img('hero/hero-aerial'),
  plotImage: img('agri/hero-fields'),
  photoImages: [img('first-mile/farmers'), img('hero/hero-aerial')],
  phases: ['Onboard', 'Operate', 'Trade & Trace', 'Insight'],
  stages: ['Farm', 'Collection', 'Processing', 'Market'], // rail label for each phase
  scrollPerModule: 55, // % of viewport height scrolled per module while pinned
  items: [
    {
      id: 'farmer-enrollment', phase: 'Onboard', icon: UserPlus, pill: 'Farmer Enrollment', title: 'Farmer Enrollment',
      text: 'Capture smallholder profiles, family groups, farms and crops in one database, verified with GPS and photos.',
      kicker: 'Works offline, syncs when connected',
      features: [['One farmer database', 'Profiles, family groups, farms and crops in a single record.'], ['GPS & photo verified', 'Every registration is located and photographed at source.'], ['Built for the field', 'Local-language mobile app for agents in low-connectivity areas.']],
      screen: {
        nav: 'Farmers', title: 'Farmers', sub: 'Onboard · Farmer Enrollment', action: '+ Enrol farmer',
        kpis: [['Registered farmers', 12480, '', '+128 this week'], ['Plots mapped', 9214, '', '2.1 ha avg'], ['GPS & photo verified', 96, '%', '+3 pts']],
        visual: 'map', mapLabel: 'FR-20481 · 2.4 ha', mapLegend: 'Plots · Nakuru cluster',
        listTitle: 'Recent enrolments', rows: [['Amina Njeri', 'Nakuru', 'Verified', 'ok'], ['Ravi Kumar', 'Guntur', 'Verified', 'ok'], ['Sita Devi', 'Sirsa', 'Pending', 'warn'], ['John Otieno', 'Kisumu', 'Verified', 'ok'], ['Fatima Begum', 'Bogura', 'Verified', 'ok']],
      },
      phone: { title: 'New farmer', step: 'Step 2 of 4 · Plot & photos', progress: 2, fields: [['Full name', 'Amina Njeri'], ['Village', 'Nakuru, Kenya']], card: 'map', cardTitle: 'Plot boundary', cardMeta: '2.4 ha · GPS ±3 m', photos: true, cta: 'Save offline' },
      chips: [['Synced 2 min ago', '214 records from 6 devices'], ['+128 farmers this week', 'Nakuru cluster']],
    },
    {
      id: 'farmer-data', phase: 'Onboard', icon: IdCard, pill: 'Farmer Data', title: 'Farmer Data Management',
      text: 'Create and update farmer profiles on the web and see every farm location on a digital map.',
      kicker: 'One profile, always up to date',
      features: [['Edit on the web', 'Update profiles, family groups, farms and crops from the office.'], ['Full history', 'Every change is logged with who made it and when.'], ['Map view', 'Jump from any profile to its farms on the map.']],
      screen: {
        nav: 'Farmers', title: 'Farmer profile', sub: 'Onboard · Farmer Data Management', action: 'Edit profile',
        kpis: [['Farms', 3, '', '6.8 ha total'], ['Family members', 5, '', 'Household'], ['Profile complete', 92, '%', '2 fields left']],
        visual: 'map', mapLabel: 'Amina Njeri · 3 farms', mapLegend: 'Farm locations',
        listTitle: 'Profile activity', rows: [['Crop updated', 'Maize → Beans', 'Today', 'info'], ['Plot remapped', 'FR-20481', '2d ago', 'info'], ['Photo added', 'Farm gate', '5d ago', 'info'], ['Certified', 'Organic', '1w ago', 'ok']],
      },
      phone: { title: 'Farmer profile', step: 'Amina Njeri · FR-20481', progress: 4, fields: [['Family group', '5 members'], ['Main crop', 'Beans · 2.4 ha']], card: 'checklist', cardTitle: 'Profile checks', checks: ['ID verified', 'Farms mapped', 'Bank details'], cta: 'Update profile' },
      chips: [['Profile updated', 'Synced from the web'], ['3 farms · 6.8 ha', 'Nakuru, Kenya']],
    },
    {
      id: 'geo-plotting', phase: 'Onboard', icon: MapPinned, pill: 'Geo Plotting', title: 'Geo Plotting & Crop Monitoring',
      text: 'Log field visits with GPS, photos and notes, and follow staff activity and crop progress.',
      kicker: 'Every visit, on the map',
      features: [['Walk the boundary', 'Map plot polygons on the phone, accurate to a few metres.'], ['Visit notes', 'Attach photos and notes to the farmer profile on each visit.'], ['Crop stages', 'Track crop evolution and technical assistance activity.']],
      screen: {
        nav: 'Plots', title: 'Field visits', sub: 'Onboard · Geo Plotting & Crop Monitoring', action: '+ New visit',
        kpis: [['Visits this week', 342, '', '+18%'], ['Plots monitored', 1876, '', 'Kharif'], ['Avg. visit time', 24, ' min', '−3 min']],
        visual: 'map', mapLabel: 'Visit · Flowering stage', mapLegend: 'Visits · last 7 days',
        listTitle: 'Latest visits', rows: [['Plot FR-20481', 'Flowering', 'Healthy', 'ok'], ['Plot FR-19733', 'Vegetative', 'Pest risk', 'warn'], ['Plot FR-20102', 'Sowing', 'Healthy', 'ok'], ['Plot FR-18820', 'Harvest', 'Ready', 'info']],
      },
      phone: { title: 'Field visit', step: 'Plot FR-20481 · Visit 4', progress: 3, fields: [['Crop stage', 'Flowering'], ['Observation', 'Healthy canopy']], card: 'map', cardTitle: 'Boundary walked', cardMeta: '2.4 ha · 38 points', photos: true, cta: 'Log visit' },
      chips: [['GPS fix ±3 m', 'Boundary saved'], ['342 visits this week', 'Field team']],
    },
    {
      id: 'digital-mapping', phase: 'Onboard', icon: Map, pill: 'Digital Mapping', title: 'Digital Mapping',
      text: 'Visualise farm locations, crop areas, neighbouring farms, field staff and geo-referenced transactions.',
      kicker: 'A completely new view of the business',
      features: [['Farm & crop layers', 'Farm locations, crop areas and nearby farms in one map.'], ['Field staff tracking', 'See where your teams are working today.'], ['Geo-referenced data', 'Every transaction plotted where it happened.']],
      screen: {
        nav: 'Plots', title: 'Map', sub: 'Onboard · Digital Mapping', action: 'Layers',
        kpis: [['Farms on map', 11602, '', '4 regions'], ['Crop area', 27410, ' ha', '+6% YoY'], ['Staff in field', 48, '', 'Live']],
        visual: 'map', mapLabel: 'Cluster · 214 farms', mapLegend: 'Crop area · Maize',
        listTitle: 'Layers', rows: [['Farm locations', '11,602 points', 'On', 'ok'], ['Crop areas', 'Polygons', 'On', 'ok'], ['Field staff', '48 live', 'On', 'ok'], ['Transactions', 'Last 30 days', 'Off', 'info']],
      },
      phone: { title: 'Nearby farms', step: 'Within 2 km of you', progress: 4, fields: [['Cluster', 'Nakuru North'], ['Farms', '214 · 512 ha']], card: 'map', cardTitle: 'Your location', cardMeta: 'Live · 48 staff in field', cta: 'Open map' },
      chips: [['48 staff in field', 'Live positions'], ['27,410 ha mapped', 'All crops']],
    },
    {
      id: 'input-distribution', phase: 'Operate', icon: Package, pill: 'Input Distribution', title: 'Input Distribution',
      text: 'Track fertiliser, seed and pesticide from warehouse to farm. Monitor stock, record price and quantity, calculate production cost and manage farmer accounts.',
      kicker: 'Warehouse-to-farm, no leakages',
      features: [['Stock in remote warehouses', 'See what is on hand before it runs out.'], ['Recorded at source', 'Type, quantity and price logged at every handover.'], ['Farmer accounts', 'Inputs on credit settle against procurement.']],
      screen: {
        nav: 'Inputs', title: 'Input distribution', sub: 'Operate · Input Distribution', action: '+ Issue inputs',
        kpis: [['Issued this season', 8420, ' bags', '+12%'], ['Warehouses', 14, '', '2 low stock'], ['On credit', 61, '%', 'of farmers']],
        visual: 'bars', chartTitle: 'Stock by warehouse (%)', bars: [['Nakuru', 82], ['Eldoret', 64], ['Kisumu', 38], ['Nyeri', 91], ['Meru', 22]],
        listTitle: 'Recent issues', rows: [['Urea · 2 bags', 'Amina Njeri', 'Issued', 'ok'], ['Seed · 10 kg', 'John Otieno', 'Issued', 'ok'], ['DAP · 1 bag', 'Ravi Kumar', 'On credit', 'info'], ['Pesticide · 1 L', 'Sita Devi', 'Pending', 'warn']],
      },
      phone: { title: 'Issue inputs', step: 'Warehouse · Nakuru', progress: 3, fields: [['Farmer', 'Amina Njeri'], ['Item', 'Urea 50 kg × 2']], card: 'stock', cardTitle: 'Warehouse stock', cardValue: '164 bags', cardMeta: 'After this issue', cta: 'Confirm issue' },
      chips: [['Stock synced', '14 warehouses'], ['2 warehouses low', 'Reorder suggested']],
    },
    {
      id: 'advisory', phase: 'Operate', icon: Megaphone, pill: 'Advisory', title: 'Advisory Services',
      text: 'Send voice and text advisories to field staff, and let farmers share observations by voice message.',
      kicker: 'Voice and text, in local languages',
      features: [['Broadcast advisories', 'Send voice or text to groups of farmers and staff.'], ['Voice from the field', 'Farmers record observations the team can act on.'], ['Meeting reminders', 'Message details of meetings and field activities.']],
      screen: {
        nav: 'Farmers', title: 'Advisories', sub: 'Operate · Advisory Services', action: '+ New message',
        kpis: [['Messages sent', 5120, '', 'This month'], ['Voice notes in', 386, '', '+42 today'], ['Reached', 88, '%', 'of farmers']],
        visual: 'timeline', timelineTitle: 'Campaign · Pest alert', steps: [['Drafted', 'Agronomy team'], ['Sent', '2,140 farmers · SMS + voice'], ['Delivered', '1,882 · 88%'], ['Replies', '386 voice notes']], current: 3,
        listTitle: 'Voice notes', rows: [['Leaf spots seen', 'Sita Devi · 0:42', 'New', 'warn'], ['Rain delayed sowing', 'John Otieno · 0:31', 'Heard', 'info'], ['Input received', 'Amina Njeri · 0:18', 'Heard', 'info'], ['Ready to harvest', 'Ravi Kumar · 0:25', 'Actioned', 'ok']],
      },
      phone: { title: 'Advisory', step: 'Pest alert · Swahili', progress: 4, fields: [['From', 'Agronomy team'], ['Message', 'Spray before Friday rain']], card: 'voice', cardTitle: 'Reply by voice', cardMeta: 'Hold to record', cta: 'Send voice note' },
      chips: [['2,140 farmers reached', 'SMS + voice'], ['386 voice notes', 'From the field']],
    },
    {
      id: 'harvest', phase: 'Operate', icon: Truck, pill: 'Harvest & Transfer', title: 'Harvest Planning & Product Transfer',
      text: 'Estimate yield, capture pre- and post-harvest data, see remote stock and track transport and inventory.',
      kicker: 'From gathering point to factory gate',
      features: [['Yield estimates', 'Plan harvest by field, cluster and village.'], ['In-transit visibility', 'Vehicles, drivers and multiple products per trip.'], ['Fewer transport leakages', 'Accountability between collection and processing.']],
      screen: {
        nav: 'Procurement', title: 'Transfers', sub: 'Operate · Harvest Planning & Product Transfer', action: '+ New dispatch',
        kpis: [['Estimated yield', 1840, ' t', 'This season'], ['In transit', 12, ' trucks', '3 arriving today'], ['Shrinkage', 0.8, '%', '−1.4 pts']],
        visual: 'timeline', timelineTitle: 'Dispatch DX-0412', steps: [['Loaded', 'Nakuru collection centre'], ['In transit', 'KDA 412M · Peter W.'], ['Weighbridge', '18.4 t · 0.6% loss'], ['Received', 'Central processing']], current: 2,
        listTitle: 'Trucks today', rows: [['DX-0412', '18.4 t · Maize', 'In transit', 'info'], ['DX-0409', '17.9 t · Maize', 'Received', 'ok'], ['DX-0415', '12.2 t · Beans', 'Loading', 'warn'], ['DX-0402', '19.1 t · Maize', 'Received', 'ok']],
      },
      phone: { title: 'Dispatch', step: 'DX-0412 · Collection centre', progress: 3, fields: [['Vehicle', 'KDA 412M · Peter W.'], ['Load', 'Maize · 18.4 t']], card: 'checklist', cardTitle: 'Before dispatch', checks: ['Lots scanned', 'Weight recorded', 'Seal number'], cta: 'Dispatch truck' },
      chips: [['12 trucks in transit', 'Live tracking'], ['Shrinkage 0.8%', 'Down 1.4 pts']],
    },
    {
      id: 'procurement', phase: 'Trade & Trace', icon: Wallet, pill: 'Procurement & Payment', title: 'Procurement & Payment',
      text: 'Record purchases at source with quality, quantity and price. Shorten payment cycles and pay farmers by direct bank transfer through payment gateways.',
      kicker: 'Farmers paid faster, straight to the bank',
      features: [['Recorded at the scale', 'Quality, quantity and price captured at the source.'], ['Direct payments', 'Payment-gateway transfers to farmer bank accounts.'], ['Transparent process', 'Every purchase and payment traceable end to end.']],
      screen: {
        nav: 'Procurement', title: 'Procurement', sub: 'Trade & Trace · Procurement & Payment', action: '+ New purchase',
        kpis: [['Purchased today', 46.2, ' t', '312 farmers'], ['Paid same day', 94, '%', '+21 pts'], ['Avg. payment time', 1.2, ' days', 'was 9 days']],
        visual: 'bars', chartTitle: 'Purchases this week (t)', bars: [['Mon', 52], ['Tue', 68], ['Wed', 44], ['Thu', 80], ['Fri', 61]],
        listTitle: 'Payments', rows: [['Amina Njeri', '420 kg · Grade A', 'Paid', 'ok'], ['Ravi Kumar', '380 kg · Grade A', 'Paid', 'ok'], ['Sita Devi', '210 kg · Grade B', 'Processing', 'info'], ['John Otieno', '505 kg · Grade A', 'Paid', 'ok']],
      },
      phone: { title: 'New purchase', step: 'Collection centre · Nakuru', progress: 3, fields: [['Farmer', 'Amina Njeri'], ['Weight · Grade', '420 kg · Grade A']], card: 'stock', cardTitle: 'Amount payable', cardValue: 'KES 21,840', cardMeta: 'Direct bank transfer', cta: 'Pay farmer' },
      chips: [['Payment sent', 'Bank transfer · 1.2 days'], ['46.2 t purchased today', '312 farmers']],
    },
    {
      id: 'traceability', phase: 'Trade & Trace', icon: ScanBarcode, pill: 'e-Traceability', title: 'Agriculture Traceability (e-Traceability)',
      text: 'Farm-to-fork traceability with unique IDs, GS1 GLN data, SSCC labels and barcode or QR scanning.',
      kicker: 'Scan any lot back to the farm',
      features: [['Unique IDs at source', 'Every lot linked to farmer, plot and certification.'], ['GS1 GLN & SSCC', 'Standard labels your buyers can read.'], ['Barcode & QR', 'Scan at every handover from farm to retail.']],
      screen: {
        nav: 'Traceability', title: 'Lot trace', sub: 'Trade & Trace · e-Traceability', action: 'Scan lot',
        kpis: [['Lots traced', 4812, '', 'This season'], ['Farms per lot', 26, '', 'avg.'], ['Trace time', 3, ' sec', 'farm to shelf']],
        visual: 'timeline', timelineTitle: 'SSCC 000012345 6 · Lot L-2207', steps: [['Farm', 'FR-20481 · Amina Njeri'], ['Collection', 'Nakuru · 12 Mar'], ['Processing', 'Batch PB-118'], ['Export', 'Lot L-2207 · Rotterdam']], current: 4,
        listTitle: 'Linked records', rows: [['26 farmers', 'All GPS verified', 'Linked', 'ok'], ['Organic cert.', 'Valid to 2027', 'Valid', 'ok'], ['Quality test', 'Moisture 12%', 'Pass', 'ok'], ['EUDR check', 'Deforestation-free', 'Pass', 'ok']],
      },
      phone: { title: 'Scan lot', step: 'Processing · Batch PB-118', progress: 4, fields: [['Lot', 'L-2207'], ['Origin', '26 farms · Nakuru']], card: 'qr', cardTitle: 'QR scanned', cardMeta: 'SSCC 000012345 6', cta: 'View full trace' },
      chips: [['Traced in 3 sec', 'Farm to shelf'], ['26 farms in this lot', 'All verified']],
    },
    {
      id: 'certification', phase: 'Trade & Trace', icon: BadgeCheck, pill: 'Certification (ICS)', title: 'Certification (ICS)',
      text: 'Digitise your Internal Control System: inspections, farmer training and non-conformities for Fairtrade, GAP, GMP and Organic.',
      kicker: 'Audit-ready, every season',
      features: [['Ready templates', 'Fairtrade, GAP, GMP and Organic, others on request.'], ['Inspections in the field', 'No transcription, better data integrity.'], ['Non-conformities', 'Track every issue until it is closed.']],
      screen: {
        nav: 'Certification', title: 'Internal inspections', sub: 'Trade & Trace · Certification (ICS)', action: '+ Inspection',
        kpis: [['Farmers inspected', 2264, '', 'of 2,410'], ['Compliant', 97, '%', '+2 pts'], ['Open NCs', 18, '', '5 critical']],
        visual: 'checklist', checklistTitle: 'Organic inspection · FR-20481', checks: [['No prohibited inputs', true], ['Buffer zone maintained', true], ['Records up to date', true], ['Storage separated', false]],
        listTitle: 'Non-conformities', rows: [['Storage mixed', 'FR-19733', 'Open', 'warn'], ['Missing records', 'FR-20102', 'Closed', 'ok'], ['Buffer zone', 'FR-18820', 'Closed', 'ok'], ['Training due', 'Group G-14', 'Open', 'warn']],
      },
      phone: { title: 'Inspection', step: 'Organic · FR-20481', progress: 3, fields: [['Inspector', 'Mary K.'], ['Standard', 'EU Organic']], card: 'checklist', cardTitle: 'Checklist', checks: ['No prohibited inputs', 'Buffer zone', 'Records'], cta: 'Submit inspection' },
      chips: [['97% compliant', 'Organic · this season'], ['18 open NCs', '5 critical']],
    },
    {
      id: 'analytics', phase: 'Insight', icon: BarChart3, pill: 'Analytics', title: 'In-built Real-Time Analytics',
      text: 'Reports at farmer, group, regional or global level on farmers, transactions, transport, certification and crop stages.',
      kicker: 'From one farmer to the whole world',
      features: [['Drill down', 'Single farmer, group, region or global view.'], ['Every module', 'Farmers, inputs, procurement, transport, certification.'], ['Crop stages', 'Monitoring activities and crop stage reports.']],
      screen: {
        nav: 'Reports', title: 'Reports', sub: 'Insight · Real-Time Analytics', action: 'Export',
        kpis: [['Active farmers', 11920, '', '96% of base'], ['Procured', 1204, ' t', 'season to date'], ['Data freshness', 4, ' min', 'last sync']],
        visual: 'bars', chartTitle: 'Procurement by region (t)', bars: [['Rift Valley', 92], ['Western', 71], ['Central', 58], ['Nyanza', 47], ['Eastern', 33]],
        listTitle: 'Saved reports', rows: [['Farmer status', 'Group level', 'Daily', 'info'], ['Input transactions', 'Regional', 'Weekly', 'info'], ['Certification', 'Global', 'Monthly', 'info'], ['Crop stages', 'Plot level', 'Live', 'ok']],
      },
      phone: { title: 'My region', step: 'Rift Valley · today', progress: 4, fields: [['Farmers active', '3,412'], ['Procured', '312 t']], card: 'bars', cardTitle: 'This week', cardMeta: 'Procurement (t)', cta: 'Open report' },
      chips: [['Synced 4 min ago', 'All regions'], ['1,204 t procured', 'Season to date']],
    },
    {
      id: 'executive-dashboard', phase: 'Insight', icon: LayoutDashboard, pill: 'Executive Dashboard', title: 'Executive Dashboard',
      text: 'Key indicators in charts, harvest progress against previous seasons, device and field-staff management, and over-the-air app updates.',
      kicker: 'The whole operation on one screen',
      features: [['Harvest vs last season', 'Progress against previous harvests and targets.'], ['Devices & staff', 'Enable, disable and manage from one web app.'], ['Over-the-air updates', 'Publish app updates to the field instantly.']],
      screen: {
        nav: 'Dashboard', title: 'Executive dashboard', sub: 'Insight · Executive Dashboard', action: 'Share',
        kpis: [['Harvest progress', 68, '%', 'vs 54% last year'], ['Devices online', 212, '', 'of 230'], ['App version', 4.2, '', 'rolled out 98%']],
        visual: 'bars', chartTitle: 'Harvest progress by week (%)', bars: [['Week 1', 30], ['Week 2', 48], ['Week 3', 66], ['Week 4', 79], ['Week 5', 88]],
        listTitle: 'Field devices', rows: [['Tab-0213', 'Peter W. · v4.2', 'Online', 'ok'], ['Tab-0188', 'Mary K. · v4.2', 'Online', 'ok'], ['Tab-0141', 'Joseph M. · v4.1', 'Update', 'warn'], ['Tab-0097', 'Grace A. · v4.2', 'Offline', 'info']],
      },
      phone: { title: 'App update', step: 'Version 4.2 · over the air', progress: 4, fields: [['Devices', '212 online'], ['Rollout', '98% complete']], card: 'checklist', cardTitle: 'Release notes', checks: ['Offline maps', 'New ICS forms', 'Faster sync'], cta: 'Publish update' },
      chips: [['68% harvested', 'vs 54% last year'], ['v4.2 rolled out', '98% of devices']],
    },
  ],
};

export const o2Stats = [
  { value: 2, suffix: 'M+', label: 'Farmer livelihoods improved' },
  { value: 37, suffix: '', label: 'Countries across 4 continents' },
  { value: 3, suffix: 'M', label: 'Hectares of land managed' },
  { value: 350, suffix: '+', label: 'Crops handled' },
];

export const o2Resources = {
  eyebrow: 'Resources',
  title: 'See DATAGREEN At Work.',
  accentFrom: 'DATAGREEN',
  items: [
    { type: 'Case study', title: 'Fruitmaster Agro Fresh Pvt. Ltd.', text: 'How an Indian fresh-produce exporter runs its sourcing on SourceTrace.', cta: 'Read case study', href: `${ROUTES.caseStudies}/fruitmaster`, image: img('first-mile/farmers') },
    { type: 'Media', title: '“This will be the decade of Indian AgriTech”', text: 'SourceTrace in PC Quest on where Indian agritech is heading.', cta: 'Read article', href: '/media', image: img('hero/hero-aerial') },
    { type: 'Whitepaper', title: 'SourceTrace in 2022', text: 'Our whitepaper on digital traceability for agri-food value chains.', cta: 'Download whitepaper', href: '/white-paper', image: img('platform/farm-data') },
  ],
};

export const o2Cta = {
  title: 'Bring Your Whole Value Chain Into View.',
  text: 'See DATAGREEN set up for your crops, regions and certification programmes.',
  primary: { label: 'Request a Demo', href: ROUTES.demo },
  secondary: { label: 'Contact us', href: ROUTES.contact },
};
