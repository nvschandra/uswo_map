// Knowledge base for the interactive Q&A chatbot

const kb = [
  // Event basics
  {
    patterns: ['what is', 'tell me about', 'uswo', 'us women', 'championship', 'event'],
    response: "The **81st U.S. Women's Open Championship** is being held at **The Riviera Country Club** in Pacific Palisades, CA from **June 4–7, 2026**. It's one of the most prestigious events in women's golf, presented by Ally and hosted by the USGA. The championship features the world's top professional golfers competing for the U.S. Women's Open title.",
  },
  {
    patterns: ['dates', 'when', 'schedule', 'days', 'june'],
    response: "The 81st U.S. Women's Open Championship runs **June 4–7, 2026** at The Riviera Country Club. Gates open at **6:00 AM daily**. Practice rounds took place earlier in the week.",
  },
  {
    patterns: ['ticket', 'admission', 'buy ticket', 'how much', 'cost', 'seatgeek', 'price'],
    response: "Tickets are available through **SeatGeek** (the official ticketing partner). The **Ticket Office** is located near Gate 1. Daily grounds passes, weekly badges, and premium hospitality packages are available. Some areas (Champions Pavilion, Palisades Club, Trophy Club, etc.) require special ticket upgrades.",
  },
  // Parking & Transportation
  {
    patterns: ['park', 'parking', 'car', 'drive', 'get here', 'how to get'],
    response: "**There is no on-site public parking** at The Riviera Country Club. Here's how to get here:\n- 🚌 **Shuttle Buses** depart from multiple off-site lots (see shuttle stops on the map)\n- 🚗 **Rideshare** (Uber/Lyft) drop-off is near **Gate 2** on the north side\n- 🚇 **Public Transit**: Metro Bus routes serve Pacific Palisades\n\nWe strongly recommend using rideshare or shuttle service.",
  },
  {
    patterns: ['rideshare', 'uber', 'lyft', 'drop off', 'pickup'],
    response: "**Rideshare** (Uber/Lyft) drop-off and pickup points are available at **two locations**:\n1. **Near Gate 2** — north side of the property (recommended for morning arrival)\n2. **South entrance** — near the 6th hole area\n\nBook your return ride inside the venue to avoid waiting outside. The T-Mobile Benefits Hub also offers exclusive ride benefits for T-Mobile customers.",
  },
  {
    patterns: ['shuttle', 'bus', 'general public shuttle'],
    response: "**Free shuttle buses** run from multiple off-site parking locations throughout the day. Shuttle stops are marked on the map at the **north** and **south** sides of the property. Shuttles run from lot opening until 1 hour after the final group finishes each day.",
  },
  // Gates
  {
    patterns: ['gate', 'entrance', 'enter', 'entry', 'way in'],
    response: "There are **3 public gate locations**:\n- **Gate 1** – Main entrance, Capri Drive (most popular, near merchandise and ticket office)\n- **Gate 2** – Secondary north entrance, good for rideshare drop-off\n- **Gate 3/4** – Upper-left dual entry, best for Palisades Club and Member Hospitality guests\n\nAll gates open at **6:00 AM** daily. Proper tickets or credentials are required.",
  },
  // Food & Beverage
  {
    patterns: ['food', 'eat', 'hungry', 'dining', 'restaurant', 'lunch', 'breakfast', 'dinner', 'snack'],
    response: "You've got great options for food:\n- 🌭 **Concession stands** are scattered throughout the course (5 locations on the map)\n- 🏡 **Village on 18** – Public food vendors near the 18th hole\n- 🏆 **Champions Pavilion** – Premium chef-curated dining (ticket required)\n- 🎡 **Hero Pavilion** – Casual dining with beverages\n- 🍹 **Palisades Club** – Southern California-inspired cuisine (ticket required)\n- 🍺 **The 19th Hole** (featuring Sun Cruiser) – Public bar/beverage area near holes 4 and 18\n\nTip: Concessions near holes 3 and 9 tend to have shorter lines mid-round.",
  },
  {
    patterns: ['drink', 'water', 'hydration', 'thirsty', 'beverage'],
    response: "Stay hydrated! **Hydration Stations** provide free water at 3 locations on the course:\n- Near holes 3/10 (center)\n- Near holes 4/18 (center)\n- Near hole 7 (lower section)\n\nAdditionally, concession stands sell beverages, and premium hospitality areas (Champions Pavilion, Palisades Club) have full bar service.",
  },
  {
    patterns: ['bar', 'beer', 'alcohol', 'wine', 'cocktail', '19th hole', 'sun cruiser'],
    response: "**The 19th Hole featuring Sun Cruiser** is the official fan bar, located centrally near holes 4 and 18. It offers craft beers, seltzers, and cocktails. Premium bars are also available in the **Champions Pavilion**, **Palisades Club**, and **Trophy Club** (ticket required).",
  },
  // Restrooms
  {
    patterns: ['restroom', 'bathroom', 'toilet', 'porta', 'wc', 'loo'],
    response: "**Restrooms** are located at **8 spots** around the course:\n1. Near Gate 1 / Merchandise area\n2. Near holes 3/10 (center fairways)\n3. Near hole 4 / hole 18 (center)\n4. Near hole 5 (lower left)\n5. Near holes 6/7 (lower section)\n6. Near holes 8/14 (lower right)\n7. Near holes 11/12 (right side)\n8. Near holes 1/2 (upper right)\n\nAll restroom facilities include accessible units. Disability services are available — ask any marshal for assistance.",
  },
  // First Aid
  {
    patterns: ['first aid', 'medical', 'hurt', 'injured', 'sick', 'doctor', 'nurse', 'emergency'],
    response: "**First Aid stations** are at 3 locations:\n1. **Upper right** – near holes 1 and 2\n2. **Center** – near holes 8 and 15\n3. **Lower left** – near holes 5 and 16\n\nFor emergencies, alert the nearest marshal or USGA staff immediately — they can radio for medical assistance. AEDs are located at each First Aid station.",
  },
  // Accessibility
  {
    patterns: ['disability', 'wheelchair', 'accessible', 'mobility', 'ada', 'handicap'],
    response: "The USGA is committed to accessibility. **Disability Services** include:\n- Wheelchair-accessible restrooms at all 8 restroom locations\n- Accessible viewing areas at grandstands (all 4 locations)\n- Complimentary wheelchair/cart transportation — check with the Disability Services desk near Gate 1\n- Hearing loop systems at the leaderboard/scoring areas\n\nFor assistance, contact any marshal or USGA staff member.",
  },
  // Hospitality areas — broad patterns first
  {
    patterns: ['pavilion', 'hospitality', 'vip', 'premium', 'where to sit', 'seating'],
    response: "There are several **hospitality areas** on the course:\n- 🥇 **Champions Pavilion (CP)** — premium dining, air conditioning, views of 4/9/18 *(ticket upgrade required)*\n- 🎯 **Hero Pavilion (HP)** — casual food, live scoring, views of 4/18 *(ticket upgrade required)*\n- 🍹 **Palisades Club (PC)** — SoCal cuisine, craft cocktails, near Gate 3/4 *(ticket required)*\n- 🏆 **Trophy Club (TC)** — USGA exhibits, dining, near holes 13/14 *(ticket required)*\n- 🌿 **Village on 18 (18G)** — food vendors, fan zone, finishing hole views *(FREE with grounds pass)*\n- 🎪 **Suites on 14 (14G)** — private suites behind the 14th green *(premium ticket)*\n\nTap any of the colored circle markers on the map for details on each!",
  },
  {
    patterns: ['champions pavilion', 'cp'],
    response: "**Champions Pavilion (CP)** is a premium hospitality experience located centrally near holes 4, 9, and 18. Features include:\n- Chef-curated cuisine and premium dining\n- Air-conditioned indoor spaces\n- Premium open bar\n- Private restrooms\n- Stunning views of the 18th green amphitheater\n\nA **Champions Pavilion ticket upgrade** is required in addition to standard grounds admission.",
  },
  {
    patterns: ['hero pavilion', 'hp'],
    response: "**Hero Pavilion (HP)** offers a great spectator experience near the 4th and 18th holes. It features casual food, beverages, live scoring, and outdoor seating. A **Hero Pavilion ticket** is required.",
  },
  {
    patterns: ['palisades club', 'pc club'],
    response: "**Palisades Club (PC)** is located near Gate 3/4 in the upper-left section. It features Southern California-inspired cuisine, craft cocktails, and a beautiful outdoor lounge with course views. Requires a **Palisades Club hospitality ticket**.",
  },
  {
    patterns: ['trophy club', 'tc'],
    response: "**Trophy Club (TC)** is positioned near holes 13 and 14, featuring USGA trophy displays, historical exhibits, premium dining, and a private bar. Requires a **Trophy Club ticket upgrade**.",
  },
  {
    patterns: ['village on 18', '18g', 'village on eighteen', 'village'],
    response: "**Village on 18 (18G)** is a **FREE public fan zone** located in the 18th fairway bowl. It offers:\n- Multiple food vendors\n- Beverage options\n- Sponsor activations\n- Incredible views of the finishing hole\n\nNo upgrade ticket required — just your standard grounds pass!",
  },
  {
    patterns: ['suites on 14', '14g', 'suite', '14th'],
    response: "**Suites on 14 (14G)** offers elevated private suite experiences directly behind the 14th green — a dramatic par-3. Features private catering and bar service. Requires a premium **Suites on 14 ticket**.",
  },
  // Experiences
  {
    patterns: ['usga experience', 'golfzon', 'simulator', 'grn putting', 'deloitte'],
    response: "The **USGA Experience** (open to the public!) is located near Gate 1. It includes:\n- **GOLFZON** golf simulator\n- **GRN Putting** experience — read greens like a pro\n- **Rules AI** — ask our AI expert any rules question (powered by Deloitte)\n- History of the U.S. Women's Open exhibit\n- Ally championship print collection by Inciardi",
  },
  {
    patterns: ['mini print', 'inciardi', 'art', 'print', 'anastasia'],
    response: "**Exclusive Ally & USWO Mini Prints by Inciardi** are available throughout the course. Travel the course to collect unique mini prints themed around the U.S. Women's Open Presented by Ally. Learn more about Ally as Presenting Partner of the championship.",
  },
  {
    patterns: ['merchandise', 'merch', 'shop', 'buy', 'souvenir', 'peter millar', 'clothing', 'apparel'],
    response: "The **Merchandise shop** is located near Gate 1. It features:\n- Official U.S. Women's Open apparel\n- Peter Millar (USGA Official Outfitter) collections\n- Branded accessories and souvenirs\n- Championship commemorative items\n\nThere's something for every budget!",
  },
  {
    patterns: ['trophy', 'lexus', 'trophy experience', 'photo', 'commemorative'],
    response: "The **U.S. Women's Open Trophy Experience hosted by Lexus** lets you take a commemorative photo with the actual U.S. Women's Open Trophy! Also explore the latest Lexus vehicles. **Open Wednesday–Sunday** during championship week.",
  },
  {
    patterns: ['t-mobile', 'tmobile', 't mobile', 'benefits hub', 'wireless'],
    response: "The **T-Mobile Benefits Hub** is located near the T-Mobile Practice Range. T-Mobile members can claim:\n- Complimentary food and beverage vouchers\n- Premium giveaways\n- Access to reserved viewing areas around the course\n\nLook for the T-Mobile signage — it's a great perk for customers!",
  },
  {
    patterns: ['wifi', 'wi-fi', 'internet', 'connect', 'online'],
    response: "**Free Wi-Fi** is available throughout the venue! Connect to **\"U.S. Open Fan Wi-Fi\"** — powered by Cisco and available in designated areas. Look for Wi-Fi signs near grandstands, hospitality pavilions, and the USGA Experience.",
  },
  {
    patterns: ['app', 'usga app', 'tee times', 'scoring', 'leaderboard', 'score'],
    response: "For **live tee times, scoring, and an interactive digital map**, download the **USGA App**. Available for iOS and Android. The app provides real-time leaderboard updates, player stats, and hole-by-hole course information.",
  },
  {
    patterns: ['junior', 'kids', 'children', 'youth', 'family'],
    response: "The **Junior Experience** is located in the upper right area near Gate 2. It's a fun zone for young golf fans with activities, skills challenges, and autograph opportunities. Kids love it! The USGA is committed to growing the game for the next generation.",
  },
  {
    patterns: ['lost', 'missing', 'lost and found', 'lost person', 'find someone'],
    response: "**Missing Persons / Lost & Found (MP)** is located at the top-center of the property, near the main championship operations area. If you lose a member of your group or find a lost item:\n- Go to the **MP station** directly\n- Alert the nearest marshal — they have radio contact with the MP center\n- The MP location is also where credentials and tickets can be replaced if lost.",
  },
  // Course / holes
  {
    patterns: ['hole 4', 'fourth hole', 'famous hole', 'bunker green', 'bunker in the green'],
    response: "**Hole 4** at Riviera is one of golf's most iconic holes — a **par-3 at 236 yards** with a **bunker IN THE MIDDLE of the green**! It's one of the only holes in major championship golf with this unique feature. Players must decide whether to land left or right of the bunker. Must-see for any fan! The Champions Pavilion and Hero Pavilion offer great views.",
  },
  {
    patterns: ['hole 18', 'eighteenth', 'finishing hole', 'amphitheater'],
    response: "**Hole 18** is the stunning par-4 finishing hole at Riviera, famous for its **amphitheater green** surrounded by grandstands. It's one of the best Sunday theatre holes in golf. The Village on 18 (free access) gives incredible viewing, or upgrade to the Champions Pavilion for the ultimate finish-line experience.",
  },
  {
    patterns: ['hole 10', 'tenth hole', 'driveable', 'shortest par'],
    response: "**Hole 10** is a famous short par-4 at just **315 yards** — possibly driveable for the long hitters on the LPGA Tour! It's a classic risk/reward hole that starts the back nine with potential birdies and eagles.",
  },
  {
    patterns: ['riviera', 'riviera country club', 'course', 'layout', 'history'],
    response: "**The Riviera Country Club** in Pacific Palisades, CA is one of America's most historic and celebrated golf courses. Known as the \"Riviera of the West,\" it regularly hosts PGA Tour events and is beloved for its championship conditions. The course features iconic holes like the par-3 4th with a bunker in the green, and the amphitheater 18th. It's a true test of championship golf.",
  },
  {
    patterns: ['par', 'total par', 'yardage', 'total yards', 'course length'],
    response: "The Riviera Country Club championship layout plays to a **par of 71** with a total yardage of approximately **6,700+ yards** for the women's championship setup. Notable holes:\n- Par-3 4th: 236 yards (bunker in the green!)\n- Par-3 5th: 186 yards\n- Par-5 2nd: 480 yards\n- Par-5 16th: 578 yards\n- Short par-4 10th: 315 yards (driveable!)",
  },
  // General help
  {
    patterns: ['help', 'what can you do', 'what can i ask', 'how does this work'],
    response: "I'm your **USWO 2026 guide**! You can ask me about:\n- 📍 **Locations** — 'Where is the Champions Pavilion?'\n- 🍔 **Food & Drinks** — 'Where can I eat?'\n- 🚻 **Restrooms** — 'Where's the nearest restroom to hole 7?'\n- 🚗 **Transportation** — 'How do I get here?'\n- 🎟️ **Tickets** — 'What tickets do I need?'\n- ⛳ **Holes** — 'Tell me about hole 4'\n- ♿ **Accessibility** — 'What disability services are available?'\n- 📱 **Apps & WiFi** — 'Is there free WiFi?'\n\nClick any location on the map for details, or just ask me anything!",
  },
  {
    patterns: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon'],
    response: "Welcome to the **81st U.S. Women's Open Championship** at The Riviera Country Club! ⛳\n\nI'm your interactive map guide. Click any location on the map to learn more, or ask me anything about the event — from finding food and restrooms to learning about specific holes and hospitality areas. Enjoy the championship! 🏆",
  },
];

// Strip common nav words so "where are the pavilions" → "pavilions"
function normalize(q) {
  return q
    .toLowerCase()
    .replace(/where (is|are|can i find|do i find|can i get)/g, '')
    .replace(/\b(the|a|an|is|are|there|any|some|find|get|go to|show me|tell me about|what is|what are|how do i|how to|i need|i want|looking for|i'm looking for)\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getResponse(query) {
  const q = normalize(query);

  // Find best matching entry
  let bestMatch = null;
  let bestScore = 0;

  for (const entry of kb) {
    let score = 0;
    for (const pattern of entry.patterns) {
      if (q.includes(pattern)) {
        score += pattern.length; // longer pattern = more specific match
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch.response;
  }

  // Hole-number queries
  const holeMatch = q.match(/hole\s+(\d+)|(\d+)(st|nd|rd|th)\s+hole/);
  if (holeMatch) {
    const num = parseInt(holeMatch[1] || holeMatch[2]);
    if (num >= 1 && num <= 18) {
      return `**Hole ${num}** is highlighted on the map! Click on it to see full details including par, yardage, and strategy notes. You can also use the search box above the map to filter locations.`;
    }
  }

  return "I'm not sure about that one — but I'm learning! Try asking about **food**, **restrooms**, **transportation**, **specific holes**, **hospitality areas**, or **fan experiences**. You can also click any marker on the map for instant details. Type **'help'** to see everything I know about!";
}
