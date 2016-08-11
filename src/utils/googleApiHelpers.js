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

export function getDetails(google, map, placeId) {
    return new Promise((resolve, reject)=>{
        const service = new google.maps.places.PlacesService(map);
        const request = { placeId };

        sevice.getDeatails(request, (place, status)=>{
            if(status != google.maps.places.PlacesServiceStatus.OK) {
                return reject(status);
            } else {
                resolve(place);
            }
        })
    })
}