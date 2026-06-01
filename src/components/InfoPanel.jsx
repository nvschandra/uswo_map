import { X, MapPin, Star, AlertCircle, Ticket, Lock } from 'lucide-react';
import { AMENITY_META } from '../data/locations.js';

function Badge({ children, color = '#c9a227' }) {
  return (
    <span style={{
      display: 'inline-block',
      background: color + '22',
      border: `1px solid ${color}55`,
      color,
      borderRadius: 6,
      padding: '2px 8px',
      fontSize: 11,
      fontWeight: 600,
      marginRight: 4,
      marginBottom: 4,
    }}>
      {children}
    </span>
  );
}

function HolePanel({ data }) {
  const parColor = data.par === 3 ? '#e74c3c' : data.par === 5 ? '#2ecc71' : '#4a90d9';
  return (
    <div className="fade-up">
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <div style={{
          width: 64, height: 64, borderRadius: 12,
          background: '#0d2240',
          border: '3px solid #fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, fontWeight: 800, color: '#fff', flexShrink: 0,
        }}>
          {data.num}
        </div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.2 }}>Hole {data.num}</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
            <Badge color={parColor}>Par {data.par}</Badge>
            <Badge color="#9aa5b4">{data.yards} yds</Badge>
          </div>
        </div>
      </div>
      <p style={{ fontSize: 13.5, lineHeight: 1.65, color: '#cdd8e8', marginBottom: 12 }}>{data.desc}</p>
      <div style={{ fontSize: 12, color: '#7a8fa8', display: 'flex', alignItems: 'center', gap: 6 }}>
        <MapPin size={12} />
        <span>Click on the map to re-center on this hole</span>
      </div>
    </div>
  );
}

function GatePanel({ data }) {
  return (
    <div className="fade-up">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <div style={{
          background: '#c9a227', borderRadius: 8, padding: '8px 14px',
          fontSize: 13, fontWeight: 800, color: '#0d2240',
        }}>
          {data.label}
        </div>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Entry Gate</div>
      </div>
      <p style={{ fontSize: 13.5, lineHeight: 1.65, color: '#cdd8e8', marginBottom: 14 }}>{data.desc}</p>
      <div style={{ background: 'rgba(201,162,39,0.12)', borderRadius: 8, padding: '10px 14px', border: '1px solid rgba(201,162,39,0.3)' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#c9a227', marginBottom: 4 }}>REMINDER</div>
        <div style={{ fontSize: 12.5, color: '#cdd8e8' }}>Proper tickets or credentials are required for entry. No re-entry after 6:00 PM.</div>
      </div>
    </div>
  );
}

function VenuePanel({ data }) {
  return (
    <div className="fade-up">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 10, background: data.color + '33',
          border: `2px solid ${data.color}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 800, color: data.color, flexShrink: 0,
        }}>
          {data.code}
        </div>
        <div>
          <div style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.2 }}>{data.label}</div>
          <div style={{ display: 'flex', gap: 4, marginTop: 4, flexWrap: 'wrap' }}>
            {data.ticketRequired && <Badge color="#e74c3c">Ticket Required</Badge>}
            {data.credentialRequired && <Badge color="#8e44ad">Credential Required</Badge>}
            {!data.ticketRequired && !data.credentialRequired && <Badge color="#27ae60">Public Access</Badge>}
          </div>
        </div>
      </div>

      <p style={{ fontSize: 13.5, lineHeight: 1.65, color: '#cdd8e8', marginBottom: 14 }}>{data.desc}</p>

      {data.amenities && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#7a8fa8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
            What's Here
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {data.amenities.map(a => (
              <Badge key={a} color="#4a90d9">{a}</Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AmenityPanel({ data }) {
  const meta = AMENITY_META[data.type];
  return (
    <div className="fade-up">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <div style={{
          width: 50, height: 50, borderRadius: 12, background: meta.color + '33',
          border: `2px solid ${meta.color}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22,
        }}>
          {meta.icon}
        </div>
        <div>
          <div style={{ fontSize: 17, fontWeight: 800 }}>{data.label}</div>
          <div style={{ fontSize: 12, color: '#7a8fa8', marginTop: 3 }}>{meta.label}</div>
        </div>
      </div>
      <div style={{ background: 'rgba(74,144,217,0.1)', borderRadius: 8, padding: '10px 14px', border: '1px solid rgba(74,144,217,0.25)' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#4a90d9', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 5 }}>
          <MapPin size={12} /> Location Info
        </div>
        <div style={{ fontSize: 12.5, color: '#cdd8e8' }}>
          Marked on the map with the {meta.icon} icon. Ask our chat assistant for the nearest {meta.label.toLowerCase()} to any hole.
        </div>
      </div>
    </div>
  );
}

export default function InfoPanel({ selected, onClose }) {
  if (!selected) return null;

  const { type, data } = selected;

  return (
    <div
      className="panel-in"
      style={{
        position: 'absolute',
        top: 0, right: 0,
        width: 300,
        height: '100%',
        background: 'rgba(13,34,64,0.97)',
        backdropFilter: 'blur(12px)',
        borderLeft: '1px solid rgba(201,162,39,0.3)',
        padding: '20px 20px 24px',
        overflowY: 'auto',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 14, right: 14,
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 8,
          width: 32, height: 32,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#fff',
        }}
      >
        <X size={16} />
      </button>

      {/* Type label */}
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
        color: '#c9a227', marginBottom: 14, paddingRight: 36,
      }}>
        {type === 'hole' ? '⛳ Hole Info'
          : type === 'gate' ? '🚪 Gate'
          : type === 'venue' ? '🏛 Hospitality'
          : '📍 Amenity'}
      </div>

      {/* Content */}
      {type === 'hole'    && <HolePanel data={data} />}
      {type === 'gate'    && <GatePanel data={data} />}
      {type === 'venue'   && <VenuePanel data={data} />}
      {type === 'amenity' && <AmenityPanel data={data} />}

      {/* Footer tip */}
      <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: 11.5, color: '#5a7a9a', lineHeight: 1.5 }}>
        Tip: Ask the chat assistant questions like "Where is the nearest restroom to this location?" for guided navigation.
      </div>
    </div>
  );
}
