import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  start: Date;

  @Column()
  finish: Date;

  @ManyToOne(() => User, (user) => user.events, { cascade: true, eager: true })
  user: User

}