import { Repository } from 'typeorm';
import Restaurant from '../../../entities/Restaurant';
import RestaurantService from '../index';
import LocationService from '../../location';
import { Coordinate } from '../../location/types';

const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    name: 'Restaurant 1',
    latitude: 41.99224,
    longitude: 21.405267,
    tables: [],
    logoUrl: 'logo',
  },
  {
    id: 2,
    name: 'Restaurant 2',
    latitude: 41.991845,
    longitude: 21.404977,
    tables: [],
    logoUrl: 'logo',
  },
  {
    id: 3,
    name: 'Restaurant 3',
    latitude: 41.992633,
    longitude: 21.404151,
    tables: [],
    logoUrl: 'logo',
  },
  {
    id: 4,
    name: 'Restaurant 4',
    latitude: 41.991867,
    longitude: 21.404572,
    tables: [],
    logoUrl: 'logo',
  },
];

const find = jest.fn();

const mockRestaurantRepository = {
  find,
};

describe('RestaurantService', () => {
  const restaurantService = RestaurantService.getInstance(
    (mockRestaurantRepository as unknown) as Repository<Restaurant>,
    LocationService.getInstance()
  );

  beforeEach(() => {
    mockRestaurantRepository.find.mockClear();
  });

  describe('getClosestRestaurantsTo', () => {
    it('should return the 3 closest restaurants to given point', async () => {
      mockRestaurantRepository.find.mockReturnValue(
        Promise.resolve(mockRestaurants)
      );

      const coordinate: Coordinate = {
        latitude: 41.991867,
        longitude: 21.404889,
      };

      const closestRestaurants = await restaurantService.getClosestRestaurantsTo(
        coordinate
      );

      expect(closestRestaurants).toBeDefined();
      expect(closestRestaurants).toHaveLength(3);

      const [first, second, third] = closestRestaurants;

      expect(first.id).toEqual(2);
      expect(second.id).toEqual(4);
      expect(third.id).toEqual(1);
    });

    it('should only return 2 restaurants if there are only 2 nearby', async () => {
      const newMockRestaurants: Restaurant[] = [
        ...mockRestaurants.slice(0, 3),
        { ...mockRestaurants[3], latitude: 41.993215, longitude: 21.408256 },
      ];

      mockRestaurantRepository.find.mockReturnValue(newMockRestaurants);

      const coordinate: Coordinate = {
        latitude: 41.991867,
        longitude: 21.404889,
      };

      const closestRestaurants = await restaurantService.getClosestRestaurantsTo(
        coordinate
      );

      expect(closestRestaurants).toBeDefined();
      expect(closestRestaurants).toHaveLength(2);

      const [first, second] = closestRestaurants;

      expect(first.id).toEqual(2);
      expect(second.id).toEqual(1);
    });
  });

  it('should return empty array if there are no restaurants nearby', async () => {
    const coordinate: Coordinate = {
      latitude: 43,
      longitude: 24,
    };

    const closestRestaurants = await restaurantService.getClosestRestaurantsTo(
      coordinate
    );

    expect(closestRestaurants).toBeDefined();
    expect(closestRestaurants).toHaveLength(0);
  });
});
