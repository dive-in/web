import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import Menu from './Menu';

@Entity()
export default class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToOne(
    type => Menu,
    menu => menu.categories
  )
  menu: Menu;
}
