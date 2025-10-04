export async function findNearestPolice(lat: number, lng: number): Promise<string> {
  // Check if Google Maps is loaded
  if (!window.google || !window.google.maps) {
    return 'Google Maps not loaded';
  }

  return new Promise((resolve) => {
    const service = new google.maps.places.PlacesService(document.createElement('div'));

    const request = {
      location: new google.maps.LatLng(lat, lng),
      radius: 5000, // 5km radius
      type: 'police',
      rankBy: google.maps.places.RankBy.DISTANCE
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results && results[0]) {
        resolve(results[0].name + ' - ' + results[0].vicinity);
      } else {
        resolve('No nearby police station found');
      }
    });
  });
}