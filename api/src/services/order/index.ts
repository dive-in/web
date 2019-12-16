import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import Order from '../../entities/Order';
import RestaurantTable from '../../entities/RestaurantTable';
import User from '../../entities/User';

@Service()
export default class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(RestaurantTable)
    private restaurantTableRepository: Repository<RestaurantTable>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async createOrder(tableId: number, userId: number): Promise<Order> {
    const order = new Order();
    const restaurantTable = await this.restaurantTableRepository.findOneOrFail(
      tableId
    );
    const user = await this.userRepository.findOneOrFail(userId);
    order.restaurantTable = restaurantTable;
    order.user = user;

    this.orderRepository.save(order);

    return order;
  }
}
