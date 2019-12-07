import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  OneToMany,
} from 'typeorm';
import Menu from './Menu';
import MenuItem from './MenuItem';

@Entity()
export default class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(
    type => Menu,
    menu => menu.categories
  )
  menu: Menu;

  @OneToMany(
    type => MenuItem,
    menuItem => menuItem.category
  )
  menuItems: MenuItem[];
}
