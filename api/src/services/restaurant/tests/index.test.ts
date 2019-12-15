import { Repository } from 'typeorm';
import { NotFoundError } from 'routing-controllers';
import Restaurant from '../../../entities/Restaurant';
import RestaurantService from '../index';
import LocationService from '../../location';
import { Coordinate } from '../../location/types';

const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    name: 'Restaurant 1',
    latitude: 55,
    longitude: 15,
    tables: [],
    logoUrl: 'logo',
    employees: [],
    menu: null,
  },
  {
    id: 2,
    name: 'Restaurant 2',
    latitude: 43,
    longitude: 21,
    tables: [],
    logoUrl: 'logo',
    employees: [],
    menu: null,
  },
  {
    id: 3,
    name: 'Restaurant 3',
    latitude: 100,
    longitude: 100,
    tables: [],
    logoUrl: 'logo',
    employees: [],
    menu: null,
  },
  {
    id: 4,
    name: 'Restaurant 4',
    latitude: 35,
    longitude: 25,
    tables: [],
    logoUrl: 'logo',
    employees: [],
    menu: null,
  },
];

const find = jest.fn();
const findOne = jest.fn();

const mockRestaurantRepository = {
  find,
  findOne,
};

const isDistanceLessThan: jest.Mock<
  boolean,
  [Coordinate, Coordinate, number]
> = jest.fn(
  (first, second, maxDistance) =>
    Math.abs(first.latitude - second.latitude) +
      Math.abs(first.longitude - second.longitude) <=
    maxDistance
);

const calculateDistanceBetween: jest.Mock<
  number,
  [Coordinate, Coordinate]
> = jest.fn(
  (first, second) =>
    Math.abs(first.latitude - second.latitude) +
    Math.abs(first.longitude - second.longitude)
);

const mockLocationService: LocationService = {
  isDistanceLessThan,
  calculateDistanceBetween,
};

describe('RestaurantService', () => {
  const restaurantService = new RestaurantService(
    (mockRestaurantRepository as unknown) as Repository<Restaurant>,
    mockLocationService
  );

  beforeEach(() => {
    mockRestaurantRepository.find.mockClear();
    mockRestaurantRepository.findOne.mockClear();
  });

  describe('getClosestRestaurantsTo', () => {
    it('should return the 3 closest restaurants to given point', async () => {
      mockRestaurantRepository.find.mockReturnValue(
        Promise.resolve(mockRestaurants)
      );

      const coordinate: Coordinate = {
        latitude: 42,
        longitude: 22,
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
        { ...mockRestaurants[3], latitude: 170, longitude: 170 },
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

    it('should return empty array if there are no restaurants nearby', async () => {
      mockRestaurantRepository.find.mockReturnValue(mockRestaurants);

      const coordinate: Coordinate = {
        latitude: 170,
        longitude: 170,
      };

      const closestRestaurants = await restaurantService.getClosestRestaurantsTo(
        coordinate
      );

      expect(closestRestaurants).toBeDefined();
      expect(closestRestaurants).toHaveLength(0);
    });
  });

  describe('getMenuForRestaurant', () => {
    it("should return the restaurant's menu when the restaurant exists", async () => {
      const mockRestaurant: Restaurant = {
        id: 1,
        name: 'Test restaurant',
        logoUrl: 'logo',
        menu: {
          id: 4,
          categories: [],
          restaurant: undefined,
        },
        tables: [],
        employees: [],
        latitude: 42.21,
        longitude: 21.42,
      };

      mockRestaurant.menu.restaurant = mockRestaurant;

      mockRestaurantRepository.findOne.mockReturnValue(mockRestaurant);

      const menu = await restaurantService.getMenuForRestaurant(1);

      expect(mockRestaurantRepository.findOne).toHaveBeenCalledWith(1, {
        relations: ['menu'],
      });

      expect(menu).toBeDefined();

      expect(menu.id).toEqual(4);
    });

    it('should throw a NotFoundError if a restaurant with that id does not exist', async () => {
      mockRestaurantRepository.findOne.mockReturnValue(undefined);

      return expect(
        restaurantService.getMenuForRestaurant(1)
      ).rejects.toThrowError(
        new NotFoundError('Restaurant with that ID does not exist')
      );
    });
  });
});
