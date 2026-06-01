import { useState, useRef } from 'react';
import { HOLES, GATES, VENUES, AMENITIES, AMENITY_META } from '../data/locations.js';

// All coordinates on a 1000 × 720 viewBox
// Layout faithfully matches the official championship map photo

const COURSE_BOUNDARY = `
  M 680,138 L 730,145 L 790,150 L 850,162 L 878,180 L 870,202
  L 840,212 L 850,228 L 848,258 L 830,290 L 818,318 L 825,355
  L 825,385 L 808,408 L 788,422 L 768,442 L 750,462 L 738,490
  L 728,515 L 718,540 L 705,562 L 692,582 L 678,600 L 660,618
  L 638,630 L 615,640 L 590,648 L 562,652 L 535,650 L 508,648
  L 480,648 L 452,648 L 425,648 L 398,645 L 372,640 L 348,632
  L 322,620 L 298,605 L 276,588 L 258,568 L 242,546 L 228,522
  L 218,498 L 214,472 L 218,446 L 228,422 L 242,400 L 258,380
  L 268,358 L 272,334 L 272,310 L 278,286 L 292,265 L 310,248
  L 332,236 L 358,228 L 388,222 L 420,218 L 455,215 L 490,214
  L 525,215 L 558,218 L 590,222 L 622,225 L 652,228 L 670,220
  L 672,182 L 668,158 Z
`;

// Fairway paths — wide, organic strokes
const FAIRWAYS = [
  // Hole 1 — dogleg right, upper right
  { hole: 1,  d: 'M 758,218 C 785,230 808,248 818,272 C 828,296 820,318 808,332 C 796,346 778,352 762,348' },
  // Hole 2 — par 5 going south
  { hole: 2,  d: 'M 715,308 C 705,330 696,355 692,382 C 688,408 696,428 710,440 C 718,448 728,452 738,448' },
  // Hole 3 — dogleg
  { hole: 3,  d: 'M 612,378 C 638,390 660,408 672,432 C 682,452 678,472 668,486 C 658,498 645,504 632,502' },
  // Hole 4 — par 3, short
  { hole: 4,  d: 'M 442,488 C 448,505 452,522 450,540 C 448,555 440,564 428,566' },
  // Hole 5 — par 3
  { hole: 5,  d: 'M 308,582 C 295,598 282,614 272,632 C 265,644 260,654 258,662' },
  // Hole 6 — short par 4, dogleg
  { hole: 6,  d: 'M 250,658 C 268,648 292,640 316,638 C 338,636 358,640 372,646' },
  // Hole 7
  { hole: 7,  d: 'M 382,645 C 398,638 418,628 438,620 C 458,612 475,610 490,614' },
  // Hole 8
  { hole: 8,  d: 'M 510,598 C 514,580 518,560 518,540 C 518,522 514,508 506,498' },
  // Hole 9 — uphill to clubhouse
  { hole: 9,  d: 'M 510,495 C 512,472 514,450 514,428 C 514,408 510,390 504,378' },
  // Hole 10 — short, going right
  { hole: 10, d: 'M 520,390 C 542,400 565,414 582,430 C 596,444 604,460 606,476' },
  // Hole 11 — long par 4
  { hole: 11, d: 'M 644,465 C 655,488 664,512 668,536 C 672,558 668,578 658,592' },
  // Hole 12 — far right
  { hole: 12, d: 'M 820,385 C 800,396 778,410 758,422 C 738,432 720,438 704,436' },
  // Hole 13
  { hole: 13, d: 'M 690,532 C 680,552 668,570 655,586 C 644,598 630,606 615,608' },
  // Hole 14 — par 3
  { hole: 14, d: 'M 568,558 C 564,575 558,592 550,604' },
  // Hole 15
  { hole: 15, d: 'M 476,596 C 466,614 454,632 440,644 C 428,654 415,658 402,655' },
  // Hole 16 — par 5
  { hole: 16, d: 'M 336,642 C 316,634 296,624 278,612 C 262,600 250,585 244,568' },
  // Hole 17
  { hole: 17, d: 'M 428,630 C 432,610 436,588 438,566 C 440,546 438,530 432,518' },
  // Hole 18 — amphitheater finishing hole
  { hole: 18, d: 'M 378,466 C 368,444 356,422 342,400 C 330,380 316,362 304,348' },
];

// Approximate green locations (small circles at end of each fairway)
const GREENS = [
  { hole: 1,  cx: 762, cy: 348 },
  { hole: 2,  cx: 738, cy: 448 },
  { hole: 3,  cx: 630, cy: 502 },
  { hole: 4,  cx: 428, cy: 566 },
  { hole: 5,  cx: 258, cy: 662 },
  { hole: 6,  cx: 372, cy: 646 },
  { hole: 7,  cx: 490, cy: 614 },
  { hole: 8,  cx: 506, cy: 498 },
  { hole: 9,  cx: 504, cy: 378 },
  { hole: 10, cx: 606, cy: 476 },
  { hole: 11, cx: 658, cy: 592 },
  { hole: 12, cx: 704, cy: 436 },
  { hole: 13, cx: 615, cy: 608 },
  { hole: 14, cx: 550, cy: 604 },
  { hole: 15, cx: 402, cy: 655 },
  { hole: 16, cx: 244, cy: 568 },
  { hole: 17, cx: 432, cy: 518 },
  { hole: 18, cx: 304, cy: 348 },
];

// Bunker blobs (approximate positions near key holes)
const BUNKERS = [
  { cx: 770, cy: 260, rx: 12, ry: 7 },
  { cx: 800, cy: 268, rx: 8, ry: 5 },
  { cx: 700, cy: 435, rx: 10, ry: 6 },
  { cx: 435, cy: 560, rx: 14, ry: 8 },  // hole 4 — famous bunker IN green
  { cx: 435, cy: 558, rx: 5, ry: 4 },
  { cx: 505, cy: 496, rx: 10, ry: 6 },
  { cx: 656, cy: 585, rx: 10, ry: 6 },
  { cx: 612, cy: 600, rx: 8, ry: 5 },
  { cx: 303, cy: 346, rx: 12, ry: 7 },  // 18th green bunkers
  { cx: 296, cy: 354, rx: 8, ry: 5 },
  { cx: 630, cy: 498, rx: 8, ry: 5 },
  { cx: 820, cy: 380, rx: 10, ry: 6 },
];

function formatTooltip(type, data) {
  if (type === 'hole') return `Hole ${data.num} — Par ${data.par}, ${data.yards} yds`;
  if (type === 'gate') return data.label;
  if (type === 'venue') return `${data.code}: ${data.label}`;
  if (type === 'amenity') return data.label;
  return '';
}

export default function CourseMap({ onSelect, selected, filter }) {
  const [tooltip, setTooltip] = useState(null);

  const showTip = (e, label) => setTooltip({ x: e.clientX, y: e.clientY, label });
  const hideTip = () => setTooltip(null);

  const selId = selected?.data?.id;

  const visibleAmenities = filter
    ? AMENITIES.filter(a => a.type === filter)
    : AMENITIES;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <svg
        viewBox="0 0 1000 720"
        style={{ width: '100%', height: '100%', display: 'block' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#122d5a" />
            <stop offset="100%" stopColor="#081428" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.5" />
          </filter>
          <filter id="markerShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Sky / background */}
        <rect width="1000" height="720" fill="url(#bgGrad)" />

        {/* ── COURSE ROUGH ───────────────────────────────────── */}
        <path d={COURSE_BOUNDARY} fill="#1a5c2c" opacity="0.85" />

        {/* ── PRACTICE RANGE ─────────────────────────────────── */}
        <rect x="468" y="218" width="185" height="128" rx="10" fill="#1d6632" opacity="0.9" />
        <rect x="470" y="220" width="181" height="124" rx="9" fill="none" stroke="#2d8e47" strokeWidth="1.5" strokeDasharray="5,3" opacity="0.7" />
        <text x="560" y="268" textAnchor="middle" fill="#45b85a" fontSize="11.5" fontWeight="700" opacity="0.95">T-MOBILE</text>
        <text x="560" y="284" textAnchor="middle" fill="#45b85a" fontSize="11.5" fontWeight="700" opacity="0.95">PRACTICE RANGE</text>

        {/* ── FAIRWAYS ───────────────────────────────────────── */}
        {FAIRWAYS.map(fw => (
          <path
            key={fw.hole}
            d={fw.d}
            stroke="#3aaa52"
            strokeWidth="28"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.85"
          />
        ))}

        {/* Fairway edges (slightly lighter) */}
        {FAIRWAYS.map(fw => (
          <path
            key={`edge-${fw.hole}`}
            d={fw.d}
            stroke="#50c86a"
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.5"
          />
        ))}

        {/* ── GREENS ─────────────────────────────────────────── */}
        {GREENS.map(g => (
          <g key={`green-${g.hole}`}>
            <ellipse cx={g.cx} cy={g.cy} rx={16} ry={13} fill="#5dd673" opacity="0.9" />
            <ellipse cx={g.cx} cy={g.cy} rx={16} ry={13} fill="none" stroke="#8aeea0" strokeWidth="1.5" opacity="0.7" />
          </g>
        ))}

        {/* ── BUNKERS ────────────────────────────────────────── */}
        {BUNKERS.map((b, i) => (
          <ellipse key={i} cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry}
            fill="#c8b45a" opacity="0.7" />
        ))}

        {/* ── GATES ──────────────────────────────────────────── */}
        {GATES.map(g => {
          const isSel = selId === g.id;
          // Map gate position from lat/lng back to approx SVG coords
          const pos = {
            'gate-1':  { x: 765, y: 162 },
            'gate-2':  { x: 848, y: 178 },
            'gate-34': { x: 648, y: 192 },
          }[g.id];
          return (
            <g key={g.id} style={{ cursor: 'pointer' }}
              onClick={() => onSelect({ type: 'gate', data: g })}
              onMouseEnter={e => showTip(e, g.label)}
              onMouseLeave={hideTip}
            >
              <rect x={pos.x - 28} y={pos.y - 13} width={56} height={26} rx={5}
                fill={isSel ? '#e8bf4b' : '#c9a227'}
                stroke={isSel ? '#fff' : 'rgba(255,255,255,0.4)'} strokeWidth={isSel ? 2 : 1}
                filter="url(#markerShadow)" />
              <text x={pos.x} y={pos.y + 5} textAnchor="middle"
                fill="#0d2240" fontSize="9" fontWeight="800" letterSpacing="0.5">
                {g.label}
              </text>
            </g>
          );
        })}

        {/* ── VENUE MARKERS ──────────────────────────────────── */}
        {VENUES.map(v => {
          const isSel = selId === v.id;
          const pos = {
            'cp':  { x: 458, y: 516 },
            'hp':  { x: 468, y: 508 },
            'mc':  { x: 628, y: 244 },
            'mh':  { x: 660, y: 220 },
            'pc':  { x: 643, y: 232 },
            'tc':  { x: 600, y: 549 },
            'uh':  { x: 730, y: 552 },
            '18g': { x: 300, y: 460 },
            'vh':  { x: 720, y: 586 },
            'vv':  { x: 818, y: 192 },
            '14g': { x: 570, y: 540 },
          }[v.id] || { x: 500, y: 400 };
          return (
            <g key={v.id} style={{ cursor: 'pointer' }}
              onClick={() => onSelect({ type: 'venue', data: v })}
              onMouseEnter={e => showTip(e, v.label)}
              onMouseLeave={hideTip}
            >
              {isSel && <circle cx={pos.x} cy={pos.y} r={18} fill={v.color} opacity={0.3} />}
              <circle cx={pos.x} cy={pos.y} r={14}
                fill={v.color} opacity={isSel ? 1 : 0.88}
                stroke={isSel ? '#fff' : 'rgba(255,255,255,0.5)'} strokeWidth={isSel ? 2.5 : 1.5}
                filter="url(#markerShadow)" />
              <text x={pos.x} y={pos.y + 4} textAnchor="middle"
                fill="#fff" fontSize={v.code.length > 2 ? '8' : '9'} fontWeight="800">
                {v.code}
              </text>
            </g>
          );
        })}

        {/* ── AMENITY MARKERS ────────────────────────────────── */}
        {visibleAmenities.map(a => {
          const meta = AMENITY_META[a.type];
          if (!meta) return null;
          const isSel = selId === a.id;
          const pos = {
            'rr-1': { x: 702, y: 186 }, 'rr-2': { x: 562, y: 346 },
            'rr-3': { x: 402, y: 458 }, 'rr-4': { x: 272, y: 558 },
            'rr-5': { x: 402, y: 612 }, 'rr-6': { x: 582, y: 518 },
            'rr-7': { x: 702, y: 428 }, 'rr-8': { x: 818, y: 338 },
            'cc-1': { x: 735, y: 262 }, 'cc-2': { x: 562, y: 428 },
            'cc-3': { x: 342, y: 532 }, 'cc-4': { x: 458, y: 642 },
            'cc-5': { x: 632, y: 578 },
            'fa-1': { x: 718, y: 278 }, 'fa-2': { x: 452, y: 558 },
            'fa-3': { x: 312, y: 622 },
            'gs-1': { x: 748, y: 248 }, 'gs-2': { x: 475, y: 476 },
            'gs-3': { x: 598, y: 542 }, 'gs-4': { x: 652, y: 502 },
            'hy-1': { x: 668, y: 352 }, 'hy-2': { x: 428, y: 528 },
            'hy-3': { x: 362, y: 662 },
            'rs-1': { x: 880, y: 208 }, 'sh-1': { x: 868, y: 222 },
            'sh-2': { x: 248, y: 728 },
            'to-1': { x: 698, y: 212 },
            'mp-1': { x: 788, y: 106 },
            'jr-1': { x: 818, y: 228 },
            '19h-1':{ x: 408, y: 492 },
            'range':{ x: 560, y: 282 },
            'usga': { x: 630, y: 238 },
            'merch':{ x: 688, y: 172 },
          }[a.id] || { x: 500, y: 360 };
          return (
            <g key={a.id} style={{ cursor: 'pointer' }}
              onClick={() => onSelect({ type: 'amenity', data: a })}
              onMouseEnter={e => showTip(e, a.label)}
              onMouseLeave={hideTip}
            >
              {isSel && <circle cx={pos.x} cy={pos.y} r={14} fill={meta.color} opacity={0.35} />}
              <circle cx={pos.x} cy={pos.y} r={10}
                fill={meta.color} opacity={isSel ? 1 : 0.9}
                stroke={isSel ? '#fff' : 'rgba(255,255,255,0.4)'} strokeWidth={isSel ? 2 : 1}
                filter="url(#markerShadow)" />
              <text x={pos.x} y={pos.y + 3.5} textAnchor="middle" fontSize="9" dominantBaseline="auto">
                {meta.icon}
              </text>
            </g>
          );
        })}

        {/* ── HOLE MARKERS ───────────────────────────────────── */}
        {HOLES.map(h => {
          const isSel = selId === h.id;
          const pos = {
            1: { x: 758, y: 218 }, 2: { x: 715, y: 308 }, 3: { x: 612, y: 378 },
            4: { x: 442, y: 488 }, 5: { x: 308, y: 582 }, 6: { x: 250, y: 658 },
            7: { x: 382, y: 645 }, 8: { x: 510, y: 598 }, 9: { x: 510, y: 495 },
            10:{ x: 520, y: 390 }, 11:{ x: 644, y: 465 }, 12:{ x: 820, y: 385 },
            13:{ x: 690, y: 532 }, 14:{ x: 568, y: 558 }, 15:{ x: 476, y: 596 },
            16:{ x: 336, y: 642 }, 17:{ x: 428, y: 630 }, 18:{ x: 378, y: 466 },
          }[h.num];
          return (
            <g key={h.id} style={{ cursor: 'pointer' }}
              onClick={() => onSelect({ type: 'hole', data: h })}
              onMouseEnter={e => showTip(e, `Hole ${h.num} — Par ${h.par}, ${h.yards} yds`)}
              onMouseLeave={hideTip}
            >
              {isSel && <circle cx={pos.x} cy={pos.y} r={22} fill="#fff" opacity={0.2} />}
              <circle cx={pos.x} cy={pos.y} r={16}
                fill={isSel ? '#fff' : '#0d2240'}
                stroke={isSel ? '#c9a227' : '#fff'}
                strokeWidth={isSel ? 3 : 2.5}
                filter="url(#markerShadow)" />
              <text x={pos.x} y={pos.y + 5} textAnchor="middle"
                fill={isSel ? '#0d2240' : '#fff'}
                fontSize={h.num >= 10 ? '11' : '13'} fontWeight="800">
                {h.num}
              </text>
            </g>
          );
        })}

        {/* ── HOLE 4 SPECIAL LABEL ───────────────────────────── */}
        <text x={442} y={628} textAnchor="middle" fill="rgba(255,220,100,0.7)"
          fontSize="9" fontWeight="600" fontStyle="italic">
          ★ bunker in green
        </text>

        {/* ── 18th amphitheater callout ──────────────────────── */}
        <text x={300} y={372} textAnchor="middle" fill="rgba(255,255,255,0.5)"
          fontSize="8.5" fontWeight="600">amphitheater</text>

        {/* ── COMPASS ────────────────────────────────────────── */}
        <g transform="translate(56, 668)">
          <circle r={22} fill="rgba(8,20,40,0.85)" stroke="#c9a227" strokeWidth={1.5} />
          <text y={-9} textAnchor="middle" fill="#c9a227" fontSize="11" fontWeight="700">N</text>
          <path d="M0,-17 L3.5,-5 L0,0 L-3.5,-5 Z" fill="#c9a227" />
          <path d="M0,17 L3.5,5 L0,0 L-3.5,5 Z" fill="#4a6a8a" />
        </g>

        {/* ── SCALE ──────────────────────────────────────────── */}
        <g transform="translate(880,656)">
          <line x1={0} y1={8} x2={80} y2={8} stroke="#fff" strokeWidth={1.5} opacity={0.5} />
          <line x1={0} y1={4} x2={0}  y2={12} stroke="#fff" strokeWidth={1.5} opacity={0.5} />
          <line x1={80} y1={4} x2={80} y2={12} stroke="#fff" strokeWidth={1.5} opacity={0.5} />
          <text x={40} y={22} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10">≈ 500 yds</text>
        </g>

        {/* ── WATERMARK ──────────────────────────────────────── */}
        <text x={500} y={710} textAnchor="middle"
          fill="rgba(201,162,39,0.2)" fontSize="12" fontWeight="700" letterSpacing="2">
          THE RIVIERA COUNTRY CLUB · JUNE 4–7, 2026
        </text>
      </svg>

      {tooltip && (
        <div className="map-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          {tooltip.label}
        </div>
      )}
    </div>
  );
}
