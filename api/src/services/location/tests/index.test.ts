import LocationService from '../index';
import { Coordinate } from '../types';

describe('LocationService', () => {
  const locationService = new LocationService();
  describe('getDistanceBetween', () => {
    it('should properly calculate air distance on the globe between two coordinates', () => {
      const firstCoordinate: Coordinate = {
        latitude: 41.991933,
        longitude: 21.404829,
      };

      const secondCoordinate: Coordinate = {
        latitude: 41.995152,
        longitude: 21.401636,
      };

      const distance = locationService.calculateDistanceBetween(
        firstCoordinate,
        secondCoordinate
      );

      expect(distance).toEqual(445);
    });

    it('should return distance 0 for same coordinate', () => {
      const coordinate: Coordinate = {
        latitude: 41.991933,
        longitude: 21.404829,
      };

      const distance = locationService.calculateDistanceBetween(
        coordinate,
        coordinate
      );

      expect(distance).toEqual(0);
    });
  });

  describe('isDistanceLessThan', () => {
    const originalCalculateDistanceBetween =
      locationService.calculateDistanceBetween;

    afterEach(() => {
      locationService.calculateDistanceBetween = originalCalculateDistanceBetween;
    });

    it('should return true when distance is less than reference distance', () => {
      locationService.calculateDistanceBetween = jest.fn(() => 50);

      const firstCoordinate: Coordinate = {
        latitude: 41.991933,
        longitude: 21.404829,
      };

      const secondCoordinate: Coordinate = {
        latitude: 41.995152,
        longitude: 21.401636,
      };

      const isBetween = locationService.isDistanceLessThan(
        firstCoordinate,
        secondCoordinate,
        100
      );

      expect(isBetween).toEqual(true);
    });

    it('should return true when distance is equal to reference distance', () => {
      locationService.calculateDistanceBetween = jest.fn(() => 50);

      const firstCoordinate: Coordinate = {
        latitude: 41.991933,
        longitude: 21.404829,
      };

      const secondCoordinate: Coordinate = {
        latitude: 41.995152,
        longitude: 21.401636,
      };

      const isBetween = locationService.isDistanceLessThan(
        firstCoordinate,
        secondCoordinate,
        50
      );

      expect(isBetween).toEqual(true);
    });

    it('should return false when distance is larger than reference distance', () => {
      locationService.calculateDistanceBetween = jest.fn(() => 200);

      const firstCoordinate: Coordinate = {
        latitude: 41.991933,
        longitude: 21.404829,
      };

      const secondCoordinate: Coordinate = {
        latitude: 41.995152,
        longitude: 21.401636,
      };

      const isBetween = locationService.isDistanceLessThan(
        firstCoordinate,
        secondCoordinate,
        100
      );

      expect(isBetween).toEqual(false);
    });
  });
});
