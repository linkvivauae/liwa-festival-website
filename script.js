/* =========================================================================
   LIWA INTERNATIONAL FESTIVAL — SHARED APPLICATION SCRIPT
   Loaded on every page. Sections:
   1. Sample data (events, tickets, hotels, dining, forts, i18n dictionary)
   2. Core utilities (formatters, storage helpers)
   3. Header / nav behavior (scroll glass, mobile menu, active link, lang)
   4. Scroll-reveal animation engine
   5. Countdown timer (index.html)
   6. Stat counter animation
   7. Programming page (search/filter/render)
   8. Event detail page (query-string render)
   9. Itinerary builder (localStorage, cross-page side panel)
   10. Carousels + lightbox gallery + tabs (Experience Liwa)
   11. Ticketing flow (5-step state machine, sessionStorage)
   12. Feedback + newsletter forms (client-side validation only)
   13. Page init dispatcher
   ========================================================================= */

/* ---------- 1. SAMPLE DATA ---------- */
// NOTE for future integration: replace these static arrays with fetch() calls
// to a real CMS/booking API. IDs are kept stable so localStorage/sessionStorage
// references (itinerary, ticket pre-selection) continue to resolve.

const FESTIVAL_START = '2026-12-11T16:00:00+04:00';
const FESTIVAL_END = '2027-01-03T23:59:00+04:00';

const EVENTS = [
  {
    id: 'liwa-village-opening',
    title: 'Liwa Village Grand Opening',
    category: 'live-performances',
    tags: ['Headline', 'Family-friendly'],
    date: '2026-12-11',
    time: '16:00 – 23:30',
    location: 'Liwa Village Main Stage, Al Dhafra',
    price: 0,
    free: true,
    status: 'upcoming',
    image: 'assets/village-orbit-night-hd.jpg',
    ticketTypeId: 'day-pass',
    summary: 'The festival\'s opening night — live music, a lantern parade, and the ceremonial lighting of the Liwa Village gateway.',
    description: 'Join thousands of visitors as Liwa Village opens its gates for the 2026/27 season. The evening features a headline live-music set, a traditional Bedouin welcome ceremony, a lantern-lit procession through the market lanes, and a fireworks-style drone show over the dunes. Arrive early to enjoy the food court before the main stage program begins at 7pm.',
    gallery: [
      'assets/village-aerial-night.jpg',
      'assets/wanasa-fireworks.jpg',
      'assets/wanasa-fireworks.jpg'
    ]
  },
  {
    id: 'dune-motocross-cup',
    title: 'Liwa Dune Motocross Cup',
    category: 'motorsport',
    tags: ['Motorsport', 'Ticketed'],
    date: '2026-12-14',
    time: '10:00 – 17:00',
    location: 'Liwa Motorsport Arena',
    price: 95,
    free: false,
    status: 'limited',
    image: 'assets/dirt-bike-night.jpg',
    ticketTypeId: 'day-pass',
    summary: 'Regional riders tear through the dunes in the festival\'s flagship motorsport fixture.',
    description: 'Watch top regional motocross riders compete across qualifying heats and a final showdown on a purpose-built dune circuit. Trackside grandstand seating, a pit-lane walkthrough, and a kids\' mini-bike zone run throughout the day. Limited grandstand capacity — early booking recommended.',
    gallery: [
      'assets/utv-airborne-night.jpg',
      'assets/utv-airborne-night.jpg'
    ]
  },
  {
    id: 'traditional-falconry-show',
    title: 'Falconry & Traditional Sports Show',
    category: 'traditional-sports',
    tags: ['Heritage', 'Family-friendly'],
    date: '2026-12-15',
    time: '15:00 – 18:00',
    location: 'Heritage Village Grounds',
    price: 0,
    free: true,
    status: 'upcoming',
    image: 'assets/falconer-release.jpg',
    ticketTypeId: 'day-pass',
    summary: 'Falconry demonstrations, saluki racing, and a traditional tug-of-war tournament.',
    description: 'A showcase of Emirati heritage sport: master falconers demonstrate flight and hunting techniques, followed by saluki (Arabian hound) racing exhibitions and an audience-participation tug-of-war tournament. Interpreters provide English/Arabic commentary throughout.',
    gallery: [
      'assets/falcon-low-flight.jpg',
      'assets/falcon-low-flight.jpg'
    ]
  },
  {
    id: 'family-day-carnival',
    title: 'Family Day Carnival',
    category: 'family',
    tags: ['Family-friendly', 'Rides'],
    date: '2026-12-19',
    time: '10:00 – 22:00',
    location: 'Liwa Village Family Zone',
    price: 40,
    free: false,
    status: 'upcoming',
    image: 'assets/carnival-carousel.jpg',
    ticketTypeId: 'day-pass',
    summary: 'A full day of rides, face painting, workshops, and desert-themed play areas for all ages.',
    description: 'The festival\'s biggest family-focused day: a full amusement-ride midway, craft workshops for children, a petting corner, and a dedicated toddler play dune. Face painting and a scavenger hunt run throughout the day, culminating in an early-evening family concert.',
    gallery: [
      'assets/family-run.jpg',
      'assets/family-run.jpg'
    ]
  },
  {
    id: 'culinary-nights-souq',
    title: 'Culinary Nights Souq',
    category: 'culinary',
    tags: ['Dining', 'Evening'],
    date: '2026-12-20',
    time: '17:00 – 00:00',
    location: 'Liwa Village Food Souq',
    price: 0,
    free: true,
    status: 'upcoming',
    image: 'assets/night-market.jpg',
    ticketTypeId: 'day-pass',
    summary: 'A curated night market of Emirati and regional street food, live cooking demos, and dessert stalls.',
    description: 'Wander a lantern-lit night souq featuring over 30 food vendors spanning Emirati, Levantine, and South Asian cuisine. Rotating live cooking demonstrations from regional chefs run every hour, alongside a dedicated dessert and coffee corner inspired by the Home page\'s "Where to Eat" categories.',
    gallery: [
      'assets/burro-blanco-dine.jpg',
      'assets/burro-blanco-dine.jpg'
    ]
  },
  {
    id: 'sandboarding-championship',
    title: 'Sandboarding Open Championship',
    category: 'motorsport',
    tags: ['Adventure', 'Ticketed'],
    date: '2026-12-22',
    time: '09:00 – 13:00',
    location: 'Tal Moreeb',
    price: 60,
    free: false,
    status: 'soldout',
    image: 'assets/dune-track-day.jpg',
    ticketTypeId: 'weekend-pass',
    summary: 'Competitive sandboarding down the legendary Tal Moreeb, open to amateur and pro categories.',
    description: 'Riders descend the towering Tal Moreeb in timed sandboarding runs across amateur and professional categories. Spectator viewing areas line the base of the dune with large screens for slow-motion replays. This event has sold out — join the waitlist via the feedback page.',
    gallery: [
      'assets/dune-vista-flag.jpg'
    ]
  },
  {
    id: 'desert-art-souq',
    title: 'Desert Art & Culture Souq',
    category: 'live-performances',
    tags: ['Art and Culture', 'Shopping'],
    date: '2026-12-26',
    time: '12:00 – 22:00',
    location: 'Heritage Village Grounds',
    price: 0,
    free: true,
    status: 'upcoming',
    image: 'assets/craft-workshop.jpg',
    ticketTypeId: 'day-pass',
    summary: 'Local artisans, calligraphy workshops, and a live mural painting installation.',
    description: 'A market of regional artisans selling handwoven textiles, pottery, and Bedouin silverwork, paired with drop-in Arabic calligraphy workshops and a large-scale live mural painted over the course of the festival by a rotating cast of local artists.',
    gallery: [
      'assets/ayala-stick-dance.jpg',
      'assets/ayala-stick-dance.jpg'
    ]
  },
  {
    id: 'nye-headline-concert',
    title: 'New Year\'s Eve Headline Concert',
    category: 'live-performances',
    tags: ['Headline', 'Ticketed'],
    date: '2026-12-31',
    time: '20:00 – 01:00',
    location: 'Liwa Village Main Stage',
    price: 250,
    free: false,
    status: 'limited',
    image: 'assets/fireworks-liwa-dune.jpg',
    ticketTypeId: 'vip-package',
    summary: 'Ring in the new year under the stars with a headline artist performance and countdown fireworks.',
    description: 'The festival\'s marquee evening: a top-billed regional artist performance, a midnight countdown synced with a fireworks display over the dunes, and an after-party set continuing into the early hours. VIP Package holders receive access to an elevated viewing deck and dedicated bar service.',
    gallery: [
      'assets/wanasa-fireworks.jpg',
      'assets/wanasa-fireworks.jpg'
    ]
  },
  {
    id: 'kids-workshop-dunebuggy',
    title: 'Junior Dune Buggy Workshop',
    category: 'family',
    tags: ['Workshops', 'Family-friendly'],
    date: '2027-01-02',
    time: '11:00 – 13:00',
    location: 'Liwa Village Family Zone',
    price: 30,
    free: false,
    status: 'upcoming',
    image: 'assets/dunes-challenge-activation.jpg',
    ticketTypeId: 'day-pass',
    summary: 'Hands-on mini dune-buggy building and racing workshop for ages 6–12.',
    description: 'A supervised, hands-on workshop where children assemble battery-powered mini dune buggies from kits, then race them on a scaled-down closing-day track. All materials and safety gear provided; capacity limited to 40 children per session.',
    gallery: [
      'assets/family-run.jpg'
    ]
  },
  {
    id: 'closing-night-fireworks',
    title: 'Closing Night Fireworks Finale',
    category: 'live-performances',
    tags: ['Headline', 'Family-friendly'],
    date: '2027-01-03',
    time: '18:00 – 22:00',
    location: 'Liwa Village Main Stage',
    price: 0,
    free: true,
    status: 'upcoming',
    image: 'assets/wanasa-fireworks.jpg',
    ticketTypeId: 'day-pass',
    summary: 'The 2026/27 season closes with a full-scale fireworks and light show over Tal Moreeb.',
    description: 'The festival\'s final evening brings the season to a close with a farewell market, closing performances from resident artists, and a 20-minute fireworks and light-projection finale over Tal Moreeb.',
    gallery: [
      'assets/fireworks-liwa-dune.jpg'
    ]
  },
  {
    id: 'traditional-cooking-class',
    title: 'Emirati Cooking Class',
    category: 'culinary',
    tags: ['Workshops', 'Dining'],
    date: '2026-12-24',
    time: '16:00 – 18:00',
    location: 'Culinary Nights Souq Kitchen Tent',
    price: 75,
    free: false,
    status: 'upcoming',
    image: 'assets/burro-blanco-dine.jpg',
    ticketTypeId: 'day-pass',
    summary: 'A guided, hands-on class in traditional Emirati dishes led by a local chef.',
    description: 'Learn to prepare a traditional Emirati dish — from majboos to luqaimat — in this small-group, hands-on class led by a Al Dhafra-based chef. Includes all ingredients, a recipe booklet, and a tasting of the finished dishes.',
    gallery: [
      'assets/night-market.jpg'
    ]
  },
  {
    id: 'camel-race-exhibition',
    title: 'Camel Race Exhibition',
    category: 'traditional-sports',
    tags: ['Heritage', 'Motorsport'],
    date: '2026-12-17',
    time: '08:00 – 11:00',
    location: 'Al Dhafra Race Track',
    price: 0,
    free: true,
    status: 'upcoming',
    image: 'assets/camel-caravan.jpg',
    ticketTypeId: 'day-pass',
    summary: 'An early-morning exhibition race showcasing the region\'s camel-racing heritage.',
    description: 'A morning exhibition of traditional camel racing on the Al Dhafra track, run in partnership with local heritage clubs. Grandstand access is first-come, first-served; arrive before 7:30am for the best viewing spots.',
    gallery: [
      'assets/dune-vista-flag.jpg'
    ]
  }
];

const TICKET_TYPES = [
  { id: 'day-pass', name: 'Day Pass', price: 95, unit: 'per person / per day', description: 'Single-day entry to Liwa Village, all included stages, the Food Souq, and general event access.', features: ['1-day entry', 'Access to all free stages', 'Food Souq access'] },
  { id: 'weekend-pass', name: 'Weekend Pass', price: 250, unit: 'per person / 3 days', description: 'Entry across any three consecutive festival days — ideal for a long weekend visit.', features: ['3 consecutive days', 'Priority lane entry', 'Includes 1 workshop voucher'] },
  { id: 'season-pass', name: 'Season Pass', price: 650, unit: 'per person / full festival', description: 'Unlimited entry for the full 24-day festival run, including headline evenings.', features: ['Full 24-day access', 'Headline concert access', 'Reserved parking'] },
  { id: 'vip-package', name: 'VIP Package', price: 1200, unit: 'per person / per day', description: 'Elevated viewing deck, dedicated bar service, valet parking, and a welcome hospitality pack.', features: ['Elevated VIP deck', 'Dedicated bar & lounge', 'Valet parking'] },
  { id: 'parking-pass', name: 'Parking Pass', price: 40, unit: 'per vehicle / per day', description: 'Reserved on-site vehicle parking close to the main entrance gate.', features: ['Reserved parking bay', 'Shuttle to main gate'] }
];

const ADDONS = [
  { id: 'camping-pass', name: 'Camping Pass', price: 180, description: 'One night of on-site desert camping with shared amenities and security patrol.' },
  { id: 'guided-tour', name: 'Guided Desert Tour', price: 220, description: 'A 3-hour guided dune-bashing and heritage-fort tour with a licensed local guide.' },
  { id: 'merch-bundle', name: 'Festival Merchandise Bundle', price: 130, description: 'Liwa International Festival tote bag, cap, and enamel pin set.' }
];

const HOTELS = [
  { name: 'Qasr Al Sarab Desert Resort', area: 'Empty Quarter, Al Dhafra', rating: 5, priceFrom: 1450, image: 'assets/resort-pool-real.png', description: 'An Arabian-fort-inspired resort set deep in the dunes, with a spa, falconry experiences, and desert-view suites.' },
  { name: 'Anantara Desert Islands Resort', area: 'Sir Bani Yas Island', rating: 5, priceFrom: 1250, image: 'assets/village-aerial-day.jpg', description: 'A nature-reserve island resort combining wildlife safaris with beachfront and desert-facing rooms.' },
  { name: 'Liwa Hotel', area: 'Liwa Oasis', rating: 4, priceFrom: 650, image: 'assets/village-aerial-night.jpg', description: 'A relaxed, family-run hotel overlooking the Liwa Oasis palm groves, closest to the festival gates.' },
  { name: 'Tilal Liwa Hotel', area: 'Liwa Crescent', rating: 4, priceFrom: 590, image: 'assets/dune-vista-flag.jpg', description: 'Modern rooms with panoramic dune views along the Liwa Crescent road.' },
  { name: 'Balloon Land Camp', area: 'Tal Moreeb vicinity', rating: 3, priceFrom: 280, image: 'assets/balloon-dusk.jpg', description: 'Budget-friendly furnished desert tents a short drive from the main festival grounds.' },
  { name: 'Danat Al Dhafra Resort', area: 'Al Dhafra region', rating: 4, priceFrom: 720, image: 'assets/desert-tent-camp-night.png', description: 'A heritage-styled property with a large pool deck and easy access to the Liwa road.' },
  { name: 'Mezaira Palace Hotel', area: 'Mezaira\' Town', rating: 3, priceFrom: 340, image: 'assets/desert-tent-camp-night.png', description: 'A practical town-centre base with easy access to local shops and fuel stations.' },
  { name: 'Al Dhafra Beach Resort', area: 'Coastal Al Dhafra', rating: 4, priceFrom: 810, image: 'assets/man-in-desert.png', description: 'A coastal alternative roughly 90 minutes from the festival grounds, popular for multi-day itineraries.' }
];

const DINING = [
  { name: 'Bait Al Dhafra', category: 'Local favourites', rating: 5, image: 'assets/burro-blanco-dine.jpg', description: 'Slow-cooked machboos and grilled meats served in a traditional majlis-style tent.' },
  { name: 'Dune Roasters', category: 'Coffee', rating: 4, image: 'assets/night-market.jpg', description: 'Specialty Arabic coffee, karak, and cardamom-spiced cold brew.' },
  { name: 'Luqaimat Lane', category: 'Dessert', rating: 5, image: 'assets/ayala-stick-dance.jpg', description: 'Fresh luqaimat, kunafa, and date-based sweets made to order.' },
  { name: 'Oasis Grill & Fine Dining', category: 'Fine dining', rating: 5, image: 'assets/burro-blanco-dine.jpg', description: 'An elevated tasting menu blending Emirati flavours with modern technique, under-dune seating.' },
  { name: 'Souq Street Kitchen', category: 'Local favourites', rating: 4, image: 'assets/night-market.jpg', description: 'A rotating lineup of regional street-food stalls from shawarma to shish tawook.' },
  { name: 'Sands Espresso Bar', category: 'Coffee', rating: 4, image: 'assets/craft-workshop.jpg', description: 'Third-wave espresso and iced desert lattes with shaded dune-view seating.' }
];

const FORTS = [
  { name: 'Qasr Al Muwaiji', description: 'A restored fort central to the story of Sheikh Zayed\'s early life, featuring an interpretive museum wing.', image: 'assets/five-forts-1.jpg' },
  { name: 'Mezaira\' Fort', description: 'A mudbrick watchtower overlooking the Mezaira\' oasis, historically used to guard caravan routes.', image: 'assets/five-forts-2.jpg' },
  { name: 'Hadana Fort', description: 'One of the best-preserved Al Dhafra forts, with corner towers offering sweeping dune views.', image: 'assets/five-forts-1.jpg' },
  { name: 'Qasr Al Sarab Watchtower', description: 'A restored lookout point marking the historic edge of the Empty Quarter trade routes.', image: 'assets/dune-vista-flag.jpg' },
  { name: 'Muzayrah Watchtower', description: 'A defensive tower built to protect the oasis palm groves from raiding parties.', image: 'assets/five-forts-2.jpg' },
  { name: 'Dhafra Border Fort', description: 'A frontier fortification marking the historic boundary between Abu Dhabi and the interior.', image: 'assets/gate-4x4.jpg' },
  { name: 'Liwa Crescent Tower', description: 'A hilltop tower along the Liwa Crescent offering some of the region\'s best sunset views.', image: 'assets/liwa-sign-night.jpg' },
  { name: 'Al Marfa Coastal Fort', description: 'A coastal garrison once used to monitor pearling-fleet movements along the Gulf.', image: 'assets/man-and-liwa-sign.jpg' },
  { name: 'Al Dhafra Heritage Watchtower', description: 'A reconstructed watchtower now forming the centrepiece of the Heritage Village grounds.', image: 'assets/helipad-real.jpg' }
];

const ITINERARY_THEMES = {
  family: { title: 'Family Day', description: 'Rides, workshops, and shaded play areas designed for visitors of every age.', events: ['family-day-carnival', 'kids-workshop-dunebuggy', 'closing-night-fireworks'] },
  culture: { title: 'Culture', description: 'Heritage sport, historic forts, and traditional craft experiences.', events: ['traditional-falconry-show', 'desert-art-souq', 'camel-race-exhibition'] },
  adventure: { title: 'Adventure', description: 'Motorsport, dune sports, and high-energy outdoor activity.', events: ['dune-motocross-cup', 'sandboarding-championship'] },
  culinary: { title: 'Culinary', description: 'Night markets, chef-led classes, and the region\'s best dining outlets.', events: ['culinary-nights-souq', 'traditional-cooking-class'] }
};

/* Interactive festival map points — the nine confirmed Liwa Trail assets,
   two confirmed entertainment zones (spotted on-site: Wanasa, Little
   Wonders), and generic visitor facilities. Positions are percentage
   coordinates over the aerial map image and are illustrative only — a
   production build would replace this whole layer with surveyed GPS pins
   on Leaflet or the Google Maps JS API. */
const MAP_POINTS = [
  { id: 'tal-moreeb', name: 'Tal Moreeb', type: 'trail', top: 72, left: 16, description: 'Stop 1 · The Spectacle Peak. Motocross, drift, and sandboarding at the dune\'s base.', link: 'motorsport.html', linkLabel: 'Visit Motorsport Hub' },
  { id: 'liwa-walk', name: 'Liwa Walk', type: 'trail', top: 50, left: 34, description: 'Stop 2 · The Connective Tissue. The walking route linking every Trail stop.', link: 'the-trail.html', linkLabel: 'View on The Trail' },
  { id: 'accommodation-site', name: 'Accommodation Site', type: 'trail', top: 20, left: 76, description: 'Stop 3 · The Base Camp. Desert resorts and on-site camping.', link: 'stay-and-dine.html', linkLabel: 'View Accommodation' },
  { id: 'liwa-sign', name: 'Liwa Sign', type: 'trail', top: 82, left: 58, description: 'Stop 4 · The Signature Stop. The festival\'s photo landmark.', link: 'the-trail.html#liwa-sign', linkLabel: 'View on The Trail' },
  { id: 'helipad', name: 'Helipad', type: 'trail', top: 14, left: 22, description: 'Stop 5 · The Elevated View. Premium aerial experience — register interest.', link: 'the-trail.html#helipad', linkLabel: 'View on The Trail' },
  { id: 'five-forts', name: 'Five Forts', type: 'trail', top: 34, left: 82, description: 'Stop 6 · The Cultural Anchor. Restored watchtowers and guided tours.', link: 'experience-liwa.html', linkLabel: 'Plan a Fort Visit' },
  { id: 'cultural-activation', name: 'Cultural Activation Space', type: 'trail', top: 62, left: 72, description: 'Stop 7 · The Living Stop. Craft and heritage workshops.', link: 'programming.html?category=family', linkLabel: 'Book a Workshop' },
  { id: 'festival-programming', name: 'Main Stage', type: 'trail', top: 46, left: 50, description: 'Stop 8 · The Time-Based Layer. Live programming runs here daily.', link: 'programming.html', linkLabel: 'View Programming' },
  { id: 'liwa-village', name: 'Liwa Village', type: 'trail', top: 52, left: 47, description: 'Stop 9 · The Town Square. The festival\'s ticketed hub — market, food souq, main gate.', link: 'tickets.html', linkLabel: 'Book Tickets' },
  { id: 'wanasa', name: 'Wanasa Zone', type: 'zone', top: 38, left: 60, description: 'وناسة — the entertainment gate. Live performances and night-souq stalls.', link: 'programming.html?category=live-performances', linkLabel: 'View Live Performances' },
  { id: 'little-wonders', name: 'Little Wonders', type: 'zone', top: 58, left: 40, description: 'بلاد العجائب — the family and kids\' zone.', link: 'programming.html?category=family', linkLabel: 'View Family Events' },
  { id: '4x4-zone', name: '4x4 Zone', type: 'zone', top: 78, left: 24, description: 'The branded gate into the dune-bashing and off-road vehicle area.', link: 'motorsport.html', linkLabel: 'View Motorsport Hub' },
  { id: 'parking-main', name: 'Main Parking', type: 'facility', top: 92, left: 50, description: 'General parking, signposted from the main gate. Reserved bays available with a Parking Pass.' },
  { id: 'first-aid', name: 'First Aid Point', type: 'facility', top: 42, left: 38, description: 'Staffed first-aid point, open throughout festival hours.' },
  { id: 'prayer-room', name: 'Prayer Room', type: 'facility', top: 30, left: 45, description: 'Shaded prayer room, separate facilities for men and women.' },
  { id: 'main-entrance', name: 'Main Entrance', type: 'facility', top: 97, left: 48, description: 'Primary visitor gate and ticket scan point.' }
];

const CATEGORY_LABELS = {
  'live-performances': 'Live Performances',
  'motorsport': 'Motorsport',
  'traditional-sports': 'Traditional Sports',
  'family': 'Family',
  'culinary': 'Culinary'
};

/* i18n dictionary — sample strings only, structured so more can be added
   without touching markup: elements carry data-i18n="key" and the
   translation is looked up here at runtime. */
const I18N = {
  en: {
    'nav.home': 'Home', 'nav.programming': 'Programming', 'nav.plan': 'Plan Your Visit',
    'nav.experience': 'The Trail', 'nav.stay': 'Stay & Dine', 'nav.tickets': 'Tickets',
    'nav.feedback': 'Feedback', 'nav.contact': 'Contact',
    'cta.bookTickets': 'Book Tickets', 'cta.exploreProgramming': 'Explore Programming',
    'hero.title': 'The Desert\'s Grand Stage', 'hero.sub': 'Nine Trail stops. One journey across Al Dhafra — motorsport, heritage, and desert nights.',
    'footer.rights': 'All rights reserved.',
    'itinerary.title': 'My Itinerary'
  },
  ar: {
    'nav.home': 'الرئيسية', 'nav.programming': 'البرنامج', 'nav.plan': 'خطط لزيارتك',
    'nav.experience': 'المسار', 'nav.stay': 'الإقامة والمطاعم', 'nav.tickets': 'التذاكر',
    'nav.feedback': 'ملاحظاتكم', 'nav.contact': 'اتصل بنا',
    'cta.bookTickets': 'احجز التذاكر', 'cta.exploreProgramming': 'استكشف البرنامج',
    'hero.title': 'مسرح الصحراء الكبير', 'hero.sub': 'تسع محطات، رحلة واحدة عبر الظفرة — رياضة السيارات والتراث وليالي الصحراء.',
    'footer.rights': 'جميع الحقوق محفوظة.',
    'itinerary.title': 'خطتي الشخصية'
  }
};

/* ---------- 2. CORE UTILITIES ---------- */
const AED = (n) => `AED ${Number(n).toLocaleString('en-US')}`;
const qs = (sel, ctx) => (ctx || document).querySelector(sel);
const qsa = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
const getParam = (name) => new URLSearchParams(window.location.search).get(name);
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function getStorageJSON(store, key, fallback) {
  try {
    const raw = store.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}
function setStorageJSON(store, key, value) {
  store.setItem(key, JSON.stringify(value));
}

/* ---------- 3. HEADER / NAV ---------- */
function initHeader() {
  const header = qs('.site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mark active nav link based on current file name
  const current = window.location.pathname.split('/').pop() || 'index.html';
  qsa('.main-nav a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === current) a.setAttribute('aria-current', 'page');
  });

  // Mobile nav toggle
  const toggle = qs('.nav-toggle');
  const nav = qs('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('mobile-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
      nav.classList.remove('mobile-open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  initLangSwitch();
}

/* Language switch: toggles dir/lang on <html> and swaps data-i18n strings.
   Persists choice in localStorage so it holds across page navigation. */
function initLangSwitch() {
  const buttons = qsa('.lang-switch button');
  if (!buttons.length) return;

  const apply = (lang) => {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    const dict = I18N[lang] || I18N.en;
    qsa('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (dict[key]) el.textContent = dict[key];
    });
    localStorage.setItem('liwa-lang', lang);
  };

  buttons.forEach((btn) => btn.addEventListener('click', () => apply(btn.dataset.lang)));
  apply(localStorage.getItem('liwa-lang') || 'en');
}

/* ---------- 4. SCROLL-REVEAL ---------- */
function initScrollReveal() {
  const targets = qsa('.reveal');
  if (!targets.length) return;
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    targets.forEach((t) => t.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Reveal on intersection, or if a fast scroll/anchor jump skipped the
      // element entirely and it now sits above the viewport — content should
      // never stay permanently hidden just because it was scrolled past.
      if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
  targets.forEach((t) => io.observe(t));
}

/* Parallax hero: subtle translate on scroll, skipped under reduced-motion */
function initParallaxHero() {
  const media = qs('.hero-media img, .hero-media video');
  if (!media || prefersReducedMotion()) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      media.style.transform = `translateY(${y * 0.25}px) scale(1.05)`;
    }
  }, { passive: true });
}

/* ---------- 5. COUNTDOWN TIMER ---------- */
function initCountdown() {
  const el = qs('#countdown');
  if (!el) return;
  const start = new Date(FESTIVAL_START);
  const end = new Date(FESTIVAL_END);

  const render = () => {
    const now = new Date();
    if (now < start) {
      const diff = start - now;
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff / 3600000) % 24);
      const m = Math.floor((diff / 60000) % 60);
      const s = Math.floor((diff / 1000) % 60);
      el.innerHTML = `
        <div class="countdown-unit"><strong>${d}</strong><span>Days</span></div>
        <div class="countdown-unit"><strong>${String(h).padStart(2, '0')}</strong><span>Hours</span></div>
        <div class="countdown-unit"><strong>${String(m).padStart(2, '0')}</strong><span>Minutes</span></div>
        <div class="countdown-unit"><strong>${String(s).padStart(2, '0')}</strong><span>Seconds</span></div>`;
    } else if (now >= start && now <= end) {
      el.innerHTML = `<div class="countdown-banner">The festival is happening now — 24 days of events through 3 Jan 2027.</div>`;
    } else {
      el.innerHTML = `<div class="countdown-banner">This edition has closed. The 2026–27 Trail is already being built for next season.</div>`;
    }
  };
  render();
  setInterval(render, 1000);
}

/* ---------- 6. STAT COUNTER ANIMATION ---------- */
function initStatCounters() {
  const stats = qsa('.stat-number[data-target]');
  if (!stats.length) return;
  const animate = (el) => {
    const target = Number(el.dataset.target);
    if (prefersReducedMotion()) { el.textContent = target.toLocaleString(); return; }
    const duration = 1400;
    const startTime = performance.now();
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.4 });
    stats.forEach((s) => io.observe(s));
  } else {
    stats.forEach(animate);
  }
}

/* ---------- 7. PROGRAMMING PAGE ---------- */
function formatDateLabel(iso) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function eventCardHTML(ev) {
  const badge = ev.free
    ? '<span class="badge badge--free">Free</span>'
    : ev.status === 'soldout' ? '<span class="badge badge--soldout">Sold Out</span>'
    : ev.status === 'limited' ? '<span class="badge badge--limited">Limited</span>' : '';
  return `
    <article class="card reveal" data-category="${ev.category}" data-date="${ev.date}">
      <div class="card-media">
        <div class="card-badges">${badge}</div>
        <img src="${ev.image}" alt="${ev.title} — ${CATEGORY_LABELS[ev.category]} event at Liwa International Festival" loading="lazy">
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span>${formatDateLabel(ev.date)}</span>&middot;<span>${ev.time}</span>
        </div>
        <h3>${ev.title}</h3>
        <p>${ev.summary}</p>
        <div class="card-meta">${ev.tags.map((t) => `<span class="chip">${t}</span>`).join('')}</div>
        <div class="card-footer">
          <a class="btn btn--outline btn--sm" href="event-detail.html?id=${ev.id}">View Details</a>
          <a class="btn btn--primary btn--sm" href="tickets.html?ticket=${ev.ticketTypeId}&event=${ev.id}">${ev.free ? 'Reserve Free Entry' : 'Book Tickets'}</a>
        </div>
      </div>
    </article>`;
}

function initProgrammingPage() {
  const grid = qs('#event-grid');
  if (!grid) return;

  const searchInput = qs('#event-search');
  const dateSelect = qs('#date-filter');
  const chipButtons = qsa('.filter-chips .chip');
  const emptyState = qs('#events-empty');
  const skeleton = qs('#events-skeleton');

  // Support deep-linking from the homepage category strip, e.g. programming.html?category=motorsport
  let activeCategory = getParam('category') || 'all';
  chipButtons.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.category === activeCategory)));

  const matchesDate = (ev, filter) => {
    if (!filter || filter === 'all') return true;
    const evDate = new Date(ev.date + 'T00:00:00');
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (filter === 'today') return evDate.getTime() === today.getTime();
    if (filter === 'week') {
      const weekAhead = new Date(today); weekAhead.setDate(today.getDate() + 7);
      return evDate >= today && evDate <= weekAhead;
    }
    if (filter === 'month') return evDate.getMonth() === today.getMonth() && evDate.getFullYear() === today.getFullYear();
    return ev.date.slice(0, 7) === filter; // yyyy-mm — compare the source string directly, no UTC round-trip
  };

  const render = () => {
    const term = (searchInput?.value || '').trim().toLowerCase();
    const dateFilter = dateSelect?.value || 'all';
    const filtered = EVENTS.filter((ev) => {
      const catOk = activeCategory === 'all' || ev.category === activeCategory;
      const dateOk = matchesDate(ev, dateFilter);
      const searchOk = !term || ev.title.toLowerCase().includes(term) || ev.summary.toLowerCase().includes(term) || ev.tags.join(' ').toLowerCase().includes(term);
      return catOk && dateOk && searchOk;
    }).sort((a, b) => a.date.localeCompare(b.date));

    grid.innerHTML = filtered.map(eventCardHTML).join('');
    if (emptyState) emptyState.hidden = filtered.length !== 0;
    initScrollReveal();
    wireItineraryAddButtons();
  };

  // Simulated brief loading state, then reveal the real grid (skeleton requirement)
  if (skeleton) {
    setTimeout(() => {
      skeleton.remove();
      grid.hidden = false;
      render();
    }, 500);
  } else {
    render();
  }

  chipButtons.forEach((chip) => {
    chip.addEventListener('click', () => {
      chipButtons.forEach((c) => c.setAttribute('aria-pressed', 'false'));
      chip.setAttribute('aria-pressed', 'true');
      activeCategory = chip.dataset.category;
      render();
    });
  });
  searchInput?.addEventListener('input', render);
  dateSelect?.addEventListener('change', render);
}

/* ---------- 8. EVENT DETAIL PAGE ---------- */
function initEventDetailPage() {
  const root = qs('#event-detail-root');
  if (!root) return;
  const id = getParam('id');
  const event = EVENTS.find((e) => e.id === id) || EVENTS[0];

  qs('title').textContent = `${event.title} — Liwa International Festival`;
  const metaDesc = qs('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', event.summary);

  qs('#event-title').textContent = event.title;
  qs('#event-hero-img').src = event.image;
  qs('#event-hero-img').alt = `${event.title} at Liwa International Festival`;
  qs('#event-date').textContent = formatDateLabel(event.date);
  qs('#event-time').textContent = event.time;
  qs('#event-location').textContent = event.location;
  qs('#event-description').textContent = event.description;
  qs('#event-tags').innerHTML = event.tags.map((t) => `<span class="chip">${t}</span>`).join('');

  const galleryEl = qs('#event-gallery');
  if (galleryEl) {
    galleryEl.innerHTML = event.gallery.map((src, i) => `
      <button class="fort-item" style="border:none;padding:0" data-lightbox-index="${i}" aria-label="View gallery image ${i + 1} of ${event.title}">
        <img src="${src}" alt="${event.title} gallery photo ${i + 1}" loading="lazy">
      </button>`).join('');
    initLightbox(galleryEl, event.gallery, event.title);
  }

  const buyBtn = qs('#event-buy-btn');
  const ticketSelect = qs('#event-ticket-select');
  if (ticketSelect) {
    ticketSelect.innerHTML = TICKET_TYPES.map((t) => `<option value="${t.id}" ${t.id === event.ticketTypeId ? 'selected' : ''}>${t.name} — ${AED(t.price)}</option>`).join('');
  }
  const updateBuyHref = () => {
    const chosen = ticketSelect ? ticketSelect.value : event.ticketTypeId;
    if (buyBtn) buyBtn.href = `tickets.html?ticket=${chosen}&event=${event.id}`;
  };
  updateBuyHref();
  ticketSelect?.addEventListener('change', updateBuyHref);

  const addBtn = qs('#event-add-itinerary');
  if (addBtn) {
    addBtn.addEventListener('click', () => addToItinerary(event));
  }

  // "More like this"
  const related = EVENTS.filter((e) => e.category === event.category && e.id !== event.id).slice(0, 3);
  const relatedEl = qs('#event-related');
  if (relatedEl) relatedEl.innerHTML = related.map(eventCardHTML).join('');
  initScrollReveal();
}

/* ---------- 9. ITINERARY BUILDER (localStorage, cross-page) ---------- */
const ITINERARY_KEY = 'liwa-itinerary';

function getItinerary() { return getStorageJSON(localStorage, ITINERARY_KEY, []); }
function saveItinerary(list) { setStorageJSON(localStorage, ITINERARY_KEY, list); updateItineraryFab(); }

function addToItinerary(event) {
  const list = getItinerary();
  if (!list.find((i) => i.id === event.id)) {
    list.push({ id: event.id, title: event.title, date: event.date, image: event.image });
    saveItinerary(list);
  }
  openItineraryPanel();
}

function removeFromItinerary(id) {
  saveItinerary(getItinerary().filter((i) => i.id !== id));
  renderItineraryPanel();
}

function updateItineraryFab() {
  const dot = qs('.itinerary-fab .count-dot');
  if (dot) dot.textContent = getItinerary().length;
}

/* Renders the itinerary into every matching container on the page — the
   slide-out side panel (#itinerary-panel-body) and, on Plan Your Visit,
   an inline builder (#itinerary-inline-body) — so both stay in sync. */
function renderItineraryPanel() {
  const containers = qsa('#itinerary-panel-body, #itinerary-inline-body');
  if (!containers.length) return;
  const list = getItinerary();
  const html = !list.length
    ? '<p class="empty-state">Your itinerary is empty. Add events, dining picks, or a themed day from any page to start building your plan.</p>'
    : list.map((item) => `
      <div class="itinerary-item">
        <img src="${item.image}" alt="${item.title}">
        <div>
          <strong>${item.title}</strong>
          <div style="font-size:0.8rem;color:var(--text-muted)">${item.date ? formatDateLabel(item.date) : ''}</div>
        </div>
        <button class="remove-btn" data-remove-id="${item.id}" aria-label="Remove ${item.title} from itinerary">Remove</button>
      </div>`).join('');

  containers.forEach((body) => {
    body.innerHTML = html;
    qsa('[data-remove-id]', body).forEach((btn) => btn.addEventListener('click', () => removeFromItinerary(btn.dataset.removeId)));
  });
}

function openItineraryPanel() {
  qs('#itinerary-overlay')?.classList.add('is-open');
  qs('#itinerary-panel')?.classList.add('is-open');
  qs('#itinerary-panel')?.setAttribute('aria-hidden', 'false');
  renderItineraryPanel();
}
function closeItineraryPanel() {
  qs('#itinerary-overlay')?.classList.remove('is-open');
  qs('#itinerary-panel')?.classList.remove('is-open');
  qs('#itinerary-panel')?.setAttribute('aria-hidden', 'true');
}

function initItineraryWidget() {
  renderItineraryPanel();
  const fab = qs('.itinerary-fab');
  if (!fab) return;
  updateItineraryFab();
  fab.addEventListener('click', openItineraryPanel);
  qs('#itinerary-close')?.addEventListener('click', closeItineraryPanel);
  qs('#itinerary-overlay')?.addEventListener('click', closeItineraryPanel);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeItineraryPanel(); });
}

/* Wires up any [data-add-itinerary] buttons rendered dynamically (e.g. in
   theme teasers or programming cards) to the itinerary store. */
function wireItineraryAddButtons() {
  qsa('[data-add-itinerary]').forEach((btn) => {
    if (btn.dataset.wired) return;
    btn.dataset.wired = 'true';
    btn.addEventListener('click', () => {
      const ev = EVENTS.find((e) => e.id === btn.dataset.addItinerary);
      if (ev) addToItinerary(ev);
    });
  });
}

/* Add an entire itinerary theme (Family Day / Culture / Adventure / Culinary) */
function wireThemeItineraryButtons() {
  qsa('[data-add-theme]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const theme = ITINERARY_THEMES[btn.dataset.addTheme];
      if (!theme) return;
      const list = getItinerary();
      theme.events.forEach((id) => {
        const ev = EVENTS.find((e) => e.id === id);
        if (ev && !list.find((i) => i.id === ev.id)) list.push({ id: ev.id, title: ev.title, date: ev.date, image: ev.image });
      });
      saveItinerary(list);
      openItineraryPanel();
    });
  });
}

/* ---------- 10. CAROUSELS + LIGHTBOX + TABS ---------- */
function initCarouselControls() {
  qsa('[data-carousel-target]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const track = qs('#' + btn.dataset.carouselTarget);
      if (!track) return;
      const amount = track.clientWidth * 0.8 * (btn.dataset.dir === 'prev' ? -1 : 1);
      track.scrollBy({ left: amount, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    });
  });
}

function initLightbox(triggerContainer, images, altBase) {
  const overlay = qs('#lightbox-overlay');
  if (!overlay) return;
  const imgEl = qs('#lightbox-img');
  const caption = qs('#lightbox-caption');
  let index = 0;

  const show = (i) => {
    index = (i + images.length) % images.length;
    imgEl.src = images[index];
    imgEl.alt = `${altBase} — photo ${index + 1} of ${images.length}`;
    caption.textContent = `${index + 1} / ${images.length}`;
  };

  qsa('[data-lightbox-index]', triggerContainer).forEach((btn) => {
    btn.addEventListener('click', () => {
      show(Number(btn.dataset.lightboxIndex));
      overlay.classList.add('is-open');
      qs('#lightbox-close')?.focus();
    });
  });
  qs('#lightbox-close')?.addEventListener('click', () => overlay.classList.remove('is-open'));
  qs('#lightbox-prev')?.addEventListener('click', () => show(index - 1));
  qs('#lightbox-next')?.addEventListener('click', () => show(index + 1));
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('is-open'); });
  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('is-open')) return;
    if (e.key === 'Escape') overlay.classList.remove('is-open');
    if (e.key === 'ArrowRight') show(index + 1);
    if (e.key === 'ArrowLeft') show(index - 1);
  });
}

function initFortLightbox() {
  const list = qs('#fort-list');
  if (!list) return;
  list.innerHTML = FORTS.map((f, i) => `
    <button class="fort-item" style="border:none;padding:0;width:100%" data-lightbox-index="${i}" aria-label="View ${f.name}, historic fort of Al Dhafra">
      <img src="${f.image}" alt="${f.name}, historic watchtower in the Al Dhafra region" loading="lazy">
      <figcaption>${f.name}</figcaption>
    </button>`).join('');
  initLightbox(list, FORTS.map((f) => f.image), 'Al Dhafra historic fort');
}

function initTabs() {
  const tabButtons = qsa('.tab-btn');
  if (!tabButtons.length) return;
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach((b) => b.setAttribute('aria-selected', 'false'));
      btn.setAttribute('aria-selected', 'true');
      qsa('.tab-panel').forEach((p) => p.classList.remove('is-active'));
      qs('#' + btn.getAttribute('aria-controls'))?.classList.add('is-active');
    });
  });
}

/* Stars helper — renders filled/empty star characters for a 1–5 rating */
function starRating(n) {
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

/* Interactive festival map (plan-your-visit.html): renders MAP_POINTS as
   clickable pins over the aerial map image, filterable by type, with a
   detail panel instead of a real map-provider popup. */
function initFestivalMap() {
  const mapEl = qs('#festival-map');
  const panel = qs('#map-detail-panel');
  const filters = qsa('#map-filters .chip');
  if (!mapEl || !panel) return;

  const icons = { trail: '📍', zone: '✨', facility: 'ℹ️' };
  mapEl.innerHTML = MAP_POINTS.map((p) => `
    <button type="button" class="map-pin" data-type="${p.type}" data-point="${p.id}"
      style="top:${p.top}%;left:${p.left}%" aria-label="${p.name}">
      <span aria-hidden="true">${icons[p.type]}</span>
    </button>`).join('');

  const showDetail = (point) => {
    panel.innerHTML = `
      <span class="badge ${point.type === 'trail' ? 'badge--live' : point.type === 'zone' ? 'badge--limited' : ''}" style="margin-bottom:0.6rem;display:inline-block">${point.type === 'trail' ? 'Trail Stop' : point.type === 'zone' ? 'Entertainment Zone' : 'Visitor Facility'}</span>
      <h3 style="margin:0 0 0.4rem">${point.name}</h3>
      <p style="margin:0 0 0.8rem">${point.description}</p>
      ${point.link ? `<a href="${point.link}" class="btn btn--primary btn--sm">${point.linkLabel}</a>` : '<p class="hint">No booking action — informational facility only.</p>'}
    `;
  };

  qsa('.map-pin', mapEl).forEach((pin) => {
    pin.addEventListener('click', () => {
      qsa('.map-pin', mapEl).forEach((p) => p.classList.remove('is-active'));
      pin.classList.add('is-active');
      const point = MAP_POINTS.find((p) => p.id === pin.dataset.point);
      if (point) showDetail(point);
    });
  });

  filters.forEach((chip) => {
    chip.addEventListener('click', () => {
      filters.forEach((c) => c.setAttribute('aria-pressed', 'false'));
      chip.setAttribute('aria-pressed', 'true');
      const type = chip.dataset.mapFilter;
      qsa('.map-pin', mapEl).forEach((pin) => {
        pin.hidden = type !== 'all' && pin.dataset.type !== type;
      });
    });
  });
}

/* Motorsport hub (motorsport.html): curated grid pulled straight from the
   shared EVENTS array, filtered to the motorsport category — one source
   of truth, no duplicated event data. */
function initMotorsportPage() {
  const grid = qs('#motorsport-grid');
  if (!grid) return;
  const events = EVENTS.filter((e) => e.category === 'motorsport').sort((a, b) => a.date.localeCompare(b.date));
  grid.innerHTML = events.map(eventCardHTML).join('');
  initScrollReveal();
  wireItineraryAddButtons();
}

function initHotelsAndDining() {
  const hotelsEl = qs('#hotels-carousel');
  if (hotelsEl) {
    hotelsEl.innerHTML = HOTELS.map((h) => `
      <article class="card hotel-card reveal">
        <div class="card-media"><img src="${h.image}" alt="${h.name}, ${h.rating}-star accommodation near Liwa International Festival in ${h.area}" loading="lazy"></div>
        <div class="card-body">
          <h3>${h.name}</h3>
          <div class="rating-stars" aria-label="${h.rating} out of 5 stars">${starRating(h.rating)}</div>
          <p class="card-meta">${h.area}</p>
          <p>${h.description}</p>
          <div class="card-footer">
            <span class="ticket-price">${AED(h.priceFrom)}<span style="font-weight:500;font-size:0.7rem;color:var(--text-muted)"> /night from</span></span>
          </div>
        </div>
      </article>`).join('');
  }
  const diningEl = qs('#dining-carousel');
  if (diningEl) {
    diningEl.innerHTML = DINING.map((d) => `
      <article class="card dining-card reveal">
        <div class="card-media"><img src="${d.image}" alt="${d.name}, ${d.category} dining outlet at Liwa International Festival" loading="lazy"></div>
        <div class="card-body">
          <h3>${d.name}</h3>
          <div class="rating-stars" aria-label="${d.rating} out of 5 stars">${starRating(d.rating)}</div>
          <p class="card-meta">${d.category}</p>
          <p>${d.description}</p>
        </div>
      </article>`).join('');
  }
  initScrollReveal();
}

/* ---------- 11. TICKETING FLOW ---------- */
const TICKET_STATE_KEY = 'liwa-ticket-order';
// Formats a Date's LOCAL calendar day as YYYY-MM-DD. Deliberately avoids
// toISOString() here — it converts to UTC first, which silently rolls the
// date back a day in any timezone ahead of UTC (e.g. UAE, +04:00).
const toLocalISODate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const FESTIVAL_DATES = (() => {
  const dates = [];
  let d = new Date('2026-12-11T00:00:00');
  const end = new Date('2027-01-03T00:00:00');
  while (d <= end) { dates.push(toLocalISODate(d)); d.setDate(d.getDate() + 1); }
  return dates;
})();
// Sample availability so the calendar demonstrates sold-out/limited states
const AVAILABILITY = { '2026-12-22': 'soldout', '2026-12-31': 'limited', '2027-01-03': 'limited' };

function defaultTicketState() {
  return { step: 1, quantities: {}, selectedDate: null, selectedSlot: null, addons: {}, contact: { name: '', email: '', phone: '' } };
}

function getTicketState() {
  return getStorageJSON(sessionStorage, TICKET_STATE_KEY, defaultTicketState());
}
function saveTicketState(state) { setStorageJSON(sessionStorage, TICKET_STATE_KEY, state); }

function initTicketingPage() {
  const shell = qs('#ticket-shell');
  if (!shell) return;

  let state = getTicketState();

  // Pre-select ticket type from a cross-linked "Buy Tickets" button, once.
  const presetTicket = getParam('ticket');
  if (presetTicket && !Object.keys(state.quantities).length) {
    state.quantities[presetTicket] = 1;
    saveTicketState(state);
  }

  // Cross-link banner: shown when arriving via an event's "Buy Tickets" button
  const presetEvent = EVENTS.find((e) => e.id === getParam('event'));
  const banner = qs('#selected-event-banner');
  if (presetEvent && banner) {
    banner.hidden = false;
    banner.textContent = `Booking for: ${presetEvent.title} — ${formatDateLabel(presetEvent.date)}`;
  }

  qs('#print-eticket-btn')?.addEventListener('click', () => window.print());

  renderTicketTypes();
  renderCalendar();
  renderAddons();
  goToStep(state.step || 1);
  renderOrderSummary();
  // Resuming a session already on the confirmation step (e.g. a page reload)
  // needs its dynamic fields populated too — normally only set by the Pay
  // Now handler, which won't fire again on a plain restore.
  if (state.step === 5) renderConfirmation();

  qsa('.step-nav [data-step-next]').forEach((btn) => btn.addEventListener('click', () => {
    if (btn.dataset.stepNext === '4' && !validateContactForm()) return;
    goToStep(Number(btn.dataset.stepNext));
  }));
  qsa('.step-nav [data-step-back]').forEach((btn) => btn.addEventListener('click', () => goToStep(Number(btn.dataset.stepBack))));

  qs('#pay-now-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (!validateContactForm()) { goToStep(4); return; }
    goToStep(5);
    renderConfirmation();
  });

  qs('#start-over-btn')?.addEventListener('click', () => {
    sessionStorage.removeItem(TICKET_STATE_KEY);
    state = defaultTicketState();
    saveTicketState(state);
    renderTicketTypes(); renderCalendar(); renderAddons(); renderOrderSummary();
    goToStep(1);
  });

  function renderTicketTypes() {
    const container = qs('#ticket-type-list');
    if (!container) return;
    container.innerHTML = TICKET_TYPES.map((t) => {
      const qty = state.quantities[t.id] || 0;
      return `
      <div class="ticket-type-card ${qty > 0 ? 'has-qty' : ''}" data-ticket-card="${t.id}">
        <div class="ticket-type-info">
          <h4>${t.name}</h4>
          <p style="margin-bottom:0.4rem">${t.description}</p>
          <div class="card-meta">${t.features.map((f) => `<span class="chip">${f}</span>`).join('')}</div>
          <div class="ticket-price" style="margin-top:0.5rem">${AED(t.price)} <span style="font-weight:500;font-size:0.75rem;color:var(--text-muted)">${t.unit}</span></div>
        </div>
        <div class="qty-stepper" role="group" aria-label="${t.name} quantity">
          <button type="button" aria-label="Decrease ${t.name} quantity" data-qty-dec="${t.id}">−</button>
          <output aria-live="polite">${qty}</output>
          <button type="button" aria-label="Increase ${t.name} quantity" data-qty-inc="${t.id}">+</button>
        </div>
      </div>`;
    }).join('');

    qsa('[data-qty-inc]', container).forEach((b) => b.addEventListener('click', () => changeQty(b.dataset.qtyInc, 1)));
    qsa('[data-qty-dec]', container).forEach((b) => b.addEventListener('click', () => changeQty(b.dataset.qtyDec, -1)));
  }

  function changeQty(id, delta) {
    const next = Math.max(0, (state.quantities[id] || 0) + delta);
    if (next === 0) delete state.quantities[id]; else state.quantities[id] = next;
    saveTicketState(state);
    renderTicketTypes();
    renderOrderSummary();
  }

  function renderCalendar() {
    const grid = qs('#date-grid');
    if (!grid) return;
    grid.innerHTML = FESTIVAL_DATES.map((iso) => {
      const status = AVAILABILITY[iso];
      const disabled = status === 'soldout';
      const label = formatDateLabel(iso);
      return `<button type="button" class="date-cell ${state.selectedDate === iso ? 'is-selected' : ''}" data-date="${iso}" ${disabled ? 'disabled aria-disabled="true"' : ''} aria-pressed="${state.selectedDate === iso}">
        ${label}${status ? `<span class="avail-dot ${status}"></span>` : ''}
      </button>`;
    }).join('');
    qsa('[data-date]', grid).forEach((btn) => btn.addEventListener('click', () => {
      state.selectedDate = btn.dataset.date;
      state.selectedSlot = null;
      saveTicketState(state);
      renderCalendar();
      renderSlots();
    }));
    renderSlots();
  }

  function renderSlots() {
    const wrap = qs('#slot-list');
    if (!wrap) return;
    if (!state.selectedDate) { wrap.innerHTML = '<p class="hint">Select a date above to see available time slots.</p>'; return; }
    const slots = [
      { time: '10:00 – 14:00', status: 'open' },
      { time: '14:00 – 18:00', status: AVAILABILITY[state.selectedDate] === 'limited' ? 'limited' : 'open' },
      { time: '18:00 – 22:00', status: AVAILABILITY[state.selectedDate] === 'soldout' ? 'soldout' : 'open' }
    ];
    wrap.innerHTML = slots.map((s) => `
      <button type="button" class="slot-btn ${state.selectedSlot === s.time ? 'is-selected' : ''}" ${s.status === 'soldout' ? 'disabled' : ''} data-slot="${s.time}">
        ${s.time} ${s.status === 'limited' ? '(Limited)' : s.status === 'soldout' ? '(Sold Out)' : ''}
      </button>`).join('');
    qsa('[data-slot]', wrap).forEach((b) => b.addEventListener('click', () => {
      state.selectedSlot = b.dataset.slot;
      saveTicketState(state);
      renderSlots();
    }));
  }

  function renderAddons() {
    const container = qs('#addon-list');
    if (!container) return;
    container.innerHTML = ADDONS.map((a) => `
      <label class="addon-card ${state.addons[a.id] ? 'is-selected' : ''}" data-addon-card="${a.id}">
        <input type="checkbox" ${state.addons[a.id] ? 'checked' : ''} data-addon-toggle="${a.id}" aria-describedby="addon-desc-${a.id}">
        <div>
          <strong>${a.name}</strong>
          <p id="addon-desc-${a.id}" style="margin:0.2rem 0 0;font-size:0.88rem">${a.description}</p>
        </div>
        <div class="addon-price">${AED(a.price)}</div>
      </label>`).join('');
    qsa('[data-addon-toggle]', container).forEach((cb) => cb.addEventListener('change', () => {
      if (cb.checked) state.addons[cb.dataset.addonToggle] = true; else delete state.addons[cb.dataset.addonToggle];
      saveTicketState(state);
      renderAddons();
      renderOrderSummary();
    }));
  }

  function calcTotals() {
    let subtotal = 0;
    Object.entries(state.quantities).forEach(([id, qty]) => {
      const t = TICKET_TYPES.find((x) => x.id === id);
      if (t) subtotal += t.price * qty;
    });
    Object.keys(state.addons).forEach((id) => {
      const a = ADDONS.find((x) => x.id === id);
      if (a) subtotal += a.price;
    });
    return subtotal;
  }

  function renderOrderSummary() {
    const el = qs('#order-summary-lines');
    if (!el) return;
    const lines = [];
    Object.entries(state.quantities).forEach(([id, qty]) => {
      const t = TICKET_TYPES.find((x) => x.id === id);
      if (t && qty > 0) lines.push(`<div class="order-line"><span>${t.name} × ${qty}</span><span>${AED(t.price * qty)}</span></div>`);
    });
    Object.keys(state.addons).forEach((id) => {
      const a = ADDONS.find((x) => x.id === id);
      if (a) lines.push(`<div class="order-line"><span>${a.name}</span><span>${AED(a.price)}</span></div>`);
    });
    if (state.selectedDate) lines.push(`<div class="order-line"><span>Date</span><span>${formatDateLabel(state.selectedDate)}${state.selectedSlot ? ' · ' + state.selectedSlot : ''}</span></div>`);
    el.innerHTML = lines.length ? lines.join('') : '<p class="hint">No tickets selected yet.</p>';
    const totalEl = qs('#order-summary-total');
    if (totalEl) totalEl.textContent = AED(calcTotals());
  }

  function validateContactForm() {
    const name = qs('#contact-name');
    const email = qs('#contact-email');
    const phone = qs('#contact-phone');
    if (!name) return true;
    let valid = true;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    const phoneOk = /^[0-9+\s-]{7,}$/.test(phone.value.trim());
    [ [name, name.value.trim().length > 1], [email, emailOk], [phone, phoneOk] ].forEach(([input, ok]) => {
      input.classList.toggle('is-invalid', !ok);
      if (!ok) valid = false;
    });
    if (valid) {
      state.contact = { name: name.value.trim(), email: email.value.trim(), phone: phone.value.trim() };
      saveTicketState(state);
    }
    return valid;
  }

  function renderConfirmation() {
    const totals = calcTotals();
    const orderId = 'LIF-' + Math.abs(hashCode(JSON.stringify(state) + Date.now())).toString().slice(0, 8);
    qs('#confirm-order-id').textContent = orderId;
    qs('#confirm-name').textContent = state.contact.name;
    qs('#confirm-email').textContent = state.contact.email;
    qs('#confirm-date').textContent = state.selectedDate ? `${formatDateLabel(state.selectedDate)}${state.selectedSlot ? ' · ' + state.selectedSlot : ''}` : 'Full-season access';
    qs('#confirm-total').textContent = AED(totals);
    const linesEl = qs('#confirm-lines');
    if (linesEl) {
      const lines = [];
      Object.entries(state.quantities).forEach(([id, qty]) => {
        const t = TICKET_TYPES.find((x) => x.id === id);
        if (t && qty > 0) lines.push(`${t.name} × ${qty}`);
      });
      Object.keys(state.addons).forEach((id) => {
        const a = ADDONS.find((x) => x.id === id);
        if (a) lines.push(a.name);
      });
      linesEl.innerHTML = lines.map((l) => `<li>${l}</li>`).join('');
    }
  }

  function goToStep(n) {
    state.step = n;
    saveTicketState(state);
    qsa('.ticket-step').forEach((s) => s.classList.toggle('is-active', Number(s.dataset.step) === n));
    qsa('.step').forEach((s) => {
      const stepNum = Number(s.dataset.step);
      s.classList.toggle('is-active', stepNum === n);
      s.classList.toggle('is-complete', stepNum < n);
    });
    window.scrollTo({ top: qs('#ticket-shell').offsetTop - 100, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) { hash = (hash << 5) - hash + str.charCodeAt(i); hash |= 0; }
  return hash;
}

/* ---------- 12. FEEDBACK + NEWSLETTER FORMS ---------- */
function initFeedbackForm() {
  const form = qs('#feedback-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = qs('#fb-name', form);
    const email = qs('#fb-email', form);
    const message = qs('#fb-message', form);
    const consent = qs('#fb-consent', form);
    let valid = true;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    [ [name, name.value.trim().length > 1], [email, emailOk], [message, message.value.trim().length > 5] ].forEach(([input, ok]) => {
      input.classList.toggle('is-invalid', !ok);
      if (!ok) valid = false;
    });
    if (!consent.checked) valid = false;
    const status = qs('#feedback-status');
    if (!valid) {
      status.textContent = 'Please complete all required fields and accept the privacy consent before submitting.';
      status.className = 'form-status is-error';
      return;
    }
    status.textContent = 'Thank you — your feedback has been received. A confirmation has been sent to your email.';
    status.className = 'form-status is-success';
    form.reset();
  });
}

function initNewsletterForms() {
  qsa('.newsletter-form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = qs('input[type="email"]', form);
      const status = qs('.newsletter-status', form.parentElement) || qs('.newsletter-status', form);
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      if (!ok) { email.classList.add('is-invalid'); return; }
      email.classList.remove('is-invalid');
      if (status) { status.textContent = 'Subscribed — welcome to the Liwa International Festival community.'; status.style.display = 'block'; }
      form.reset();
    });
  });
}

/* ---------- 12b. CHOOSE YOUR LIWA — interest personalization ---------- */
// Lightweight, privacy-compliant personalization: no tracking, just a
// single stored preference that re-highlights matching cards on any page
// carrying a [data-interest-tags] attribute.
const INTEREST_KEY = 'liwa-interest';

function applyInterestHighlight(interest) {
  qsa('[data-interest-tags]').forEach((el) => {
    const tags = el.dataset.interestTags.split(',').map((t) => t.trim());
    el.classList.toggle('is-interest-match', Boolean(interest) && tags.includes(interest));
  });
}

function initInterestSelector() {
  const chips = qsa('#interest-selector .chip');
  const stored = localStorage.getItem(INTEREST_KEY);
  if (stored) applyInterestHighlight(stored);
  if (!chips.length) return;
  chips.forEach((chip) => {
    if (chip.dataset.interest === stored) chip.setAttribute('aria-pressed', 'true');
    chip.addEventListener('click', () => {
      const alreadyActive = chip.getAttribute('aria-pressed') === 'true';
      chips.forEach((c) => c.setAttribute('aria-pressed', 'false'));
      const next = alreadyActive ? '' : chip.dataset.interest;
      if (next) { chip.setAttribute('aria-pressed', 'true'); localStorage.setItem(INTEREST_KEY, next); }
      else { localStorage.removeItem(INTEREST_KEY); }
      applyInterestHighlight(next);
    });
  });
}

/* ---------- 12c. SITEWIDE SEARCH ---------- */
// Static page index — kept small and hand-curated rather than crawling the
// DOM, since the whole site is only a dozen pages. Extend this array when
// adding new pages.
const SEARCH_PAGES = [
  { title: 'Home', url: 'index.html', icon: '🏠', keywords: 'desert grand stage home overview' },
  { title: 'The Liwa Trail', url: 'the-trail.html', icon: '🧭', keywords: 'trail nine stops tal moreeb liwa walk helipad forts village' },
  { title: 'Festival Programming', url: 'programming.html', icon: '🎪', keywords: 'schedule events programme calendar' },
  { title: 'Motorsport Hub', url: 'motorsport.html', icon: '🏁', keywords: 'tal moreeb drift motocross dune racing' },
  { title: 'Plan Your Visit', url: 'plan-your-visit.html', icon: '🧭', keywords: 'directions parking camping map itinerary tips' },
  { title: 'Experience Liwa', url: 'experience-liwa.html', icon: '🏺', keywords: 'heritage culture forts family adventure culinary tabs' },
  { title: 'Stay & Dine', url: 'stay-and-dine.html', icon: '🏨', keywords: 'hotels resorts dining restaurants accommodation' },
  { title: 'Tickets & Passes', url: 'tickets.html', icon: '🎟️', keywords: 'book tickets day pass season vip parking' },
  { title: 'Feedback & Newsletter', url: 'feedback.html', icon: '📝', keywords: 'contact form survey subscribe' },
  { title: 'Contact & Accessibility', url: 'contact.html', icon: '☎️', keywords: 'phone email accessibility statement' }
];

function runSiteSearch(term) {
  const q = term.trim().toLowerCase();
  const resultsEl = qs('#site-search-results');
  if (!resultsEl) return;
  if (!q) { resultsEl.innerHTML = '<p class="hint">Try "falconry", "tickets", or "Tal Moreeb".</p>'; return; }

  const eventMatches = EVENTS.filter((e) =>
    e.title.toLowerCase().includes(q) || e.summary.toLowerCase().includes(q) || e.tags.join(' ').toLowerCase().includes(q)
  ).slice(0, 6);
  const pageMatches = SEARCH_PAGES.filter((p) =>
    p.title.toLowerCase().includes(q) || p.keywords.includes(q)
  ).slice(0, 6);

  if (!eventMatches.length && !pageMatches.length) {
    resultsEl.innerHTML = '<p class="empty-state">No matches. Try a different keyword.</p>';
    return;
  }

  let html = '';
  if (pageMatches.length) {
    html += '<div class="search-result-group"><h4>Pages</h4>' + pageMatches.map((p) => `
      <a class="search-result-item" href="${p.url}"><span class="result-icon">${p.icon}</span><span>${p.title}</span></a>`).join('') + '</div>';
  }
  if (eventMatches.length) {
    html += '<div class="search-result-group"><h4>Programme</h4>' + eventMatches.map((e) => `
      <a class="search-result-item" href="event-detail.html?id=${e.id}"><span class="result-icon">📅</span><span>${e.title} — ${formatDateLabel(e.date)}</span></a>`).join('') + '</div>';
  }
  resultsEl.innerHTML = html;
}

function initSiteSearch() {
  const openBtn = qs('#site-search-open');
  const overlay = qs('#site-search-overlay');
  const input = qs('#site-search-input');
  if (!openBtn || !overlay || !input) return;

  const open = () => {
    overlay.classList.add('is-open');
    runSiteSearch('');
    setTimeout(() => input.focus(), 50);
  };
  const close = () => overlay.classList.remove('is-open');

  openBtn.addEventListener('click', open);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  qs('#site-search-close')?.addEventListener('click', close);
  input.addEventListener('input', () => runSiteSearch(input.value));
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); open(); }
    if (e.key === 'Escape') close();
  });
}

/* ---------- 13. PAGE INIT DISPATCHER ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initScrollReveal();
  initParallaxHero();
  initCountdown();
  initStatCounters();
  initItineraryWidget();
  initCarouselControls();
  initTabs();
  initFortLightbox();
  initProgrammingPage();
  initEventDetailPage();
  initHotelsAndDining();
  initMotorsportPage();
  initFestivalMap();
  initTicketingPage();
  initFeedbackForm();
  initNewsletterForms();
  initInterestSelector();
  initSiteSearch();
  wireItineraryAddButtons();
  wireThemeItineraryButtons();
});
