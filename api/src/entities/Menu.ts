import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import Restaurant from './Restaurant';
import Category from './Category';

@Entity()
export default class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(
    type => Restaurant,
    restaurant => restaurant.menu
  )
  restaurant: Restaurant;

  @OneToMany(
    type => Category,
    category => category.menu
  )
  categories: Category[];
}
