import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Restaurant from './Restaurant';

@Entity()
export default class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column()
  password: string;

  @Column()
  photo: string;

  @ManyToOne(
    type => Restaurant,
    restaurant => restaurant.employees
  )
  restaurant: Restaurant;
}
