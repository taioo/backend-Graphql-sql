import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany } from 'typeorm'
import { IsDate } from 'class-validator'
import { User } from './User'

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
    Name: string;

  @Column()
  @IsDate()
  createDate: Date;

  @ManyToMany(() => User, User => User.Items)
    Users: User[];
}
