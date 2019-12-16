import { JsonController, Authorized, Param, Post } from 'routing-controllers';
import ResponseBody from '../../types/ResponseBody';
import Order from '../../entities/Order';
import OrderService from '../../services/order';

@JsonController('/orders')
@Authorized()
class OrderController {
  constructor(private orderService: OrderService) {}

  /**
   * @api {post} /orders/table/:tableId/user/:userId Create an order given the table ID and user ID
   * @apiName createOrderForTable
   * @apiGroup Order
   *
   * @apiParam {Number} id The ID of the restaurant table for which the order will be created
   * @apiParam {Number} id The ID of the user for the order
   *
   * @apiSuccess {Number} status The 2XX status code. 200 for successful fetch.
   * @apiSuccess {Order} payload The order that was created
   *
   * @apiError (Error 403) {Number} status Thrown when an authentication token is invalid and/or not provided.
   * @apiError (Error 403) {String} payload Explaining the error in more detail.
   *
   * @apiError (Error 500) {String} name Thrown when a table or user with that ID does not exist in the database.
   * @apiError (Error 500) {String} message Description of the error.
   * @apiError (Error 500) {String} stack Stack trace of the error.
   */
  @Post('/table/:tableId/user/:userId')
  async createOrderForTable(
    @Param('tableId') tableId: number,
    @Param('userId') userId: number
  ): Promise<ResponseBody<Order>> {
    const order = await this.orderService.createOrder(tableId, userId);

    return {
      status: 200,
      payload: order,
    };
  }
}

export default OrderController;
