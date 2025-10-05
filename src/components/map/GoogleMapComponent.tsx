import React, { useEffect, useState, useCallback } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, GOOGLE_MAPS_API_KEY } from '../../firebase/config';
import { Report } from '../../firebase/firestore';
import { Locate } from 'lucide-react';
import toast from 'react-hot-toast';

// Custom marker icons
const createMarkerIcon = (type: 'safe' | 'unsafe' | 'current') => {
  const colors = {
    safe: '#22c55e',
    unsafe: '#ef4444',
    current: '#3b82f6'
  };

  return {
    path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
    fillColor: colors[type],
    fillOpacity: 1,
    strokeColor: '#ffffff',
    strokeWeight: 2,
    scale: 1.5,
    anchor: new google.maps.Point(12, 24),
  };
};

interface GoogleMapComponentProps {
  onMapClick?: (lat: number, lng: number) => void;
  showAddReportButton?: boolean;
}

const MapComponent: React.FC<GoogleMapComponentProps> = ({ 
  onMapClick
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [currentLocationMarker, setCurrentLocationMarker] = useState<google.maps.Marker | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Update markers function
  const updateMarkers = useCallback((reportsToShow: Report[]) => {
    if (!map) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);

    // Add report markers
    const newMarkers: google.maps.Marker[] = [];
    
    reportsToShow.forEach((report) => {
      const marker = new google.maps.Marker({
        position: { lat: report.latitude, lng: report.longitude },
        map: map,
        icon: createMarkerIcon(report.type),
        title: `${report.type === 'safe' ? 'Safe' : 'Unsafe'} Area`
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; min-width: 200px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span style="color: ${report.type === 'safe' ? '#22c55e' : '#ef4444'};">
                ${report.type === 'safe' ? '🛡️' : '⚠️'}
              </span>
              <span style="font-weight: 500; color: ${report.type === 'safe' ? '#16a34a' : '#dc2626'};">
                ${report.type === 'safe' ? 'Safe Area' : 'Unsafe Area'}
              </span>
            </div>
            
            <p style="color: #374151; font-size: 14px; margin-bottom: 8px;">${report.description}</p>
            
            <div style="font-size: 12px; color: #6b7280;">
              <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 2px;">
                <span>👤</span>
                <span>${report.userDisplayName}</span>
              </div>
              <div style="display: flex; align-items: center; gap: 4px;">
                <span>🕒</span>
                <span>${formatDate(report.createdAt)}</span>
              </div>
            </div>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  }, [map, markers]);

  // Real-time listener for reports
  useEffect(() => {
    const q = query(collection(db, 'reports'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedReports: Report[] = [];
      snapshot.forEach((doc) => {
        updatedReports.push({ id: doc.id, ...doc.data() } as Report);
      });
      // Update markers when reports change
      updateMarkers(updatedReports);
    });
    return () => unsubscribe();
  }, [updateMarkers]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleLocationFound = useCallback((lat: number, lng: number) => {
    
    if (map) {
      map.setCenter({ lat, lng });
      map.setZoom(16);
    }

    // Update or create current location marker
    if (currentLocationMarker) {
      currentLocationMarker.setPosition({ lat, lng });
    } else if (map) {
      const marker = new google.maps.Marker({
        position: { lat, lng },
        map: map,
        icon: createMarkerIcon('current'),
        title: 'Your Location'
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <span style="color: #3b82f6;">📍</span>
              <span style="font-weight: 500; color: #1e40af;">Your Location</span>
            </div>
            <p style="font-size: 12px; color: #6b7280; margin: 0;">
              ${lat.toFixed(6)}, ${lng.toFixed(6)}
            </p>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      setCurrentLocationMarker(marker);
    }
  }, [map, currentLocationMarker]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser');
      return;
    }

    setIsLoadingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        handleLocationFound(latitude, longitude);
        toast.success('Location found!');
        setIsLoadingLocation(false);
      },
      (error) => {
        let errorMessage = 'Unable to get your location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
        }
        toast.error(errorMessage);
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  // Add map click listener
  useEffect(() => {
    if (!map || !onMapClick) return;

    const clickListener = map.addListener('click', (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        onMapClick(lat, lng);
      }
    });

    return () => {
      google.maps.event.removeListener(clickListener);
    };
  }, [map, onMapClick]);
  useEffect(() => {
    if (!map || !onMapClick) return;

    const clickListener = map.addListener('click', (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        onMapClick(lat, lng);
      }
    });

    return () => {
      google.maps.event.removeListener(clickListener);
    };
  }, [map, onMapClick]);

  // Try to get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleLocationFound(latitude, longitude);
        },
        (error) => {
          console.log('Auto-location failed:', error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 300000
        }
      );
    }
  }, [map, handleLocationFound]);

  const render = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading Google Maps...</p>
            </div>
          </div>
        );
      case Status.FAILURE:
        return (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-600 mb-4">Failed to load Google Maps</p>
              <p className="text-gray-600">Please check your internet connection</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-600">Initializing map...</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full relative">
      <Wrapper apiKey={GOOGLE_MAPS_API_KEY} render={render}>
        <div
          id="google-map"
          ref={(element) => {
            if (element && !map) {
              const newMap = new google.maps.Map(element, {
                center: { lat: 40.7128, lng: -74.0060 }, // Default to NYC
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [
                  {
                    featureType: 'poi',
                    elementType: 'labels',
                    stylers: [{ visibility: 'off' }]
                  }
                ]
              });
              setMap(newMap);
            }
          }}
        />
      </Wrapper>

      {/* Current location button */}
      <button
        onClick={getCurrentLocation}
        disabled={isLoadingLocation}
        className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-lg p-3 hover:bg-gray-50 transition-colors disabled:opacity-50"
        title="Find my location"
      >
        {isLoadingLocation ? (
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        ) : (
          <Locate className="w-5 h-5 text-blue-600" />
        )}
      </button>
    </div>
  );
};

export default MapComponent;
