import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { AMENITY_META } from '../data/locations.js';

const FILTER_OPTIONS = [
  { id: 'all', label: 'All', icon: '🗺', color: '#c9a227' },
  { id: 'restroom',   ...AMENITY_META.restroom },
  { id: 'concession', ...AMENITY_META.concession },
  { id: 'firstaid',  ...AMENITY_META.firstaid },
  { id: 'grandstand',...AMENITY_META.grandstand },
  { id: 'hydration', ...AMENITY_META.hydration },
  { id: 'rideshare', ...AMENITY_META.rideshare },
  { id: 'shuttle',   ...AMENITY_META.shuttle },
  { id: 'ticket',    ...AMENITY_META.ticket },
  { id: 'merch',     ...AMENITY_META.merch },
];

export default function Legend({ activeFilter, onFilter }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{
      position: 'absolute',
      bottom: 16, left: 16,
      background: 'rgba(13,34,64,0.92)',
      backdropFilter: 'blur(12px)',
      borderRadius: 12,
      border: '1px solid rgba(201,162,39,0.25)',
      padding: '10px 12px',
      zIndex: 50,
      minWidth: 170,
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          background: 'none', border: 'none', cursor: 'pointer', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', padding: 0, fontFamily: 'inherit',
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#c9a227' }}>
          Filter Amenities
        </span>
        {open ? <ChevronUp size={14} color="#c9a227" /> : <ChevronDown size={14} color="#c9a227" />}
      </button>

      {open && (
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {FILTER_OPTIONS.map(opt => {
            const active = activeFilter === opt.id || (!activeFilter && opt.id === 'all');
            return (
              <button
                key={opt.id}
                onClick={() => onFilter(opt.id === 'all' ? null : opt.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '5px 8px',
                  borderRadius: 7,
                  border: `1px solid ${active ? opt.color : 'transparent'}`,
                  background: active ? opt.color + '22' : 'transparent',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  width: '100%',
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ fontSize: 15 }}>{opt.icon}</span>
                <span style={{ fontSize: 12, color: active ? opt.color : '#9aa5b4', fontWeight: active ? 600 : 400 }}>
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Map key */}
      {!open && (
        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#0d2240', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 800, color: '#fff' }}>9</div>
            <span style={{ fontSize: 11, color: '#9aa5b4' }}>Hole</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 20, height: 12, borderRadius: 3, background: '#c9a227', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 800, color: '#0d2240' }}>GATE</div>
            <span style={{ fontSize: 11, color: '#9aa5b4' }}>Entry Gate</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#FFD70033', border: '2px solid #FFD700', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 800, color: '#FFD700' }}>CP</div>
            <span style={{ fontSize: 11, color: '#9aa5b4' }}>Hospitality</span>
          </div>
        </div>
      )}
    </div>
  );
}
