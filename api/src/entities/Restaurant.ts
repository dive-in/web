import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import RestaurantTable from './RestaurantTable';
import Menu from './Menu';

@Entity()
export default class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column({
    type: 'double precision',
  })
  latitude: number;

  @Column({
    type: 'double precision',
  })
  longitude: number;

  @Column({
    nullable: true,
  })
  logoUrl: string;

  @OneToMany(
    type => RestaurantTable,
    table => table.restaurant,
    {
      cascade: true,
    }
  )
  tables: RestaurantTable[];

  @OneToOne(
    type => Menu,
    menu => menu.restaurant
  )
  @JoinColumn()
  menu: Menu;
}
