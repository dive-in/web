import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import OrderItem from './OrderItem';
import RestaurantTable from './RestaurantTable';
import User from './User';

@Entity()
export default class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    type => OrderItem,
    orderItem => orderItem.order
  )
  @JoinColumn()
  orderItems: OrderItem[];

  @ManyToOne(
    type => RestaurantTable,
    restaurantTable => restaurantTable.orders
  )
  @JoinColumn()
  restaurantTable: RestaurantTable;

  @ManyToOne(
    type => User,
    user => user.orders
  )
  @JoinColumn()
  user: User;
}
