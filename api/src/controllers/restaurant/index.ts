import {
  JsonController,
  Get,
  QueryParam,
  Authorized,
  InternalServerError,
  Param,
} from 'routing-controllers';
import Restaurant from '../../entities/Restaurant';
import RestaurantService from '../../services/restaurant';
import { Coordinate } from '../../services/location/types';
import ResponseBody from '../../types/ResponseBody';
import Menu from '../../entities/Menu';

@JsonController('/restaurants')
@Authorized()
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
   * @apiSuccess {Restaurant[]} payload The array of closest restaurants.
   *
   * @apiError (Error 400) {Number} status One or more query parameters are missing.
   * @apiError (Error 400) {String} payload A more detailed explanation of which query parameter(s) is(are) missing.
   *
   * @apiError (Error 403) {Number} status Thrown when an authentication token is invalid and/or not provided.
   * @apiError (Error 403) {String} payload Explaining the error in more detail.
   *
   * @apiError (Error 500) {Number} status An internal error occurred, probably during database connection.
   * @apiError (Error 500) {String} payload The message explaining more precisely what happened.
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
      throw new InternalServerError('An error occurred. Please try again.');
    }
  }

  /**
   * @api {get} /restaurants/:restaurantId/menu Get the menu for the restaurant of the given ID
   * @apiName getMenuForRestaurants
   * @apiGroup Restaurants
   *
   * @apiParam {Number} id The ID of the restaurant whose menu is to be fetched
   *
   * @apiSuccess {Number} status The 2XX status code. 200 for successful fetch.
   * @apiSuccess {Menu} payload The menu of the requested restaurant
   *
   * @apiError (Error 403) {Number} status Thrown when an authentication token is invalid and/or not provided.
   * @apiError (Error 403) {String} payload Explaining the error in more detail.
   *
   * @apiError (Error 404) {Number} status Thrown when a restaurant with that ID does not exist in the database.
   * @apiError (Error 403) {String} payload Explaining the error in more detail.
   */
  @Get('/:id/menu')
  async getMenuForRestaurant(
    @Param('id') id: number
  ): Promise<ResponseBody<Menu>> {
    const menu = await this.restaurantService.getMenuForRestaurant(id);

    return {
      status: 200,
      payload: menu,
    };
  }
}

export default RestaurantController;
