import { Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import Restaurant from './Restaurant';

@Entity()
export default class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(
    type => Restaurant,
    restaurant => restaurant.menu
  )
  restaurant: Restaurant;
}
