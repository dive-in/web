import { Repository } from 'typeorm';
import Restaurant from '../../entities/Restaurant';
import { Coordinate } from '../location/types';
import LocationService from '../location';

export default class RestaurantService {
  private static MAX_DISTANCE = 60;

  private constructor(
    private restaurantRepository: Repository<Restaurant>,
    private locationService: LocationService
  ) {}

  private static instance: RestaurantService = null;

  static getInstance(
    restaurantRepository: Repository<Restaurant>,
    locationService: LocationService
  ): RestaurantService {
    if (!this.instance) {
      this.instance = new RestaurantService(
        restaurantRepository,
        locationService
      );
    }

    return this.instance;
  }

  async getClosestRestaurantsTo(point: Coordinate): Promise<Restaurant[]> {
    const allRestaurants = await this.restaurantRepository.find();

    return allRestaurants
      .filter(restaurant => {
        const restaurantCoordinates: Coordinate = {
          latitude: restaurant.latitude,
          longitude: restaurant.longitude,
        };

        return this.locationService.isDistanceLessThan(
          point,
          restaurantCoordinates,
          RestaurantService.MAX_DISTANCE
        );
      })
      .sort((a, b) => {
        const firstCoordinate: Coordinate = {
          latitude: a.latitude,
          longitude: a.longitude,
        };

        const secondCoordinate: Coordinate = {
          latitude: b.latitude,
          longitude: b.longitude,
        };

        const distanceToFirst = this.locationService.calculateDistanceBetween(
          point,
          firstCoordinate
        );

        const distanceToSecond = this.locationService.calculateDistanceBetween(
          point,
          secondCoordinate
        );

        return distanceToFirst - distanceToSecond;
      })
      .slice(0, 3);
  }
}
