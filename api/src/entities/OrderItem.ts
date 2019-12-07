import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import MenuItem from './MenuItem';
import Order from './Order';

@Entity()
export default class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @OneToOne(
    type => MenuItem,
    menuItem => menuItem.orderItem
  )
  @JoinColumn()
  menuItem: MenuItem;

  @ManyToOne(
    type => Order,
    order => order.orderItems
  )
  order: Order;
}
