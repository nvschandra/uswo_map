// All coordinates are on a 1000x700 viewBox

export const HOLES = [
  { id: 'hole-1',  num: 1,  x: 760, y: 228, par: 4, yards: 434, desc: 'Dogleg right opening hole. Tee shot demands precision with bunkers guarding the fairway.' },
  { id: 'hole-2',  num: 2,  x: 720, y: 315, par: 5, yards: 480, desc: 'Reachable par-5 with a green protected by deep bunkers on both sides.' },
  { id: 'hole-3',  num: 3,  x: 608, y: 385, par: 4, yards: 453, desc: 'Demanding par-4 with a narrow driving zone and a heavily bunkered approach.' },
  { id: 'hole-4',  num: 4,  x: 445, y: 490, par: 3, yards: 236, desc: 'Iconic par-3 with a bunker in the MIDDLE of the green — one of golf\'s most unique features.' },
  { id: 'hole-5',  num: 5,  x: 312, y: 590, par: 3, yards: 186, desc: 'Scenic short par-3 with a sharply elevated tee. Club selection is critical.' },
  { id: 'hole-6',  num: 6,  x: 255, y: 662, par: 4, yards: 391, desc: 'Driveable par-4 for the pros. Risk/reward off the tee sets up birdie opportunities.' },
  { id: 'hole-7',  num: 7,  x: 385, y: 648, par: 4, yards: 397, desc: 'Tricky par-4 with a shelf green that\'s extremely difficult to hold from the wrong angle.' },
  { id: 'hole-8',  num: 8,  x: 512, y: 600, par: 4, yards: 378, desc: 'Short par-4 requiring a precise tee shot to open up the angled green.' },
  { id: 'hole-9',  num: 9,  x: 510, y: 498, par: 4, yards: 474, desc: 'Long par-4 uphill finisher on the front nine. Approach is key from the right side.' },
  { id: 'hole-10', num: 10, x: 522, y: 395, par: 4, yards: 315, desc: 'Short, driveable par-4 that starts the back nine. Setting up the correct angle is everything.' },
  { id: 'hole-11', num: 11, x: 648, y: 468, par: 4, yards: 451, desc: 'Long par-4 requiring a precise tee shot to an angled fairway. Approach must avoid front bunkers.' },
  { id: 'hole-12', num: 12, x: 828, y: 390, par: 4, yards: 476, desc: 'Strategic par-4 with out-of-bounds right and a tiered fairway. Playing position matters greatly.' },
  { id: 'hole-13', num: 13, x: 692, y: 535, par: 4, yards: 464, desc: 'Testing par-4 with a dogleg left. Second shot is a long iron or fairway wood to a peninsula-style green.' },
  { id: 'hole-14', num: 14, x: 572, y: 562, par: 3, yards: 166, desc: 'Short par-3 with the Suites on 14 grandstand behind — a great spectator hole.' },
  { id: 'hole-15', num: 15, x: 478, y: 598, par: 4, yards: 418, desc: 'Uphill par-4 with a green perched above the fairway. Run-off areas make par very difficult.' },
  { id: 'hole-16', num: 16, x: 338, y: 645, par: 5, yards: 578, desc: 'Long par-5 that bends through native areas. Reaching in two is possible but risky.' },
  { id: 'hole-17', num: 17, x: 430, y: 632, par: 4, yards: 432, desc: 'Classic Riviera par-4 with a dramatically sloped fairway. Position from the tee is everything.' },
  { id: 'hole-18', num: 18, x: 378, y: 470, par: 4, yards: 455, desc: 'Spectacular finishing hole. The amphitheater green is one of the best in golf. Scoreboard drama guaranteed.' },
];

export const GATES = [
  { id: 'gate-1', label: 'GATE 1', x: 770, y: 168, desc: 'Main public entrance from Capri Drive. Ticket scanning available. Opens 6:00 AM daily.' },
  { id: 'gate-2', label: 'GATE 2', x: 852, y: 188, desc: 'Secondary entrance near the north boundary. Opens 6:00 AM daily.' },
  { id: 'gate-34', label: 'GATE 3/4', x: 650, y: 198, desc: 'Dual-gate entry in upper-left section. Preferred entry for Palisades Club and hospitality guests.' },
];

export const VENUES = [
  {
    id: 'cp', code: 'CP', label: 'Champions Pavilion', x: 458, y: 518,
    color: '#FFD700',
    desc: 'Premium hospitality experience with air-conditioned luxury suites, chef-curated dining, and prime views of holes 4, 9, and 18.',
    amenities: ['Premium dining', 'Air conditioning', 'Premium bar', 'Private restrooms', 'Course views'],
    ticketRequired: true,
  },
  {
    id: 'hp', code: 'HP', label: 'Hero Pavilion', x: 468, y: 510,
    color: '#FF6B35',
    desc: 'Exciting spectator area with casual food and beverages, live scoring, and great views near the 4th and 18th greens.',
    amenities: ['Casual dining', 'Beverages', 'Live scoring boards', 'Outdoor seating'],
    ticketRequired: true,
  },
  {
    id: 'mc', code: 'MC', label: 'Media Center', x: 624, y: 248,
    color: '#808080',
    desc: 'Official USGA Media Center — credential access only. Press briefings and scoring updates.',
    amenities: ['Press facilities', 'Workstations', 'Official scoring'],
    ticketRequired: false,
    credentialRequired: true,
  },
  {
    id: 'mh', code: 'MH', label: 'Member Hospitality', x: 662, y: 220,
    color: '#9B59B6',
    desc: 'Exclusive hospitality for Riviera Country Club members and their guests. Private terrace overlooking the opening holes.',
    amenities: ['Member dining', 'Private bar', 'Terrace seating'],
    ticketRequired: false,
    credentialRequired: true,
  },
  {
    id: 'pc', code: 'PC', label: 'Palisades Club', x: 645, y: 232,
    color: '#E74C3C',
    desc: 'Upscale hospitality village with Southern California-inspired cuisine, craft cocktails, and stunning views of the course.',
    amenities: ['Full-service restaurant', 'Craft bar', 'Outdoor lounge', 'Course views'],
    ticketRequired: true,
  },
  {
    id: 'tc', code: 'TC', label: 'Trophy Club', x: 602, y: 553,
    color: '#F39C12',
    desc: 'Exclusive hospitality club adjacent to the 13th and 14th holes, featuring trophy displays and USGA historical exhibits.',
    amenities: ['Premium dining', 'Trophy exhibits', 'USGA history displays', 'Private bar'],
    ticketRequired: true,
  },
  {
    id: 'uh', code: 'UH', label: 'USGA Hospitality', x: 730, y: 555,
    color: '#1ABC9C',
    desc: 'Official USGA hospitality area with rules officials, player services, and association partner hosting.',
    amenities: ['Official hospitality', 'Rules information', 'Partner experiences'],
    ticketRequired: false,
    credentialRequired: true,
  },
  {
    id: '18g', code: '18G', label: 'Village on 18', x: 295, y: 465,
    color: '#27AE60',
    desc: 'Public fan zone in the 18th fairway bowl. Great views of the finishing hole with food, beverages, and sponsor activations.',
    amenities: ['Food vendors', 'Beverages', 'Fan zone', 'Finishing hole views', 'Sponsor activations'],
    ticketRequired: false,
  },
  {
    id: 'vh', code: 'VH', label: 'Volunteer Hospitality', x: 722, y: 588,
    color: '#3498DB',
    desc: 'Volunteer check-in, credential distribution, and hospitality area. Thank you to all our volunteers!',
    amenities: ['Volunteer check-in', 'Meals', 'Briefing area'],
    ticketRequired: false,
    credentialRequired: true,
  },
  {
    id: 'vv', code: 'VV', label: 'Volunteer Village', x: 818, y: 195,
    color: '#2ECC71',
    desc: 'Central volunteer hub with lockers, rest areas, and volunteer coordination for all championship operations.',
    amenities: ['Volunteer lounge', 'Storage lockers', 'Coordinator desk'],
    ticketRequired: false,
    credentialRequired: true,
  },
  {
    id: '14g', code: '14G', label: 'Suites on 14', x: 572, y: 542,
    color: '#8E44AD',
    desc: 'Elevated suite experiences directly behind the 14th green. Perfect sightlines for the drama of this par-3.',
    amenities: ['Private suites', 'Premium catering', 'Private bar', 'Par-3 views'],
    ticketRequired: true,
  },
];

export const AMENITIES = [
  // Restrooms
  { id: 'rr-1',  type: 'restroom',   x: 700, y: 190, label: 'Restrooms' },
  { id: 'rr-2',  type: 'restroom',   x: 560, y: 350, label: 'Restrooms' },
  { id: 'rr-3',  type: 'restroom',   x: 400, y: 460, label: 'Restrooms' },
  { id: 'rr-4',  type: 'restroom',   x: 270, y: 560, label: 'Restrooms' },
  { id: 'rr-5',  type: 'restroom',   x: 400, y: 615, label: 'Restrooms' },
  { id: 'rr-6',  type: 'restroom',   x: 580, y: 520, label: 'Restrooms' },
  { id: 'rr-7',  type: 'restroom',   x: 700, y: 430, label: 'Restrooms' },
  { id: 'rr-8',  type: 'restroom',   x: 820, y: 340, label: 'Restrooms' },
  // Concessions
  { id: 'cc-1',  type: 'concession', x: 735, y: 265, label: 'Concessions' },
  { id: 'cc-2',  type: 'concession', x: 560, y: 430, label: 'Concessions' },
  { id: 'cc-3',  type: 'concession', x: 340, y: 535, label: 'Concessions' },
  { id: 'cc-4',  type: 'concession', x: 455, y: 645, label: 'Concessions' },
  { id: 'cc-5',  type: 'concession', x: 630, y: 580, label: 'Concessions' },
  // First Aid
  { id: 'fa-1',  type: 'firstaid',   x: 720, y: 280, label: 'First Aid' },
  { id: 'fa-2',  type: 'firstaid',   x: 450, y: 560, label: 'First Aid' },
  { id: 'fa-3',  type: 'firstaid',   x: 310, y: 625, label: 'First Aid' },
  // Grandstands
  { id: 'gs-1',  type: 'grandstand', x: 750, y: 250, label: 'Grandstand (Hole 1)' },
  { id: 'gs-2',  type: 'grandstand', x: 475, y: 478, label: 'Grandstand (Hole 4 / Hole 18)' },
  { id: 'gs-3',  type: 'grandstand', x: 600, y: 545, label: 'Grandstand (Hole 14)' },
  { id: 'gs-4',  type: 'grandstand', x: 655, y: 505, label: 'Grandstand (Hole 11/13)' },
  // Hydration Stations
  { id: 'hy-1',  type: 'hydration',  x: 665, y: 355, label: 'Hydration Station' },
  { id: 'hy-2',  type: 'hydration',  x: 425, y: 530, label: 'Hydration Station' },
  { id: 'hy-3',  type: 'hydration',  x: 360, y: 665, label: 'Hydration Station' },
  // Rideshare
  { id: 'rs-1',  type: 'rideshare',  x: 882, y: 210, label: 'Rideshare Pickup/Drop-off' },
  { id: 'rs-2',  type: 'rideshare',  x: 260, y: 720, label: 'Rideshare Pickup/Drop-off' },
  // Shuttle
  { id: 'sh-1',  type: 'shuttle',    x: 870, y: 225, label: 'Shuttle Bus Stop' },
  { id: 'sh-2',  type: 'shuttle',    x: 245, y: 730, label: 'Shuttle Bus Stop' },
  // Ticket Office
  { id: 'to-1',  type: 'ticket',     x: 700, y: 215, label: 'Ticket Office (SeatGeek)' },
  // Missing Persons / Lost & Found
  { id: 'mp-1',  type: 'mp',         x: 790, y: 108, label: 'Missing Persons / Lost & Found' },
  // Junior Experience
  { id: 'jr-1',  type: 'junior',     x: 820, y: 230, label: 'Junior Experience' },
  // The 19th Hole (bar)
  { id: '19h-1', type: 'bar',        x: 405, y: 495, label: 'The 19th Hole (Sun Cruiser)' },
  // T-Mobile Range
  { id: 'range', type: 'range',      x: 572, y: 320, label: 'T-Mobile Practice Range' },
  // USGA Experience
  { id: 'usga',  type: 'usga',       x: 628, y: 240, label: 'USGA Experience' },
  // Merchandise
  { id: 'merch', type: 'merch',      x: 690, y: 175, label: 'Merchandise' },
];

export const AMENITY_META = {
  restroom:   { icon: '🚻', color: '#4A90D9', label: 'Restrooms' },
  concession: { icon: '🌭', color: '#E67E22', label: 'Concessions' },
  firstaid:   { icon: '➕', color: '#E74C3C', label: 'First Aid' },
  grandstand: { icon: '🏟', color: '#8E44AD', label: 'Grandstand' },
  hydration:  { icon: '💧', color: '#3498DB', label: 'Hydration Station' },
  rideshare:  { icon: '🚗', color: '#1ABC9C', label: 'Rideshare' },
  shuttle:    { icon: '🚌', color: '#F39C12', label: 'Shuttle Bus' },
  ticket:     { icon: '🎫', color: '#9B59B6', label: 'Ticket Office' },
  mp:         { icon: '🔍', color: '#E74C3C', label: 'Missing Persons / Lost & Found' },
  junior:     { icon: '⭐', color: '#F1C40F', label: 'Junior Experience' },
  bar:        { icon: '🍺', color: '#D35400', label: 'The 19th Hole' },
  range:      { icon: '⛳', color: '#27AE60', label: 'Practice Range' },
  usga:       { icon: '🏆', color: '#C0392B', label: 'USGA Experience' },
  merch:      { icon: '👕', color: '#2C3E50', label: 'Merchandise' },
};

// Fairway path data for stylized course rendering
// Each entry: array of [x, y] control points for the fairway
export const FAIRWAY_PATHS = [
  // Hole 1 fairway (upper right, dogleg right)
  { hole: 1,  d: 'M 760 228 L 790 248 L 810 268 L 800 298 L 780 318 L 760 328' },
  // Hole 2 fairway
  { hole: 2,  d: 'M 720 315 L 700 330 L 685 358 L 680 385 L 690 410 L 710 425' },
  // Hole 3 fairway
  { hole: 3,  d: 'M 608 385 L 630 400 L 650 420 L 660 448 L 655 470 L 645 488' },
  // Hole 4 fairway (short par 3)
  { hole: 4,  d: 'M 445 490 L 440 510 L 438 530' },
  // Hole 5 fairway
  { hole: 5,  d: 'M 312 590 L 298 608 L 285 630 L 275 650 L 268 665' },
  // Hole 6 fairway
  { hole: 6,  d: 'M 255 662 L 278 648 L 305 640 L 330 640 L 352 645' },
  // Hole 7 fairway
  { hole: 7,  d: 'M 385 648 L 400 635 L 418 622 L 438 615 L 458 615' },
  // Hole 8 fairway
  { hole: 8,  d: 'M 512 600 L 515 580 L 520 562 L 525 545 L 528 528' },
  // Hole 9 fairway
  { hole: 9,  d: 'M 510 498 L 518 478 L 525 458 L 528 438 L 525 418 L 520 400' },
  // Hole 10 fairway (short par 4)
  { hole: 10, d: 'M 522 395 L 545 405 L 568 415 L 588 430 L 600 450' },
  // Hole 11 fairway
  { hole: 11, d: 'M 648 468 L 660 490 L 668 512 L 672 535 L 670 558 L 662 575' },
  // Hole 12 fairway
  { hole: 12, d: 'M 828 390 L 808 400 L 785 412 L 762 420 L 742 428 L 722 435' },
  // Hole 13 fairway
  { hole: 13, d: 'M 692 535 L 680 552 L 668 570 L 655 585 L 640 598 L 622 608' },
  // Hole 14 fairway (short par 3)
  { hole: 14, d: 'M 572 562 L 568 578 L 562 595' },
  // Hole 15 fairway
  { hole: 15, d: 'M 478 598 L 468 618 L 455 638 L 438 650 L 420 655' },
  // Hole 16 fairway
  { hole: 16, d: 'M 338 645 L 318 638 L 298 628 L 278 618 L 260 608 L 248 595' },
  // Hole 17 fairway
  { hole: 17, d: 'M 430 632 L 432 612 L 436 590 L 440 568 L 442 548' },
  // Hole 18 fairway
  { hole: 18, d: 'M 378 470 L 370 450 L 360 430 L 348 410 L 338 390 L 330 368' },
];
