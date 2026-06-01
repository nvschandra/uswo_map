import { useState } from 'react';
import CourseMap from './components/CourseMap.jsx';
import InfoPanel from './components/InfoPanel.jsx';
import ChatPanel from './components/ChatPanel.jsx';
import Legend from './components/Legend.jsx';
import { Search, X } from 'lucide-react';
import { HOLES, GATES, VENUES, AMENITIES, AMENITY_META } from './data/locations.js';

function buildSearchIndex() {
  const items = [];
  HOLES.forEach(h => items.push({ label: `Hole ${h.num} — Par ${h.par}, ${h.yards} yds`, type: 'hole', data: h }));
  GATES.forEach(g => items.push({ label: g.label, type: 'gate', data: g }));
  VENUES.forEach(v => items.push({ label: `${v.code} — ${v.label}`, type: 'venue', data: v }));
  AMENITIES.forEach(a => {
    const meta = AMENITY_META[a.type];
    items.push({ label: `${a.label}${meta ? ' (' + meta.label + ')' : ''}`, type: 'amenity', data: a });
  });
  return items;
}

const SEARCH_INDEX = buildSearchIndex();

export default function App() {
  const [selected, setSelected] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [amenityFilter, setAmenityFilter] = useState(null);

  const handleSearch = (q) => {
    setSearchQuery(q);
    if (!q.trim()) { setSearchResults([]); return; }
    const lower = q.toLowerCase();
    const results = SEARCH_INDEX.filter(item =>
      item.label.toLowerCase().includes(lower)
    ).slice(0, 8);
    setSearchResults(results);
  };

  const handleSelect = (item) => {
    setSelected(item);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* ── HEADER ───────────────────────────────────────────── */}
      <header style={{
        background: 'linear-gradient(135deg, #0d2240 0%, #163459 100%)',
        borderBottom: '2px solid rgba(201,162,39,0.4)',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        flexShrink: 0,
        zIndex: 10,
        boxShadow: '0 2px 16px rgba(0,0,0,0.3)',
      }}>
        {/* Logo / Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <div style={{
            width: 44, height: 44,
            background: 'linear-gradient(135deg, #c9a227, #e8bf4b)',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24,
            boxShadow: '0 2px 10px rgba(201,162,39,0.4)',
          }}>
            ⛳
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 0.5, lineHeight: 1.2 }}>
              81ST U.S. WOMEN'S OPEN
            </div>
            <div style={{ fontSize: 10.5, color: '#c9a227', fontWeight: 600, letterSpacing: 0.5 }}>
              THE RIVIERA COUNTRY CLUB · JUNE 4–7, 2026
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.12)', flexShrink: 0 }} />

        {/* Search */}
        <div style={{ flex: 1, position: 'relative', maxWidth: 420 }}>
          <div style={{ position: 'relative' }}>
            <Search size={15} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#7a8fa8' }} />
            <input
              value={searchQuery}
              onChange={e => handleSearch(e.target.value)}
              placeholder="Search holes, amenities, hospitality..."
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 10,
                padding: '8px 32px 8px 34px',
                color: '#fff',
                fontSize: 13,
                fontFamily: 'inherit',
                outline: 'none',
                transition: 'border-color 0.15s',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(201,162,39,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
            />
            {searchQuery && (
              <button
                onClick={() => handleSearch('')}
                style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#7a8fa8', padding: 0 }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Search dropdown */}
          {searchResults.length > 0 && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              left: 0, right: 0,
              background: 'rgba(10,28,56,0.98)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(201,162,39,0.3)',
              borderRadius: 10,
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              zIndex: 1000,
              overflow: 'hidden',
            }}>
              {searchResults.map((r, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(r)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    width: '100%', padding: '10px 14px',
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'inherit', color: '#fff', textAlign: 'left',
                    borderBottom: i < searchResults.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,162,39,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >
                  <span style={{ fontSize: 13 }}>
                    {r.type === 'hole' ? '⛳' : r.type === 'gate' ? '🚪' : r.type === 'venue' ? '🏛' : '📍'}
                  </span>
                  <span style={{ fontSize: 13 }}>{r.label}</span>
                  <span style={{
                    marginLeft: 'auto', fontSize: 10, fontWeight: 600, textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    color: r.type === 'hole' ? '#4a90d9' : r.type === 'gate' ? '#c9a227' : r.type === 'venue' ? '#2ecc71' : '#9aa5b4',
                  }}>
                    {r.type}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right info */}
        <div style={{ marginLeft: 'auto', textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: 10, color: '#7a8fa8', lineHeight: 1.6 }}>
            <div>🏆 Presented by Ally</div>
            <div>📡 Connect to U.S. Open Fan Wi-Fi</div>
          </div>
        </div>
      </header>

      {/* ── MAP AREA ─────────────────────────────────────────── */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <CourseMap
          onSelect={handleSelect}
          selected={selected}
          filter={amenityFilter}
        />

        {/* Info panel (slides in from right WITHIN map area) */}
        {selected && (
          <InfoPanel
            selected={selected}
            onClose={() => setSelected(null)}
          />
        )}

        {/* Legend / filter */}
        <Legend
          activeFilter={amenityFilter}
          onFilter={setAmenityFilter}
        />

        {/* Stats bar (top of map) */}
        <div style={{
          position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 8, zIndex: 20,
        }}>
          {[
            { label: '18 Holes', icon: '⛳' },
            { label: '3 Gates', icon: '🚪' },
            { label: 'Free WiFi', icon: '📡' },
            { label: 'Ally Presenting', icon: '🏆' },
          ].map(stat => (
            <div
              key={stat.label}
              style={{
                background: 'rgba(13,34,64,0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(201,162,39,0.2)',
                borderRadius: 20,
                padding: '4px 12px',
                fontSize: 11.5,
                display: 'flex', alignItems: 'center', gap: 5,
                color: '#cdd8e8',
                fontWeight: 500,
              }}
            >
              <span>{stat.icon}</span>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Instruction hint (only when nothing selected) */}
        {!selected && (
          <div style={{
            position: 'absolute', bottom: 80, left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(13,34,64,0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(201,162,39,0.2)',
            borderRadius: 20,
            padding: '6px 16px',
            fontSize: 12,
            color: '#9aa5b4',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}>
            Click any marker to see details · Chat button → Ask questions
          </div>
        )}
      </div>

      {/* ── CHAT ─────────────────────────────────────────────── */}
      <ChatPanel isOpen={chatOpen} onToggle={() => setChatOpen(o => !o)} />
    </div>
  );
}
