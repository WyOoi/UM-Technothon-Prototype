import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet marker icons in Next.js
const fixLeafletIcon = () => {
  // @ts-ignore
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });
};

// Custom marker icon based on severity
const createCustomIcon = (color: string, selected: boolean) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="
      background-color: ${color}; 
      width: ${selected ? '24px' : '16px'}; 
      height: ${selected ? '24px' : '16px'}; 
      border-radius: 50%; 
      border: 2px solid white;
      box-shadow: 0px 0px 8px rgba(0,0,0,0.3);
      transform: ${selected ? 'scale(1.5)' : 'scale(1)'};
      transition: all 0.3s ease;
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

// Component to automatically update the map view when selected disaster changes
function ChangeMapView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.flyTo(center, zoom, {
      animate: true,
      duration: 1
    });
  }, [center, zoom, map]);
  
  return null;
}

type Severity = 'Low' | 'Medium' | 'High' | 'Critical';

interface Disaster {
  id: number;
  name: string;
  type: string;
  location: string;
  coordinates: { lat: number; lng: number };
  date: string;
  severity: Severity;
  affectedAreas: string[];
  estimatedVictims: number;
  description: string;
}

interface MapComponentProps {
  disasters: Disaster[];
  selectedDisaster: Disaster;
  setSelectedDisaster: (disaster: Disaster) => void;
  getMarkerColor: (severity: Severity) => string;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  disasters, 
  selectedDisaster, 
  setSelectedDisaster,
  getMarkerColor
}) => {
  const [mapInitialized, setMapInitialized] = useState(false);
  
  // Center of Malaysia
  const defaultCenter: [number, number] = [4.2105, 101.9758];
  const zoom = 8;
  
  useEffect(() => {
    fixLeafletIcon();
    setMapInitialized(true);
  }, []);

  const center: [number, number] = [
    selectedDisaster?.coordinates.lat || defaultCenter[0],
    selectedDisaster?.coordinates.lng || defaultCenter[1]
  ];

  return (
    <div className="w-full h-full">
      {mapInitialized && (
        <MapContainer 
          center={center} 
          zoom={zoom} 
          style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {disasters.map((disaster) => (
            <Marker
              key={disaster.id}
              position={[disaster.coordinates.lat, disaster.coordinates.lng]}
              icon={createCustomIcon(
                getMarkerColor(disaster.severity),
                selectedDisaster.id === disaster.id
              )}
              eventHandlers={{
                click: () => setSelectedDisaster(disaster),
              }}
            >
              <Popup>
                <div>
                  <h3 className="font-bold">{disaster.name}</h3>
                  <p className="text-sm">{disaster.location}</p>
                  <p className="text-sm mt-1">{disaster.estimatedVictims.toLocaleString()} affected</p>
                  <p className="text-xs mt-2 text-blue-600 cursor-pointer" onClick={() => setSelectedDisaster(disaster)}>
                    View details
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
          
          <ChangeMapView center={center} zoom={zoom} />
        </MapContainer>
      )}
    </div>
  );
};

export default MapComponent; 