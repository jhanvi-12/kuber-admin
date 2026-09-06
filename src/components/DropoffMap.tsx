import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const AHMEDABAD: [number, number] = [23.0225, 72.5714];

const pin = L.divIcon({
  className: '',
  html: '<span style="display:block;width:18px;height:18px;border-radius:999px;background:#6c2bd9;border:3px solid #fff;box-shadow:0 2px 8px rgba(22,20,28,.35)"></span>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

async function reverseGeocode(lat: number, lng: number): Promise<string> {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  const data = await res.json();
  return (data.display_name as string) || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}

interface DropoffMapProps {
  lat: number | null;
  lng: number | null;
  onPick: (next: { address: string; lat: number; lng: number }) => void;
  className?: string;
}

const ClickHandler: React.FC<{ onPick: (lat: number, lng: number) => void }> = ({ onPick }) => {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const Recenter: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], Math.max(map.getZoom(), 15), { duration: 0.4 });
  }, [lat, lng, map]);
  return null;
};

const DropoffMap: React.FC<DropoffMapProps> = ({ lat, lng, onPick, className = '' }) => {
  const [busy, setBusy] = useState(false);

  const handlePick = async (nextLat: number, nextLng: number) => {
    setBusy(true);
    try {
      const address = await reverseGeocode(nextLat, nextLng);
      onPick({ address, lat: nextLat, lng: nextLng });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={`dropoff-map flex h-full min-h-[24rem] flex-col ${className}`}>
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl border border-gray-300 lg:rounded-2xl">
        <MapContainer
          center={AHMEDABAD}
          zoom={12}
          className="h-full w-full"
          scrollWheelZoom
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickHandler onPick={handlePick} />
          {lat != null && lng != null && (
            <>
              <Marker position={[lat, lng]} icon={pin} />
              <Recenter lat={lat} lng={lng} />
            </>
          )}
        </MapContainer>
      </div>
      <p className="mt-2 text-xs text-gray-500">
        {busy ? 'Finding address…' : 'Tap the map to pin your drop-off.'}
      </p>
    </div>
  );
};

export default DropoffMap;
