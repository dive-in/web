import { Coordinate } from './types';

export default class LocationService {
  private constructor() {}

  private static instance: LocationService = null;

  private static EARTH_RADIUS = 6371e3;

  static getInstance(): LocationService {
    if (!this.instance) {
      this.instance = new LocationService();
    }

    return this.instance;
  }

  private static toRadians(angle: number): number {
    return Math.PI * (angle / 180);
  }

  calculateDistanceBetween(
    firstCoordinate: Coordinate,
    secondCoordinate: Coordinate
  ): number {
    // Haversine formula
    // For reference: https://www.movable-type.co.uk/scripts/latlong.html
    const deltaLat = LocationService.toRadians(
      secondCoordinate.latitude - firstCoordinate.latitude
    );
    const deltaLon = LocationService.toRadians(
      secondCoordinate.longitude - firstCoordinate.longitude
    );

    const firstLatitudeRadians = LocationService.toRadians(
      firstCoordinate.latitude
    );
    const secondLatitudeRadians = LocationService.toRadians(
      secondCoordinate.latitude
    );

    const a =
      Math.sin(deltaLat / 2) ** 2 +
      Math.cos(firstLatitudeRadians) *
        Math.cos(secondLatitudeRadians) *
        Math.sin(deltaLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = LocationService.EARTH_RADIUS * c;

    return Math.ceil(distance);
  }

  isDistanceLessThan(
    firstCoordinate: Coordinate,
    secondCoordinate: Coordinate,
    referenceDistance: number
  ): boolean {
    return (
      this.calculateDistanceBetween(firstCoordinate, secondCoordinate) <=
      referenceDistance
    );
  }
}
