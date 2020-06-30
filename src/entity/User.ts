import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from 'typeorm'
import { IsEmail, IsDate } from 'class-validator'
import { Role } from './Role'

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

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsDate()
  createDate: Date;

  @Column()
  password: string;

  @OneToOne(() => Role)
  @JoinColumn()
  role: Role
}
