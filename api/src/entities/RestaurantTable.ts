import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Restaurant from './Restaurant';

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
}
