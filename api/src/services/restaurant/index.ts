import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { NotFoundError } from 'routing-controllers';
import Restaurant from '../../entities/Restaurant';
import { Coordinate } from '../location/types';
import LocationService from '../location';
import Menu from '../../entities/Menu';

@Service()
export default class RestaurantService {
  private static MAX_DISTANCE = 60;

  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    private locationService: LocationService
  ) {}

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

  async getMenuForRestaurant(restaurantId: number): Promise<Menu> {
    const restaurant = await this.restaurantRepository.findOne(restaurantId, {
      relations: ['menu'],
    });

    if (!restaurant) {
      throw new NotFoundError('Restaurant with that ID does not exist');
    }

    return restaurant.menu;
  }
}
