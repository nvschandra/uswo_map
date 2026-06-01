import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { HOLES, GATES, VENUES, AMENITIES, AMENITY_META, RIVIERA_CENTER } from '../data/locations.js';

// Satellite tile layer — ESRI World Imagery (free, no API key)
const SAT_TILE = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const SAT_ATTR = 'Imagery © Esri, Maxar, Earthstar Geographics';

// Label overlay so street/place names show on top of satellite
const LABEL_TILE = 'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}';

function makeHoleIcon(num, isSelected) {
  return L.divIcon({
    className: '',
    html: `<div style="
      width:32px;height:32px;border-radius:50%;
      background:${isSelected ? '#fff' : '#0d2240'};
      border:3px solid ${isSelected ? '#c9a227' : '#fff'};
      color:${isSelected ? '#0d2240' : '#fff'};
      font-family:Inter,sans-serif;font-size:${num >= 10 ? '11' : '13'}px;font-weight:800;
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 2px 8px rgba(0,0,0,0.5);
      cursor:pointer;
      ${isSelected ? 'outline:3px solid rgba(201,162,39,0.5);outline-offset:2px;' : ''}
    ">${num}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

function makeGateIcon(label, isSelected) {
  return L.divIcon({
    className: '',
    html: `<div style="
      background:${isSelected ? '#e8bf4b' : '#c9a227'};
      border:${isSelected ? '2px solid #fff' : '2px solid rgba(255,255,255,0.5)'};
      border-radius:6px;padding:3px 7px;
      color:#0d2240;font-family:Inter,sans-serif;font-size:9px;font-weight:800;
      white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.5);cursor:pointer;letter-spacing:0.5px;
    ">${label}</div>`,
    iconAnchor: [28, 14],
  });
}

function makeVenueIcon(code, color, isSelected) {
  return L.divIcon({
    className: '',
    html: `<div style="
      width:30px;height:30px;border-radius:50%;
      background:${color}${isSelected ? '' : 'cc'};
      border:${isSelected ? '3px solid #fff' : '2px solid rgba(255,255,255,0.5)'};
      color:#fff;font-family:Inter,sans-serif;font-size:9px;font-weight:800;
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 2px 8px rgba(0,0,0,0.6);cursor:pointer;
    ">${code}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

function makeAmenityIcon(meta, isSelected) {
  return L.divIcon({
    className: '',
    html: `<div style="
      width:24px;height:24px;border-radius:50%;
      background:${meta.color}${isSelected ? '' : 'bb'};
      border:${isSelected ? '2px solid #fff' : '1px solid rgba(255,255,255,0.4)'};
      display:flex;align-items:center;justify-content:center;
      font-size:12px;box-shadow:0 2px 6px rgba(0,0,0,0.5);cursor:pointer;
    ">${meta.icon}</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

export default function CourseMap({ onSelect, selected, filter }) {
  const mapDiv = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({ holes: [], gates: [], venues: [], amenities: [] });

  // Build all markers once on mount
  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map(mapDiv.current, {
      center: RIVIERA_CENTER,
      zoom: 16,
      zoomControl: false,
      attributionControl: true,
    });

    // Satellite base + label overlay
    L.tileLayer(SAT_TILE, { attribution: SAT_ATTR, maxZoom: 20 }).addTo(map);
    L.tileLayer(LABEL_TILE, { opacity: 0.7, maxZoom: 20 }).addTo(map);

    // Zoom control top-right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // ── Holes ────────────────────────────────────────────────
    HOLES.forEach(h => {
      const m = L.marker([h.lat, h.lng], { icon: makeHoleIcon(h.num, false) })
        .addTo(map)
        .on('click', () => onSelect({ type: 'hole', data: h }));
      markersRef.current.holes.push({ id: h.id, marker: m, data: h });
    });

    // ── Gates ────────────────────────────────────────────────
    GATES.forEach(g => {
      const m = L.marker([g.lat, g.lng], { icon: makeGateIcon(g.label, false) })
        .addTo(map)
        .on('click', () => onSelect({ type: 'gate', data: g }));
      markersRef.current.gates.push({ id: g.id, marker: m, data: g });
    });

    // ── Venues ───────────────────────────────────────────────
    VENUES.forEach(v => {
      const m = L.marker([v.lat, v.lng], { icon: makeVenueIcon(v.code, v.color, false) })
        .addTo(map)
        .on('click', () => onSelect({ type: 'venue', data: v }));
      markersRef.current.venues.push({ id: v.id, marker: m, data: v });
    });

    // ── Amenities ────────────────────────────────────────────
    AMENITIES.forEach(a => {
      const meta = AMENITY_META[a.type];
      if (!meta) return;
      const m = L.marker([a.lat, a.lng], { icon: makeAmenityIcon(meta, false) })
        .addTo(map)
        .on('click', () => onSelect({ type: 'amenity', data: a }));
      markersRef.current.amenities.push({ id: a.id, type: a.type, marker: m, data: a });
    });

    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  // Update icons when selection changes
  useEffect(() => {
    if (!mapRef.current) return;
    const selId = selected?.data?.id;

    markersRef.current.holes.forEach(({ id, marker, data }) =>
      marker.setIcon(makeHoleIcon(data.num, id === selId)));

    markersRef.current.gates.forEach(({ id, marker, data }) =>
      marker.setIcon(makeGateIcon(data.label, id === selId)));

    markersRef.current.venues.forEach(({ id, marker, data }) =>
      marker.setIcon(makeVenueIcon(data.code, data.color, id === selId)));

    markersRef.current.amenities.forEach(({ id, marker, data }) => {
      const meta = AMENITY_META[data.type];
      marker.setIcon(makeAmenityIcon(meta, id === selId));
    });

    // Pan to selected marker
    if (selected?.data) {
      const d = selected.data;
      if (d.lat) mapRef.current.panTo([d.lat, d.lng], { animate: true, duration: 0.5 });
    }
  }, [selected]);

  // Show/hide amenity markers by filter
  useEffect(() => {
    if (!mapRef.current) return;
    markersRef.current.amenities.forEach(({ type, marker }) => {
      if (!filter || filter === type) {
        if (!mapRef.current.hasLayer(marker)) marker.addTo(mapRef.current);
      } else {
        if (mapRef.current.hasLayer(marker)) mapRef.current.removeLayer(marker);
      }
    });
  }, [filter]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mapDiv} style={{ width: '100%', height: '100%' }} />

      {/* Custom attribution style patch */}
      <style>{`
        .leaflet-control-attribution {
          background: rgba(13,34,64,0.8) !important;
          color: #7a8fa8 !important;
          font-size: 10px !important;
        }
        .leaflet-control-attribution a { color: #4a90d9 !important; }
        .leaflet-control-zoom a {
          background: rgba(13,34,64,0.9) !important;
          color: #fff !important;
          border-color: rgba(201,162,39,0.3) !important;
        }
        .leaflet-control-zoom a:hover {
          background: rgba(201,162,39,0.2) !important;
        }
      `}</style>
    </div>
  );
}
