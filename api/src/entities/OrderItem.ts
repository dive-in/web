import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import MenuItem from './MenuItem';

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
}
