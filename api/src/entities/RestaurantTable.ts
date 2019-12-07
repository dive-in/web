import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import Restaurant from './Restaurant';
import Shift from './Shift';
import Order from './Order';

@Entity()
export default class RestaurantTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @ManyToOne(
    type => Restaurant,
    restaurant => restaurant.tables
  )
  restaurant: Restaurant;

  @ManyToOne(
    type => Shift,
    shift => shift.restaurantTables
  )
  shift: Restaurant;

  @OneToMany(
    type => Order,
    order => order.restaurantTable
  )
  orders: Order[];
}
