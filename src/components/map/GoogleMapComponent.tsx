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
  const [hoverInfo, setHoverInfo] = useState<{lat: number; lng: number; address: string} | null>(null);
  const [mousePosition, setMousePosition] = useState<{x: number; y: number}>({x: 0, y: 0});

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
          <div style="font-family: Arial, sans-serif; max-width: 320px; padding: 0;">
            <div style="background: ${report.type === 'safe' ? 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)' : 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)'}; color: white; padding: 16px; border-radius: 8px 8px 0 0; margin: -10px -10px 0 -10px;">
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                <span style="font-size: 28px;">${report.type === 'safe' ? '🛡️' : '⚠️'}</span>
                <div style="flex: 1;">
                  <div style="font-size: 18px; font-weight: bold;">
                    ${report.type === 'safe' ? 'SAFE AREA' : 'UNSAFE AREA'}
                  </div>
                  <div style="font-size: 11px; opacity: 0.9;">
                    Report #${report.id ? report.id.slice(-6).toUpperCase() : 'N/A'}
                  </div>
                </div>
              </div>
            </div>
            
            <div style="padding: 16px; background: white;">
              <div style="margin-bottom: 14px;">
                <div style="font-size: 12px; font-weight: bold; color: #666; margin-bottom: 6px;">📝 DESCRIPTION</div>
                <div style="padding: 10px; background: #f8f9fa; border-left: 4px solid ${report.type === 'safe' ? '#22c55e' : '#ef4444'}; border-radius: 4px; font-size: 14px; line-height: 1.5;">
                  ${report.description}
                </div>
              </div>
              
              <div style="background: #f8f9fa; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
                <div style="margin-bottom: 10px;">
                  <div style="font-size: 11px; color: #666; margin-bottom: 2px;">👤 Reported by</div>
                  <div style="font-size: 14px; font-weight: bold; color: #333;">${report.userDisplayName}</div>
                </div>
                <div style="margin-bottom: 10px;">
                  <div style="font-size: 11px; color: #666; margin-bottom: 2px;">🕒 Date & Time</div>
                  <div style="font-size: 13px; color: #333;">${formatDate(report.createdAt)}</div>
                </div>
                <div>
                  <div style="font-size: 11px; color: #666; margin-bottom: 2px;">📍 Location</div>
                  <div style="font-size: 11px; font-family: monospace; color: #555;">
                    ${report.latitude.toFixed(6)}, ${report.longitude.toFixed(6)}
                  </div>
                </div>
              </div>
              
              <div style="background: ${report.type === 'safe' ? '#d1fae5' : '#fee2e2'}; border: 2px solid ${report.type === 'safe' ? '#34d399' : '#fbbf24'}; padding: 10px; border-radius: 6px; text-align: center;">
                <div style="font-size: 12px; font-weight: bold; color: ${report.type === 'safe' ? '#065f46' : '#92400e'}; margin-bottom: 4px;">
                  ${report.type === 'safe' ? '✅ VERIFIED SAFE ZONE' : '⚠️ CAUTION REQUIRED'}
                </div>
                <div style="font-size: 11px; color: ${report.type === 'safe' ? '#047857' : '#78350f'};">
                  ${report.type === 'safe' ? 'Community verified safe area' : 'Stay alert and consider alternatives'}
                </div>
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
          <div style="font-family: Arial, sans-serif; max-width: 300px; padding: 0;">
            <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 16px; border-radius: 8px 8px 0 0; margin: -10px -10px 0 -10px;">
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                <span style="font-size: 28px;">📍</span>
                <div style="flex: 1;">
                  <div style="font-size: 18px; font-weight: bold;">
                    YOUR LOCATION
                  </div>
                  <div style="font-size: 11px; opacity: 0.9;">
                    Real-time GPS Position
                  </div>
                </div>
                <div style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 12px; font-size: 10px; font-weight: bold;">
                  🔴 LIVE
                </div>
              </div>
            </div>
            
            <div style="padding: 16px; background: white;">
              <div style="background: #f0f9ff; padding: 12px; border-radius: 6px; border-left: 4px solid #3b82f6; margin-bottom: 12px;">
                <div style="font-size: 11px; font-weight: bold; color: #666; margin-bottom: 6px;">📐 COORDINATES</div>
                <div style="font-family: monospace; font-size: 14px; color: #1f2937; font-weight: bold; margin-bottom: 4px;">
                  ${lat.toFixed(6)}, ${lng.toFixed(6)}
                </div>
                <div style="font-size: 10px; color: #6b7280;">
                  Latitude, Longitude
                </div>
              </div>
              
              <div style="background: #f0fdf4; border: 2px solid #86efac; padding: 10px; border-radius: 6px; text-align: center;">
                <div style="font-size: 11px; color: #166534; line-height: 1.5;">
                  💡 <strong>Tip:</strong> Click anywhere on the map to report safety status
                </div>
              </div>
            </div>
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

  // Add hover tooltip functionality
  useEffect(() => {
    if (!map) return;

    const geocoder = new google.maps.Geocoder();
    let debounceTimer: NodeJS.Timeout;

    const mouseMoveListener = map.addListener('mousemove', (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        // Update mouse position for tooltip
        const mapDiv = document.getElementById('google-map');
        if (mapDiv && event.domEvent) {
          const rect = mapDiv.getBoundingClientRect();
          const domEvent = event.domEvent as MouseEvent;
          setMousePosition({
            x: domEvent.clientX - rect.left,
            y: domEvent.clientY - rect.top
          });
        }

        // Debounce geocoding requests
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
              setHoverInfo({
                lat,
                lng,
                address: results[0].formatted_address
              });
            } else {
              setHoverInfo({
                lat,
                lng,
                address: 'Address not available'
              });
            }
          });
        }, 300); // Debounce for 300ms
      }
    });

    const mouseOutListener = map.addListener('mouseout', () => {
      setHoverInfo(null);
      clearTimeout(debounceTimer);
    });

    return () => {
      google.maps.event.removeListener(mouseMoveListener);
      google.maps.event.removeListener(mouseOutListener);
      clearTimeout(debounceTimer);
    };
  }, [map]);

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

      {/* Hover Tooltip */}
      {hoverInfo && (
        <div
          className="absolute z-[1100] pointer-events-none tooltip-container"
          style={{
            left: `${mousePosition.x + 15}px`,
            top: `${mousePosition.y + 15}px`,
          }}
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl tooltip-shadow border-2 border-primary-500 backdrop-blur-sm">
            <div className="px-5 py-3.5 min-w-[300px] max-w-[380px]">
              {/* Header */}
              <div className="flex items-center gap-2 mb-3 pb-2.5 border-b-2 border-primary-500 border-opacity-30">
                <span className="text-2xl">📍</span>
                <h3 className="font-heading font-bold text-lg text-primary-300">Location Info</h3>
              </div>
              
              {/* Coordinates */}
              <div className="space-y-2.5 mb-3">
                <div className="flex items-start gap-3 bg-gray-800 bg-opacity-40 rounded-lg p-2.5 border border-green-500 border-opacity-30">
                  <span className="text-green-400 text-sm font-bold min-w-[75px] font-body">Latitude:</span>
                  <span className="font-mono text-base text-white font-semibold tracking-tight">{hoverInfo.lat.toFixed(6)}</span>
                </div>
                <div className="flex items-start gap-3 bg-gray-800 bg-opacity-40 rounded-lg p-2.5 border border-blue-500 border-opacity-30">
                  <span className="text-blue-400 text-sm font-bold min-w-[75px] font-body">Longitude:</span>
                  <span className="font-mono text-base text-white font-semibold tracking-tight">{hoverInfo.lng.toFixed(6)}</span>
                </div>
              </div>
              
              {/* Address */}
              <div className="bg-gradient-to-r from-primary-900 to-gray-800 bg-opacity-40 rounded-lg p-3 border-2 border-primary-600 border-opacity-30">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📌</span>
                  <div className="text-xs font-bold text-primary-300 uppercase tracking-wider font-body">Address</div>
                </div>
                <p className="text-sm text-gray-100 leading-relaxed font-body">{hoverInfo.address}</p>
              </div>
              
              {/* Footer hint */}
              <div className="mt-3 pt-3 border-t border-gray-700 border-opacity-50 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-yellow-400">💡</span>
                  <p className="text-xs text-gray-300 font-body font-medium">Click anywhere to add a safety report</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
