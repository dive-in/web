import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import Employee from './Employee';
import RestaurantTable from './RestaurantTable';

@Entity()
export default class Shift {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @ManyToOne(
    type => Employee,
    employee => employee.shifts
  )
  employee: Employee;

  @OneToMany(
    type => RestaurantTable,
    restaurantTable => restaurantTable.shift
  )
  restaurantTables: RestaurantTable[];
}
