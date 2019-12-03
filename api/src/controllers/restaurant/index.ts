import * as Router from '@koa/router';
import { getManager } from 'typeorm';
import { Dependencies, RestaurantControllerMiddleware } from './types';
import Restaurant from '../../entities/Restaurant';
import LocationService from '../../services/location';
import RestaurantService from '../../services/restaurant';
import { Coordinate } from '../../services/location/types';
import ResponseBody from '../../types/ResponseBody';
import verifyTokenMiddleware from '../../middleware/jwt';

const restaurantController = new Router<{}, Dependencies>();

const injectDependencies = (): RestaurantControllerMiddleware => async (
  ctx,
  next
): Promise<void> => {
  const restaurantRepository = getManager().getRepository(Restaurant);
  const locationService = LocationService.getInstance();

  ctx.restaurantService = RestaurantService.getInstance(
    restaurantRepository,
    locationService
  );

  await next();
};

restaurantController.use(verifyTokenMiddleware);
restaurantController.use(injectDependencies());

type GetNearestRestaurantsQueryParams = Coordinate;

/**
 * @api {get} /restaurants/ Authenticate user with Facebook accessToken
 * @apiName getNearestRestaurants
 * @apiGroup restaurants
 *
 * @apiParam {query} {String} latitude The user's latitude.
 * @apiParam {query} {String} longitude The user's longitude..
 *
 * @apiSuccess {Number} status The 2XX status message.
 * @apiSuccess {Array<Restaurant>} message The array of closest restaurants.
 *
 * @apiError {Number} status The status code of the error. <code>400</code> means the body parameters were invalid. <code>500</code> means the database operation failed.
 * @apiError {String} message The message explaining more precisely what happened.
 */
const getNearestRestaurants: RestaurantControllerMiddleware = async ctx => {
  const { latitude, longitude } = ctx.query as GetNearestRestaurantsQueryParams;

  if (!latitude || !longitude) {
    const errorBody: ResponseBody<string> = {
      status: 400,
      message: 'Latitude or longitude is missing',
    };

    ctx.status = 400;

    ctx.body = errorBody;
    return;
  }

  const userCoordinate: Coordinate = {
    latitude,
    longitude,
  };

  try {
    const nearestRestaurants = await ctx.restaurantService.getClosestRestaurantsTo(
      userCoordinate
    );

    const response: ResponseBody<Restaurant[]> = {
      status: 200,
      message: nearestRestaurants,
    };

    ctx.status = 200;
    ctx.body = response;
  } catch (_) {
    ctx.status = 500;

    const errorBody: ResponseBody<string> = {
      status: 500,
      // TODO: Redefine the 500 messages
      message: 'An error occured. Please try again later.',
    };

    ctx.body = errorBody;
  }
};

restaurantController.get('/', getNearestRestaurants);

export default restaurantController;
