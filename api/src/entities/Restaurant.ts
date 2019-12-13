import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Field } from 'type-graphql';
import RestaurantTable from './RestaurantTable';
import Menu from './Menu';
import Employee from './Employee';

@Entity()
export default class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  @Field(() => String)
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
  @Field(() => String)
  logoUrl: string;

  @Column({
    nullable: true,
  })
  @Field(() => String)
  address: string;

  @Column({
    nullable: true,
  })
  @Field(() => String)
  phoneNumber: string;

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

  @OneToMany(
    type => Employee,
    employee => employee.restaurant
  )
  employees: Employee[];
}
