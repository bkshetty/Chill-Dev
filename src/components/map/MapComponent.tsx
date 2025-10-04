import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { Report } from '../../firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { MapPin, Shield, AlertTriangle, Clock, User } from 'lucide-react';

// Fix for default markers in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom icons for safe and unsafe reports
const safeIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.6 19.4 0 12.5 0z" fill="#22c55e"/>
      <circle cx="12.5" cy="12.5" r="6" fill="white"/>
      <path d="M9 12.5l2 2 4-4" stroke="#22c55e" stroke-width="2" fill="none"/>
    </svg>
  `),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const unsafeIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.6 19.4 0 12.5 0z" fill="#ef4444"/>
      <circle cx="12.5" cy="12.5" r="6" fill="white"/>
      <path d="M9 9l7 7M16 9l-7 7" stroke="#ef4444" stroke-width="2"/>
    </svg>
  `),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface MapComponentProps {
  reports: Report[];
  onMapClick?: (lat: number, lng: number) => void;
  showAddReportButton?: boolean;
}

const MapClickHandler: React.FC<{ onMapClick: (lat: number, lng: number) => void }> = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ 
  reports, 
  onMapClick, 
  showAddReportButton = false 
}) => {
  const { isVerifiedWoman } = useAuth();
  const [mapCenter] = useState<[number, number]>([40.7128, -74.0060]); // Default to NYC

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {onMapClick && showAddReportButton && isVerifiedWoman && (
          <MapClickHandler onMapClick={onMapClick} />
        )}

        {reports.map((report) => (
          <Marker
            key={report.id}
            position={[report.latitude, report.longitude]}
            icon={report.type === 'safe' ? safeIcon : unsafeIcon}
          >
            <Popup className="custom-popup">
              <div className="p-2 min-w-[250px]">
                <div className="flex items-center space-x-2 mb-3">
                  {report.type === 'safe' ? (
                    <Shield className="w-5 h-5 text-safe-600" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-unsafe-600" />
                  )}
                  <span className={`font-semibold text-sm ${
                    report.type === 'safe' ? 'text-safe-700' : 'text-unsafe-700'
                  }`}>
                    {report.type === 'safe' ? 'Safe Area' : 'Unsafe Area'}
                  </span>
                  {report.isVerifiedWoman && (
                    <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                      Verified Woman
                    </span>
                  )}
                </div>
                
                <p className="text-gray-700 text-sm mb-3">{report.description}</p>
                
                <div className="space-y-1 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>{report.userDisplayName}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatDate(report.createdAt)}</span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {showAddReportButton && !isVerifiedWoman && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 max-w-xs">
          <div className="flex items-center space-x-2 text-gray-600">
            <Shield className="w-5 h-5 text-primary-600" />
            <span className="text-sm">
              Only verified women can add safety reports
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
