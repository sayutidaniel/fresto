export function fromPointToLatLng(point) {
  return {
    lng: point.coordinates[0],
    lat: point.coordinates[1],
  };
}
