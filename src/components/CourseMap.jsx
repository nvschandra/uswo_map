import { useState, useRef } from 'react';
import { HOLES, GATES, VENUES, AMENITIES, AMENITY_META, FAIRWAY_PATHS } from '../data/locations.js';

const VB_W = 1000;
const VB_H = 740;

function formatMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
}

export default function CourseMap({ onSelect, selected, filter }) {
  const [tooltip, setTooltip] = useState(null);
  const svgRef = useRef(null);

  const showTip = (e, label) => setTooltip({ x: e.clientX, y: e.clientY, label });
  const hideTip = () => setTooltip(null);

  const isMatch = (id) => !filter || filter === id || filter === 'all';

  const visibleAmenities = filter && filter !== 'all'
    ? AMENITIES.filter(a => a.type === filter)
    : AMENITIES;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        style={{ width: '100%', height: '100%', display: 'block' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="bgGrad" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#163e6b" />
            <stop offset="100%" stopColor="#0a1c38" />
          </radialGradient>
          <filter id="blur2" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.5" />
          </filter>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#c9a227" opacity="0.7" />
          </marker>
        </defs>

        {/* Background */}
        <rect width={VB_W} height={VB_H} fill="url(#bgGrad)" />

        {/* Rough / course boundary — large organic shape */}
        <ellipse cx="550" cy="420" rx="430" ry="290" fill="#1a4a28" opacity="0.4" />

        {/* Practice range area */}
        <rect x="488" y="248" width="172" height="118" rx="12" fill="#1a5c2a" opacity="0.55" />
        <text x="574" y="292" textAnchor="middle" fill="#4dba65" fontSize="11" fontWeight="700" opacity="0.9">T-MOBILE</text>
        <text x="574" y="306" textAnchor="middle" fill="#4dba65" fontSize="11" fontWeight="700" opacity="0.9">PRACTICE RANGE</text>

        {/* Fairway paths */}
        {FAIRWAY_PATHS.map(fp => (
          <path
            key={fp.hole}
            d={fp.d}
            stroke="#2d8a45"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.55"
          />
        ))}

        {/* Walking paths */}
        <path d="M 700 180 L 680 210 L 660 198 L 648 225" stroke="#4a90d9" strokeWidth="2" strokeDasharray="6,4" fill="none" opacity="0.5" />
        <path d="M 760 168 L 750 195 L 735 220" stroke="#4a90d9" strokeWidth="2" strokeDasharray="6,4" fill="none" opacity="0.5" />
        <path d="M 460 490 L 410 505 L 375 480" stroke="#4a90d9" strokeWidth="2" strokeDasharray="6,4" fill="none" opacity="0.5" />

        {/* Greens (small lighter green circles at hole markers) */}
        {HOLES.map(h => (
          <circle key={`green-${h.id}`} cx={h.x} cy={h.y} r={16} fill="#3dab57" opacity="0.4" filter="url(#blur2)" />
        ))}

        {/* ── GATES ─────────────────────────────────────────── */}
        {GATES.map(g => (
          <g
            key={g.id}
            style={{ cursor: 'pointer' }}
            onClick={() => onSelect({ type: 'gate', data: g })}
            onMouseEnter={e => showTip(e, g.label)}
            onMouseLeave={hideTip}
          >
            <rect
              x={g.x - 28} y={g.y - 14}
              width={56} height={28}
              rx={6}
              fill={selected?.data?.id === g.id ? '#e8bf4b' : '#c9a227'}
              stroke={selected?.data?.id === g.id ? '#fff' : 'transparent'}
              strokeWidth={2}
              filter="url(#shadow)"
            />
            <text x={g.x} y={g.y + 5} textAnchor="middle" fill="#0d2240" fontSize="9.5" fontWeight="800" letterSpacing="0.5">
              {g.label}
            </text>
          </g>
        ))}

        {/* ── VENUE MARKERS ─────────────────────────────────── */}
        {VENUES.map(v => {
          const isSelected = selected?.data?.id === v.id;
          return (
            <g
              key={v.id}
              style={{ cursor: 'pointer' }}
              onClick={() => onSelect({ type: 'venue', data: v })}
              onMouseEnter={e => showTip(e, v.label)}
              onMouseLeave={hideTip}
            >
              {isSelected && (
                <circle cx={v.x} cy={v.y} r={18} fill={v.color} opacity={0.35} className="marker-pulse" />
              )}
              <circle
                cx={v.x} cy={v.y} r={14}
                fill={isSelected ? v.color : v.color + 'cc'}
                stroke={isSelected ? '#fff' : 'rgba(255,255,255,0.4)'}
                strokeWidth={isSelected ? 2.5 : 1.5}
                filter="url(#shadow)"
              />
              <text x={v.x} y={v.y + 4.5} textAnchor="middle" fill="#fff" fontSize="9.5" fontWeight="800">
                {v.code}
              </text>
            </g>
          );
        })}

        {/* ── AMENITY MARKERS ───────────────────────────────── */}
        {visibleAmenities.map(a => {
          const meta = AMENITY_META[a.type];
          const isSelected = selected?.data?.id === a.id;
          if (!meta) return null;
          return (
            <g
              key={a.id}
              style={{ cursor: 'pointer' }}
              onClick={() => onSelect({ type: 'amenity', data: a })}
              onMouseEnter={e => showTip(e, a.label)}
              onMouseLeave={hideTip}
            >
              {isSelected && (
                <circle cx={a.x} cy={a.y} r={14} fill={meta.color} opacity={0.35} className="marker-pulse" />
              )}
              <circle
                cx={a.x} cy={a.y} r={10}
                fill={meta.color + (isSelected ? '' : 'bb')}
                stroke={isSelected ? '#fff' : 'rgba(255,255,255,0.3)'}
                strokeWidth={isSelected ? 2 : 1}
                filter="url(#shadow)"
              />
              <text x={a.x} y={a.y + 4} textAnchor="middle" fontSize="9" dominantBaseline="auto">
                {meta.icon}
              </text>
            </g>
          );
        })}

        {/* ── HOLE MARKERS ──────────────────────────────────── */}
        {HOLES.map(h => {
          const isSelected = selected?.data?.id === h.id;
          return (
            <g
              key={h.id}
              style={{ cursor: 'pointer' }}
              onClick={() => onSelect({ type: 'hole', data: h })}
              onMouseEnter={e => showTip(e, `Hole ${h.num} — Par ${h.par}`)}
              onMouseLeave={hideTip}
            >
              {isSelected && (
                <circle cx={h.x} cy={h.y} r={22} fill="#fff" opacity={0.25} className="marker-pulse" />
              )}
              <circle
                cx={h.x} cy={h.y} r={16}
                fill={isSelected ? '#fff' : '#0d2240'}
                stroke={isSelected ? '#c9a227' : '#fff'}
                strokeWidth={isSelected ? 3 : 2}
                filter="url(#shadow)"
              />
              <text
                x={h.x} y={h.y + 5}
                textAnchor="middle"
                fill={isSelected ? '#0d2240' : '#fff'}
                fontSize={h.num >= 10 ? '11' : '13'}
                fontWeight="800"
              >
                {h.num}
              </text>
            </g>
          );
        })}

        {/* ── COMPASS ───────────────────────────────────────── */}
        <g transform="translate(55, 665)">
          <circle cx={0} cy={0} r={22} fill="rgba(13,34,64,0.8)" stroke="#c9a227" strokeWidth={1.5} />
          <text x={0} y={-10} textAnchor="middle" fill="#c9a227" fontSize="11" fontWeight="700">N</text>
          <path d="M0,-16 L4,-4 L0,0 L-4,-4 Z" fill="#c9a227" />
          <path d="M0,16 L4,4 L0,0 L-4,4 Z" fill="#4a6a8a" />
        </g>

        {/* ── SCALE BAR ─────────────────────────────────────── */}
        <g transform="translate(880, 658)">
          <line x1={0} y1={10} x2={80} y2={10} stroke="#fff" strokeWidth={1.5} opacity={0.6} />
          <line x1={0} y1={5}  x2={0}  y2={15} stroke="#fff" strokeWidth={1.5} opacity={0.6} />
          <line x1={80} y1={5} x2={80} y2={15} stroke="#fff" strokeWidth={1.5} opacity={0.6} />
          <text x={40} y={24} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">≈ 500 yds</text>
        </g>

        {/* Championship title watermark */}
        <text x={500} y={715} textAnchor="middle" fill="rgba(201,162,39,0.25)" fontSize="13" fontWeight="700" letterSpacing="2">
          THE RIVIERA COUNTRY CLUB · JUNE 4–7, 2026
        </text>
      </svg>

      {/* Floating tooltip */}
      {tooltip && (
        <div
          className="map-tooltip"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.label}
        </div>
      )}
    </div>
  );
}
