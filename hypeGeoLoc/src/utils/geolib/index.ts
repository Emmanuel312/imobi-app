import * as geolib from "geolib";

export interface Coords {
  latitude: number;
  longitude: number;
}

export function filterCoords(
  myCoord: Coords,
  coords: Coords[],
  range: number
): Coords[] {
  const filteredCoords = coords.filter((coord) =>
    geolib.isPointWithinRadius(coord, myCoord, range)
  );

  return filteredCoords;
}
