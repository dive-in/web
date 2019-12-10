import {
  JsonController,
  UseBefore,
  Get,
  QueryParam,
} from 'routing-controllers';
import Restaurant from '../../entities/Restaurant';
import RestaurantService from '../../services/restaurant';
import { Coordinate } from '../../services/location/types';
import ResponseBody from '../../types/ResponseBody';
import verifyTokenMiddleware from '../../middleware/jwt';

@JsonController('/restaurants')
@UseBefore(verifyTokenMiddleware)
class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

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
  @Get('/')
  async getNearestRestaurants(
    @QueryParam('latitude', { required: true }) latitude: number,
    @QueryParam('longitude', { required: true }) longitude: number
  ): Promise<ResponseBody<Restaurant[] | string>> {
    const userCoordinate: Coordinate = {
      latitude,
      longitude,
    };

    try {
      const nearestRestaurants = await this.restaurantService.getClosestRestaurantsTo(
        userCoordinate
      );

      const response: ResponseBody<Restaurant[]> = {
        status: 200,
        payload: nearestRestaurants,
      };

      return response;
    } catch (e) {
      const errorBody: ResponseBody<string> = {
        status: 500,
        // TODO: Redefine the 500 messages
        payload: 'An error occured. Please try again later.',
      };

      return errorBody;
    }
  }
}

export default RestaurantController;
