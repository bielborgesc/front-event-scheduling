import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert } from 'typeorm';
import { Event } from '../event/event.entity';
import { hashSync } from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Event, event => event.user, {cascade: true, eager: true})
  events: Event[];

  @BeforeInsert()
  hashPassword(){
    this.password = hashSync(this.password, 10)
  }
}