import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable } from 'typeorm'
import { IsEmail, IsDate } from 'class-validator'

import { Item } from './Items'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsDate()
  createDate: Date;

  @ManyToMany(() => Item, Item => Item.Users)
  @JoinTable()
  Items: Item[]
}
