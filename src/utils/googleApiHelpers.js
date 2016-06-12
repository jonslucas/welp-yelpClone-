export function searchNearby(google, map, request) {
  return new Promise((resolve, reject)=>{
      const service = new google.maps.places.PlacesService(map);

      service.nearbySearch(request, (res, status, pagination)=>{
          if (status == google.maps.places.PlacesServiceStatus.OK) {
              resolve(res, pagination);
          } else {
              reject (res, status);
          }
      })
  });
}