/**
 * Police Station Interface
 * Contains detailed information about a police station
 */
export interface PoliceStation {
  name: string;
  address: string;
  distance: number; // in meters
  location: {
    lat: number;
    lng: number;
  };
  phone?: string;
  rating?: number;
  placeId?: string;
}

/**
 * Find the nearest police station to given coordinates
 * @param lat - Latitude of the location
 * @param lng - Longitude of the location
 * @returns Promise with detailed police station information
 */
export async function findNearestPolice(
  lat: number, 
  lng: number
): Promise<PoliceStation> {
  // Check if Google Maps is loaded
  if (!window.google || !window.google.maps) {
    throw new Error('Google Maps API not loaded');
  }

  if (!window.google.maps.places) {
    throw new Error('Google Maps Places API not loaded');
  }

  return new Promise((resolve, reject) => {
    const service = new google.maps.places.PlacesService(
      document.createElement('div')
    );

    const userLocation = new google.maps.LatLng(lat, lng);

    const request: google.maps.places.PlaceSearchRequest = {
      location: userLocation,
      radius: 5000, // 5km radius
      keyword: 'police station',
      type: 'police',
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
        const nearest = results[0];
        
        // Calculate distance using Haversine formula via Google Maps
        let distance = 0;
        if (nearest.geometry?.location) {
          if (window.google.maps.geometry?.spherical) {
            distance = Math.round(
              window.google.maps.geometry.spherical.computeDistanceBetween(
                userLocation,
                nearest.geometry.location
              )
            );
          }
        }

        const policeStation: PoliceStation = {
          name: nearest.name || 'Unknown Police Station',
          address: nearest.vicinity || 'Address not available',
          distance: distance,
          location: {
            lat: nearest.geometry?.location?.lat() || lat,
            lng: nearest.geometry?.location?.lng() || lng,
          },
          phone: nearest.formatted_phone_number,
          rating: nearest.rating,
          placeId: nearest.place_id,
        };

        resolve(policeStation);
      } else {
        reject(new Error(`No police stations found nearby. Status: ${status}`));
      }
    });
  });
}

/**
 * Get directions from origin to police station
 * @param origin - Starting coordinates
 * @param destination - Police station coordinates
 * @param map - Google Maps instance
 * @returns DirectionsRenderer instance
 */
export function getDirectionsToPolice(
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number },
  map: google.maps.Map
): google.maps.DirectionsRenderer {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({
    suppressMarkers: false,
    polylineOptions: {
      strokeColor: '#EF4444', // Red color for urgent route
      strokeWeight: 5,
      strokeOpacity: 0.8,
    },
  });

  directionsRenderer.setMap(map);

  const request: google.maps.DirectionsRequest = {
    origin: new google.maps.LatLng(origin.lat, origin.lng),
    destination: new google.maps.LatLng(destination.lat, destination.lng),
    travelMode: google.maps.TravelMode.DRIVING,
  };

  directionsService.route(request, (result, status) => {
    if (status === 'OK' && result) {
      directionsRenderer.setDirections(result);
    } else {
      console.error('Directions request failed:', status);
    }
  });

  return directionsRenderer;
}

/**
 * Format distance for display
 * @param meters - Distance in meters
 * @returns Formatted distance string
 */
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${meters}m`;
  } else {
    return `${(meters / 1000).toFixed(1)}km`;
  }
}

/**
 * Create a custom police marker on the map
 * @param position - Marker position
 * @param map - Google Maps instance
 * @param title - Marker title
 * @returns Marker instance
 */
export function createPoliceMarker(
  position: { lat: number; lng: number },
  map: google.maps.Map,
  title: string
): google.maps.Marker {
  const marker = new google.maps.Marker({
    position: new google.maps.LatLng(position.lat, position.lng),
    map: map,
    title: title,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 10,
      fillColor: '#3B82F6', // Blue color
      fillOpacity: 1,
      strokeColor: '#FFFFFF',
      strokeWeight: 2,
    },
    animation: google.maps.Animation.DROP,
  });

  // Add info window
  const infoWindow = new google.maps.InfoWindow({
    content: `<div style="color: #1A1A2E; padding: 8px;">
      <strong>🚔 ${title}</strong>
      <p style="margin: 4px 0;">Police Station</p>
    </div>`,
  });

  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });

  return marker;
}