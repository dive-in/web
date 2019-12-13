import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Order from './Order';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  firstName: string;

  @Column({
    nullable: false,
  })
  lastName: string;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @OneToMany(
    type => Order,
    order => order.user
  )
  orders: Order[];
}
