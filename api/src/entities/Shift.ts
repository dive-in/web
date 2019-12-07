import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import Employee from './Employee';

@Entity()
export default class Shift {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @ManyToMany(
    type => Employee,
    employee => employee.shifts,
    { cascade: true }
  )
  @JoinTable()
  employees: Employee[];
}
