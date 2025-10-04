import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { Report } from '../../firebase/firestore';
import { MapPin, Navigation, AlertTriangle, Shield } from 'lucide-react';

// Fix for default markers in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom icons
const startIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.6 19.4 0 12.5 0z" fill="#3b82f6"/>
      <circle cx="12.5" cy="12.5" r="6" fill="white"/>
      <text x="12.5" y="16" text-anchor="middle" fill="#3b82f6" font-size="8" font-weight="bold">S</text>
    </svg>
  `),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const endIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.6 19.4 0 12.5 0z" fill="#8b5cf6"/>
      <circle cx="12.5" cy="12.5" r="6" fill="white"/>
      <text x="12.5" y="16" text-anchor="middle" fill="#8b5cf6" font-size="8" font-weight="bold">E</text>
    </svg>
  `),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const safeIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="20" height="33" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.6 19.4 0 12.5 0z" fill="#22c55e"/>
      <circle cx="12.5" cy="12.5" r="6" fill="white"/>
      <path d="M9 12.5l2 2 4-4" stroke="#22c55e" stroke-width="2" fill="none"/>
    </svg>
  `),
  iconSize: [20, 33],
  iconAnchor: [10, 33],
});

const unsafeIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="20" height="33" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.6 19.4 0 12.5 0z" fill="#ef4444"/>
      <circle cx="12.5" cy="12.5" r="6" fill="white"/>
      <path d="M9 9l7 7M16 9l-7 7" stroke="#ef4444" stroke-width="2"/>
    </svg>
  `),
  iconSize: [20, 33],
  iconAnchor: [10, 33],
});

interface SafeRouteComponentProps {
  reports: Report[];
  startPoint: [number, number] | null;
  endPoint: [number, number] | null;
  route: L.LatLng[] | null;
  unsafeSegments: L.LatLng[][] | null;
}

const SafeRouteComponent: React.FC<SafeRouteComponentProps> = ({
  reports,
  startPoint,
  endPoint,
  route,
  unsafeSegments
}) => {
  const mapRef = useRef<L.Map>(null);
  const routeControlRef = useRef<L.Routing.Control | null>(null);

  useEffect(() => {
    if (mapRef.current && startPoint && endPoint) {
      // Remove existing route control
      if (routeControlRef.current) {
        mapRef.current.removeControl(routeControlRef.current);
      }

      // Create new route control
      const routeControl = L.Routing.control({
        waypoints: [
          L.latLng(startPoint[0], startPoint[1]),
          L.latLng(endPoint[0], endPoint[1])
        ],
        routeWhileDragging: false,
        addWaypoints: false,
        createMarker: () => null, // We'll add our own markers
        lineOptions: {
          styles: [
            {
              color: '#3b82f6',
              weight: 6,
              opacity: 0.8
            }
          ]
        }
      }).addTo(mapRef.current);

      routeControlRef.current = routeControl;

      // Fit map to show the route
      const group = new L.FeatureGroup([
        L.marker(startPoint),
        L.marker(endPoint)
      ]);
      mapRef.current.fitBounds(group.getBounds().pad(0.1));
    }

    return () => {
      if (routeControlRef.current && mapRef.current) {
        mapRef.current.removeControl(routeControlRef.current);
      }
    };
  }, [startPoint, endPoint]);

  // Calculate map center
  const getMapCenter = (): [number, number] => {
    if (startPoint && endPoint) {
      return [
        (startPoint[0] + endPoint[0]) / 2,
        (startPoint[1] + endPoint[1]) / 2
      ];
    }
    return [40.7128, -74.0060]; // Default to NYC
  };

  return (
    <div className="w-full h-full relative">
      <MapContainer
        ref={mapRef}
        center={getMapCenter()}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Start and End Points */}
        {startPoint && (
          <Marker position={startPoint} icon={startIcon}>
            <Popup>
              <div className="p-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-blue-700">Start Point</span>
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        {endPoint && (
          <Marker position={endPoint} icon={endIcon}>
            <Popup>
              <div className="p-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-purple-600" />
                  <span className="font-semibold text-purple-700">End Point</span>
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Safety Reports */}
        {reports.map((report) => (
          <Marker
            key={report.id}
            position={[report.latitude, report.longitude]}
            icon={report.type === 'safe' ? safeIcon : unsafeIcon}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <div className="flex items-center space-x-2 mb-2">
                  {report.type === 'safe' ? (
                    <Shield className="w-4 h-4 text-safe-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-unsafe-600" />
                  )}
                  <span className={`font-semibold text-sm ${
                    report.type === 'safe' ? 'text-safe-700' : 'text-unsafe-700'
                  }`}>
                    {report.type === 'safe' ? 'Safe Area' : 'Unsafe Area'}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{report.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Unsafe Route Segments */}
        {unsafeSegments && unsafeSegments.map((segment, index) => (
          <L.Polyline
            key={index}
            positions={segment}
            color="#ef4444"
            weight={8}
            opacity={0.7}
            dashArray="10, 10"
          />
        ))}
      </MapContainer>

      {/* Route Info */}
      {route && (
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 max-w-xs">
          <div className="flex items-center space-x-2 mb-2">
            <Navigation className="w-5 h-5 text-primary-600" />
            <span className="font-semibold text-gray-800">Route Information</span>
          </div>
          <div className="text-sm text-gray-600">
            <p>Total distance: {Math.round(route.length * 0.1)} km (approx.)</p>
            {unsafeSegments && unsafeSegments.length > 0 && (
              <p className="text-unsafe-600 mt-1">
                ⚠️ Route passes through {unsafeSegments.length} unsafe area(s)
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SafeRouteComponent;
