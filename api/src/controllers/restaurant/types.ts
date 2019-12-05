import { Middleware } from '@koa/router';
import RestaurantService from '../../services/restaurant';

export interface Dependencies {
  restaurantService: RestaurantService;
}

export type RestaurantControllerMiddleware = Middleware<{}, Dependencies>;
