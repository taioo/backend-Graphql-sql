import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from 'typeorm'
import { IsDate } from 'class-validator'
import { User } from './User'

@Entity()
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
    name: string;

  @Column()
  @IsDate()
  addDate: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user: User
}
