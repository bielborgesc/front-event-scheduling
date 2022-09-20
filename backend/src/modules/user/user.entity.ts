import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, ManyToMany } from 'typeorm';
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

  @BeforeInsert()
  hashPassword(){
    this.password = hashSync(this.password, 10)
  }

}