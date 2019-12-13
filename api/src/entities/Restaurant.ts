import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Field } from 'type-graphql';
import RestaurantTable from './RestaurantTable';

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
}
