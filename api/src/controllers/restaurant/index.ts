import * as Router from '@koa/router';
import { getManager } from 'typeorm';
import Container from 'typedi';
import { Dependencies, RestaurantControllerMiddleware } from './types';
import Restaurant from '../../entities/Restaurant';
import RestaurantService from '../../services/restaurant';
import { Coordinate } from '../../services/location/types';
import ResponseBody from '../../types/ResponseBody';
import verifyTokenMiddleware from '../../middleware/jwt';

const restaurantController = new Router<{}, Dependencies>();

const injectDependencies = (): RestaurantControllerMiddleware => async (
  ctx,
  next
): Promise<void> => {
  ctx.restaurantService = Container.get(RestaurantService);

  await next();
};

restaurantController.use(verifyTokenMiddleware);
restaurantController.use(injectDependencies());

type GetNearestRestaurantsQueryParams = Coordinate;

/**
 * @api {get} /restaurants?latitude=:latitude&longitude=:longitude Get 3 nearest restaurants based on latitude and longitude
 * @apiName getNearestRestaurants
 * @apiGroup Restaurants
 *
 * @apiParam (Query params) {String} latitude The user's latitude.
 * @apiParam (Query params) {String} longitude The user's longitude.
 *
 * @apiSuccess {Number} status The 2XX status message.
 * @apiSuccess {Restaurant[]} message The array of closest restaurants.
 *
 * @apiError {Number} status The status code of the error. <code>400</code> means the body parameters were invalid. <code>500</code> means the database operation failed.
 * @apiError {String} message The message explaining more precisely what happened.
 */
const getNearestRestaurants: RestaurantControllerMiddleware = async ctx => {
  const { latitude, longitude } = ctx.query as GetNearestRestaurantsQueryParams;

  if (!latitude || !longitude) {
    const errorBody: ResponseBody<string> = {
      status: 400,
      payload: 'Latitude or longitude is missing',
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
      payload: nearestRestaurants,
    };

    ctx.status = 200;
    ctx.body = response;
  } catch (_) {
    ctx.status = 500;

    const errorBody: ResponseBody<string> = {
      status: 500,
      // TODO: Redefine the 500 messages
      payload: 'An error occured. Please try again later.',
    };

    ctx.body = errorBody;
  }
};

restaurantController.get('/', getNearestRestaurants);

export default restaurantController;
