import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import Category from './Category';
import OrderItem from './OrderItem';

@Entity()
export default class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'double precision',
  })
  price: number;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column({ length: 15 })
  quantityType: string;

  @Column()
  photo: string;

  @ManyToOne(
    type => Category,
    category => category.menuItems
  )
  category: Category;

  @OneToOne(
    type => OrderItem,
    orderItem => orderItem.menuItem
  )
  orderItem: OrderItem;
}
