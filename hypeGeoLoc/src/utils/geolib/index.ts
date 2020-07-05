import * as geolib from "geolib";
import { LocationData } from "expo-location";
import { PropertiesResponse } from "../../interfaces";

export function filterCoords(
  location: LocationData,
  properties: PropertiesResponse[],
  range: number
): PropertiesResponse[] {
  const filteredCoords = properties.filter((property) =>
    geolib.isPointWithinRadius(property.coords, location.coords, range)
  );

  return filteredCoords;
}
